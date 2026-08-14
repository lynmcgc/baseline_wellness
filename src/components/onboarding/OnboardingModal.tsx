import React, { useState } from 'react';
import { X, Check, Sparkles, ArrowRight, ShieldCheck, Watch, CircleDot, Activity, HeartPulse, Zap, Crown } from 'lucide-react';
import { UserGoal, WearableBrand, SubscriptionTier, UserProfile } from '../../types';
import { GOAL_HERO_PRESETS, AVAILABLE_WEARABLES } from '../../data/mockMetrics';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (profile: Partial<UserProfile>) => void;
  initialGoal?: UserGoal;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  initialGoal = 'training_load',
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedGoal, setSelectedGoal] = useState<UserGoal>(initialGoal);
  const [selectedWearables, setSelectedWearables] = useState<WearableBrand[]>(['garmin', 'oura']);
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier>('pro');
  const [userName, setUserName] = useState<string>('Alex Morgan');
  const [userEmail, setUserEmail] = useState<string>('alex.morgan@example.com');
  const [isSimulatingSync, setIsSimulatingSync] = useState(false);

  if (!isOpen) return null;

  const toggleWearable = (brand: WearableBrand) => {
    setSelectedWearables((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setIsSimulatingSync(true);
      setTimeout(() => {
        setIsSimulatingSync(false);
        setStep(3);
      }, 700);
    } else if (step === 3) {
      const preset = GOAL_HERO_PRESETS[selectedGoal];
      onComplete({
        name: userName || 'Wellness Member',
        email: userEmail || 'member@example.com',
        goal: selectedGoal,
        tier: selectedTier,
        connectedWearables: selectedWearables,
        heroMetricIds: preset.defaultHeroIds,
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white border border-stone-200 rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800">
              <span>Step {step} of 3</span>
              <span className="text-stone-300">·</span>
              <span>
                {step === 1 && 'Define Your Primary Focus'}
                {step === 2 && 'Connect Wearable Hardware'}
                {step === 3 && 'Choose Your Membership Plan'}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-stone-900 mt-1">
              {step === 1 && 'What biometric goal are you optimizing for?'}
              {step === 2 && 'Select your active wearable devices'}
              {step === 3 && 'Unlock Your Personalized Baseline'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-stone-200/70 hover:bg-stone-200 text-stone-600 hover:text-stone-900 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Indicators */}
        <div className="w-full bg-stone-200 h-1">
          <div
            className="bg-teal-700 h-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* STEP 1: GOAL SELECTION */}
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-stone-600 font-normal">
                Your selected goal configures which hero metrics, autonomic recovery weights, and community cohorts appear front-and-center on your dashboard. (You can customize this anytime).
              </p>

              <div className="grid grid-cols-1 gap-3">
                {(Object.keys(GOAL_HERO_PRESETS) as UserGoal[]).map((goalKey) => {
                  const info = GOAL_HERO_PRESETS[goalKey];
                  const isSelected = selectedGoal === goalKey;
                  return (
                    <div
                      key={goalKey}
                      onClick={() => setSelectedGoal(goalKey)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        isSelected
                          ? 'bg-teal-50/70 border-teal-600 shadow-xs'
                          : 'bg-stone-50 border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center mt-0.5 shrink-0 ${
                          isSelected
                            ? 'border-teal-700 bg-teal-700 text-white'
                            : 'border-stone-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold text-stone-900">{info.label}</h4>
                        <p className="text-xs text-stone-600 leading-relaxed font-normal">{info.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: CONNECT WEARABLES */}
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-stone-600 font-normal">
                Select any devices you currently use. Baseline's normalization engine will combine multi-device streams without creating duplicate strain or conflicting sleep scores.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {AVAILABLE_WEARABLES.map((dev) => {
                  const isChecked = selectedWearables.includes(dev.id);
                  return (
                    <div
                      key={dev.id}
                      onClick={() => toggleWearable(dev.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isChecked
                          ? 'bg-teal-50/70 border-teal-600 text-stone-900'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center text-teal-800">
                          {dev.id === 'garmin' && <Watch className="w-4 h-4" />}
                          {dev.id === 'oura' && <CircleDot className="w-4 h-4" />}
                          {dev.id === 'apple_health' && <Activity className="w-4 h-4" />}
                          {dev.id === 'whoop' && <HeartPulse className="w-4 h-4" />}
                          {dev.id === 'fitbit' && <Zap className="w-4 h-4" />}
                          {(dev.id === 'polar' || dev.id === 'coros') && <Activity className="w-4 h-4" />}
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-semibold text-stone-900">{dev.name}</h4>
                          <span className="text-[11px] text-stone-500 font-normal">{dev.category}</span>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                          isChecked
                            ? 'border-teal-700 bg-teal-700 text-white'
                            : 'border-stone-300 bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 flex items-center gap-2.5 font-normal">
                <ShieldCheck className="w-4 h-4 text-teal-800 shrink-0" />
                <span>Read-only biometric ingestion via standard OAuth 2.0 PKCE protocol.</span>
              </div>
            </div>
          )}

          {/* STEP 3: TIER REVEAL & SUBSCRIPTION */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-900 flex items-center gap-2 font-medium">
                <Sparkles className="w-4 h-4 text-teal-800 shrink-0" />
                <span>All plans include a 14-day free trial. Cancel anytime with zero lock-in.</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                
                {/* Free Explorer Tier */}
                <div
                  onClick={() => setSelectedTier('free')}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    selectedTier === 'free'
                      ? 'bg-white border-stone-900 shadow-sm ring-1 ring-stone-900'
                      : 'bg-stone-50 border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">Baseline Explorer</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-stone-900">$0</span>
                      <span className="text-xs text-stone-500">/mo</span>
                    </div>
                    <p className="text-xs text-stone-600 font-normal">Essential biometric unification.</p>
                    
                    <ul className="text-xs text-stone-600 space-y-1.5 pt-2 border-t border-stone-200 font-normal">
                      <li className="flex items-center gap-1.5">✓ 2 Wearables sync</li>
                      <li className="flex items-center gap-1.5">✓ Daily Readiness Score</li>
                      <li className="flex items-center gap-1.5">✓ 7-Day Trend history</li>
                      <li className="flex items-center gap-1.5 text-stone-400">✕ Advanced Correlation AI</li>
                    </ul>
                  </div>
                </div>

                {/* Pro Tier (Popular) */}
                <div
                  onClick={() => setSelectedTier('pro')}
                  className={`p-4 rounded-xl border relative transition-all cursor-pointer flex flex-col justify-between ${
                    selectedTier === 'pro'
                      ? 'bg-teal-50/50 border-teal-700 shadow-sm ring-1 ring-teal-700'
                      : 'bg-stone-50 border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="absolute -top-2.5 right-3 bg-stone-900 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-xs">
                    Recommended
                  </div>
                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-800 flex items-center gap-1">
                      <Crown className="w-3 h-3" /> Bio-Sync Member
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-stone-900">$18</span>
                      <span className="text-xs text-stone-500">/mo</span>
                    </div>
                    <p className="text-xs text-stone-600 font-normal">Complete plain-language insights & community classes.</p>
                    
                    <ul className="text-xs text-stone-700 space-y-1.5 pt-2 border-t border-stone-200 font-normal">
                      <li className="flex items-center gap-1.5 text-teal-900 font-medium">✓ Unlimited wearables</li>
                      <li className="flex items-center gap-1.5">✓ Plain-Language Synthesis</li>
                      <li className="flex items-center gap-1.5">✓ 90-day baseline engine</li>
                      <li className="flex items-center gap-1.5">✓ Live & On-demand classes</li>
                      <li className="flex items-center gap-1.5">✓ Cohort Challenges</li>
                    </ul>
                  </div>
                </div>

                {/* Elite Science Performance Tier */}
                <div
                  onClick={() => setSelectedTier('elite')}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    selectedTier === 'elite'
                      ? 'bg-white border-teal-800 shadow-sm ring-1 ring-teal-800'
                      : 'bg-stone-50 border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-700">Elite Performance</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-stone-900">$39</span>
                      <span className="text-xs text-stone-500">/mo</span>
                    </div>
                    <p className="text-xs text-stone-600 font-normal">Deep correlation & 1-on-1 physiologist consult.</p>
                    
                    <ul className="text-xs text-stone-600 space-y-1.5 pt-2 border-t border-stone-200 font-normal">
                      <li className="flex items-center gap-1.5">✓ Everything in Pro</li>
                      <li className="flex items-center gap-1.5">✓ Raw Biomarker Exports</li>
                      <li className="flex items-center gap-1.5">✓ Monthly Physiologist Q&A</li>
                      <li className="flex items-center gap-1.5">✓ VIP cohort access</li>
                    </ul>
                  </div>
                </div>

              </div>

              {/* Profile Inputs */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Your Name</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-teal-700"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-teal-700"
                    placeholder="name@example.com"
                  />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep((prev) => (prev - 1) as 1 | 2)}
              className="text-xs font-semibold text-stone-500 hover:text-stone-900 px-3 py-2 transition-colors cursor-pointer"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleNextStep}
            disabled={isSimulatingSync || (step === 2 && selectedWearables.length === 0)}
            className="bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSimulatingSync ? (
              <span>Syncing device streams...</span>
            ) : step === 3 ? (
              <span>Start 14-Day Free Trial</span>
            ) : (
              <>
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
