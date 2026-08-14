import React from 'react';
import { Watch, CircleDot, Activity, HeartPulse, RefreshCw, Layers } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const WearableCompatibilitySection: React.FC = () => {
  const { t, tText } = useLanguage();

  const ecosystems = [
    {
      name: 'Garmin Connect',
      icon: Watch,
      metrics: ['Overnight HRV (rMSSD)', 'Stress Level', 'Body Battery', 'Zone 2 Cardio'],
      description: 'Ingests high-frequency optical sensor readings and training readiness metrics directly via secure OAuth pipeline.',
    },
    {
      name: 'Oura Ring',
      icon: CircleDot,
      metrics: ['Sleep Stages (SWS/REM)', 'Body Temp Deviation', 'Readiness Score', 'Resting HR'],
      description: 'Harmonizes high-precision digital temperature trend streams and nocturnal cardiovascular stability.',
    },
    {
      name: 'Apple HealthKit',
      icon: Activity,
      metrics: ['VO2 Max Trends', 'Respiratory Rate', 'Active Caloric Output', 'Walking Asymmetry'],
      description: 'Bridges unified HealthKit biometric records with real-time background sync on iOS devices.',
    },
    {
      name: 'WHOOP & Polar',
      icon: HeartPulse,
      metrics: ['Daily Strain Index', 'Sleep Debt Estimation', 'Recovery Percentage'],
      description: 'Normalizes custom vendor strain and recovery algorithms into one coherent physiological scale.',
    },
  ];

  return (
    <section id="compatibility" className="py-20 bg-stone-100/60 border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 text-xs font-semibold text-teal-800 shadow-xs">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{t('compat.pill', 'Brand-Agnostic Biometric Engine')}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            {t('compat.title', 'Never be locked into a single wearable ecosystem again.')}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
            {t('compat.description', 'Whether you wear a Garmin for running, an Oura ring for sleep, or an Apple Watch during work hours, Baseline unifies disparate data streams into one harmonious, non-conflicting daily wellness score.')}
          </p>
        </div>

        {/* Ecosystem Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ecosystems.map((eco) => (
            <div
              key={eco.name}
              className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-stone-300 transition-all space-y-4 flex flex-col justify-between shadow-xs hover:shadow-sm"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center text-teal-800">
                  <eco.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-base text-stone-900">{eco.name}</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-normal">{tText(eco.description)}</p>
              </div>

              <div className="pt-3 border-t border-stone-100">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 block mb-2">
                  {t('compat.unified_points', 'Unified Data Points')}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {eco.metrics.map((m) => (
                    <span
                      key={m}
                      className="text-[11px] px-2 py-0.5 rounded bg-stone-50 border border-stone-200 text-stone-700 font-medium"
                    >
                      {tText(m)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Architecture Note */}
        <div className="mt-12 p-5 rounded-2xl bg-white border border-stone-200 max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left shadow-xs">
          <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-stone-900">{t('compat.algorithm_title', 'Continuous Normalization Algorithm')}</h4>
            <p className="text-xs text-stone-600 mt-1 font-normal">
              {t('compat.algorithm_desc', 'Raw metrics are adjusted against your individual 30-day baseline rather than generic population averages, ensuring your score reflects true personal physiological state rather than sensor variance.')}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
