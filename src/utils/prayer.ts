import {
  Coordinates,
  CalculationMethod,
  CalculationParameters,
  PrayerTimes,
  HighLatitudeRule,
  Madhab,
  Qibla,
} from 'adhan';
import { AppSettings, NextPrayerInfo, PrayerItem, PrayerName, UserLocation } from '../types';
import {
  getGregorianDate,
  getHijriDate,
  getZonedYMD,
  GregorianDateInfo,
  HijriDateInfo,
  toBengaliNumerals,
} from './calendar';

export { getGregorianDate, getHijriDate, toBengaliNumerals };
export type { GregorianDateInfo, HijriDateInfo };

export function getCalculationParameters(settings: AppSettings): CalculationParameters {
  let params: CalculationParameters;

  switch (settings.calculationMethod) {
    case 'mwl':
      params = CalculationMethod.MuslimWorldLeague();
      break;
    case 'egyptian':
      params = CalculationMethod.Egyptian();
      break;
    case 'karachi':
      params = CalculationMethod.Karachi();
      break;
    case 'makkah':
      params = CalculationMethod.UmmAlQura();
      break;
    case 'isna':
    default:
      params = CalculationMethod.NorthAmerica();
      break;
  }

  // Asr school
  if (settings.asrMadhab === 'hanafi') {
    params.madhab = Madhab.Hanafi;
  } else {
    params.madhab = Madhab.Shafi;
  }

  // High latitude rule for northern US states
  switch (settings.highLatitudeRule) {
    case 'middle':
      params.highLatitudeRule = HighLatitudeRule.MiddleOfTheNight;
      break;
    case 'seventh':
      params.highLatitudeRule = HighLatitudeRule.SeventhOfTheNight;
      break;
    case 'twilight':
    default:
      params.highLatitudeRule = HighLatitudeRule.TwilightAngle;
      break;
  }

  return params;
}

