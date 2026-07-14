import { CTASection } from "@/design-system/composites";
import type { ArtworkPageContent } from "@/types/content";

export interface ArtworkCtaProps {
  content: ArtworkPageContent["cta"];
}

export function ArtworkCta({ content }: ArtworkCtaProps) {
  return (
    <CTASection
      eyebrow="Contact"
      title={content.headline}
      titleId="artwork-cta-heading"
      body={content.body}
      cta={content.cta}
    />
  );
}
