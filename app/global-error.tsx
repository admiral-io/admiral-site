"use client";

import { Syne } from "next/font/google";
import { AlertTriangle } from "lucide-react";
import "./global.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className={syne.variable}>
      <body className="flex flex-col min-h-screen">
        <div
          className="flex min-h-dvh flex-col items-center justify-center px-6 text-center"
          style={{ background: "#0b0f19" }}
        >
          <div
            className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{
              background: "rgba(245, 158, 11, 0.1)",
              border: "1px solid rgba(245, 158, 11, 0.2)",
            }}
          >
            <AlertTriangle className="h-7 w-7" style={{ color: "#f59e0b" }} />
          </div>

          <h1
            className="font-(family-name:--font-syne) text-4xl font-bold tracking-tight sm:text-5xl"
            style={{ color: "rgba(255, 255, 255, 0.95)" }}
          >
            Something went wrong
          </h1>

          <p
            className="mt-4 max-w-md text-lg leading-relaxed"
            style={{ color: "#94a3b8" }}
          >
            An unexpected error occurred. Please try again.
          </p>

          <button
            onClick={reset}
            type="button"
            className="landing-btn-primary mt-10"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
