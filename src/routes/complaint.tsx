import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { useLanguage } from "@/lib/language";
import { toast } from "sonner";

const TYPES = ["운행 지연", "역사 시설", "직원 응대", "안전 신고", "기타"] as const;
type ComplaintType = (typeof TYPES)[number];

export const Route = createFileRoute("/complaint")({ component: ComplaintPage });

function ComplaintPage() {
  const [type, setType] = useState<ComplaintType>("역사 시설");
  const [text, setText] = useState("어제 저녁 7시경 2호선 강남역 승강장 에스컬레이터가 멈춰 있어서 큰 짐을 든 어르신이 이용에 어려움을 겪었습니다.");
  const [draft, setDraft] = useState<null | { title: string; category: string; dept: string; summary: string }>(null);
  const [submitted, setSubmitted] = useState(false);

  const generate = () => {
    setSubmitted(false);
    setDraft({
      title: "강남역 에스컬레이터 운영 중단 관련 개선 요청",
      category: `${type} · 편의시설`,
      dept: "강남관리역 시설관리팀",
      summary: "2호선 강남역 승강장 에스컬레이터 미운영으로 교통약자의 이동 불편이 발생함. 신속한 점검 및 임시 안내 표지 설치를 요청합니다.",
    });
  };

  const submit = () => {
    setSubmitted(true);
    toast.success("민원이 접수되었습니다", {
      description: "접수번호 SM-2026-070312 · 3영업일 이내 회신드립니다.",
    });
  };

  const { t } = useLanguage();

  return (
    <PageShell eyebrow={t("pComplaintEyebrow")} title={t("pComplaintTitle")} subtitle={t("pComplaintSub")}>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="glass-card rounded-3xl p-5">
          <label className="text-xs font-medium text-muted-foreground">민원 유형</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={
                  "rounded-full border px-3.5 py-1.5 text-xs font-medium transition " +
                  (type === t
                    ? "border-primary bg-primary text-primary-foreground"
                    : "bg-white text-foreground/80 hover:border-primary/40 hover:text-primary")
                }
              >
                {t}
              </button>
            ))}
          </div>
          <label className="mt-5 block text-xs font-medium text-muted-foreground">불편사항</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            className="mt-2 w-full resize-none rounded-2xl border bg-white p-4 text-sm outline-none"
          />
          <button
            onClick={generate}
            className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-[image:var(--gradient-primary)] px-5 py-3 text-sm font-medium text-white shadow-[var(--shadow-glow)]"
          >
            <Sparkles className="h-4 w-4" /> AI가 민원 초안 작성
          </button>
        </div>

        <div className="rounded-3xl border bg-card p-6 shadow-[var(--shadow-soft)]">
          {!draft && !submitted && (
            <p className="text-sm text-muted-foreground">왼쪽에 상황을 입력하고 버튼을 누르면 여기에 AI 초안이 생성됩니다.</p>
          )}
          {draft && !submitted && (
            <div className="space-y-4 text-sm">
              <Row k="민원 제목" v={draft.title} />
              <Row k="민원 분류" v={draft.category} />
              <Row k="담당 부서" v={draft.dept} />
              <Row k="요약 내용" v={draft.summary} />
              <button
                onClick={submit}
                className="mt-2 w-full rounded-2xl bg-primary py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                접수하기
              </button>
            </div>
          )}
          {submitted && (
            <div className="flex h-full flex-col items-center justify-center py-6 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">민원이 접수되었습니다</h3>
              <p className="mt-2 text-sm text-muted-foreground">접수번호 <b>SM-2026-070312</b> · 담당 부서에서 3영업일 이내 회신드립니다.</p>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-2xl bg-secondary p-4">
      <p className="text-xs font-medium text-muted-foreground">{k}</p>
      <p className="mt-1 text-foreground">{v}</p>
    </div>
  );
}