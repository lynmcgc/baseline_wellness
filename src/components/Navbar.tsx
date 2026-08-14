import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, LayoutDashboard, Compass, Bell, Users, ChevronDown, UserPlus, AlertTriangle } from 'lucide-react';
import { UserProfile, FamilyMember, FamilyAlert } from '../types';

interface NavbarProps {
  currentView: 'landing' | 'dashboard';
  onViewChange: (view: 'landing' | 'dashboard') => void;
  onOpenGetStarted: () => void;
  userProfile: UserProfile;
  familyMembers?: FamilyMember[];
  familyAlerts?: FamilyAlert[];
  activeViewingMemberId?: string | null;
  onSelectMemberToView?: (memberId: string | null) => void;
  onOpenFamilyAlerts?: () => void;
  onOpenAddFamily?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onViewChange,
  onOpenGetStarted,
  userProfile,
  familyMembers = [],
  familyAlerts = [],
  activeViewingMemberId = null,
  onSelectMemberToView,
  onOpenFamilyAlerts,
  onOpenAddFamily,
}) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unacknowledgedAlerts = familyAlerts.filter((a) => !a.isAcknowledged);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentlyViewingMember = familyMembers.find((m) => m.id === activeViewingMemberId);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => onViewChange('landing')}
          className="flex items-center gap-3 cursor-pointer group"
          id="nav-logo"
        >
          <div className="w-9 h-9 rounded-xl bg-stone-900 text-white p-0.5 shadow-sm flex items-center justify-center transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-stone-900 rounded-[10px] flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400"></span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-lg text-stone-900 tracking-tight">
                BASELINE
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-teal-50 border border-teal-200 text-teal-800">
                Wellness
              </span>
            </div>
            <p className="text-[10px] text-stone-500 font-medium hidden sm:block">Unified Biometric Intelligence</p>
          </div>
        </div>

        {/* Center navigation links for Landing */}
        {currentView === 'landing' ? (
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <a href="#overview" className="hover:text-stone-900 transition-colors">Platform</a>
            <a href="#compatibility" className="hover:text-stone-900 transition-colors">Wearable Sync</a>
            <a href="#science" className="hover:text-stone-900 transition-colors">Science & Insights</a>
            <a href="#community" className="hover:text-stone-900 transition-colors">Community</a>
            <a href="#trust" className="hover:text-stone-900 transition-colors">Compliance & Trust</a>
          </nav>
        ) : (
          <div className="hidden md:flex items-center gap-3 text-xs bg-stone-100/80 border border-stone-200 px-3 py-1.5 rounded-full text-stone-700">
            {currentlyViewingMember ? (
              <span className="flex items-center gap-1.5 text-stone-900 font-semibold">
                <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                Viewing: {currentlyViewingMember.name} ({currentlyViewingMember.relationship})
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-teal-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                {userProfile.connectedWearables.length} Devices Active
              </span>
            )}
            <span className="text-stone-300">|</span>
            <span className="capitalize text-stone-600 font-medium">
              Goal: {userProfile.goal.replace('_', ' ')}
            </span>
          </div>
        )}

        {/* Right Action Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Family Alerts Bell (When on dashboard) */}
          {currentView === 'dashboard' && (
            <button
              onClick={onOpenFamilyAlerts}
              className={`relative w-9 h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                unacknowledgedAlerts.length > 0
                  ? 'bg-rose-50 border-rose-200 text-rose-800 hover:bg-rose-100 shadow-xs'
                  : 'bg-stone-50 border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
              title="Family Health Alerts"
              id="nav-family-alerts-bell"
            >
              <Bell className={`w-4 h-4 ${unacknowledgedAlerts.length > 0 ? 'text-rose-700 animate-bounce' : ''}`} />
              {unacknowledgedAlerts.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {unacknowledgedAlerts.length}
                </span>
              )}
            </button>
          )}

          {/* Quick Experience Toggle */}
          <div className="bg-stone-100 border border-stone-200 p-1 rounded-xl flex items-center gap-1 text-xs">
            <button
              id="view-toggle-landing"
              onClick={() => onViewChange('landing')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                currentView === 'landing'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-stone-600" />
              <span className="hidden sm:inline">Public</span> Overview
            </button>
            <button
              id="view-toggle-dashboard"
              onClick={() => onViewChange('dashboard')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                currentView === 'dashboard'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Member Hub
            </button>
          </div>

          {currentView === 'landing' ? (
            <button
              id="nav-get-started-btn"
              onClick={onOpenGetStarted}
              className="bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs sm:text-sm px-4 py-2 rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-300" />
              Get Started
            </button>
          ) : (
            /* User / Family Switcher Dropdown */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-200 transition-colors cursor-pointer"
                id="profile-dropdown-btn"
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                  currentlyViewingMember ? currentlyViewingMember.avatarColor : 'bg-stone-900 text-white'
                }`}>
                  {(currentlyViewingMember ? currentlyViewingMember.name : userProfile.name).slice(0, 2).toUpperCase()}
                </div>
                <div className="text-left hidden sm:block">
                  <span className="text-xs font-bold text-stone-900 block leading-none truncate max-w-[100px]">
                    {currentlyViewingMember ? currentlyViewingMember.name : userProfile.name}
                  </span>
                  <span className="text-[10px] text-stone-500 font-medium">
                    {currentlyViewingMember ? currentlyViewingMember.relationship : 'Primary Profile'}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
              </button>

              {/* Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-stone-200 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150 text-xs">
                  <div className="px-3 py-2 border-b border-stone-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Switch View / Profile</span>
                  </div>

                  {/* Primary user */}
                  <button
                    onClick={() => {
                      onSelectMemberToView?.(null);
                      setIsProfileMenuOpen(false);
                    }}
                    className={`w-full p-2 rounded-xl flex items-center justify-between text-left transition-colors cursor-pointer ${
                      activeViewingMemberId === null
                        ? 'bg-teal-50 text-teal-950 font-bold border border-teal-200'
                        : 'hover:bg-stone-50 text-stone-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-stone-900 text-white flex items-center justify-center text-[10px] font-bold">
                        {userProfile.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <span className="block">{userProfile.name}</span>
                        <span className="text-[10px] text-stone-500 font-normal">My Personal Vitals</span>
                      </div>
                    </div>
                    {activeViewingMemberId === null && <span className="text-[10px] text-teal-800 font-bold">Active</span>}
                  </button>

                  {/* Family Members Header */}
                  {familyMembers.length > 0 && (
                    <div className="px-3 pt-2 pb-1 border-t border-stone-100 mt-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1">
                        <Users className="w-3 h-3" /> Family Circle ({familyMembers.length})
                      </span>
                    </div>
                  )}

                  {/* Family members list */}
                  {familyMembers.map((member) => {
                    const isMemberActive = activeViewingMemberId === member.id;
                    const hasAlert = familyAlerts.some(
                      (a) => a.familyMemberId === member.id && !a.isAcknowledged
                    );

                    return (
                      <button
                        key={member.id}
                        onClick={() => {
                          onSelectMemberToView?.(member.id);
                          setIsProfileMenuOpen(false);
                        }}
                        className={`w-full p-2 rounded-xl flex items-center justify-between text-left transition-colors cursor-pointer ${
                          isMemberActive
                            ? 'bg-teal-50 text-teal-950 font-bold border border-teal-200'
                            : 'hover:bg-stone-50 text-stone-800'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-md border flex items-center justify-center text-[10px] font-bold ${member.avatarColor}`}>
                            {member.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-1">
                              <span className="block truncate max-w-[120px]">{member.name}</span>
                              {hasAlert && <AlertTriangle className="w-3 h-3 text-rose-600 shrink-0" />}
                            </div>
                            <span className="text-[10px] text-stone-500 font-normal">
                              {member.relationship} · {member.readinessScore}/100
                            </span>
                          </div>
                        </div>
                        {isMemberActive && <span className="text-[10px] text-teal-800 font-bold">Active</span>}
                      </button>
                    );
                  })}

                  {/* Add Family member button */}
                  <div className="pt-2 border-t border-stone-100 mt-1">
                    <button
                      onClick={() => {
                        onOpenAddFamily?.();
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full p-2 rounded-xl text-teal-800 hover:bg-teal-50 font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Add Family Profile</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </header>
  );
};
