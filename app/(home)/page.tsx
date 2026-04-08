import Link from "next/link";
import Image from "next/image";
import { ParticleNetwork } from "@/components/particle-network";
import {
  Link2,
  FileCode2,
  AppWindow,
  ArrowRight,
  Anchor,
  Unlock,
  GitPullRequest,
  Terminal,
} from "lucide-react";

function FeatureCard({
  icon: Icon,
  title,
  description,
  accent = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  accent?: boolean;
}) {
  return (
    <div className="landing-card group">
      <div
        className={`landing-card-icon ${accent ? "landing-card-icon--accent" : ""}`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="font-(family-name:--font-syne) font-semibold text-lg text-white/95 mb-2">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-white/50">{description}</p>
    </div>
  );
}

function ArchLayer({
  label,
  items,
  color,
}: {
  label: string;
  items: string[];
  color: "blue" | "amber" | "emerald";
}) {
  const colorMap = {
    blue: {
      border: "border-blue-400/30",
      bg: "bg-blue-400/5",
      badge: "bg-blue-400/15 text-blue-300",
      label: "text-blue-400",
    },
    amber: {
      border: "border-amber-400/30",
      bg: "bg-amber-400/5",
      badge: "bg-amber-400/15 text-amber-300",
      label: "text-amber-400",
    },
    emerald: {
      border: "border-emerald-400/30",
      bg: "bg-emerald-400/5",
      badge: "bg-emerald-400/15 text-emerald-300",
      label: "text-emerald-400",
    },
  };
  const c = colorMap[color];

  return (
    <div className={`rounded-lg border ${c.border} ${c.bg} p-4`}>
      <span
        className={`text-xs font-mono font-medium uppercase tracking-wider ${c.label} mb-3 block`}
      >
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className={`text-xs px-2.5 py-1 rounded-md ${c.badge} font-mono`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="landing-page">
      <ParticleNetwork />

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center h-dvh px-6 text-center">
        <div className="landing-hero-badge">
          <Anchor className="w-3.5 h-3.5" />
          <span>Open Source Platform Orchestrator</span>
        </div>

        <h1 className="font-(family-name:--font-syne) font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight mt-8 mb-6 leading-[0.95]">
          Deploy with
          <br />
          <span className="landing-gradient-text">confidence.</span>
        </h1>

        <p className="max-w-2xl text-lg text-[#94a3b8] leading-relaxed mb-10">
          Your IaC provisions infrastructure. Your manifests deploy apps.
          Admiral maintains the dependency graph across both so config flows
          automatically, environments stay consistent, and every deployment is a
          snapshot you can roll back.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link href="/docs" className="landing-btn-primary">
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a href="#problem" className="landing-btn-secondary">
            Why Admiral?
          </a>
        </div>
      </section>

      {/* The Problem */}
      <section
        id="problem"
        className="relative z-10 max-w-3xl mx-auto px-6 py-28"
      >
        <h2 className="font-(family-name:--font-syne) font-bold text-3xl sm:text-4xl text-white tracking-tight mb-6">
          Your tools don&apos;t talk to each other
        </h2>
        <div className="space-y-5 text-[#94a3b8] leading-relaxed">
          <p>
            IaC is good at provisioning infrastructure. Deployment tooling like
            Helm and Kustomize are good at getting applications running.
            They&apos;re different concerns for good reason, and pushing one to
            do the other&apos;s job rarely ends well. But one produces outputs
            the other needs as inputs, and so teams end up building the glue
            themselves.
          </p>
          <p>
            Use IaC to manage workloads and you hit state conflicts the moment a
            CI pipeline bumps an image tag. Use deployment tooling for
            infrastructure and you lose the guarantees IaC provides. Either way,
            something has to give.
          </p>
          <p>
            Then there&apos;s environments. Dev, staging, and production
            share most of the same configuration, but tooling generally
            treats them as entirely separate: separate manifests, separate
            values files, separate state. Standing up a new environment
            means duplicating most of it and keeping it all in sync by hand.
          </p>
        </div>
      </section>

      {/* How Admiral Solves It */}
      <section
        id="features"
        className="relative z-10 max-w-6xl mx-auto px-6 py-28"
      >
        <div className="text-center mb-16">
          <h2 className="font-(family-name:--font-syne) font-bold text-3xl sm:text-4xl text-white tracking-tight mb-4">
            How Admiral solves it
          </h2>
          <p className="text-[#94a3b8] max-w-xl mx-auto">
            Admiral sits between your existing tools and connects them. No
            lock-in. Your files stay in standard formats. If you stop using
            Admiral, you keep everything.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <FeatureCard
            icon={Link2}
            title="Infra ↔ Workload Glue"
            description="Admiral bridges the gap between infrastructure provisioning and application deployment. Your Terraform outputs flow directly into your app config. No manual wiring."
            accent
          />
          <FeatureCard
            icon={AppWindow}
            title="Application-Centric"
            description="Everything is organized around applications and environments, not clusters or namespaces. Define once, deploy anywhere with the right config at each level."
          />
          <FeatureCard
            icon={FileCode2}
            title="OpenAPI & Generated Clients"
            description="A fully documented OpenAPI spec with auto-generated clients in any language. Integrate Admiral into your existing toolchain in minutes."
          />
          <FeatureCard
            icon={Terminal}
            title="CLI & Terraform Provider"
            description="First-class CLI for interactive use and scripting. A Terraform provider so you can manage Admiral resources as code alongside your infrastructure."
          />
          <FeatureCard
            icon={GitPullRequest}
            title="GitHub Action"
            description="Deploy on push, on merge, or on tag. Admiral's GitHub Action plugs into your existing CI/CD workflow with zero custom scripting."
          />
          <FeatureCard
            icon={Unlock}
            title="No Lock-In"
            description="Your files stay in standard formats: Helm charts, Terraform modules, Kubernetes manifests. If you stop using Admiral, you keep everything."
            accent
          />
        </div>
      </section>

      {/* Architecture */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-28">
        <div className="text-center mb-16">
          <h2 className="font-(family-name:--font-syne) font-bold text-3xl sm:text-4xl text-white tracking-tight mb-4">
            How it works
          </h2>
          <p className="text-[#94a3b8] max-w-lg mx-auto">
            Admiral provides a consistent control plane between your team and
            your infrastructure, replacing the gap held together by tribal
            knowledge and duct-tape automation.
          </p>
        </div>

        <div className="space-y-4">
          <ArchLayer
            label="Control Plane"
            items={[
              "API Server",
              "Auth (OIDC)",
              "RBAC Engine",
              "Variable Store",
              "Revision Manager",
            ]}
            color="blue"
          />
          <div className="flex justify-center">
            <div className="w-px h-8 bg-gradient-to-b from-blue-400/30 to-amber-400/30" />
          </div>
          <ArchLayer
            label="Orchestration"
            items={[
              "Temporal Workers",
              "Template Engine",
              "Helm Renderer",
              "Manifest Builder",
            ]}
            color="amber"
          />
          <div className="flex justify-center">
            <div className="w-px h-8 bg-gradient-to-b from-amber-400/30 to-emerald-400/30" />
          </div>
          <ArchLayer
            label="Infrastructure"
            items={[
              "K8s Controllers",
              "Cluster Agents",
              "Status Reporter",
              "Terraform/OpenTofu",
            ]}
            color="emerald"
          />
        </div>
      </section>

      {/* Code example */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <div className="landing-code-block">
          <div className="flex items-center gap-2 mb-5 pb-4 border-b border-white/[0.06]">
            <div className="w-3 h-3 rounded-full bg-red-400/60" />
            <div className="w-3 h-3 rounded-full bg-amber-400/60" />
            <div className="w-3 h-3 rounded-full bg-emerald-400/60" />
            <span className="ml-3 text-xs text-white/30 font-mono">
              terminal
            </span>
          </div>
          <pre className="font-mono text-sm leading-7 overflow-x-auto">
            <code>
              <span className="text-white/30">$</span>{" "}
              <span className="text-amber-400">admctl</span>{" "}
              <span className="text-white/70">app create</span>{" "}
              <span className="text-blue-300">billing-api</span>
              {"\n"}
              <span className="text-emerald-400/70">✓ Application created</span>
              {"\n\n"}
              <span className="text-white/30">$</span>{" "}
              <span className="text-amber-400">admctl</span>{" "}
              <span className="text-white/70">env create</span>{" "}
              <span className="text-blue-300">production</span>{" "}
              <span className="text-white/40">
                --app billing-api --cluster us-east-1
              </span>
              {"\n"}
              <span className="text-emerald-400/70">
                ✓ Environment created and linked to cluster
              </span>
              {"\n\n"}
              <span className="text-white/30">$</span>{" "}
              <span className="text-amber-400">admctl</span>{" "}
              <span className="text-white/70">var set</span>{" "}
              <span className="text-blue-300">REPLICAS=3</span>{" "}
              <span className="text-white/40">
                --app billing-api --env production
              </span>
              {"\n"}
              <span className="text-emerald-400/70">✓ Variable set</span>
              {"\n\n"}
              <span className="text-white/30">$</span>{" "}
              <span className="text-amber-400">admctl</span>{" "}
              <span className="text-white/70">deploy</span>{" "}
              <span className="text-blue-300">billing-api</span>{" "}
              <span className="text-white/40">--env production</span>
              {"\n"}
              <span className="text-emerald-400/70">
                ✓ Revision r-28f3a deployed to us-east-1
              </span>
            </code>
          </pre>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 text-center px-6 py-32">
        <h2 className="font-(family-name:--font-syne) font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-6">
          Take command of your fleet.
        </h2>
        <p className="text-[#94a3b8] max-w-lg mx-auto mb-10">
          Admiral is open source, transparent, and portable. No lock-in, no
          sales calls. Start deploying in minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/docs" className="landing-btn-primary">
            Read the Docs
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://github.com/admiral-platform/admiral"
            className="landing-btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Star on GitHub
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#697586]">
          <Image
            src="/images/logo-white.svg"
            alt="Admiral"
            width={72}
            height={20}
            className="h-4 w-auto opacity-50"
          />
          <span>Open source under the Apache 2.0 license.</span>
        </div>
      </footer>
    </div>
  );
}
