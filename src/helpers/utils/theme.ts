export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export interface ThemeState {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
}

export function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") {
    return "light";
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function applyThemeToDom(resolved: ResolvedTheme) {
  document.documentElement.classList.toggle("dark", resolved === "dark");
}

export function readStoredTheme(): Theme {
  if (typeof window === "undefined") {
    return "system";
  }
  const raw = window.localStorage.getItem("theme");
  if (raw === "light" || raw === "dark" || raw === "system") {
    return raw;
  }
  return "system";
}

export function storeTheme(theme: Theme) {
  window.localStorage.setItem("theme", theme);
}

export function getInitialThemeState(): ThemeState {
  const initialTheme = readStoredTheme();
  const initialResolved = initialTheme === "system" ? getSystemTheme() : initialTheme;

  if (typeof document !== "undefined") {
    applyThemeToDom(initialResolved);
  }

  return { theme: initialTheme, resolvedTheme: initialResolved };
}

