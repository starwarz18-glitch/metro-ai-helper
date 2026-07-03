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
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const services = [
  { to: "/assistant", title: "AI Assistant", desc: "자연어로 물어보면 AI가 바로 해결해 드려요.", icon: Sparkles },
  { to: "/transit", title: "실시간 운행 안내", desc: "혼잡도·지연·추천 경로까지 한눈에.", icon: Train },
  { to: "/lost-found", title: "유실물 AI 검색", desc: "물건·역·날짜로 AI가 유사 항목을 찾아줘요.", icon: Umbrella },
  { to: "/complaint", title: "AI 민원 접수", desc: "말씀만 하시면 AI가 민원서를 작성합니다.", icon: MessageSquareText },
] as const;

const shortcuts = [
  { to: "/transit", icon: MapPin, label: "지하철 노선도" },
  { to: "/assistant", icon: Globe, label: "외국인 안내" },
  { to: "/my-metro", icon: Bell, label: "맞춤 알림" },
  { to: "/assistant", icon: Accessibility, label: "교통약자 지원" },
] as const;

const notices = [
  { tag: "안전", title: "여름철 집중호우 대비 안전 안내", summary: "역사 침수 예방 조치 강화, 우천 시 우회 안내, 이용객 대피 경로 사전 확인 권고." },
  { tag: "운행", title: "2호선 강남~잠실 구간 심야 점검", summary: "심야 시간대 일부 열차 지연 예상, 대체 노선 및 버스 연계 안내 제공." },
  { tag: "채용", title: "2026년 하반기 사회형평 채용", summary: "신입·경력 공채 접수 시작, 온라인 설명회 개최, 지원 자격 및 우대 사항 안내." },
];

function Index() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/assistant", search: { q } as never });
  };

  return (
    <main>
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Seoul Metro · AI Service
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
              서울교통공사 <span className="text-gradient">AI 서비스</span>
            </h1>
            <p className="mt-5 text-lg tracking-tight text-muted-foreground sm:text-2xl">
              AI가 더 빠르고 편리한 지하철 이용을 도와드립니다.
            </p>

            <form onSubmit={submit} className="glass-card mx-auto mt-10 flex max-w-2xl items-center gap-2 rounded-2xl p-2">
              <Search className="ml-3 h-5 w-5 shrink-0 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="무엇이든 물어보세요. 예) 강남역에서 우산을 잃어버렸어요"
                className="min-w-0 flex-1 bg-transparent px-2 py-2.5 text-sm outline-none sm:text-base"
              />
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-[image:var(--gradient-primary)] px-4 py-2.5 text-sm font-medium text-white shadow-[var(--shadow-glow)] transition hover:opacity-90"
              >
                AI에게 묻기
              </button>
            </form>
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
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">공지사항 AI 요약</h2>
            <p className="mt-1 text-sm text-muted-foreground">긴 공지도 3줄로 요약해서 보여드려요.</p>
          </div>
          <Link to="/notice" className="text-sm text-primary hover:underline">전체보기 →</Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {notices.map((n) => (
            <article key={n.title} className="rounded-3xl border bg-card p-6 shadow-[var(--shadow-soft)]">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary">{n.tag}</span>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" /> 오늘</span>
              </div>
              <h3 className="mt-4 text-base font-semibold leading-snug">{n.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{n.summary}</p>
              <Link to="/notice" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                <FileText className="h-4 w-4" /> AI 요약 보기
              </Link>
            </article>
          ))}
        </div>
      </section>

    </main>
  );
}
