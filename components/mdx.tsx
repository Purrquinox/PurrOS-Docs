import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { File, Files, Folder } from "fumadocs-ui/components/files";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { TypeTable } from "fumadocs-ui/components/type-table";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { Available, Endpoint, MethodBadge, Planned } from "./badges";
import { EndpointExplorer } from "./endpoint-explorer";
import { EndpointCount, EndpointSections, Endpoints } from "./endpoints";
import { FeatureInfo } from "./feature-info";
import { Mermaid } from "./mermaid";

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Accordion,
    Accordions,
    Available,
    Endpoint,
    EndpointCount,
    EndpointExplorer,
    EndpointSections,
    Endpoints,
    FeatureInfo,
    File,
    Files,
    Folder,
    Mermaid,
    MethodBadge,
    Planned,
    Step,
    Steps,
    Tab,
    Tabs,
    TypeTable,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
