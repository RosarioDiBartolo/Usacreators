import React from "react";
import { hydrateRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
const router = createRouter({ routeTree });
hydrateRoot(document.getElementById("root")!, <RouterProvider router={router} />);
