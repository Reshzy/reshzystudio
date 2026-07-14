import { AboutCta } from "./about-cta";
import { AboutEducation } from "./about-education";
import { AboutExperience } from "./about-experience";
import { AboutFunFacts } from "./about-fun-facts";
import { AboutHero } from "./about-hero";
import { AboutHighlights } from "./about-highlights";
import { AboutIntroduction } from "./about-introduction";
import { AboutPhilosophy } from "./about-philosophy";
import { AboutSkills } from "./about-skills";
import { AboutStory } from "./about-story";
import { AboutTechnologies } from "./about-technologies";
import { AboutTimeline } from "./about-timeline";
import { AboutValues } from "./about-values";
import type { AboutPageContent, Profile } from "@/types/content";

export interface AboutPageExperienceProps {
  profile: Profile;
  content: AboutPageContent;
}

/**
 * Definitive professional profile at /about.
 * Narrative order: identity → summary → philosophy → journey →
 * timeline → experience → education → skills → tools → highlights →
 * values → notes → conversation.
 */
export function AboutPageExperience({
  profile,
  content,
}: AboutPageExperienceProps) {
  return (
    <div className="flex flex-1 flex-col">
      <AboutHero profile={profile} content={content.hero} />
      <AboutIntroduction profile={profile} content={content.introduction} />
      <AboutPhilosophy profile={profile} content={content.philosophy} />
      <AboutStory profile={profile} content={content.story} />
      <AboutTimeline
        entries={profile.timeline ?? []}
        content={content.timeline}
      />
      <AboutExperience
        entries={profile.experience ?? []}
        content={content.experience}
      />
      <AboutEducation
        entries={profile.education ?? []}
        content={content.education}
      />
      <AboutSkills skills={profile.skills} content={content.skills} />
      <AboutTechnologies
        tools={profile.tools}
        content={content.technologies}
      />
      <AboutHighlights
        highlights={profile.highlights ?? []}
        content={content.highlights}
      />
      <AboutValues values={profile.values ?? []} content={content.values} />
      <AboutFunFacts
        facts={profile.funFacts ?? []}
        content={content.funFacts}
      />
      <AboutCta content={content.cta} />
    </div>
  );
}
