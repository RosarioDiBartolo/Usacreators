// ============================================================================
// FILE: components/onboarding/personal-info.tsx
// (minor a11y tweaks)
// ============================================================================
"use client";
import { Controller, type Control } from "react-hook-form";
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { ClientFormData as FormDataType } from "@shared/creator-apply-client";



export function PersonalInfo({ control }: { control: Control<FormDataType> }) {
return (
<FieldGroup>
<Controller
name="name"
control={control}
render={({ field, fieldState }) => (
<Field data-invalid={fieldState.invalid}>
<FieldLabel htmlFor="name">Name</FieldLabel>
<Input id="name" {...field} aria-invalid={fieldState.invalid} autoComplete="name" />
{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
</Field>
)}
/>
<Controller
name="email"
control={control}
render={({ field, fieldState }) => (
<Field data-invalid={fieldState.invalid}>
<FieldLabel htmlFor="email">Email</FieldLabel>
<Input id="email" type="email" {...field} aria-invalid={fieldState.invalid} autoComplete="email" />
{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
</Field>
)}
/>
</FieldGroup>
);
}