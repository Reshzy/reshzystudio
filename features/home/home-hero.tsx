import Image from "next/image";
import {
  ButtonLink,
  Container,
  HeroEntrance,
  Reveal,
  Text,
} from "@/design-system/primitives";
import { staggerDelay } from "@/lib/animation";
import type { ArtworkPreviewModel } from "@/lib/content";
import type { HomeHeroContent } from "@/types/content";

export interface HomeHeroProps {
  siteName: string;
  content: HomeHeroContent;
  featuredArtwork?: ArtworkPreviewModel;
}

export function HomeHero({
  siteName,
  content,
  featuredArtwork,
}: HomeHeroProps) {
  return (
    <section
      aria-labelledby="home-hero-heading"
      className="relative flex min-h-[calc(100svh-4rem)] flex-col lg:flex-row"
    >
      <div className="flex flex-1 flex-col justify-center py-16 lg:w-1/2 lg:py-24">
        <Container className="flex flex-col gap-8 lg:pr-12">
          <HeroEntrance delay={staggerDelay(0, "relaxed")}>
            <Text variant="metadata" as="p">
              Exhibition
            </Text>
          </HeroEntrance>

          <HeroEntrance delay={staggerDelay(1, "relaxed")}>
            <Text
              variant="display"
              as="p"
              className="max-w-xl text-text-primary"
            >
              {siteName}
            </Text>
          </HeroEntrance>

          <HeroEntrance delay={staggerDelay(2, "relaxed")}>
            <div className="flex max-w-md flex-col gap-4">
              <Text
                variant="subheading"
                as="h1"
                id="home-hero-heading"
                className="font-medium text-text-primary"
              >
                {content.headline}
              </Text>
              <Text variant="body" as="p" className="text-text-secondary">
                {content.supporting}
              </Text>
            </div>
          </HeroEntrance>

          <HeroEntrance delay={staggerDelay(3, "relaxed")}>
            <div>
              <ButtonLink href={content.cta.href}>
                {content.cta.label}
              </ButtonLink>
            </div>
          </HeroEntrance>
        </Container>
      </div>

      {featuredArtwork ? (
        <HeroEntrance
          delay={staggerDelay(1, "relaxed")}
          className="relative min-h-[50svh] w-full overflow-hidden bg-surface-secondary lg:min-h-0 lg:w-1/2"
        >
          <Image
            src={featuredArtwork.coverSrc}
            alt={featuredArtwork.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-hero ease-enter motion-safe:hover:scale-[1.02]"
            unoptimized={featuredArtwork.coverSrc.endsWith(".svg")}
          />
        </HeroEntrance>
      ) : null}
    </section>
  );
}
