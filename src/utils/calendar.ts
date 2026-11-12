export interface HijriMonthMeta {
  num: number;
  en: string;
  shortEn: string;
  ar: string;
  bn: string;
}

export const HIJRI_MONTHS: HijriMonthMeta[] = [
  { num: 1, en: 'Muharram', shortEn: 'Muh', ar: 'محرم', bn: 'মুহাররম' },
  { num: 2, en: 'Safar', shortEn: 'Saf', ar: 'صفر', bn: 'সফর' },
  { num: 3, en: 'Rabi al-Awwal', shortEn: 'Rab I', ar: 'ربيع الأول', bn: 'রবিউল আউয়াল' },
  { num: 4, en: 'Rabi al-Thani', shortEn: 'Rab II', ar: 'ربيع الآخر', bn: 'রবিউস সানি' },
  { num: 5, en: 'Jumada al-Ula', shortEn: 'Jum I', ar: 'جمادى الأولى', bn: 'জমাদিউল আউয়াল' },
  { num: 6, en: 'Jumada al-Akhirah', shortEn: 'Jum II', ar: 'جمادى الآخرة', bn: 'জমাদিউস সানি' },
  { num: 7, en: 'Rajab', shortEn: 'Raj', ar: 'رجب', bn: 'রজব' },
  { num: 8, en: "Sha'ban", shortEn: 'Sha', ar: 'شعبان', bn: 'শাবান' },
  { num: 9, en: 'Ramadan', shortEn: 'Ram', ar: 'رمضان', bn: 'রমজান' },
  { num: 10, en: 'Shawwal', shortEn: 'Shw', ar: 'شوال', bn: 'শাওয়াল' },
  { num: 11, en: "Dhu al-Qi'dah", shortEn: 'Dhu Q', ar: 'ذو القعدة', bn: 'জিলকদ' },
  { num: 12, en: 'Dhu al-Hijjah', shortEn: 'Dhu H', ar: 'ذو الحجة', bn: 'জিলহজ্জ' },
];

export const GREGORIAN_MONTHS = [
  { num: 1, en: 'January', shortEn: 'Jan', ar: 'يناير', bn: 'জানুয়ারি' },
  { num: 2, en: 'February', shortEn: 'Feb', ar: 'فبراير', bn: 'ফেব্রুয়ারি' },
  { num: 3, en: 'March', shortEn: 'Mar', ar: 'مارس', bn: 'মার্চ' },
  { num: 4, en: 'April', shortEn: 'Apr', ar: 'أبريل', bn: 'এপ্রিল' },
  { num: 5, en: 'May', shortEn: 'May', ar: 'مايو', bn: 'মে' },
  { num: 6, en: 'June', shortEn: 'Jun', ar: 'يونيو', bn: 'জুন' },
  { num: 7, en: 'July', shortEn: 'Jul', ar: 'يوليو', bn: 'জুলাই' },
  { num: 8, en: 'August', shortEn: 'Aug', ar: 'أغسطس', bn: 'আগস্ট' },
  { num: 9, en: 'September', shortEn: 'Sep', ar: 'سبتمبر', bn: 'সেপ্টেম্বর' },
  { num: 10, en: 'October', shortEn: 'Oct', ar: 'أكتوبر', bn: 'অক্টোবর' },
  { num: 11, en: 'November', shortEn: 'Nov', ar: 'نوفمبر', bn: 'নভেম্বর' },
  { num: 12, en: 'December', shortEn: 'Dec', ar: 'ديسمبر', bn: 'ডিসেম্বর' },
];

