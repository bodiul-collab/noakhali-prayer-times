import { City } from '../data/cities';

export type CalculationMethodKey = 'isna' | 'mwl' | 'egyptian' | 'karachi' | 'makkah';
export type AsrMadhabKey = 'standard' | 'hanafi';
export type HighLatitudeRuleKey = 'twilight' | 'middle' | 'seventh';

export interface AppSettings {
  calculationMethod: CalculationMethodKey;
  asrMadhab: AsrMadhabKey;
  highLatitudeRule: HighLatitudeRuleKey;
  minuteOffsets: {
    fajr: number;
    sunrise: number;
    dhuhr: number;
    asr: number;
    maghrib: number;
    isha: number;
  };
  timeFormat24h: boolean;
  theme: 'light' | 'dark' | 'system';
  ramadanModeOverride: boolean | null; // null = auto detect from Hijri calendar
}

export interface UserLocation {
  type: 'city' | 'coords';
  city?: City;
  name: string;
  stateCode?: string;
  latitude: number;
  longitude: number;
  timeZone: string;
}

export type PrayerName = 'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';

export interface PrayerItem {
  id: PrayerName;
  nameEn: string;
  nameBn: string;
  arabicName: string;
  time: Date;
  formattedTime: string;
  isNext: boolean;
  isPassed: boolean;
  isCurrent: boolean;
}

export interface NextPrayerInfo {
  id: PrayerName;
  nameEn: string;
  nameBn: string;
  time: Date;
  formattedTime: string;
  isTomorrow: boolean;
  countdown: {
    hours: number;
    minutes: number;
    seconds: number;
    formatted: string;
    totalSeconds: number;
  };
}
