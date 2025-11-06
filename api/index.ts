// api/index.ts (TanStack Start adapter)
import { createServerHandler } from "@tanstack/start/vercel";
import server from "../src/entry-server";

export const config = { runtime: "nodejs" }; // <-- Node runtime
export default createServerHandler({ handleRequest: server });
