import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Umbrella, Headphones, Wallet } from "lucide-react";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/lost-found")({ component: LostFoundPage });

const results = [
  { icon: Umbrella, item: "검은색 우산", station: "강남역", status: "보관중", tone: "bg-emerald-100 text-emerald-700" },
  { icon: Headphones, item: "무선 이어폰", station: "잠실역", status: "확인 필요", tone: "bg-amber-100 text-amber-700" },
  { icon: Wallet, item: "지갑", station: "시청역", status: "유사 물품 있음", tone: "bg-blue-100 text-blue-700" },
];

function LostFoundPage() {
  const [item, setItem] = useState("우산");
  const [station, setStation] = useState("강남역");
  const [date, setDate] = useState("2026-07-03");
  const [shown, setShown] = useState(false);

  return (
    <PageShell eyebrow="유실물 AI 검색" title="잃어버린 물건, AI가 찾아드립니다" subtitle="물건·역·날짜를 입력하면 유사한 유실물을 즉시 매칭해요.">
      <div className="glass-card grid grid-cols-1 gap-3 rounded-3xl p-4 sm:grid-cols-3 sm:p-5">
        <Field label="잃어버린 물건" value={item} onChange={setItem} />
        <Field label="역명" value={station} onChange={setStation} />
        <Field label="날짜" value={date} onChange={setDate} type="date" />
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setShown(true)}
          className="inline-flex items-center gap-2 rounded-2xl bg-[image:var(--gradient-primary)] px-6 py-3 text-sm font-medium text-white shadow-[var(--shadow-glow)]"
        >
          <Search className="h-4 w-4" /> AI로 유실물 찾기
        </button>
      </div>

      {shown && (
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {results.map((r) => (
            <div key={r.item} className="rounded-3xl border bg-card p-6 shadow-[var(--shadow-soft)]">
              <div className="flex items-center justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                  <r.icon className="h-5 w-5" />
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${r.tone}`}>{r.status}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold">{r.item}</h3>
              <p className="mt-1 text-sm text-muted-foreground">발견 위치 · {r.station}</p>
              <button className="mt-5 w-full rounded-xl border bg-white py-2 text-sm font-medium hover:bg-secondary">자세히 보기</button>
            </div>
          ))}
        </div>
      )}
    </PageShell>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="flex flex-col gap-1 rounded-2xl border bg-white px-4 py-3">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="bg-transparent text-sm outline-none" />
    </label>
  );
}