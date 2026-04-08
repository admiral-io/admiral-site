import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admiral — Open Source Platform Orchestrator",
  description:
    "Open source platform orchestrator that bridges IaC and app deployments. Dependency graph across the full stack, environment-aware config, and deterministic rollbacks.",
};

export default function Layout({ children }: LayoutProps<"/">) {
  return <>{children}</>;
}
