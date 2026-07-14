"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CloseIcon, MenuIcon } from "@/design-system/icons";
import { Text } from "@/design-system/primitives";
import { cn } from "@/design-system/shared";
import { useFocusTrap } from "@/lib/a11y";
import {
  duration,
  ease,
  interactiveControl,
  microTransition,
  smallTransition,
  staggerDelay,
} from "@/lib/animation";
import type { NavigationItem } from "@/types/content";
import { NavLink } from "./nav-link";

const subscribeNoop = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export interface MobileNavProps {
  items: NavigationItem[];
  className?: string;
}

export function MobileNav({ items, className }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(
    subscribeNoop,
    clientSnapshot,
    serverSnapshot,
  );
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useFocusTrap(panelRef, open);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [open]);

  const sortedItems = [...items].sort((a, b) => a.order - b.order);

  return (
    <div className={cn("md:hidden", className)}>
      <button
        ref={triggerRef}
        type="button"
        className={cn(
          "inline-flex size-10 items-center justify-center rounded-full",
          "text-text-primary hover:bg-surface-secondary",
          interactiveControl,
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
        )}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
      </button>

      {mounted
        ? createPortal(
            <AnimatePresence>
              {open ? (
                <motion.div
                  ref={panelRef}
                  id={panelId}
                  role="dialog"
                  aria-modal="true"
                  aria-label="Site navigation"
                  className="fixed inset-0 z-50 flex flex-col bg-canvas"
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={
                    shouldReduceMotion
                      ? microTransition
                      : { duration: duration.medium, ease: ease.enter }
                  }
                >
                  <div className="flex items-center justify-between px-4 py-4">
                    <Text variant="metadata" as="p">
                      Navigation
                    </Text>
                    <button
                      ref={closeButtonRef}
                      type="button"
                      className={cn(
                        "inline-flex size-10 items-center justify-center rounded-full",
                        "text-text-primary hover:bg-surface-secondary",
                        interactiveControl,
                        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
                      )}
                      aria-label="Close navigation"
                      onClick={() => setOpen(false)}
                    >
                      <CloseIcon className="size-5" />
                    </button>
                  </div>

                  <nav
                    aria-label="Primary"
                    className="flex flex-1 flex-col justify-center gap-8 px-8"
                  >
                    {sortedItems.map((item, index) => (
                      <motion.div
                        key={item.href}
                        initial={
                          shouldReduceMotion
                            ? { opacity: 0 }
                            : { opacity: 0, y: 12 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        transition={
                          shouldReduceMotion
                            ? microTransition
                            : {
                                ...smallTransition,
                                delay: staggerDelay(index, "tight"),
                              }
                        }
                      >
                        <NavLink
                          href={item.href}
                          onNavigate={() => setOpen(false)}
                          className="font-display text-heading after:hidden"
                        >
                          {item.label}
                        </NavLink>
                      </motion.div>
                    ))}
                  </nav>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </div>
  );
}
