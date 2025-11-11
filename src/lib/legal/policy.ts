// src/lib/legal/policy-schema.ts
import z from "zod"

/** ---------- Helpers ---------- */

// Non-empty, trimmed string
const nz = z.string().trim().min(1, "Required")

// YYYY-MM-DD (no timezone) — tweak if you want ISO datetime instead
const DateYMD = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Must be YYYY-MM-DD")

// Allow absolute (http/https) or site-relative (/path) links
function isValidHref(href: string) {
  if (/^https?:\/\//i.test(href)) return true
  if (href.startsWith("/")) return true
  return false
}

/** ---------- Block Schemas (discriminated union) ---------- */

const PBlock = z.object({
  type: z.literal("p"),
  text: nz,
})

const H2Block = z.object({
  type: z.literal("h2"),
  text: nz,
})

const H3Block = z.object({
  type: z.literal("h3"),
  text: nz,
})

const H4Block = z.object({
  type: z.literal("h4"),
  text: nz,
})

const UlBlock = z.object({
  type: z.literal("ul"),
  items: z.array(nz).min(1, "List cannot be empty"),
})

const OlBlock = z.object({
  type: z.literal("ol"),
  items: z.array(nz).min(1, "List cannot be empty"),
})

const UlLinksBlock = z.object({
  type: z.literal("ul-links"),
  items: z
    .array(
      z.object({
        text: nz,
        href: nz.refine(isValidHref, "href must be absolute (http/https) or site-relative (/...)"),
      })
    )
    .min(1, "Links list cannot be empty"),
})

const BlockquoteBlock = z.object({
  type: z.literal("blockquote"),
  text: nz,
})

const HrBlock = z.object({
  type: z.literal("hr"),
})

export const BlockSchema = z.discriminatedUnion("type", [
  PBlock,
  H2Block,
  H3Block,
  H4Block,
  UlBlock,
  OlBlock,
  UlLinksBlock,
  BlockquoteBlock,
  HrBlock,
])

/** ---------- Section & Document Schemas ---------- */

export const SectionSchema = z.object({
  title: nz,
  blocks: z.array(BlockSchema).min(1, "Section must contain at least one block"),
})

export const PolicyDocSchema = z
  .object({
    lastUpdated: DateYMD.optional(),
    // Declare allowed variable names (used like {{companyName}})
    vars: z.array(z.string().regex(/^\w+$/, "Vars must be word characters")).optional(),
    sections: z.array(SectionSchema).min(1, "Document requires at least one section"),
  })
  .superRefine((doc, ctx) => {
    // Validate that all {{var}} placeholders used in text/titles are declared in `vars`
    const allowed = new Set(doc.vars ?? [])
    const unknown = new Set<string>()
    const varRe = /{{(\w+)}}/g

    function scanText(s: string | undefined) {
      if (!s) return
      let m: RegExpExecArray | null
      while ((m = varRe.exec(s)) !== null) {
        const key = m[1]
        if (!allowed.has(key)) unknown.add(key)
      }
    }

    for (const sec of doc.sections) {
      scanText(sec.title)
      for (const b of sec.blocks) {
        // scan all text fields that exist on the block
        if ("text" in b && typeof b.text === "string") {
          scanText(b.text)
        }
        if (b.type === "ul" || b.type === "ol") {
          for (const it of b.items) scanText(it)
        }
        if (b.type === "ul-links") {
          for (const it of b.items) {
            scanText(it.text)
            scanText(it.href) // allows {{baseUrl}}/path if you want
          }
        }
      }
    }

    if (unknown.size > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Unknown template vars used: ${Array.from(unknown).join(", ")}`,
        path: ["vars"], // point near the var declaration
      })
    }
  })

/** ---------- Types ---------- */

export type LinkItem = z.infer<typeof UlLinksBlock>["items"][number]
export type Block = z.infer<typeof BlockSchema>
export type Section = z.infer<typeof SectionSchema>
export type PolicyDoc = z.infer<typeof PolicyDocSchema>

/** ---------- Convenience utilities ---------- */

export function validatePolicyDoc(json: unknown) {
  const result = PolicyDocSchema.safeParse(json)
  if (!result.success) {
    // throw with a readable message (optional)
    const flat = result.error.flatten()
    const details = [
      ...flat.formErrors,
      ...Object.entries(flat.fieldErrors).flatMap(([k, v]) => v?.map(msg => `${k}: ${msg}`) ?? []),
    ]
    throw new Error(`Invalid policy JSON:\n${details.join("\n")}`)
  }
  return result.data
}
