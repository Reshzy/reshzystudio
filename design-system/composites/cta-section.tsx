import {
  ButtonLink,
  FadeIn,
  Reveal,
  Section,
  Text,
} from "@/design-system/primitives";
import type { ContentLink } from "@/types/content";

export interface CTASectionProps {
  eyebrow?: string;
  title: string;
  titleId: string;
  body?: string;
  cta?: ContentLink;
  width?: "default" | "prose" | "full";
}

export function CTASection({
  eyebrow = "Contact",
  title,
  titleId,
  body,
  cta,
  width = "prose",
}: CTASectionProps) {
  return (
    <Section aria-labelledby={titleId} width={width}>
      <Reveal>
        <div className="flex flex-col gap-8">
          {eyebrow ? (
            <Text variant="metadata" as="p">
              {eyebrow}
            </Text>
          ) : null}
          <Text variant="heading" as="h2" id={titleId}>
            {title}
          </Text>
          {body ? (
            <Text variant="body" as="p" className="text-text-secondary">
              {body}
            </Text>
          ) : null}
          {cta ? (
            <FadeIn delay={0.08}>
              <div>
                <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
              </div>
            </FadeIn>
          ) : null}
        </div>
      </Reveal>
    </Section>
  );
}
