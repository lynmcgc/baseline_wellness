import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Sparkles, Info, ChevronDown, ChevronUp, Lock, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { MetricDefinition } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface MetricCardProps {
  metric: MetricDefinition;
  isHero?: boolean;
  onLockedClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  metric,
  isHero = false,
  onLockedClick,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const { t, tText } = useLanguage();

  const getStatusColor = (status: MetricDefinition['status']) => {
    switch (status) {
      case 'optimal':
        return 'bg-teal-50 text-teal-800 border-teal-200';
      case 'restorative':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'moderate':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'elevated':
        return 'bg-sky-50 text-sky-800 border-sky-200';
      default:
        return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  };

  const getTranslatedCategory = (cat: string) => {
    switch (cat) {
      case 'recovery':
        return t('dashboard.recovery_sleep', 'Recovery & Sleep');
      case 'sleep':
        return t('dashboard.recovery_sleep', 'Recovery & Sleep');
      case 'cardiovascular':
        return t('dashboard.cardiovascular', 'Cardiovascular');
      case 'stress':
        return t('dashboard.stress_autonomic', 'Stress & Autonomic');
      default:
        return tText(cat);
    }
  };

  const metricTitleKey = `metric.${metric.id}`;
  const localizedTitle = t(metricTitleKey, tText(metric.title));
  const localizedStatus = tText(metric.status);
  const localizedInsight = tText(metric.plainLanguageInsight);
  const localizedAction = tText(metric.actionableGuidance);
  const localizedScience = tText(metric.scientificContext);

  return (
    <div
      className={`rounded-2xl border transition-all flex flex-col justify-between ${
        isHero
          ? 'bg-white border-stone-300 shadow-sm p-5 sm:p-6'
          : 'bg-white border-stone-200 p-4 sm:p-5 shadow-xs'
      }`}
    >
      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                {getTranslatedCategory(metric.category)}
              </span>
              {metric.isPremiumOnly && (
                <button
                  onClick={onLockedClick}
                  className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800 hover:bg-amber-100 cursor-pointer"
                >
                  <Lock className="w-2.5 h-2.5" /> PRO
                </button>
              )}
            </div>
            <h3 className="text-sm sm:text-base font-bold text-stone-900 mt-0.5">
              {localizedTitle}
            </h3>
          </div>

          <span
            className={`text-xs px-2.5 py-1 rounded-full font-semibold border capitalize ${getStatusColor(
              metric.status
            )}`}
          >
            {localizedStatus}
          </span>
        </div>

        {/* Primary Metric Reading */}
        <div className="flex items-baseline gap-3 my-2">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-extrabold font-display text-stone-900">
              {metric.currentValue}
            </span>
            <span className="text-xs text-stone-500 font-semibold">{metric.unit}</span>
          </div>

          {/* Baseline change indicator */}
          <div
            className={`flex items-center gap-0.5 text-xs font-semibold ${
              metric.changePercentage >= 0 ? 'text-teal-800' : 'text-stone-500'
            }`}
          >
            {metric.changePercentage >= 0 ? (
              <ArrowUpRight className="w-3.5 h-3.5" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5" />
            )}
            <span>
              {metric.changePercentage > 0 ? `+${metric.changePercentage}%` : `${metric.changePercentage}%`} {t('metric.vs_baseline', 'vs baseline')}
            </span>
          </div>
        </div>

        {/* Plain Language Interpretation Layer */}
        <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 my-3 text-xs leading-relaxed text-stone-700 font-normal">
          <div className="flex items-center gap-1 text-[11px] font-semibold text-teal-800 mb-1">
            <Sparkles className="w-3 h-3" /> {t('metric.plain_insight', 'Plain-Language Insight')}
          </div>
          <p>{localizedInsight}</p>
        </div>

        {/* Mini 7-Day Trend Line (Recharts) */}
        <div className="h-20 w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={metric.historicalTrend} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id={`grad-${metric.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0f766e" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#0f766e" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" hide />
              <YAxis domain={['dataMin - 5', 'dataMax + 5']} hide />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-stone-900 border border-stone-800 px-2 py-1 rounded text-[11px] text-white shadow-md">
                        <span className="font-semibold">{payload[0].payload.date}: </span>
                        <span>{payload[0].value} {metric.unit}</span>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#0f766e"
                strokeWidth={2}
                fillOpacity={1}
                fill={`url(#grad-${metric.id})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Expandable Scientific Context & Actionable Guidance */}
      <div className="pt-2 border-t border-stone-100 mt-2">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full flex items-center justify-between text-xs text-stone-500 hover:text-stone-900 py-1 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-1.5 font-medium">
            <Info className="w-3.5 h-3.5 text-stone-400" />
            {showDetails ? t('metric.hide_science', 'Hide Scientific Context') : t('metric.view_protocol', 'View Actionable Protocol')}
          </span>
          {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showDetails && (
          <div className="space-y-2.5 pt-2 text-xs animate-in fade-in duration-150">
            <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-stone-700">
              <strong className="text-stone-900 font-semibold block mb-0.5">{t('metric.actionable_protocol', 'Actionable Protocol')}:</strong>
              {localizedAction}
            </div>
            <div className="p-2.5 rounded-lg bg-stone-50/60 border border-stone-200 text-stone-600 text-[11px]">
              <strong className="text-stone-800 font-semibold block mb-0.5">{t('metric.scientific_context', 'Scientific & Physiological Context')}:</strong>
              {localizedScience}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
