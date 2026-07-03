import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Clock, Activity, TrainFront, Route as RouteIcon } from "lucide-react";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/transit")({ component: TransitPage });

function TransitPage() {
  const [from, setFrom] = useState("강남");
  const [to, setTo] = useState("시청");
  const [showAlt, setShowAlt] = useState(false);

  return (
    <PageShell eyebrow="실시간 운행 안내" title="지금 가장 편한 길을 알려드려요" subtitle="혼잡도와 지연을 반영해 AI가 최적 경로를 추천합니다.">
      <div className="glass-card grid grid-cols-1 gap-3 rounded-3xl p-4 sm:grid-cols-[1fr_1fr_auto] sm:p-5">
        <label className="flex items-center gap-3 rounded-2xl border bg-white px-4 py-3">
          <span className="text-xs font-medium text-muted-foreground">출발</span>
          <input value={from} onChange={(e) => setFrom(e.target.value)} className="w-full bg-transparent outline-none" />
        </label>
        <label className="flex items-center gap-3 rounded-2xl border bg-white px-4 py-3">
          <span className="text-xs font-medium text-muted-foreground">도착</span>
          <input value={to} onChange={(e) => setTo(e.target.value)} className="w-full bg-transparent outline-none" />
        </label>
        <button className="rounded-2xl bg-[image:var(--gradient-primary)] px-5 py-3 text-sm font-medium text-white">경로 조회</button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MetricCard icon={Activity} label="혼잡도" value="보통" hint="현재 60% · 여유 있음" tone="ok" />
        <MetricCard icon={Clock} label="예상 소요시간" value="24분" hint="환승 1회" tone="neutral" />
        <MetricCard icon={TrainFront} label="지연 여부" value="2분 지연" hint="2호선 강남~잠실" tone="warn" />
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => setShowAlt(true)}
          className="rounded-full border bg-white px-5 py-2.5 text-sm font-medium shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5"
        >
          🧭 덜 혼잡한 경로 추천
        </button>
      </div>

      {showAlt && (
        <div className="mt-6 rounded-3xl border bg-card p-6 shadow-[var(--shadow-soft)]">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <RouteIcon className="h-4 w-4" /> AI 추천 경로
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            <Chip>{from}</Chip><ArrowRight className="h-4 w-4 text-muted-foreground" />
            <Chip>교대 (3호선 환승)</Chip><ArrowRight className="h-4 w-4 text-muted-foreground" />
            <Chip>을지로3가 (2호선)</Chip><ArrowRight className="h-4 w-4 text-muted-foreground" />
            <Chip>{to}</Chip>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">기존 대비 <b className="text-foreground">혼잡도 25% 감소</b>, 소요시간 <b className="text-foreground">+3분</b>.</p>
        </div>
      )}
    </PageShell>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-primary-soft px-3 py-1 text-primary">{children}</span>;
}

function MetricCard({ icon: Icon, label, value, hint, tone }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; hint: string; tone: "ok" | "warn" | "neutral" }) {
  const dot = tone === "ok" ? "bg-emerald-500" : tone === "warn" ? "bg-amber-500" : "bg-primary";
  return (
    <div className="rounded-3xl border bg-card p-6 shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between">
        <Icon className="h-5 w-5 text-primary" />
        <span className={`h-2 w-2 rounded-full ${dot}`} />
      </div>
      <p className="mt-4 text-xs font-medium text-muted-foreground">{label}</p>
      <p className="text-2xl font-semibold tracking-tight">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}