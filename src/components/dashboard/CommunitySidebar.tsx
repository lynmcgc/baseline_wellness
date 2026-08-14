import React, { useState } from 'react';
import { Users, Clock, Play } from 'lucide-react';
import { MOCK_CHALLENGES, MOCK_CLASSES } from '../../data/mockMetrics';
import { CommunityChallenge, CommunityClass } from '../../types';

interface CommunitySidebarProps {
  onPlayClass: (cls: CommunityClass) => void;
}

export const CommunitySidebar: React.FC<CommunitySidebarProps> = ({ onPlayClass }) => {
  const [activeTab, setActiveTab] = useState<'challenges' | 'classes' | 'cohorts'>('challenges');
  const [challenges, setChallenges] = useState<CommunityChallenge[]>(MOCK_CHALLENGES);

  const toggleJoin = (id: string) => {
    setChallenges((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              isJoined: !c.isJoined,
              participantsCount: c.isJoined ? c.participantsCount - 1 : c.participantsCount + 1,
              userProgress: c.isJoined ? 0 : 15,
            }
          : c
      )
    );
  };

  return (
    <div className="rounded-2xl bg-white border border-stone-200 p-5 space-y-5 flex flex-col h-full shadow-xs">
      
      {/* Sidebar Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-3">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-teal-800" />
          <h3 className="font-bold text-sm text-stone-900">Community & Guidance</h3>
        </div>
        <span className="text-[10px] font-semibold text-teal-800 px-2 py-0.5 rounded bg-teal-50 border border-teal-200">
          Secondary Hub
        </span>
      </div>

      {/* Internal Tabs */}
      <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl text-xs font-medium border border-stone-200">
        <button
          onClick={() => setActiveTab('challenges')}
          className={`flex-1 py-1.5 rounded-lg text-center transition-all cursor-pointer ${
            activeTab === 'challenges'
              ? 'bg-white text-stone-900 font-semibold shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Challenges
        </button>
        <button
          onClick={() => setActiveTab('classes')}
          className={`flex-1 py-1.5 rounded-lg text-center transition-all cursor-pointer ${
            activeTab === 'classes'
              ? 'bg-white text-stone-900 font-semibold shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Classes
        </button>
        <button
          onClick={() => setActiveTab('cohorts')}
          className={`flex-1 py-1.5 rounded-lg text-center transition-all cursor-pointer ${
            activeTab === 'cohorts'
              ? 'bg-white text-stone-900 font-semibold shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Cohorts
        </button>
      </div>

      {/* Tab Content: Challenges */}
      {activeTab === 'challenges' && (
        <div className="space-y-3 flex-1 overflow-y-auto">
          {challenges.map((ch) => (
            <div
              key={ch.id}
              className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2.5"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-900">{ch.title}</span>
                <span className="text-[11px] text-stone-500">{ch.badge}</span>
              </div>

              <p className="text-[11px] text-stone-600 leading-snug font-normal">{ch.targetDescription}</p>

              {ch.isJoined && (
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-stone-500">
                    <span>Day {ch.currentDay} of {ch.durationDays}</span>
                    <span className="text-teal-800 font-semibold">{ch.userProgress}%</span>
                  </div>
                  <div className="w-full bg-stone-200 h-1 rounded-full overflow-hidden">
                    <div
                      className="bg-teal-700 h-full rounded-full"
                      style={{ width: `${ch.userProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-1 text-xs">
                <span className="text-[11px] text-stone-500 font-normal">
                  {ch.participantsCount.toLocaleString()} participants
                </span>
                <button
                  onClick={() => toggleJoin(ch.id)}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    ch.isJoined
                      ? 'bg-stone-200 text-stone-800 hover:bg-stone-300'
                      : 'bg-stone-900 hover:bg-stone-800 text-white'
                  }`}
                >
                  {ch.isJoined ? 'Joined' : 'Join Challenge'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content: Classes */}
      {activeTab === 'classes' && (
        <div className="space-y-3 flex-1 overflow-y-auto">
          {MOCK_CLASSES.map((cls) => (
            <div
              key={cls.id}
              className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-200 text-stone-800">
                  {cls.category}
                </span>
                <span className="text-[11px] text-stone-500 flex items-center gap-1 font-normal">
                  <Clock className="w-3 h-3" /> {cls.durationMinutes}m
                </span>
              </div>

              <h4 className="text-xs font-semibold text-stone-900">{cls.title}</h4>
              <p className="text-[11px] text-stone-500 font-normal">{cls.instructor}</p>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[10px] text-stone-500 font-normal">
                  {cls.type === 'live' ? cls.scheduledTime : `${cls.attendeesCount} completed`}
                </span>

                <button
                  onClick={() => onPlayClass(cls)}
                  className="bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs px-3 py-1 rounded-lg flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
                >
                  <Play className="w-3 h-3 fill-current" />
                  {cls.type === 'live' ? 'Join Session' : 'Start Player'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content: Anonymized Peer Cohorts */}
      {activeTab === 'cohorts' && (
        <div className="space-y-3 flex-1 overflow-y-auto text-xs">
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-semibold text-stone-900">Endurance Training Cohort</h4>
            <p className="text-[11px] text-stone-600 font-normal">428 athletes optimizing Zone 2 aerobic volume.</p>
            <div className="flex justify-between items-center text-[11px] pt-1">
              <span className="text-stone-500 font-normal">Cohort Avg Readiness:</span>
              <span className="font-bold text-teal-800">82 / 100</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-semibold text-stone-900">Circadian 10 PM Wind-Down</h4>
            <p className="text-[11px] text-stone-600 font-normal">892 professionals prioritizing sleep onset stability.</p>
            <div className="flex justify-between items-center text-[11px] pt-1">
              <span className="text-stone-500 font-normal">Cohort Avg Deep Sleep:</span>
              <span className="font-bold text-teal-800">1h 48m</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-stone-100 border border-stone-200 text-[11px] text-stone-600 font-normal">
            Cohort data is completely aggregated and anonymized in accordance with strict privacy guidelines.
          </div>
        </div>
      )}

    </div>
  );
};
