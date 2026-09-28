import { createGetUrl } from "fumadocs-core/source";

export const appName = "PurrOS";
export const appDescription =
  "Documentation for PurrOS, the open-source, self-hosted operations platform (ERP) for businesses with 20–500 people.";
export const docsRoute = "/docs";
export const docsImageRoute = "/og/docs";
export const docsContentRoute = "/llms.mdx/docs";

export const gitConfig = {
  user: "selectdev",
  repo: "PurrOS",
  branch: "main",
};

/**
 * Where this site's MDX sources live inside the GitHub repository (e.g. "docs-site/content/docs"),
 * for the "Open in GitHub" page action. Leave null until the site is committed.
 */
export const contentPath: string | null = null;

const getContentUrl = createGetUrl(docsContentRoute);

export function getPageMarkdownUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, "content.md"];

  return { segments, url: getContentUrl(segments, page.locale) };
}

const getImageUrl = createGetUrl(docsImageRoute);

export function getPageImageUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, "image.png"];

  return { segments, url: getImageUrl(segments, page.locale) };
}