export const WEEKDAYS = [
  { index: 0, shortEn: 'Sun', fullEn: 'Sunday', shortAr: 'أحد', fullAr: 'الأحد', bn: 'রবিবার' },
  { index: 1, shortEn: 'Mon', fullEn: 'Monday', shortAr: 'إثنين', fullAr: 'الإثنين', bn: 'সোমবার' },
  { index: 2, shortEn: 'Tue', fullEn: 'Tuesday', shortAr: 'ثلاثاء', fullAr: 'الثلاثاء', bn: 'মঙ্গলবার' },
  { index: 3, shortEn: 'Wed', fullEn: 'Wednesday', shortAr: 'أربعاء', fullAr: 'الأربعاء', bn: 'বুধবার' },
  { index: 4, shortEn: 'Thu', fullEn: 'Thursday', shortAr: 'خميس', fullAr: 'الخميس', bn: 'বৃহস্পতিবার' },
  { index: 5, shortEn: 'Fri', fullEn: 'Friday', shortAr: 'جمعة', fullAr: 'الجمعة', bn: 'শুক্রবার' },
  { index: 6, shortEn: 'Sat', fullEn: 'Saturday', shortAr: 'سبت', fullAr: 'السبت', bn: 'শনিবার' },
];

const BENGALI_NUMERALS: Record<string, string> = {
  '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
  '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
};

const ARABIC_NUMERALS: Record<string, string> = {
  '0': '٠', '1': '١', '2': '٢', '3': '٣', '4': '٤',
  '5': '٥', '6': '٦', '7': '٧', '8': '٨', '9': '٩',
};

export function toBengaliNumerals(val: string | number): string {
  return val.toString().replace(/[0-9]/g, (digit) => BENGALI_NUMERALS[digit] || digit);
}

export function toArabicNumerals(val: string | number): string {
  return val.toString().replace(/[0-9]/g, (digit) => ARABIC_NUMERALS[digit] || digit);
}

export interface ZonedYMD {
  year: number;
  month: number; // 1..12
  day: number;   // 1..31
  weekdayIndex: number; // 0 (Sun) .. 6 (Sat)
}

/**
 * Extracts exact Year, Month, Day, and Weekday in the target city's IANA timeZone
 */
export function getZonedYMD(date: Date = new Date(), timeZone?: string): ZonedYMD {
  try {
    const tz = timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York';
    const formatter = new Intl.DateTimeFormat('en-US-u-nu-latn', {
      timeZone: tz,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      weekday: 'short',
    });
    const parts = formatter.formatToParts(date);
    const year = parseInt(parts.find((p) => p.type === 'year')?.value || '', 10) || date.getFullYear();
    const month = parseInt(parts.find((p) => p.type === 'month')?.value || '', 10) || date.getMonth() + 1;
    const day = parseInt(parts.find((p) => p.type === 'day')?.value || '', 10) || date.getDate();
    const wk = parts.find((p) => p.type === 'weekday')?.value || '';
    const wkMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    const weekdayIndex = wkMap[wk] ?? new Date(Date.UTC(year, month - 1, day, 12)).getUTCDay();

    return { year, month, day, weekdayIndex };
  } catch {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      weekdayIndex: date.getDay(),
    };
  }
}

// Kuwaiti / Tabular Islamic fallback if Intl islamic-umalqura is unavailable
function tabularGregorianToHijri(gYear: number, gMonth: number, gDay: number): { day: number; month: number; year: number } {
  const m = gMonth;
  const y = gYear;
  const d = gDay;
  let jd =
    Math.floor((1461 * (y + 4800 + Math.floor((m - 14) / 12))) / 4) +
    Math.floor((367 * (m - 2 - 12 * Math.floor((m - 14) / 12))) / 12) -
    Math.floor((3 * Math.floor((y + 4900 + Math.floor((m - 14) / 12)) / 100)) / 4) +
    d -
    32075;

  let l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  l = l - 10631 * n + 354;
  const j =
    Math.floor((10985 - l) / 5316) * Math.floor((50 * l) / 17719) +
    Math.floor(l / 5670) * Math.floor((43 * l) / 15238);
  l =
    l -
    Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
    Math.floor(j / 16) * Math.floor((15238 * j) / 43) +
    29;
  const hMonth = Math.floor((24 * l) / 709);
  const hDay = l - Math.floor((709 * hMonth) / 24);
  const hYear = 30 * n + j - 30;
  return { day: hDay, month: hMonth, year: hYear };
}

