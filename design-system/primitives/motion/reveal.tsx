"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import {
  microTransition,
  reducedMotionVariants,
  revealTransition,
  revealVariants,
} from "@/lib/animation";
import { cn } from "@/design-system/shared";

export interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function Reveal({
  children,
  className,
  delay = 0,
  once = true,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={shouldReduceMotion ? reducedMotionVariants : revealVariants}
      transition={
        shouldReduceMotion
          ? { ...microTransition, delay: 0 }
          : { ...revealTransition, delay }
      }
    >
      {children}
    </motion.div>
  );
}
