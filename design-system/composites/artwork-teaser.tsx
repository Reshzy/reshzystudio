import { ArtworkCard } from "./artwork-card";
import type { ArtworkPreviewModel } from "@/lib/content";

export interface ArtworkTeaserProps {
  artwork: ArtworkPreviewModel;
  priority?: boolean;
  className?: string;
}

/** Standard artwork preview — thin wrapper over ArtworkCard for existing call sites. */
export function ArtworkTeaser({
  artwork,
  priority = false,
  className,
}: ArtworkTeaserProps) {
  return (
    <ArtworkCard
      artwork={artwork}
      variant="standard"
      priority={priority}
      className={className}
    />
  );
}
