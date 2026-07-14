"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import {
  heroTransition,
  heroVariants,
  microTransition,
  reducedMotionVariants,
} from "@/lib/animation";
import { cn } from "@/design-system/shared";

export interface HeroEntranceProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Primary hero entrance — slightly longer and deeper than section Reveal.
 */
export function HeroEntrance({
  children,
  className,
  delay = 0,
}: HeroEntranceProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      animate="visible"
      variants={
        shouldReduceMotion ? reducedMotionVariants : heroVariants
      }
      transition={
        shouldReduceMotion
          ? { ...microTransition, delay: 0 }
          : { ...heroTransition, delay }
      }
    >
      {children}
    </motion.div>
  );
}
