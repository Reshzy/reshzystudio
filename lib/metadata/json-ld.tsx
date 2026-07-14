import type { JsonLdGraph } from "./structured-data";
import { serializeJsonLd } from "./structured-data";

export interface JsonLdProps {
  data: JsonLdGraph;
}

/**
 * Renders a JSON-LD script tag. Use a native script element (not next/script)
 * because this payload is structured data, not executable JavaScript.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(data),
      }}
    />
  );
}
