import {
  ImageLightbox,
  SectionHeading,
} from "@/design-system/composites";
import { Reveal, Section } from "@/design-system/primitives";
import type { ArtworkDetailModel } from "@/lib/content";
import type { ArtworkPageContent } from "@/types/content";

export interface ArtworkGalleryProps {
  artwork: ArtworkDetailModel;
  content: ArtworkPageContent["gallery"];
}

export function ArtworkGallery({ artwork, content }: ArtworkGalleryProps) {
  if (artwork.gallery.length === 0) {
    return null;
  }

  return (
    <Section
      aria-labelledby="artwork-gallery-heading"
      className="border-t border-border-subtle"
    >
      <div className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="Looking closer"
            title={content.headline}
            titleId="artwork-gallery-heading"
            supporting={content.supporting}
          />
        </Reveal>

        <Reveal delay={0.06}>
          <ImageLightbox
            images={artwork.gallery}
            aspectRatio={artwork.aspectRatio}
          />
        </Reveal>
      </div>
    </Section>
  );
}
