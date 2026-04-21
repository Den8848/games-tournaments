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
  applyThemeToDom,
  getInitialThemeState,
  getSystemTheme,
  storeTheme,
  type ResolvedTheme,
  type Theme,
} from "@/helpers/utils/theme";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (next: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [state, setState] = useState(getInitialThemeState);
  const theme = state.theme;
  const resolvedTheme = state.resolvedTheme;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (theme !== "system") {
      return;
    }

    const mql = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!mql) {
      return;
    }

    const onChange = () => {
      const resolved = getSystemTheme();
      applyThemeToDom(resolved);
      setState((prev) => ({ ...prev, resolvedTheme: resolved }));
    };

    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    storeTheme(next);

    const resolved = next === "system" ? getSystemTheme() : next;
    applyThemeToDom(resolved);
    setState({ theme: next, resolvedTheme: resolved });
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
