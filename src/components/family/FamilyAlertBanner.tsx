import React from 'react';
import { AlertTriangle, Bell, ArrowRight } from 'lucide-react';
import { FamilyAlert, FamilyMember } from '../../types';

interface FamilyAlertBannerProps {
  alerts: FamilyAlert[];
  familyMembers?: FamilyMember[];
  onOpenAlertsModal: () => void;
  onDismissAlert?: (alertId: string) => void;
  onViewMemberStats: (memberId: string) => void;
}

export const FamilyAlertBanner: React.FC<FamilyAlertBannerProps> = ({
  alerts,
  onOpenAlertsModal,
  onViewMemberStats,
}) => {
  const unacknowledgedAlerts = alerts.filter((a) => !a.isAcknowledged);

  if (unacknowledgedAlerts.length === 0) return null;

  // Primary active alert to feature in ribbon
  const primaryAlert = unacknowledgedAlerts[0];
  const totalCount = unacknowledgedAlerts.length;

  return (
    <div className="w-full bg-rose-50 border border-rose-200 rounded-2xl p-4 sm:p-4.5 shadow-xs transition-all animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-700 shrink-0 mt-0.5 sm:mt-0">
            <AlertTriangle className="w-5 h-5 text-rose-700 animate-pulse" />
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-rose-900 text-xs sm:text-sm">
                Low Health Metric Alert: {primaryAlert.familyMemberName} ({primaryAlert.relationship})
              </span>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-rose-200/80 text-rose-900 border border-rose-300">
                {primaryAlert.metricName}
              </span>
              {totalCount > 1 && (
                <span className="text-[10px] font-semibold text-rose-700 underline cursor-pointer" onClick={onOpenAlertsModal}>
                  +{totalCount - 1} more alert{totalCount > 2 ? 's' : ''}
                </span>
              )}
            </div>
            <p className="text-stone-700 font-normal text-xs leading-relaxed">
              {primaryAlert.message}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0 pt-1 sm:pt-0 self-end sm:self-auto">
          <button
            onClick={() => onViewMemberStats(primaryAlert.familyMemberId)}
            className="bg-white hover:bg-rose-100 border border-rose-300 text-rose-900 font-semibold px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>View {primaryAlert.familyMemberName.split(' ')[0]}'s Stats</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onOpenAlertsModal}
            className="bg-rose-800 hover:bg-rose-900 text-white font-bold px-3.5 py-1.5 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            id="view-all-family-alerts-banner-btn"
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Alert Center ({totalCount})</span>
          </button>
        </div>

      </div>
    </div>
  );
};
