import { createOpenAPI } from "fumadocs-openapi/server";

const SPEC_URL =
  "https://raw.githubusercontent.com/admiral-io/admiral-openapi/refs/heads/master/openapi.v3.yaml";

export const openapi = createOpenAPI({
  async input() {
    const { load } = await import("js-yaml");
    const text = await fetch(SPEC_URL).then((res) => res.text());
    const spec = load(text) as Record<string, unknown>;

    spec.servers = [
      {
        url: "{serverUrl}",
        description: "Admiral API Server",
        variables: {
          serverUrl: {
            default: "https://api.example.com",
            description: "Your Admiral API server URL",
          },
        },
      },
    ];

    spec.components = {
      ...(spec.components as Record<string, unknown>),
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Personal Access Token or Service Access Token",
        },
      },
    };

    spec.security = [{ bearerAuth: [] }];

    return { admiral: spec };
  },
  proxyUrl: "/api/proxy",
});
