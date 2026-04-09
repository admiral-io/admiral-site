import { docs } from "collections/server";
import { type InferPageType, loader, multiple } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";
import { openapiPlugin, openapiSource } from "fumadocs-openapi/server";
import { docsContentRoute, docsImageRoute, docsRoute } from "./shared";
import { openapi } from "@/lib/openapi";

function getOpenAPIGroupName(entry: {
  item: { path?: string; name?: string };
}): string {
  const sourcePath = entry.item.path ?? entry.item.name ?? "";
  const pathSegments = sourcePath.split("/").filter(Boolean);
  const resourceSegment =
    pathSegments[0] === "api" && pathSegments[1] === "v1"
      ? pathSegments[2]
      : pathSegments[0];

  const cleaned = resourceSegment?.replace(/[{}]/g, "").trim().toLowerCase();
  return cleaned && cleaned.length > 0 ? cleaned : "general";
}

export const source = loader(
  multiple({
    docs: docs.toFumadocsSource(),
    openapi: await openapiSource(openapi, {
      baseDir: "api-reference",
      per: "operation",
      groupBy: getOpenAPIGroupName,
    }),
  }),
  {
    baseUrl: docsRoute,
    plugins: [lucideIconsPlugin(), openapiPlugin()],
  },
);

export function getFirstApiReferencePageUrl(): string {
  const openapiPages = source
    .getPages()
    .filter((p) => p.path.startsWith("api-reference/"))
    .sort((a, b) => a.url.localeCompare(b.url));
  return openapiPages[0]?.url ?? docsRoute;
}

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, "image.png"];

  return {
    segments,
    url: `${docsImageRoute}/${segments.join("/")}`,
  };
}

export function getPageMarkdownUrl(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, "content.md"];

  return {
    segments,
    url: `${docsContentRoute}/${segments.join("/")}`,
  };
}

export async function getLLMText(page: InferPageType<typeof source>) {
  if (page.data.type === "openapi") {
    return `# ${page.data.title} (${page.url})`;
  }

  const processed = await page.data.getText("processed");

  return `# ${page.data.title} (${page.url})

${processed}`;
}
