import type { ReactNode } from "react";

export function PageShell({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
      <div className="mb-8 sm:mb-12">
        {eyebrow && (
          <p className="mb-3 text-sm font-medium text-primary">{eyebrow}</p>
        )}
        <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </main>
  );
}