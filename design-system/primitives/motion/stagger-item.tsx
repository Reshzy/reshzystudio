"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import {
  microTransition,
  reducedMotionVariants,
  revealTransition,
  revealVariants,
  staggerDelay,
  type StaggerToken,
} from "@/lib/animation";
import { cn } from "@/design-system/shared";

export interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  index?: number;
  stagger?: StaggerToken;
  once?: boolean;
}

/**
 * Scroll reveal with tokenized stagger delay — prefer over ad-hoc delay math.
 */
export function StaggerItem({
  children,
  className,
  index = 0,
  stagger = "default",
  once = true,
}: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();
  const delay = shouldReduceMotion ? 0 : staggerDelay(index, stagger);

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={
        shouldReduceMotion ? reducedMotionVariants : revealVariants
      }
      transition={
        shouldReduceMotion
          ? microTransition
          : { ...revealTransition, delay }
      }
    >
      {children}
    </motion.div>
  );
}
