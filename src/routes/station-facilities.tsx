import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Accessibility, ArrowUpDown, MapPin, Baby, ArmchairIcon } from "lucide-react";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/station-facilities")({ component: FacilitiesPage });

const FILTERS = [
  { key: "elevator", label: "엘리베이터" },
  { key: "escalator", label: "에스컬레이터" },
  { key: "toilet", label: "화장실" },
  { key: "nursery", label: "수유실" },
  { key: "lift", label: "휠체어 리프트" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

const DEMO: Record<string, {
  line: string;
  facilities: { key: FilterKey; label: string; count: string; note?: string }[];
  access: string;
}> = {
  강남역: {
    line: "2호선 · 신분당선",
    facilities: [
      { key: "elevator", label: "엘리베이터", count: "4대", note: "지상 ↔ 대합실 ↔ 승강장" },
      { key: "escalator", label: "에스컬레이터", count: "12대" },
      { key: "toilet", label: "화장실", count: "8곳", note: "장애인 화장실 4곳" },
      { key: "nursery", label: "수유실", count: "1곳", note: "3번 출구 대합실" },
      { key: "lift", label: "휠체어 리프트", count: "0대" },
    ],
    access: "전 승강장 엘리베이터 이동 가능, 시각장애인 유도블록 완비.",
  },
  서울역: {
    line: "1호선 · 4호선 · 공항철도 · KTX",
    facilities: [
      { key: "elevator", label: "엘리베이터", count: "6대" },
      { key: "escalator", label: "에스컬레이터", count: "20대" },
      { key: "toilet", label: "화장실", count: "12곳", note: "장애인 화장실 6곳" },
      { key: "nursery", label: "수유실", count: "2곳" },
      { key: "lift", label: "휠체어 리프트", count: "1대" },
    ],
    access: "KTX ↔ 지하철 환승 시 엘리베이터 이동로 이용 가능.",
  },
  고속터미널역: {
    line: "3호선 · 7호선 · 9호선",
    facilities: [
      { key: "elevator", label: "엘리베이터", count: "5대" },
      { key: "escalator", label: "에스컬레이터", count: "16대" },
      { key: "toilet", label: "화장실", count: "10곳", note: "장애인 화장실 5곳" },
      { key: "nursery", label: "수유실", count: "1곳" },
      { key: "lift", label: "휠체어 리프트", count: "2대" },
    ],
    access: "환승 통로가 길므로 교통약자는 엘리베이터 경로 이용 권장.",
  },
};

function iconFor(k: FilterKey) {
  switch (k) {
    case "elevator": return ArrowUpDown;
    case "escalator": return ArrowUpDown;
    case "toilet": return ArmchairIcon;
    case "nursery": return Baby;
    case "lift": return Accessibility;
  }
}

function FacilitiesPage() {
  const [q, setQ] = useState("강남역");
  const [active, setActive] = useState<FilterKey[]>([]);
  const [shown, setShown] = useState(false);
  const key = Object.keys(DEMO).find((k) => q.includes(k.replace("역", ""))) ?? "강남역";
  const data = DEMO[key];
  const facilities = active.length
    ? data.facilities.filter((f) => active.includes(f.key))
    : data.facilities;

  const toggle = (k: FilterKey) =>
    setActive((prev) => (prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]));

  return (
    <PageShell
      eyebrow="역별 편의시설 검색"
      title="필요한 시설, 미리 확인하세요"
      subtitle="엘리베이터·화장실·수유실 등 편의시설 위치와 교통약자 이동 안내를 제공합니다."
    >
      <div className="glass-card rounded-3xl p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex flex-1 items-center gap-2 rounded-2xl border bg-white px-4 py-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="강남역, 서울역, 고속터미널역"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
          </div>
          <button
            onClick={() => setShown(true)}
            className="rounded-2xl bg-[image:var(--gradient-primary)] px-6 py-3 text-sm font-medium text-white shadow-[var(--shadow-glow)]"
          >
            검색
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const on = active.includes(f.key);
            return (
              <button
                key={f.key}
                onClick={() => toggle(f.key)}
                className={
                  "rounded-full border px-4 py-1.5 text-xs font-medium transition " +
                  (on
                    ? "border-primary bg-primary text-primary-foreground"
                    : "bg-white text-foreground/80 hover:border-primary/40 hover:text-primary")
                }
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {shown && (
        <div className="mt-6 rounded-3xl border bg-card p-6 shadow-[var(--shadow-soft)]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">{key}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{data.line}</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
              <MapPin className="h-3 w-3" /> 편의시설 현황
            </span>
          </div>
          <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {facilities.map((f) => {
              const Icon = iconFor(f.key);
              return (
                <li key={f.key} className="flex items-start gap-3 rounded-2xl bg-secondary p-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{f.label} · {f.count}</p>
                    {f.note && <p className="mt-0.5 text-xs text-muted-foreground">{f.note}</p>}
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-5 rounded-2xl border border-primary/20 bg-primary-soft/60 p-4 text-sm text-foreground">
            <div className="flex items-center gap-2 text-primary">
              <Accessibility className="h-4 w-4" />
              <span className="font-semibold">교통약자 이동 안내</span>
            </div>
            <p className="mt-1.5 text-muted-foreground">{data.access}</p>
          </div>
        </div>
      )}
    </PageShell>
  );
}
