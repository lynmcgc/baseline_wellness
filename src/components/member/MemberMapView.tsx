import React, { useState } from 'react';
import { 
  MapPin, 
  Compass, 
  Sparkles, 
  Flame, 
  Trees, 
  Waves, 
  Activity, 
  ExternalLink, 
  Star, 
  Clock, 
  Check, 
  Send, 
  Info,
  Locate,
  RefreshCw,
  Plus
} from 'lucide-react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { WELLNESS_LOCATIONS, DEFAULT_WEATHER, CITIES_WEATHER } from '../../data/mockWeatherLocations';
import { WellnessLocation, WeatherData, UserProfile } from '../../types';
import { fetchAreaRecommendations, AreaRecommendationResponse } from '../../utils/geminiApi';
import { useLanguage } from '../../context/LanguageContext';

interface MemberMapViewProps {
  userProfile: UserProfile;
  onLinkActivityToPlan?: (location: WellnessLocation) => void;
}

export const MemberMapView: React.FC<MemberMapViewProps> = ({
  userProfile,
  onLinkActivityToPlan,
}) => {
  const { tText } = useLanguage();
  
  // User coordinates state
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number }>({
    lat: 37.7749,
    lng: -122.4194,
  });
  const [currentCityName, setCurrentCityName] = useState<string>('San Francisco, CA');
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Filter & Selected Location
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<WellnessLocation>(WELLNESS_LOCATIONS[0]);
  const [linkedNotice, setLinkedNotice] = useState<string | null>(null);

  // Conversational AI Activity Recommender State for Member
  const [memberPrompt, setMemberPrompt] = useState<string>('');
  const [isConsultingAi, setIsConsultingAi] = useState<boolean>(false);
  const [aiRecommendations, setAiRecommendations] = useState<AreaRecommendationResponse | null>(null);

  // Check for Google Maps Platform Key
  const mapsApiKey = (typeof window !== 'undefined' && (window as any).GOOGLE_MAPS_PLATFORM_KEY) 
    || ((import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY as string)
    || '';

  // Filter locations by active category
  const filteredLocations = WELLNESS_LOCATIONS.filter((loc) => {
    if (activeCategory === 'all') return true;
    return loc.category === activeCategory;
  });

  // Current weather for the active area
  const currentWeather: WeatherData = CITIES_WEATHER[currentCityName] || {
    ...DEFAULT_WEATHER,
    city: currentCityName.split(',')[0],
  };

  // Browser Geolocation Trigger
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserCoords({ lat: latitude, lng: longitude });
        setCurrentCityName('Your Current GPS Location');
        setIsLocating(false);

        // Auto-query AI for activities near GPS
        queryMemberAiActivities(`Current Coordinates (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`);
      },
      (error) => {
        setIsLocating(false);
        setLocationError(`Location request denied (${error.message}). Using preset coordinates.`);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const queryMemberAiActivities = async (locationQuery: string, customQuery?: string) => {
    setIsConsultingAi(true);
    try {
      const response = await fetchAreaRecommendations(locationQuery, {
        goal: userProfile.goal,
        readinessScore: 88,
        weatherSummary: `${currentWeather.temperatureF}°F, ${currentWeather.condition}`,
        activityType: customQuery || memberPrompt,
      });
      setAiRecommendations(response);
    } catch (err) {
      console.error(err);
    } finally {
      setIsConsultingAi(false);
    }
  };

  const handleMemberAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberPrompt.trim()) return;
    queryMemberAiActivities(currentCityName, memberPrompt);
  };

  const handleLinkLocation = (loc: WellnessLocation) => {
    onLinkActivityToPlan?.(loc);
    setLinkedNotice(`Linked "${loc.name}" to today's recovery plan!`);
    setTimeout(() => setLinkedNotice(null), 3500);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cold_plunge_sauna':
        return <Flame className="w-4 h-4 text-amber-600" />;
      case 'scenic_trail':
      case 'forest_bathing':
        return <Trees className="w-4 h-4 text-emerald-600" />;
      case 'lap_pool':
        return <Waves className="w-4 h-4 text-blue-600" />;
      default:
        return <Activity className="w-4 h-4 text-teal-700" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner / Location Header */}
      <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-800 mb-1">
            <Compass className="w-4 h-4" />
            <span>{tText('Member Location & Local Recovery Engine')}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-stone-900">
            {tText('Recovery Spots & Biometric Alignment in')} {currentCityName.split(',')[0]}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            {tText('Discover vetted cold plunges, contrast saunas, scenic Zone 2 trails, and calm outdoor spaces matched to your daily readiness.')}
          </p>
        </div>

        {/* GPS Geolocation Button */}
        <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
          <button
            onClick={handleUseCurrentLocation}
            disabled={isLocating}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-60"
          >
            {isLocating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-teal-300" />
                <span>{tText('Acquiring GPS...')}</span>
              </>
            ) : (
              <>
                <Locate className="w-3.5 h-3.5 text-teal-300" />
                <span>{tText('Use My Current Location')}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {locationError && (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-700 shrink-0" />
          <span>{locationError}</span>
        </div>
      )}

      {/* Ambient Weather & Circadian Strip for Member */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-white border border-stone-200 shadow-2xs">
          <span className="text-[10px] text-stone-500 uppercase font-bold block">Current Temperature</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-xl font-bold text-stone-900 font-display">{currentWeather.temperatureF}°F</span>
            <span className="text-xs text-stone-500">{currentWeather.condition}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-stone-200 shadow-2xs">
          <span className="text-[10px] text-stone-500 uppercase font-bold block">Circadian Window</span>
          <div className="text-xs font-bold text-teal-950 mt-1 truncate">
            {currentWeather.optimalOutdoorWindow}
          </div>
          <span className="text-[10px] text-stone-500">Peak daylight absorption</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-stone-200 shadow-2xs">
          <span className="text-[10px] text-stone-500 uppercase font-bold block">UV & Air Quality</span>
          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900 mt-1">
            <span>UV {currentWeather.uvIndex}</span>
            <span className="text-stone-300">·</span>
            <span className="text-teal-800">{currentWeather.airQualityIndex} AQI ({currentWeather.airQualityLabel})</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200 shadow-2xs">
          <span className="text-[10px] text-teal-800 uppercase font-bold block">Readiness Match</span>
          <div className="text-xs font-bold text-teal-950 mt-1">
            88/100 · Optimal Zone
          </div>
          <span className="text-[10px] text-teal-700">Prime for Zone 2 or Contrast</span>
        </div>
      </div>

      {/* Main Map & Location List Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Category Filters & Location List (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'All Modalities' },
              { id: 'cold_plunge_sauna', label: 'Cold Plunge & Sauna' },
              { id: 'scenic_trail', label: 'Scenic Trails' },
              { id: 'lap_pool', label: 'Lap Pools' },
              { id: 'forest_bathing', label: 'Forest Bathing' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Location Cards */}
          <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
            {filteredLocations.map((loc) => {
              const isSelected = selectedLocation.id === loc.id;

              return (
                <div
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-2 border-stone-900 shadow-md ring-1 ring-stone-900/10'
                      : 'bg-white border-stone-200 hover:border-stone-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-stone-100 border border-stone-200">
                        {getCategoryIcon(loc.category)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-stone-900">{loc.name}</h4>
                        <span className="text-[11px] text-stone-500">{loc.categoryLabel}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>{loc.rating}</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 mt-2.5 font-normal line-clamp-2 leading-relaxed">
                    {loc.description}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {loc.hours}
                    </span>
                    <span className="font-semibold text-teal-800">{loc.distanceMiles} mi away</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column: Interactive Map View & Selected Detail (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Map Container */}
          <div className="rounded-3xl border border-stone-200 overflow-hidden bg-stone-100 h-[360px] relative shadow-xs">
            {mapsApiKey ? (
              <APIProvider apiKey={mapsApiKey}>
                <Map
                  defaultCenter={userCoords}
                  center={selectedLocation ? { lat: selectedLocation.lat, lng: selectedLocation.lng } : userCoords}
                  defaultZoom={13}
                  gestureHandling={'greedy'}
                  disableDefaultUI={false}
                  className="w-full h-full"
                >
                  {filteredLocations.map((loc) => (
                    <Marker
                      key={loc.id}
                      position={{ lat: loc.lat, lng: loc.lng }}
                      title={loc.name}
                      onClick={() => setSelectedLocation(loc)}
                    />
                  ))}
                </Map>
              </APIProvider>
            ) : (
              /* Fallback Interactive Vector Map with Real Pins */
              <div className="w-full h-full bg-slate-900 relative overflow-hidden flex flex-col justify-between p-4">
                {/* Visual Grid & Topographic lines */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Map Control Overlay */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="px-3 py-1.5 rounded-xl bg-stone-900/90 text-white text-xs font-semibold backdrop-blur-md border border-stone-700 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-teal-400" />
                    <span>{currentCityName.split(',')[0]} Map View</span>
                  </div>
                  <span className="text-[10px] text-stone-400 bg-stone-900/80 px-2 py-1 rounded-lg border border-stone-800">
                    Interactive Pins
                  </span>
                </div>

                {/* SVG Visual Pins Representation */}
                <div className="relative z-10 flex-1 flex items-center justify-around my-4">
                  {filteredLocations.slice(0, 5).map((loc) => {
                    const isCurrent = selectedLocation.id === loc.id;
                    return (
                      <button
                        key={loc.id}
                        onClick={() => setSelectedLocation(loc)}
                        className={`group relative flex flex-col items-center cursor-pointer transition-all ${
                          isCurrent ? 'scale-110' : 'hover:scale-105'
                        }`}
                      >
                        <div className={`p-2.5 rounded-2xl shadow-lg border flex items-center justify-center transition-all ${
                          isCurrent
                            ? 'bg-teal-500 border-white text-stone-950 ring-4 ring-teal-400/30'
                            : 'bg-stone-800/90 border-stone-600 text-teal-300 hover:bg-stone-700'
                        }`}>
                          {getCategoryIcon(loc.category)}
                        </div>
                        <span className="mt-1.5 px-2 py-0.5 rounded bg-stone-900/90 text-white text-[10px] font-bold max-w-[90px] truncate border border-stone-700">
                          {loc.name}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="relative z-10 flex items-center justify-between text-[11px] text-stone-400 bg-stone-900/90 backdrop-blur-sm p-2 rounded-xl border border-stone-800">
                  <span>Google Maps Platform configured via <code className="text-teal-300 font-mono">GOOGLE_MAPS_PLATFORM_KEY</code></span>
                  <span className="text-stone-300 font-semibold">{filteredLocations.length} locations ready</span>
                </div>
              </div>
            )}
          </div>

          {/* Selected Location Action Card */}
          {selectedLocation && (
            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-stone-900 font-display">
                      {selectedLocation.name}
                    </h3>
                    <span className="text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md">
                      {selectedLocation.categoryLabel}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>{selectedLocation.address} · {selectedLocation.distanceMiles} miles away</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleLinkLocation(selectedLocation)}
                    className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5 text-teal-300" />
                    <span>{tText('Link to Daily Plan')}</span>
                  </button>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedLocation.name + ' ' + selectedLocation.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-600 transition-colors"
                    title="Open in Google Maps"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {linkedNotice && (
                <div className="p-2.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-xs font-medium flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-700" />
                  <span>{linkedNotice}</span>
                </div>
              )}

              {/* Tags & Biometric Impact */}
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 text-xs space-y-1.5">
                <div className="font-bold text-stone-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-teal-700" />
                  <span>Physiological & Recovery Rationale:</span>
                </div>
                <p className="text-stone-600 font-normal leading-relaxed">
                  {(selectedLocation.features || selectedLocation.tags || []).join(' · ')}. Regular sessions stimulate autonomic resilience, lower resting heart rate, and enhance deep sleep architecture.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Conversational AI Recovery Advisor for Members */}
      <div className="p-6 rounded-3xl bg-stone-900 text-white border border-stone-800 shadow-md space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-300 uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>{tText('AI Local Recovery Conversational Advisor')}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-display text-white">
              {tText('Ask for Custom Activities around')} {currentCityName.split(',')[0]}
            </h3>
          </div>
          <span className="text-xs text-stone-400">
            Grounding prompt with Readiness (88/100) & Weather ({currentWeather.temperatureF}°F)
          </span>
        </div>

        <form onSubmit={handleMemberAiSubmit} className="flex gap-2">
          <input
            type="text"
            value={memberPrompt}
            onChange={(e) => setMemberPrompt(e.target.value)}
            placeholder="e.g. Recommend a quiet contrast sauna suite or a steep hill climb trail for Zone 4 intervals..."
            className="flex-1 text-xs sm:text-sm px-4 py-3 rounded-xl bg-stone-800 border border-stone-700 text-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
          />
          <button
            type="submit"
            disabled={isConsultingAi}
            className="px-5 py-3 rounded-xl bg-teal-400 hover:bg-teal-300 text-stone-950 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 shrink-0"
          >
            {isConsultingAi ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-stone-950" />
                <span>{tText('Synthesizing...')}</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 text-stone-950" />
                <span>{tText('Ask AI Advisor')}</span>
              </>
            )}
          </button>
        </form>

        {/* AI Results */}
        {aiRecommendations && (
          <div className="space-y-4 pt-2 border-t border-stone-800 animate-in fade-in duration-200">
            <div className="text-xs text-stone-300">
              <strong>Weather Advice:</strong> {aiRecommendations.weatherAdvice}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {aiRecommendations.recommendations.map((rec, i) => (
                <div key={i} className="p-4 rounded-2xl bg-stone-800/90 border border-stone-700 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-teal-300">{rec.type}</span>
                    <span className="text-[10px] text-stone-400">{rec.intensity}</span>
                  </div>
                  <h5 className="text-sm font-bold text-white">{rec.title}</h5>
                  <p className="text-[11px] text-stone-300 leading-relaxed">{rec.suitabilityReason}</p>
                  <div className="pt-2 border-t border-stone-700/60 text-[10px] text-stone-400 flex justify-between">
                    <span>{rec.spotName}</span>
                    <span className="text-teal-400">{rec.bestTimeOfDay}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
