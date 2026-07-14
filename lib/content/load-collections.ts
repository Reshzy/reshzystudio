import selectedWork from "@/content/collections/selected-work.json";
import type { Collection } from "@/types/content";

const collectionCatalog: Collection[] = [selectedWork as Collection];

function isPublicCollection(collection: Collection): boolean {
  return (
    collection.metadata.status === "published" &&
    collection.metadata.visibility === "public"
  );
}

export function loadAllCollections(): Collection[] {
  return collectionCatalog
    .filter(isPublicCollection)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export function loadCollectionBySlug(slug: string): Collection | undefined {
  return loadAllCollections().find((collection) => collection.slug === slug);
}
