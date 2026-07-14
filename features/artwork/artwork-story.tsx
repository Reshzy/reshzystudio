import {
  QuoteBlock,
  SectionHeading,
} from "@/design-system/composites";
import { Reveal, Section, Text } from "@/design-system/primitives";
import type { ArtworkDetailModel } from "@/lib/content";
import type { ArtworkPageContent } from "@/types/content";

export interface ArtworkStoryProps {
  artwork: ArtworkDetailModel;
  content: ArtworkPageContent["story"];
}

interface StoryPassage {
  id: string;
  label: string;
  body: string;
}

function collectPassages(artwork: ArtworkDetailModel): StoryPassage[] {
  const { story } = artwork;
  const passages: StoryPassage[] = [];

  if (story.idea) {
    passages.push({ id: "idea", label: "Idea", body: story.idea });
  }
  if (story.inspiration) {
    passages.push({
      id: "inspiration",
      label: "Inspiration",
      body: story.inspiration,
    });
  }
  if (story.process) {
    passages.push({ id: "process", label: "Process", body: story.process });
  }
  if (story.challenges) {
    passages.push({
      id: "challenges",
      label: "Challenges",
      body: story.challenges,
    });
  }

  return passages;
}

export function ArtworkStory({ artwork, content }: ArtworkStoryProps) {
  const passages = collectPassages(artwork);
  const reflection = artwork.story.reflection;

  if (passages.length === 0 && !reflection) {
    return null;
  }

  return (
    <Section
      aria-labelledby="artwork-story-heading"
      width="prose"
      className="border-y border-border-subtle bg-surface-primary"
    >
      <div className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="Story"
            title={content.headline}
            titleId="artwork-story-heading"
            supporting={content.supporting}
          />
        </Reveal>

        {passages.length > 0 ? (
          <div className="flex flex-col gap-10">
            {passages.map((passage, index) => (
              <Reveal key={passage.id} delay={Math.min(index * 0.04, 0.16)}>
                <article className="flex flex-col gap-3">
                  <Text variant="metadata" as="h3">
                    {passage.label}
                  </Text>
                  <Text
                    variant="body"
                    as="p"
                    className="max-w-prose text-text-secondary"
                  >
                    {passage.body}
                  </Text>
                </article>
              </Reveal>
            ))}
          </div>
        ) : null}

        {reflection ? (
          <Reveal delay={0.08}>
            <QuoteBlock cite="Reflection">{reflection}</QuoteBlock>
          </Reveal>
        ) : null}
      </div>
    </Section>
  );
}
