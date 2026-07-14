import Image from "next/image";
import {
  ArtworkMeta,
  ArtworkMetaList,
  type ArtworkMetaItem,
} from "@/design-system/composites";
import {
  FadeIn,
  HeroEntrance,
  Reveal,
  Section,
  Text,
} from "@/design-system/primitives";
import { staggerDelay } from "@/lib/animation";
import type { ArtworkDetailModel } from "@/lib/content";

export interface ArtworkHeroProps {
  artwork: ArtworkDetailModel;
}

function buildMetaItems(artwork: ArtworkDetailModel): ArtworkMetaItem[] {
  const items: ArtworkMetaItem[] = [
    { label: "Category", value: artwork.category },
    { label: "Year", value: String(artwork.year) },
    { label: "Medium", value: artwork.medium },
  ];

  if (artwork.role) {
    items.push({ label: "Role", value: artwork.role });
  }

  if (artwork.duration) {
    items.push({ label: "Duration", value: artwork.duration });
  }

  if (artwork.client) {
    items.push({ label: "Client", value: artwork.client });
  }

  if (artwork.dimensions) {
    items.push({ label: "Dimensions", value: artwork.dimensions });
  }

  return items;
}

export function ArtworkHero({ artwork }: ArtworkHeroProps) {
  const metaItems = buildMetaItems(artwork);

  return (
    <Section
      as="header"
      aria-labelledby="artwork-hero-heading"
      className="pt-8 md:pt-12"
    >
      <div className="flex flex-col gap-10 lg:grid lg:grid-cols-12 lg:gap-12 lg:gap-y-0">
        <HeroEntrance className="lg:col-span-7">
          <div
            className="relative overflow-hidden bg-surface-secondary"
            style={{ aspectRatio: artwork.aspectRatio }}
          >
            <Image
              src={artwork.coverSrc}
              alt={artwork.coverAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-contain"
              unoptimized={artwork.coverSrc.endsWith(".svg")}
            />
          </div>
        </HeroEntrance>

        <div className="flex flex-col gap-6 lg:col-span-5 lg:pt-4">
          <Reveal delay={staggerDelay(0, "relaxed")}>
            <ArtworkMeta category={artwork.category} year={artwork.year} />
          </Reveal>

          <HeroEntrance delay={staggerDelay(1, "relaxed")}>
            <Text
              variant="display"
              as="h1"
              id="artwork-hero-heading"
              className="text-text-primary"
            >
              {artwork.title}
            </Text>
          </HeroEntrance>

          <Reveal delay={staggerDelay(2, "relaxed")}>
            <Text
              variant="body"
              as="p"
              className="max-w-prose text-text-secondary"
            >
              {artwork.summary}
            </Text>
          </Reveal>

          <FadeIn delay={staggerDelay(3, "relaxed")}>
            <ArtworkMetaList items={metaItems} />
          </FadeIn>
        </div>
      </div>
    </Section>
  );
}
