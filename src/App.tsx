import React, { useState } from 'react';
import { UserProfile, FamilyMember, FamilyAlert } from './types';
import { GOAL_HERO_PRESETS } from './data/mockMetrics';
import { INITIAL_FAMILY_MEMBERS, INITIAL_FAMILY_ALERTS } from './data/mockFamily';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/landing/LandingPage';
import { MemberDashboard } from './components/dashboard/MemberDashboard';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { PaymentPageModal } from './components/payment/PaymentPageModal';
import { LanguageProvider } from './context/LanguageContext';

export const BaselineApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isAddFamilyModalOpen, setIsAddFamilyModalOpen] = useState(false);
  const [isFamilyAlertsModalOpen, setIsFamilyAlertsModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlanForPayment, setSelectedPlanForPayment] = useState<'starter' | 'pro' | 'family'>('pro');
  
  // Active member being viewed on the dashboard (null = viewing primary user Alex Morgan)
  const [activeViewingMemberId, setActiveViewingMemberId] = useState<string | null>(null);

  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(INITIAL_FAMILY_MEMBERS);
  const [familyAlerts, setFamilyAlerts] = useState<FamilyAlert[]>(INITIAL_FAMILY_ALERTS);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    goal: 'training_load',
    tier: 'pro',
    connectedWearables: ['garmin', 'oura'],
    heroMetricIds: GOAL_HERO_PRESETS.training_load.defaultHeroIds,
    activeWidgets: ['recovery_score', 'hrv_rmssd', 'sleep_restorative', 'stress_load', 'resting_hr', 'daily_strain'],
    joinedDate: 'October 2024',
    familyMembers: INITIAL_FAMILY_MEMBERS,
    familyAlerts: INITIAL_FAMILY_ALERTS,
  });

  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setUserProfile((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  const handleCompleteOnboarding = (newProfile: Partial<UserProfile>) => {
    setUserProfile((prev) => ({
      ...prev,
      ...newProfile,
    }));
    setCurrentView('dashboard');
  };

  const handleSelectPlanFromPublic = (planId: 'starter' | 'pro' | 'family') => {
    setSelectedPlanForPayment(planId);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (tier: 'starter' | 'pro' | 'family') => {
    setUserProfile((prev) => ({ ...prev, tier }));
    setIsPaymentModalOpen(false);
    setCurrentView('dashboard');
  };

  // Family management handlers
  const handleAddFamilyMember = (newMember: FamilyMember) => {
    setFamilyMembers((prev) => [newMember, ...prev]);
    if (newMember.activeAlerts && newMember.activeAlerts.length > 0) {
      setFamilyAlerts((prev) => [...newMember.activeAlerts, ...prev]);
    }
  };

  const handleUpdateFamilyMember = (updatedMember: FamilyMember) => {
    setFamilyMembers((prev) =>
      prev.map((m) => (m.id === updatedMember.id ? updatedMember : m))
    );
  };

  const handleRemoveFamilyMember = (memberId: string) => {
    setFamilyMembers((prev) => prev.filter((m) => m.id !== memberId));
    setFamilyAlerts((prev) => prev.filter((a) => a.familyMemberId !== memberId));
    if (activeViewingMemberId === memberId) {
      setActiveViewingMemberId(null);
    }
  };

  const handleAcknowledgeAlert = (alertId: string) => {
    setFamilyAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, isAcknowledged: true } : a))
    );
  };

  const handleAcknowledgeAllAlerts = () => {
    setFamilyAlerts((prev) => prev.map((a) => ({ ...a, isAcknowledged: true })));
  };

  const handleTriggerSimulatedAlert = (memberId: string) => {
    const targetMember = familyMembers.find((m) => m.id === memberId);
    if (!targetMember) return;

    const simulatedAlert: FamilyAlert = {
      id: `alert-sim-${Date.now()}`,
      familyMemberId: targetMember.id,
      familyMemberName: targetMember.name,
      relationship: targetMember.relationship,
      metricId: 'hrv_rmssd',
      metricName: 'Overnight Heart Rate Variability (HRV)',
      severity: 'critical',
      currentValue: 24,
      threshold: targetMember.alertThresholds.lowHrv,
      unit: 'ms',
      message: `Overnight HRV dropped abruptly to 24 ms (below your ${targetMember.alertThresholds.lowHrv} ms threshold setting).`,
      timestamp: 'Just now (Simulated)',
      isAcknowledged: false,
      actionSuggested: `Check in on ${targetMember.name.split(' ')[0]} to verify sleep comfort, hydration, and fatigue levels.`,
    };

    // Update target member metrics status
    setFamilyMembers((prev) =>
      prev.map((m) =>
        m.id === memberId
          ? {
              ...m,
              readinessScore: 48,
              readinessStatus: 'depleted',
              metrics: m.metrics.map((met) =>
                met.id === 'recovery_score'
                  ? { ...met, currentValue: 48, status: 'depleted' as const }
                  : met.id === 'hrv_rmssd'
                  ? { ...met, currentValue: 24, status: 'depleted' as const }
                  : met
              ),
            }
          : m
      )
    );

    setFamilyAlerts((prev) => [simulatedAlert, ...prev]);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans selection:bg-teal-800 selection:text-white">
      {/* Universal Navigation with Family Switcher and Alert Bell */}
      <Navbar
        currentView={currentView}
        onViewChange={(view) => setCurrentView(view)}
        onOpenGetStarted={() => setIsOnboardingOpen(true)}
        userProfile={userProfile}
        familyMembers={familyMembers}
        familyAlerts={familyAlerts}
        activeViewingMemberId={activeViewingMemberId}
        onSelectMemberToView={(id) => {
          setActiveViewingMemberId(id);
          setCurrentView('dashboard');
        }}
        onOpenFamilyAlerts={() => setIsFamilyAlertsModalOpen(true)}
        onOpenAddFamily={() => setIsAddFamilyModalOpen(true)}
      />

      {/* Main View Area */}
      <div className="flex-1">
        {currentView === 'landing' ? (
          <LandingPage
            onOpenGetStarted={() => setIsOnboardingOpen(true)}
            onExploreDemo={() => setCurrentView('dashboard')}
            onSelectPlan={(planId) => handleSelectPlanFromPublic(planId)}
          />
        ) : (
          <MemberDashboard
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
            onSwitchToLanding={() => setCurrentView('landing')}
            activeViewingMemberId={activeViewingMemberId}
            onSelectMemberToView={(id) => setActiveViewingMemberId(id)}
            familyMembers={familyMembers}
            familyAlerts={familyAlerts}
            onAddFamilyMember={handleAddFamilyMember}
            onUpdateFamilyMember={handleUpdateFamilyMember}
            onRemoveFamilyMember={handleRemoveFamilyMember}
            onAcknowledgeAlert={handleAcknowledgeAlert}
            onAcknowledgeAllAlerts={handleAcknowledgeAllAlerts}
            onTriggerSimulatedAlert={handleTriggerSimulatedAlert}
            isAddFamilyModalOpen={isAddFamilyModalOpen}
            onCloseAddFamilyModal={() => setIsAddFamilyModalOpen(false)}
            isAlertsModalOpen={isFamilyAlertsModalOpen}
            onCloseAlertsModal={() => setIsFamilyAlertsModalOpen(false)}
            onOpenAlertsModal={() => setIsFamilyAlertsModalOpen(true)}
            onOpenAddFamilyModal={() => setIsAddFamilyModalOpen(true)}
            onOpenPaymentModal={(planId) => {
              setSelectedPlanForPayment(planId || 'pro');
              setIsPaymentModalOpen(true);
            }}
          />
        )}
      </div>

      {/* Payment / Checkout Page Modal */}
      <PaymentPageModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        initialPlanId={selectedPlanForPayment}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Onboarding / Get Started Modal Flow */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={handleCompleteOnboarding}
        initialGoal={userProfile.goal}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <BaselineApp />
    </LanguageProvider>
  );
};

export default App;


