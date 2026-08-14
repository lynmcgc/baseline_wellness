import React, { useState } from 'react';
import { Sun, Cloud, CloudRain, Sparkles, Compass, MapPin, ShieldCheck, Clock, Eye } from 'lucide-react';
import { CITIES_WEATHER, DEFAULT_WEATHER } from '../../data/mockWeatherLocations';
import { WeatherData } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

export const WeatherCircadianSection: React.FC<{ onExploreActivities?: (city: string) => void }> = ({
  onExploreActivities,
}) => {
  const { tText } = useLanguage();
  const [selectedCity, setSelectedCity] = useState<string>('San Francisco, CA');
  const [customCityInput, setCustomCityInput] = useState<string>('');
  const [isSearching, setIsSearching] = useState(false);

  const currentWeather: WeatherData = CITIES_WEATHER[selectedCity] || {
    ...DEFAULT_WEATHER,
    city: selectedCity.split(',')[0] || selectedCity,
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
  };

  const handleCustomSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customCityInput.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setSelectedCity(customCityInput.trim());
      setIsSearching(false);
    }, 300);
  };

  return (
    <section id="weather-circadian" className="py-16 sm:py-20 bg-stone-100/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sun className="w-3.5 h-3.5" />
            <span>{tText('Environmental & Circadian Intelligence')}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-stone-900 tracking-tight">
            {tText('Weather-Adjusted Recovery & Circadian Timing')}
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2 font-normal">
            {tText('Your autonomic recovery is deeply bound to external light, temperature, and UV exposure. See how real-time ambient conditions guide optimal outdoor training and nocturnal sleep quality.')}
          </p>
        </div>

        {/* City Selector Tabs & Search Box */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {Object.keys(CITIES_WEATHER).map((cityKey) => (
              <button
                key={cityKey}
                onClick={() => handleCityChange(cityKey)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCity === cityKey
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-stone-200/80 border border-stone-200'
                }`}
              >
                {cityKey.split(',')[0]}
              </button>
            ))}
          </div>

          <form onSubmit={handleCustomSearch} className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-60">
              <MapPin className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={customCityInput}
                onChange={(e) => setCustomCityInput(e.target.value)}
                placeholder={tText('Search any city or zip...')}
                className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-teal-700"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-900 text-white text-xs font-medium cursor-pointer transition-colors shrink-0"
            >
              {isSearching ? tText('Locating...') : tText('View Weather')}
            </button>
          </form>
        </div>

        {/* Weather & Circadian Grid Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Weather Metric Box */}
          <div className="lg:col-span-5 rounded-2xl bg-white border border-stone-200 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-stone-500 text-xs font-medium">
                    <MapPin className="w-3.5 h-3.5 text-teal-700" />
                    <span>{currentWeather.city}, {currentWeather.country}</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-1 font-display">
                    {currentWeather.temperatureF}°F <span className="text-lg font-normal text-stone-500">({currentWeather.temperatureC}°C)</span>
                  </h3>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                  {currentWeather.conditionIcon === 'sunny' ? (
                    <Sun className="w-8 h-8" />
                  ) : currentWeather.conditionIcon === 'rain' ? (
                    <CloudRain className="w-8 h-8 text-blue-600" />
                  ) : (
                    <Cloud className="w-8 h-8 text-stone-600" />
                  )}
                </div>
              </div>

              <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-100 text-stone-800 text-xs font-medium">
                <span>{currentWeather.condition}</span>
                <span className="text-stone-300">·</span>
                <span>Feels like {currentWeather.feelsLikeF}°F</span>
              </div>

              {/* Metric Sub-grid */}
              <div className="grid grid-cols-3 gap-2.5 mt-6">
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-150 text-center">
                  <span className="text-[10px] text-stone-500 block uppercase font-medium">UV Index</span>
                  <span className="text-base font-bold text-stone-900">{currentWeather.uvIndex}</span>
                  <span className="text-[10px] text-stone-500 block truncate">{currentWeather.uvDescription.split(' ')[0]}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-150 text-center">
                  <span className="text-[10px] text-stone-500 block uppercase font-medium">Air Quality</span>
                  <span className="text-base font-bold text-teal-800">{currentWeather.airQualityIndex} AQI</span>
                  <span className="text-[10px] text-teal-700 font-semibold block">{currentWeather.airQualityLabel}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-150 text-center">
                  <span className="text-[10px] text-stone-500 block uppercase font-medium">Humidity</span>
                  <span className="text-base font-bold text-stone-900">{currentWeather.humidityPercent}%</span>
                  <span className="text-[10px] text-stone-500 block">{currentWeather.windSpeedMph} mph wind</span>
                </div>
              </div>
            </div>

            {/* Sunrise / Sunset Circadian Anchors */}
            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
              <div className="flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-amber-600" />
                <span>Sunrise: <strong className="text-stone-900">{currentWeather.sunriseTime}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                <span>Sunset: <strong className="text-stone-900">{currentWeather.sunsetTime}</strong></span>
              </div>
            </div>
          </div>

          {/* Circadian & Physiological Guidance Box */}
          <div className="lg:col-span-7 rounded-2xl bg-white border border-stone-200 p-6 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-700" />
                  <h4 className="text-sm font-bold text-stone-900">{tText('Optimal Outdoor Training Window')}</h4>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[10px] font-bold uppercase">
                  {currentWeather.biometricOutdoorSuitability === 'optimal' ? 'Prime Aerobic Conditions' : 'Moderate Weather'}
                </span>
              </div>

              <div className="mt-3.5 p-3.5 rounded-xl bg-teal-50/50 border border-teal-100 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-teal-950">
                  <Clock className="w-3.5 h-3.5 text-teal-700" />
                  <span>Recommended Outdoor Window: {currentWeather.optimalOutdoorWindow}</span>
                </div>
                <p className="text-xs text-stone-700 font-normal leading-relaxed">
                  Moderate temperatures ({currentWeather.temperatureF}°F) and low UV allow sustained Zone 2 aerobic cardiac conditioning with minimal cardiovascular drift or heat-stress induced cortisol spikes.
                </p>
              </div>

              {/* Circadian Light Protocol */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                  <Eye className="w-3.5 h-3.5 text-amber-600" />
                  <span>{tText('Circadian Photoperiod Advice')}</span>
                </div>
                <p className="text-xs text-stone-600 font-normal leading-relaxed">
                  {currentWeather.circadianLightAdvice}
                </p>
              </div>
            </div>

            {/* Quick Action Button to Recommend Area Activities */}
            <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-xs text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
                <span>Weather data auto-adjusts daily training suggestions</span>
              </div>

              <button
                onClick={() => {
                  const recommender = document.getElementById('area-activity-recommender');
                  if (recommender) {
                    recommender.scrollIntoView({ behavior: 'smooth' });
                  }
                  onExploreActivities?.(selectedCity);
                }}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-teal-300" />
                <span>{tText('Find Activities Near')} {selectedCity.split(',')[0]}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
