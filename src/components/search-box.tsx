"use client";

import { Input } from "@/components/ui/input";
import { useQueryParamSearch } from "@/hooks/use-query-param-search";

interface SearchBoxProps {
  placeholder?: string;
}

export function SearchBox({ placeholder }: SearchBoxProps) {
  const { value, setValue, commit } = useQueryParamSearch({
    paramName: "q",
    debounceMs: 350,
  });

  return (
    <Input
      value={value}
      onChange={(e) => {
        const next = e.target.value;
        setValue(next);
      }}
      onKeyDown={(e) => {
        if (e.key !== "Enter") {
          return;
        }
        commit();
      }}
      placeholder={placeholder ?? "Search tournaments..."}
      className="max-w-sm"
      aria-label="Search tournaments"
    />
  );
}
