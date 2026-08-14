import React, { useState } from 'react';
import { 
  Sparkles, 
  SlidersHorizontal, 
  RefreshCw, 
  ShieldCheck, 
  Watch, 
  CircleDot, 
  Activity, 
  HeartPulse,
  ArrowLeft,
  Sliders,
  AlertTriangle
} from 'lucide-react';
import { UserProfile, CommunityClass, UserGoal, FamilyMember, FamilyAlert, MetricDefinition } from '../../types';
import { ALL_METRICS, GOAL_HERO_PRESETS } from '../../data/mockMetrics';
import { DailySynthesisCard } from './DailySynthesisCard';
import { MetricCard } from './MetricCard';
import { CommunitySidebar } from './CommunitySidebar';
import { MetricSelectorModal } from './MetricSelectorModal';
import { UpsellModal } from './UpsellModal';
import { ClassPlayerModal } from '../community/ClassPlayerModal';
import { FamilyHealthHub } from '../family/FamilyHealthHub';
import { FamilyAlertBanner } from '../family/FamilyAlertBanner';
import { AddFamilyMemberModal } from '../family/AddFamilyMemberModal';
import { EditFamilyMemberModal } from '../family/EditFamilyMemberModal';
import { FamilyAlertsModal } from '../family/FamilyAlertsModal';

interface MemberDashboardProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onSwitchToLanding: () => void;
  activeViewingMemberId?: string | null;
  onSelectMemberToView?: (memberId: string | null) => void;
  familyMembers?: FamilyMember[];
  familyAlerts?: FamilyAlert[];
  onAddFamilyMember?: (member: FamilyMember) => void;
  onUpdateFamilyMember?: (member: FamilyMember) => void;
  onRemoveFamilyMember?: (memberId: string) => void;
  onAcknowledgeAlert?: (alertId: string) => void;
  onAcknowledgeAllAlerts?: () => void;
  onTriggerSimulatedAlert?: (memberId: string) => void;
  isAddFamilyModalOpen?: boolean;
  onCloseAddFamilyModal?: () => void;
  isAlertsModalOpen?: boolean;
  onCloseAlertsModal?: () => void;
  onOpenAlertsModal?: () => void;
  onOpenAddFamilyModal?: () => void;
}

