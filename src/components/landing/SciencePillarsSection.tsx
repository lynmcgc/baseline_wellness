import React from 'react';
import { Brain, Heart, Users, Sparkles, SlidersHorizontal } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const SciencePillarsSection: React.FC = () => {
  const { t, tText } = useLanguage();

  const pillars = [
    {
      icon: Sparkles,
      tag: 'Translation Layer',
      title: 'Biometrics in Plain Language',
      description: 'Raw numbers create confusion. Baseline converts microsecond HRV intervals and sleep sleep-stage percentages into actionable daily morning summaries.',
      highlight: '“What this means for you today”',
    },
    {
      icon: SlidersHorizontal,
      tag: 'Configurable Architecture',
      title: 'Metrics Configured to Your Goal',
      description: 'Whether you are managing cognitive burnout, training for an endurance race, or dialing in sleep architecture, customize which hero metrics matter most to you.',
      highlight: 'Zero rigid one-size-fits-all dashboards',
    },
    {
      icon: Heart,
      tag: 'Autonomic Balance',
      title: 'Parasympathetic vs Sympathetic Recovery',
      description: 'Track how efficiently your nervous system returns to homeostasis after physical exertion or stressful work blocks with real-time autonomic stress curves.',
      highlight: 'Vagal nerve tone & rMSSD tracking',
    },
    {
      icon: Users,
      tag: 'Science-Layered Accountability',
      title: 'Community Grounded in Physiology',
      description: 'Join peer cohorts and guided challenges built around proven behavioral science (e.g. 7-day sleep consistency, NSDR reset circles) without toxic gamification.',
      highlight: 'Accountability without burnout',
    },
  ];

  return (
    <section id="science" className="py-24 relative bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 text-xs font-semibold text-teal-800 shadow-xs">
            <Brain className="w-3.5 h-3.5" />
            <span>{t('science.pill', 'Science-Backed Methodology')}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            {t('science.title', 'Designed for health-conscious adults who value precision over hype.')}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
            {t('science.description', 'We avoid alarming red warning states and superficial streaks. Every recommendation is calibrated against peer-reviewed autonomic research and circadian chronobiology.')}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="p-8 rounded-2xl bg-white border border-stone-200 hover:border-stone-300 transition-all space-y-4 shadow-xs hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center text-teal-800">
                  <p.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-800 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200">
                  {tText(p.tag)}
                </span>
              </div>

              <h3 className="text-xl font-bold text-stone-900">{tText(p.title)}</h3>
              
              <p className="text-sm text-stone-600 leading-relaxed font-normal">
                {tText(p.description)}
              </p>

              <div className="pt-2">
                <span className="inline-flex items-center text-xs font-medium text-teal-800 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-200">
                  ✓ {tText(p.highlight)}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
