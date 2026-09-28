"use client";

import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { MethodBadge } from "./badges";
import { type EndpointEntry, EndpointRow, sections } from "./endpoints";

const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const;
const callers = {
  all: "Anyone",
  integration: "Integration keys",
  people: "People",
  public: "Public",
} as const;
type Caller = keyof typeof callers;

function matchesCaller(e: EndpointEntry, caller: Caller) {
  switch (caller) {
    case "integration":
      return e.integration !== null && e.integration !== "public";
    case "people":
      return e.people !== null && e.people !== "public";
    case "public":
      return e.people === "public";
    default:
      return true;
  }
}

export function EndpointExplorer() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Set<string>>(new Set());
  const [caller, setCaller] = useState<Caller>("all");
  const deferred = useDeferredValue(query);

  const results = useMemo(() => {
    const terms = deferred.toLowerCase().split(/\s+/).filter(Boolean);
    return sections
      .map((s) => ({
        ...s,
        endpoints: s.endpoints.filter((e) => {
          if (active.size > 0 && !active.has(e.method)) return false;
          if (!matchesCaller(e, caller)) return false;
          const haystack = [
            s.title,
            e.method,
            e.path,
            e.description,
            e.integration,
            e.people,
            e.feature,
          ]
            .join(" ")
            .toLowerCase();
          return terms.every((t) => haystack.includes(t));
        }),
      }))
      .filter((s) => s.endpoints.length > 0);
  }, [deferred, active, caller]);

  const total = results.reduce((n, s) => n + s.endpoints.length, 0);

  const toggle = (m: string) =>
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(m)) next.delete(m);
      else next.add(m);
      return next;
    });

  return (
    <div className="not-prose my-6">
      <div className="sticky top-(--fd-docs-row-1,0px) z-10 -mx-1 space-y-3 rounded-lg border bg-fd-background/95 p-3 backdrop-blur">
        <label className="flex items-center gap-2 rounded-md border bg-fd-card px-3 focus-within:ring-2 focus-within:ring-fd-ring">
          <SearchIcon
            className="size-4 shrink-0 text-fd-muted-foreground"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search paths, descriptions, scopes, permissions… e.g. “timesheets approve”"
            className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-fd-muted-foreground"
            aria-label="Search endpoints"
          />
        </label>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <fieldset className="flex flex-wrap gap-1">
            <legend className="sr-only">Filter by method</legend>
            {methods.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => toggle(m)}
                aria-pressed={active.has(m)}
                className={cn(
                  "rounded-md border p-0.5 transition-opacity",
                  active.size > 0 && !active.has(m) && "opacity-40",
                  active.has(m) && "ring-2 ring-fd-ring",
                )}
              >
                <MethodBadge method={m} />
              </button>
            ))}
          </fieldset>
          <fieldset className="flex flex-wrap gap-1">
            <legend className="sr-only">Filter by caller</legend>
            {(Object.keys(callers) as Caller[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCaller(c)}
                aria-pressed={caller === c}
                className={cn(
                  "rounded-md border px-2.5 py-1 text-xs font-medium transition-colors",
                  caller === c
                    ? "border-fd-primary bg-fd-primary text-fd-primary-foreground"
                    : "text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground",
                )}
              >
                {callers[c]}
              </button>
            ))}
          </fieldset>
          <span
            className="ms-auto text-xs tabular-nums text-fd-muted-foreground"
            aria-live="polite"
          >
            {total} {total === 1 ? "endpoint" : "endpoints"}
          </span>
        </div>
      </div>

      {results.length === 0 ? (
        <p className="mt-8 rounded-lg border border-dashed p-8 text-center text-sm text-fd-muted-foreground">
          No endpoints match. Try fewer words, or clear the filters.
        </p>
      ) : (
        results.map((s) => (
          <section key={s.slug} className="mt-8">
            <div className="mb-2 flex items-baseline justify-between gap-2">
              <h3 className="text-base font-semibold">{s.title}</h3>
              <Link
                href={`/docs/api/reference/${s.slug}`}
                className="text-xs font-medium text-fd-primary hover:underline"
              >
                Open reference →
              </Link>
            </div>
            <ul className="divide-y overflow-hidden rounded-lg border bg-fd-card">
              {s.endpoints.map((e) => (
                <EndpointRow key={`${e.method} ${e.path}`} endpoint={e} />
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
