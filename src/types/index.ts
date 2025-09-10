export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin' | 'scientist' | 'analyst';
  consentTimestamp: string;
  lastSeen: string;
  settings: UserSettings;
}

export interface UserSettings {
  trackingEnabled: boolean;
  notifications: boolean;
  dataSharing: boolean;
}

export interface Trip {
  id: string;
  userId: string;
  startTime: string;
  endTime: string;
  origin: Location;
  destination: Location;
  distance: number;
  duration: number;
  mode: TravelMode;
  modeConfidence: number;
  purpose: string;
  coTravelers: number;
  isHousehold: boolean;
  cleanedFlag: boolean;
  sourceDevice: string;
  syncedAt: string;
}

export interface Location {
  lat: number;
  lng: number;
  address?: string;
}

export type TravelMode = 'walk' | 'bus' | 'car' | 'train' | 'auto' | 'bike';

export interface TouristSpot {
  id: string;
  name: string;
  description: string;
  images: string[];
  location: Location;
  ticketCost: number;
  category: string;
  weather: WeatherInfo;
  distanceFromUser?: number;
  travelTime?: number;
}

export interface WeatherInfo {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  forecast: WeatherForecast[];
}

export interface WeatherForecast {
  time: string;
  temperature: number;
  condition: string;
  precipitation: number;
}

export interface AdminAnalytics {
  totalTrips: number;
  uniqueUsers: number;
  modeShare: { [key in TravelMode]: number };
  topODPairs: ODPair[];
  activeAlerts: Alert[];
}

export interface ODPair {
  origin: string;
  destination: string;
  count: number;
  distance: number;
}

export interface Alert {
  id: string;
  type: 'weather' | 'traffic' | 'emergency';
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  location?: Location;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Report {
  id: string;
  name: string;
  type: 'mode_share' | 'od_matrix' | 'peak_hour' | 'purpose_distribution' | 'custom';
  format: 'csv' | 'xlsx' | 'pdf';
  filters: ReportFilters;
  scheduledAt?: string;
  generatedAt?: string;
  downloadUrl?: string;
}

export interface ReportFilters {
  dateRange: {
    from: string;
    to: string;
  };
  region?: string;
  mode?: TravelMode[];
  purpose?: string[];
  userType?: 'all' | 'household' | 'solo';
}