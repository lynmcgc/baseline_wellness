import React from 'react';
import { Hero } from './Hero';
import { WearableCompatibilitySection } from './WearableCompatibilitySection';
import { SciencePillarsSection } from './SciencePillarsSection';
import { WeatherCircadianSection } from '../public/WeatherCircadianSection';
import { PublicActivityRecommender } from '../public/PublicActivityRecommender';
import { PublicPricingSection } from '../public/PublicPricingSection';
import { CommunityTeaserSection } from './CommunityTeaserSection';
import { TrustComplianceSection } from './TrustComplianceSection';
import { Footer } from './Footer';

interface LandingPageProps {
  onOpenGetStarted: () => void;
  onExploreDemo: () => void;
  onSelectPlan?: (planId: 'starter' | 'pro' | 'family', interval: 'monthly' | 'annual') => void;
  onOpenApiStatus?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenGetStarted,
  onExploreDemo,
  onSelectPlan,
  onOpenApiStatus,
}) => {
  return (
    <div className="w-full min-h-screen bg-stone-50 text-stone-900 flex flex-col">
      <main className="flex-1">
        <Hero
          onGetStarted={onOpenGetStarted}
          onExploreDemo={onExploreDemo}
        />
        <WearableCompatibilitySection />
        <WeatherCircadianSection onExploreActivities={() => {}} />
        <PublicActivityRecommender onExploreMemberHub={onExploreDemo} />
        <SciencePillarsSection />
        <PublicPricingSection onSelectPlan={onSelectPlan || (() => onOpenGetStarted())} />
        <CommunityTeaserSection onExplore={onExploreDemo} />
        <TrustComplianceSection />
      </main>
      <Footer
        onOpenGetStarted={onOpenGetStarted}
        onExploreDemo={onExploreDemo}
        onOpenApiStatus={onOpenApiStatus}
      />
    </div>
  );
};

