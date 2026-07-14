import { themeInitScript } from "@/design-system/providers";

/**
 * Blocking inline script that applies persisted theme before first paint.
 * Must render in the document head via the root layout.
 */
export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: themeInitScript }}
    />
  );
}
