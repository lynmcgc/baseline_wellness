import React, { createContext, useContext, useState, useEffect } from 'react';
import { LanguageCode, LanguageOption } from '../types';
import { COMPREHENSIVE_TRANSLATIONS } from '../data/translations';
import { translateText } from '../utils/translator';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', region: 'US / Global' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', region: 'España / LATAM' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', region: 'France' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', region: 'Deutschland' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', region: '日本' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷', region: 'Brasil / Portugal' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', region: 'Italia' },
  { code: 'zh', name: 'Chinese', nativeName: '简体中文', flag: '🇨🇳', region: '中国' },
];

export const TRANSLATIONS = COMPREHENSIVE_TRANSLATIONS;

interface LanguageContextType {
  currentLanguage: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  currentLanguageOption: LanguageOption;
  availableLanguages: LanguageOption[];
  t: (key: string, defaultText?: string) => string;
  tText: (text: string, keyFallback?: string) => string;
  isTranslating: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguageState] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem('baseline_lang') as LanguageCode;
      if (saved && COMPREHENSIVE_TRANSLATIONS[saved]) return saved;
    } catch {
      // ignore
    }
    return 'en';
  });

  const [isTranslating, setIsTranslating] = useState(false);

  const setLanguage = (lang: LanguageCode) => {
    setIsTranslating(true);
    setCurrentLanguageState(lang);
    try {
      localStorage.setItem('baseline_lang', lang);
      document.documentElement.lang = lang;
    } catch {
      // ignore
    }
    setTimeout(() => {
      setIsTranslating(false);
    }, 150);
  };

  useEffect(() => {
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const currentLanguageOption =
    SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  const t = (key: string, defaultText?: string): string => {
    const langDict = COMPREHENSIVE_TRANSLATIONS[currentLanguage] || COMPREHENSIVE_TRANSLATIONS['en'];
    if (langDict[key]) {
      return langDict[key];
    }
    const enDict = COMPREHENSIVE_TRANSLATIONS['en'];
    if (enDict[key]) {
      return enDict[key];
    }
    return defaultText || key;
  };

  const tText = (text: string, keyFallback?: string): string => {
    return translateText(text, currentLanguage, keyFallback);
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        currentLanguageOption,
        availableLanguages: SUPPORTED_LANGUAGES,
        t,
        tText,
        isTranslating,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
