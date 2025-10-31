// ============================================================================
// FILE: components/onboarding/utils.ts
// Purpose: Animations, simple helpers, and mock upload function.
// ============================================================================
import { type Variants } from "framer-motion";


export const fadeInUp: Variants = {
hidden: { opacity: 0, y: 12 },
visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};


export const contentVariants: Variants = {
hidden: { opacity: 0, y: 8 },
visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
};


export function opt<T extends string | undefined>(v: T) {
return v && v.trim() !== "" ? v : undefined;
}


// Replace with your storage upload. For demo, we "fake" it.
export async function uploadProfileImage(file: File) {
// simulate latency
await new Promise((r) => setTimeout(r, 400));
// return a pretend CDN URL
return URL.createObjectURL(file);
}