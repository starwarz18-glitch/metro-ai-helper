import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type Lang = "ko" | "en" | "ja" | "zh";

export const LANGS: { code: Lang; label: string }[] = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
  { code: "zh", label: "中文" },
];

type Dict = Record<Lang, string>;

export const T = {
  askAI: { ko: "AI에게 묻기", en: "Ask AI", ja: "AIに聞く", zh: "问AI" } as Dict,
  greetingHi: { ko: "안녕하세요.", en: "Hello.", ja: "こんにちは。", zh: "您好。" } as Dict,
  greetingHelp: {
    ko: "무엇을 도와드릴까요?",
    en: "How can we help you?",
    ja: "何をお手伝いしましょうか?",
    zh: "有什么可以帮您?",
  } as Dict,
  searchPlaceholder: {
    ko: "예) 강남역 막차 시간 알려줘",
    en: "e.g. When is the last train from Gangnam?",
    ja: "例) 江南駅の終電時間を教えて",
    zh: "例) 江南站末班车时间",
  } as Dict,
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: keyof typeof T) => string };
const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ko");
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
