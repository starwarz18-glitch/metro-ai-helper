import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Umbrella, Headphones, Wallet, X, MapPin, Calendar, Package } from "lucide-react";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/lost-found")({ component: LostFoundPage });

const CATEGORIES = ["전체", "우산/의류", "전자기기", "지갑/카드", "가방", "기타"] as const;

type Result = {
  id: string;
  icon: typeof Umbrella;
  item: string;
  station: string;
  storage: string;
  receivedAt: string;
  similarity: number;
  status: string;
  tone: string;
  desc: string;
};

const results: Result[] = [
  { id: "L-001", icon: Umbrella, item: "검은색 장우산", station: "강남역", storage: "강남역 고객안내센터", receivedAt: "2026.07.03 08:24", similarity: 96, status: "보관중", tone: "bg-emerald-100 text-emerald-700", desc: "검은색 손잡이, 장우산 형태. 개찰구 인근에서 발견됨." },
  { id: "L-002", icon: Headphones, item: "무선 이어폰 (화이트)", station: "잠실역", storage: "잠실역 유실물센터", receivedAt: "2026.07.02 19:11", similarity: 88, status: "확인 필요", tone: "bg-amber-100 text-amber-700", desc: "충전 케이스 포함. 승강장 벤치에서 발견됨." },
  { id: "L-003", icon: Wallet, item: "갈색 반지갑", station: "시청역", storage: "시청역 역무실", receivedAt: "2026.07.01 12:47", similarity: 74, status: "유사 물품", tone: "bg-blue-100 text-blue-700", desc: "카드 다수 포함. 개인정보 보호를 위해 세부 내용 비공개." },
];

function LostFoundPage() {
  const [item, setItem] = useState("우산");
  const [station, setStation] = useState("강남역");
  const [date, setDate] = useState("2026-07-03");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("전체");
  const [shown, setShown] = useState(false);
  const [detail, setDetail] = useState<Result | null>(null);

  return (
    <PageShell eyebrow="유실물 AI 검색" title="잃어버린 물건, AI가 찾아드립니다" subtitle="물건·역·날짜를 입력하면 유사한 유실물을 즉시 매칭해요.">
      <div className="glass-card grid grid-cols-1 gap-3 rounded-3xl p-4 sm:grid-cols-3 sm:p-5">
        <Field label="잃어버린 물건" value={item} onChange={setItem} />
        <Field label="역명" value={station} onChange={setStation} />
        <Field label="날짜" value={date} onChange={setDate} type="date" />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={
              "rounded-full border px-4 py-1.5 text-xs font-medium transition " +
              (category === c
                ? "border-primary bg-primary text-primary-foreground"
                : "bg-white text-foreground/80 hover:border-primary/40 hover:text-primary")
            }
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setShown(true)}
          className="inline-flex items-center gap-2 rounded-2xl bg-[image:var(--gradient-primary)] px-6 py-3 text-sm font-medium text-white shadow-[var(--shadow-glow)]"
        >
          <Search className="h-4 w-4" /> AI 유사 유실물 검색
        </button>
      </div>

      {shown && (
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {results.map((r) => (
            <button
              key={r.id}
              onClick={() => setDetail(r)}
              className="rounded-3xl border bg-card p-6 text-left shadow-[var(--shadow-soft)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]"
            >
              <div className="flex items-center justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                  <r.icon className="h-5 w-5" />
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${r.tone}`}>{r.status}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold">{r.item}</h3>
              <p className="mt-1 text-sm text-muted-foreground">발견 위치 · {r.station}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">접수 {r.receivedAt}</span>
                <span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-semibold text-primary">
                  유사도 {r.similarity}%
                </span>
              </div>
              <div className="mt-4 w-full rounded-xl border bg-white py-2 text-center text-sm font-medium">자세히 보기</div>
            </button>
          ))}
        </div>
      )}

      {detail && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4"
          onClick={() => setDetail(null)}
        >
          <div
            className="w-full max-w-lg rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary">
                  <detail.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{detail.item}</h3>
                  <p className="text-xs text-muted-foreground">접수번호 {detail.id}</p>
                </div>
              </div>
              <button onClick={() => setDetail(null)} className="rounded-full p-1.5 hover:bg-secondary">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-5 space-y-2.5 text-sm">
              <DetailRow icon={MapPin} k="발견역" v={detail.station} />
              <DetailRow icon={Package} k="보관 장소" v={detail.storage} />
              <DetailRow icon={Calendar} k="접수일" v={detail.receivedAt} />
            </div>
            <p className="mt-4 rounded-2xl bg-secondary p-4 text-sm text-muted-foreground">{detail.desc}</p>
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => setDetail(null)}
                className="flex-1 rounded-2xl border bg-white py-3 text-sm font-medium hover:bg-secondary"
              >
                닫기
              </button>
              <button className="flex-1 rounded-2xl bg-primary py-3 text-sm font-medium text-primary-foreground hover:opacity-90">
                내 물건이에요
              </button>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}

function DetailRow({ icon: Icon, k, v }: { icon: typeof MapPin; k: string; v: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border bg-white px-4 py-3">
      <Icon className="h-4 w-4 text-primary" />
      <span className="w-20 text-xs text-muted-foreground">{k}</span>
      <span className="text-sm font-medium">{v}</span>
    </div>
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