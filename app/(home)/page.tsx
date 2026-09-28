import {
  ArrowRightIcon,
  BanknoteIcon,
  BookOpenIcon,
  BracesIcon,
  CalendarDaysIcon,
  ClipboardCheckIcon,
  ClockIcon,
  IdCardIcon,
  PackageIcon,
  PlugIcon,
  ReceiptIcon,
  ServerIcon,
  ShoppingCartIcon,
  WebhookIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { MethodBadge } from "@/components/badges";
import { endpointCount, sections } from "@/components/endpoints";
import { LogoMark } from "@/components/logo";

export const metadata: Metadata = {
  title: "PurrOS Documentation",
};

const paths = [
  {
    icon: <ServerIcon />,
    title: "Platform",
    href: "/docs/platform",
    text: "Install PurrOS on your own server, configure email and storage, and manage roles, features, backups and upgrades.",
    links: [
      ["Installation", "/docs/platform/getting-started/installation"],
      ["Configuration", "/docs/platform/getting-started/configuration"],
      ["CLI reference", "/docs/platform/operations/cli"],
    ],
  },
  {
    icon: <BookOpenIcon />,
    title: "ERP guides",
    href: "/docs/guides",
    text: "How each feature works day to day, from timesheets and schedules to cash counts, stock and purchase orders.",
    links: [
      ["Time & attendance", "/docs/guides/time-and-attendance"],
      ["Inventory", "/docs/guides/inventory"],
      ["Employee Area", "/docs/guides/employee-area"],
    ],
  },
  {
    icon: <BracesIcon />,
    title: "API",
    href: "/docs/api",
    text: "A REST API for everything the product does: authentication, conventions, ingestion, webhooks and every endpoint.",
    links: [
      ["Authentication & scopes", "/docs/api/authentication"],
      ["Data ingestion", "/docs/api/data-ingestion"],
      ["Endpoint reference", "/docs/api/reference"],
    ],
  },
  {
    icon: <PlugIcon />,
    title: "Integrations",
    href: "/docs/integrations",
    text: "Connect your POS, online store, timeclock, HR, payroll and accounting systems with small programs you control.",
    links: [
      ["How integrations work", "/docs/integrations"],
      ["Build an integration", "/docs/integrations/building-an-integration"],
      ["Recipes", "/docs/integrations/recipes"],
    ],
  },
] satisfies {
  icon: ReactNode;
  title: string;
  href: string;
  text: string;
  links: [string, string][];
}[];

const features = [
  {
    icon: <IdCardIcon />,
    title: "People & HR",
    href: "/docs/guides/people-and-hr",
  },
  {
    icon: <ClockIcon />,
    title: "Time & attendance",
    href: "/docs/guides/time-and-attendance",
  },
  {
    icon: <CalendarDaysIcon />,
    title: "Scheduling",
    href: "/docs/guides/scheduling-and-forecasting",
  },
  { icon: <ReceiptIcon />, title: "Sales", href: "/docs/guides/sales" },
  {
    icon: <BanknoteIcon />,
    title: "Cash management",
    href: "/docs/guides/cash-management",
  },
  { icon: <PackageIcon />, title: "Inventory", href: "/docs/guides/inventory" },
  {
    icon: <ShoppingCartIcon />,
    title: "Purchasing",
    href: "/docs/guides/purchasing-and-ordering",
  },
  {
    icon: <ClipboardCheckIcon />,
    title: "Checklists & compliance",
    href: "/docs/guides/forms-and-checklists",
  },
];

function Code({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={className}>{children}</span>;
}

export default function HomePage() {
  const areas = sections.filter((s) =>
    s.endpoints.some((e) => e.feature),
  ).length;

  return (
    <main className="mx-auto w-full max-w-(--fd-layout-width) px-4 pb-24 sm:px-6">
      {/* Hero */}
      <section className="grid items-center gap-10 pt-16 pb-14 lg:grid-cols-[1.1fr_1fr] lg:pt-24">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-md border bg-fd-card px-2.5 py-1 text-xs text-fd-muted-foreground">
            <span
              className="size-1.5 rounded-full bg-purr-warning"
              aria-hidden
            />
            Early development · API and CLI available, web app planned
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Run every location from one place.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-fd-muted-foreground text-pretty">
            PurrOS is an open-source, self-hosted operations platform (ERP) for
            businesses with 20–500 people: people, scheduling, time, cash,
            inventory, ordering, sales, checklists and reporting. Every feature
            is optional, and everything connects through a REST API.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/docs/platform/getting-started/installation"
              className="inline-flex items-center gap-2 rounded-md bg-fd-primary px-4 py-2.5 text-sm font-medium text-fd-primary-foreground transition-opacity hover:opacity-90"
            >
              Install PurrOS <ArrowRightIcon className="size-4" />
            </Link>
            <Link
              href="/docs/api"
              className="inline-flex items-center gap-2 rounded-md border bg-fd-card px-4 py-2.5 text-sm font-medium transition-colors hover:bg-fd-accent"
            >
              Explore the API
            </Link>
          </div>
        </div>

        {/* Request / response sample */}
        <div className="overflow-hidden rounded-lg border bg-fd-card text-[0.8rem] shadow-[0_1px_0_0_var(--color-fd-border)]">
          <div className="flex items-center gap-2 border-b px-4 py-2.5">
            <MethodBadge method="POST" />
            <code className="font-mono text-fd-muted-foreground">
              /api/v1/sales/transactions:batch
            </code>
          </div>
          <pre className="overflow-x-auto p-4 font-mono leading-relaxed">
            <Code className="text-fd-muted-foreground">{"{"}</Code>
            {"\n  "}
            <Code className="text-fd-primary">"source"</Code>:{" "}
            <Code className="text-purr-success">"pos:store-101"</Code>,{"\n  "}
            <Code className="text-fd-primary">"transactions"</Code>: [{"{"}
            {"\n    "}
            <Code className="text-fd-primary">"externalId"</Code>:{" "}
            <Code className="text-purr-success">"txn-88213"</Code>,{"\n    "}
            <Code className="text-fd-primary">"occurredAt"</Code>:{" "}
            <Code className="text-purr-success">"2026-09-27T12:41:07Z"</Code>,
            {"\n    "}
            <Code className="text-fd-primary">"lines"</Code>: [{"{ "}
            <Code className="text-fd-primary">"itemSku"</Code>:{" "}
            <Code className="text-purr-success">"LATTE-12"</Code>,{" "}
            <Code className="text-fd-primary">"quantity"</Code>:{" "}
            <Code className="text-purr-success">"2"</Code>
            {" }"}],{"\n    "}
            <Code className="text-fd-primary">"total"</Code>:{" "}
            <Code className="text-purr-success">"12.97"</Code>
            {"\n  }]\n"}
            <Code className="text-fd-muted-foreground">{"}"}</Code>
          </pre>
          <div className="flex items-center gap-2 border-t px-4 py-2.5 text-fd-muted-foreground">
            <span className="rounded-md border border-purr-success/30 bg-purr-success/10 px-1.5 font-mono text-[0.7rem] font-semibold leading-5 text-purr-success">
              202
            </span>
            <code className="font-mono">
              {'{ "created": 1, "updated": 0, "rejected": 0 }'}
            </code>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 divide-x divide-y rounded-lg border bg-fd-card sm:grid-cols-4 sm:divide-y-0">
        {[
          [String(endpointCount), "API endpoints"],
          [String(areas), "feature areas"],
          ["70+", "webhook events"],
          ["1", "binary: API, worker and CLI"],
        ].map(([value, label]) => (
          <div key={label} className="p-5">
            <div className="text-2xl font-semibold tabular-nums">{value}</div>
            <div className="mt-1 text-sm text-fd-muted-foreground">{label}</div>
          </div>
        ))}
      </section>

      {/* Paths */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight">
          Find your way in
        </h2>
        <p className="mt-2 text-fd-muted-foreground">
          Four sections, each written for the person who needs it.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {paths.map((p) => (
            <div
              key={p.title}
              className="flex flex-col rounded-lg border bg-fd-card p-6"
            >
              <Link href={p.href} className="group flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-md border bg-fd-background text-fd-primary [&_svg]:size-[18px]">
                  {p.icon}
                </span>
                <span className="text-lg font-semibold group-hover:text-fd-primary">
                  {p.title}
                </span>
                <ArrowRightIcon className="size-4 text-fd-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </Link>
              <p className="mt-3 text-sm text-fd-muted-foreground">{p.text}</p>
              <ul className="mt-4 flex flex-wrap gap-2 border-t pt-4">
                {p.links.map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="inline-block rounded-md border bg-fd-background px-2.5 py-1 text-xs font-medium transition-colors hover:border-fd-primary/50 hover:text-fd-primary"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Feature guides */}
      <section className="mt-16">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Feature guides
            </h2>
            <p className="mt-2 text-fd-muted-foreground">
              Switch on only what your business uses.
            </p>
          </div>
          <Link
            href="/docs/guides"
            className="text-sm font-medium text-fd-primary hover:underline"
          >
            All guides →
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {features.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="flex items-center gap-3 rounded-lg border bg-fd-card p-4 text-sm font-medium transition-colors hover:border-fd-primary/50 hover:bg-fd-accent [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-fd-muted-foreground"
            >
              {f.icon}
              {f.title}
            </Link>
          ))}
        </div>
      </section>

      {/* Integrations callout */}
      <section className="mt-16 grid gap-6 rounded-lg border bg-fd-card p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="flex gap-4">
          <span className="hidden size-10 shrink-0 items-center justify-center rounded-md border bg-fd-background text-fd-primary sm:flex">
            <WebhookIcon className="size-5" />
          </span>
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Bring your data in, send changes out
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-fd-muted-foreground">
              Batch ingestion is idempotent on source and external ID, so
              re-sending is always safe. Signed webhooks tell your other systems
              about new hires, locked pay periods, low stock and more, with
              retries and replay.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/docs/integrations/building-an-integration"
            className="inline-flex items-center gap-2 rounded-md bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground transition-opacity hover:opacity-90"
          >
            Build an integration
          </Link>
          <Link
            href="/docs/api/webhooks"
            className="inline-flex items-center gap-2 rounded-md border bg-fd-background px-4 py-2 text-sm font-medium transition-colors hover:bg-fd-accent"
          >
            Webhooks
          </Link>
        </div>
      </section>

      <footer className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t pt-8 text-sm text-fd-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <LogoMark className="size-5" /> PurrOS is open source under the
          AGPL-3.0 license.
        </span>
        <span className="flex gap-4">
          <a
            href="https://github.com/selectdev/PurrOS"
            className="hover:text-fd-foreground"
          >
            GitHub
          </a>
          <Link
            href="/docs/platform/operations/security#reporting-a-vulnerability"
            className="hover:text-fd-foreground"
          >
            Security
          </Link>
          <Link href="/llms.txt" className="hover:text-fd-foreground">
            llms.txt
          </Link>
        </span>
      </footer>
    </main>
  );
}
