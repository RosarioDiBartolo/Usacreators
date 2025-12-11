// ============================================================================
// FILE: components/onboarding/social-info.tsx
// TanStack Form version (no RHF).
// ============================================================================
"use client";

 import {
  Field as DSField,
  FieldLabel,
  FieldError,
  FieldGroup,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input"; 
 import { FormType } from "../../../lib/creators/use-application-form";
import { getFieldErrors } from "@/lib/field";
import { formSchema } from "@/lib/creators/schemas/creators-apply-shared";

export function SocialInfo({ form }: { form: FormType }) {
  const step = formSchema.shape.social.shape
  return (
    <FieldGroup className="space-y-6">
      {/* Miami yes/no */}
        <div className=" flex gap-3"> 
        <form.Field
                  name="social.instagramPostUrl"
                  validators={{ onChange: step.instagramPostUrl }}
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
                          className=" rounded-r-none"
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
       {/* Portfolio */}
      
        <form.Field
          name="social.portfolio"
          validators={{ onChange: step.portfolio }}
        >
          {(f) => {
            const errs = getFieldErrors(f);
            return (
              <DSField data-invalid={!!errs.length}>
                <FieldLabel htmlFor="portfolio">Portfolio (optional)</FieldLabel>
                <Input
                  id="portfolio"
                  placeholder="full URL"
                  value={f.state.value ?? ""}
                  className="rounded-l-none"
                  onChange={(e) => f.handleChange(e.target.value)}
                  onBlur={f.handleBlur}
                  aria-invalid={!!errs.length}
                />
                <FieldDescription>
                  You don&apos;t have a portfolio? Use our free{" "}
                  <a
                    className="text-primary underline underline-offset-2"
                    href="https://www.canva.com/design/DAG4IWo1-Zg/OwSss0CsHKWkd3PciOKM2Q/view?utm_content=DAG4IWo1-Zg&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview"
                    target="_blank"
                    rel="noreferrer"
                  >
                    template
                  </a>{" "}
                  for a quick setup.
                  We ask this so Businesses can have a clearer Idea of your skillset
                </FieldDescription>
                {!!errs.length && <FieldError errors={errs} />}
              </DSField>
            );
          }}
        </form.Field>
</div>
      {/* Instagram */}
      
        <form.Field
          name="social.instagram"
          validators={{
            onChangeListenTo: ["social.tiktok"],
            onChange: ({ value, fieldApi }) => {
              const tiktok = fieldApi.form.getFieldValue("social.tiktok");

              // If both socials are empty → error
              if (!value && !tiktok) {
                return [{message: "Provide at least one social (Instagram or TikTok)."}];
              }

              // If this field has a value, validate it with Zod
              if (value) {
                const parsed =
                  step.instagram.safeParse(value);
                if (!parsed.success) {
                  // Return the first issue message (what TanStack expects)
                  return (
                    parsed.error.issues  || [{message: "Invalid Instagram profile."}]
                  );
                }
              }

              return undefined;
            },
          }}
        >
          {(f) => {
            const errs = getFieldErrors(f);

            return (
              <DSField data-invalid={!!errs.length}>
                <FieldLabel htmlFor="instagram">
                  Instagram Profile
                </FieldLabel>
                <Input
                  id="instagram"
                  placeholder="@yourhandle or full URL"
                  value={f.state.value ?? ""}
                  onChange={(e) => f.handleChange(e.target.value)}
                  onBlur={f.handleBlur}
                  aria-invalid={!!errs.length}
                />
                <FieldDescription>
                  Example: @miamicreator or https://instagram.com/miamicreator
                </FieldDescription>
                {!!errs.length && <FieldError errors={errs} />}
              </DSField>
            );
          }}
        </form.Field>

      {/* TikTok */}
      
        <form.Field
          name="social.tiktok"
          validators={{
            onChangeListenTo: ["social.instagram"],
            onChange: ({ value, fieldApi }) => {
              const instagram = fieldApi.form.getFieldValue("social.instagram");

              // If both socials are empty → error
              if (!value && !instagram) {
                return [{message: "Provide at least one social (Instagram or TikTok)."}];
              }

              // If this field has a value, validate it with Zod
              if (value) {
                const parsed = step.tiktok.safeParse(value);
                if (!parsed.success) {
                  return ( parsed.error.issues  || [{message: "Invalid TikTok profile."}] );
                }
              }

              return undefined;
            },
          }}
        >
          {(f) => {
            const errs = getFieldErrors(f);

            return (
              <DSField data-invalid={!!errs.length}>
                <FieldLabel htmlFor="tiktok">TikTok Profile</FieldLabel>
                <Input
                  id="tiktok"
                  placeholder="@yourhandle or full URL"
                  value={f.state.value ?? ""}
                  onChange={(e) => f.handleChange(e.target.value)}
                  onBlur={f.handleBlur}
                  aria-invalid={!!errs.length}
                />
                <FieldDescription>
                  Example: @miamivibes or https://tiktok.com/@miamivibes
                </FieldDescription>
                {!!errs.length && <FieldError errors={errs} />}
              </DSField>
            );
          }}
        </form.Field>
    </FieldGroup>
  );
}
