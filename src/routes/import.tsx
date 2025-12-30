import { createFileRoute } from "@tanstack/react-router";
import ImportPlaylistPage from "@/pages/import-playlist";

export const Route = createFileRoute("/import")({
  component: ImportPlaylistPage,
});
