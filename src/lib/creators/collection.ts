// src/lib/firebase/creators-repo.ts

import { z } from "zod";
import { createTypedCollection } from "../firebase/utils";
import { firebaseCreatorRecord } from "./schemas/creator-apply-server";
import { GetCreatorsInput } from "./schemas/creators-filter";



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
      if (typeof bio !== "string" || bio == null || pic === null) return false;

      return bio.trim().length > 0;
    });
  }

  return filtered;
}
