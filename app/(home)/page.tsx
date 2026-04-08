import Link from "next/link";
import Image from "next/image";
import { ParticleNetwork } from "@/components/particle-network";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import {
  Link2,
  FileCode2,
  AppWindow,
  ArrowRight,
  Anchor,
  Unlock,
  Plug,
  History,
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

function LandingSectionSeparator() {
  return (
    <div className="landing-section-separator" aria-hidden>
      <div className="landing-section-separator__line" />
      <div className="landing-section-separator__node" />
      <div className="landing-section-separator__line landing-section-separator__line--right" />
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="landing-page">
      <ParticleNetwork />

      {/* Logo: out of flow so the hero can center in the full viewport */}
      <div className="absolute left-0 top-0 z-10 px-8 pt-8">
        <Image
          src="/images/logo-white.svg"
          alt="Admiral"
          width={120}
          height={32}
          className="h-8 w-auto opacity-80"
        />
      </div>

      {/* Hero: full-viewport fold with asymmetric vertical space — less empty area below CTAs when scrolling than pure flex center */}
      <section className="relative z-10 grid min-h-dvh grid-rows-[1fr_auto_minmax(0,0.5fr)] px-6 text-center">
        <div className="min-h-0" aria-hidden />
        <div className="flex flex-col items-center">
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
            automatically, environments stay consistent, and every deployment is
            a snapshot you can roll back.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link href="/docs" className="landing-btn-primary">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#why" className="landing-btn-secondary">
              Why Admiral?
            </a>
          </div>
        </div>
        <div className="min-h-0" aria-hidden />
      </section>

      <LandingSectionSeparator />

      {/* The Problem */}
      <section
        id="why"
        className="relative z-10 max-w-3xl mx-auto px-6 pt-6 pb-28 scroll-mt-16"
      >
        <AnimateOnScroll>
          <h2 className="font-(family-name:--font-syne) font-bold text-3xl sm:text-4xl text-white tracking-tight mb-6">
            Your tools don&apos;t talk to each other
          </h2>
        </AnimateOnScroll>
        <div className="space-y-5 text-[#94a3b8] leading-relaxed">
          <AnimateOnScroll delay={100}>
            <p>
              IaC is good at provisioning infrastructure. Deployment tooling
              like Helm and Kustomize are good at getting applications running.
              They&apos;re different concerns for good reason, and pushing one
              to do the other&apos;s job rarely ends well. But one produces
              outputs the other needs as inputs, and so teams end up building
              the glue themselves.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll delay={200}>
            <p>
              Use IaC to manage workloads and you hit state conflicts the moment
              a CI pipeline bumps an image tag. Use deployment tooling for
              infrastructure and you lose the guarantees IaC provides. Either
              way, something has to give.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll delay={300}>
            <p>
              Then there&apos;s environments. Dev, staging, and production share
              most of the same configuration, but tooling generally treats them
              as entirely separate: separate manifests, separate values files,
              separate state. Standing up a new environment means duplicating
              most of it and keeping it all in sync by hand.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      <LandingSectionSeparator />

      {/* How Admiral Solves It */}
      <section
        id="features"
        className="relative z-10 max-w-6xl mx-auto px-6 py-28"
      >
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <h2 className="font-(family-name:--font-syne) font-bold text-3xl sm:text-4xl text-white tracking-tight mb-4">
              How Admiral solves it
            </h2>
            <p className="text-[#94a3b8] max-w-xl mx-auto">
              Admiral sits between your IaC and your deployment tooling,
              maintains the dependency graph across both, and gives you an
              application-centric model that reduces environment duplication.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimateOnScroll delay={0}>
            <FeatureCard
              icon={Link2}
              title="Infra ↔ Workload Glue"
              description="Admiral lets your workloads reference IaC outputs directly. When infrastructure changes, Admiral knows which workloads depend on it and pulls in the updated values."
              accent
            />
          </AnimateOnScroll>
          <AnimateOnScroll delay={100}>
            <FeatureCard
              icon={AppWindow}
              title="Application-Centric"
              description="Organized around applications and environments. Define your app once, layer environment-specific config on top, and stop duplicating manifests across dev, staging, and production."
            />
          </AnimateOnScroll>
          <AnimateOnScroll delay={200}>
            <FeatureCard
              icon={FileCode2}
              title="OpenAPI Spec"
              description="A fully documented OpenAPI spec with the ability to generate clients in any language. Integrate Admiral into your existing toolchain with ease."
            />
          </AnimateOnScroll>
          <AnimateOnScroll delay={300}>
            <FeatureCard
              icon={Plug}
              title="Works With Your Toolchain"
              description="A CLI for scripting and CI/CD, a GitHub Action for deploy-on-merge workflows, a Terraform provider for managing Admiral as code. Integrate however your team already works."
            />
          </AnimateOnScroll>
          <AnimateOnScroll delay={400}>
            <FeatureCard
              icon={History}
              title="GitOps Without the Git"
              description="Declarative desired state, immutable versioned snapshots, pull-based agents, continuous reconciliation. The same principles as GitOps, stored in a control plane designed for it instead of a Git repo."
            />
          </AnimateOnScroll>
          <AnimateOnScroll delay={500}>
            <FeatureCard
              icon={Unlock}
              title="No Lock-In"
              description="Admiral orchestrates your tools but doesn't replace them. Your Helm charts, Terraform modules, and manifests stay in standard formats that work without Admiral."
              accent
            />
          </AnimateOnScroll>
        </div>
      </section>

      <LandingSectionSeparator />

      {/* How It Works */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-28">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <h2 className="font-(family-name:--font-syne) font-bold text-3xl sm:text-4xl text-white tracking-tight mb-4">
              How it works
            </h2>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimateOnScroll delay={0}>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-blue-400/30 bg-blue-400/10 text-blue-300 font-mono text-sm font-semibold mb-4">
                1
              </div>
              <h3 className="font-(family-name:--font-syne) font-semibold text-lg text-white/95 mb-2">
                Define
              </h3>
              <p className="text-sm leading-relaxed text-white/50">
                Your application, its environments, and its configuration.
                Define once, layer environment-specific values on top.
              </p>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={150}>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 font-mono text-sm font-semibold mb-4">
                2
              </div>
              <h3 className="font-(family-name:--font-syne) font-semibold text-lg text-white/95 mb-2">
                Connect
              </h3>
              <p className="text-sm leading-relaxed text-white/50">
                IaC outputs to the workloads that depend on them. Admiral
                maintains the dependency graph so nothing gets lost between
                provisioning and deployment.
              </p>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={300}>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 font-mono text-sm font-semibold mb-4">
                3
              </div>
              <h3 className="font-(family-name:--font-syne) font-semibold text-lg text-white/95 mb-2">
                Deploy
              </h3>
              <p className="text-sm leading-relaxed text-white/50">
                To any environment. Every deployment produces a versioned,
                immutable snapshot you can roll back to at any time.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Code example */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <AnimateOnScroll>
          <div className="landing-code-block">
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-white/6">
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
                <span className="text-emerald-400/70">
                  ✓ Application created
                </span>
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
        </AnimateOnScroll>
      </section>

      <LandingSectionSeparator />

      {/* CTA */}
      <section className="relative z-10 text-center px-6 py-32">
        <AnimateOnScroll>
          <h2 className="font-(family-name:--font-syne) font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-6">
            Take command of your fleet.
          </h2>
          <p className="text-[#94a3b8] max-w-lg mx-auto mb-10">
            Admiral is open source, transparent, and portable. No lock-in, no
            sales calls. Start deploying in minutes.
          </p>
        </AnimateOnScroll>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/docs" className="landing-btn-primary">
            Read the Docs
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://github.com/admiral-io/admiral"
            className="landing-btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Star on GitHub
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/6 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#697586]">
          <Image
            src="/images/logo-white.svg"
            alt="Admiral"
            width={72}
            height={20}
            className="h-4 w-auto opacity-50"
          />
          <span>Open source under Apache 2.0 and AGPL 3.0 licenses.</span>
        </div>
      </footer>
    </div>
  );
}
