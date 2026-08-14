import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Bell, 
  Watch, 
  CircleDot, 
  Activity, 
  HeartPulse, 
  Zap
} from 'lucide-react';
import { 
  FamilyMember, 
  FamilyRelationship, 
  FamilyAccessLevel, 
  FamilyAlertThresholds, 
  WearableBrand 
} from '../../types';

interface EditFamilyMemberModalProps {
  member: FamilyMember | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateMember: (updated: FamilyMember) => void;
  onRemoveMember: (memberId: string) => void;
  onTriggerSimulatedAlert: (memberId: string) => void;
}

export const EditFamilyMemberModal: React.FC<EditFamilyMemberModalProps> = ({
  member,
  isOpen,
  onClose,
  onUpdateMember,
  onRemoveMember,
  onTriggerSimulatedAlert,
}) => {
  if (!isOpen || !member) return null;

  const [name, setName] = useState(member.name);
  const [relationship, setRelationship] = useState<FamilyRelationship>(member.relationship);
  const [email, setEmail] = useState(member.email);
  const [accessLevel, setAccessLevel] = useState<FamilyAccessLevel>(member.accessLevel);
  const [notificationsEnabled, setNotificationsEnabled] = useState(member.notificationsEnabled);
  const [selectedWearables, setSelectedWearables] = useState<WearableBrand[]>(member.connectedWearables);
  const [thresholds, setThresholds] = useState<FamilyAlertThresholds>(member.alertThresholds);
  const [notes, setNotes] = useState(member.notes || '');

  const toggleWearable = (brand: WearableBrand) => {
    setSelectedWearables((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleSave = () => {
    const updated: FamilyMember = {
      ...member,
      name,
      relationship,
      email,
      accessLevel,
      notificationsEnabled,
      connectedWearables: selectedWearables,
      alertThresholds: thresholds,
      notes,
    };
    onUpdateMember(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white border border-stone-200 rounded-3xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl border flex items-center justify-center text-sm font-bold ${member.avatarColor}`}>
              {member.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900">
                Manage Profile: {member.name}
              </h2>
              <p className="text-xs text-stone-500 font-normal">
                {member.relationship} · {member.accessLevel.replace(/_/g, ' ')}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          
          {/* 1. Profile Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-semibold text-stone-900 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-teal-800"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-900 mb-1">Relationship</label>
              <select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value as FamilyRelationship)}
                className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-teal-800 cursor-pointer"
              >
                <option value="Parent">Parent</option>
                <option value="Spouse / Partner">Spouse / Partner</option>
                <option value="Child">Child</option>
                <option value="Elder">Elder</option>
                <option value="Sibling">Sibling</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-semibold text-stone-900 mb-1">Email / Invite Handle</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-teal-800"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-900 mb-1">Wellness Focus / Notes</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Monitoring fatigue and sleep quality..."
                className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-teal-800"
              />
            </div>
          </div>

          {/* 2. Access Level */}
          <div>
            <label className="block font-semibold text-stone-900 mb-2">Access & Permissions</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'view_and_alerts' as FamilyAccessLevel, label: 'View & Alerts', desc: 'Full stats + low metric alerts' },
                { id: 'view_only' as FamilyAccessLevel, label: 'View Only', desc: 'Read stats without alerts' },
                { id: 'alerts_only' as FamilyAccessLevel, label: 'Alerts Only', desc: 'Alert triggers only' },
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => setAccessLevel(lvl.id)}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                    accessLevel === lvl.id
                      ? 'bg-teal-50 border-teal-800 font-semibold text-stone-900 ring-1 ring-teal-800'
                      : 'bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <span className="font-bold text-xs block">{lvl.label}</span>
                  <span className="text-[10px] text-stone-500 font-normal block leading-tight mt-0.5">{lvl.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Wearable devices */}
          <div>
            <label className="block font-semibold text-stone-900 mb-1.5">Hardware Ingestion Stream</label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'apple_health' as WearableBrand, name: 'Apple Health', icon: Activity },
                { id: 'oura' as WearableBrand, name: 'Oura Ring', icon: CircleDot },
                { id: 'garmin' as WearableBrand, name: 'Garmin', icon: Watch },
                { id: 'whoop' as WearableBrand, name: 'WHOOP', icon: HeartPulse },
              ].map((dev) => {
                const isSelected = selectedWearables.includes(dev.id);
                const Icon = dev.icon;
                return (
                  <button
                    key={dev.id}
                    type="button"
                    onClick={() => toggleWearable(dev.id)}
                    className={`px-3 py-1.5 rounded-lg border text-xs flex items-center gap-1.5 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-teal-50 border-teal-700 text-stone-900 font-semibold'
                        : 'bg-stone-50 border-stone-200 text-stone-600'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{dev.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Alert Thresholds */}
          <div className="space-y-3 pt-1 border-t border-stone-200">
            <div className="flex items-center justify-between">
              <label className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-teal-800" />
                Alert Trigger Thresholds
              </label>
              <span className="text-[11px] text-stone-500 font-normal">Auto-notifies upon drop</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-stone-700">Low Readiness</span>
                  <strong className="text-teal-800">{thresholds.lowReadiness} / 100</strong>
                </div>
                <input
                  type="range"
                  min={40}
                  max={75}
                  value={thresholds.lowReadiness}
                  onChange={(e) => setThresholds({ ...thresholds, lowReadiness: Number(e.target.value) })}
                  className="w-full accent-teal-800"
                />
              </div>

              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-stone-700">Low HRV</span>
                  <strong className="text-teal-800">{thresholds.lowHrv} ms</strong>
                </div>
                <input
                  type="range"
                  min={20}
                  max={55}
                  value={thresholds.lowHrv}
                  onChange={(e) => setThresholds({ ...thresholds, lowHrv: Number(e.target.value) })}
                  className="w-full accent-teal-800"
                />
              </div>

              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-stone-700">Elevated Resting HR</span>
                  <strong className="text-teal-800">{thresholds.highRestingHr} bpm</strong>
                </div>
                <input
                  type="range"
                  min={65}
                  max={95}
                  value={thresholds.highRestingHr}
                  onChange={(e) => setThresholds({ ...thresholds, highRestingHr: Number(e.target.value) })}
                  className="w-full accent-teal-800"
                />
              </div>

              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-stone-700">Low Sleep</span>
                  <strong className="text-teal-800">{thresholds.lowSleep.toFixed(1)} hrs</strong>
                </div>
                <input
                  type="range"
                  min={4.0}
                  max={7.5}
                  step={0.5}
                  value={thresholds.lowSleep}
                  onChange={(e) => setThresholds({ ...thresholds, lowSleep: Number(e.target.value) })}
                  className="w-full accent-teal-800"
                />
              </div>
            </div>
          </div>

          {/* 5. Live Test Trigger */}
          <div className="p-3 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-between gap-3">
            <div>
              <p className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-teal-800" />
                Test Health Alert Event
              </p>
              <p className="text-[11px] text-stone-600 font-normal">
                Simulate an overnight biometric drop to test notifications.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                onTriggerSimulatedAlert(member.id);
                onClose();
              }}
              className="bg-white hover:bg-stone-100 border border-teal-300 text-teal-900 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0"
            >
              Simulate Drop
            </button>
          </div>

          {/* 6. Notifications toggle */}
          <label className="flex items-center gap-2.5 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
              className="w-4 h-4 text-teal-800 rounded border-stone-300 focus:ring-teal-800"
            />
            <span className="font-medium text-stone-800 text-xs">
              Enable real-time push & email notifications for {member.name}
            </span>
          </label>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              if (window.confirm(`Are you sure you want to remove ${member.name} from your Family Circle?`)) {
                onRemoveMember(member.id);
                onClose();
              }
            }}
            className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1.5 px-2 py-1.5 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Remove Profile</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-semibold text-stone-500 hover:text-stone-800 px-3 py-2 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
