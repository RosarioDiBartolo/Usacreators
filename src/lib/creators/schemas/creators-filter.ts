import z from "zod";

export const GetCreatorsInput = z
  .object({
    limit: z.number().int().min(1).default(20).optional(),
    // filters
    onlyWithBio: z.boolean().default(false),
  })
  .partial()
  .default({});