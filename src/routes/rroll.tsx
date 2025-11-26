import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/rroll")({
  component: () => {
    useEffect(() => {
      window.location.href = "https://www.youtube.com/watch?v=xvFZjo5PgG0";
    }, []);

    return null; // or a loader spinner
  },
});
