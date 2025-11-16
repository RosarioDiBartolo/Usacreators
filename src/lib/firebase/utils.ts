import { Timestamp } from "firebase-admin/firestore";
import z from "zod";

// ---- Timestamp guard (works across admin/emulator builds)
export const TimestampLike = z.instanceof(Timestamp).transform((ts) => ts.toDate());