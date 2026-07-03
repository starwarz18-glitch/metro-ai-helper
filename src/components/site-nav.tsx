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
    <footer className="mx-auto mt-24 max-w-6xl px-4 pb-10 pt-8 text-sm text-muted-foreground sm:px-6">
      <div className="border-t pt-8">
        <p className="font-medium text-foreground">서울교통공사 · 시민 중심 AX 홈페이지 리뉴얼</p>
        <p className="mt-1">정보를 찾는 홈페이지에서 문제를 해결하는 AI 홈페이지로.</p>
        <p className="mt-4 text-xs">© 2026 Seoul Metro AX Prototype. Mock data for concept demonstration.</p>
      </div>
    </footer>
  );
}