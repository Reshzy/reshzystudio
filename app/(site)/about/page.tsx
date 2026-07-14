import type { Metadata } from "next";
import {
  AboutCta,
  AboutEducation,
  AboutExperience,
  AboutFunFacts,
  AboutHero,
  AboutHighlights,
  AboutIntroduction,
  AboutSkills,
  AboutStory,
  AboutTechnologies,
  AboutTimeline,
  AboutValues,
} from "@/features/about";
import {
  loadAboutContent,
  loadProfile,
  loadSiteConfiguration,
} from "@/lib/content";
import { buildSiteMetadata } from "@/lib/metadata";

const siteConfig = loadSiteConfiguration();
const profile = loadProfile();

export const metadata: Metadata = buildSiteMetadata(siteConfig, {
  path: "/about",
  overrides: {
    title: "About",
    description:
      profile.shortBio ||
      `Meet ${siteConfig.identity.owner} — the artist behind the exhibition.`,
  },
});

export default function AboutPage() {
  const about = loadAboutContent();

  return (
    <div className="flex flex-1 flex-col">
      <AboutHero profile={profile} content={about.hero} />
      <AboutIntroduction profile={profile} content={about.introduction} />
      <AboutStory profile={profile} content={about.story} />
      <AboutTimeline
        entries={profile.timeline ?? []}
        content={about.timeline}
      />
      <AboutEducation
        entries={profile.education ?? []}
        content={about.education}
      />
      <AboutExperience
        entries={profile.experience ?? []}
        content={about.experience}
      />
      <AboutSkills skills={profile.skills} content={about.skills} />
      <AboutTechnologies
        tools={profile.tools}
        content={about.technologies}
      />
      <AboutValues values={profile.values ?? []} content={about.values} />
      <AboutFunFacts
        facts={profile.funFacts ?? []}
        content={about.funFacts}
      />
      <AboutHighlights
        highlights={profile.highlights ?? []}
        content={about.highlights}
      />
      <AboutCta content={about.cta} />
    </div>
  );
}
