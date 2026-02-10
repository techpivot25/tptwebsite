import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import en from "@/i18n/en.json";
import es from "@/i18n/es.json";
import ar from "@/i18n/ar.json";
import fr from "@/i18n/fr.json";

export type Language = "en" | "es" | "ar" | "fr";

const translations: Record<Language, Record<string, string>> = { en, es, ar, fr };

export const languageNames: Record<Language, string> = {
  en: "English",
  es: "Español",
  ar: "العربية",
  fr: "Français",
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("techpivot-lang") as Language) || "en";
    }
    return "en";
  });

  const dir = language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    localStorage.setItem("techpivot-lang", language);
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [language, dir]);

  const setLanguage = (lang: Language) => setLanguageState(lang);

  const t = useCallback(
    (key: string): string => {
      return translations[language]?.[key] || translations.en[key] || key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
