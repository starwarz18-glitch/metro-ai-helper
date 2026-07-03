import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Sparkles, Send, ArrowRight, Bot, User } from "lucide-react";
import { PageShell } from "@/components/page-shell";

type SearchParams = { q?: string };

export const Route = createFileRoute("/assistant")({
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    q: typeof s.q === "string" ? s.q : undefined,
  }),
  component: AssistantPage,
});

type Msg = { role: "user" | "ai"; text: string; cta?: { label: string; to: string } };

const suggestions: { q: string; a: string; cta?: { label: string; to: string } }[] = [
  {
    q: "강남역에서 우산을 잃어버렸어요",
    a: "강남역 유실물 보관소에서 어제~오늘 접수된 우산 유실물 3건을 찾았습니다. 검은색 장우산이 보관중이며, 유실물 AI 검색에서 확인하실 수 있어요.",
    cta: { label: "유실물 AI 검색으로 이동", to: "/lost-found" },
  },
  {
    q: "오늘 2호선 지연 있나요?",
    a: "현재 2호선 내선순환은 정상 운행 중입니다. 강남~잠실 구간에 약 2분 지연이 있으며, 혼잡도는 '보통' 수준입니다.",
    cta: { label: "실시간 운행 안내 보기", to: "/transit" },
  },
  {
    q: "민원을 접수하고 싶어요",
    a: "AI가 민원 초안을 대신 작성해 드립니다. 불편하셨던 상황을 자연스럽게 말씀해 주세요.",
    cta: { label: "AI 민원 접수 열기", to: "/complaint" },
  },
  {
    q: "외국인 이용 안내가 필요해요",
    a: "English, 中文, 日本語 안내를 제공합니다. 목적지와 언어를 알려주시면 다국어 안내와 결제·환승 도움을 드릴 수 있어요.",
    cta: { label: "다국어 안내 보기", to: "/my-metro" },
  },
];

function AssistantPage() {
  const { q } = Route.useSearch();
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "안녕하세요, 서울교통공사 AI Assistant입니다. 무엇을 도와드릴까요?" },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  const ask = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      const match = suggestions.find((s) => s.q === text);
      const reply: Msg = match
        ? { role: "ai", text: match.a, cta: match.cta }
        : {
            role: "ai",
            text: `"${text}"에 대한 안내를 준비했어요. 관련 서비스로 이동하시면 더 자세한 정보를 확인하실 수 있어요.`,
            cta: { label: "홈으로", to: "/" },
          };
      setMessages((m) => [...m, reply]);
      setThinking(false);
    }, 700);
  };

  useEffect(() => {
    if (q) ask(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  return (
    <PageShell eyebrow="AI Assistant" title="무엇이든 물어보세요" subtitle="자연어로 대화하면 AI가 서울 지하철 이용을 도와드립니다.">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div className="glass-card flex min-h-[520px] flex-col rounded-3xl p-4 sm:p-6">
          <div className="flex-1 space-y-4 overflow-y-auto">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${m.role === "user" ? "bg-secondary" : "bg-[image:var(--gradient-primary)] text-white"}`}>
                  {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-white"}`}>
                  <p>{m.text}</p>
                  {m.cta && (
                    <Link to={m.cta.to} className="mt-3 inline-flex items-center gap-1 rounded-full bg-primary-soft px-3 py-1.5 text-xs font-medium text-primary">
                      {m.cta.label} <ArrowRight className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
            {thinking && (
              <div className="flex gap-3">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-[image:var(--gradient-primary)] text-white"><Bot className="h-4 w-4" /></div>
                <div className="rounded-2xl bg-white px-4 py-3 text-sm text-muted-foreground">AI가 답변을 준비 중…</div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); ask(input); }}
            className="mt-4 flex items-center gap-2 rounded-2xl border bg-white p-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="질문을 입력하세요"
              className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none"
            />
            <button type="submit" className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-white">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>

        <aside className="space-y-3">
          <p className="flex items-center gap-2 px-1 text-sm font-medium text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" /> 예시 질문
          </p>
          {suggestions.map((s) => (
            <button
              key={s.q}
              onClick={() => ask(s.q)}
              className="w-full rounded-2xl border bg-card p-4 text-left text-sm shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:border-primary/40"
            >
              “{s.q}”
            </button>
          ))}
        </aside>
      </div>
    </PageShell>
  );
}