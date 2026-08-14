import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Bell, 
  MessageSquare, 
  ArrowRight, 
  Sparkles, 
  Sliders, 
  Check
} from 'lucide-react';
import { FamilyAlert, FamilyMember } from '../../types';

interface FamilyAlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: FamilyAlert[];
  familyMembers: FamilyMember[];
  onAcknowledgeAlert: (alertId: string) => void;
  onAcknowledgeAll: () => void;
  onOpenEditMember: (member: FamilyMember) => void;
  onViewMemberStats: (memberId: string) => void;
}

export const FamilyAlertsModal: React.FC<FamilyAlertsModalProps> = ({
  isOpen,
  onClose,
  alerts,
  familyMembers,
  onAcknowledgeAlert,
  onAcknowledgeAll,
  onOpenEditMember,
  onViewMemberStats,
}) => {
  const [filter, setFilter] = useState<'all' | 'unacknowledged' | 'critical'>('all');
  const [sentMessageId, setSentMessageId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === 'unacknowledged') return !alert.isAcknowledged;
    if (filter === 'critical') return alert.severity === 'critical';
    return true;
  });

  const unacknowledgedCount = alerts.filter((a) => !a.isAcknowledged).length;

  const handleSendCheckIn = (alert: FamilyAlert) => {
    setSentMessageId(alert.id);
    setTimeout(() => {
      onAcknowledgeAlert(alert.id);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white border border-stone-200 rounded-3xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700 shrink-0">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-stone-900">
                  Family Biometric Alert Center
                </h2>
                {unacknowledgedCount > 0 && (
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-rose-100 border border-rose-200 text-rose-800 animate-pulse">
                    {unacknowledgedCount} Active Alert{unacknowledgedCount > 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-500 font-normal mt-0.5">
                Proactive notifications when a family member's health metrics cross safety thresholds
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 flex items-center justify-center transition-colors cursor-pointer"
            id="close-family-alerts-modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="px-6 py-3 border-b border-stone-200 bg-stone-50/50 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-stone-900 text-white font-semibold shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900'
              }`}
            >
              All Alerts ({alerts.length})
            </button>
            <button
              onClick={() => setFilter('unacknowledged')}
              className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                filter === 'unacknowledged'
                  ? 'bg-stone-900 text-white font-semibold shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900'
              }`}
            >
              Unresolved ({unacknowledgedCount})
            </button>
            <button
              onClick={() => setFilter('critical')}
              className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                filter === 'critical'
                  ? 'bg-stone-900 text-white font-semibold shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900'
              }`}
            >
              Critical Drops
            </button>
          </div>

          {unacknowledgedCount > 0 && (
            <button
              onClick={onAcknowledgeAll}
              className="text-xs text-teal-800 hover:text-teal-900 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Mark All as Acknowledged</span>
            </button>
          )}
        </div>

        {/* Alerts List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          {filteredAlerts.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-stone-900 text-sm">All Family Biometrics in Safe Ranges</h3>
              <p className="text-xs text-stone-500 font-normal max-w-sm mx-auto">
                None of your connected family members currently have readings below their configured thresholds. You'll receive real-time alerts if anomalies occur.
              </p>
            </div>
          ) : (
            filteredAlerts.map((alert) => {
              const matchedMember = familyMembers.find((m) => m.id === alert.familyMemberId);
              const isSent = sentMessageId === alert.id;

              return (
                <div
                  key={alert.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all space-y-3.5 ${
                    !alert.isAcknowledged
                      ? 'bg-white border-rose-200 shadow-xs ring-1 ring-rose-100'
                      : 'bg-stone-50/80 border-stone-200 opacity-80'
                  }`}
                >
                  {/* Top line: Member name, severity, timestamp */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-bold ${
                        matchedMember?.avatarColor || 'bg-stone-100 text-stone-800 border-stone-200'
                      }`}>
                        {alert.familyMemberName.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-stone-900 font-bold">{alert.familyMemberName}</strong>
                          <span className="text-[11px] text-stone-500 font-normal">({alert.relationship})</span>
                          <span
                            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                              alert.severity === 'critical'
                                ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                : 'bg-amber-100 text-amber-800 border border-amber-200'
                            }`}
                          >
                            {alert.severity === 'critical' ? 'Critical Drop' : 'Low Metric Alert'}
                          </span>
                        </div>
                        <span className="text-[11px] text-stone-500 font-normal block">{alert.timestamp}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-rose-700 block">
                        {alert.currentValue} {alert.unit}
                      </span>
                      <span className="text-[10px] text-stone-500 font-normal">
                        Threshold: {alert.threshold} {alert.unit}
                      </span>
                    </div>
                  </div>

                  {/* Message & Plain language explanation */}
                  <div className="space-y-1.5 bg-stone-50 p-3 rounded-xl border border-stone-200">
                    <p className="text-xs font-medium text-stone-800 leading-relaxed">
                      {alert.message}
                    </p>
                    <div className="flex items-start gap-1.5 pt-1 text-[11px] text-stone-600 font-normal">
                      <Sparkles className="w-3.5 h-3.5 text-teal-800 shrink-0 mt-0.5" />
                      <span><strong>Care Guidance:</strong> {alert.actionSuggested}</span>
                    </div>
                  </div>

                  {/* Actions row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onViewMemberStats(alert.familyMemberId);
                          onClose();
                        }}
                        className="text-xs text-stone-700 hover:text-stone-900 bg-white border border-stone-200 px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 cursor-pointer hover:border-stone-300"
                      >
                        <span>View {alert.familyMemberName.split(' ')[0]}'s Full Stats</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      {matchedMember && (
                        <button
                          onClick={() => {
                            onOpenEditMember(matchedMember);
                            onClose();
                          }}
                          className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 px-2 py-1 cursor-pointer font-medium"
                        >
                          <Sliders className="w-3 h-3" />
                          <span>Adjust Alert Threshold</span>
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSendCheckIn(alert)}
                        disabled={isSent}
                        className={`text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                          isSent
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-teal-50 border border-teal-200 text-teal-900 hover:bg-teal-100'
                        }`}
                      >
                        {isSent ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-800" />
                            <span>Check-In Sent!</span>
                          </>
                        ) : (
                          <>
                            <MessageSquare className="w-3.5 h-3.5 text-teal-800" />
                            <span>Send Care Check-In</span>
                          </>
                        )}
                      </button>

                      {!alert.isAcknowledged && (
                        <button
                          onClick={() => onAcknowledgeAlert(alert.id)}
                          className="text-xs bg-stone-900 hover:bg-stone-800 text-white font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          Acknowledge
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs">
          <span className="text-stone-500 font-normal">
            Alerts evaluate nocturnal autonomic trends and wearable streams every 15 minutes.
          </span>
          <button
            onClick={onClose}
            className="bg-stone-900 hover:bg-stone-800 text-white font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
