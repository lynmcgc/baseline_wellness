import React, { useState } from 'react';
import { Compass, MapPin, Sparkles, Clock, Activity, ArrowRight, ShieldCheck, Flame, Trees, Waves } from 'lucide-react';
import { fetchAreaRecommendations, AreaRecommendationResponse } from '../../utils/geminiApi';
import { useLanguage } from '../../context/LanguageContext';

export const PublicActivityRecommender: React.FC<{
  initialLocation?: string;
  onExploreMemberHub?: () => void;
}> = ({
  initialLocation = 'San Francisco, CA',
  onExploreMemberHub,
}) => {
  const { tText } = useLanguage();
  const [locationInput, setLocationInput] = useState<string>(initialLocation);
  const [activityPrompt, setActivityPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<AreaRecommendationResponse | null>(null);

  const QUICK_PROMPTS = [
    'Cold plunge & infrared sauna studios',
    'Scenic Zone 2 trail runs & ocean walks',
    'Forest bathing & outdoor breathwork spots',
    'Heated Olympic lap pools for recovery',
  ];

  const handleSearch = async (locToUse?: string, queryToUse?: string) => {
    const loc = locToUse || locationInput.trim() || 'San Francisco, CA';
    const query = queryToUse !== undefined ? queryToUse : activityPrompt;
    
    setLoading(true);
    try {
      const data = await fetchAreaRecommendations(loc, {
        goal: 'longevity_health',
        readinessScore: 85,
        activityType: query || 'recovery and wellness',
      });
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  const getCategoryIcon = (type: string) => {
    const lower = type.toLowerCase();
    if (lower.includes('plunge') || lower.includes('sauna') || lower.includes('contrast')) {
      return <Flame className="w-4 h-4 text-amber-600" />;
    }
    if (lower.includes('trail') || lower.includes('forest') || lower.includes('walk') || lower.includes('park')) {
      return <Trees className="w-4 h-4 text-emerald-600" />;
    }
    if (lower.includes('swim') || lower.includes('pool') || lower.includes('water')) {
      return <Waves className="w-4 h-4 text-blue-600" />;
    }
    return <Activity className="w-4 h-4 text-teal-700" />;
  };

  return (
    <section id="area-activity-recommender" className="py-16 sm:py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>{tText('AI Local Wellness & Activity Advisor')}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-stone-900 tracking-tight">
            {tText('Converse & Discover Biometric Activities in Any Area')}
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2 font-normal">
            {tText('Type any city, neighborhood, or specific recovery modality below. Our AI engine links local geography with circadian and autonomic science to recommend ideal spots near you.')}
          </p>
        </div>

        {/* Generic Conversational Input Area */}
        <div className="p-5 sm:p-7 rounded-2xl bg-stone-50 border border-stone-200 shadow-xs mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              {/* Location Generic Input */}
              <div className="md:col-span-4 relative">
                <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
                  {tText('Target City or Area')}
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    placeholder="e.g. Austin, TX, Boulder, CO, or Brooklyn, NY"
                    className="w-full text-xs sm:text-sm pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 bg-white text-stone-900 focus:outline-none focus:ring-1 focus:ring-teal-700"
                  />
                </div>
              </div>

              {/* Conversational Request Generic Input */}
              <div className="md:col-span-8 relative">
                <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
                  {tText('What kind of recovery or activity are you looking for?')}
                </label>
                <div className="relative flex gap-2">
                  <input
                    type="text"
                    value={activityPrompt}
                    onChange={(e) => setActivityPrompt(e.target.value)}
                    placeholder="e.g. Quiet coastal paths for morning light, contrast therapy suites, or bodyweight parks..."
                    className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white text-stone-900 focus:outline-none focus:ring-1 focus:ring-teal-700"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer shrink-0 shadow-xs"
                  >
                    {loading ? (
                      <>
                        <Sparkles className="w-4 h-4 text-teal-300 animate-spin" />
                        <span>{tText('Searching...')}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-teal-300" />
                        <span>{tText('Get Recommendations')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Inspiration Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-200/60">
              <span className="text-[11px] text-stone-400 font-medium">{tText('Popular searches:')}</span>
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => {
                    setActivityPrompt(prompt);
                    handleSearch(locationInput, prompt);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 hover:border-stone-300 text-stone-700 text-xs font-medium transition-colors cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>

          </form>
        </div>

        {/* Results Showcase */}
        {result && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-200">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-teal-700" />
                  <span>{tText('Recommended Activities in')} {result.location}</span>
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">{result.weatherAdvice}</p>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
                <Sparkles className="w-3 h-3" />
                {result.source === 'gemini' ? 'Physiologically Tailored' : 'Biometric Baseline Match'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {result.recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between hover:border-teal-300 hover:shadow-sm transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-teal-900 bg-teal-50 border border-teal-200/80 px-2.5 py-1 rounded-lg">
                        {getCategoryIcon(rec.type)}
                        <span>{rec.type}</span>
                      </div>
                      <span className="text-[11px] font-semibold text-stone-500 bg-white px-2 py-0.5 rounded border border-stone-200">
                        {rec.intensity}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-stone-900">{rec.title}</h4>
                      <div className="flex items-center gap-1 text-xs text-stone-500 mt-1 font-medium">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        <span>{rec.spotName} · {rec.addressOrArea}</span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 font-normal leading-relaxed">
                      {rec.suitabilityReason}
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-stone-200/70 flex items-center justify-between text-xs text-stone-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>{rec.duration}</span>
                    </div>
                    <span className="font-semibold text-stone-700">{rec.bestTimeOfDay}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Member Hub Callout */}
            <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 text-xs text-teal-950 font-medium">
                <ShieldCheck className="w-4 h-4 text-teal-800 shrink-0" />
                <span>
                  <strong>Want interactive map routing with your live GPS?</strong> The Member Hub includes live wearable correlation, GPS location detection, and saved recovery protocols.
                </span>
              </div>
              <button
                onClick={onExploreMemberHub}
                className="px-4 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                <span>{tText('Open Member Map Hub')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
