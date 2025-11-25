// src/lib/firebase/creators-repo.ts

import { z } from "zod";
import { createTypedCollection } from "../firebase/utils";
import { firebaseCreatorRecord } from "./schemas/creator-apply-server";

export const GetCreatorsInput = z
  .object({
    limit: z.number().int().min(1).max(50).default(20),
    // filters
    onlyWithBio: z.boolean().default(false),
  })
  .partial()
  .default({});

export const creatorsRepo = createTypedCollection({
  collection: "applications",
  schema: firebaseCreatorRecord,
});

export type CreatorsFilter = z.infer<typeof GetCreatorsInput>;

export async function findCreators(rawFilters: CreatorsFilter) {
  const { limit = 20, onlyWithBio } = rawFilters;

  const where: {
    field: string;
    op: FirebaseFirestore.WhereFilterOp;
    value: unknown;
  }[] = [];

  // ⛔️ Do NOT use inequality on `bio` here.
  // Keep the Firestore query as “dumb” as possible, and filter bio in memory.

  const { results, errors } = await creatorsRepo.find({
    where,
    orderBy: { field: "createdAt", direction: "desc" },
    limit,
  });

  if (errors.length) {
    console.warn(
      "[findCreators] Invalid creator docs",
      errors.map((e) => e.id),
    );
  }

  let filtered = results;

  if (onlyWithBio) {
    filtered = filtered.filter((creator) => {
      const bio = creator.bio;
      const pic = creator.profilePictureUrl;
      if (bio == null || pic === undefined) return false;
      if (typeof bio !== "string") return false;
      return bio.trim().length > 0;
    });
  }

  return filtered;
}
