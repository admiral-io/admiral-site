import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function DocsNotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-fd-accent text-fd-accent-foreground">
        <FileQuestion className="h-6 w-6" />
      </div>

      <h1 className="font-(family-name:--font-syne) text-3xl font-bold tracking-tight text-fd-foreground">
        Page not found
      </h1>

      <p className="mt-3 max-w-sm text-fd-muted-foreground">
        This documentation page doesn't exist or may have been moved.
      </p>

      <Link
        href="/docs"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground transition-colors hover:bg-fd-primary/90"
      >
        Back to docs
      </Link>
    </div>
  );
}
