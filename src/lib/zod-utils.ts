import z from "zod";

// helper: same default for "missing" or "invalid"
export const withDefault = <T extends z.ZodTypeAny>(
  schema: T,
  defaultValue: z.infer<T>
) => schema.default(defaultValue).catch(defaultValue);
 