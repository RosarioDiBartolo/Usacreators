// ============================================================================
// FILE: components/onboarding/additional-info.tsx
// TanStack Form version (no RHF).
// ============================================================================
"use client";

import { motion } from "framer-motion";
import {
  Field as DSField,
  FieldLabel,
  FieldError,
  FieldGroup,
  FieldDescription,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { fadeInUp } from "./utils";
import { clientFormObject } from "@/lib/creators/schemas/creator-apply-client";
import { FormType } from "./use-application-form";
import { getFieldErrors } from "@/lib/field";
import {
  TagsTrigger,
  TagsValue,
  TagsContent,
  TagsInput,
  TagsList,
  TagsEmpty,
  TagsGroup,
  TagsItem,
  Tags,
} from "../ui/shadcn-io/tags";
import { useEffect, useState } from "react";

const defaultTags = [
  { id: "react", label: "React" },
  { id: "typescript", label: "TypeScript" },
  { id: "javascript", label: "JavaScript" },
  { id: "nextjs", label: "Next.js" },
  { id: "vuejs", label: "Vue.js" },
  { id: "angular", label: "Angular" },
  { id: "svelte", label: "Svelte" },
  { id: "nodejs", label: "Node.js" },
  { id: "python", label: "Python" },
  { id: "ruby", label: "Ruby" },
  { id: "java", label: "Java" },
  { id: "csharp", label: "C#" },
  { id: "php", label: "PHP" },
  { id: "go", label: "Go" },
];
function Niches({ onChange }: { onChange: (v: string[]) => void }) {
  const [selected, setSelected] = useState<string[]>([]);

  const handleRemove = (value: string) => {
    if (!selected.includes(value)) {
      return;
    }
    console.log(`removed: ${value}`);
    setSelected((prev) => prev.filter((v) => v !== value));
  };
  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      handleRemove(value);
      return;
    }
    console.log(`selected: ${value}`);
    setSelected((prev) => [...prev, value]);
  };
  useEffect(() => {
    if (selected.length > 0) onChange(selected);
  }, [onChange, selected]);

  return (
    <Tags className=" ">
      <TagsTrigger>
        {selected.map((tag) => (
          <TagsValue key={tag} onRemove={() => handleRemove(tag)}>
            {defaultTags.find((t) => t.id === tag)?.label}
          </TagsValue>
        ))}
      </TagsTrigger>
      <TagsContent>
        <TagsInput placeholder="Search tag..." />
        <TagsList>
          <TagsEmpty />
          <TagsGroup>
            {defaultTags
              .filter((tag) => !selected.includes(tag.id))
              .map((tag) => (
                <TagsItem key={tag.id} onSelect={handleSelect} value={tag.id}>
                  {tag.label}
                </TagsItem>
              ))}
          </TagsGroup>
        </TagsList>
      </TagsContent>
    </Tags>
  );
}

export function AdditionalInfo({ form }: { form: FormType }) {
  return (
    <FieldGroup className="space-y-6">
      <motion.div variants={fadeInUp}>
        <form.Field
          name="niches"
          validators={{ onChange: clientFormObject.shape.niches }}
        >
          {(f) => {
            const errs = getFieldErrors(f);
            return (
              <DSField data-invalid={!!errs.length}>
                <FieldLabel htmlFor="niches">Niches</FieldLabel>
                <Niches onChange={f.handleChange} />
                <FieldDescription>Add from 1 to 5 niches</FieldDescription>
                {!!errs.length && <FieldError errors={errs} />}
              </DSField>
            );
          }}
        </form.Field>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <form.Field
          name="bio"
          validators={{ onChange: clientFormObject.shape.bio }}
        >
          {(f) => {
            const errs = getFieldErrors(f);
            return (
              <DSField data-invalid={!!errs.length}>
                <FieldLabel htmlFor="bio">Bio</FieldLabel>
                <Textarea
                  id="bio"
                  placeholder="Tell us a bit about yourself..."
                  value={f.state.value ?? ""}
                  onChange={(e) => f.handleChange(e.target.value)}
                  onBlur={f.handleBlur}
                  aria-invalid={!!errs.length}
                />
                <FieldDescription>Max 1000 characters.</FieldDescription>
                {!!errs.length && <FieldError errors={errs} />}
              </DSField>
            );
          }}
        </form.Field>
      </motion.div>
    </FieldGroup>
  );
}
