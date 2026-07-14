import Image from "next/image";
import {
  ButtonLink,
  Container,
  Reveal,
  Text,
} from "@/design-system/primitives";
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
          <Reveal>
            <Text variant="metadata" as="p">
              Exhibition
            </Text>
          </Reveal>

          <Reveal delay={0.06}>
            <Text
              variant="display"
              as="p"
              className="max-w-xl text-text-primary"
            >
              {siteName}
            </Text>
          </Reveal>

          <Reveal delay={0.12}>
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
          </Reveal>

          <Reveal delay={0.18}>
            <div>
              <ButtonLink href={content.cta.href}>
                {content.cta.label}
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </div>

      {featuredArtwork ? (
        <div className="relative min-h-[50svh] w-full overflow-hidden bg-surface-secondary lg:min-h-0 lg:w-1/2">
          <Image
            src={featuredArtwork.coverSrc}
            alt={featuredArtwork.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            unoptimized={featuredArtwork.coverSrc.endsWith(".svg")}
          />
        </div>
      ) : null}
    </section>
  );
}
