import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Activity, Watch, CircleDot, HeartPulse, Zap, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
  onExploreDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted, onExploreDemo }) => {
  return (
    <section id="overview" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Background subtle ambient warmth */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-stone-200/50 via-teal-100/30 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Scientific Credibility Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 shadow-xs text-xs font-medium text-stone-700">
              <span className="w-2 h-2 rounded-full bg-teal-600"></span>
              <span>Cross-Wearable Biometric Synthesis</span>
              <span className="text-stone-300">·</span>
              <span className="text-teal-800 font-semibold">Non-Diagnostic Insight</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.15]">
              Turn raw wearable data into <span className="text-teal-800">clear daily guidance.</span>
            </h1>

            {/* Descriptive Body */}
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Your Garmin, Oura, Apple Watch, or WHOOP collect thousands of data points every night. Baseline aggregates them into one unified, plain-language dashboard layered with community accountability to help you optimize recovery, sleep, and longevity.
            </p>

            {/* Brand-Agnostic Wearable Compatibility Ticker */}
            <div className="pt-2 pb-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
                Works seamlessly with your preferred hardware
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                {[
                  { name: 'Garmin Connect', icon: Watch },
                  { name: 'Oura Ring', icon: CircleDot },
                  { name: 'Apple Health', icon: Activity },
                  { name: 'WHOOP', icon: HeartPulse },
                  { name: 'Fitbit', icon: Zap },
                ].map((device) => (
                  <span
                    key={device.name}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-stone-200 shadow-xs text-xs text-stone-700 font-medium"
                  >
                    <device.icon className="w-3.5 h-3.5 text-teal-700" />
                    {device.name}
                  </span>
                ))}
                <span className="text-xs text-stone-500 self-center px-1.5">+ more</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <button
                id="hero-get-started-btn"
                onClick={onGetStarted}
                className="w-full sm:w-auto bg-stone-900 hover:bg-stone-800 text-white font-medium text-base px-8 py-3.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button
                id="hero-demo-dashboard-btn"
                onClick={onExploreDemo}
                className="w-full sm:w-auto bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 font-medium text-base px-6 py-3.5 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Live Dashboard</span>
              </button>
            </div>

            {/* Guardrail Compliance Notice */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs text-stone-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
              <span>Informational wellness insight only · Zero medical claims · Secure GDPR/HIPAA-safe data handling</span>
            </div>

          </div>

          {/* Right Column: Unified Biometric Translation Card (Mock Visual) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-white border border-stone-200 p-6 shadow-xl shadow-stone-200/50">
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-600"></span>
                    <h3 className="font-semibold text-sm text-stone-800">Daily Biometric Synthesis</h3>
                  </div>
                  <p className="text-xs text-stone-500">Unified from Garmin + Oura streams</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold font-display text-teal-800">88</span>
                  <span className="text-xs text-stone-500 font-medium block">Readiness Index</span>
                </div>
              </div>

              {/* Translation Module: Raw numbers → Plain Language */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80">
                  <div className="flex items-center justify-between text-xs font-semibold text-teal-900 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-teal-700" /> Plain-Language Translation
                    </span>
                    <span className="text-stone-400 font-normal">Updated 6:30 AM</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    "Your autonomic nervous system shows strong parasympathetic recovery (+15% HRV). You have high physiological reserve for demanding focus or training today."
                  </p>
                </div>

                {/* Sub-metrics breakdown */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-stone-50/70 border border-stone-200">
                    <span className="text-xs text-stone-500 block mb-1">Overnight HRV (rMSSD)</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-stone-900">68 ms</span>
                      <span className="text-xs text-teal-700 font-medium">+15.2%</span>
                    </div>
                    <span className="text-[11px] text-stone-500 mt-1 block">Optimal vagal tone</span>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-50/70 border border-stone-200">
                    <span className="text-xs text-stone-500 block mb-1">Restorative Sleep</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-stone-900">2h 15m</span>
                      <span className="text-xs text-teal-700 font-medium">34% total</span>
                    </div>
                    <span className="text-[11px] text-stone-500 mt-1 block">Deep & REM stage balance</span>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-50/70 border border-stone-200">
                    <span className="text-xs text-stone-500 block mb-1">Resting Heart Rate</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-stone-900">51 bpm</span>
                      <span className="text-xs text-teal-700 font-medium">-3 bpm</span>
                    </div>
                    <span className="text-[11px] text-stone-500 mt-1 block">Below 30-day baseline</span>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-50/70 border border-stone-200">
                    <span className="text-xs text-stone-500 block mb-1">Daytime Stress Ratio</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-stone-900">32 / 100</span>
                      <span className="text-xs text-teal-800 font-medium">Low Load</span>
                    </div>
                    <span className="text-[11px] text-stone-500 mt-1 block">64% in restorative zone</span>
                  </div>
                </div>

                {/* Accountability Banner */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" />
                  <span>
                    <strong className="text-stone-900 font-semibold">Community Challenge Active:</strong> Day 4 of 7 on Sleep Anchor.
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
