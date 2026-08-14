import React from 'react';
import { Users, Video, Award, Clock, ArrowRight } from 'lucide-react';
import { MOCK_CHALLENGES, MOCK_CLASSES } from '../../data/mockMetrics';

interface CommunityTeaserProps {
  onExplore: () => void;
}

export const CommunityTeaserSection: React.FC<CommunityTeaserProps> = ({ onExplore }) => {
  return (
    <section id="community" className="py-20 bg-stone-100/60 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 text-xs font-semibold text-teal-800 shadow-xs">
            <Users className="w-3.5 h-3.5" />
            <span>Layered Community & Guidance</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Accountability and science-led classes in your corner.
          </h2>
          <p className="text-sm text-stone-600 max-w-xl mx-auto font-normal">
            Supporting your biometric data with live physiological practices: breathwork, non-sleep deep rest (NSDR), mobility, and cohort-based consistency challenges.
          </p>
        </div>

        {/* 2-column showcase: Left = Cohort Challenges, Right = Live Masterclasses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Challenges Preview */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-stone-200 space-y-5 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-stone-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-teal-800" />
                  Biometric Consistency Challenges
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">Focus on sustainable habit formation</p>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-teal-50 border border-teal-200 text-teal-800 font-medium">
                Active Cohorts
              </span>
            </div>

            <div className="space-y-3">
              {MOCK_CHALLENGES.slice(0, 2).map((ch) => (
                <div
                  key={ch.id}
                  className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-800">{ch.title}</span>
                    <span className="text-stone-500">{ch.participantsCount.toLocaleString()} members</span>
                  </div>
                  <p className="text-xs text-stone-600">{ch.targetDescription}</p>
                  <div className="pt-1">
                    <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-teal-700 h-full rounded-full"
                        style={{ width: `${ch.userProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Classes Preview */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-stone-200 space-y-5 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-stone-900 flex items-center gap-2">
                  <Video className="w-4 h-4 text-teal-800" />
                  Expert-Led Recovery Protocols
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">Live sessions & on-demand audio guides</p>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-stone-100 border border-stone-200 text-stone-700 font-medium">
                Science Faculty
              </span>
            </div>

            <div className="space-y-3">
              {MOCK_CLASSES.slice(0, 2).map((cl) => (
                <div
                  key={cl.id}
                  className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-stone-200 text-stone-700">
                        {cl.category}
                      </span>
                      <span className="text-xs text-stone-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {cl.durationMinutes} min
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-semibold text-stone-800">{cl.title}</h4>
                    <p className="text-xs text-stone-500">{cl.instructor}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Explore Member Hub prompt */}
        <div className="text-center pt-10">
          <button
            onClick={onExplore}
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-teal-800 hover:text-teal-900 font-semibold transition-colors cursor-pointer"
          >
            <span>View all community challenges in member dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
