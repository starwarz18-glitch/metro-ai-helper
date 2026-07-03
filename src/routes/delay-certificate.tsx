import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileCheck2, Search, Download, CheckCircle2, Clock, Train } from "lucide-react";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/delay-certificate")({ component: DelayPage });

function DelayPage() {
  const [date, setDate] = useState("2026-07-03");
  const [line, setLine] = useState("2호선");
  const [from, setFrom] = useState("강남");
  const [to, setTo] = useState("잠실");
  const [result, setResult] = useState<null | { minutes: number; issuedAt: string }>(null);
  const [issued, setIssued] = useState(false);

  const search = () => {
    setIssued(false);
    setResult({ minutes: 5, issuedAt: "07:42" });
  };

  return (
    <PageShell
      eyebrow="지연증명서 신청/조회"
      title="열차 지연, 몇 번의 클릭으로 증명"
      subtitle="열차 지연 내역을 조회하고 증명서를 즉시 확인할 수 있습니다."
    >
      <div className="glass-card grid grid-cols-1 gap-3 rounded-3xl p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-4">
        <Field label="날짜" value={date} onChange={setDate} type="date" />
        <Field label="호선" value={line} onChange={setLine} />
        <Field label="출발역" value={from} onChange={setFrom} />
        <Field label="도착역" value={to} onChange={setTo} />
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          onClick={search}
          className="inline-flex items-center gap-2 rounded-2xl bg-[image:var(--gradient-primary)] px-6 py-3 text-sm font-medium text-white shadow-[var(--shadow-glow)]"
        >
          <Search className="h-4 w-4" /> 지연 내역 조회
        </button>
        <button
          onClick={() => result && setIssued(true)}
          disabled={!result}
          className="inline-flex items-center gap-2 rounded-2xl border bg-white px-6 py-3 text-sm font-medium hover:bg-secondary disabled:opacity-50"
        >
          <FileCheck2 className="h-4 w-4" /> 증명서 발급 모형 보기
        </button>
      </div>

      {result && (
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-3xl border bg-card p-6 shadow-[var(--shadow-soft)]">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary">
                조회 결과
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" /> {result.issuedAt}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold">
              {date} · {line} · 약 {result.minutes}분 지연
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {from}역 → {to}역 구간에서 신호 장애로 열차 지연이 확인되었습니다. 증명서 발급이 가능합니다.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
              <CheckCircle2 className="h-3.5 w-3.5" /> 발급 가능
            </div>
          </div>

          {issued && (
            <div className="rounded-3xl border-2 border-primary/30 bg-white p-6 shadow-[var(--shadow-glow)]">
              <div className="flex items-center gap-2 text-primary">
                <Train className="h-5 w-5" />
                <span className="text-sm font-semibold">서울교통공사 지연증명서</span>
              </div>
              <h3 className="mt-4 text-xl font-bold tracking-tight">Delay Certificate</h3>
              <dl className="mt-4 space-y-2 text-sm">
                <Row k="발급일" v={date} />
                <Row k="노선" v={line} />
                <Row k="구간" v={`${from} → ${to}`} />
                <Row k="지연 시간" v={`약 ${result.minutes}분`} />
                <Row k="증명서 번호" v="SM-DL-2026-070312" />
              </dl>
              <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3 text-sm font-medium text-primary-foreground hover:opacity-90">
                <Download className="h-4 w-4" /> PDF 다운로드 (모형)
              </button>
            </div>
          )}
        </div>
      )}
    </PageShell>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="flex flex-col gap-1 rounded-2xl border bg-white px-4 py-3">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-sm outline-none"
      />
    </label>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between border-b border-dashed border-border/60 pb-1.5">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="font-medium">{v}</dd>
    </div>
  );
}
