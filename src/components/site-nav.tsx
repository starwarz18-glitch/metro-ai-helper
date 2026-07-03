import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Train } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/assistant", label: "AI Assistant" },
  { to: "/transit", label: "운행 안내" },
  { to: "/lost-found", label: "유실물" },
  { to: "/complaint", label: "민원 접수" },
  { to: "/notice", label: "공지 요약" },
  { to: "/my-metro", label: "My Metro" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass-card mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 sm:mt-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-white">
            <Train className="h-4 w-4" />
          </span>
          <span className="text-sm sm:text-base">서울교통공사 <span className="text-primary">AX</span></span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                pathname === l.to && "bg-secondary text-foreground",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <button
          className="rounded-full p-2 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="glass-card mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-2xl p-3 lg:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-xl px-4 py-3 text-sm text-foreground hover:bg-secondary",
                pathname === l.to && "bg-secondary",
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {/* Left */}
          <div className="flex flex-col gap-2">
            <p className="text-base font-semibold tracking-tight text-foreground">
              서울교통공사 <span className="text-primary">AX</span>
            </p>
            <p className="text-sm text-muted-foreground">시민을 위한 AI 기반 디지털 서비스</p>
          </div>

          {/* Center */}
          <div className="flex flex-col gap-2.5">
            {[
              { to: "/assistant", label: "AI Assistant" },
              { to: "/transit", label: "실시간 운행 안내" },
              { to: "/lost-found", label: "유실물 찾기" },
              { to: "/complaint", label: "AI 민원 접수" },
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
              { to: "#", label: "개인정보처리방침" },
              { to: "#", label: "이용약관" },
              { to: "#", label: "고객센터" },
              {
                to: "https://www.seoulmetro.co.kr",
                label: "서울교통공사 홈페이지",
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
          © 2026 Seoul Metro AX. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}