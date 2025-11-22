import { Timestamp } from "firebase-admin/firestore";
 
import { z, type ZodTypeAny } from "zod";
 
// ---- Timestamp guard (works across admin/emulator builds)
export const TimestampLike = z.instanceof(Timestamp).transform((ts) => ts.toDate());
 
 
 
type WithId<T> = T & { id: string };

async function getDb() {
  const { db } = await import("@/lib/firebase/admin");
  return db;
}

type WhereFilter<T> = {
  field: Extract<keyof T, string>;
  op: FirebaseFirestore.WhereFilterOp;
  value: unknown;
};

interface QueryOptions<T> {
  where?: WhereFilter<T>[];
  limit?: number;
  orderBy?: {
    field: Extract<keyof T, string>;
    direction?: FirebaseFirestore.OrderByDirection;
  };
}

export function createTypedCollection<TSchema extends ZodTypeAny>(opts: {
  collection: string;
  schema: TSchema;
}) {
  type T = z.infer<TSchema>;
  const { collection, schema } = opts;

  function applyQueryOptions(
    base: FirebaseFirestore.CollectionReference,
    options: QueryOptions<T> = {},
  ) {
    let q: FirebaseFirestore.Query = base;

    if (options.where) {
      for (const w of options.where) {
        q = q.where(w.field, w.op, w.value);
      }
    }

    if (options.orderBy) {
      q = q.orderBy(
        options.orderBy.field,
        options.orderBy.direction ?? "asc",
      );
    }

    if (options.limit) {
      q = q.limit(options.limit);
    }

    return q;
  }

  async function find(options: QueryOptions<T> = {}) {
    const db = await getDb();
    const colRef = db.collection(collection);
    const q = applyQueryOptions(colRef, options);
    const snap = await q.get();

    const results: WithId<T>[] = [];
    const errors: { id: string; error: z.ZodError }[] = [];

    snap.forEach((doc) => {
      const parsed = schema.safeParse(doc.data());
      if (parsed.success) {
        results.push({ id: doc.id, ...(parsed.data as T) });
      } else {
        errors.push({ id: doc.id, error: parsed.error });
      }
    });

    return { results, errors };
  }

  async function getById(id: string) {
    const db = await getDb();
    const doc = await db.collection(collection).doc(id).get();
    if (!doc.exists) return null;

    const parsed = schema.parse(doc.data());
    return { id: doc.id, ...(parsed as T) } as WithId<T>;
  }

  return {
    find,
    getById,
  };
}