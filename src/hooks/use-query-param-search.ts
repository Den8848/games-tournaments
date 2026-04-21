import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export interface UseQueryParamSearchOptions {
  paramName?: string;
  debounceMs?: number;
}

export interface UseQueryParamSearchResult {
  value: string;
  setValue: (next: string) => void;
  commit: () => void;
}

export function useQueryParamSearch(
  options: UseQueryParamSearchOptions = {},
): UseQueryParamSearchResult {
  const { paramName = "q", debounceMs = 350 } = options;

  const router = useRouter();
  const pathname = usePathname();
  const debounceRef = useRef<number | null>(null);

  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") {
      return "";
    }
    return new URLSearchParams(window.location.search).get(paramName) ?? "";
  });

  const replaceUrl = useCallback(
    (raw: string) => {
      const currentParams = window.location.search.startsWith("?")
        ? window.location.search.slice(1)
        : window.location.search;
      const next = new URLSearchParams(currentParams);
      const trimmed = raw.trim();

      if (trimmed) {
        next.set(paramName, trimmed);
      } else {
        next.delete(paramName);
      }

      const nextUrl = next.size ? `${pathname}?${next.toString()}` : pathname;
      const currentUrl = currentParams ? `${pathname}?${currentParams}` : pathname;

      if (nextUrl !== currentUrl) {
        router.replace(nextUrl);
      }
    },
    [paramName, pathname, router],
  );

  useEffect(() => {
    const onPopState = () => {
      const nextValue =
        new URLSearchParams(window.location.search).get(paramName) ?? "";
      setValue(nextValue);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [paramName]);

  useEffect(() => {
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }
    debounceRef.current = window.setTimeout(() => replaceUrl(value), debounceMs);
    return () => {
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
      }
    };
  }, [debounceMs, replaceUrl, value]);

  const commit = useCallback(() => {
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }
    replaceUrl(value);
  }, [replaceUrl, value]);

  return { value, setValue, commit };
}

