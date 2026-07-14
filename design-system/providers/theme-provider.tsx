"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  THEME_STORAGE_KEY,
  applyThemeAttribute,
  isThemePreference,
  resolveTheme,
  type ResolvedTheme,
  type ThemePreference,
} from "./theme-storage";

interface ThemeContextValue {
  preference: ThemePreference;
  resolvedTheme: ResolvedTheme;
  setPreference: (preference: ThemePreference) => void;
  cyclePreference: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const preferenceListeners = new Set<() => void>();

function emitPreferenceChange() {
  preferenceListeners.forEach((listener) => listener());
}

function readStoredPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (isThemePreference(stored)) {
      return stored;
    }
  } catch {
    // localStorage unavailable — fall through to system
  }

  return "system";
}

function subscribePreference(listener: () => void) {
  preferenceListeners.add(listener);

  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY || event.key === null) {
      listener();
    }
  };

  window.addEventListener("storage", onStorage);

  return () => {
    preferenceListeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getPreferenceSnapshot(): ThemePreference {
  return readStoredPreference();
}

function getPreferenceServerSnapshot(): ThemePreference {
  return "system";
}

function subscribeSystemTheme(listener: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}

function getSystemPrefersDarkSnapshot(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getSystemPrefersDarkServerSnapshot(): boolean {
  return false;
}

function persistPreference(next: ThemePreference) {
  applyThemeAttribute(next);

  try {
    localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // Persistence is best-effort
  }

  emitPreferenceChange();
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const preference = useSyncExternalStore(
    subscribePreference,
    getPreferenceSnapshot,
    getPreferenceServerSnapshot,
  );

  const systemPrefersDark = useSyncExternalStore(
    subscribeSystemTheme,
    getSystemPrefersDarkSnapshot,
    getSystemPrefersDarkServerSnapshot,
  );

  const resolvedTheme: ResolvedTheme = resolveTheme(
    preference,
    systemPrefersDark,
  );

  const setPreference = useCallback((next: ThemePreference) => {
    persistPreference(next);
  }, []);

  const cyclePreference = useCallback(() => {
    // Sun/moon toggle flips resolved appearance. Avoid dark→system when OS is
    // dark (identical visuals). "system" remains the unset/default preference.
    const next: ThemePreference = resolvedTheme === "dark" ? "light" : "dark";
    persistPreference(next);
  }, [resolvedTheme]);

  const value = useMemo(
    () => ({
      preference,
      resolvedTheme,
      setPreference,
      cyclePreference,
    }),
    [preference, resolvedTheme, setPreference, cyclePreference],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
