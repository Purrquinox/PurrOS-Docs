import {
  ArrowRightIcon,
  BlocksIcon,
  PlugIcon,
  ToggleRightIcon,
} from "lucide-react";
import Link from "next/link";
import { sections } from "./endpoints";

const guides: Record<string, { title: string; href: string }> = {
  people: { title: "People & HR", href: "/docs/guides/people-and-hr" },
  time: {
    title: "Time & Attendance",
    href: "/docs/guides/time-and-attendance",
  },
  sales: { title: "Sales", href: "/docs/guides/sales" },
  inventory: { title: "Inventory", href: "/docs/guides/inventory" },
};

/**
 * Summary card at the top of each feature guide: its switch key, what it
 * depends on, and how many endpoints it has.
 *
 * <FeatureInfo featureKey="cash" needs={['sales']} reference="cash" />
 */
export function FeatureInfo({
  featureKey,
  needs = [],
  reference,
  note,
}: {
  featureKey: string;
  needs?: string[];
  reference: string;
  note?: string;
}) {
  const section = sections.find((s) => s.slug === reference);
  const count = section?.endpoints.length ?? 0;

  return (
    <div className="not-prose my-6 grid overflow-hidden rounded-lg border bg-fd-card text-sm sm:grid-cols-3 sm:divide-x">
      <div className="flex flex-col gap-1 p-4">
        <span className="flex items-center gap-1.5 text-xs font-medium text-fd-muted-foreground">
          <ToggleRightIcon className="size-3.5" aria-hidden /> Feature key
        </span>
        <code className="font-mono font-medium">{featureKey}</code>
        <Link
          href="/docs/platform/administration/feature-switches"
          className="text-xs text-fd-primary hover:underline"
        >
          Feature switches
        </Link>
      </div>
      <div className="flex flex-col gap-1 border-t p-4 sm:border-t-0">
        <span className="flex items-center gap-1.5 text-xs font-medium text-fd-muted-foreground">
          <BlocksIcon className="size-3.5" aria-hidden /> Needs
        </span>
        {needs.length === 0 ? (
          <span className="text-fd-muted-foreground">
            Nothing: works on its own
          </span>
        ) : (
          <span className="flex flex-wrap gap-x-2">
            {needs.map((n) => (
              <Link
                key={n}
                href={guides[n]?.href ?? "#"}
                className="font-medium hover:text-fd-primary"
              >
                {guides[n]?.title ?? n}
              </Link>
            ))}
          </span>
        )}
        {note && (
          <span className="text-xs text-fd-muted-foreground">{note}</span>
        )}
      </div>
      <Link
        href={`/docs/api/reference/${reference}`}
        className="group flex flex-col gap-1 border-t p-4 transition-colors hover:bg-fd-accent sm:border-t-0"
      >
        <span className="flex items-center gap-1.5 text-xs font-medium text-fd-muted-foreground">
          <PlugIcon className="size-3.5" aria-hidden /> API
        </span>
        <span className="font-medium tabular-nums">{count} endpoints</span>
        <span className="inline-flex items-center gap-1 text-xs text-fd-primary">
          API reference{" "}
          <ArrowRightIcon className="size-3 transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>
    </div>
  );
}
