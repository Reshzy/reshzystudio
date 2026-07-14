import { HeroEntrance, Section, Text } from "@/design-system/primitives";
import { staggerDelay } from "@/lib/animation";
import type { AboutPageContent, Profile } from "@/types/content";

export interface AboutHeroProps {
  profile: Profile;
  content: AboutPageContent["hero"];
}

export function AboutHero({ profile, content }: AboutHeroProps) {
  return (
    <Section
      as="header"
      aria-labelledby="about-hero-heading"
      width="prose"
      className="pb-8 md:pb-12 lg:pb-16"
    >
      <div className="flex flex-col gap-8">
        <HeroEntrance>
          <Text variant="metadata" as="p">
            Profile
          </Text>
        </HeroEntrance>

        <HeroEntrance delay={staggerDelay(1, "relaxed")}>
          <Text
            variant="display"
            as="h1"
            id="about-hero-heading"
            className="max-w-3xl text-text-primary"
          >
            {profile.name}
          </Text>
        </HeroEntrance>

        <HeroEntrance delay={staggerDelay(2, "relaxed")}>
          <div className="flex max-w-md flex-col gap-4">
            <Text variant="subheading" as="p" className="text-text-primary">
              {content.headline}
            </Text>
            {content.supporting ? (
              <Text variant="body" as="p" className="text-text-secondary">
                {content.supporting}
              </Text>
            ) : null}
            {profile.location ? (
              <Text variant="metadata" as="p">
                Based in {profile.location}
              </Text>
            ) : null}
          </div>
        </HeroEntrance>
      </div>
    </Section>
  );
}
