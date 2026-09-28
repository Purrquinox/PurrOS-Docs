import Link from "next/link";
import endpoints from "@/lib/endpoints.json";
import { EndpointPath, InlineCode, MethodBadge } from "./badges";

export type EndpointEntry = {
  method: string;
  path: string;
  integration: string | null;
  people: string | null;
  feature: string | null;
  description: string;
};

export type EndpointSection = {
  title: string;
  slug: string;
  intro: string;
  endpoints: EndpointEntry[];
};

export const sections = endpoints as EndpointSection[];

function Access({
  label,
  value,
  title,
}: {
  label: string;
  value: string | null;
  title: string;
}) {
  return (
    <div className="flex min-w-0 items-baseline gap-1.5" title={title}>
      <span className="shrink-0 text-[0.7rem] font-medium uppercase tracking-wide text-fd-muted-foreground">
        {label}
      </span>
      {value ? (
        <span className="min-w-0 text-[0.8rem]">
          {value === "public" ||
          value === "any key" ||
          value === "integration key" ? (
            <span className="text-fd-muted-foreground">{value}</span>
          ) : label === "Key" ? (
            <code className="rounded bg-fd-muted px-1 py-px font-mono text-[0.75rem]">
              {value}
            </code>
          ) : (
            <InlineCode text={value} />
          )}
        </span>
      ) : (
        <span className="text-[0.8rem] text-fd-muted-foreground">
          <span aria-hidden>—</span>
          <span className="sr-only">not allowed</span>
        </span>
      )}
    </div>
  );
}

export function EndpointRow({ endpoint }: { endpoint: EndpointEntry }) {
  return (
    <li className="grid gap-x-6 gap-y-2 px-4 py-3 md:grid-cols-[minmax(0,1fr)_minmax(0,17rem)]">
      <div className="min-w-0">
        <div className="flex items-start gap-2.5">
          <MethodBadge method={endpoint.method} className="mt-px" />
          <EndpointPath path={endpoint.path} />
        </div>
        <p className="mt-1 text-sm text-fd-muted-foreground">
          <InlineCode text={endpoint.description} />
        </p>
      </div>
      <div className="flex flex-col gap-1 border-fd-border md:border-l md:pl-4">
        <Access
          label="Key"
          value={endpoint.integration}
          title="Scope an integration key needs"
        />
        <Access
          label="People"
          value={endpoint.people}
          title="Permission a signed-in person or personal key needs"
        />
        {endpoint.feature && (
          <Access
            label="Feature"
            value={`\`${endpoint.feature}\``}
            title="Feature switch"
          />
        )}
      </div>
    </li>
  );
}

export function EndpointGroup({ endpoints }: { endpoints: EndpointEntry[] }) {
  return (
    <ul className="not-prose my-6 divide-y overflow-hidden rounded-lg border bg-fd-card">
      {endpoints.map((e) => (
        <EndpointRow key={`${e.method} ${e.path}`} endpoint={e} />
      ))}
    </ul>
  );
}

/** Every endpoint of one area of the endpoint index: <Endpoints section="people" />. */
export function Endpoints({
  section,
  filter,
}: {
  section: string;
  filter?: string;
}) {
  const found = sections.find((s) => s.slug === section);
  if (!found) throw new Error(`Unknown endpoint section: ${section}`);
  const list = filter
    ? found.endpoints.filter((e) => e.path.startsWith(filter))
    : found.endpoints;
  return <EndpointGroup endpoints={list} />;
}

/** Compact summary cards linking to every reference page. */
export function EndpointSections() {
  return (
    <div className="not-prose my-6 grid gap-3 sm:grid-cols-2">
      {sections.map((s) => {
        const counts = s.endpoints.reduce<Record<string, number>>((acc, e) => {
          acc[e.method] = (acc[e.method] ?? 0) + 1;
          return acc;
        }, {});
        return (
          <Link
            key={s.slug}
            href={`/docs/api/reference/${s.slug}`}
            className="group rounded-lg border bg-fd-card p-4 transition-colors hover:border-fd-primary/50 hover:bg-fd-accent"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium">{s.title}</span>
              <span className="text-xs tabular-nums text-fd-muted-foreground">
                {s.endpoints.length} endpoints
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {["GET", "POST", "PUT", "PATCH", "DELETE"]
                .filter((m) => counts[m])
                .map((m) => (
                  <span
                    key={m}
                    className="inline-flex items-center gap-1 text-[0.7rem] text-fd-muted-foreground"
                  >
                    <MethodBadge method={m} className="w-auto px-1" />
                    <span className="tabular-nums">{counts[m]}</span>
                  </span>
                ))}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export const endpointCount = sections.reduce(
  (n, s) => n + s.endpoints.length,
  0,
);

export function EndpointCount() {
  return <>{endpointCount}</>;
}
