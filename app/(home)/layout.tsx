import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admiral — Open Source Platform Orchestrator",
  description:
    "Orchestrate application deployments across Kubernetes clusters with a single binary. Manage environments, variables, and deployments through a powerful gRPC API.",
};

export default function Layout({ children }: LayoutProps<"/">) {
  return <>{children}</>;
}
