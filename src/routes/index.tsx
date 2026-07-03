import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Sparkles,
  Search,
  Train,
  Umbrella,
  MessageSquareText,
  ArrowRight,
  Clock,
  MapPin,
  Bell,
  Globe,
  Accessibility,
  FileText,
  CircleDot,
  Users,
  FileCheck2,
  Building2,
  ShieldAlert,
  AlertTriangle,
} from "lucide-react";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/")({
  component: Index,
});

const services = [
  { to: "/assistant", title: "AI Assistant", desc: "자연어로 물어보면 AI가 바로 해결해 드려요.", icon: Sparkles },
  { to: "/transit", title: "실시간 운행 안내", desc: "혼잡도·지연·추천 경로까지 한눈에.", icon: Train },
  { to: "/delay-certificate", title: "지연증명서 신청/조회", desc: "지연 내역 조회부터 증명서 발급까지.", icon: FileCheck2 },
  { to: "/lost-found", title: "유실물 찾기", desc: "AI가 유사한 유실물을 즉시 매칭합니다.", icon: Umbrella },
  { to: "/station-facilities", title: "역별 편의시설 검색", desc: "엘리베이터·화장실·수유실 위치 확인.", icon: Building2 },
  { to: "/complaint", title: "AI 민원 접수", desc: "말씀만 하시면 AI가 민원서를 작성합니다.", icon: MessageSquareText },
  { to: "/notice", title: "공지사항/안전알림", desc: "긴 공지도 3줄로 요약, 안전알림도 한곳에서.", icon: ShieldAlert },
  { to: "/assistant", title: "다국어 안내", desc: "한국어·English·日本語·中文 지원.", icon: Globe },
] as const;

const shortcuts = [
  { to: "/transit", icon: MapPin, label: "지하철 노선도" },
  { to: "/assistant", icon: Globe, label: "외국인 안내" },
  { to: "/my-metro", icon: Bell, label: "맞춤 알림" },
  { to: "/assistant", icon: Accessibility, label: "교통약자 지원" },
] as const;

const recommendedQuestions = [
  "강남역 막차 알려줘",
  "유실물 신고하기",
  "2호선 운행상황",
  "엘리베이터 있는 역",
  "민원 접수하기",
] as const;

const notices: {
  tag: "안전" | "운행" | "혼잡" | "시설";
  level: "긴급" | "중요" | "일반";
  date: string;
  title: string;
  summary: string;
}[] = [
  { tag: "안전", level: "긴급", date: "2026.07.03", title: "여름철 집중호우 대비 안전 안내", summary: "역사 침수 예방 조치 강화. 우천 시 우회 경로 안내. 이용객 대피 경로 사전 확인 권고." },
  { tag: "운행", level: "중요", date: "2026.07.03", title: "2호선 강남~잠실 구간 심야 점검", summary: "심야 시간대 일부 열차 지연 예상. 대체 노선 및 버스 연계 안내 제공. 승강장 안내방송 강화." },
  { tag: "혼잡", level: "일반", date: "2026.07.02", title: "출근 시간대 주요 환승역 혼잡 안내", summary: "사당·잠실·고속터미널 혼잡도 상승. 열차 간격 임시 조정. 대체 출입구 이용 권장." },
  { tag: "시설", level: "중요", date: "2026.07.02", title: "종로3가역 엘리베이터 임시 운영 중단", summary: "노후 부품 교체 작업 진행. 대체 이동 경로 안내. 교통약자 도우미 인력 배치." },
];

const levelTone: Record<string, string> = {
  긴급: "bg-red-100 text-red-700",
  중요: "bg-amber-100 text-amber-700",
  일반: "bg-secondary text-foreground/70",
};

