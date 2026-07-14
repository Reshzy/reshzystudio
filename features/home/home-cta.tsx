import { CTASection } from "@/design-system/composites";
import type { HomeSectionContent } from "@/types/content";

export interface HomeCtaProps {
  content: HomeSectionContent;
}

export function HomeCta({ content }: HomeCtaProps) {
  return (
    <CTASection
      eyebrow="Contact"
      title={content.headline}
      titleId="home-cta-heading"
      body={content.body}
      cta={content.cta}
    />
  );
}
