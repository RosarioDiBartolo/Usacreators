import { useMemo, useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getPlaylistVideos,
  getVideoTranscript,
  type PlaylistDetails,
  type TranscriptSegment,
} from "@/lib/playlist/server-fns";
import { Loader2, ListVideo, FileText } from "lucide-react";

type TranscriptMap = Record<string, TranscriptSegment[]>;

const formatTimestamp = (seconds: number) => {
  const totalSeconds = Math.max(seconds, 0);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = Math.floor(totalSeconds % 60);

  const parts = [minutes.toString().padStart(2, "0"), secs.toString().padStart(2, "0")];

  if (hours > 0) {
    parts.unshift(hours.toString());
  }

  return parts.join(":");
};

const TranscriptViewer = ({ segments }: { segments: TranscriptSegment[] }) => {
  const combined = useMemo(
    () =>
      segments
        .map((segment) => segment.text.trim())
        .filter(Boolean)
        .join(" ")
        .trim(),
    [segments]
  );

  return (
    <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
        <FileText className="h-4 w-4" />
        <span>Transcript</span>
      </div>

      <div className="grid gap-2 text-sm leading-6 text-slate-800">
        {segments.map((segment, idx) => (
          <div key={`${segment.offsetSeconds}-${idx}`} className="flex gap-3">
            <span className="mt-[2px] min-w-[3.25rem] text-xs font-semibold text-slate-500">
              {formatTimestamp(segment.offsetSeconds)}
            </span>
            <p className="text-slate-800">{segment.text}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-white p-3 text-xs leading-6 text-slate-600">
        <p className="font-semibold text-slate-700">Full text</p>
        <p className="mt-1 whitespace-pre-wrap">{combined}</p>
      </div>
    </div>
  );
};

const ImportPlaylistPage = () => {
  const [playlistInput, setPlaylistInput] = useState("");
  const [language, setLanguage] = useState("en");
  const [playlist, setPlaylist] = useState<PlaylistDetails | null>(null);
  const [transcripts, setTranscripts] = useState<TranscriptMap>({});
  const [transcriptErrors, setTranscriptErrors] = useState<Record<string, string>>({});
  const [expandedVideoId, setExpandedVideoId] = useState<string | null>(null);

  const importMutation = useMutation({
    mutationFn: async () =>
      getPlaylistVideos({
        data: { playlist: playlistInput, language },
      }),
    onSuccess: (data) => {
      setPlaylist(data);
      setTranscripts({});
      setTranscriptErrors({});
      setExpandedVideoId(null);
      toast.success(`Loaded ${data.videos.length} videos from "${data.title}".`);
    },
    onError: (error) => {
      const message =
        error instanceof Error ? error.message : "Could not import playlist. Please try again.";
      toast.error(message);
    },
  });

  const transcriptMutation = useMutation({
    mutationFn: async (videoId: string) =>
      getVideoTranscript({
        data: { videoId, language },
      }),
    onSuccess: (data) => {
      setTranscripts((prev) => ({ ...prev, [data.videoId]: data.transcript }));
      setTranscriptErrors((prev) => {
        const next = { ...prev };
        delete next[data.videoId];
        return next;
      });
    },
    onError: (error, videoId) => {
      const message =
        error instanceof Error ? error.message : "Could not load the transcript for this video.";
      toast.error(message);
      if (videoId) {
        setTranscriptErrors((prev) => ({ ...prev, [videoId]: message }));
      }
    },
  });

  const handleImport = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await importMutation.mutateAsync();
  };

  const handleShowTranscript = async (videoId: string) => {
    setExpandedVideoId(videoId);
    setTranscriptErrors((prev) => {
      const next = { ...prev };
      delete next[videoId];
      return next;
    });

    if (transcripts[videoId]) {
      return;
    }

    await transcriptMutation.mutateAsync(videoId);
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
      <header className="space-y-4">
        <p className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
          <ListVideo className="h-4 w-4" />
          Import playlist
        </p>
        <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
          Review playlist videos before running AI processing
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-slate-700">
          Paste a YouTube playlist link to see every video and its raw transcript. This flow skips
          any AI post-processing so you can verify the source material before deciding what to
          analyze next.
        </p>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <form className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end" onSubmit={handleImport}>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-800" htmlFor="playlist">
              Playlist URL or ID
            </label>
            <input
              id="playlist"
              name="playlist"
              value={playlistInput}
              onChange={(event) => setPlaylistInput(event.target.value)}
              placeholder="https://www.youtube.com/playlist?list=..."
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[auto_auto] sm:items-end">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-800" htmlFor="language">
                Transcript language
              </label>
              <select
                id="language"
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
              disabled={importMutation.isPending}
            >
              {importMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              Load videos
            </button>
          </div>
        </form>

        <p className="mt-3 text-sm text-slate-600">
          Tip: transcripts are fetched directly and kept unprocessed. You can run your AI pipeline
          later based on the videos and scripts you trust.
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-600">Playlist</p>
            <h2 className="text-2xl font-semibold text-slate-900">
              {playlist ? playlist.title : "No playlist loaded yet"}
            </h2>
            {playlist?.channelTitle ? (
              <p className="text-sm text-slate-600">by {playlist.channelTitle}</p>
            ) : null}
          </div>
          {playlist ? (
            <div className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white">
              {playlist.videos.length} videos
            </div>
          ) : null}
        </div>

        {!playlist && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
            Paste a playlist URL to see each video and open its transcript.
          </div>
        )}

        {playlist ? (
          <div className="grid gap-4">
            {playlist.videos.map((video) => {
              const transcript = transcripts[video.id];
              const isActive = expandedVideoId === video.id;
              const transcriptError = transcriptErrors[video.id];

              return (
                <article
                  key={video.id}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex gap-4">
                      {video.thumbnail ? (
                        <img
                          src={video.thumbnail}
                          alt=""
                          className="h-20 w-32 rounded-lg object-cover shadow-sm"
                          loading="lazy"
                        />
                      ) : null}
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-slate-900">{video.title}</h3>
                        <p className="text-sm text-slate-600">{video.channelTitle}</p>
                        {video.publishedAt ? (
                          <p className="text-xs text-slate-500">
                            Published {new Date(video.publishedAt).toLocaleDateString()}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 md:items-end">
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-800 transition hover:bg-slate-200"
                      >
                        Open video
                      </a>
                      <button
                        onClick={() => handleShowTranscript(video.id)}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                        disabled={transcriptMutation.isPending && isActive}
                      >
                        {transcriptMutation.isPending && isActive ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <FileText className="h-4 w-4" />
                        )}
                        View transcript
                      </button>
                    </div>
                  </div>

                  {isActive ? (
                    <div className="mt-4">
                      {transcript ? (
                        <TranscriptViewer segments={transcript} />
                      ) : transcriptError ? (
                        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                          {transcriptError}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Fetching transcript...
                        </div>
                      )}
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        ) : null}
      </section>
    </div>
  );
};

export default ImportPlaylistPage;
