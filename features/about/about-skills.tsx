import { SectionHeading, SkillCard } from "@/design-system/composites";
import { Reveal, Section } from "@/design-system/primitives";
import { cn } from "@/design-system/shared";
import type { AboutPageContent, SkillEntry } from "@/types/content";

export interface AboutSkillsProps {
  skills: SkillEntry[];
  content: AboutPageContent["skills"];
}

export function AboutSkills({ skills, content }: AboutSkillsProps) {
  if (skills.length === 0) {
    return null;
  }

  return (
    <Section aria-labelledby="about-skills-heading">
      <div className="flex flex-col gap-12 md:gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="Disciplines"
            title={content.headline}
            titleId="about-skills-heading"
            supporting={content.supporting}
          />
        </Reveal>

        <ul className="grid gap-0 border-t border-border-subtle md:grid-cols-2">
          {skills.map((skill, index) => (
            <li
              key={skill.id}
              className={cn(
                "border-b border-border-subtle",
                index % 2 === 0 && "md:border-r",
              )}
            >
              <Reveal delay={index * 0.04}>
                <div
                  className={cn(
                    "px-0 py-8 md:px-8 md:py-10",
                    index % 2 === 0 && "md:pl-0",
                    index % 2 === 1 && "md:pr-0",
                  )}
                >
                  <SkillCard
                    label={skill.label}
                    description={skill.description}
                  />
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
