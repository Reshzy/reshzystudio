import { ArtworkTeaser, SectionHeading } from "@/design-system/composites";
import {
  ButtonLink,
  Reveal,
  Section,
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
          <SectionHeading
            eyebrow="Archive"
            title={content.headline}
            titleId="home-featured-heading"
            supporting={content.supporting}
            align="between"
            actions={
              content.cta ? (
                <ButtonLink href={content.cta.href} variant="ghost">
                  {content.cta.label}
                </ButtonLink>
              ) : undefined
            }
          />
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
