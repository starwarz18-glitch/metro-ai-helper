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
import { useLanguage, type TKey } from "@/lib/language";

export const Route = createFileRoute("/")({
  component: Index,
});

const services: { to: string; titleKey: TKey; descKey: TKey; icon: typeof Sparkles }[] = [
  { to: "/assistant", titleKey: "svc1Title", descKey: "svc1Desc", icon: Sparkles },
  { to: "/transit", titleKey: "svc2Title", descKey: "svc2Desc", icon: Train },
  { to: "/delay-certificate", titleKey: "svc3Title", descKey: "svc3Desc", icon: FileCheck2 },
  { to: "/lost-found", titleKey: "svc4Title", descKey: "svc4Desc", icon: Umbrella },
  { to: "/station-facilities", titleKey: "svc5Title", descKey: "svc5Desc", icon: Building2 },
  { to: "/complaint", titleKey: "svc6Title", descKey: "svc6Desc", icon: MessageSquareText },
  { to: "/notice", titleKey: "svc7Title", descKey: "svc7Desc", icon: ShieldAlert },
  { to: "/assistant", titleKey: "svc8Title", descKey: "svc8Desc", icon: Globe },
];

const shortcuts: { to: string; icon: typeof MapPin; labelKey: TKey }[] = [
  { to: "/transit", icon: MapPin, labelKey: "shortcut1" },
  { to: "/assistant", icon: Globe, labelKey: "shortcut2" },
  { to: "/my-metro", icon: Bell, labelKey: "shortcut3" },
  { to: "/assistant", icon: Accessibility, labelKey: "shortcut4" },
];

const recommendedKeys: TKey[] = ["reco1", "reco2", "reco3", "reco4", "reco5"];

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
              <Sparkles className="h-3.5 w-3.5" /> {t("heroBadge")}
            </span>
            <h1 className="mt-6 animate-fade-in [animation-delay:80ms] [animation-fill-mode:backwards]">
              <span className="block text-2xl font-medium tracking-tight text-muted-foreground sm:text-3xl">
                {t("greetingHi")}
              </span>
              <span className="mt-2 block text-4xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
                <span className="text-gradient">{t("greetingHelp")}</span>
              </span>
            </h1>
            <p className="mt-5 animate-fade-in text-base leading-relaxed tracking-tight text-muted-foreground [animation-delay:160ms] [animation-fill-mode:backwards] sm:text-xl">
              {t("heroSubtitleA")}
              <br className="hidden sm:block" />
              <span className="sm:ml-1">{t("heroSubtitleB")}</span>
            </p>

            <form
              onSubmit={submit}
              className="glass-card mx-auto mt-10 flex max-w-2xl animate-fade-in items-center gap-2 rounded-2xl p-3 [animation-delay:240ms] [animation-fill-mode:backwards]"
            >
              <Search className="ml-3 h-5 w-5 shrink-0 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t("searchPlaceholder")}
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
                  {recommendedKeys.map((k) => {
                    const question = t(k);
                    return (
                    <button
                      key={k}
                      type="button"
                      onClick={() => askQuestion(question)}
                      className="shrink-0 rounded-full border bg-white/70 px-4 py-2 text-xs font-medium text-foreground/80 backdrop-blur transition hover:border-primary/40 hover:bg-white hover:text-primary sm:text-sm"
                    >
                      {question}
                    </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Live status card */}
            <div className="mx-auto mt-8 max-w-2xl animate-fade-in [animation-delay:400ms] [animation-fill-mode:backwards]">
              <div className="glass-card rounded-2xl p-5 text-left">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {t("statusTitle")}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Clock className="h-3 w-3" /> {t("statusLive")}
                  </span>
                </div>
                <ul className="mt-3 space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CircleDot className="h-3.5 w-3.5 text-emerald-500" />
                    <span>{t("statusNormal")}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CircleDot className="h-3.5 w-3.5 text-amber-500" />
                    <span>{t("statusDelay")}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-3.5 w-3.5 text-primary" />
                    <span>{t("statusCrowd")}</span>
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
              key={s.titleKey}
              to={s.to}
              className="group relative overflow-hidden rounded-3xl border bg-card p-6 shadow-[var(--shadow-soft)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]"
            >
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[image:var(--gradient-primary)] text-white">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{t(s.titleKey)}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t(s.descKey)}</p>
              <div className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
                {t("goto")} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Shortcuts */}
      <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{t("shortcutsTitle")}</h2>
          <Link to="/my-metro" className="text-sm text-primary hover:underline">My Metro →</Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {shortcuts.map((s) => (
            <Link
              key={s.labelKey}
              to={s.to}
              className="glass-card flex flex-col items-start gap-3 rounded-2xl p-5 transition hover:-translate-y-0.5"
            >
              <s.icon className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">{t(s.labelKey)}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Notices with AI summary */}
      <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{t("noticeTitle")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t("noticeSub")}</p>
          </div>
          <Link to="/notice" className="text-sm text-primary hover:underline">{t("viewAll")} →</Link>
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
                <FileText className="h-4 w-4" /> {t("viewDetail")}
              </Link>
            </article>
          ))}
        </div>
      </section>

    </main>
  );
}
