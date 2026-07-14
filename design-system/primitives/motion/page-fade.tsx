"use client";

import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  microTransition,
  pageTransition,
  pageVariants,
  reducedMotionVariants,
} from "@/lib/animation";

export interface PageFadeProps {
  children: ReactNode;
}

/**
 * Crossfade between routes — preserves exhibition continuity without hard cuts.
 * Uses opacity only (GPU-friendly). Honors prefers-reduced-motion.
 */
export function PageFade({ children }: PageFadeProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      key={pathname}
      className="flex flex-1 flex-col"
      initial="hidden"
      animate="visible"
      variants={
        shouldReduceMotion ? reducedMotionVariants : pageVariants
      }
      transition={shouldReduceMotion ? microTransition : pageTransition}
    >
      {children}
    </motion.div>
  );
}
