"use client";

import { useTheme } from "next-themes";
import { useEffect, useId, useState } from "react";

/** Renders a Mermaid diagram that follows the light/dark theme. */
export function Mermaid({ chart }: { chart: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const { resolvedTheme } = useTheme();
  const [svg, setSvg] = useState<string>();

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const { default: mermaid } = await import("mermaid");
      const dark = resolvedTheme === "dark";
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
        theme: "base",
        themeVariables: dark
          ? {
              background: "#0b0d12",
              primaryColor: "#12151c",
              primaryTextColor: "#e8eaee",
              primaryBorderColor: "#5b82f0",
              lineColor: "#98a1b0",
              secondaryColor: "#1a2233",
              tertiaryColor: "#161a22",
              clusterBkg: "#12151c",
              clusterBorder: "#232833",
              edgeLabelBackground: "#0b0d12",
            }
          : {
              background: "#ffffff",
              primaryColor: "#f7f8fa",
              primaryTextColor: "#11141a",
              primaryBorderColor: "#1f4fd1",
              lineColor: "#5b6472",
              secondaryColor: "#e9eefb",
              tertiaryColor: "#f2f4f7",
              clusterBkg: "#f7f8fa",
              clusterBorder: "#e3e6eb",
              edgeLabelBackground: "#ffffff",
            },
      });
      const { svg } = await mermaid.render(
        `mermaid-${id}`,
        chart.replaceAll("\\n", "\n"),
      );
      if (!cancelled) setSvg(svg);
    })();
    return () => {
      cancelled = true;
    };
  }, [chart, id, resolvedTheme]);

  return (
    <figure className="not-prose my-6 overflow-x-auto rounded-lg border bg-fd-card p-4">
      {svg ? (
        <div
          className="mermaid-diagram"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: SVG produced by Mermaid in strict mode from our own content
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <div
          className="h-40 animate-pulse rounded-md bg-fd-muted"
          role="status"
          aria-label="Loading diagram"
        />
      )}
    </figure>
  );
}
