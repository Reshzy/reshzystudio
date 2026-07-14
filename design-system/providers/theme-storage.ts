export const THEME_STORAGE_KEY = "theme";

export type ThemePreference = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export function isThemePreference(
  value: string | null,
): value is ThemePreference {
  return value === "light" || value === "dark" || value === "system";
}

export function resolveTheme(
  preference: ThemePreference,
  systemPrefersDark: boolean,
): ResolvedTheme {
  if (preference === "system") {
    return systemPrefersDark ? "dark" : "light";
  }

  return preference;
}

export function applyThemeAttribute(preference: ThemePreference): void {
  const root = document.documentElement;

  if (preference === "system") {
    root.removeAttribute("data-theme");
    root.style.colorScheme = "light dark";
    return;
  }

  root.setAttribute("data-theme", preference);
  root.style.colorScheme = preference;
}

/**
 * Inline script for root layout — must stay synchronized with applyThemeAttribute.
 */
export const themeInitScript = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var t=localStorage.getItem(k);var r=document.documentElement;if(t==="light"||t==="dark"){r.setAttribute("data-theme",t);r.style.colorScheme=t}else{r.removeAttribute("data-theme");r.style.colorScheme="light dark"}}catch(e){}})()`;
