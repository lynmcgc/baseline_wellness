import React, { useState } from 'react';
import { 
  X, 
  Users, 
  Watch, 
  CircleDot, 
  Activity, 
  Sliders, 
  HeartPulse, 
  Bell, 
  AlertTriangle,
  Info,
  Check
} from 'lucide-react';
import { 
  FamilyMember, 
  FamilyRelationship, 
  FamilyAccessLevel, 
  FamilyAlertThresholds, 
  WearableBrand,
  MetricDefinition
} from '../../types';

interface AddFamilyMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFamilyMember: (newMember: FamilyMember) => void;
}

export const AddFamilyMemberModal: React.FC<AddFamilyMemberModalProps> = ({
  isOpen,
  onClose,
  onAddFamilyMember,
}) => {
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState<FamilyRelationship>('Parent');
  const [email, setEmail] = useState('');
  const [accessLevel, setAccessLevel] = useState<FamilyAccessLevel>('view_and_alerts');
  const [selectedWearables, setSelectedWearables] = useState<WearableBrand[]>(['apple_health']);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [notes, setNotes] = useState('');
  const [simulateLowMetricOnAdd, setSimulateLowMetricOnAdd] = useState(false);

  // Custom alert thresholds
  const [thresholds, setThresholds] = useState<FamilyAlertThresholds>({
    lowReadiness: 60,
    lowHrv: 35,
    highRestingHr: 75,
    lowSleep: 6.0,
    lowSpo2: 94,
    highDaytimeStress: 65,
  });

  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);

  if (!isOpen) return null;

  const toggleWearable = (brand: WearableBrand) => {
    setSelectedWearables((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleCreate = () => {
    if (!name.trim()) return;

    const memberId = `fam-${Date.now()}`;
    const avatarColors = [
      'bg-teal-100 text-teal-800 border-teal-200',
      'bg-rose-100 text-rose-800 border-rose-200',
      'bg-amber-100 text-amber-800 border-amber-200',
      'bg-indigo-100 text-indigo-800 border-indigo-200',
      'bg-emerald-100 text-emerald-800 border-emerald-200',
    ];
    const avatarColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

    // Generate starter metrics for new member
    const initialReadiness = simulateLowMetricOnAdd ? 54 : 82;
    const initialHrv = simulateLowMetricOnAdd ? 28 : 62;
    const initialSleep = simulateLowMetricOnAdd ? 4.9 : 7.4;
    const initialRhr = simulateLowMetricOnAdd ? 79 : 56;
    const initialStress = simulateLowMetricOnAdd ? 69 : 34;

    const generatedMetrics: MetricDefinition[] = [
      {
        id: 'recovery_score',
        title: 'Daily Readiness & Vitality',
        category: 'recovery',
        unit: '/100',
        currentValue: initialReadiness,
        baselineValue: 75,
        status: simulateLowMetricOnAdd ? 'depleted' : 'optimal',
        changePercentage: simulateLowMetricOnAdd ? -28.0 : 9.3,
        plainLanguageInsight: simulateLowMetricOnAdd
          ? `${name}'s recovery score dropped below nominal threshold due to fragmented sleep architecture.`
          : `${name} has balanced autonomic recovery and strong cardiovascular reserve today.`,
        scientificContext: 'Calculated from 7-day weighted rolling average of nocturnal rMSSD and basal resting HR.',
        actionableGuidance: simulateLowMetricOnAdd
          ? 'Encourage rest and moderate activity today.'
          : 'Normal daily active routine supported.',
        historicalTrend: [
          { date: 'Mon', value: 76, baseline: 75 },
          { date: 'Tue', value: 74, baseline: 75 },
          { date: 'Wed', value: 72, baseline: 75 },
          { date: 'Thu', value: 68, baseline: 75 },
          { date: 'Fri', value: 65, baseline: 75 },
          { date: 'Sat', value: 60, baseline: 75 },
          { date: 'Sun', value: initialReadiness, baseline: 75 },
        ],
        icon: 'Sparkles',
      },
      {
        id: 'hrv_rmssd',
        title: 'Overnight HRV (rMSSD)',
        category: 'recovery',
        unit: 'ms',
        currentValue: initialHrv,
        baselineValue: 45,
        status: simulateLowMetricOnAdd ? 'depleted' : 'optimal',
        changePercentage: simulateLowMetricOnAdd ? -37.7 : 37.7,
        plainLanguageInsight: simulateLowMetricOnAdd
          ? `HRV is below the ${thresholds.lowHrv} ms threshold, indicating sympathetic autonomic strain.`
          : `HRV is steady and indicates robust vagal parasympathetic modulation.`,
        scientificContext: 'Root mean square of successive differences during slow-wave sleep.',
        actionableGuidance: simulateLowMetricOnAdd
          ? 'Hydration and light restorative breathing recommended.'
          : 'Physical resilience is optimal.',
        historicalTrend: [
          { date: 'Mon', value: 48, baseline: 45 },
          { date: 'Tue', value: 46, baseline: 45 },
          { date: 'Wed', value: 44, baseline: 45 },
          { date: 'Thu', value: 42, baseline: 45 },
          { date: 'Fri', value: 38, baseline: 45 },
          { date: 'Sat', value: 33, baseline: 45 },
          { date: 'Sun', value: initialHrv, baseline: 45 },
        ],
        icon: 'Activity',
      },
      {
        id: 'sleep_restorative',
        title: 'Restorative Sleep Duration',
        category: 'sleep',
        unit: 'hrs',
        currentValue: initialSleep,
        baselineValue: 7.0,
        status: simulateLowMetricOnAdd ? 'depleted' : 'optimal',
        changePercentage: simulateLowMetricOnAdd ? -30.0 : 5.7,
        plainLanguageInsight: simulateLowMetricOnAdd
          ? `Logged ${initialSleep} hrs of sleep, falling below your ${thresholds.lowSleep} hrs alert setting.`
          : `Logged ${initialSleep} hrs of restful sleep with healthy Deep and REM distribution.`,
        scientificContext: 'Combined Stage 3 Deep Sleep and Stage 4 REM durations.',
        actionableGuidance: simulateLowMetricOnAdd
          ? 'Suggest earlier wind-down tonight.'
          : 'Sleep schedule in sync.',
        historicalTrend: [
          { date: 'Mon', value: 7.2, baseline: 7.0 },
          { date: 'Tue', value: 7.0, baseline: 7.0 },
          { date: 'Wed', value: 6.8, baseline: 7.0 },
          { date: 'Thu', value: 6.5, baseline: 7.0 },
          { date: 'Fri', value: 6.0, baseline: 7.0 },
          { date: 'Sat', value: 5.5, baseline: 7.0 },
          { date: 'Sun', value: initialSleep, baseline: 7.0 },
        ],
        icon: 'Moon',
      },
      {
        id: 'resting_hr',
        title: 'Basal Resting Heart Rate',
        category: 'vitals',
        unit: 'bpm',
        currentValue: initialRhr,
        baselineValue: 60,
        status: simulateLowMetricOnAdd ? 'elevated' : 'optimal',
        changePercentage: simulateLowMetricOnAdd ? 31.6 : -6.6,
        plainLanguageInsight: simulateLowMetricOnAdd
          ? `Resting pulse reached ${initialRhr} bpm, triggering your threshold alert of ${thresholds.highRestingHr} bpm.`
          : `Resting heart rate remained calm and steady at ${initialRhr} bpm.`,
        scientificContext: 'Lowest sustained 10-minute nocturnal heart rate.',
        actionableGuidance: simulateLowMetricOnAdd
          ? 'Monitor for any physical discomfort or stress.'
          : 'Cardiovascular resting state normal.',
        historicalTrend: [
          { date: 'Mon', value: 60, baseline: 60 },
          { date: 'Tue', value: 61, baseline: 60 },
          { date: 'Wed', value: 63, baseline: 60 },
          { date: 'Thu', value: 68, baseline: 60 },
          { date: 'Fri', value: 72, baseline: 60 },
          { date: 'Sat', value: 76, baseline: 60 },
          { date: 'Sun', value: initialRhr, baseline: 60 },
        ],
        icon: 'HeartPulse',
      },
      {
        id: 'stress_load',
        title: 'Daytime Autonomic Stress',
        category: 'stress',
        unit: '/100',
        currentValue: initialStress,
        baselineValue: 40,
        status: simulateLowMetricOnAdd ? 'moderate' : 'restorative',
        changePercentage: simulateLowMetricOnAdd ? 72.5 : -15.0,
        plainLanguageInsight: simulateLowMetricOnAdd
          ? `Daytime stress indicators are moderately elevated.`
          : `Daytime stress indicators are low with rapid parasympathetic recovery.`,
        scientificContext: 'Continuous autonomic balance derived from HRV LF/HF ratio shifts.',
        actionableGuidance: 'Balanced recovery protocols supported.',
        historicalTrend: [
          { date: 'Mon', value: 38, baseline: 40 },
          { date: 'Tue', value: 40, baseline: 40 },
          { date: 'Wed', value: 42, baseline: 40 },
          { date: 'Thu', value: 50, baseline: 40 },
          { date: 'Fri', value: 55, baseline: 40 },
          { date: 'Sat', value: 62, baseline: 40 },
          { date: 'Sun', value: initialStress, baseline: 40 },
        ],
        icon: 'ShieldAlert',
      },
    ];

    const activeAlerts = simulateLowMetricOnAdd && accessLevel !== 'view_only' ? [
      {
        id: `alert-${Date.now()}-1`,
        familyMemberId: memberId,
        familyMemberName: name,
        relationship: relationship,
        metricId: 'hrv_rmssd',
        metricName: 'Overnight Heart Rate Variability (HRV)',
        severity: 'critical' as const,
        currentValue: initialHrv,
        threshold: thresholds.lowHrv,
        unit: 'ms',
        message: `Overnight HRV dropped to ${initialHrv} ms, below your configured alert threshold of ${thresholds.lowHrv} ms.`,
        timestamp: 'Just now',
        isAcknowledged: false,
        actionSuggested: `Consider reaching out to ${name} to check how they are resting today.`,
      },
      {
        id: `alert-${Date.now()}-2`,
        familyMemberId: memberId,
        familyMemberName: name,
        relationship: relationship,
        metricId: 'sleep_restorative',
        metricName: 'Restorative Sleep Duration',
        severity: 'warning' as const,
        currentValue: initialSleep,
        threshold: thresholds.lowSleep,
        unit: 'hrs',
        message: `Logged ${initialSleep} hrs of sleep (below ${thresholds.lowSleep} hrs alert setting).`,
        timestamp: 'Just now',
        isAcknowledged: false,
        actionSuggested: `Recommend gentle hydration and early bedtime.`,
      }
    ] : [];

    const newMember: FamilyMember = {
      id: memberId,
      name,
      relationship,
      avatarColor,
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@family.wellness`,
      accessLevel,
      connectedWearables: selectedWearables.length > 0 ? selectedWearables : ['apple_health'],
      readinessScore: initialReadiness,
      readinessStatus: simulateLowMetricOnAdd ? 'depleted' : 'optimal',
      lastSync: 'Just now',
      alertThresholds: thresholds,
      metrics: generatedMetrics,
      activeAlerts,
      notificationsEnabled,
      notes,
    };

    onAddFamilyMember(newMember);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white border border-stone-200 rounded-3xl shadow-xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-800 shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-stone-900">
                  Add Family Profile & Alert Access
                </h2>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800">
                  Family Circle
                </span>
              </div>
              <p className="text-xs text-stone-500 font-normal mt-0.5">
                Share biometric dashboards & receive proactive alerts for low vitals
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 flex items-center justify-center transition-colors cursor-pointer"
            id="close-add-family-modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Tabs */}
        <div className="flex items-center border-b border-stone-200 bg-stone-50/50 px-6 py-2.5 text-xs font-medium gap-6">
          <button
            onClick={() => setActiveStep(1)}
            className={`flex items-center gap-2 transition-colors cursor-pointer ${
              activeStep === 1 ? 'text-teal-800 font-bold border-b-2 border-teal-800 pb-1 -mb-3' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center text-[11px] font-bold">1</span>
            Profile Details
          </button>

          <button
            onClick={() => setActiveStep(2)}
            className={`flex items-center gap-2 transition-colors cursor-pointer ${
              activeStep === 2 ? 'text-teal-800 font-bold border-b-2 border-teal-800 pb-1 -mb-3' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center text-[11px] font-bold">2</span>
            Access & Wearables
          </button>

          <button
            onClick={() => setActiveStep(3)}
            className={`flex items-center gap-2 transition-colors cursor-pointer ${
              activeStep === 3 ? 'text-teal-800 font-bold border-b-2 border-teal-800 pb-1 -mb-3' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center text-[11px] font-bold">3</span>
            Low Health Alert Thresholds
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* STEP 1: Basic Profile */}
          {activeStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-900 mb-1.5">
                  Family Member's Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Eleanor Morgan, David, or Sarah"
                  className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-teal-800 focus:ring-1 focus:ring-teal-800"
                  id="family-member-name-input"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-900 mb-1.5">
                    Relationship
                  </label>
                  <select
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value as FamilyRelationship)}
                    className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-teal-800 cursor-pointer"
                  >
                    <option value="Parent">Parent (Mother / Father)</option>
                    <option value="Spouse / Partner">Spouse / Partner</option>
                    <option value="Child">Child (Son / Daughter)</option>
                    <option value="Elder">Elder / Grandparent</option>
                    <option value="Sibling">Sibling (Brother / Sister)</option>
                    <option value="Other">Other Family / Close Circle</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-900 mb-1.5">
                    Email / Invite Handle
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-teal-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-900 mb-1.5">
                  Wellness Context / Health Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Managing sleep quality, recovering from marathon training, or monitoring resting heart rate stability..."
                  rows={2}
                  className="w-full bg-white border border-stone-200 rounded-xl p-3 text-xs text-stone-900 focus:outline-none focus:border-teal-800"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200 text-stone-700 flex items-start gap-3">
                <Info className="w-4 h-4 text-teal-800 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="font-semibold text-teal-900">Privacy & Consent Protection</p>
                  <p className="text-[11px] text-stone-600 font-normal">
                    Family sharing operates under mutual consent. Both parties maintain granular controls to pause or revoke biometric visibility at any time.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Access Permissions & Wearables */}
          {activeStep === 2 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-stone-900 mb-2">
                  Select Permission & Alert Access Level
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setAccessLevel('view_and_alerts')}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      accessLevel === 'view_and_alerts'
                        ? 'bg-teal-50/80 border-teal-800 shadow-xs ring-1 ring-teal-800'
                        : 'bg-white border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                          <Bell className="w-3.5 h-3.5 text-teal-800" />
                          View & Alerts
                        </span>
                        {accessLevel === 'view_and_alerts' && <Check className="w-3.5 h-3.5 text-teal-800" />}
                      </div>
                      <p className="text-[11px] text-stone-600 font-normal leading-snug">
                        Full access to view stats + instant push/inbox alerts if health metrics drop.
                      </p>
                    </div>
                    <span className="text-[10px] font-semibold text-teal-800 mt-2 block">
                      Recommended
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAccessLevel('view_only')}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      accessLevel === 'view_only'
                        ? 'bg-teal-50/80 border-teal-800 shadow-xs ring-1 ring-teal-800'
                        : 'bg-white border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-stone-900 text-xs">View Only</span>
                        {accessLevel === 'view_only' && <Check className="w-3.5 h-3.5 text-teal-800" />}
                      </div>
                      <p className="text-[11px] text-stone-600 font-normal leading-snug">
                        Browse dashboards and recovery scores without automated alert triggers.
                      </p>
                    </div>
                    <span className="text-[10px] font-semibold text-stone-500 mt-2 block">
                      Passive View
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAccessLevel('alerts_only')}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      accessLevel === 'alerts_only'
                        ? 'bg-teal-50/80 border-teal-800 shadow-xs ring-1 ring-teal-800'
                        : 'bg-white border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-stone-900 text-xs">Alerts Only</span>
                        {accessLevel === 'alerts_only' && <Check className="w-3.5 h-3.5 text-teal-800" />}
                      </div>
                      <p className="text-[11px] text-stone-600 font-normal leading-snug">
                        Receive low metric notification triggers without full historical charts.
                      </p>
                    </div>
                    <span className="text-[10px] font-semibold text-stone-500 mt-2 block">
                      Minimalist
                    </span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-900 mb-2">
                  Connected Wearables & Data Streams
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'apple_health' as WearableBrand, name: 'Apple Watch / Health', icon: Activity },
                    { id: 'oura' as WearableBrand, name: 'Oura Ring', icon: CircleDot },
                    { id: 'garmin' as WearableBrand, name: 'Garmin Connect', icon: Watch },
                    { id: 'whoop' as WearableBrand, name: 'WHOOP 4.0', icon: HeartPulse },
                    { id: 'fitbit' as WearableBrand, name: 'Fitbit / Pixel', icon: Activity },
                    { id: 'polar' as WearableBrand, name: 'Polar Flow', icon: Watch },
                  ].map((dev) => {
                    const isChecked = selectedWearables.includes(dev.id);
                    const Icon = dev.icon;
                    return (
                      <button
                        key={dev.id}
                        type="button"
                        onClick={() => toggleWearable(dev.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                          isChecked
                            ? 'bg-teal-50 border-teal-700 text-stone-900 font-semibold'
                            : 'bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-300'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isChecked ? 'text-teal-800' : 'text-stone-400'}`} />
                        <span className="text-xs truncate">{dev.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationsEnabled}
                    onChange={(e) => setNotificationsEnabled(e.target.checked)}
                    className="w-4 h-4 text-teal-800 rounded border-stone-300 focus:ring-teal-800 cursor-pointer"
                  />
                  <div>
                    <span className="font-semibold text-stone-900 text-xs">Enable Real-Time Health Notifications</span>
                    <p className="text-[11px] text-stone-500 font-normal">
                      Receive in-app notification toasts and daily synthesis flags when vitals fluctuate.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* STEP 3: Configurable Low Health Metric Thresholds */}
          {activeStep === 3 && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-xs text-amber-900">Custom Alert Sensitivity</p>
                  <p className="text-[11px] text-amber-800 font-normal">
                    When any synchronized device records a reading below (or above) these thresholds, you will receive an immediate family notification.
                  </p>
                </div>
              </div>

              <div className="space-y-3.5">
                {/* 1. Low Readiness */}
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-stone-900 text-xs">Low Daily Readiness Score</span>
                    <span className="font-bold text-teal-800 text-xs">Below {thresholds.lowReadiness} / 100</span>
                  </div>
                  <input
                    type="range"
                    min={40}
                    max={75}
                    step={1}
                    value={thresholds.lowReadiness}
                    onChange={(e) => setThresholds({ ...thresholds, lowReadiness: Number(e.target.value) })}
                    className="w-full accent-teal-800 cursor-pointer"
                  />
                  <p className="text-[11px] text-stone-500 font-normal">Triggers when autonomic nervous system recovery is severely compromised.</p>
                </div>

                {/* 2. Low Overnight HRV */}
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-stone-900 text-xs">Low Overnight HRV (rMSSD)</span>
                    <span className="font-bold text-teal-800 text-xs">Below {thresholds.lowHrv} ms</span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={55}
                    step={1}
                    value={thresholds.lowHrv}
                    onChange={(e) => setThresholds({ ...thresholds, lowHrv: Number(e.target.value) })}
                    className="w-full accent-teal-800 cursor-pointer"
                  />
                  <p className="text-[11px] text-stone-500 font-normal">Notifies you if vagal nerve modulation drops significantly below nominal baseline.</p>
                </div>

                {/* 3. Elevated Resting HR */}
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-stone-900 text-xs">Elevated Basal Resting Heart Rate</span>
                    <span className="font-bold text-teal-800 text-xs">Above {thresholds.highRestingHr} bpm</span>
                  </div>
                  <input
                    type="range"
                    min={65}
                    max={95}
                    step={1}
                    value={thresholds.highRestingHr}
                    onChange={(e) => setThresholds({ ...thresholds, highRestingHr: Number(e.target.value) })}
                    className="w-full accent-teal-800 cursor-pointer"
                  />
                  <p className="text-[11px] text-stone-500 font-normal">Detects potential systemic strain, fever, or chronic cardiovascular fatigue.</p>
                </div>

                {/* 4. Low Sleep Duration */}
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-stone-900 text-xs">Low Sleep Duration</span>
                    <span className="font-bold text-teal-800 text-xs">Under {thresholds.lowSleep.toFixed(1)} hrs</span>
                  </div>
                  <input
                    type="range"
                    min={4.0}
                    max={7.5}
                    step={0.5}
                    value={thresholds.lowSleep}
                    onChange={(e) => setThresholds({ ...thresholds, lowSleep: Number(e.target.value) })}
                    className="w-full accent-teal-800 cursor-pointer"
                  />
                  <p className="text-[11px] text-stone-500 font-normal">Flags fragmented sleep cycles or early waking disruptions.</p>
                </div>
              </div>

              {/* Demo Simulator Toggle */}
              <div className="p-3.5 rounded-2xl bg-teal-50/60 border border-teal-200">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={simulateLowMetricOnAdd}
                    onChange={(e) => setSimulateLowMetricOnAdd(e.target.checked)}
                    className="w-4 h-4 text-teal-800 rounded border-stone-300 focus:ring-teal-800 cursor-pointer"
                  />
                  <div>
                    <span className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-teal-800" />
                      Simulate Low Metric Event Upon Creation (Test Alert Demo)
                    </span>
                    <p className="text-[11px] text-stone-600 font-normal">
                      Generates a live sample low recovery event (Readiness: 54, HRV: 28ms) to test alert banners and notification workflows.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
          {activeStep > 1 ? (
            <button
              type="button"
              onClick={() => setActiveStep((prev) => (prev - 1) as 1 | 2)}
              className="text-xs font-semibold text-stone-600 hover:text-stone-900 px-4 py-2 transition-colors cursor-pointer"
            >
              Back
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-semibold text-stone-500 hover:text-stone-800 px-4 py-2 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          )}

          {activeStep < 3 ? (
            <button
              type="button"
              disabled={activeStep === 1 && !name.trim()}
              onClick={() => setActiveStep((prev) => (prev + 1) as 2 | 3)}
              className="bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Step {activeStep + 1}
            </button>
          ) : (
            <button
              type="button"
              disabled={!name.trim()}
              onClick={handleCreate}
              className="bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
              id="confirm-add-family-btn"
            >
              <Users className="w-4 h-4" />
              <span>Add Family Member & Save Alerts</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
