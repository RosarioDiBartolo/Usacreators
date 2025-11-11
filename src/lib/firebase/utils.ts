import z from "zod";

// ---- Timestamp guard (works across admin/emulator builds)
export const TimestampLike = z.custom<{ toDate: () => Date }>(
  (v) => !!v && typeof v.toDate === "function",
  "Expected Firestore Timestamp-like object"
);
