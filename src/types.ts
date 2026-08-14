export type UserGoal = 'training_load' | 'stress_resilience' | 'deep_sleep' | 'longevity_health';

export type WearableBrand = 'garmin' | 'apple_health' | 'oura' | 'fitbit' | 'whoop' | 'polar' | 'coros';

export type SubscriptionTier = 'free' | 'starter' | 'pro' | 'family' | 'elite';

export interface WearableDevice {
  id: WearableBrand;
  name: string;
  category: string;
  iconName: string;
  connected: boolean;
  lastSync?: string;
  battery?: number;
}

export type MetricCategory = 'recovery' | 'stress' | 'sleep' | 'activity' | 'vitals';

export interface MetricDataPoint {
  date: string;
  value: number;
  baseline?: number;
  label?: string;
}

export interface MetricDefinition {
  id: string;
  title: string;
  category: MetricCategory;
  unit: string;
  currentValue: number;
  baselineValue: number;
  status: 'optimal' | 'moderate' | 'depleted' | 'elevated' | 'restorative';
  changePercentage: number;
  plainLanguageInsight: string;
  scientificContext: string;
  actionableGuidance: string;
  historicalTrend: MetricDataPoint[];
  icon: string;
  isPremiumOnly?: boolean;
}

export interface CommunityChallenge {
  id: string;
  title: string;
  category: string;
  participantsCount: number;
  durationDays: number;
  currentDay: number;
  userProgress: number; // 0 - 100
  targetDescription: string;
  badge: string;
  isJoined: boolean;
}

export interface CommunityClass {
  id: string;
  title: string;
  instructor: string;
  durationMinutes: number;
  type: 'live' | 'on_demand';
  scheduledTime?: string;
  category: 'Breathwork' | 'Mobility' | 'Zone 2 Cardio' | 'Sleep Protocol' | 'Nervous System Reset';
  attendeesCount: number;
  isSaved?: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  goal: UserGoal;
  tier: SubscriptionTier;
  connectedWearables: WearableBrand[];
  heroMetricIds: string[];
  activeWidgets: string[];
  joinedDate: string;
  familyMembers?: FamilyMember[];
  familyAlerts?: FamilyAlert[];
}

export type FamilyRelationship = 'Spouse / Partner' | 'Parent' | 'Child' | 'Elder' | 'Sibling' | 'Other';
export type FamilyAccessLevel = 'view_and_alerts' | 'view_only' | 'alerts_only';

export interface FamilyAlertThresholds {
  lowReadiness: number; // e.g. 60 / 100
  lowHrv: number; // e.g. 35 ms
  highRestingHr: number; // e.g. 75 bpm
  lowSleep: number; // e.g. 6.0 hrs
  lowSpo2: number; // e.g. 94 %
  highDaytimeStress: number; // e.g. 65 / 100
}

export interface FamilyAlert {
  id: string;
  familyMemberId: string;
  familyMemberName: string;
  relationship: FamilyRelationship;
  metricId: string;
  metricName: string;
  severity: 'critical' | 'warning' | 'info';
  currentValue: number;
  threshold: number;
  unit: string;
  message: string;
  timestamp: string;
  isAcknowledged: boolean;
  actionSuggested: string;
}

export type FamilyMember = {
  id: string;
  name: string;
  relationship: FamilyRelationship;
  avatarColor: string;
  email: string;
  accessLevel: FamilyAccessLevel;
  connectedWearables: WearableBrand[];
  readinessScore: number;
  readinessStatus: 'optimal' | 'moderate' | 'depleted' | 'elevated' | 'restorative';
  lastSync: string;
  alertThresholds: FamilyAlertThresholds;
  metrics: MetricDefinition[];
  activeAlerts: FamilyAlert[];
  notificationsEnabled: boolean;
  notes?: string;
  isInvitedPending?: boolean;
};

export type LanguageCode = 'en' | 'es' | 'fr' | 'de' | 'ja' | 'pt' | 'it' | 'zh';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  region: string;
}

export interface WeatherData {
  city: string;
  country: string;
  lat: number;
  lng: number;
  temperatureC: number;
  temperatureF: number;
  feelsLikeF: number;
  condition: string;
  conditionIcon: 'sunny' | 'partly-cloudy' | 'cloudy' | 'rain' | 'wind' | 'snow';
  humidityPercent: number;
  uvIndex: number;
  uvDescription: string;
  airQualityIndex: number; // US AQI e.g. 28 (Good)
  airQualityLabel: 'Good' | 'Moderate' | 'Sensitive' | 'Unhealthy';
  windSpeedMph: number;
  sunriseTime: string;
  sunsetTime: string;
  optimalOutdoorWindow: string; // e.g. "8:00 AM - 11:30 AM (UV 2, 64°F)"
  circadianLightAdvice: string;
  biometricOutdoorSuitability: 'optimal' | 'moderate' | 'indoor_preferable';
}

export type WellnessLocationCategory =
  | 'cold_plunge_sauna'
  | 'scenic_trail'
  | 'calisthenics_park'
  | 'lap_pool'
  | 'breathwork_studio'
  | 'recovery_lounge';

export interface WellnessLocation {
  id: string;
  name: string;
  category: WellnessLocationCategory;
  categoryLabel: string;
  rating: number;
  reviewCount: number;
  address: string;
  city: string;
  lat: number;
  lng: number;
  distanceMiles?: number;
  tags: string[];
  features?: string[];
  description: string;
  suitabilityForReadiness: 'High Recovery Match' | 'Ideal for Zone 2' | 'Parasympathetic Rest';
  priceLevel: '$' | '$$' | '$$$' | 'Free';
  hours: string;
  phone?: string;
  website?: string;
}

export interface LocalActivitySuggestion {
  id: string;
  title: string;
  type: string;
  locationName: string;
  weatherSuitability: string;
  biometricMatchReason: string;
  duration: string;
  intensity: 'Gentle Recovery' | 'Moderate Aerobic' | 'High Intensity' | 'Restorative';
  recommendedTime: string;
}

export interface PricingPlan {
  id: 'starter' | 'pro' | 'family';
  name: string;
  badge?: string;
  tagline: string;
  monthlyPrice: number;
  annualMonthlyPrice: number; // e.g. $15/mo billed annually
  annualBilledTotal: number; // e.g. $180
  popular?: boolean;
  features: string[];
  highlight?: string;
  ctaText: string;
}

export interface PaymentSubmission {
  planId: 'starter' | 'pro' | 'family';
  interval: 'monthly' | 'annual';
  name: string;
  email: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
  zip: string;
  country: string;
}
