import React from 'react';
import { Sparkles, ShieldCheck, Sun, Moon, Zap, SlidersHorizontal, Layers, ChevronRight } from 'lucide-react';
import { UserProfile } from '../../types';

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
                Daily Biometric Synthesis
              </span>
              <span className="text-stone-300">·</span>
              <span className="text-xs text-stone-500 font-normal">
                Unified from Garmin Connect & Oura Ring
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
              Good morning, {userProfile.name}.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="flex items-baseline justify-end gap-1.5">
                <span className="text-3xl sm:text-4xl font-extrabold font-display text-teal-800">
                  88
                </span>
                <span className="text-xs font-semibold text-stone-500">/100</span>
              </div>
              <span className="text-[11px] font-semibold text-stone-600 uppercase tracking-wide">
                Optimal Readiness
              </span>
            </div>

            <button
              onClick={onOpenMetricConfig}
              className="p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer shrink-0"
              title="Configure hero metrics"
            >
              <SlidersHorizontal className="w-4 h-4 text-teal-800" />
              <span className="hidden sm:inline">Customize Focus</span>
            </button>
          </div>
        </div>

        {/* Translation: What this means for you today */}
        <div className="p-4 sm:p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-800" />
              What This Means For You Today
            </h3>
            <span className="text-[11px] text-stone-500 font-normal">Calibrated to your {userProfile.goal.replace('_', ' ')} goal</span>
          </div>

          <p className="text-sm text-stone-700 leading-relaxed font-normal">
            Your autonomic nervous system demonstrated robust parasympathetic recovery throughout your sleep cycle. Overnight HRV (rMSSD) elevated <strong className="text-teal-800 font-semibold">+15.2%</strong> above baseline with a resting heart rate of <strong className="text-stone-900 font-semibold">51 bpm</strong>. 
          </p>

          {/* Actionable daily blueprint */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-white border border-stone-200 text-xs space-y-1 shadow-xs">
              <div className="flex items-center gap-1.5 text-teal-800 font-semibold">
                <Sun className="w-3.5 h-3.5" /> Daytime Exertion
              </div>
              <p className="text-stone-600 font-normal">Physiologically primed for high-demand cognitive tasks or Zone 3-4 endurance work.</p>
            </div>

            <div className="p-3 rounded-lg bg-white border border-stone-200 text-xs space-y-1 shadow-xs">
              <div className="flex items-center gap-1.5 text-teal-800 font-semibold">
                <Zap className="w-3.5 h-3.5" /> Autonomic Reserve
              </div>
              <p className="text-stone-600 font-normal">Sympathetic stress sensitivity is low. Expected focus window: 9:00 AM – 1:30 PM.</p>
            </div>

            <div className="p-3 rounded-lg bg-white border border-stone-200 text-xs space-y-1 shadow-xs">
              <div className="flex items-center gap-1.5 text-stone-700 font-semibold">
                <Moon className="w-3.5 h-3.5" /> Evening Wind-Down
              </div>
              <p className="text-stone-600 font-normal">To preserve this recovery momentum, initiate blue-light wind down by 10:15 PM.</p>
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
                90-Day Longitudinal Correlation Engine
              </span>
              <span className="text-stone-500 font-normal">
                Discover multi-week correlations between caffeine timing, sleep latency, and HRV spikes.
              </span>
            </div>
          </div>
          <button
            onClick={onOpenUpsell}
            className="text-xs text-teal-800 hover:text-teal-900 font-semibold flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <span>Unlock Advanced Correlation</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Non-Medical Disclaimer Line */}
        <div className="flex items-center gap-2 text-[11px] text-stone-500 pt-1 font-normal">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-800 shrink-0" />
          <span>
            <strong>Informational Wellness Notice:</strong> Readiness scores and biometric insights reflect physiological recovery trends and are not clinical diagnostics.
          </span>
        </div>

      </div>
    </div>
  );
};
