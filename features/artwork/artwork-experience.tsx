import { ArtworkCta } from "./artwork-cta";
import { ArtworkGallery } from "./artwork-gallery";
import { ArtworkHero } from "./artwork-hero";
import { ArtworkNavigation } from "./artwork-navigation";
import { ArtworkOverview } from "./artwork-overview";
import { ArtworkProcess } from "./artwork-process";
import { ArtworkRelated } from "./artwork-related";
import { ArtworkStory } from "./artwork-story";
import { ArtworkTools } from "./artwork-tools";
import type { ArtworkDetailModel } from "@/lib/content";
import type { ArtworkPageContent } from "@/types/content";

export interface ArtworkExperienceProps {
  artwork: ArtworkDetailModel;
  content: ArtworkPageContent;
}

export function ArtworkExperience({
  artwork,
  content,
}: ArtworkExperienceProps) {
  return (
    <div className="flex flex-1 flex-col">
      <ArtworkHero artwork={artwork} />
      <ArtworkOverview artwork={artwork} content={content.overview} />
      <ArtworkStory artwork={artwork} content={content.story} />
      <ArtworkProcess artwork={artwork} content={content.process} />
      <ArtworkTools artwork={artwork} content={content.tools} />
      <ArtworkGallery artwork={artwork} content={content.gallery} />
      <ArtworkRelated artwork={artwork} content={content.related} />
      <ArtworkNavigation artwork={artwork} />
      <ArtworkCta content={content.cta} />
    </div>
  );
}