let cachedUmalquraFmt: Intl.DateTimeFormat | null | undefined = undefined;

function getUmalquraFormatter(): Intl.DateTimeFormat | null {
  if (cachedUmalquraFmt !== undefined) return cachedUmalquraFmt;
  for (const cal of ['islamic-umalqura', 'islamic-civil', 'islamic']) {
    try {
      const fmt = new Intl.DateTimeFormat(`en-u-ca-${cal}-nu-latn`, {
        timeZone: 'UTC',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      });
      const resolvedCal = fmt.resolvedOptions().calendar;
      if (resolvedCal && resolvedCal.startsWith('islamic')) {
        cachedUmalquraFmt = fmt;
        return fmt;
      }
    } catch {
      // try next calendar
    }
  }
  cachedUmalquraFmt = null;
  return null;
}

export interface HijriDateInfo {
  day: number;
  month: number;
  year: number;
  monthName: string;
  monthNameAr: string;
  monthNameBn: string;
  formattedEn: string;
  formattedAr: string;
  formattedBn: string;
  isRamadan: boolean;
}

/**
 * Converts a specific Gregorian (year, month 1..12, day 1..31) to Hijri (Umm al-Qura)
 */
export function gregorianYMDToHijri(year: number, month: number, day: number): HijriDateInfo {
  const utcNoon = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  let hDay = 1;
  let hMonth = 1;
  let hYear = 1448;

  const fmt = getUmalquraFormatter();
  if (fmt) {
    const parts = fmt.formatToParts(utcNoon);
    const dStr = parts.find((p) => p.type === 'day')?.value;
    const mStr = parts.find((p) => p.type === 'month')?.value;
    const yStr = parts.find((p) => p.type === 'year')?.value;
    const d = dStr ? parseInt(dStr, 10) : NaN;
    const m = mStr ? parseInt(mStr, 10) : NaN;
    const y = yStr ? parseInt(yStr, 10) : NaN;
    if (!isNaN(d) && !isNaN(m) && !isNaN(y) && m >= 1 && m <= 12) {
      hDay = d;
      hMonth = m;
      hYear = y;
    } else {
      const fb = tabularGregorianToHijri(year, month, day);
      hDay = fb.day;
      hMonth = fb.month;
      hYear = fb.year;
    }
  } else {
    const fb = tabularGregorianToHijri(year, month, day);
    hDay = fb.day;
    hMonth = fb.month;
    hYear = fb.year;
  }

  const meta = HIJRI_MONTHS[hMonth - 1] || HIJRI_MONTHS[0];
  const isRamadan = hMonth === 9;

  return {
    day: hDay,
    month: hMonth,
    year: hYear,
    monthName: meta.en,
    monthNameAr: meta.ar,
    monthNameBn: meta.bn,
    formattedEn: `${hDay} ${meta.en} ${hYear} AH`,
    formattedAr: `${toArabicNumerals(hDay)} ${meta.ar} ${toArabicNumerals(hYear)} هـ`,
    formattedBn: `${toBengaliNumerals(hDay)} ${meta.bn}, ${toBengaliNumerals(hYear)} হিজরি`,
    isRamadan,
  };
}

export function getHijriDate(now: Date = new Date(), timeZone?: string): HijriDateInfo {
  const zoned = getZonedYMD(now, timeZone);
  return gregorianYMDToHijri(zoned.year, zoned.month, zoned.day);
}

export interface GregorianDateInfo {
  year: number;
  month: number;
  day: number;
  weekdayIndex: number;
  weekdayEn: string;
  weekdayAr: string;
  weekdayBn: string;
  monthNameEn: string;
  monthNameAr: string;
  monthNameBn: string;
  formattedEn: string;
  formattedShortEn: string;
  formattedAr: string;
  formattedBn: string;
}

