import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/notice")({ component: NoticePage });

const items = [
  {
    tag: "안전", tone: "bg-rose-100 text-rose-700",
    title: "여름철 집중호우 대비 안전 이용 안내",
    body: "서울교통공사는 여름철 집중호우 및 태풍 시기에 대비하여 지하철 이용 시민의 안전을 위한 종합 대책을 시행합니다. 지하 역사 침수 예방을 위해 배수 시설을 사전 점검하고, 침수 취약 구간에 방수판 및 이동식 펌프를 배치합니다. 우천 시 미끄러움 방지 매트를 확대 설치하며, 이용객 대피 경로 및 임시 대피 장소를 사전 공지합니다.",
    summary: ["① 침수 취약 구간 방수판·펌프 사전 배치.", "② 미끄럼 방지 매트 및 안전 안내 강화.", "③ 대피 경로·임시 장소 사전 공지."],
  },
  {
    tag: "운행", tone: "bg-blue-100 text-blue-700",
    title: "2호선 강남~잠실 심야 궤도 점검 안내",
    body: "안전 운행을 위해 심야 시간대 궤도 점검을 실시합니다. 이에 따라 해당 구간의 막차 시간이 15분 앞당겨지며, 심야 이용 시민을 위한 대체 셔틀버스가 운행됩니다. 점검 기간은 4일간이며, 이용에 참고 부탁드립니다.",
    summary: ["① 강남~잠실 심야 궤도 점검 시행.", "② 막차 15분 조기 종료.", "③ 대체 셔틀 4일간 임시 운행."],
  },
  {
    tag: "채용", tone: "bg-violet-100 text-violet-700",
    title: "2026년 하반기 사회형평 채용 공고",
    body: "서울교통공사는 2026년 하반기 신입·경력 공채를 진행합니다. 온라인 접수만 가능하며, 사회형평 전형을 별도 운영합니다. 지원 자격, 우대사항, 전형 일정은 채용 홈페이지에서 확인할 수 있습니다.",
    summary: ["① 신입·경력 공채 온라인 접수.", "② 사회형평 전형 별도 운영.", "③ 온라인 채용설명회 개최."],
  },
  {
    tag: "고객 안내", tone: "bg-amber-100 text-amber-700",
    title: "모바일 승차권 개편 및 다국어 서비스 확대",
    body: "모바일 승차권 UI가 개편되고, 영어·중국어·일본어에 이어 베트남어와 태국어 안내가 추가됩니다. 외국인 관광객의 편의 향상을 위해 QR 결제 안내와 환승 도움말도 강화됩니다.",
    summary: ["① 모바일 승차권 UI 개편.", "② 다국어 안내 5개 언어로 확대.", "③ QR 결제·환승 도움말 강화."],
  },
];

function NoticePage() {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const { t } = useLanguage();

  return (
    <PageShell eyebrow={t("pNoticeEyebrow")} title={t("pNoticeTitle")} subtitle={t("pNoticeSub")}>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {items.map((n, i) => (
          <article key={n.title} className="rounded-3xl border bg-card p-6 shadow-[var(--shadow-soft)]">
            <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${n.tone}`}>{n.tag}</span>
            <h3 className="mt-3 text-lg font-semibold leading-snug">{n.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{n.body}</p>
            <button
              onClick={() => setOpen((s) => ({ ...s, [i]: !s[i] }))}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1.5 text-xs font-medium text-primary"
            >
              <Sparkles className="h-3.5 w-3.5" /> AI 3줄 요약
            </button>
            {open[i] && (
              <ul className="mt-4 space-y-1.5 rounded-2xl bg-secondary p-4 text-sm">
                {n.summary.map((s) => <li key={s}>{s}</li>)}
              </ul>
            )}
          </article>
        ))}
      </div>
    </PageShell>
  );
}