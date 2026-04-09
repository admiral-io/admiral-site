import Link from "next/link";
import Image from "next/image";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="relative flex min-h-dvh flex-col items-center justify-center px-6 text-center"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% 30%, rgba(27, 42, 74, 0.25), #0b0f19 70%)",
        backgroundColor: "#0b0f19",
      }}
    >
      <div className="absolute left-0 top-0 px-8 pt-8">
        <Link href="/">
          <Image
            src="/images/logo-white.svg"
            alt="Admiral"
            width={120}
            height={32}
            className="h-8 w-auto opacity-80"
          />
        </Link>
      </div>

      <h1 className="font-(family-name:--font-syne) text-7xl font-bold tracking-tight sm:text-8xl">
        <span className="landing-gradient-text">404</span>
      </h1>

      <p className="mt-6 max-w-md text-lg leading-relaxed text-[#94a3b8]">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link href="/" className="landing-btn-primary">
          Back to home
        </Link>
        <Link href="/docs" className="landing-btn-secondary">
          Documentation
        </Link>
      </div>
    </div>
  );
}
