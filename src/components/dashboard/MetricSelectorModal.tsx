import React, { useState } from 'react';
import { X, Check, SlidersHorizontal } from 'lucide-react';
import { UserGoal } from '../../types';
import { ALL_METRICS, GOAL_HERO_PRESETS } from '../../data/mockMetrics';

interface MetricSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentGoal: UserGoal;
  activeHeroMetricIds: string[];
  onSave: (goal: UserGoal, newHeroMetricIds: string[]) => void;
}

export const MetricSelectorModal: React.FC<MetricSelectorModalProps> = ({
  isOpen,
  onClose,
  currentGoal,
  activeHeroMetricIds,
  onSave,
}) => {
  const [selectedGoal, setSelectedGoal] = useState<UserGoal>(currentGoal);
  const [selectedMetricIds, setSelectedMetricIds] = useState<string[]>(activeHeroMetricIds);

  if (!isOpen) return null;

  const handleGoalPresetSelect = (goal: UserGoal) => {
    setSelectedGoal(goal);
    setSelectedMetricIds(GOAL_HERO_PRESETS[goal].defaultHeroIds);
  };

  const toggleMetric = (id: string) => {
    if (selectedMetricIds.includes(id)) {
      if (selectedMetricIds.length <= 1) return; // keep at least 1
      setSelectedMetricIds(selectedMetricIds.filter((m) => m !== id));
    } else {
      setSelectedMetricIds([...selectedMetricIds, id]);
    }
  };

  const handleSave = () => {
    onSave(selectedGoal, selectedMetricIds);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white border border-stone-200 rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-teal-800" />
            <div>
              <h2 className="text-base sm:text-lg font-bold text-stone-900">
                Configure Dashboard Focus
              </h2>
              <p className="text-xs text-stone-500 font-normal">
                Choose a goal preset or individually select your hero widgets.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-stone-200/70 hover:bg-stone-200 text-stone-600 hover:text-stone-900 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Goal Presets */}
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block">
              1. Choose Goal Archetype
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(Object.keys(GOAL_HERO_PRESETS) as UserGoal[]).map((goalKey) => {
                const preset = GOAL_HERO_PRESETS[goalKey];
                const isSelected = selectedGoal === goalKey;
                return (
                  <button
                    key={goalKey}
                    onClick={() => handleGoalPresetSelect(goalKey)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-teal-50 border-teal-600 text-stone-900 shadow-xs'
                        : 'bg-stone-50/70 border-stone-200 text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold">{preset.label.split('&')[0]}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-teal-800" />}
                    </div>
                    <p className="text-[11px] text-stone-500 line-clamp-2 font-normal">{preset.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Metric Widget Toggles */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                2. Active Hero Metric Cards ({selectedMetricIds.length} active)
              </span>
              <span className="text-[11px] text-stone-500 font-normal">Click to show/hide</span>
            </div>

            <div className="space-y-2">
              {ALL_METRICS.map((metric) => {
                const isChecked = selectedMetricIds.includes(metric.id);
                return (
                  <div
                    key={metric.id}
                    onClick={() => toggleMetric(metric.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isChecked
                        ? 'bg-teal-50/50 border-teal-500/70 text-stone-900'
                        : 'bg-stone-50/50 border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-stone-900">{metric.title}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-200 text-stone-700 uppercase font-medium">
                          {metric.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5 font-normal">{metric.scientificContext}</p>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                        isChecked
                          ? 'border-teal-700 bg-teal-700 text-white'
                          : 'border-stone-300 bg-white'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
          <button
            onClick={() => handleGoalPresetSelect(currentGoal)}
            className="text-xs text-stone-500 hover:text-stone-800 transition-colors cursor-pointer font-medium"
          >
            Reset to preset default
          </button>

          <button
            onClick={handleSave}
            className="bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            Apply Configuration
          </button>
        </div>

      </div>
    </div>
  );
};