export function formatPrayerTime(date: Date, timeZone: string, use24h: boolean): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timeZone || 'America/New_York',
      hour: 'numeric',
      minute: '2-digit',
      hour12: !use24h,
    }).format(date);
  } catch {
    // Fallback if timeZone string is unrecognized
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    if (use24h) {
      return `${hours.toString().padStart(2, '0')}:${minutes}`;
    }
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes} ${period}`;
  }
}

export interface CalculatedTimesResult {
  times: PrayerTimes;
  tomorrowTimes: PrayerTimes;
  list: PrayerItem[];
  nextPrayer: NextPrayerInfo;
  qiblaDegrees: number;
  qiblaCardinal: { en: string; bn: string };
  qiblaDistance: { km: number; miles: number };
  gregorian: GregorianDateInfo;
  hijri: HijriDateInfo;
  fastingInfo: {
    suhoorEnds: Date;
    formattedSuhoor: string;
    iftarTime: Date;
    formattedIftar: string;
    durationHours: number;
    durationMinutes: number;
    formattedDuration: string;
  };
}

export function calculatePrayerTimesForYMD(
  location: UserLocation,
  settings: AppSettings,
  year: number,
  month: number, // 1..12
  day: number    // 1..31
): { id: PrayerName; nameEn: string; nameBn: string; formattedTime: string }[] {
  const coords = new Coordinates(location.latitude, location.longitude);
  const params = getCalculationParameters(settings);
  const targetDate = new Date(year, month - 1, day);
  const pt = new PrayerTimes(coords, targetDate, params);

  const applyOffset = (date: Date, offsetMinutes: number): Date => {
    if (!offsetMinutes) return date;
    return new Date(date.getTime() + offsetMinutes * 60 * 1000);
  };

  return [
    { id: 'fajr', nameEn: 'Fajr', nameBn: 'ফজর', formattedTime: formatPrayerTime(applyOffset(pt.fajr, settings.minuteOffsets.fajr), location.timeZone, settings.timeFormat24h) },
    { id: 'sunrise', nameEn: 'Sunrise', nameBn: 'সূর্যোদয়', formattedTime: formatPrayerTime(applyOffset(pt.sunrise, settings.minuteOffsets.sunrise), location.timeZone, settings.timeFormat24h) },
    { id: 'dhuhr', nameEn: 'Dhuhr', nameBn: 'যোহর', formattedTime: formatPrayerTime(applyOffset(pt.dhuhr, settings.minuteOffsets.dhuhr), location.timeZone, settings.timeFormat24h) },
    { id: 'asr', nameEn: 'Asr', nameBn: 'আসর', formattedTime: formatPrayerTime(applyOffset(pt.asr, settings.minuteOffsets.asr), location.timeZone, settings.timeFormat24h) },
    { id: 'maghrib', nameEn: 'Maghrib', nameBn: 'মাগরিব', formattedTime: formatPrayerTime(applyOffset(pt.maghrib, settings.minuteOffsets.maghrib), location.timeZone, settings.timeFormat24h) },
    { id: 'isha', nameEn: 'Isha', nameBn: 'ইশা', formattedTime: formatPrayerTime(applyOffset(pt.isha, settings.minuteOffsets.isha), location.timeZone, settings.timeFormat24h) },
  ];
}

export function calculatePrayerTimes(
  location: UserLocation,
  settings: AppSettings,
  now: Date = new Date()
): CalculatedTimesResult {
  const coords = new Coordinates(location.latitude, location.longitude);
  const params = getCalculationParameters(settings);

  // Use the selected city's local calendar date (important when viewing cities in other timezones)
  const cityYMD = getZonedYMD(now, location.timeZone);
  const cityTodayDate = new Date(cityYMD.year, cityYMD.month - 1, cityYMD.day);
  const todayTimes = new PrayerTimes(coords, cityTodayDate, params);

  // Apply minute offsets if specified
  const applyOffset = (date: Date, offsetMinutes: number): Date => {
    if (!offsetMinutes) return date;
    return new Date(date.getTime() + offsetMinutes * 60 * 1000);
  };

  const fajr = applyOffset(todayTimes.fajr, settings.minuteOffsets.fajr);
  const sunrise = applyOffset(todayTimes.sunrise, settings.minuteOffsets.sunrise);
  const dhuhr = applyOffset(todayTimes.dhuhr, settings.minuteOffsets.dhuhr);
  const asr = applyOffset(todayTimes.asr, settings.minuteOffsets.asr);
  const maghrib = applyOffset(todayTimes.maghrib, settings.minuteOffsets.maghrib);
  const isha = applyOffset(todayTimes.isha, settings.minuteOffsets.isha);

  // Tomorrow's times for rollover (in city's local calendar)
  const cityTomorrowDate = new Date(cityYMD.year, cityYMD.month - 1, cityYMD.day + 1);
  const tomorrowTimes = new PrayerTimes(coords, cityTomorrowDate, params);
  const tomorrowFajr = applyOffset(tomorrowTimes.fajr, settings.minuteOffsets.fajr);

  const prayerSchedule: { id: PrayerName; nameEn: string; nameBn: string; arabic: string; time: Date }[] = [
    { id: 'fajr', nameEn: 'Fajr', nameBn: 'ফজর', arabic: 'الفجر', time: fajr },
    { id: 'sunrise', nameEn: 'Sunrise', nameBn: 'সূর্যোদয়', arabic: 'الشروق', time: sunrise },
    { id: 'dhuhr', nameEn: 'Dhuhr', nameBn: 'যোহর', arabic: 'الظهر', time: dhuhr },
    { id: 'asr', nameEn: 'Asr', nameBn: 'আসর', arabic: 'العصر', time: asr },
    { id: 'maghrib', nameEn: 'Maghrib', nameBn: 'মাগরিব', arabic: 'المغرب', time: maghrib },
    { id: 'isha', nameEn: 'Isha', nameBn: 'ইশা', arabic: 'العشاء', time: isha },
  ];

  // Determine which is next:
  // Find the first prayer whose time is strictly after `now`
  let nextItem = prayerSchedule.find((p) => p.time.getTime() > now.getTime());
  let isTomorrow = false;
  let nextPrayerTime: Date;
  let nextPrayerId: PrayerName;
  let nextPrayerEn: string;
  let nextPrayerBn: string;

  if (nextItem) {
    nextPrayerId = nextItem.id;
    nextPrayerEn = nextItem.nameEn;
    nextPrayerBn = nextItem.nameBn;
    nextPrayerTime = nextItem.time;
  } else {
    // Past Isha -> Roll over to tomorrow's Fajr
    isTomorrow = true;
    nextPrayerId = 'fajr';
    nextPrayerEn = 'Tomorrow\'s Fajr';
    nextPrayerBn = 'আগামীকালের ফজর';
    nextPrayerTime = tomorrowFajr;
  }

  // Calculate countdown
  const diffMs = Math.max(0, nextPrayerTime.getTime() - now.getTime());
  const totalSeconds = Math.floor(diffMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const formattedCountdown = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const nextPrayer: NextPrayerInfo = {
    id: nextPrayerId,
    nameEn: nextPrayerEn,
    nameBn: nextPrayerBn,
    time: nextPrayerTime,
    formattedTime: formatPrayerTime(nextPrayerTime, location.timeZone, settings.timeFormat24h),
    isTomorrow,
    countdown: {
      hours,
      minutes,
      seconds,
      formatted: formattedCountdown,
      totalSeconds,
    },
  };

  // Build the list of today's prayer items
  const list: PrayerItem[] = prayerSchedule.map((p, idx) => {
    const isPassed = p.time.getTime() <= now.getTime();
    const isNext = !isTomorrow && nextItem?.id === p.id;
    
    // Check if it's currently the prayer window (between this prayer and the next)
    const nextInList = prayerSchedule[idx + 1];
    const isCurrent = isPassed && (!nextInList || nextInList.time.getTime() > now.getTime());

    return {
      id: p.id,
      nameEn: p.nameEn,
      nameBn: p.nameBn,
      arabicName: p.arabic,
      time: p.time,
      formattedTime: formatPrayerTime(p.time, location.timeZone, settings.timeFormat24h),
      isNext,
      isPassed,
      isCurrent,
    };
  });

  // Calculate Qibla angle in degrees from True North
  const qiblaRaw = Qibla(coords);
  const qiblaDegrees = Math.round(qiblaRaw * 10) / 10;
  const qiblaCardinal = getCompassDirection(qiblaDegrees);
  const qiblaDistance = getKaabaDistance(location.latitude, location.longitude);

  // Calculate English (Gregorian) and Arabic (Hijri) Dates in the city's time zone
  const gregorian = getGregorianDate(now, location.timeZone);
  const hijri = getHijriDate(now, location.timeZone);

  // Fasting info (Suhoor ends at Fajr, Iftar at Maghrib)
  const fastingDiffMs = Math.max(0, maghrib.getTime() - fajr.getTime());
  const fastingHours = Math.floor(fastingDiffMs / (1000 * 60 * 60));
  const fastingMinutes = Math.floor((fastingDiffMs % (1000 * 60 * 60)) / (1000 * 60));

  return {
    times: todayTimes,
    tomorrowTimes,
    list,
    nextPrayer,
    qiblaDegrees,
    qiblaCardinal,
    qiblaDistance,
    gregorian,
    hijri,
    fastingInfo: {
      suhoorEnds: fajr,
      formattedSuhoor: formatPrayerTime(fajr, location.timeZone, settings.timeFormat24h),
      iftarTime: maghrib,
      formattedIftar: formatPrayerTime(maghrib, location.timeZone, settings.timeFormat24h),
      durationHours: fastingHours,
      durationMinutes: fastingMinutes,
      formattedDuration: `${fastingHours} hrs ${fastingMinutes} mins`,
    },
  };
}

export function getCompassDirection(degrees: number): { en: string; bn: string } {
  const directions = [
    { labelEn: 'N', labelBn: 'উত্তর', min: 348.75, max: 360 },
    { labelEn: 'N', labelBn: 'উত্তর', min: 0, max: 11.25 },
    { labelEn: 'NNE', labelBn: 'উত্তর-উত্তরপূর্ব', min: 11.25, max: 33.75 },
    { labelEn: 'NE', labelBn: 'উত্তর-পূর্ব', min: 33.75, max: 56.25 },
    { labelEn: 'ENE', labelBn: 'পূর্ব-উত্তরপূর্ব', min: 56.25, max: 78.75 },
    { labelEn: 'E', labelBn: 'পূর্ব', min: 78.75, max: 101.25 },
    { labelEn: 'ESE', labelBn: 'পূর্ব-দক্ষিণপূর্ব', min: 101.25, max: 123.75 },
    { labelEn: 'SE', labelBn: 'দক্ষিণ-পূর্ব', min: 123.75, max: 146.25 },
    { labelEn: 'SSE', labelBn: 'দক্ষিণ-দক্ষিণপূর্ব', min: 146.25, max: 168.75 },
    { labelEn: 'S', labelBn: 'দক্ষিণ', min: 168.75, max: 191.25 },
    { labelEn: 'SSW', labelBn: 'দক্ষিণ-দক্ষিণপশ্চিম', min: 191.25, max: 213.75 },
    { labelEn: 'SW', labelBn: 'দক্ষিণ-পশ্চিম', min: 213.75, max: 236.25 },
    { labelEn: 'WSW', labelBn: 'পশ্চিম-দক্ষিণপশ্চিম', min: 236.25, max: 258.75 },
    { labelEn: 'W', labelBn: 'পশ্চিম', min: 258.75, max: 281.25 },
    { labelEn: 'WNW', labelBn: 'পশ্চিম-উত্তরপশ্চিম', min: 281.25, max: 303.75 },
    { labelEn: 'NW', labelBn: 'উত্তর-পশ্চিম', min: 303.75, max: 326.25 },
    { labelEn: 'NNW', labelBn: 'উত্তর-উত্তরপশ্চিম', min: 326.25, max: 348.75 },
  ];

  const normalized = (degrees % 360 + 360) % 360;
  const match = directions.find((d) => normalized >= d.min && normalized < d.max);
  return {
    en: match?.labelEn || 'NE',
    bn: match?.labelBn || 'উত্তর-পূর্ব',
  };
}

export const KAABA_COORDINATES = {
  latitude: 21.422487,
  longitude: 39.826206,
  nameEn: 'Kaaba, Makkah al-Mukarramah',
  nameBn: 'পবিত্র কাবা শরিফ, মক্কা মুকাররমা',
};

/**
 * Calculates Great Circle distance between a location and the Kaaba in Makkah using Haversine formula
 */
export function getKaabaDistance(latitude: number, longitude: number): { km: number; miles: number } {
  const R = 6371; // Earth radius in kilometers
  const dLat = ((KAABA_COORDINATES.latitude - latitude) * Math.PI) / 180;
  const dLon = ((KAABA_COORDINATES.longitude - longitude) * Math.PI) / 180;
  const lat1 = (latitude * Math.PI) / 180;
  const lat2 = (KAABA_COORDINATES.latitude * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const km = Math.round(R * c);
  const miles = Math.round(km * 0.621371);

  return { km, miles };
}

/**
 * Provides an astronomically accurate, culturally sensitive explanation of the Qibla bearing
 * to dispel common misconceptions (like flat Mercator map vs 3D spherical Great Circle path).
 */
export function getQiblaExplanation(latitude: number, longitude: number, qiblaDegrees: number): {
  headlineEn: string;
  headlineBn: string;
  detailsEn: string;
  detailsBn: string;
  isNorthAmerica: boolean;
} {
  const cardinal = getCompassDirection(qiblaDegrees);
  const isNorthAmerica = longitude < -50 && longitude > -170 && latitude > 10;
  const isSouthAsia = longitude >= 65 && longitude <= 95 && latitude >= 5 && latitude <= 38;
  const isEurope = longitude >= -15 && longitude <= 45 && latitude >= 35 && latitude <= 65;

  if (isNorthAmerica) {
    return {
      isNorthAmerica: true,
      headlineEn: `Shortest Great Circle path towards North-East (${cardinal.en})`,
      headlineBn: `গোলীয় দূরত্বের সংক্ষিপ্ততম পথ: উত্তর-পূর্ব (${cardinal.bn}) দিক`,
      detailsEn: `From North America, the shortest path along the curved Earth to Makkah heads North-East (${qiblaDegrees}° from True North). While flat 2D maps make Makkah look South-East, that is a flat-map distortion. The spherical Great Circle route is universally verified by ISNA, the Fiqh Council of North America, and Google Qibla Finder.`,
      detailsBn: `উত্তর আমেরিকা থেকে গোলীয় পৃথিবীর সবচেয়ে সংক্ষিপ্ত পথটি উত্তর-পূর্ব দিকে অগ্রসর হয় (${qiblaDegrees}°)। সমতল ২ডি মানচিত্রের কারণে মক্কাকে দক্ষিণ-পূর্ব মনে হতে পারে, কিন্তু বাস্তবে গোলীয় পৃথিবীর গ্রেট-সার্কেল পথটি উত্তর-পূর্ব হয়ে যায়। এটি উত্তর আমেরিকার ফিকহ কাউন্সিল ও ইসলামিক স্কলারদের দ্বারা সর্বসম্মত।`,
    };
  }

  if (isSouthAsia) {
    return {
      isNorthAmerica: false,
      headlineEn: `Direct path across Arabian Sea towards West (${cardinal.en})`,
      headlineBn: `আরব সাগরের দিক দিয়ে সরাসরি পশ্চিম (${cardinal.bn}) দিক`,
      detailsEn: `From Bangladesh and South Asia, Makkah lies to the West at ~${qiblaDegrees}° from True North. Facing slightly North of West (${cardinal.en}) aligns directly with the Kaaba across ~${getKaabaDistance(latitude, longitude).km.toLocaleString()} km.`,
      detailsBn: `বাংলাদেশ ও দক্ষিণ এশিয়া থেকে পবিত্র কাবা শরিফ পশ্চিম দিকে অবস্থিত (সত্যিকারের উত্তর থেকে প্রায় ${qiblaDegrees}°)। এটি প্রায় ${toBengaliNumerals(getKaabaDistance(latitude, longitude).km.toLocaleString())} কিমি সরাসরি পশ্চিম-উত্তরপশ্চিম বরাবর।`,
    };
  }

  if (isEurope) {
    return {
      isNorthAmerica: false,
      headlineEn: `Great Circle heading toward East-South-East (${cardinal.en})`,
      headlineBn: `পূর্ব-দক্ষিণপূর্ব (${cardinal.bn}) দিক`,
      detailsEn: `From the UK and Europe, the Great Circle bearing to Makkah points toward ${cardinal.en} (${qiblaDegrees}° from True North).`,
      detailsBn: `যুক্তরাজ্য ও ইউরোপ থেকে পবিত্র কাবার দিক হলো পূর্ব-দক্ষিণপূর্ব (${cardinal.bn}), যা কম্পাসের ${toBengaliNumerals(qiblaDegrees)}° কোণে অবস্থিত।`,
    };
  }

  return {
    isNorthAmerica: false,
    headlineEn: `Direct forward azimuth: ${qiblaDegrees}° from True North (${cardinal.en})`,
    headlineBn: `সরাসরি দিক: উত্তর থেকে ${toBengaliNumerals(qiblaDegrees)}° (${cardinal.bn})`,
    detailsEn: `Calculated using standard spherical trigonometry (forward azimuth) from coordinates ${latitude.toFixed(3)}°, ${longitude.toFixed(3)}° directly to the Holy Kaaba (21.4225° N, 39.8262° E).`,
    detailsBn: `গোলীয় ত্রিকোণমিতির সূত্র অনুযায়ী আপনার বর্তমান অবস্থান থেকে সরাসরি পবিত্র কাবা শরিফের অবস্থান (${toBengaliNumerals(qiblaDegrees)}°) নির্ণয় করা হয়েছে।`,
  };
}
