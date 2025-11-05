import React from "react";
import { renderToReadableStream } from "react-dom/server";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { createMemoryHistory } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
export async function render(url: string) {
  const history = createMemoryHistory({ initialEntries: [url] });
  const router = createRouter({ routeTree, history, context: {} });
  await router.load();
  return renderToReadableStream(<RouterProvider router={router} />);
}
