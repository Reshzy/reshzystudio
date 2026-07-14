import { ArtworkTeaser } from "@/design-system/composites";
import {
  ButtonLink,
  Reveal,
  Section,
  Text,
} from "@/design-system/primitives";
import type { ArtworkPreviewModel } from "@/lib/content";
import type { HomeSectionContent } from "@/types/content";

export interface HomeFeaturedProps {
  content: HomeSectionContent;
  artworks: ArtworkPreviewModel[];
}

export function HomeFeatured({ content, artworks }: HomeFeaturedProps) {
  if (artworks.length === 0) {
    return null;
  }

  const [primary, ...rest] = artworks;

  return (
    <Section aria-labelledby="home-featured-heading">
      <div className="flex flex-col gap-12 md:gap-16">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="flex max-w-xl flex-col gap-3">
              <Text variant="metadata" as="p">
                Archive
              </Text>
              <Text
                variant="heading"
                as="h2"
                id="home-featured-heading"
              >
                {content.headline}
              </Text>
              {content.supporting ? (
                <Text variant="body" as="p" className="text-text-secondary">
                  {content.supporting}
                </Text>
              ) : null}
            </div>
            {content.cta ? (
              <ButtonLink href={content.cta.href} variant="ghost">
                {content.cta.label}
              </ButtonLink>
            ) : null}
          </div>
        </Reveal>

        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          {primary ? (
            <Reveal className="md:col-span-7" delay={0.04}>
              <ArtworkTeaser artwork={primary} priority />
            </Reveal>
          ) : null}

          {rest.length > 0 ? (
            <div className="flex flex-col gap-10 md:col-span-5 md:gap-8 md:pt-16">
              {rest.map((artwork, index) => (
                <Reveal key={artwork.id} delay={0.08 + index * 0.06}>
                  <ArtworkTeaser artwork={artwork} />
                </Reveal>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
