import { createOpenAPI } from "fumadocs-openapi/server";

export const openapi = createOpenAPI({
  input: ["./openapi.v3.yaml"],
  proxyUrl: "/api/proxy",
});
