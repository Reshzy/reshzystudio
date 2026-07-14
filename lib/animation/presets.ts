import type { Transition, Variants } from "motion/react";
import { duration, ease } from "./tokens";

export const fadeTransition: Transition = {
  duration: duration.medium,
  ease: ease.enter,
};

export const revealTransition: Transition = {
  duration: duration.large,
  ease: ease.enter,
};

export const microTransition: Transition = {
  duration: duration.micro,
  ease: ease.standard,
};

export const smallTransition: Transition = {
  duration: duration.small,
  ease: ease.standard,
};

export const heroTransition: Transition = {
  duration: duration.hero,
  ease: ease.enter,
};

export const pageTransition: Transition = {
  duration: duration.medium,
  ease: ease.enter,
};

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export const heroVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const reducedMotionRevealVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
