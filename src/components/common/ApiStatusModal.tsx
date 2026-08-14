import React, { useEffect, useState } from 'react';
import { X, Key, CheckCircle, Sparkles, Map, CloudSun, CreditCard, ExternalLink, ShieldCheck, Copy, Check } from 'lucide-react';
import { fetchAllApiStatuses, ApiStatusSummary } from '../../utils/geminiApi';
import { useLanguage } from '../../context/LanguageContext';

interface ApiStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiStatusModal: React.FC<ApiStatusModalProps> = ({ isOpen, onClose }) => {
  const { tText } = useLanguage();
  const [statusSummary, setStatusSummary] = useState<ApiStatusSummary | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchAllApiStatuses().then(setStatusSummary);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(text);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const API_ITEMS = [
    {
      name: 'Google Gemini 3.7 Flash AI',
      envVar: 'GEMINI_API_KEY',
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      purpose: 'Daily plain-language biometric briefing, 24/7 AI recovery coach, and local area activity recommendations.',
      configured: Boolean(statusSummary?.apis.gemini.configured),
      docUrl: 'https://aistudio.google.com/app/apikey',
    },
    {
      name: 'Google Maps Platform & Places',
      envVar: 'GOOGLE_MAPS_PLATFORM_KEY',
      icon: <Map className="w-5 h-5 text-teal-600" />,
      purpose: 'Interactive recovery spot map rendering, real pins for cold plunge / trails, and GPS user location routing.',
      configured: Boolean(statusSummary?.apis.googleMaps.configured),
      docUrl: 'https://developers.google.com/maps/documentation/javascript/get-api-key',
    },
    {
      name: 'Weather & Circadian API',
      envVar: 'WEATHER_API_KEY',
      icon: <CloudSun className="w-5 h-5 text-blue-500" />,
      purpose: 'Live ambient temperature, UV index, air quality (AQI), and circadian outdoor workout timing optimization.',
      configured: Boolean(statusSummary?.apis.weather.configured),
      docUrl: 'https://openweathermap.org/api',
    },
    {
      name: 'Stripe Payments & Billing',
      envVar: 'STRIPE_SECRET_KEY',
      icon: <CreditCard className="w-5 h-5 text-indigo-500" />,
      purpose: 'Baseline Pro & Family Circle membership checkout, card validation, and subscription management.',
      configured: Boolean(statusSummary?.apis.stripe.configured),
      docUrl: 'https://dashboard.stripe.com/apikeys',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-2xl w-full flex flex-col overflow-hidden animate-in fade-in duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-stone-900 text-white flex items-center justify-center">
              <Key className="w-4 h-4 text-teal-300" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">{tText('API Configuration & Credentials')}</h3>
              <p className="text-[11px] text-stone-500">{tText('Environment Variables & Integration Status')}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-600 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200 text-teal-950 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-teal-800 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>Seamless Fallbacks Active:</strong> Baseline Wellness works completely out of the box with realistic mock synthesis, interactive SVG maps, and simulation billing. When you provide production keys in Vercel or your environment, live upstream endpoints activate automatically.
            </div>
          </div>

          <div className="space-y-3">
            {API_ITEMS.map((item) => (
              <div
                key={item.envVar}
                className="p-4 rounded-2xl border border-stone-200 bg-white hover:border-stone-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-stone-900 text-sm">{item.name}</h4>
                      {item.configured ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                          Configured
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full border border-stone-200">
                          Placeholder Ready
                        </span>
                      )}
                    </div>
                    
                    <p className="text-stone-500 text-[11px] mt-1">{item.purpose}</p>

                    <div className="flex items-center gap-2 mt-2">
                      <code className="bg-stone-100 text-stone-800 px-2 py-0.5 rounded border border-stone-200 font-mono text-[10px]">
                        {item.envVar}
                      </code>
                      <button
                        onClick={() => handleCopy(item.envVar)}
                        className="text-stone-400 hover:text-stone-800 transition-colors cursor-pointer"
                        title="Copy variable name"
                      >
                        {copiedKey === item.envVar ? <Check className="w-3.5 h-3.5 text-teal-700" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <a
                  href={item.docUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-semibold flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer self-end sm:self-center"
                >
                  <span>Get API Key</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-stone-200 bg-stone-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            {tText('Done')}
          </button>
        </div>

      </div>
    </div>
  );
};
