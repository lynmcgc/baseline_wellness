import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface LanguageSelectorProps {
  variant?: 'navbar' | 'compact' | 'footer';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  variant = 'navbar',
  className = '' 
}) => {
  const { currentLanguage, setLanguage, currentLanguageOption, availableLanguages, isTranslating, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (variant === 'footer') {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          id="footer-language-selector-btn"
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs font-medium transition-all shadow-xs cursor-pointer"
        >
          <Globe className="w-3.5 h-3.5 text-stone-500" />
          <span className="text-base leading-none">{currentLanguageOption.flag}</span>
          <span>{currentLanguageOption.nativeName}</span>
          <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute bottom-full left-0 mb-2 w-56 bg-white border border-stone-200 rounded-2xl shadow-xl p-1.5 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150">
            <div className="px-2.5 py-1.5 border-b border-stone-100 mb-1 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                {t('lang.select', 'Select Language')}
              </span>
              <span className="text-[10px] text-teal-800 font-semibold flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> i18n
              </span>
            </div>
            <div className="max-h-64 overflow-y-auto space-y-0.5">
              {availableLanguages.map((lang) => {
                const isSelected = lang.code === currentLanguage;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-teal-50 text-teal-950 font-bold border border-teal-200'
                        : 'text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base leading-none">{lang.flag}</span>
                      <div>
                        <span className="block leading-tight">{lang.nativeName}</span>
                        <span className="text-[10px] text-stone-400 font-normal">{lang.name} ({lang.region})</span>
                      </div>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-teal-800" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        id="navbar-language-selector-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Language selector dropdown"
        title="Select Language / Changer de langue / Cambiar idioma"
        className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-xl border transition-all text-xs font-medium cursor-pointer ${
          isOpen
            ? 'bg-teal-50 border-teal-300 text-teal-950 shadow-xs ring-2 ring-teal-800/10'
            : 'bg-stone-100 hover:bg-stone-200/80 border-stone-200 text-stone-700 hover:text-stone-900'
        }`}
      >
        <Globe className={`w-3.5 h-3.5 ${isTranslating ? 'animate-spin text-teal-700' : 'text-stone-500'}`} />
        <span className="text-sm leading-none" role="img" aria-label={currentLanguageOption.name}>
          {currentLanguageOption.flag}
        </span>
        <span className="hidden md:inline font-medium text-stone-800">
          {currentLanguageOption.code.toUpperCase()}
        </span>
        <ChevronDown className={`w-3 h-3 text-stone-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Language Dropdown Menu */}
      {isOpen && (
        <div 
          id="navbar-language-dropdown-menu"
          className="absolute right-0 mt-2 w-60 sm:w-64 bg-white border border-stone-200 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
        >
          {/* Header */}
          <div className="px-2.5 py-2 border-b border-stone-100 flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5 text-stone-700">
              <Globe className="w-3.5 h-3.5 text-teal-800" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600">
                {t('lang.select', 'Select Language')}
              </span>
            </div>
            <span className="text-[10px] font-semibold text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
              8 Available
            </span>
          </div>

          {/* Languages Grid / List */}
          <div className="max-h-72 overflow-y-auto space-y-1 py-1 pr-0.5">
            {availableLanguages.map((lang) => {
              const isSelected = lang.code === currentLanguage;
              return (
                <button
                  key={lang.code}
                  type="button"
                  id={`lang-option-${lang.code}`}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-xs text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-teal-50 text-teal-950 font-bold border border-teal-200 shadow-2xs'
                      : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg leading-none shrink-0">{lang.flag}</span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold">{lang.nativeName}</span>
                        {isSelected && (
                          <span className="text-[9px] font-bold uppercase tracking-wider bg-teal-800 text-white px-1 rounded">
                            Active
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-stone-400 font-normal">
                        {lang.name} · {lang.region}
                      </span>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-teal-800 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Translation Engine Badge */}
          <div className="pt-2 border-t border-stone-100 mt-1 px-2 flex items-center justify-between text-[10px] text-stone-500">
            <span className="flex items-center gap-1 text-teal-800 font-medium">
              <Sparkles className="w-2.5 h-2.5 text-teal-700" />
              Real-time Biometric Translator
            </span>
            <span className="text-stone-400">v1.2</span>
          </div>
        </div>
      )}
    </div>
  );
};
