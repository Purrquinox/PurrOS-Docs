import type { SVGProps } from "react";

/** PurrOS mark: a rounded cat head. Uses currentColor for the face and the primary color for the tile. */
export function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <rect width="32" height="32" rx="8" className="fill-fd-primary" />
      <path
        d="M8 23.5V11.2c0-.8.9-1.2 1.5-.7l3.6 3.2c1.8-.6 4-.6 5.8 0l3.6-3.2c.6-.5 1.5-.1 1.5.7v12.3c0 1.1-.9 2-2 2H10c-1.1 0-2-.9-2-2Z"
        className="fill-fd-primary-foreground"
      />
      <circle cx="13" cy="19" r="1.4" className="fill-fd-primary" />
      <circle cx="19" cy="19" r="1.4" className="fill-fd-primary" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="inline-flex items-center gap-2 font-semibold tracking-tight">
      <LogoMark className="size-6" />
      PurrOS
      <span className="rounded-md border px-1.5 py-0.5 text-[11px] font-medium text-fd-muted-foreground">
        Docs
      </span>
    </span>
  );
}
