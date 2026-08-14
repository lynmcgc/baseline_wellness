import React from 'react';
import { X, Check, Crown, ArrowRight, ShieldCheck } from 'lucide-react';
import { SubscriptionTier } from '../../types';

interface UpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTier: SubscriptionTier;
  onUpgrade: (tier: SubscriptionTier) => void;
}

export const UpsellModal: React.FC<UpsellModalProps> = ({
  isOpen,
  onClose,
  currentTier,
  onUpgrade,
}) => {
  if (!isOpen) return null;

  const targetTier: SubscriptionTier = currentTier === 'pro' ? 'elite' : 'pro';
  const targetPrice = targetTier === 'elite' ? '$39' : '$18';
  const targetLabel = targetTier === 'elite' ? 'Elite Performance' : 'Bio-Sync Member';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white border border-stone-200 rounded-2xl shadow-xl p-6 sm:p-7 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-800">
              <Crown className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-stone-900">
                Unlock Deep Biometric Correlation
              </h2>
              <p className="text-xs text-stone-500 font-normal">Advanced 90-Day Multi-Variate Analysis</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Feature Comparison */}
        <div className="space-y-3 text-xs">
          <p className="text-stone-600 leading-relaxed font-normal">
            Upgrade your membership to unlock deep mathematical correlation between daytime micro-stressors, circadian light exposure, training load, and overnight HRV recovery trends.
          </p>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2.5">
            <div className="flex items-center gap-2 text-stone-800 font-normal">
              <Check className="w-4 h-4 text-teal-800 shrink-0" />
              <span><strong>90-Day Longitudinal Analysis:</strong> Identify subtle multi-week trends.</span>
            </div>
            <div className="flex items-center gap-2 text-stone-800 font-normal">
              <Check className="w-4 h-4 text-teal-800 shrink-0" />
              <span><strong>Circadian Peak Timing:</strong> Automated optimal window calculations.</span>
            </div>
            <div className="flex items-center gap-2 text-stone-800 font-normal">
              <Check className="w-4 h-4 text-teal-800 shrink-0" />
              <span><strong>Unlimited Live Classes:</strong> Direct access to breathwork & NSDR faculty.</span>
            </div>
            <div className="flex items-center gap-2 text-stone-800 font-normal">
              <Check className="w-4 h-4 text-teal-800 shrink-0" />
              <span><strong>Biomarker CSV/JSON Export:</strong> Secure data export for personal archiving.</span>
            </div>
          </div>
        </div>

        {/* Plan Select Button */}
        <div className="pt-2 space-y-3">
          <button
            onClick={() => {
              onUpgrade(targetTier);
              onClose();
            }}
            className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm py-3 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Upgrade to {targetLabel} ({targetPrice}/mo)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 font-normal">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-800" />
            <span>Includes 14-day trial · Cancel anytime with 1 click</span>
          </div>
        </div>

      </div>
    </div>
  );
};