export const MemberDashboard: React.FC<MemberDashboardProps> = ({
  userProfile,
  onUpdateProfile,
  onSwitchToLanding,
  activeViewingMemberId = null,
  onSelectMemberToView,
  familyMembers = [],
  familyAlerts = [],
  onAddFamilyMember,
  onUpdateFamilyMember,
  onRemoveFamilyMember,
  onAcknowledgeAlert,
  onAcknowledgeAllAlerts,
  onTriggerSimulatedAlert,
  isAddFamilyModalOpen = false,
  onCloseAddFamilyModal,
  isAlertsModalOpen = false,
  onCloseAlertsModal,
  onOpenAlertsModal,
  onOpenAddFamilyModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isUpsellModalOpen, setIsUpsellModalOpen] = useState(false);
  const [activePlayingClass, setActivePlayingClass] = useState<CommunityClass | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncText, setLastSyncText] = useState('2 minutes ago');
  
  // Local state for editing modal
  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);

  // Determine active target: is it primary user (Alex) or a family member (e.g. Eleanor)?
  const viewingMember = familyMembers.find((m) => m.id === activeViewingMemberId) || null;

  const handleSyncNow = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncText('Just now');
    }, 900);
  };

  const handleSaveConfig = (newGoal: UserGoal, newHeroIds: string[]) => {
    onUpdateProfile({
      goal: newGoal,
      heroMetricIds: newHeroIds,
    });
  };

  // Metrics dataset based on currently viewed profile
  const currentMetricsDataset: MetricDefinition[] = viewingMember
    ? viewingMember.metrics
    : ALL_METRICS;

  const heroMetricIds = viewingMember
    ? currentMetricsDataset.slice(0, 3).map((m) => m.id)
    : userProfile.heroMetricIds;

  const heroMetrics = currentMetricsDataset.filter((m) => heroMetricIds.includes(m.id));
  const otherMetrics = currentMetricsDataset.filter((m) => !heroMetricIds.includes(m.id));

  const filteredMetrics = (selectedCategory === 'all'
    ? currentMetricsDataset
    : currentMetricsDataset.filter((m) => m.category === selectedCategory)
  );

  return (
    <div className="w-full min-h-screen bg-stone-50 text-stone-900 pb-20">
      
      {/* Top Biometric Device & Goal Status Strip */}
      <div className="border-b border-stone-200 bg-white py-2.5 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          
          {/* Active Connected Hardware */}
          <div className="flex items-center gap-3">
            <span className="text-stone-500 font-medium">Hardware Stream:</span>
            <div className="flex items-center gap-2">
              {viewingMember ? (
                <>
                  {viewingMember.connectedWearables.includes('garmin') && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-800 font-medium">
                      <Watch className="w-3 h-3 text-teal-800" /> Garmin Connect
                    </span>
                  )}
                  {viewingMember.connectedWearables.includes('oura') && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-800 font-medium">
                      <CircleDot className="w-3 h-3 text-teal-800" /> Oura Ring (Synced)
                    </span>
                  )}
                  {viewingMember.connectedWearables.includes('apple_health') && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-800 font-medium">
                      <Activity className="w-3 h-3 text-teal-800" /> Apple Health
                    </span>
                  )}
                  {viewingMember.connectedWearables.includes('whoop') && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-800 font-medium">
                      <HeartPulse className="w-3 h-3 text-teal-800" /> WHOOP 4.0
                    </span>
                  )}
                </>
              ) : (
                <>
                  {userProfile.connectedWearables.includes('garmin') && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-800 font-medium">
                      <Watch className="w-3 h-3 text-teal-800" /> Garmin Epix (84%)
                    </span>
                  )}
                  {userProfile.connectedWearables.includes('oura') && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-800 font-medium">
                      <CircleDot className="w-3 h-3 text-teal-800" /> Oura Ring (72%)
                    </span>
                  )}
                  {userProfile.connectedWearables.includes('apple_health') && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-800 font-medium">
                      <Activity className="w-3 h-3 text-teal-800" /> Apple Health
                    </span>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Sync status & manual refresh */}
          <div className="flex items-center gap-4 text-stone-500">
            <span>Last normalized: <strong className="text-stone-800">{lastSyncText}</strong></span>
            <button
              onClick={handleSyncNow}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 text-teal-800 hover:text-teal-900 font-semibold cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Dashboard Canvas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6 sm:space-y-8">
        
        {/* Family Member Active Viewing Banner (If viewing someone else) */}
        {viewingMember ? (
          <div className="bg-teal-50 border border-teal-200 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs animate-in fade-in duration-200">
            <div className="flex items-center gap-3.5">
              <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center text-sm font-bold shadow-xs ${viewingMember.avatarColor}`}>
                {viewingMember.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">Family Member View</span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-teal-100/70 border border-teal-300 text-teal-900">
                    {viewingMember.accessLevel.replace(/_/g, ' ')}
                  </span>
                  {viewingMember.readinessStatus === 'depleted' && (
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-rose-100 border border-rose-200 text-rose-800 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-rose-700" /> Low Health Metrics Detected
                    </span>
                  )}
                </div>
                <h2 className="text-lg font-extrabold text-stone-900 mt-0.5">
                  {viewingMember.name} <span className="font-normal text-stone-500 text-sm">({viewingMember.relationship})</span>
                </h2>
                <p className="text-xs text-stone-600 font-normal">
                  Recovery score {viewingMember.readinessScore}/100 · Last synced {viewingMember.lastSync}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
              <button
                onClick={() => setEditingMember(viewingMember)}
                className="bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 text-xs font-semibold px-3.5 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Sliders className="w-3.5 h-3.5 text-teal-800" />
                <span>Alert Settings</span>
              </button>

              <button
                onClick={() => onSelectMemberToView?.(null)}
                className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to My Vitals</span>
              </button>
            </div>
          </div>
        ) : (
          /* Family Alert Banner (If alerts exist) */
          <FamilyAlertBanner
            alerts={familyAlerts}
            familyMembers={familyMembers}
            onOpenAlertsModal={() => onOpenAlertsModal?.()}
            onViewMemberStats={(memberId) => onSelectMemberToView?.(memberId)}
          />
        )}

        {/* 1. Daily Plain-Language Biometric Synthesis (Star surface) */}
        <DailySynthesisCard
          userProfile={
            viewingMember
              ? {
                  ...userProfile,
                  name: viewingMember.name,
                  goal: 'longevity_health',
                  connectedWearables: viewingMember.connectedWearables,
                }
              : userProfile
          }
          onOpenMetricConfig={() => setIsConfigModalOpen(true)}
          onOpenUpsell={() => setIsUpsellModalOpen(true)}
        />

        {/* 2. Family Health Circle Widget (Always accessible to manage and view family stats) */}
        <FamilyHealthHub
          familyMembers={familyMembers}
          alerts={familyAlerts}
          activeViewingMemberId={activeViewingMemberId}
          onSelectMemberToView={(id) => onSelectMemberToView?.(id)}
          onOpenAddModal={() => onOpenAddFamilyModal?.()}
          onOpenEditModal={(member) => setEditingMember(member)}
          onOpenAlertsModal={() => onOpenAlertsModal?.()}
        />

        {/* 3. Grid Layout: Left = Configurable Metrics (Primary Star), Right = Community / Guidance (Secondary) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Primary Surface: Configurable Metric Cards (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Category Filter & Customize bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-stone-900">
                    {viewingMember ? `${viewingMember.name.split(' ')[0]}'s Biometric Streams` : 'Active Biometric Streams'}
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 font-medium">
                    {viewingMember ? `${viewingMember.relationship} Stream` : `Goal: ${GOAL_HERO_PRESETS[userProfile.goal].label.split('&')[0]}`}
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5 font-normal">
                  {viewingMember
                    ? `Live normalized readings and safety thresholds for ${viewingMember.name}`
                    : 'Dynamic card grid configured to your priority wellness metrics'}
                </p>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                {['all', 'recovery', 'sleep', 'stress', 'vitals', 'activity'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-lg capitalize font-medium transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-stone-900 text-white font-semibold shadow-xs'
                        : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900 hover:border-stone-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Hero Metrics (Configured focus) */}
            {selectedCategory === 'all' ? (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-teal-800 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Priority Hero Metrics ({heroMetrics.length})
                    </span>
                    {!viewingMember && (
                      <button
                        onClick={() => setIsConfigModalOpen(true)}
                        className="text-xs text-stone-600 hover:text-stone-900 flex items-center gap-1 font-medium cursor-pointer"
                      >
                        <SlidersHorizontal className="w-3 h-3" /> Reorder / Select
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {heroMetrics.map((metric) => (
                      <MetricCard
                        key={metric.id}
                        metric={metric}
                        isHero={true}
                        onLockedClick={() => setIsUpsellModalOpen(true)}
                      />
                    ))}
                  </div>
                </div>

                {/* Additional Supporting Biometric Streams */}
                {otherMetrics.length > 0 && (
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-3">
                      Additional Monitored Vitals ({otherMetrics.length})
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {otherMetrics.map((metric) => (
                        <MetricCard
                          key={metric.id}
                          metric={metric}
                          isHero={false}
                          onLockedClick={() => setIsUpsellModalOpen(true)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Filtered View */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredMetrics.map((metric) => (
                  <MetricCard
                    key={metric.id}
                    metric={metric}
                    isHero={heroMetricIds.includes(metric.id)}
                    onLockedClick={() => setIsUpsellModalOpen(true)}
                  />
                ))}
              </div>
            )}

          </div>

          {/* Secondary Surface: Community & Guided Protocols (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <CommunitySidebar
              onPlayClass={(cls) => setActivePlayingClass(cls)}
            />
          </div>

        </div>

        {/* Global Compliance Footer note inside dashboard */}
        <div className="p-4 rounded-xl bg-white border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600 shadow-xs">
          <div className="flex items-center gap-2 text-justify sm:text-left">
            <ShieldCheck className="w-4 h-4 text-teal-800 shrink-0" />
            <span>
              Baseline Wellness metrics are calibrated for fitness and lifestyle optimization and do not constitute clinical diagnosis or medical treatment.
            </span>
          </div>
          <button
            onClick={onSwitchToLanding}
            className="text-xs text-teal-800 hover:text-teal-900 transition-colors shrink-0 underline cursor-pointer font-medium"
          >
            Back to Public Overview
          </button>
        </div>

      </div>

      {/* Metric Selector Modal */}
      <MetricSelectorModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        currentGoal={userProfile.goal}
        activeHeroMetricIds={userProfile.heroMetricIds}
        onSave={handleSaveConfig}
      />

      {/* Upsell Pro Tier Modal */}
      <UpsellModal
        isOpen={isUpsellModalOpen}
        onClose={() => setIsUpsellModalOpen(false)}
        currentTier={userProfile.tier}
        onUpgrade={(tier) => onUpdateProfile({ tier })}
      />

      {/* Community Class Player Modal */}
      <ClassPlayerModal
        sessionClass={activePlayingClass}
        onClose={() => setActivePlayingClass(null)}
      />

      {/* Add Family Member Modal */}
      <AddFamilyMemberModal
        isOpen={isAddFamilyModalOpen}
        onClose={() => onCloseAddFamilyModal?.()}
        onAddFamilyMember={(newMember) => {
          onAddFamilyMember?.(newMember);
        }}
      />

      {/* Edit Family Member Modal */}
      <EditFamilyMemberModal
        member={editingMember}
        isOpen={!!editingMember}
        onClose={() => setEditingMember(null)}
        onUpdateMember={(updated) => {
          onUpdateFamilyMember?.(updated);
        }}
        onRemoveMember={(id) => {
          onRemoveFamilyMember?.(id);
          if (activeViewingMemberId === id) {
            onSelectMemberToView?.(null);
          }
        }}
        onTriggerSimulatedAlert={(id) => {
          onTriggerSimulatedAlert?.(id);
        }}
      />

      {/* Family Alerts Notification Center Modal */}
      <FamilyAlertsModal
        isOpen={isAlertsModalOpen}
        onClose={() => onCloseAlertsModal?.()}
        alerts={familyAlerts}
        familyMembers={familyMembers}
        onAcknowledgeAlert={(id) => onAcknowledgeAlert?.(id)}
        onAcknowledgeAll={() => onAcknowledgeAllAlerts?.()}
        onOpenEditMember={(member) => setEditingMember(member)}
        onViewMemberStats={(memberId) => {
          onSelectMemberToView?.(memberId);
        }}
      />

    </div>
  );
};
