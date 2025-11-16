
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
  
  sections: Section[]
}

export type Vars = Record<string, string>

export type Level = 1 | 2 | 3 | 4 | 5 | 6;