// src/lib/things/server.ts
import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";
import { GetCreatorsFilterSchema } from "@/lib/creators/creators-collection";
import z from "zod"; 
 
 

export const getCreators = createServerFn({ method: "GET" })
  .inputValidator(GetCreatorsFilterSchema)
  .handler(async ({ data }) => {
    const { findCreators } = await import("@/lib/creators/creators-collection");
  
    const creators =  await findCreators(data);
 
    return creators
  });
 export type CreatorsFilters = z.infer<typeof GetCreatorsFilterSchema>;

export function creatorsQueryOptions(filters: CreatorsFilters = {}) {
  // Normalization is optional here, since Zod already gave defaults,
  // but keeping it explicit is sometimes nicer for the queryKey.
  const normalized: CreatorsFilters = {
    limit: filters.limit ,
    cleaned: filters.cleaned ?? false,
    ...filters,
  };

  return queryOptions({
    queryKey: ["creators", normalized],
    queryFn: () => getCreators({ data: normalized }),
  });
}