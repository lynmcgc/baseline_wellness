import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Volume2 } from 'lucide-react';
import { CommunityClass } from '../../types';

interface ClassPlayerModalProps {
  sessionClass: CommunityClass | null;
  onClose: () => void;
}

export const ClassPlayerModal: React.FC<ClassPlayerModalProps> = ({ sessionClass, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [breathPhase, setBreathPhase] = useState<'Inhale (5s)' | 'Hold (2s)' | 'Exhale (5s)' | 'Rest (2s)'>('Inhale (5s)');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Breathing loop (14s total cycle: 5s inhale, 2s hold, 5s exhale, 2s pause)
  useEffect(() => {
    const cycleSecond = secondsElapsed % 14;
    if (cycleSecond < 5) {
      setBreathPhase('Inhale (5s)');
    } else if (cycleSecond < 7) {
      setBreathPhase('Hold (2s)');
    } else if (cycleSecond < 12) {
      setBreathPhase('Exhale (5s)');
    } else {
      setBreathPhase('Rest (2s)');
    }
  }, [secondsElapsed]);

  if (!sessionClass) return null;

  const totalSeconds = sessionClass.durationMinutes * 60;
  const progressPercent = Math.min(100, (secondsElapsed / totalSeconds) * 100);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white border border-stone-200 rounded-3xl shadow-xl overflow-hidden flex flex-col text-center p-6 sm:p-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Details */}
        <div className="space-y-1 pt-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200 inline-block">
            {sessionClass.category} Protocol
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-stone-900 mt-2">
            {sessionClass.title}
          </h2>
          <p className="text-xs text-stone-500 font-normal">{sessionClass.instructor}</p>
        </div>

        {/* Dynamic Breathing Visualizer */}
        <div className="relative flex items-center justify-center py-6">
          <div
            className={`w-44 h-44 rounded-full border-2 border-teal-600/30 bg-teal-50/50 flex flex-col items-center justify-center transition-all duration-1000 ${
              breathPhase.startsWith('Inhale')
                ? 'scale-110 shadow-lg shadow-teal-500/10 bg-teal-100/60 border-teal-600'
                : breathPhase.startsWith('Exhale')
                ? 'scale-90 bg-teal-50/30 border-teal-600/20'
                : 'scale-100 bg-stone-50 border-stone-300'
            }`}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-800 mb-1">
              {isPlaying ? breathPhase : 'Ready'}
            </span>
            <span className="text-2xl font-extrabold font-display text-stone-900">
              {formatTime(secondsElapsed)}
            </span>
            <span className="text-[10px] text-stone-500 mt-1 font-normal">
              {sessionClass.durationMinutes} min total
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-teal-700 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-stone-500 font-normal">
            <span>0:00</span>
            <span>{sessionClass.durationMinutes}:00</span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => {
              setIsPlaying(false);
              setSecondsElapsed(0);
            }}
            className="w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors cursor-pointer border border-stone-200"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-14 h-14 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bold flex items-center justify-center transition-transform hover:scale-105 shadow-md shadow-stone-900/20 cursor-pointer"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
          </button>

          <button
            className="w-10 h-10 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center border border-stone-200"
            title="Audio stream synced"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Compliance Footer note */}
        <p className="text-[11px] text-stone-500 font-normal">
          Autonomic down-regulation protocols are for relaxation and recovery optimization.
        </p>

      </div>
    </div>
  );
};
