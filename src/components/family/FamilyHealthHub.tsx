import React from 'react';
import { 
  Users, 
  UserPlus, 
  Bell, 
  ArrowRight, 
  Watch, 
  CircleDot, 
  Activity, 
  HeartPulse, 
  AlertTriangle, 
  Sliders, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { FamilyMember, FamilyAlert } from '../../types';

interface FamilyHealthHubProps {
  familyMembers: FamilyMember[];
  alerts: FamilyAlert[];
  activeViewingMemberId: string | null; // null = viewing primary user profile
  onSelectMemberToView: (memberId: string | null) => void;
  onOpenAddModal: () => void;
  onOpenEditModal: (member: FamilyMember) => void;
  onOpenAlertsModal: () => void;
}

export const FamilyHealthHub: React.FC<FamilyHealthHubProps> = ({
  familyMembers,
  alerts,
  activeViewingMemberId,
  onSelectMemberToView,
  onOpenAddModal,
  onOpenEditModal,
  onOpenAlertsModal,
}) => {
  const activeUnreadAlerts = alerts.filter((a) => !a.isAcknowledged);

  return (
    <div className="w-full bg-white border border-stone-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-800 shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-base sm:text-lg font-bold text-stone-900">
                Family Health Circle & Biometric Alerts
              </h2>
              <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800">
                {familyMembers.length} Profiles Connected
              </span>
            </div>
            <p className="text-xs text-stone-500 font-normal mt-0.5">
              Shared biometric visibility with real-time alerts when low health metrics or fatigue spikes occur
            </p>
          </div>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenAlertsModal}
            className={`text-xs px-3.5 py-2 rounded-xl border font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeUnreadAlerts.length > 0
                ? 'bg-rose-50 border-rose-200 text-rose-900 hover:bg-rose-100 shadow-xs'
                : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
            id="family-hub-alerts-btn"
          >
            <Bell className={`w-3.5 h-3.5 ${activeUnreadAlerts.length > 0 ? 'text-rose-700 animate-bounce' : 'text-stone-500'}`} />
            <span>Alerts Center</span>
            {activeUnreadAlerts.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
                {activeUnreadAlerts.length}
              </span>
            )}
          </button>

          <button
            onClick={onOpenAddModal}
            className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            id="add-family-member-btn"
          >
            <UserPlus className="w-3.5 h-3.5 text-teal-300" />
            <span>Add Family Member</span>
          </button>
        </div>
      </div>

      {/* Family Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5">
        {familyMembers.map((member) => {
          const isSelected = activeViewingMemberId === member.id;
          const memberAlerts = alerts.filter(
            (a) => a.familyMemberId === member.id && !a.isAcknowledged
          );
          const hasActiveAlert = memberAlerts.length > 0;

          return (
            <div
              key={member.id}
              className={`rounded-2xl border p-4 sm:p-5 transition-all flex flex-col justify-between space-y-4 ${
                isSelected
                  ? 'bg-teal-50/60 border-teal-700 ring-2 ring-teal-700 shadow-sm'
                  : hasActiveAlert
                  ? 'bg-rose-50/40 border-rose-200 hover:border-rose-300 shadow-xs'
                  : 'bg-stone-50/60 border-stone-200 hover:border-stone-300 shadow-xs'
              }`}
            >
              {/* Member Top details */}
              <div className="space-y-3">
                
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-10 h-10 rounded-2xl border flex items-center justify-center text-sm font-bold shadow-xs ${member.avatarColor}`}
                    >
                      {member.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-stone-900 text-sm">{member.name}</h3>
                      </div>
                      <span className="text-[11px] text-stone-500 font-medium block">
                        {member.relationship}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenEditModal(member)}
                    className="w-7 h-7 rounded-lg bg-white hover:bg-stone-200 text-stone-500 hover:text-stone-800 border border-stone-200 flex items-center justify-center transition-colors cursor-pointer"
                    title="Edit Thresholds & Permissions"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Readiness & Vitals Bar */}
                <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-stone-600">Daily Recovery Score</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-base font-extrabold text-stone-900">{member.readinessScore}</span>
                      <span className="text-[10px] text-stone-400 font-medium">/100</span>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.2 rounded-full ${
                          member.readinessScore >= 80
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : member.readinessScore >= 65
                            ? 'bg-teal-50 text-teal-800 border border-teal-200'
                            : 'bg-rose-50 text-rose-800 border border-rose-200 animate-pulse'
                        }`}
                      >
                        {member.readinessStatus}
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        member.readinessScore >= 80
                          ? 'bg-emerald-600'
                          : member.readinessScore >= 65
                          ? 'bg-teal-700'
                          : 'bg-rose-600'
                      }`}
                      style={{ width: `${member.readinessScore}%` }}
                    />
                  </div>
                </div>

                {/* Active Alerts or Nominal status */}
                {hasActiveAlert ? (
                  <div className="p-2.5 rounded-xl bg-rose-100/70 border border-rose-200 space-y-1">
                    <div className="flex items-center gap-1.5 text-rose-900 font-bold text-[11px]">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-700 shrink-0" />
                      <span>{memberAlerts.length} Low Metric Alert Triggered</span>
                    </div>
                    <p className="text-[11px] text-rose-800 font-normal line-clamp-2 leading-tight">
                      {memberAlerts[0].message}
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 bg-emerald-50/70 border border-emerald-200 px-2.5 py-1.5 rounded-xl">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>All biometrics in optimal recovery band</span>
                  </div>
                )}

                {/* Device sync and Access Pill */}
                <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                  <div className="flex items-center gap-1.5">
                    {member.connectedWearables.includes('oura') && <CircleDot className="w-3 h-3 text-teal-800" />}
                    {member.connectedWearables.includes('garmin') && <Watch className="w-3 h-3 text-teal-800" />}
                    {member.connectedWearables.includes('apple_health') && <Activity className="w-3 h-3 text-teal-800" />}
                    {member.connectedWearables.includes('whoop') && <HeartPulse className="w-3 h-3 text-teal-800" />}
                    <span className="capitalize">{member.connectedWearables.join(', ').replace(/_/g, ' ')}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md border border-stone-200">
                    {member.accessLevel.replace(/_/g, ' ')}
                  </span>
                </div>

              </div>

              {/* View / Switch Actions */}
              <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectMemberToView(isSelected ? null : member.id)}
                  className={`w-full py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-teal-800 text-white shadow-xs'
                      : 'bg-white hover:bg-stone-100 border border-stone-200 text-stone-800 hover:border-stone-300'
                  }`}
                >
                  <span>{isSelected ? 'Currently Viewing Vitals' : `View ${member.name.split(' ')[0]}'s Stats`}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Family circle summary note */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-500 bg-stone-50 p-3 rounded-2xl border border-stone-200 font-normal">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-teal-800 shrink-0" />
          <span>
            Family sync standardizes disparate Apple Health, Garmin, WHOOP, and Oura metrics into unified readiness scales.
          </span>
        </div>
        <button
          onClick={onOpenAddModal}
          className="text-teal-800 hover:text-teal-900 font-semibold underline shrink-0 cursor-pointer"
        >
          Add Another Profile
        </button>
      </div>

    </div>
  );
};