function Index() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const { t } = useLanguage();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/assistant", search: { q } as never });
  };

  const askQuestion = (question: string) => {
    navigate({ to: "/assistant", search: { q: question } as never });
  };

  return (
    <main>
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex animate-fade-in items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Seoul Metro · AI Service
            </span>
            <h1 className="mt-6 animate-fade-in [animation-delay:80ms] [animation-fill-mode:backwards]">
              <span className="block text-2xl font-medium tracking-tight text-muted-foreground sm:text-3xl">
                안녕하세요.
              </span>
              <span className="mt-2 block text-4xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
                무엇을 <span className="text-gradient">도와드릴까요?</span>
              </span>
            </h1>
            <p className="mt-5 animate-fade-in text-base leading-relaxed tracking-tight text-muted-foreground [animation-delay:160ms] [animation-fill-mode:backwards] sm:text-xl">
              운행정보, 유실물, 민원, 공지사항까지
              <br className="hidden sm:block" />
              <span className="sm:ml-1">AI에게 자연스럽게 질문해보세요.</span>
            </p>

            <form
              onSubmit={submit}
              className="glass-card mx-auto mt-10 flex max-w-2xl animate-fade-in items-center gap-2 rounded-2xl p-3 [animation-delay:240ms] [animation-fill-mode:backwards]"
            >
              <Search className="ml-3 h-5 w-5 shrink-0 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="예) 강남역 막차 시간 알려줘"
                className="min-w-0 flex-1 bg-transparent px-2 py-3.5 text-sm outline-none sm:text-base"
              />
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-[image:var(--gradient-primary)] px-5 py-3 text-sm font-medium text-white shadow-[var(--shadow-glow)] transition hover:opacity-90"
              >
                {t("askAI")}
              </button>
            </form>

            {/* Recommended questions */}
            <div className="mx-auto mt-6 max-w-2xl animate-fade-in [animation-delay:320ms] [animation-fill-mode:backwards]">
              <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex w-max gap-2 pb-1">
                  {recommendedQuestions.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => askQuestion(question)}
                      className="shrink-0 rounded-full border bg-white/70 px-4 py-2 text-xs font-medium text-foreground/80 backdrop-blur transition hover:border-primary/40 hover:bg-white hover:text-primary sm:text-sm"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live status card */}
            <div className="mx-auto mt-8 max-w-2xl animate-fade-in [animation-delay:400ms] [animation-fill-mode:backwards]">
              <div className="glass-card rounded-2xl p-5 text-left">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    오늘의 운행현황
                  </p>
                  <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Clock className="h-3 w-3" /> 실시간
                  </span>
                </div>
                <ul className="mt-3 space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CircleDot className="h-3.5 w-3.5 text-emerald-500" />
                    <span>대부분 노선 정상 운행</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CircleDot className="h-3.5 w-3.5 text-amber-500" />
                    <span>2호선 일부 구간 약 3분 지연</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-3.5 w-3.5 text-primary" />
                    <span>주요 환승역 혼잡도 보통</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core service cards */}
      <section className="mx-auto mt-10 max-w-6xl px-4 sm:mt-16 sm:px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <Link
              key={s.title}
              to={s.to}
              className="group relative overflow-hidden rounded-3xl border bg-card p-6 shadow-[var(--shadow-soft)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]"
            >
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[image:var(--gradient-primary)] text-white">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              <div className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
                바로가기 <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Shortcuts */}
      <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">시민 맞춤형 바로가기</h2>
          <Link to="/my-metro" className="text-sm text-primary hover:underline">My Metro →</Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {shortcuts.map((s) => (
            <Link
              key={s.label}
              to={s.to}
              className="glass-card flex flex-col items-start gap-3 rounded-2xl p-5 transition hover:-translate-y-0.5"
            >
              <s.icon className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">{s.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Notices with AI summary */}
      <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">공지사항 · 안전알림</h2>
            <p className="mt-1 text-sm text-muted-foreground">긴 공지도 AI가 3줄로 요약. 중요도와 함께 한눈에.</p>
          </div>
          <Link to="/notice" className="text-sm text-primary hover:underline">전체보기 →</Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {notices.map((n) => (
            <article key={n.title} className="rounded-3xl border bg-card p-6 shadow-[var(--shadow-soft)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary">{n.tag}</span>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${levelTone[n.level]}`}>
                    {n.level === "긴급" && <AlertTriangle className="h-2.5 w-2.5" />}
                    {n.level}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" /> {n.date}</span>
              </div>
              <h3 className="mt-4 text-base font-semibold leading-snug">{n.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-4">{n.summary}</p>
              <Link to="/notice" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                <FileText className="h-4 w-4" /> 자세히 보기
              </Link>
            </article>
          ))}
        </div>
      </section>

    </main>
  );
}
