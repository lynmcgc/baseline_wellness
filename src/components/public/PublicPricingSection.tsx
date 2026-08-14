import React, { useState } from 'react';
import { Check, Sparkles, Shield, CreditCard, ArrowRight } from 'lucide-react';
import { PRICING_PLANS } from '../../data/pricingData';
import { PricingPlan } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

export const PublicPricingSection: React.FC<{
  onSelectPlan: (planId: 'starter' | 'pro' | 'family', interval: 'monthly' | 'annual') => void;
}> = ({ onSelectPlan }) => {
  const { tText } = useLanguage();
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'annual'>('annual');

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <CreditCard className="w-3.5 h-3.5" />
            <span>{tText('Transparent Membership & Pricing')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-stone-900 tracking-tight">
            {tText('Invest in Autonomic Clarity & Longevity')}
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3 font-normal">
            {tText('Single transparent pricing for bio-optimizers and families. Connect all your wearables without vendor lock-in or hidden device fees.')}
          </p>

          {/* Monthly vs Annual Toggle */}
          <div className="mt-8 inline-flex items-center p-1 bg-stone-200/80 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setBillingInterval('monthly')}
              className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                billingInterval === 'monthly'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {tText('Monthly Billing')}
            </button>
            <button
              onClick={() => setBillingInterval('annual')}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                billingInterval === 'annual'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>{tText('Annual Billing')}</span>
              <span className="px-1.5 py-0.5 rounded-full bg-teal-400 text-stone-950 text-[10px] font-extrabold uppercase">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PRICING_PLANS.map((plan: PricingPlan) => {
            const priceToDisplay = billingInterval === 'annual' ? plan.annualMonthlyPrice : plan.monthlyPrice;
            const isPopular = plan.popular;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all ${
                  isPopular
                    ? 'bg-white border-2 border-stone-900 shadow-lg scale-[1.02] z-10'
                    : 'bg-white/80 border border-stone-200 shadow-xs hover:border-stone-300'
                }`}
              >
                {/* Popular Pill */}
                {plan.badge && (
                  <div className="mb-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        isPopular
                          ? 'bg-stone-900 text-teal-300'
                          : 'bg-stone-100 text-stone-700 border border-stone-200'
                      }`}
                    >
                      {isPopular && <Sparkles className="w-3 h-3" />}
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-stone-900">{plan.name}</h3>
                  <p className="text-xs text-stone-500 mt-1 min-h-[36px]">{plan.tagline}</p>

                  {/* Price */}
                  <div className="mt-5 pb-5 border-b border-stone-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-extrabold text-stone-900 font-display">
                        ${priceToDisplay}
                      </span>
                      <span className="text-xs text-stone-500 font-medium">/ month</span>
                    </div>
                    {billingInterval === 'annual' && plan.annualBilledTotal > 0 && (
                      <span className="text-[11px] text-teal-800 font-semibold block mt-1">
                        Billed annually (${plan.annualBilledTotal}/yr)
                      </span>
                    )}
                    {billingInterval === 'monthly' && plan.monthlyPrice > 0 && (
                      <span className="text-[11px] text-stone-400 block mt-1">
                        Billed month-to-month, cancel anytime
                      </span>
                    )}
                    {plan.monthlyPrice === 0 && (
                      <span className="text-[11px] text-stone-400 block mt-1">
                        14-day full feature trial, no credit card required
                      </span>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="py-6 space-y-3">
                    <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                      Included in this plan:
                    </span>
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-stone-700 leading-snug">
                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${isPopular ? 'text-teal-800' : 'text-stone-500'}`} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-4 border-t border-stone-100">
                  <button
                    onClick={() => onSelectPlan(plan.id as any, billingInterval)}
                    className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isPopular
                        ? 'bg-stone-900 hover:bg-stone-800 text-white shadow-xs'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-200'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security & FAQ strip */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-stone-200 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-stone-600">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-teal-800 shrink-0" />
            <div>
              <span className="font-bold text-stone-900 block">Stripe 256-Bit Encrypted Payments</span>
              <span>All biometric data is encrypted at rest. No personal telemetry is sold to third parties or insurance providers.</span>
            </div>
          </div>

          <div className="flex items-center gap-6 shrink-0 text-stone-500 font-medium">
            <span>✓ 30-day money-back guarantee</span>
            <span>✓ Instant device activation</span>
            <span>✓ Cancel anytime</span>
          </div>
        </div>

      </div>
    </section>
  );
};
