import React, { useState } from 'react';
import { X, Check, Lock, CreditCard, AlertCircle, RefreshCw, KeyRound } from 'lucide-react';
import { PRICING_PLANS } from '../../data/pricingData';
import { submitCheckoutPayment } from '../../utils/geminiApi';
import { useLanguage } from '../../context/LanguageContext';

interface PaymentPageModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlanId?: 'starter' | 'pro' | 'family';
  initialInterval?: 'monthly' | 'annual';
  onPaymentSuccess?: (tier: 'starter' | 'pro' | 'family') => void;
}

export const PaymentPageModal: React.FC<PaymentPageModalProps> = ({
  isOpen,
  onClose,
  initialPlanId = 'pro',
  initialInterval = 'annual',
  onPaymentSuccess,
}) => {
  const { tText } = useLanguage();
  const [selectedPlanId, setSelectedPlanId] = useState<'starter' | 'pro' | 'family'>(initialPlanId);
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'annual'>(initialInterval);

  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardZip, setCardZip] = useState('94107');
  const [fullName, setFullName] = useState('Alex Morgan');
  const [email, setEmail] = useState('alex.morgan@example.com');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentPlan = PRICING_PLANS.find((p) => p.id === selectedPlanId) || PRICING_PLANS[1];

  const basePrice = billingInterval === 'annual'
    ? currentPlan.annualBilledTotal
    : currentPlan.monthlyPrice;

  const finalTotal = Math.max(0, basePrice - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'BASELINE20' || promoCode.trim().toUpperCase() === 'BIOHACK') {
      const discount = Math.round(basePrice * 0.2);
      setDiscountAmount(discount);
      setPromoApplied(true);
      setErrorMessage(null);
    } else {
      setErrorMessage(tText('Invalid coupon code. Try BASELINE20 for 20% off.'));
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const result = await submitCheckoutPayment({
        planId: selectedPlanId,
        interval: billingInterval,
        customerName: fullName,
        customerEmail: email,
      });

      if (result.success) {
        setIsSuccess(true);
        setTimeout(() => {
          onPaymentSuccess?.(selectedPlanId);
        }, 1200);
      } else {
        setErrorMessage(result.message || 'Payment failed. Please review your card details.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Payment service communication error.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-stone-900 text-white flex items-center justify-center">
              <Lock className="w-4 h-4 text-teal-300" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900">{tText('Baseline Wellness Membership Checkout')}</h2>
              <p className="text-[11px] text-stone-500">{tText('256-Bit SSL Encrypted · Stripe Hosted Infrastructure')}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-stone-200/80 hover:bg-stone-300 text-stone-600 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {isSuccess ? (
            <div className="py-12 text-center max-w-md mx-auto space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-stone-900 font-display">
                {tText('Welcome to')} {currentPlan.name}!
              </h3>
              <p className="text-sm text-stone-600">
                {tText('Your subscription is active. All premium biometric analytics, physiological coach briefings, and multi-wearable syntheses have been unlocked for your account.')}
              </p>
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 text-left space-y-1">
                <div><strong>Subscription:</strong> {currentPlan.name} ({billingInterval})</div>
                <div><strong>Account:</strong> {email}</div>
                <div><strong>Next Renewal:</strong> 1 {billingInterval === 'annual' ? 'year' : 'month'} from today</div>
              </div>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm transition-colors cursor-pointer"
              >
                {tText('Return to Member Hub')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Plan Selector & Breakdown */}
              <div className="lg:col-span-5 space-y-5">
                <div>
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-2">
                    {tText('1. Choose Plan Tier')}
                  </span>
                  
                  <div className="space-y-2.5">
                    {PRICING_PLANS.map((plan) => (
                      <div
                        key={plan.id}
                        onClick={() => setSelectedPlanId(plan.id as any)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                          selectedPlanId === plan.id
                            ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                            : 'bg-stone-50 border-stone-200 hover:border-stone-300 text-stone-800'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            selectedPlanId === plan.id ? 'border-teal-400 bg-teal-400' : 'border-stone-400'
                          }`}>
                            {selectedPlanId === plan.id && <div className="w-1.5 h-1.5 rounded-full bg-stone-950" />}
                          </div>
                          <div>
                            <div className="text-xs font-bold">{plan.name}</div>
                            <div className={`text-[10px] ${selectedPlanId === plan.id ? 'text-stone-300' : 'text-stone-500'}`}>
                              {plan.badge}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-sm font-extrabold font-display">
                            ${billingInterval === 'annual' ? plan.annualMonthlyPrice : plan.monthlyPrice}
                          </span>
                          <span className={`text-[10px] block ${selectedPlanId === plan.id ? 'text-stone-400' : 'text-stone-500'}`}>
                            / mo
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Billing Interval Toggle */}
                <div>
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-2">
                    {tText('2. Billing Frequency')}
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setBillingInterval('annual')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center transition-all cursor-pointer ${
                        billingInterval === 'annual'
                          ? 'bg-teal-50 border-teal-300 text-teal-950 shadow-2xs'
                          : 'bg-stone-50 border-stone-200 text-stone-600'
                      }`}
                    >
                      <span>Annual (Save 20%)</span>
                      <span className="text-[10px] text-teal-700 font-normal mt-0.5">Billed yearly</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setBillingInterval('monthly')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center transition-all cursor-pointer ${
                        billingInterval === 'monthly'
                          ? 'bg-teal-50 border-teal-300 text-teal-950 shadow-2xs'
                          : 'bg-stone-50 border-stone-200 text-stone-600'
                      }`}
                    >
                      <span>Monthly</span>
                      <span className="text-[10px] text-stone-500 font-normal mt-0.5">Cancel anytime</span>
                    </button>
                  </div>
                </div>

                {/* Summary Box */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>{currentPlan.name} ({billingInterval})</span>
                    <span>${basePrice}.00</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-teal-800 font-medium">
                      <span>Promo Discount (20% Off)</span>
                      <span>-${discountAmount}.00</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-bold text-stone-900">
                    <span>Total Due Today</span>
                    <span className="text-base text-stone-950 font-display">${finalTotal}.00</span>
                  </div>
                </div>

                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code (e.g. BASELINE20)"
                    className="flex-1 text-xs px-3 py-2 rounded-xl border border-stone-200 bg-white uppercase font-mono"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

              </div>

              {/* Right Column: Card Details & Checkout */}
              <div className="lg:col-span-7 space-y-5">
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                  {tText('3. Payment Details')}
                </span>

                {/* Express Checkout Options */}
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setIsProcessing(true);
                      setTimeout(() => {
                        setIsProcessing(false);
                        setIsSuccess(true);
                        onPaymentSuccess?.(selectedPlanId);
                      }, 1000);
                    }}
                    className="py-2.5 px-3 rounded-xl bg-black text-white text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-stone-800 cursor-pointer shadow-xs"
                  >
                    <span>Pay with Apple Pay</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsProcessing(true);
                      setTimeout(() => {
                        setIsProcessing(false);
                        setIsSuccess(true);
                        onPaymentSuccess?.(selectedPlanId);
                      }, 1000);
                    }}
                    className="py-2.5 px-3 rounded-xl bg-white border border-stone-300 text-stone-800 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-stone-50 cursor-pointer shadow-xs"
                  >
                    <span>Google Pay</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 text-stone-300">
                  <div className="flex-1 h-px bg-stone-200" />
                  <span className="text-[10px] uppercase font-bold text-stone-400">Or Pay with Card</span>
                  <div className="flex-1 h-px bg-stone-200" />
                </div>

                <form onSubmit={handleCheckout} className="space-y-4">
                  <div>
                    <label className="text-[11px] font-medium text-stone-600 block mb-1">
                      Account Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white text-stone-900 focus:ring-1 focus:ring-teal-700 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-stone-600 block mb-1">
                      Cardholder Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white text-stone-900 focus:ring-1 focus:ring-teal-700 focus:outline-none"
                    />
                  </div>

                  {/* Card details */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-medium text-stone-600 block">
                      Card Number
                    </label>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="•••• •••• •••• 4242"
                        className="w-full text-xs pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-200 bg-white text-stone-900 font-mono focus:ring-1 focus:ring-teal-700 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM / YY"
                        className="text-xs px-3 py-2.5 rounded-xl border border-stone-200 bg-white text-stone-900 text-center font-mono focus:ring-1 focus:ring-teal-700 focus:outline-none"
                      />
                      <input
                        type="password"
                        required
                        maxLength={4}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="CVC"
                        className="text-xs px-3 py-2.5 rounded-xl border border-stone-200 bg-white text-stone-900 text-center font-mono focus:ring-1 focus:ring-teal-700 focus:outline-none"
                      />
                      <input
                        type="text"
                        required
                        value={cardZip}
                        onChange={(e) => setCardZip(e.target.value)}
                        placeholder="ZIP"
                        className="text-xs px-3 py-2.5 rounded-xl border border-stone-200 bg-white text-stone-900 text-center font-mono focus:ring-1 focus:ring-teal-700 focus:outline-none"
                      />
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-3.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60 shadow-sm"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-teal-300" />
                        <span>{tText('Verifying Card with Stripe...')}</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 text-teal-300" />
                        <span>{tText('Complete Secure Checkout')} (${finalTotal}.00)</span>
                      </>
                    )}
                  </button>
                </form>

                {/* API Placeholder & Integration transparency notice */}
                <div className="p-3 rounded-xl bg-stone-100/80 border border-stone-200 text-[11px] text-stone-600 flex items-start gap-2">
                  <KeyRound className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <strong>Stripe API Credentials:</strong> In production, billing requests route through the backend using <code className="bg-white px-1 rounded border border-stone-200 text-stone-800 font-mono">STRIPE_SECRET_KEY</code>.
                  </div>
                </div>

              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
