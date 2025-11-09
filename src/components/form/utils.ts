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

 
 