export function getGregorianDate(now: Date = new Date(), timeZone?: string): GregorianDateInfo {
  const { year, month, day, weekdayIndex } = getZonedYMD(now, timeZone);
  const gMonth = GREGORIAN_MONTHS[month - 1] || GREGORIAN_MONTHS[0];
  const wk = WEEKDAYS[weekdayIndex] || WEEKDAYS[0];

  return {
    year,
    month,
    day,
    weekdayIndex,
    weekdayEn: wk.fullEn,
    weekdayAr: wk.fullAr,
    weekdayBn: wk.bn,
    monthNameEn: gMonth.en,
    monthNameAr: gMonth.ar,
    monthNameBn: gMonth.bn,
    formattedEn: `${wk.fullEn}, ${gMonth.en} ${day}, ${year}`,
    formattedShortEn: `${wk.shortEn}, ${gMonth.shortEn} ${day}, ${year}`,
    formattedAr: `${wk.fullAr}، ${toArabicNumerals(day)} ${gMonth.ar} ${toArabicNumerals(year)} م`,
    formattedBn: `${wk.bn}, ${toBengaliNumerals(day)} ${gMonth.bn} ${toBengaliNumerals(year)}`,
  };
}

export interface IslamicOccasion {
  titleEn: string;
  titleAr: string;
  titleBn: string;
  badgeType: 'eid' | 'ramadan' | 'major';
}

export function getIslamicOccasion(hMonth: number, hDay: number): IslamicOccasion | null {
  if (hMonth === 1 && hDay === 1) {
    return { titleEn: 'Islamic New Year', titleAr: 'رأس السنة الهجرية', titleBn: 'হিজরি নববর্ষ', badgeType: 'major' };
  }
  if (hMonth === 1 && hDay === 10) {
    return { titleEn: 'Day of Ashura', titleAr: 'يوم عاشوراء', titleBn: 'পবিত্র আশুরা', badgeType: 'major' };
  }
  if (hMonth === 3 && hDay === 12) {
    return { titleEn: '12 Rabi al-Awwal', titleAr: '١٢ ربيع الأول', titleBn: '১২ই রবিউল আউয়াল', badgeType: 'major' };
  }
  if (hMonth === 7 && hDay === 27) {
    return { titleEn: "Al-Isra wal-Mi'raj", titleAr: 'الإسراء والمعراج', titleBn: 'শবে মেরাজ', badgeType: 'major' };
  }
  if (hMonth === 8 && hDay === 15) {
    return { titleEn: "Mid-Sha'ban", titleAr: 'ليلة النصف من شعبان', titleBn: 'শবে বরাত', badgeType: 'major' };
  }
  if (hMonth === 9 && hDay === 1) {
    return { titleEn: '1st of Ramadan', titleAr: 'أول رمضان', titleBn: 'পহেলা রমজান', badgeType: 'ramadan' };
  }
  if (hMonth === 9 && hDay === 27) {
    return { titleEn: '27th Night of Ramadan', titleAr: 'ليلة ٢٧ رمضان', titleBn: '২৭শে রমজান (শবে কদর)', badgeType: 'ramadan' };
  }
  if (hMonth === 10 && hDay === 1) {
    return { titleEn: 'Eid al-Fitr', titleAr: 'عيد الفطر المبارك', titleBn: 'পবিত্র ঈদুল ফিতর', badgeType: 'eid' };
  }
  if (hMonth === 12 && hDay === 9) {
    return { titleEn: 'Day of Arafah', titleAr: 'يوم عرفة', titleBn: 'আরাফার দিন', badgeType: 'major' };
  }
  if (hMonth === 12 && hDay === 10) {
    return { titleEn: 'Eid al-Adha', titleAr: 'عيد الأضحى المبارك', titleBn: 'পবিত্র ঈদুল আজহা', badgeType: 'eid' };
  }
  return null;
}

export interface CalendarDayCell {
  gYear: number;
  gMonth: number; // 1..12
  gDay: number;   // 1..31
  gMonthShort: string;
  hYear: number;
  hMonth: number; // 1..12
  hDay: number;   // 1..30
  hMonthEn: string;
  hMonthAr: string;
  hMonthBn: string;
  weekdayIndex: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isFriday: boolean;
  occasion: IslamicOccasion | null;
}

