"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
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

const PREFERENCE_ORDER: ThemePreference[] = ["system", "light", "dark"];

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

function getSystemPrefersDark(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function readInitialPreference(): ThemePreference {
  if (typeof window === "undefined") {
    return "system";
  }

  return readStoredPreference();
}

function readInitialResolvedTheme(): ResolvedTheme {
  if (typeof window === "undefined") {
    return "light";
  }

  return resolveTheme(readStoredPreference(), getSystemPrefersDark());
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] =
    useState<ThemePreference>(readInitialPreference);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(
    readInitialResolvedTheme,
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const onChange = () => {
      setPreferenceState((current) => {
        if (current === "system") {
          applyThemeAttribute("system");
          setResolvedTheme(resolveTheme("system", media.matches));
        }
        return current;
      });
    };

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next);
    setResolvedTheme(resolveTheme(next, getSystemPrefersDark()));
    applyThemeAttribute(next);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Persistence is best-effort
    }
  }, []);

  const cyclePreference = useCallback(() => {
    setPreferenceState((current) => {
      const index = PREFERENCE_ORDER.indexOf(current);
      const next = PREFERENCE_ORDER[(index + 1) % PREFERENCE_ORDER.length]!;
      setResolvedTheme(resolveTheme(next, getSystemPrefersDark()));
      applyThemeAttribute(next);

      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // Persistence is best-effort
      }

      return next;
    });
  }, []);

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
