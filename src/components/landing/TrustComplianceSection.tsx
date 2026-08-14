import React from 'react';
import { ShieldCheck, Lock, FileCheck2, Scale, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const TrustComplianceSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="trust" className="py-20 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-xs font-semibold text-teal-800 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t('trust.pill', 'Ethical Health Standards')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            {t('trust.title', 'Built on strict privacy and clear legal boundaries.')}
          </h2>
          <p className="text-sm text-stone-600 max-w-2xl mx-auto font-normal">
            {t('trust.description', 'We hold a clear line between lifestyle biometric optimization and medical diagnosis. Your data is yours, encrypted end-to-end, and never monetized.')}
          </p>
        </div>

        {/* 3 Pillars of Trust */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-teal-800 shadow-xs">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-stone-900">{t('trust.p1_title', 'Insight, Not Medical Advice')}</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              {t('trust.p1_desc', 'Baseline delivers informational wellness scores and pattern recognition for athletic and lifestyle enhancement. We never diagnose, treat, or make clinical disease predictions.')}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-teal-800 shadow-xs">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-stone-900">{t('trust.p2_title', 'Zero Third-Party Data Sales')}</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              {t('trust.p2_desc', 'Your biometrics remain strictly confidential. We do not sell or license individual biometric streams to insurance brokers, employers, or ad networks.')}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-teal-800 shadow-xs">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-stone-900">{t('trust.p3_title', 'GDPR & HIPAA-Compliant Architecture')}</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              {t('trust.p3_desc', 'All data is encrypted in transit (TLS 1.3) and at rest (AES-256). You can export or permanently purge your historical biometric data with a single click.')}
            </p>
          </div>

        </div>

        {/* Prominent Legal Disclaimer Banner */}
        <div className="mt-12 p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-stone-700 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong className="text-stone-900 font-semibold">{t('trust.notice_title', 'Important Regulatory & Legal Notice')}: </strong>
            {t('trust.notice_desc', 'Baseline Wellness is not a medical device and is not intended to replace professional healthcare guidance, clinical diagnosis, or medical treatment. Always consult a qualified physician or healthcare provider regarding any underlying medical conditions or health decisions.')}
          </div>
        </div>

      </div>
    </section>
  );
};
