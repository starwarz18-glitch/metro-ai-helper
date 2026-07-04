import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "ko" | "en" | "ja" | "zh";

export const LANGS: { code: Lang; label: string }[] = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
  { code: "zh", label: "中文" },
];

type Dict = Record<Lang, string>;

export const T = {
  // Brand / nav
  brand: { ko: "AI 서비스", en: "AI Service", ja: "AIサービス", zh: "AI服务" },
  brandFull: { ko: "서울교통공사 AI 서비스", en: "Seoul Metro AI Service", ja: "ソウル交通公社 AIサービス", zh: "首尔交通公社 AI服务" },
  navHome: { ko: "홈", en: "Home", ja: "ホーム", zh: "首页" },
  navAssistant: { ko: "AI 어시스턴트", en: "AI Assistant", ja: "AIアシスタント", zh: "AI助手" },
  navTransit: { ko: "운행 안내", en: "Train Status", ja: "運行案内", zh: "运行信息" },
  navLostFound: { ko: "유실물", en: "Lost & Found", ja: "忘れ物", zh: "失物招领" },
  navComplaint: { ko: "민원 접수", en: "Complaints", ja: "苦情申請", zh: "投诉受理" },
  navNotice: { ko: "공지 요약", en: "Notices", ja: "お知らせ", zh: "公告" },
  navMy: { ko: "My Metro", en: "My Metro", ja: "My Metro", zh: "My Metro" },

  // Hero
  heroBadge: { ko: "Seoul Metro · AI Service", en: "Seoul Metro · AI Service", ja: "Seoul Metro · AI Service", zh: "Seoul Metro · AI Service" },
  greetingHi: { ko: "안녕하세요.", en: "Hello.", ja: "こんにちは。", zh: "您好。" },
  greetingHelp: { ko: "무엇을 도와드릴까요?", en: "How can we help you?", ja: "何をお手伝いしましょうか？", zh: "有什么可以帮您？" },
  heroSubtitleA: { ko: "운행정보, 유실물, 민원, 공지사항까지", en: "Ask AI about train operations, lost items,", ja: "運行情報、忘れ物、苦情、お知らせまで", zh: "您可以向 AI 咨询运行信息、失物招领、" },
  heroSubtitleB: { ko: "AI에게 자연스럽게 질문해보세요.", en: "complaints, and notices.", ja: "AIに気軽に質問できます。", zh: "投诉和公告。" },

  // Search
  searchPlaceholder: {
    ko: "예) 강남역 막차 시간 알려줘",
    en: "e.g. Tell me the last train time at Gangnam Station",
    ja: "例）江南駅の終電時間を教えてください",
    zh: "例如：请告诉我江南站的末班车时间",
  },
  askAI: { ko: "AI에게 묻기", en: "Ask AI", ja: "AIに質問", zh: "询问 AI" },

  // Recommended questions (5)
  reco1: { ko: "강남역 막차 알려줘", en: "Last train at Gangnam Station", ja: "江南駅の終電を確認", zh: "查询江南站末班车" },
  reco2: { ko: "유실물 신고하기", en: "Report a lost item", ja: "忘れ物を届け出る", zh: "登记失物" },
  reco3: { ko: "2호선 운행상황", en: "Line 2 operation status", ja: "2号線の運行状況", zh: "2号线运行情况" },
  reco4: { ko: "엘리베이터 있는 역", en: "Stations with elevators", ja: "エレベーターのある駅", zh: "有电梯的车站" },
  reco5: { ko: "민원 접수하기", en: "Submit a complaint", ja: "苦情を申請する", zh: "提交投诉" },

  // Status card
  statusTitle: { ko: "오늘의 운행현황", en: "Today's Operation Status", ja: "本日の運行状況", zh: "今日运行状态" },
  statusLive: { ko: "실시간", en: "Live", ja: "リアルタイム", zh: "实时" },
  statusNormal: { ko: "대부분 노선 정상 운행", en: "Most lines are operating normally", ja: "ほとんどの路線は通常運行中", zh: "大部分线路正常运行" },
  statusDelay: { ko: "2호선 일부 구간 약 3분 지연", en: "Some sections of Line 2 delayed by ~3 min", ja: "2号線の一部区間で約3分遅延", zh: "2号线部分区间约延误3分钟" },
  statusCrowd: { ko: "주요 환승역 혼잡도 보통", en: "Major transfer stations moderately crowded", ja: "主要乗換駅の混雑度は普通", zh: "主要换乘站拥挤程度为普通" },

  // Service cards (8)
  svc1Title: { ko: "AI Assistant", en: "AI Assistant", ja: "AIアシスタント", zh: "AI 助手" },
  svc1Desc: { ko: "자연어로 물어보면 AI가 바로 해결해 드려요.", en: "Ask in natural language — AI answers instantly.", ja: "自然言語で質問すればAIが即回答します。", zh: "用自然语言提问，AI 即时解答。" },
  svc2Title: { ko: "실시간 운행 안내", en: "Real-time Train Status", ja: "リアルタイム運行案内", zh: "实时运行信息" },
  svc2Desc: { ko: "혼잡도·지연·추천 경로까지 한눈에.", en: "Crowding, delays, and recommended routes at a glance.", ja: "混雑・遅延・おすすめ経路を一目で。", zh: "拥挤度、延误与推荐路线一目了然。" },
  svc3Title: { ko: "지연증명서 신청/조회", en: "Delay Certificate", ja: "遅延証明書申請", zh: "延误证明申请" },
  svc3Desc: { ko: "지연 내역 조회부터 증명서 발급까지.", en: "Check delays and issue a certificate.", ja: "遅延履歴の確認から証明書発行まで。", zh: "从查询延误到开具证明。" },
  svc4Title: { ko: "유실물 찾기", en: "Lost & Found", ja: "忘れ物検索", zh: "失物招领" },
  svc4Desc: { ko: "AI가 유사한 유실물을 즉시 매칭합니다.", en: "AI instantly matches similar lost items.", ja: "AIが類似する忘れ物を即座にマッチング。", zh: "AI 即时匹配相似失物。" },
  svc5Title: { ko: "역별 편의시설 검색", en: "Station Facilities", ja: "駅別施設検索", zh: "车站设施查询" },
  svc5Desc: { ko: "엘리베이터·화장실·수유실 위치 확인.", en: "Find elevators, restrooms, and nursing rooms.", ja: "エレベーター・トイレ・授乳室の位置確認。", zh: "查询电梯、洗手间、母婴室位置。" },
  svc6Title: { ko: "AI 민원 접수", en: "AI Complaints", ja: "AI苦情申請", zh: "AI 投诉受理" },
  svc6Desc: { ko: "말씀만 하시면 AI가 민원서를 작성합니다.", en: "Just describe it — AI drafts the complaint.", ja: "話すだけでAIが苦情文を作成します。", zh: "只要描述，AI 就会自动撰写投诉。" },
  svc7Title: { ko: "공지사항/안전알림", en: "Notices & Safety Alerts", ja: "お知らせ／安全通知", zh: "公告与安全提醒" },
  svc7Desc: { ko: "긴 공지도 3줄로 요약, 안전알림도 한곳에서.", en: "Long notices summarized in 3 lines.", ja: "長いお知らせも3行に要約。", zh: "长公告 AI 3 行摘要。" },
  svc8Title: { ko: "다국어 안내", en: "Multi-language Support", ja: "多言語案内", zh: "多语言服务" },
  svc8Desc: { ko: "한국어·English·日本語·中文 지원.", en: "Korean, English, Japanese, Chinese supported.", ja: "韓国語・英語・日本語・中国語対応。", zh: "支持韩语、英语、日语、中文。" },
  goto: { ko: "바로가기", en: "Open", ja: "移動", zh: "前往" },

  // Shortcuts
  shortcutsTitle: { ko: "시민 맞춤형 바로가기", en: "Quick Shortcuts", ja: "市民向けショートカット", zh: "市民快捷入口" },
  shortcut1: { ko: "지하철 노선도", en: "Subway Map", ja: "路線図", zh: "地铁线路图" },
  shortcut2: { ko: "외국인 안내", en: "Foreigner Guide", ja: "外国人案内", zh: "外国人指南" },
  shortcut3: { ko: "맞춤 알림", en: "Custom Alerts", ja: "カスタム通知", zh: "个性化提醒" },
  shortcut4: { ko: "교통약자 지원", en: "Accessibility Support", ja: "交通弱者支援", zh: "无障碍支援" },

  // Notice section
  noticeTitle: { ko: "공지사항 · 안전알림", en: "Notices & Safety Alerts", ja: "お知らせ・安全通知", zh: "公告与安全提醒" },
  noticeSub: { ko: "긴 공지도 AI가 3줄로 요약. 중요도와 함께 한눈에.", en: "AI summarizes long notices in 3 lines with priority.", ja: "長文もAIが3行要約。重要度と共に一目で。", zh: "AI 将长公告 3 行摘要，含重要度一目了然。" },
  viewAll: { ko: "전체보기", en: "View all", ja: "すべて見る", zh: "查看全部" },
  viewDetail: { ko: "자세히 보기", en: "View details", ja: "詳細を見る", zh: "查看详情" },

  // Footer
  footerTagline: { ko: "시민을 위한 AI 기반 디지털 서비스", en: "AI-powered digital services for citizens", ja: "市民のためのAIデジタルサービス", zh: "为市民打造的 AI 数字服务" },
  footerPrivacy: { ko: "개인정보처리방침", en: "Privacy Policy", ja: "プライバシーポリシー", zh: "隐私政策" },
  footerTerms: { ko: "이용약관", en: "Terms of Use", ja: "利用規約", zh: "使用条款" },
  footerSupport: { ko: "고객센터", en: "Customer Support", ja: "お客様センター", zh: "客服中心" },
  footerHomepage: { ko: "서울교통공사 홈페이지", en: "Seoul Metro Website", ja: "ソウル交通公社サイト", zh: "首尔交通公社官网" },
  footerRights: { ko: "© 2026 Seoul Metro AI Service. All Rights Reserved.", en: "© 2026 Seoul Metro AI Service. All Rights Reserved.", ja: "© 2026 Seoul Metro AI Service. All Rights Reserved.", zh: "© 2026 Seoul Metro AI Service. All Rights Reserved." },

  // PageShell eyebrows / titles / subtitles
  pAssistantEyebrow: { ko: "AI Assistant", en: "AI Assistant", ja: "AIアシスタント", zh: "AI 助手" },
  pAssistantTitle: { ko: "무엇이든 물어보세요", en: "Ask anything", ja: "何でも聞いてください", zh: "尽管提问" },
  pAssistantSub: { ko: "자연어로 대화하면 AI가 서울 지하철 이용을 도와드립니다.", en: "Chat naturally and AI will help you use Seoul Metro.", ja: "自然な会話でAIがソウル地下鉄利用をサポートします。", zh: "自然对话，AI 助您使用首尔地铁。" },

  pTransitEyebrow: { ko: "실시간 운행 안내", en: "Real-time Status", ja: "リアルタイム運行案内", zh: "实时运行信息" },
  pTransitTitle: { ko: "지금 가장 편한 길을 알려드려요", en: "The most comfortable route right now", ja: "今もっとも快適な経路をご案内", zh: "为您推荐最舒适的路线" },
  pTransitSub: { ko: "혼잡도와 지연을 반영해 AI가 최적 경로를 추천합니다.", en: "AI recommends optimal routes based on crowding and delays.", ja: "混雑と遅延を反映しAIが最適経路を提案。", zh: "AI 根据拥挤度和延误推荐最佳路线。" },

  pLostEyebrow: { ko: "유실물 AI 검색", en: "Lost & Found AI Search", ja: "忘れ物AI検索", zh: "失物 AI 检索" },
  pLostTitle: { ko: "잃어버린 물건, AI가 찾아드립니다", en: "AI helps you find lost items", ja: "忘れ物をAIがお探しします", zh: "AI 帮您找回失物" },
  pLostSub: { ko: "물건·역·날짜를 입력하면 유사한 유실물을 즉시 매칭해요.", en: "Enter item, station, and date to match similar lost items instantly.", ja: "品物・駅・日付を入力すると類似の忘れ物を即マッチング。", zh: "输入物品、车站和日期即可即时匹配相似失物。" },

  pComplaintEyebrow: { ko: "AI 민원 접수", en: "AI Complaints", ja: "AI苦情申請", zh: "AI 投诉受理" },
  pComplaintTitle: { ko: "말씀만 하시면 AI가 대신 씁니다", en: "Just tell us — AI writes it for you", ja: "話すだけでAIが代筆します", zh: "只需描述，AI 为您撰写" },
  pComplaintSub: { ko: "상황을 편하게 입력하면 민원 제목·분류·담당부서·요약을 자동 생성합니다.", en: "Describe the situation and AI generates the title, category, department, and summary.", ja: "状況を入力すればタイトル・分類・部署・要約を自動生成。", zh: "描述情况，AI 自动生成标题、分类、部门与摘要。" },

  pNoticeEyebrow: { ko: "공지사항 AI 요약", en: "AI Notice Summary", ja: "お知らせAI要約", zh: "公告 AI 摘要" },
  pNoticeTitle: { ko: "긴 공지도 3줄로 요약", en: "Long notices in 3 lines", ja: "長いお知らせも3行に要約", zh: "长公告 3 行摘要" },
  pNoticeSub: { ko: "AI가 핵심만 뽑아 시민이 빠르게 이해할 수 있도록 정리합니다.", en: "AI extracts the essentials for quick understanding.", ja: "AIが要点を抽出し市民が素早く理解できます。", zh: "AI 提取要点，帮市民快速理解。" },

  pMyEyebrow: { ko: "My Metro", en: "My Metro", ja: "My Metro", zh: "My Metro" },
  pMyTitle: { ko: "당신의 지하철, 개인 맞춤 대시보드", en: "Your Metro, personalized dashboard", ja: "あなたの地下鉄、パーソナルダッシュボード", zh: "您的地铁个性化仪表盘" },
  pMySub: { ko: "자주 이용하는 노선과 관심 역, 알림을 한 곳에서 관리하세요.", en: "Manage frequently used lines, favorite stations, and alerts in one place.", ja: "よく使う路線・お気に入り駅・通知を一括管理。", zh: "在一处管理常用线路、关注车站和提醒。" },

  pDelayEyebrow: { ko: "지연증명서 신청/조회", en: "Delay Certificate", ja: "遅延証明書申請", zh: "延误证明申请" },
  pDelayTitle: { ko: "열차 지연, 몇 번의 클릭으로 증명", en: "Certify delays in a few clicks", ja: "列車の遅延を数クリックで証明", zh: "几次点击即可开具延误证明" },
  pDelaySub: { ko: "열차 지연 내역을 조회하고 증명서를 즉시 확인할 수 있습니다.", en: "Check delays and view the certificate instantly.", ja: "遅延履歴を照会し証明書を即確認できます。", zh: "查询延误记录，立即查看证明。" },

  pFacEyebrow: { ko: "역별 편의시설 검색", en: "Station Facilities", ja: "駅別施設検索", zh: "车站设施查询" },
  pFacTitle: { ko: "필요한 시설, 미리 확인하세요", en: "Check facilities in advance", ja: "必要な施設を事前に確認", zh: "提前查询所需设施" },
  pFacSub: { ko: "엘리베이터·화장실·수유실 등 편의시설 위치와 교통약자 이동 안내를 제공합니다.", en: "Locations of elevators, restrooms, nursing rooms, and accessibility guides.", ja: "エレベーター・トイレ・授乳室等の位置と交通弱者案内。", zh: "提供电梯、洗手间、母婴室位置及无障碍指南。" },
} satisfies Record<string, Dict>;

export type TKey = keyof typeof T;

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: TKey) => string };
const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "smetro-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ko");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved && LANGS.some((l) => l.code === saved)) setLangState(saved);
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch {}
  };

  const value = useMemo<Ctx>(
    () => ({ lang, setLang, t: (k) => T[k][lang] }),
    [lang],
  );
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}