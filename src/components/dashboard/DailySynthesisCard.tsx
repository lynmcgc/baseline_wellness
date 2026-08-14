import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Sun, Moon, Zap, SlidersHorizontal, Layers, ChevronRight, RefreshCw, Bot } from 'lucide-react';
import { UserProfile } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { fetchDynamicSynthesis, SynthesisResponse, askGeminiAssistant } from '../../utils/geminiApi';

interface DailySynthesisCardProps {
  userProfile: UserProfile;
  onOpenMetricConfig: () => void;
  onOpenUpsell: () => void;
}

export const DailySynthesisCard: React.FC<DailySynthesisCardProps> = ({
  userProfile,
  onOpenMetricConfig,
  onOpenUpsell,
}) => {
  const { t, tText } = useLanguage();
  const [loadingAi, setLoadingAi] = useState(false);
  const [synthesisData, setSynthesisData] = useState<SynthesisResponse | null>(null);
  const [showCoachPrompt, setShowCoachPrompt] = useState(false);
  const [coachQuestion, setCoachQuestion] = useState('');
  const [coachLoading, setCoachLoading] = useState(false);
  const [coachAnswer, setCoachAnswer] = useState<{ answer: string; actionItem?: string } | null>(null);

  const handleRefreshSynthesis = async () => {
    setLoadingAi(true);
    try {
      const result = await fetchDynamicSynthesis({
        userName: userProfile.name,
        goal: userProfile.goal,
        readinessScore: 88,
        devices: userProfile.connectedWearables,
        hrvMs: 68,
        hrvBaselineDelta: '+15.2%',
        restingHr: 51,
        sleepDuration: '7h 48m',
        deepSleepPercent: 18,
        remSleepPercent: 24,
        stressScore: 32,
      });
      setSynthesisData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAi(false);
    }
  };

  const handleAskCoach = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coachQuestion.trim() || coachLoading) return;

    setCoachLoading(true);
    try {
      const res = await askGeminiAssistant(coachQuestion, {
        userName: userProfile.name,
        goal: userProfile.goal,
        readinessScore: 88,
        hrvMs: 68,
        restingHr: 51,
        sleepDuration: '7h 48m',
      });
      setCoachAnswer(res);
    } catch (err) {
      console.error(err);
    } finally {
      setCoachLoading(false);
    }
  };

  const currentSummary = synthesisData?.summary || tText('Your autonomic nervous system demonstrated robust parasympathetic recovery throughout your sleep cycle. Overnight HRV (rMSSD) elevated +15.2% above baseline with a resting heart rate of 51 bpm.');
  const daytimeGuidance = synthesisData?.daytimeGuidance || t('synthesis.daytime_exertion_desc', 'Physiologically primed for high-demand cognitive tasks or Zone 3-4 endurance work.');
  const autonomicReserve = synthesisData?.autonomicReserve || t('synthesis.autonomic_reserve_desc', 'Sympathetic stress sensitivity is low. Expected focus window: 9:00 AM – 1:30 PM.');
  const eveningProtocol = synthesisData?.eveningProtocol || t('synthesis.evening_wind_down_desc', 'To preserve this recovery momentum, initiate blue-light wind down by 10:15 PM.');

  return (
    <div className="rounded-2xl bg-white border border-stone-200 p-6 sm:p-7 shadow-xs relative overflow-hidden">
      
      {/* Background soft ambient highlight */}
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        
        {/* Card Header with Readiness Score & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-700 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                {t('synthesis.title', 'Daily Biometric Synthesis')}
              </span>
              <span className="text-stone-300">·</span>
              <span className="text-xs text-stone-500 font-normal">
                {tText('Unified from Garmin Connect & Oura Ring')}
              </span>
              {synthesisData && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-[10px] font-semibold text-teal-800">
                  <Sparkles className="w-2.5 h-2.5" />
                  {synthesisData.source === 'gemini' ? 'AI Synthesis' : 'Baseline Model'}
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
              {t('synthesis.good_morning', 'Good morning')}, {userProfile.name}.
            </h2>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="text-right pr-1">
              <div className="flex items-baseline justify-end gap-1.5">
                <span className="text-3xl sm:text-4xl font-extrabold font-display text-teal-800">
                  88
                </span>
                <span className="text-xs font-semibold text-stone-500">/100</span>
              </div>
              <span className="text-[11px] font-semibold text-stone-600 uppercase tracking-wide">
                {t('dashboard.optimal_readiness', 'Optimal Readiness')}
              </span>
            </div>

            <button
              onClick={handleRefreshSynthesis}
              disabled={loadingAi}
              className="p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer shrink-0 disabled:opacity-60"
              title="Generate fresh physiological synthesis"
            >
              <RefreshCw className={`w-4 h-4 text-teal-800 ${loadingAi ? 'animate-spin' : ''}`} />
              <span className="hidden md:inline">{loadingAi ? 'Synthesizing...' : 'Refresh Synthesis'}</span>
            </button>

            <button
              onClick={onOpenMetricConfig}
              className="p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer shrink-0"
              title="Configure hero metrics"
            >
              <SlidersHorizontal className="w-4 h-4 text-teal-800" />
              <span className="hidden sm:inline">{t('dashboard.customize_focus', 'Customize Focus')}</span>
            </button>
          </div>
        </div>

        {/* Translation: What this means for you today */}
        <div className="p-4 sm:p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-800" />
              {t('synthesis.what_means', 'What This Means For You Today')}
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCoachPrompt(!showCoachPrompt)}
                className="text-xs font-semibold text-teal-800 hover:text-teal-900 flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-stone-200 shadow-2xs"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>{showCoachPrompt ? 'Close Biometric Coach' : 'Ask Biometric Coach'}</span>
              </button>
              <span className="text-[11px] text-stone-500 font-normal hidden sm:inline">
                {t('synthesis.calibrated_to', 'Calibrated to your')} {userProfile.goal.replace('_', ' ')} {t('synthesis.goal_suffix', 'goal')}
              </span>
            </div>
          </div>

          <p className="text-sm text-stone-700 leading-relaxed font-normal">
            {currentSummary}
          </p>

          {/* Interactive AI Coach Drawer */}
          {showCoachPrompt && (
            <div className="p-3.5 rounded-xl bg-white border border-teal-200/80 space-y-3 mt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-900">
                <Bot className="w-4 h-4 text-teal-700" />
                <span>Biometric Recovery Coach</span>
              </div>
              <form onSubmit={handleAskCoach} className="flex gap-2">
                <input
                  type="text"
                  value={coachQuestion}
                  onChange={(e) => setCoachQuestion(e.target.value)}
                  placeholder="e.g. How does my 68ms HRV affect my workout planning today?"
                  className="flex-1 text-xs px-3 py-2 rounded-lg border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-700"
                />
                <button
                  type="submit"
                  disabled={coachLoading || !coachQuestion.trim()}
                  className="px-3 py-2 rounded-lg bg-teal-800 text-white text-xs font-medium hover:bg-teal-900 transition-colors disabled:opacity-50 cursor-pointer shrink-0"
                >
                  {coachLoading ? 'Thinking...' : 'Ask Coach'}
                </button>
              </form>

              {coachAnswer && (
                <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-xs space-y-2">
                  <p className="text-stone-700 leading-relaxed">{coachAnswer.answer}</p>
                  {coachAnswer.actionItem && (
                    <div className="pt-1.5 border-t border-stone-200/60 flex items-start gap-1.5 text-teal-900 font-medium">
                      <span className="text-teal-700">✓</span>
                      <span>Actionable Takeaway: {coachAnswer.actionItem}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Actionable daily blueprint */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-white border border-stone-200 text-xs space-y-1 shadow-xs">
              <div className="flex items-center gap-1.5 text-teal-800 font-semibold">
                <Sun className="w-3.5 h-3.5" /> {t('synthesis.daytime_exertion', 'Daytime Exertion')}
              </div>
              <p className="text-stone-600 font-normal">
                {daytimeGuidance}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white border border-stone-200 text-xs space-y-1 shadow-xs">
              <div className="flex items-center gap-1.5 text-teal-800 font-semibold">
                <Zap className="w-3.5 h-3.5" /> {t('synthesis.autonomic_reserve', 'Autonomic Reserve')}
              </div>
              <p className="text-stone-600 font-normal">
                {autonomicReserve}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white border border-stone-200 text-xs space-y-1 shadow-xs">
              <div className="flex items-center gap-1.5 text-stone-700 font-semibold">
                <Moon className="w-3.5 h-3.5" /> {t('synthesis.evening_wind_down', 'Evening Wind-Down')}
              </div>
              <p className="text-stone-600 font-normal">
                {eveningProtocol}
              </p>
            </div>
          </div>
        </div>

        {/* Contextual Upsell / Deep Correlation Engine Teaser */}
        <div className="p-3 sm:p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-stone-900 block">
                {t('synthesis.correl_title', '90-Day Longitudinal Correlation Engine')}
              </span>
              <span className="text-stone-500 font-normal">
                {t('synthesis.correl_desc', 'Discover multi-week correlations between caffeine timing, sleep latency, and HRV spikes.')}
              </span>
            </div>
          </div>
          <button
            onClick={onOpenUpsell}
            className="text-xs text-teal-800 hover:text-teal-900 font-semibold flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <span>{t('synthesis.correl_btn', 'Unlock Advanced Correlation')}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Non-Medical Disclaimer Line */}
        <div className="flex items-center gap-2 text-[11px] text-stone-500 pt-1 font-normal">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-800 shrink-0" />
          <span>
            <strong>{t('synthesis.disclaimer', 'Informational Wellness Notice: Readiness scores and biometric insights reflect physiological recovery trends and are not clinical diagnostics.')}</strong>
          </span>
        </div>

      </div>
    </div>
  );
};

