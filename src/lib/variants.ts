import type { Variants } from "framer-motion";

export const clipReveal: Variants = {
    hidden: { clipPath: "inset(0 100% 0 0)", opacity: 1 },
    visible: {
        clipPath: "inset(0 0% 0 0)",
        opacity: 1,
        transition: {
            duration: 0.7,
            ease: [0.62, 0.16, 0.13, 1.01],
        },
    },
};
