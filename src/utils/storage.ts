import { AppSettings, UserLocation } from '../types';
import { US_CITIES } from '../data/cities';

const SETTINGS_KEY = 'nk_prayer_settings_v1';
const LOCATION_KEY = 'nk_prayer_location_v1';
const FAVORITES_KEY = 'nk_prayer_favorites_v1';
const A2HS_DISMISSED_KEY = 'nk_prayer_a2hs_dismissed_v1';

export const DEFAULT_SETTINGS: AppSettings = {
  calculationMethod: 'isna',
  asrMadhab: 'hanafi', // Most Bangladeshi Muslims in USA follow Hanafi Asr time
  highLatitudeRule: 'twilight',
  minuteOffsets: {
    fajr: 0,
    sunrise: 0,
    dhuhr: 0,
    asr: 0,
    maghrib: 0,
    isha: 0,
  },
  timeFormat24h: false,
  theme: 'system',
  ramadanModeOverride: null,
};

// Default location: New York City (major Bangladeshi community)
export const DEFAULT_LOCATION: UserLocation = {
  type: 'city',
  city: US_CITIES[0],
  name: 'New York City',
  stateCode: 'NY',
  latitude: 40.7128,
  longitude: -74.006,
  timeZone: 'America/New_York',
};

export function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
      minuteOffsets: {
        ...DEFAULT_SETTINGS.minuteOffsets,
        ...(parsed.minuteOffsets || {}),
      },
    };
  } catch (e) {
    console.warn('Failed to load settings from localStorage:', e);
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: AppSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.warn('Failed to save settings to localStorage:', e);
  }
}

export function loadLocation(): UserLocation {
  try {
    const raw = localStorage.getItem(LOCATION_KEY);
    if (!raw) return DEFAULT_LOCATION;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.latitude === 'number' && typeof parsed.longitude === 'number') {
      return parsed;
    }
    return DEFAULT_LOCATION;
  } catch (e) {
    console.warn('Failed to load location from localStorage:', e);
    return DEFAULT_LOCATION;
  }
}

export function saveLocation(loc: UserLocation): void {
  try {
    localStorage.setItem(LOCATION_KEY, JSON.stringify(loc));
  } catch (e) {
    console.warn('Failed to save location to localStorage:', e);
  }
}

export function loadFavorites(): string[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (!raw) return ['panta-ilish', 'noakhali-beef-bhuna', 'crispy-piaju'];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn('Failed to load favorite recipes from localStorage:', e);
    return ['panta-ilish', 'noakhali-beef-bhuna'];
  }
}

export function saveFavorites(favorites: string[]): void {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (e) {
    console.warn('Failed to save favorites to localStorage:', e);
  }
}

export function isA2HSDismissed(): boolean {
  try {
    return localStorage.getItem(A2HS_DISMISSED_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setA2HSDismissed(val: boolean): void {
  try {
    localStorage.setItem(A2HS_DISMISSED_KEY, val ? 'true' : 'false');
  } catch (e) {
    console.warn('Failed to set A2HS dismissed flag:', e);
  }
}
