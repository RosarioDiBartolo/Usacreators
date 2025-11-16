// src/lib/things/server.ts
import { createServerFn } from "@tanstack/react-start";
import { firebaseCreatorRecord } from "./schemas/creator-apply-server";
import { queryOptions } from "@tanstack/react-query";
import z from "zod";

export const getCreators = createServerFn({ method: "GET" }).handler(
  async () => {
    const { db } = await import("@/lib/firebase/admin"); // your Firestore admin SDK

    const snap = await db.collection("applications").get();

    const rawDocs = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Validate EVERYTHING here
    const things  = firebaseCreatorRecord.array().parse(rawDocs) as (z.infer< typeof firebaseCreatorRecord> & {
      id: string;
    })[]; 

    return things;
  }
);

  
export const creatorsQueryOptions = queryOptions({
  queryKey: ["creators"],
  queryFn: () => getCreators(), // server function call
});