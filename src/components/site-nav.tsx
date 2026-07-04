import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Train, Globe, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { LANGS, useLanguage, type TKey } from "@/lib/language";

const links: { to: string; labelKey: TKey }[] = [
  { to: "/", labelKey: "navHome" },
  { to: "/assistant", labelKey: "navAssistant" },
  { to: "/transit", labelKey: "navTransit" },
  { to: "/lost-found", labelKey: "navLostFound" },
  { to: "/complaint", labelKey: "navComplaint" },
  { to: "/notice", labelKey: "navNotice" },
  { to: "/my-metro", labelKey: "navMy" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { lang, setLang, t } = useLanguage();
  const current = LANGS.find((l) => l.code === lang)!;

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass-card mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 sm:mt-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-white">
            <Train className="h-4 w-4" />
          </span>
          <span className="text-sm sm:text-base">서울교통공사 <span className="text-primary">{t("brand")}</span></span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to + l.labelKey}
              to={l.to}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                pathname === l.to && "bg-secondary text-foreground",
              )}
            >
              {t(l.labelKey)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-full border bg-white/70 px-3 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur hover:border-primary/40 hover:text-primary"
              aria-label="language"
            >
              <Globe className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{current.label}</span>
              <span className="sm:hidden">{current.code.toUpperCase()}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-2xl border bg-white shadow-lg">
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                    className={cn(
                      "flex w-full items-center justify-between px-4 py-2.5 text-sm hover:bg-secondary",
                      l.code === lang && "text-primary",
                    )}
                  >
                    {l.label}
                    {l.code === lang && <Check className="h-4 w-4" />}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            className="rounded-full p-2 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="glass-card mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-2xl p-3 lg:hidden">
          {links.map((l) => (
            <Link
              key={l.to + l.labelKey}
              to={l.to}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-xl px-4 py-3 text-sm text-foreground hover:bg-secondary",
                pathname === l.to && "bg-secondary",
              )}
            >
              {t(l.labelKey)}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {/* Left */}
          <div className="flex flex-col gap-2">
            <p className="text-base font-semibold tracking-tight text-foreground">
              서울교통공사 <span className="text-primary">{t("brand")}</span>
            </p>
            <p className="text-sm text-muted-foreground">{t("footerTagline")}</p>
          </div>

          {/* Center */}
          <div className="flex flex-col gap-2.5">
            {[
              { to: "/assistant", label: t("svc1Title") },
              { to: "/transit", label: t("svc2Title") },
              { to: "/lost-found", label: t("svc4Title") },
              { to: "/complaint", label: t("svc6Title") },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="w-fit text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="flex flex-col gap-2.5">
            {[
              { to: "#", label: t("footerPrivacy") },
              { to: "#", label: t("footerTerms") },
              { to: "#", label: t("footerSupport") },
              {
                to: "https://www.seoulmetro.co.kr",
                label: t("footerHomepage"),
                external: true,
              },
            ].map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.to}
                  className="w-fit text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ),
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-border pt-6 text-center text-xs text-muted-foreground sm:mt-16">
          {t("footerRights")}
        </div>
      </div>
    </footer>
  );
}