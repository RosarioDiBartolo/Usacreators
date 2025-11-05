import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__not-found")({
  component: () => (
    <main>
      <h1>404 – Not Found</h1>
      <p>La pagina che cerchi non esiste.</p>
    </main>
  ),
});
