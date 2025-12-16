// src/lib/firebase/creators-repo.ts

import { z } from "zod";
import { createTypedCollection, WhereFilter, WithId } from "../firebase/utils";
import { Creator, creatorApplicationSchema, firebaseCreatorRecord } from "./schemas/creators-apply-server";
 
export const GetCreatorsFilterSchema = z
  .object({
    limit: z.number().int().min(1).max(50).default(20),
    // filters
    cleaned: z.boolean().default(false),
  })
  .partial()
  .default({});

export const creatorsRepo = createTypedCollection({
  collection: "applications",
  schema: firebaseCreatorRecord,
  addSchema: creatorApplicationSchema,
  updateSchema: z.object({
   status: firebaseCreatorRecord.shape.status
  }),
});

export type CreatorRecord = WithId<Creator>
export type CreatorsFilter = z.infer<typeof GetCreatorsFilterSchema> & {
  where? : WhereFilter<Creator>[]
};
  
export async function findCreators(rawFilters: CreatorsFilter) {
  const { limit = 20, cleaned, where = [] as WhereFilter<Creator>[] } = rawFilters;
  
 
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

  if (cleaned) {
    filtered = filtered.filter((creator) => {
      const bio = creator.bio;
      const pic = creator.profilePictureUrl;
      if (typeof bio !== "string" || bio == null || pic === null) return false;

      return bio.trim().length > 0;
    });
  }

  return filtered;
}
