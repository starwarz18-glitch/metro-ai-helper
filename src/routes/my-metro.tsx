import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Bookmark, History, MapPin, TrainTrack, Umbrella } from "lucide-react";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/my-metro")({ component: MyMetroPage });

function MyMetroPage() {
  return (
    <PageShell eyebrow="My Metro" title="당신의 지하철, 개인 맞춤 대시보드" subtitle="자주 이용하는 노선과 관심 역, 알림을 한 곳에서 관리하세요.">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card icon={TrainTrack} title="자주 이용하는 노선">
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            <Tag>2호선</Tag><Tag>9호선</Tag><Tag>신분당선</Tag>
          </div>
        </Card>
        <Card icon={MapPin} title="관심역">
          <div className="mt-3 space-y-2 text-sm">
            <Row s="강남역" hint="혼잡도 보통" />
            <Row s="시청역" hint="정상 운행" />
            <Row s="잠실역" hint="지연 2분" />
          </div>
        </Card>
        <Card icon={History} title="최근 문의">
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>· 강남역 우산 유실 문의</li>
            <li>· 심야 셔틀 시간 안내</li>
            <li>· 외국인 결제 방법</li>
          </ul>
        </Card>
        <Card icon={Bell} title="맞춤 알림">
          <ul className="mt-3 space-y-2 text-sm">
            <li className="rounded-xl bg-secondary px-3 py-2">🚇 2호선 강남~잠실 2분 지연</li>
            <li className="rounded-xl bg-secondary px-3 py-2">☔ 오늘 저녁 호우 예보 · 우산 챙기세요</li>
          </ul>
        </Card>
        <Card icon={Umbrella} title="저장된 유실물 조회">
          <div className="mt-3 rounded-2xl border bg-white p-3 text-sm">
            <p className="font-medium">검은색 장우산</p>
            <p className="text-muted-foreground">강남역 보관중 · 접수 07/02</p>
            <Link to="/lost-found" className="mt-2 inline-block text-xs font-medium text-primary">유실물 페이지에서 확인 →</Link>
          </div>
        </Card>
        <Card icon={Bookmark} title="바로가기">
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <Link to="/assistant" className="rounded-xl bg-secondary px-3 py-2 hover:bg-primary-soft">AI Assistant</Link>
            <Link to="/transit" className="rounded-xl bg-secondary px-3 py-2 hover:bg-primary-soft">운행 안내</Link>
            <Link to="/complaint" className="rounded-xl bg-secondary px-3 py-2 hover:bg-primary-soft">민원 접수</Link>
            <Link to="/notice" className="rounded-xl bg-secondary px-3 py-2 hover:bg-primary-soft">공지 요약</Link>
          </div>
        </Card>
      </div>
    </PageShell>
  );
}

function Card({ icon: Icon, title, children }: { icon: React.ComponentType<{ className?: string }>; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border bg-card p-6 shadow-[var(--shadow-soft)]">
      <div className="flex items-center gap-2">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary-soft text-primary"><Icon className="h-4 w-4" /></div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
}
function Tag({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-primary-soft px-3 py-1 text-primary">{children}</span>;
}
function Row({ s, hint }: { s: string; hint: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-secondary px-3 py-2">
      <span className="font-medium">{s}</span>
      <span className="text-xs text-muted-foreground">{hint}</span>
    </div>
  );
}