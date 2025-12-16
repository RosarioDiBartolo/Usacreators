import { Timestamp } from "firebase-admin/firestore";
import { z, type ZodTypeAny } from "zod";

// ---- Timestamp guard (works across admin/emulator builds)
export const TimestampLike = z.instanceof(Timestamp).transform((ts) => ts.toDate());

export type WithId<T> = T & { id: string };

async function getDb() {
  const { db } = await import("@/lib/firebase/admin");
  return db;
}

export type WhereFilter<T> = {
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

export function createTypedCollection<
  TSchema extends ZodTypeAny,
  AddSchema extends ZodTypeAny = TSchema,
  UpdateSchema extends ZodTypeAny = z.ZodTypeAny
>(opts: {
  collection: string;
  schema: TSchema;
  addSchema?: AddSchema;

  /**
   * Optional: validation for partial updates.
   * If not provided, we default to schema.partial() (works for ZodObject schemas).
   */
  updateSchema?: UpdateSchema;
}) {
  type T = z.infer<TSchema>;
  type TAddInput = z.input<AddSchema>;
  type TUpdateInput = z.input<UpdateSchema>;

  const { collection, schema, addSchema = schema } = opts;

  // Default update schema: schema.partial() if available (i.e. schema is a ZodObject)
  const updateSchema: ZodTypeAny =
    opts.updateSchema ??
    // @ts-expect-error - only valid for ZodObject; runtime check keeps it safe
    (typeof (schema as any).partial === "function" ? (schema as any).partial() : schema);

  function applyQueryOptions(
    base: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>,
    options: QueryOptions<T> = {},
  ) {
    let q: FirebaseFirestore.Query = base;

    if (options.where) {
      for (const w of options.where) q = q.where(w.field, w.op, w.value);
    }
    if (options.orderBy) {
      q = q.orderBy(options.orderBy.field, options.orderBy.direction ?? "asc");
    }
    if (options.limit) q = q.limit(options.limit);

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
      if (parsed.success) results.push({ id: doc.id, ...(parsed.data as T) });
      else errors.push({ id: doc.id, error: parsed.error });
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

  async function add(data: TAddInput): Promise<WithId<T>> {
    const db = await getDb();
    const colRef = db.collection(collection);

    // Validate + run transforms before writing
    const parsed = addSchema.parse(data);

    const docRef = await colRef.add(parsed as FirebaseFirestore.DocumentData);

    // Re-read so you always return a typed object (and pick up server timestamps, etc.)
    const snap = await docRef.get();
    const finalParsed = schema.parse(snap.data());

    return { id: docRef.id, ...(finalParsed as T) };
  }

  /**
   * Partial update (merge) using update().
   * By default validated with schema.partial(), unless you pass updateSchema.
   */
  async function updateById(id: string, patch: TUpdateInput): Promise<WithId<T>> {
    const db = await getDb();
    const ref = db.collection(collection).doc(id);

    const parsedPatch = updateSchema.parse(patch);

    await ref.update(parsedPatch as FirebaseFirestore.UpdateData);

    const snap = await ref.get();
    if (!snap.exists) return null as any; // should not happen after successful update()

    const finalParsed = schema.parse(snap.data());
    return { id: snap.id, ...(finalParsed as T) };
  }

  /**
   * Replace doc (optionally merge) using set().
   * If merge: true, treat as partial update (updateSchema).
   * If merge: false, treat as full document (schema/addSchema).
   */
  async function setById(
    id: string,
    data: unknown,
    options: { merge?: boolean } = {},
  ): Promise<WithId<T>> {
    const db = await getDb();
    const ref = db.collection(collection).doc(id);

    const toWrite = options.merge ? updateSchema.parse(data) : schema.parse(data);

    await ref.set(toWrite as FirebaseFirestore.DocumentData, { merge: !!options.merge });

    const snap = await ref.get();
    const finalParsed = schema.parse(snap.data());
    return { id: snap.id, ...(finalParsed as T) };
  }

  async function deleteById(id: string): Promise<boolean> {
    const db = await getDb();
    const ref = db.collection(collection).doc(id);
    const snap = await ref.get();
    if (!snap.exists) return false;
    await ref.delete();
    return true;
  }

  return {
    find,
    getById,
    add,
    updateById,
    setById,
    deleteById,
  };
}
