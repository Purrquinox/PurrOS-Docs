// Regenerates lib/endpoints.json from the API repository's endpoint index
// (docs/api/endpoints.md), which follows the route table in
// api/internal/catalog/routes.go.
//
//   node scripts/sync-endpoints.mjs [path/to/endpoints.md]
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = process.argv[2] ?? join(root, "../API/docs/api/endpoints.md");
const lines = readFileSync(source, "utf8").split("\n");

// Section heading → reference page slug.
const slugs = {
  Authentication: "authentication",
  "Users & Roles": "users-and-roles",
  Platform: "platform",
  "Integration self-service": "integration-self-service",
  Integrations: "integrations",
  Attachments: "attachments",
  Organization: "organization",
  "People & HR": "people",
  "Time & Attendance": "time",
  "Scheduling & Forecasting": "scheduling",
  "Cash Management": "cash",
  Inventory: "inventory",
  "Purchasing & Ordering": "purchasing",
  Sales: "sales",
  "Forms, Checklists & Compliance": "operations",
  "Equipment & Assets": "equipment",
  Communication: "communication",
  "Team Displays": "displays",
  "Reports & Insights": "insights",
  "Employee Area": "employee-area",
  Webhooks: "webhooks",
};

const strip = (s) => s.trim().replace(/^`|`$/g, "");
const dash = (s) => (s === "—" ? null : s);

/** Splits a markdown table row, keeping pipes that are inside backticks. */
function cells(row) {
  const out = [];
  let cur = "";
  let code = false;
  for (const ch of row.trim().replace(/^\||\|$/g, "")) {
    if (ch === "`") code = !code;
    if (ch === "|" && !code) {
      out.push(cur.trim());
      cur = "";
    } else cur += ch;
  }
  out.push(cur.trim());
  return out;
}

const sections = [];
let current = null;
for (const line of lines) {
  const h = line.match(/^## (.+)$/);
  if (h) {
    const title = h[1].trim();
    current = slugs[title]
      ? { title, slug: slugs[title], intro: "", endpoints: [] }
      : null;
    if (current) sections.push(current);
    continue;
  }
  if (!current) continue;
  if (line.startsWith("| `")) {
    const [route, key, people, feature, description] = cells(line);
    const [method, ...rest] = strip(route).split(" ");
    current.endpoints.push({
      method,
      path: rest.join(" "),
      integration: dash(key.replace(/`/g, "")),
      people: dash(people),
      feature: dash(feature),
      description,
    });
  } else if (
    line.trim() &&
    !line.startsWith("|") &&
    current.endpoints.length === 0
  ) {
    current.intro += (current.intro ? " " : "") + line.trim();
  }
}

const missing = Object.keys(slugs).filter(
  (t) => !sections.some((s) => s.title === t),
);
if (missing.length)
  throw new Error(`Sections not found in ${source}: ${missing.join(", ")}`);

const total = sections.reduce((n, s) => n + s.endpoints.length, 0);
writeFileSync(
  join(root, "lib/endpoints.json"),
  `${JSON.stringify(sections, null, 2)}\n`,
);
console.log(
  `Wrote ${total} endpoints in ${sections.length} sections to lib/endpoints.json`,
);
