 
// src/lib/platform/meta.server.ts
import { z } from "zod";
import { db } from "@/lib/firebase/admin";
import { createServerFn } from "@tanstack/react-start";

const MetaSchema = z.object({
  title: z.string().optional(),
});

  

export const getPlatformMeta =  createServerFn ({ method: 'GET' }).handler( async ()=>{
   const snap = await db.collection("pages").doc("home").get();
  const parsed = MetaSchema.parse(snap.data() ?? {});
   return parsed;
})
