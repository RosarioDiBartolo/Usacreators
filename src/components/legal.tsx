import React, { JSX } from "react"

/** ===== Types shared by all your JSON docs ===== */
export type LinkItem = { text: string; href: string }

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "h4"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "ul-links"; items: LinkItem[] }
  | { type: "blockquote"; text: string }
  | { type: "hr" }

export type Section = {
  title: string
  blocks: Block[]
}

export type PolicyDoc = {
  lastUpdated?: string
  vars?: string[]
  sections: Section[]
}

type Vars = Record<string, string>

export type PolicyRendererProps = {
  /** Parsed JSON document */
  doc: PolicyDoc
  /** Variables like { companyName, contactEmail } */
  vars?: Vars
  /**
   * Starting level for section titles (default 2 -> <h2>).
   * Internal h2/h3/h4 blocks render relative to this.
   */
  startLevel?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
}

/** ===== Helpers ===== */
function clampHeading(n: number) {
  return Math.min(Math.max(n, 1), 6)
}

function H({
  level,
  children,
  className,
}: {
  level: number
  children: React.ReactNode
  className?: string
}) {
  const Tag = (`h${clampHeading(level)}` as unknown) as keyof JSX.IntrinsicElements
  return <Tag className={className}>{children}</Tag>
}

function replaceVars(s: string, vars: Vars = {}) {
  return s.replace(/{{(\w+)}}/g, (_, k) => (vars[k] ?? `{{${k}}}`))
}

/**
 * Minimal inline markdown:
 * - **bold**
 * - *italic*
 * - `code`
 * - [text](url)
 * - preserves \n as <br />
 * No HTML passthrough (safe).
 */
function renderInline(text: string): React.ReactNode[] {
  const out: React.ReactNode[] = []
  const lines = text.split("\n")

  const tokenRe =
    /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[([^\]]+)\]\(([^)]+)\))/g

  lines.forEach((line, i) => {
    let last = 0
    let m: RegExpExecArray | null
    while ((m = tokenRe.exec(line)) !== null) {
      if (m.index > last) out.push(line.slice(last, m.index))

      const token = m[1]
      if (token.startsWith("**")) {
        out.push(<strong key={out.length}>{token.slice(2, -2)}</strong>)
      } else if (token.startsWith("*")) {
        out.push(<em key={out.length}>{token.slice(1, -1)}</em>)
      } else if (token.startsWith("`")) {
        out.push(<code key={out.length}>{token.slice(1, -1)}</code>)
      } else {
        const text = m[2]
        const href = m[3]
        out.push(
          <a key={out.length} href={href} target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        )
      }
      last = tokenRe.lastIndex
    }
    if (last < line.length) out.push(line.slice(last))
    if (i < lines.length - 1) out.push(<br key={`br-${i}-${out.length}`} />)
  })

  return out
}

/** ===== Main Component ===== */
export function PolicyRenderer({
  doc,
  vars = {},
  startLevel = 2,
  className,
}: PolicyRendererProps) {
  return (
    <div className={className}>
      {doc.lastUpdated && (
        <p>
          <em>Last Updated: {doc.lastUpdated}</em>
        </p>
      )}

      {doc.sections.map((sec, sIdx) => {
        const secTitle = replaceVars(sec.title, vars)
        return (
          <section key={sIdx} className="policy-section">
            <H level={startLevel}>{renderInline(secTitle)}</H>

            {sec.blocks.map((b, i) => {
              switch (b.type) {
                case "p":
                  return (
                    <p key={i}>{renderInline(replaceVars(b.text, vars))}</p>
                  )

                case "h2":
                case "h3":
                case "h4": {
                  const offset = b.type === "h2" ? 0 : b.type === "h3" ? 1 : 2
                  return (
                    <H key={i} level={clampHeading(startLevel + offset)}>
                      {renderInline(replaceVars(b.text, vars))}
                    </H>
                  )
                }

                case "ul":
                  return (
                    <ul key={i}>
                      {b.items.map((it, k) => (
                        <li key={k}>{renderInline(replaceVars(it, vars))}</li>
                      ))}
                    </ul>
                  )

                case "ol":
                  return (
                    <ol key={i}>
                      {b.items.map((it, k) => (
                        <li key={k}>{renderInline(replaceVars(it, vars))}</li>
                      ))}
                    </ol>
                  )

                case "ul-links":
                  return (
                    <ul key={i}>
                      {b.items.map((it, k) => (
                        <li key={k}>
                          <a
                            href={replaceVars(it.href, vars)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {renderInline(replaceVars(it.text, vars))}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )

                case "blockquote":
                  return (
                    <blockquote key={i}>
                      {renderInline(replaceVars(b.text, vars))}
                    </blockquote>
                  )

                case "hr":
                  return <hr key={i} />

                default:
                  // Unknown future block type → ignore gracefully
                  return null
              }
            })}
          </section>
        )
      })}
    </div>
  )
}

/* ===== Example usage for ANY file =====

import terms from "./terms-and-conditions.json" assert { type: "json" }
import privacy from "./privacy-policy.json" assert { type: "json" }
import cookies from "./cookie-policy.json" assert { type: "json" }

export default function PolicyPage() {
  return (
    <>
      <PolicyRenderer
        doc={terms}
        vars={{ companyName: "Miami Creators LLC", contactEmail: "support@miamicreator.co" }}
        startLevel={2}
        className="prose max-w-none"
      />
      <PolicyRenderer
        doc={privacy}
        vars={{ companyName: "Miami Creators LLC", contactEmail: "support@miamicreator.co" }}
        startLevel={2}
        className="prose max-w-none mt-12"
      />
      <PolicyRenderer
        doc={cookies}
        vars={{ companyName: "Miami Creators LLC", contactEmail: "support@miamicreator.co" }}
        startLevel={2}
        className="prose max-w-none mt-12"
      />
    </>
  )
}

===== */
