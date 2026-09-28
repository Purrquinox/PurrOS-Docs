# PurrOS documentation site

The PurrOS documentation website, built with [Fumadocs](https://fumadocs.dev) on Next.js. It covers installing and running PurrOS, the ERP feature guides, the REST API, and building integrations.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (every page is prerendered)
```

## Layout

| Path | What |
|---|---|
| `content/docs/platform/` | Installing, configuring, administering and operating PurrOS |
| `content/docs/guides/` | ERP feature guides (People & HR, Time, Scheduling, Cash, Inventory…) |
| `content/docs/api/` | API fundamentals, data ingestion, webhooks, attachments |
| `content/docs/api/reference/` | One page per API area, rendered from `lib/endpoints.json` |
| `content/docs/integrations/` | How integrations work, the tutorial and recipes |
| `components/` | MDX components: endpoint tables and explorer, `FeatureInfo`, `Mermaid`, `Planned` badges |
| `lib/endpoints.json` | Every endpoint with its scope, permission and feature, generated from the API repository |

Each top-level folder in `content/docs` is a sidebar tab (`"root": true` in its `meta.json`).

## Keeping the endpoint reference in sync

The endpoint reference is generated from `docs/api/endpoints.md` in the PurrOS repository, which follows the API's route table (`api/internal/catalog/routes.go`). After endpoints change there:

```bash
npm run sync:endpoints                                  # reads ../API/docs/api/endpoints.md
node scripts/sync-endpoints.mjs path/to/endpoints.md   # or from another checkout
```

A new area needs an entry in the script's `slugs` table, a page in `content/docs/api/reference/` containing `<Endpoints section="…" />`, and a line in that folder's `meta.json`.

## Writing pages

Pages are MDX. Besides the standard Fumadocs components (`Callout`, `Cards`, `Steps`, `Tabs`, `Files`, `Accordions`, `TypeTable`), these are available everywhere:

| Component | Use |
|---|---|
| `<Planned />` | Marks behavior that is designed but not built yet. Keep it out of headings. |
| `<FeatureInfo featureKey="cash" needs={["sales"]} reference="cash" />` | The summary card at the top of each feature guide |
| `<Endpoints section="cash" />` | Every endpoint of one API area |
| `<EndpointExplorer />` | Searchable, filterable list of every endpoint |
| `<Endpoint method="POST" path="/attachments" />` | One endpoint, inline |
| `<Mermaid chart={`flowchart LR …`} />` | A diagram that follows the light/dark theme |

Link between pages with absolute paths (`/docs/api/webhooks#subscribing`). Mark planned behavior as planned, as in the rest of the PurrOS docs.

Set `contentPath` in `lib/shared.ts` once this site is committed to GitHub, to turn on the "Open in GitHub" page action.
