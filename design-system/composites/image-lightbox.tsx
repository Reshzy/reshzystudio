"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useEffectEvent,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CloseIcon } from "@/design-system/icons";
import { Button } from "@/design-system/primitives/button/button";
import { Text } from "@/design-system/primitives/typography/text";
import { cn } from "@/design-system/shared";
import { useFocusTrap } from "@/lib/a11y";
import {
  fadeTransition,
  microTransition,
  reducedMotionVariants,
} from "@/lib/animation";

export interface LightboxImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ImageLightboxProps {
  images: LightboxImage[];
  triggerClassName?: string;
  aspectRatio?: string;
}

export function ImageLightbox({
  images,
  triggerClassName,
  aspectRatio = "4 / 5",
}: ImageLightboxProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const isOpen = activeIndex !== null;
  const activeImage = activeIndex !== null ? images[activeIndex] : null;

  useFocusTrap(dialogRef, isOpen);

  const close = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null || images.length === 0) {
        return current;
      }
      return (current - 1 + images.length) % images.length;
    });
  }, [images.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null || images.length === 0) {
        return current;
      }
      return (current + 1) % images.length;
    });
  }, [images.length]);

  const onKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (!isOpen) {
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevious();
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    }
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => onKeyDown(event);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      lastTriggerRef.current?.focus();
    };
  }, [isOpen]);

  if (images.length === 0) {
    return null;
  }

  function openAt(index: number, trigger: HTMLElement) {
    lastTriggerRef.current = trigger;
    setActiveIndex(index);
  }

  function handleTriggerKeyDown(
    event: ReactKeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openAt(index, event.currentTarget);
    }
  }

  return (
    <>
      <ul
        className={cn(
          "grid grid-cols-1 gap-6 sm:grid-cols-2",
          triggerClassName,
        )}
      >
        {images.map((image, index) => (
          <li key={image.src}>
            <button
              type="button"
              className={cn(
                "group relative w-full overflow-hidden bg-surface-secondary text-left outline-none",
                "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring",
              )}
              style={{ aspectRatio }}
              aria-label={`View larger: ${image.alt}`}
              onClick={(event) => openAt(index, event.currentTarget)}
              onKeyDown={(event) => handleTriggerKeyDown(event, index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className={cn(
                  "object-contain transition-transform duration-large ease-standard",
                  "motion-safe:group-hover:scale-[1.02]",
                )}
                unoptimized={image.src.endsWith(".svg")}
              />
            </button>
            {image.caption ? (
              <Text
                variant="metadata"
                as="p"
                className="mt-3 text-text-secondary"
              >
                {image.caption}
              </Text>
            ) : null}
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {isOpen && activeImage ? (
          <motion.div
            ref={dialogRef}
            className="fixed inset-0 z-50 flex items-center justify-center bg-canvas/95 p-4 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            transition={shouldReduceMotion ? microTransition : fadeTransition}
            onClick={close}
          >
            <motion.div
              className="relative flex max-h-full w-full max-w-5xl flex-col gap-4"
              variants={
                shouldReduceMotion ? reducedMotionVariants : undefined
              }
              initial={shouldReduceMotion ? false : "hidden"}
              animate="visible"
              exit={shouldReduceMotion ? undefined : "hidden"}
              transition={shouldReduceMotion ? microTransition : fadeTransition}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <Text
                  variant="metadata"
                  as="p"
                  id={titleId}
                  className="text-text-secondary"
                >
                  {activeImage.alt}
                  {images.length > 1
                    ? ` · ${(activeIndex ?? 0) + 1} of ${images.length}`
                    : null}
                </Text>
                <Button
                  ref={closeRef}
                  variant="ghost"
                  aria-label="Close image viewer"
                  className="h-11 w-11 shrink-0 rounded-full px-0"
                  onClick={close}
                >
                  <CloseIcon className="h-5 w-5" />
                </Button>
              </div>

              <div
                className="relative w-full overflow-hidden bg-surface-secondary"
                style={{ aspectRatio, maxHeight: "75vh" }}
              >
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  unoptimized={activeImage.src.endsWith(".svg")}
                  priority
                />
              </div>

              {images.length > 1 ? (
                <div className="flex items-center justify-between gap-4">
                  <Button
                    variant="secondary"
                    onClick={showPrevious}
                    aria-label="Previous image"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={showNext}
                    aria-label="Next image"
                  >
                    Next
                  </Button>
                </div>
              ) : null}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
