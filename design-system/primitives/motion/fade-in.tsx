"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import {
  fadeTransition,
  fadeVariants,
  microTransition,
  reducedMotionVariants,
} from "@/lib/animation";
import { cn } from "@/design-system/shared";

export interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  once = true,
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={shouldReduceMotion ? reducedMotionVariants : fadeVariants}
      transition={
        shouldReduceMotion
          ? { ...microTransition, delay: 0 }
          : { ...fadeTransition, delay }
      }
    >
      {children}
    </motion.div>
  );
}
