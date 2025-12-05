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
import { FormType } from "../../../lib/creators/use-application-form";
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
} from "../../../components/ui/shadcn-io/tags";
import { AvailableNiches } from "@/lib/creators/constants";
import { Input } from "../../../components/ui/input";

function Niches({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const selected = value ?? [];

  const handleRemove = (tagId: string) => {
    const next = selected.filter((v) => v !== tagId);
    onChange(next);
  };

  const handleSelect = (tagId: string) => {
    // toggle selection
    if (selected.includes(tagId)) {
      handleRemove(tagId);
      return;
    }

    if (selected.length >= 5) return; // UI enforcement

    const next = [...selected, tagId];
    onChange(next);
  };

  return (
    <>
      <div className="flex items-center gap-3 py-2">
        {selected.map((tagId) => {
          const tag = AvailableNiches.find((t) => t.id === tagId);
          if (!tag) return null;

          return (
            <TagsValue
              className=" h-fit"
              key={tag.id}
              onRemove={() => handleRemove(tag.id)}
            >
              {tag.label}
            </TagsValue>
          );
        })}
      </div>
      <Tags className=" bg- muted ">
        <TagsTrigger disabled={value.length > 4} className="">
          Select one or more niches
        </TagsTrigger>

        <TagsContent>
          <TagsInput placeholder="Search tag..." />

          <TagsList>
            <TagsEmpty />

            <TagsGroup>
              {AvailableNiches.filter((t) => !selected.includes(t.id)).map(
                (t) => (
                  <TagsItem
                    key={t.id}
                    value={t.id}
                    onSelect={() => handleSelect(t.id)}
                  >
                    {t.label}
                  </TagsItem>
                )
              )}
            </TagsGroup>
          </TagsList>
        </TagsContent>
      </Tags>
    </>
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
                <Niches value={f.state.value} onChange={f.handleChange} />
                <FieldDescription>Add from 1 to 5 niches</FieldDescription>
                {!!errs.length && <FieldError errors={errs} />}
              </DSField>
            );
          }}
        </form.Field>
      </motion.div>
      <motion.div variants={fadeInUp}>
        <form.Field
          name="instagramPostUrl"
          validators={{ onChange: clientFormObject.shape.instagramPostUrl }}
        >
          {(f) => {
            const errs = getFieldErrors(f);
            return (
              <DSField data-invalid={!!errs.length}>
                <FieldLabel htmlFor="instagram-post-url">Instagram Post Url</FieldLabel>
                <Input
                  id="instagram-post-url"
                  placeholder="full URL"
                  value={f.state.value ?? ""}
                  onChange={(e) => f.handleChange(e.target.value)}
                  onBlur={f.handleBlur}
                  aria-invalid={!!errs.length}
                />{" "}
                <FieldDescription>
                  Content Creators – link to an Instagram post you have made
                  (this will be shown as a showcase in your profile)
                </FieldDescription>
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
