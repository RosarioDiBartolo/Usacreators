// src/lib/things/server.ts
import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";
import { GetCreatorsInput } from "@/lib/creators/collection";
import z from "zod";
 
 

export const getCreators = createServerFn({ method: "GET" })
  .inputValidator(GetCreatorsInput)
  .handler(async ({ data }) => {
    const { findCreators } = await import("@/lib/creators/collection");

 
    return  await findCreators(data);
 
  });
 export type CreatorsFilters = z.infer<typeof GetCreatorsInput>;

export function creatorsQueryOptions(filters: CreatorsFilters = {}) {
  // Normalization is optional here, since Zod already gave defaults,
  // but keeping it explicit is sometimes nicer for the queryKey.
  const normalized: CreatorsFilters = {
    limit: filters.limit ?? 20,
    onlyWithBio: filters.onlyWithBio ?? false,
    ...filters,
  };

  return queryOptions({
    queryKey: ["creators", normalized],
    queryFn: () => getCreators({ data: normalized }),
  });
}