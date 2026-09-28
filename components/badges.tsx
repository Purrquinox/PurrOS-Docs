import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Marks behavior that is designed but not built yet. */
export function Planned({ children = "Planned" }: { children?: ReactNode }) {
  return (
    <span
      title="Designed but not built yet"
      className="not-prose inline-flex translate-y-[-1px] items-center gap-1 rounded-md border border-purr-warning/30 bg-purr-warning/10 px-1.5 py-px align-middle text-[0.7rem] font-medium leading-4 text-purr-warning"
    >
      <span className="size-1.5 rounded-full bg-purr-warning" aria-hidden />
      {children}
    </span>
  );
}

/** Marks behavior that works today. */
export function Available({
  children = "Available",
}: {
  children?: ReactNode;
}) {
  return (
    <span className="not-prose inline-flex translate-y-[-1px] items-center gap-1 rounded-md border border-purr-success/30 bg-purr-success/10 px-1.5 py-px align-middle text-[0.7rem] font-medium leading-4 text-purr-success">
      <span className="size-1.5 rounded-full bg-purr-success" aria-hidden />
      {children}
    </span>
  );
}

const methodStyles: Record<string, string> = {
  GET: "text-purr-success border-purr-success/30 bg-purr-success/10",
  POST: "text-fd-primary border-fd-primary/30 bg-fd-primary/10",
  PUT: "text-purr-warning border-purr-warning/30 bg-purr-warning/10",
  PATCH: "text-purr-violet border-purr-violet/30 bg-purr-violet/10",
  DELETE: "text-purr-danger border-purr-danger/30 bg-purr-danger/10",
};

export function MethodBadge({
  method,
  className,
}: {
  method: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "not-prose inline-flex w-[3.75rem] shrink-0 justify-center rounded-md border py-px font-mono text-[0.7rem] font-semibold leading-5",
        methodStyles[method] ?? "text-fd-muted-foreground",
        className,
      )}
    >
      {method}
    </span>
  );
}

/** Renders a path with `{params}` and `:actions` highlighted. */
export function EndpointPath({ path }: { path: string }) {
  const parts = withOffsets(path.split(/(\{[^}]+\}|:[a-z-]+$)/g));
  return (
    <code className="font-mono text-[0.8rem] break-all">
      {parts.map(({ part, key }) =>
        part.startsWith("{") ? (
          <span key={key} className="text-fd-primary">
            {part}
          </span>
        ) : part.startsWith(":") ? (
          <span key={key} className="font-semibold text-purr-violet">
            {part}
          </span>
        ) : (
          <span key={key}>{part}</span>
        ),
      )}
    </code>
  );
}

/** One endpoint, inline: <Endpoint method="POST" path="/api/v1/attachments" />. */
export function Endpoint({ method, path }: { method: string; path: string }) {
  return (
    <span className="not-prose inline-flex items-center gap-2 rounded-md border bg-fd-card px-1.5 py-0.5 align-middle">
      <MethodBadge method={method} className="w-auto px-1" />
      <EndpointPath path={path} />
    </span>
  );
}

/** Renders `code` spans in short strings from the endpoint catalog. */
export function InlineCode({ text }: { text: string }) {
  return (
    <>
      {withOffsets(text.split(/(`[^`]+`)/g)).map(({ part, key }) =>
        part.startsWith("`") ? (
          <code
            key={key}
            className="rounded bg-fd-muted px-1 py-px font-mono text-[0.75rem]"
          >
            {part.slice(1, -1)}
          </code>
        ) : (
          <span key={key}>{part}</span>
        ),
      )}
    </>
  );
}

/** Pairs each non-empty part with its character offset, for stable React keys. */
function withOffsets(parts: string[]) {
  let offset = 0;
  return parts.flatMap((part) => {
    const key = offset;
    offset += part.length;
    return part ? [{ part, key }] : [];
  });
}
