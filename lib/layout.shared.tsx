import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Logo } from "@/components/logo";
import { gitConfig } from "./shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Logo />,
    },
    links: [
      { text: "Platform", url: "/docs/platform", active: "nested-url" },
      { text: "Guides", url: "/docs/guides", active: "nested-url" },
      { text: "API", url: "/docs/api", active: "nested-url" },
      { text: "Integrations", url: "/docs/integrations", active: "nested-url" },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
