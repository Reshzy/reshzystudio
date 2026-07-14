import collectionContent from "@/content/site/collection.json";
import type { CollectionPageContent } from "@/types/content";

export function loadCollectionContent(): CollectionPageContent {
  return collectionContent as CollectionPageContent;
}
