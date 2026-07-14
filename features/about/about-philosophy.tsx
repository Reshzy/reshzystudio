import { QuoteBlock, SectionHeading } from "@/design-system/composites";
import { Reveal, Section } from "@/design-system/primitives";
import type { AboutPageContent, Profile } from "@/types/content";

export interface AboutPhilosophyProps {
  profile: Profile;
  content: AboutPageContent["philosophy"];
}

export function AboutPhilosophy({
  profile,
  content,
}: AboutPhilosophyProps) {
  if (!profile.philosophy) {
    return null;
  }

  return (
    <Section
      aria-labelledby="about-philosophy-heading"
      width="prose"
      className="border-y border-border-subtle bg-surface-primary"
    >
      <Reveal>
        <div className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Philosophy"
            title={content.headline}
            titleId="about-philosophy-heading"
            supporting={content.supporting}
          />
          <QuoteBlock>{profile.philosophy}</QuoteBlock>
        </div>
      </Reveal>
    </Section>
  );
}
