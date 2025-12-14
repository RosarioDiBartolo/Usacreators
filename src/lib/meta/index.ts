import { z } from "zod";

import { createServerFn } from "@tanstack/react-start"; 

const MetaSchema = z.object({
  title: z.string(),
});

export const getPlatformMeta = createServerFn({ method: "GET" })
   .handler(async () => {
     
      if (typeof window !== "undefined") {
        console.log(window);
      }
      const { db } = await import("@/lib/firebase/admin");
      const snap = await db.collection("pages").doc("home").get();
      const parsed = MetaSchema.parse(snap.data() ?? {});

       return parsed;
    
  });
