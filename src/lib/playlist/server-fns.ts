import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import env from "@/enviroment/server";

const playlistInputSchema = z.object({
  playlist: z.string().min(1, "Please provide a playlist URL or ID."),
  language: z.string().optional(),
});

const transcriptInputSchema = z.object({
  videoId: z.string().min(1, "Missing video id."),
  language: z.string().optional(),
});

const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

const extractPlaylistId = (raw: string) => {
  const trimmed = raw.trim();
  if (!trimmed) {
    return "";
  }

  try {
    const url = new URL(trimmed);
    const id = url.searchParams.get("list");
    if (id) return id;

    const segments = url.pathname.split("/").filter(Boolean);
    const last = segments.pop();
    if (last) return last;
  } catch {
    // not a URL, fall through
  }

  return trimmed;
};

type PlaylistItem = {
  id: string;
  title: string;
  channelTitle: string;
  url: string;
  publishedAt?: string;
  thumbnail?: string;
};

export type PlaylistDetails = {
  id: string;
  title: string;
  channelTitle: string;
  videos: PlaylistItem[];
};

export type TranscriptSegment = {
  text: string;
  offsetSeconds: number;
  durationSeconds: number;
};

const fetchPlaylistMetadata = async (playlistId: string, apiKey: string) => {
  const params = new URLSearchParams({
    part: "snippet",
    id: playlistId,
    key: apiKey,
  });

  const response = await fetch(`${YOUTUBE_API_BASE}/playlists?${params}`);
  if (!response.ok) {
    throw new Error("Could not read playlist metadata from YouTube.");
  }

  const payload = await response.json();
  const playlist = payload?.items?.[0];

  if (!playlist) {
    throw new Error("No playlist found for the provided id.");
  }

  return {
    title: playlist?.snippet?.title ?? "Playlist",
    channelTitle: playlist?.snippet?.channelTitle ?? "",
  };
};

const fetchPlaylistVideos = async (playlistId: string, apiKey: string) => {
  const videos: PlaylistItem[] = [];
  let pageToken: string | undefined;

  do {
    const params = new URLSearchParams({
      part: "snippet,contentDetails",
      maxResults: "50",
      playlistId,
      key: apiKey,
    });

    if (pageToken) {
      params.set("pageToken", pageToken);
    }

    const response = await fetch(`${YOUTUBE_API_BASE}/playlistItems?${params}`);

    if (!response.ok) {
      throw new Error("Could not load playlist videos from YouTube.");
    }

    const payload = await response.json();
    const items = Array.isArray(payload?.items) ? payload.items : [];

    for (const item of items) {
      const videoId = item?.contentDetails?.videoId;
      if (!videoId) continue;

      const snippet = item?.snippet ?? {};
      const thumbnails = snippet?.thumbnails ?? {};

      const preferredThumbnail =
        thumbnails?.maxres?.url ??
        thumbnails?.standard?.url ??
        thumbnails?.high?.url ??
        thumbnails?.medium?.url ??
        thumbnails?.default?.url;

      videos.push({
        id: videoId,
        title: snippet?.title ?? "Untitled video",
        channelTitle:
          snippet?.videoOwnerChannelTitle ??
          snippet?.channelTitle ??
          "Unknown channel",
        url: `https://www.youtube.com/watch?v=${videoId}`,
        publishedAt: snippet?.publishedAt,
        thumbnail: preferredThumbnail,
      });
    }

    pageToken = payload?.nextPageToken;
  } while (pageToken);

  if (videos.length === 0) {
    throw new Error("This playlist has no videos to import.");
  }

  return videos;
};

const mapTimedTextEvents = (events: any[]): TranscriptSegment[] => {
  const segments: TranscriptSegment[] = [];

  for (const event of events) {
    const startMs = Number(event?.tStartMs ?? 0);
    const durationMs = Number(event?.dDurationMs ?? event?.dDuration ?? 0);
    const segs = Array.isArray(event?.segs) ? event.segs : [];

    for (const segment of segs) {
      const text = typeof segment?.utf8 === "string" ? segment.utf8.trim() : "";
      if (!text) continue;

      segments.push({
        text,
        offsetSeconds: startMs / 1000,
        durationSeconds: durationMs / 1000,
      });
    }
  }

  return segments;
};

export const getPlaylistVideos = createServerFn({ method: "POST" })
  .inputValidator(playlistInputSchema)
  .handler(async ({ data }) => {
    const playlistId = extractPlaylistId(data.playlist);

    if (!playlistId) {
      throw new Error("Please provide a valid playlist URL or id.");
    }

    const apiKey = env.YOUTUBE_API_KEY;

    if (!apiKey) {
      throw new Error("Missing YOUTUBE_API_KEY. Add it to your environment to import playlists.");
    }

    const [metadata, videos] = await Promise.all([
      fetchPlaylistMetadata(playlistId, apiKey),
      fetchPlaylistVideos(playlistId, apiKey),
    ]);

    return {
      id: playlistId,
      title: metadata.title,
      channelTitle: metadata.channelTitle,
      videos,
    } satisfies PlaylistDetails;
  });

export const getVideoTranscript = createServerFn({ method: "POST" })
  .inputValidator(transcriptInputSchema)
  .handler(async ({ data }) => {
    const language = data.language?.trim() || "en";
    const params = new URLSearchParams({
      v: data.videoId,
      fmt: "json3",
      lang: language,
    });

    const response = await fetch(
      `https://video.google.com/timedtext?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Transcript is not available for this video.");
    }

    const textPayload = await response.text();
    if (!textPayload) {
      throw new Error("Transcript is not available for this video.");
    }

    let transcriptJson: any;

    try {
      transcriptJson = JSON.parse(textPayload);
    } catch {
      throw new Error("Transcript format not supported for this video.");
    }

    const events = Array.isArray(transcriptJson?.events)
      ? transcriptJson.events
      : [];

    const transcript = mapTimedTextEvents(events);

    if (transcript.length === 0) {
      throw new Error("Transcript is not available for this video.");
    }

    return {
      videoId: data.videoId,
      transcript,
    };
  });