function buildCellFromUTC(
  utcDate: Date,
  isCurrentMonth: boolean,
  todayYMD: ZonedYMD
): CalendarDayCell {
  const gYear = utcDate.getUTCFullYear();
  const gMonth = utcDate.getUTCMonth() + 1;
  const gDay = utcDate.getUTCDate();
  const weekdayIndex = utcDate.getUTCDay();
  const hijri = gregorianYMDToHijri(gYear, gMonth, gDay);
  const gMeta = GREGORIAN_MONTHS[gMonth - 1] || GREGORIAN_MONTHS[0];

  const isToday =
    gYear === todayYMD.year && gMonth === todayYMD.month && gDay === todayYMD.day;

  return {
    gYear,
    gMonth,
    gDay,
    gMonthShort: gMeta.shortEn,
    hYear: hijri.year,
    hMonth: hijri.month,
    hDay: hijri.day,
    hMonthEn: hijri.monthName,
    hMonthAr: hijri.monthNameAr,
    hMonthBn: hijri.monthNameBn,
    weekdayIndex,
    isCurrentMonth,
    isToday,
    isFriday: weekdayIndex === 5,
    occasion: getIslamicOccasion(hijri.month, hijri.day),
  };
}

/**
 * Generates a full 7-column calendar grid for an English (Gregorian) month,
 * paired with exact Arabic (Hijri) dates on every single cell.
 */
export function getGregorianMonthGrid(
  gYear: number,
  gMonth: number,
  todayYMD: ZonedYMD
): {
  cells: CalendarDayCell[];
  hijriSpanLabelEn: string;
  hijriSpanLabelAr: string;
} {
  const firstOfMonth = new Date(Date.UTC(gYear, gMonth - 1, 1, 12, 0, 0));
  const startWeekday = firstOfMonth.getUTCDay(); // 0=Sun..6=Sat
  const daysInMonth = new Date(Date.UTC(gYear, gMonth, 0, 12, 0, 0)).getUTCDate();

  const totalSlots = Math.ceil((startWeekday + daysInMonth) / 7) * 7;
  const cells: CalendarDayCell[] = [];

  for (let i = 0; i < totalSlots; i++) {
    const dayOffset = i - startWeekday;
    const cellDate = new Date(Date.UTC(gYear, gMonth - 1, 1 + dayOffset, 12, 0, 0));
    const isCurrentMonth = dayOffset >= 0 && dayOffset < daysInMonth;
    cells.push(buildCellFromUTC(cellDate, isCurrentMonth, todayYMD));
  }

  const firstActive = cells.find((c) => c.isCurrentMonth) || cells[0];
  const lastActive = [...cells].reverse().find((c) => c.isCurrentMonth) || cells[cells.length - 1];

  let hijriSpanLabelEn = `${firstActive.hMonthEn} ${firstActive.hYear} AH`;
  let hijriSpanLabelAr = `${firstActive.hMonthAr} ${toArabicNumerals(firstActive.hYear)} هـ`;

  if (firstActive.hMonth !== lastActive.hMonth) {
    if (firstActive.hYear === lastActive.hYear) {
      hijriSpanLabelEn = `${firstActive.hMonthEn} – ${lastActive.hMonthEn} ${firstActive.hYear} AH`;
      hijriSpanLabelAr = `${firstActive.hMonthAr} – ${lastActive.hMonthAr} ${toArabicNumerals(firstActive.hYear)} هـ`;
    } else {
      hijriSpanLabelEn = `${firstActive.hMonthEn} ${firstActive.hYear} – ${lastActive.hMonthEn} ${lastActive.hYear} AH`;
      hijriSpanLabelAr = `${firstActive.hMonthAr} ${toArabicNumerals(firstActive.hYear)} – ${lastActive.hMonthAr} ${toArabicNumerals(lastActive.hYear)} هـ`;
    }
  }

  return { cells, hijriSpanLabelEn, hijriSpanLabelAr };
}

