import {
  SectionHeading,
  TechBadge,
} from "@/design-system/composites";
import { Reveal, Section, Text } from "@/design-system/primitives";
import type { ArtworkDetailModel } from "@/lib/content";
import type { ArtworkPageContent } from "@/types/content";

export interface ArtworkToolsProps {
  artwork: ArtworkDetailModel;
  content: ArtworkPageContent["tools"];
}

export function ArtworkTools({ artwork, content }: ArtworkToolsProps) {
  if (artwork.software.length === 0 && artwork.colorPalette.length === 0) {
    return null;
  }

  return (
    <Section
      aria-labelledby="artwork-tools-heading"
      width="prose"
      className="border-t border-border-subtle"
    >
      <div className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="Tools"
            title={content.headline}
            titleId="artwork-tools-heading"
            supporting={content.supporting}
          />
        </Reveal>

        {artwork.software.length > 0 ? (
          <Reveal delay={0.04}>
            <ul className="flex flex-wrap gap-3" aria-label="Software used">
              {artwork.software.map((tool) => (
                <li key={tool}>
                  <TechBadge label={tool} />
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}

        {artwork.colorPalette.length > 0 ? (
          <Reveal delay={0.08}>
            <div className="flex flex-col gap-4">
              <Text variant="metadata" as="h3">
                Palette
              </Text>
              <ul
                className="flex flex-wrap gap-3"
                aria-label="Color palette"
              >
                {artwork.colorPalette.map((color) => (
                  <li key={color} className="flex items-center gap-3">
                    <span
                      className="h-8 w-8 border border-border-subtle"
                      style={{ backgroundColor: color }}
                      aria-hidden="true"
                    />
                    <Text
                      variant="caption"
                      as="span"
                      className="font-mono uppercase text-text-secondary"
                    >
                      {color}
                    </Text>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ) : null}
      </div>
    </Section>
  );
}
