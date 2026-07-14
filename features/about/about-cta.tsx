import { CTASection } from "@/design-system/composites";
import type { AboutPageContent } from "@/types/content";

export interface AboutCtaProps {
  content: AboutPageContent["cta"];
}

export function AboutCta({ content }: AboutCtaProps) {
  return (
    <CTASection
      eyebrow="Contact"
      title={content.headline}
      titleId="about-cta-heading"
      body={content.body}
      cta={content.cta}
    />
  );
}