/**
 * Finds the UTC Date for Day 1 of any Hijri month & year (1..12)
 */
function findHijriMonthStartUTC(hYear: number, hMonth: number): Date {
  const approxDays = Math.round((hYear - 1) * 354.367 + (hMonth - 1) * 29.53 + 15);
  const hijriEpochMs = Date.UTC(622, 6, 19, 12, 0, 0);
  let probe = new Date(hijriEpochMs + approxDays * 86400000);

  for (let i = 0; i < 40; i++) {
    const h = gregorianYMDToHijri(
      probe.getUTCFullYear(),
      probe.getUTCMonth() + 1,
      probe.getUTCDate()
    );
    const diffMonths = (hYear - h.year) * 12 + (hMonth - h.month);
    if (diffMonths === 0) break;
    probe = new Date(probe.getTime() + diffMonths * 29 * 86400000);
  }

  for (let i = 0; i < 45; i++) {
    const h = gregorianYMDToHijri(
      probe.getUTCFullYear(),
      probe.getUTCMonth() + 1,
      probe.getUTCDate()
    );
    if (h.year === hYear && h.month === hMonth && h.day === 1) {
      return probe;
    }
    const compare = (h.year - hYear) * 400 + (h.month - hMonth) * 32 + (h.day - 1);
    probe = new Date(probe.getTime() + (compare > 0 ? -86400000 : 86400000));
  }

  return probe;
}

/**
 * Generates a full 7-column calendar grid for an Arabic (Hijri) month,
 * paired with exact English (Gregorian) dates on every single cell.
 */
export function getHijriMonthGrid(
  hYear: number,
  hMonth: number,
  todayYMD: ZonedYMD
): {
  cells: CalendarDayCell[];
  gregorianSpanLabelEn: string;
  monthMeta: HijriMonthMeta;
} {
  const startUTC = findHijriMonthStartUTC(hYear, hMonth);
  const startWeekday = startUTC.getUTCDay();

  // Determine exact length of this Hijri month (29 or 30 days)
  let monthLength = 29;
  for (let d = 28; d <= 31; d++) {
    const checkDate = new Date(startUTC.getTime() + (d - 1) * 86400000);
    const h = gregorianYMDToHijri(
      checkDate.getUTCFullYear(),
      checkDate.getUTCMonth() + 1,
      checkDate.getUTCDate()
    );
    if (h.year === hYear && h.month === hMonth) {
      monthLength = d;
    } else if (d > 28) {
      break;
    }
  }

  const totalSlots = Math.ceil((startWeekday + monthLength) / 7) * 7;
  const cells: CalendarDayCell[] = [];

  for (let i = 0; i < totalSlots; i++) {
    const dayOffset = i - startWeekday;
    const cellDate = new Date(startUTC.getTime() + dayOffset * 86400000);
    const isCurrentMonth = dayOffset >= 0 && dayOffset < monthLength;
    cells.push(buildCellFromUTC(cellDate, isCurrentMonth, todayYMD));
  }

  const firstActive = cells.find((c) => c.isCurrentMonth) || cells[0];
  const lastActive = [...cells].reverse().find((c) => c.isCurrentMonth) || cells[cells.length - 1];
  const g1 = GREGORIAN_MONTHS[firstActive.gMonth - 1];
  const g2 = GREGORIAN_MONTHS[lastActive.gMonth - 1];

  let gregorianSpanLabelEn = `${g1.en} ${firstActive.gYear}`;
  if (firstActive.gMonth !== lastActive.gMonth) {
    gregorianSpanLabelEn =
      firstActive.gYear === lastActive.gYear
        ? `${g1.shortEn} – ${g2.shortEn} ${firstActive.gYear}`
        : `${g1.shortEn} ${firstActive.gYear} – ${g2.shortEn} ${lastActive.gYear}`;
  }

  const monthMeta = HIJRI_MONTHS[hMonth - 1] || HIJRI_MONTHS[0];
  return { cells, gregorianSpanLabelEn, monthMeta };
}
