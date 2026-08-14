import React from 'react';
import { Hero } from './Hero';
import { WearableCompatibilitySection } from './WearableCompatibilitySection';
import { SciencePillarsSection } from './SciencePillarsSection';
import { CommunityTeaserSection } from './CommunityTeaserSection';
import { TrustComplianceSection } from './TrustComplianceSection';
import { Footer } from './Footer';

interface LandingPageProps {
  onOpenGetStarted: () => void;
  onExploreDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenGetStarted,
  onExploreDemo,
}) => {
  return (
    <div className="w-full min-h-screen bg-stone-50 text-stone-900 flex flex-col">
      <main className="flex-1">
        <Hero
          onGetStarted={onOpenGetStarted}
          onExploreDemo={onExploreDemo}
        />
        <WearableCompatibilitySection />
        <SciencePillarsSection />
        <CommunityTeaserSection onExplore={onExploreDemo} />
        <TrustComplianceSection />
      </main>
      <Footer
        onOpenGetStarted={onOpenGetStarted}
        onExploreDemo={onExploreDemo}
      />
    </div>
  );
};
