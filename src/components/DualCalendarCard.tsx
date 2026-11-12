import React, { useMemo, useState, useEffect } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, Sparkles, Clock } from 'lucide-react';
import { AppSettings, UserLocation } from '../types';
import {
  CalendarDayCell,
  GREGORIAN_MONTHS,
  WEEKDAYS,
  getGregorianMonthGrid,
  getHijriMonthGrid,
  getZonedYMD,
  gregorianYMDToHijri,
  getIslamicOccasion,
  toArabicNumerals,
  toBengaliNumerals,
} from '../utils/calendar';
import { calculatePrayerTimesForYMD } from '../utils/prayer';

interface DualCalendarCardProps {
  location: UserLocation;
  settings: AppSettings;
  now: Date;
}

export const DualCalendarCard: React.FC<DualCalendarCardProps> = ({
  location,
  settings,
  now,
}) => {
  const todayYMD = useMemo(
    () => getZonedYMD(now, location.timeZone),
    [now, location.timeZone]
  );

  const todayHijri = useMemo(
    () => gregorianYMDToHijri(todayYMD.year, todayYMD.month, todayYMD.day),
    [todayYMD.year, todayYMD.month, todayYMD.day]
  );

  // Active Calendar Mode: 'english' (Gregorian) or 'arabic' (Hijri)
  const [calendarTab, setCalendarTab] = useState<'english' | 'arabic'>('english');

  // Viewed month/year for English calendar
  const [viewGYear, setViewGYear] = useState<number>(todayYMD.year);
  const [viewGMonth, setViewGMonth] = useState<number>(todayYMD.month);

  // Viewed month/year for Arabic (Hijri) calendar
  const [viewHYear, setViewHYear] = useState<number>(todayHijri.year);
  const [viewHMonth, setViewHMonth] = useState<number>(todayHijri.month);

  // Selected day (always stored as Gregorian YMD so both tabs stay synchronized)
  const [selectedYMD, setSelectedYMD] = useState<{ year: number; month: number; day: number }>({
    year: todayYMD.year,
    month: todayYMD.month,
    day: todayYMD.day,
  });

  // Sync viewed month & selected day if city timezone changes across midnight
  useEffect(() => {
    setSelectedYMD({
      year: todayYMD.year,
      month: todayYMD.month,
      day: todayYMD.day,
    });
    setViewGYear(todayYMD.year);
    setViewGMonth(todayYMD.month);
    setViewHYear(todayHijri.year);
    setViewHMonth(todayHijri.month);
  }, [location.timeZone, todayYMD.year, todayYMD.month, todayYMD.day, todayHijri.year, todayHijri.month]);

  // Compute grid for English Calendar
  const englishGrid = useMemo(
    () => getGregorianMonthGrid(viewGYear, viewGMonth, todayYMD),
    [viewGYear, viewGMonth, todayYMD]
  );

  // Compute grid for Arabic (Hijri) Calendar
  const arabicGrid = useMemo(
    () => getHijriMonthGrid(viewHYear, viewHMonth, todayYMD),
    [viewHYear, viewHMonth, todayYMD]
  );

  const activeCells = calendarTab === 'english' ? englishGrid.cells : arabicGrid.cells;

  // Navigation handlers
  const handlePrevMonth = () => {
    if (calendarTab === 'english') {
      if (viewGMonth === 1) {
        setViewGMonth(12);
        setViewGYear((y) => y - 1);
      } else {
        setViewGMonth((m) => m - 1);
      }
    } else {
      if (viewHMonth === 1) {
        setViewHMonth(12);
        setViewHYear((y) => y - 1);
      } else {
        setViewHMonth((m) => m - 1);
      }
    }
  };

  const handleNextMonth = () => {
    if (calendarTab === 'english') {
      if (viewGMonth === 12) {
        setViewGMonth(1);
        setViewGYear((y) => y + 1);
      } else {
        setViewGMonth((m) => m + 1);
      }
    } else {
      if (viewHMonth === 12) {
        setViewHMonth(1);
        setViewHYear((y) => y + 1);
      } else {
        setViewHMonth((m) => m + 1);
      }
    }
  };

  const handleJumpToToday = () => {
    setViewGYear(todayYMD.year);
    setViewGMonth(todayYMD.month);
    setViewHYear(todayHijri.year);
    setViewHMonth(todayHijri.month);
    setSelectedYMD({
      year: todayYMD.year,
      month: todayYMD.month,
      day: todayYMD.day,
    });
  };

  const isViewingCurrentMonth =
    calendarTab === 'english'
      ? viewGYear === todayYMD.year && viewGMonth === todayYMD.month
      : viewHYear === todayHijri.year && viewHMonth === todayHijri.month;

  // Selected day details
  const selectedDetails = useMemo(() => {
    const utcDate = new Date(Date.UTC(selectedYMD.year, selectedYMD.month - 1, selectedYMD.day, 12, 0, 0));
    const weekdayIdx = utcDate.getUTCDay();
    const wk = WEEKDAYS[weekdayIdx] || WEEKDAYS[0];
    const gMeta = GREGORIAN_MONTHS[selectedYMD.month - 1] || GREGORIAN_MONTHS[0];
    const hijri = gregorianYMDToHijri(selectedYMD.year, selectedYMD.month, selectedYMD.day);
    const occasion = getIslamicOccasion(hijri.month, hijri.day);
    const isToday =
      selectedYMD.year === todayYMD.year &&
      selectedYMD.month === todayYMD.month &&
      selectedYMD.day === todayYMD.day;

    const prayerTimes = calculatePrayerTimesForYMD(
      location,
      settings,
      selectedYMD.year,
      selectedYMD.month,
      selectedYMD.day
    );

    return {
      isToday,
      weekdayIdx,
      englishFull: `${wk.fullEn}, ${gMeta.en} ${selectedYMD.day}, ${selectedYMD.year}`,
      arabicFull: `${wk.fullAr}، ${toArabicNumerals(hijri.day)} ${hijri.monthNameAr} ${toArabicNumerals(hijri.year)} هـ`,
      hijriEn: hijri.formattedEn,
      banglaFull: `${wk.bn}, ${toBengaliNumerals(hijri.day)} ${hijri.monthNameBn} ${toBengaliNumerals(hijri.year)} হিজরি`,
      occasion,
      prayerTimes,
    };
  }, [selectedYMD, todayYMD, location, settings]);

  const gMonthMeta = GREGORIAN_MONTHS[viewGMonth - 1] || GREGORIAN_MONTHS[0];

  const handleSelectCell = (cell: CalendarDayCell) => {
    setSelectedYMD({
      year: cell.gYear,
      month: cell.gMonth,
      day: cell.gDay,
    });
  };

  return (
    <section
      id="calendar-section"
      aria-label="English and Arabic Calendar"
      className="scroll-mt-28 rounded-3xl bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-800 shadow-xs p-3.5 sm:p-6 space-y-4 transition-colors overflow-hidden"
    >
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-stone-800">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>English &amp; Arabic Calendar</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-stone-400 font-bangla mt-0.5">
            ইংরেজি ও আরবি (হিজরি) ক্যালেন্ডার · আপনার শহরের সময় অনুযায়ী
          </p>
        </div>

        {/* Dual Mode Switcher Tabs (Always clearly visible on Desktop & Mobile) */}
        <div
          role="tablist"
          aria-label="Calendar System"
          className="grid grid-cols-2 p-1 rounded-xl bg-slate-100 dark:bg-stone-800 border border-slate-200/80 dark:border-stone-700 w-full sm:w-auto"
        >
          <button
            role="tab"
            aria-selected={calendarTab === 'english'}
            onClick={() => setCalendarTab('english')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all min-h-[38px] cursor-pointer ${
              calendarTab === 'english'
                ? 'bg-white dark:bg-stone-900 text-emerald-800 dark:text-emerald-300 shadow-xs'
                : 'text-slate-600 dark:text-stone-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            English Calendar
          </button>
          <button
            role="tab"
            aria-selected={calendarTab === 'arabic'}
            onClick={() => setCalendarTab('arabic')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all min-h-[38px] cursor-pointer flex items-center justify-center gap-1.5 ${
              calendarTab === 'arabic'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 dark:text-stone-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>Arabic (Hijri)</span>
            <span className="font-normal opacity-90 hidden xs:inline">هجري</span>
          </button>
        </div>
      </div>

      {/* Today's Side-by-Side English & Arabic Date Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-stone-950/60 border border-slate-200/80 dark:border-stone-800 flex items-center justify-between gap-2">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-stone-500">
              English Date (Today)
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
              {WEEKDAYS[todayYMD.weekdayIndex]?.fullEn}, {GREGORIAN_MONTHS[todayYMD.month - 1]?.en} {todayYMD.day}, {todayYMD.year}
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-700 flex items-center justify-center text-sm font-extrabold text-slate-800 dark:text-stone-200 shrink-0">
            {todayYMD.day}
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/25 border border-emerald-200/70 dark:border-emerald-900/40 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Arabic / Hijri Date · আরবি তারিখ
            </div>
            <div className="text-sm font-bold text-emerald-950 dark:text-emerald-200 mt-0.5 truncate">
              {todayHijri.formattedEn}
            </div>
            <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 mt-0.5" dir="rtl">
              {todayHijri.formattedAr}
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-700 text-amber-200 flex flex-col items-center justify-center leading-none shrink-0 shadow-xs">
            <span className="text-xs font-black">{todayHijri.day}</span>
            <span className="text-[10px] font-bold opacity-90">{toArabicNumerals(todayHijri.day)}</span>
          </div>
        </div>
      </div>

      {/* Month Controls */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <button
          onClick={handlePrevMonth}
          className="w-10 h-10 rounded-xl border border-slate-200 dark:border-stone-800 bg-slate-50 hover:bg-slate-100 dark:bg-stone-800/70 dark:hover:bg-stone-800 flex items-center justify-center text-slate-700 dark:text-stone-200 transition cursor-pointer shrink-0"
          aria-label="Previous Month"
          title="Previous Month"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="text-center min-w-0 flex-1">
          {calendarTab === 'english' ? (
            <>
              <div className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white leading-tight truncate">
                {gMonthMeta.en} {viewGYear}
              </div>
              <div className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400 truncate mt-0.5">
                {englishGrid.hijriSpanLabelEn} · <span dir="rtl">{englishGrid.hijriSpanLabelAr}</span>
              </div>
            </>
          ) : (
            <>
              <div className="text-base sm:text-lg font-extrabold text-emerald-800 dark:text-emerald-300 leading-tight truncate">
                {arabicGrid.monthMeta.en} {viewHYear} AH{' '}
                <span className="font-bold text-slate-700 dark:text-stone-200">
                  ({arabicGrid.monthMeta.ar})
                </span>
              </div>
              <div className="text-[11px] font-medium text-slate-500 dark:text-stone-400 truncate mt-0.5">
                {arabicGrid.gregorianSpanLabelEn} ·{' '}
                <span className="font-bangla">{arabicGrid.monthMeta.bn} {toBengaliNumerals(viewHYear)}</span>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {!isViewingCurrentMonth && (
            <button
              onClick={handleJumpToToday}
              className="px-2.5 h-10 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800 transition cursor-pointer"
            >
              Today
            </button>
          )}
          <button
            onClick={handleNextMonth}
            className="w-10 h-10 rounded-xl border border-slate-200 dark:border-stone-800 bg-slate-50 hover:bg-slate-100 dark:bg-stone-800/70 dark:hover:bg-stone-800 flex items-center justify-center text-slate-700 dark:text-stone-200 transition cursor-pointer shrink-0"
            aria-label="Next Month"
            title="Next Month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 7-Column Weekday Header */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5 text-center pt-1">
        {WEEKDAYS.map((wk) => (
          <div
            key={wk.index}
            className={`py-1.5 rounded-lg text-[11px] font-bold ${
              wk.index === 5
                ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50/70 dark:bg-emerald-950/30'
                : 'text-slate-500 dark:text-stone-400'
            }`}
          >
            <span>{wk.shortEn}</span>
            <span className="hidden sm:inline text-[10px] font-normal opacity-75 ml-1">
              {wk.shortAr}
            </span>
          </div>
        ))}
      </div>

      {/* 7-Column Responsive Dual Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
        {activeCells.map((cell) => {
          const isSelected =
            cell.gYear === selectedYMD.year &&
            cell.gMonth === selectedYMD.month &&
            cell.gDay === selectedYMD.day;

          const primaryNumber = calendarTab === 'english' ? cell.gDay : cell.hDay;
          const secondaryText =
            calendarTab === 'english'
              ? `${toArabicNumerals(cell.hDay)}`
              : `${cell.gMonthShort} ${cell.gDay}`;

          return (
            <button
              key={`${cell.gYear}-${cell.gMonth}-${cell.gDay}`}
              onClick={() => handleSelectCell(cell)}
              className={`relative flex flex-col items-center justify-between py-1.5 px-0.5 sm:p-2 rounded-xl border min-h-[52px] sm:min-h-[64px] transition-all cursor-pointer select-none ${
                cell.isToday
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm ring-2 ring-emerald-500/30'
                  : isSelected
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-600 dark:border-emerald-500 text-emerald-950 dark:text-white ring-1 ring-emerald-500/40'
                  : cell.isCurrentMonth
                  ? cell.isFriday
                    ? 'bg-emerald-50/40 dark:bg-stone-800/60 border-emerald-100 dark:border-stone-800 hover:border-emerald-400 text-slate-900 dark:text-stone-100'
                    : 'bg-white dark:bg-stone-900/70 border-slate-100 dark:border-stone-800 hover:border-emerald-400 text-slate-900 dark:text-stone-100'
                  : 'bg-slate-50/50 dark:bg-stone-950/40 border-transparent text-slate-400 dark:text-stone-600 opacity-60 hover:opacity-90'
              }`}
              aria-label={`${cell.gMonthShort} ${cell.gDay}, ${cell.gYear} — ${cell.hDay} ${cell.hMonthEn} ${cell.hYear} AH`}
            >
              {/* Primary Date Number */}
              <span
                className={`text-xs sm:text-sm font-extrabold tabular-nums leading-none ${
                  cell.isToday
                    ? 'text-white'
                    : cell.isFriday && cell.isCurrentMonth
                    ? 'text-emerald-800 dark:text-emerald-300'
                    : ''
                }`}
              >
                {primaryNumber}
              </span>

              {/* Cross-Calendar Date Underneath */}
              <span
                className={`text-[9px] sm:text-[11px] font-semibold leading-none mt-1 truncate max-w-full ${
                  cell.isToday
                    ? 'text-amber-200'
                    : calendarTab === 'english'
                    ? 'text-emerald-700 dark:text-emerald-400'
                    : 'text-slate-500 dark:text-stone-400'
                }`}
              >
                {calendarTab === 'english' ? (
                  <>
                    <span className="sm:hidden">{secondaryText}</span>
                    <span className="hidden sm:inline">
                      {cell.hDay} · {secondaryText}
                    </span>
                  </>
                ) : (
                  secondaryText
                )}
              </span>

              {/* Islamic Occasion Dot Indicator */}
              {cell.occasion && (
                <span
                  className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full ${
                    cell.isToday
                      ? 'bg-amber-300'
                      : cell.occasion.badgeType === 'eid'
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                  title={cell.occasion.titleEn}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Day Dual Summary + Calculated Prayer Schedule */}
      <div className="rounded-2xl bg-slate-50 dark:bg-stone-950/70 border border-slate-200/80 dark:border-stone-800 p-3.5 sm:p-4 space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                {selectedDetails.isToday ? 'Today’s Schedule' : 'Selected Date'}
              </span>
              {selectedDetails.weekdayIdx === 5 && (
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                  Jummah · الجمعة
                </span>
              )}
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
              {selectedDetails.englishFull}
            </div>
            <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5">
              {selectedDetails.hijriEn}{' '}
              <span className="text-slate-400 dark:text-stone-600 mx-1">·</span>{' '}
              <span dir="rtl" className="inline-block font-bold">
                {selectedDetails.arabicFull}
              </span>
            </div>
            <div className="text-[11px] font-bangla text-slate-500 dark:text-stone-400 mt-0.5">
              {selectedDetails.banglaFull}
            </div>
          </div>

          {selectedDetails.occasion && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-100/90 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>{selectedDetails.occasion.titleEn}</span>
              <span className="opacity-80">({selectedDetails.occasion.titleAr})</span>
            </div>
          )}
        </div>

        {/* Selected Date Prayer Times Grid */}
        <div className="pt-2 border-t border-slate-200/70 dark:border-stone-800">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-stone-400 mb-2">
            <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>
              Prayer times for {location.name.split('(')[0].trim()} on this date:
            </span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-2">
            {selectedDetails.prayerTimes.map((pt) => (
              <div
                key={pt.id}
                className="p-2 rounded-xl bg-white dark:bg-stone-900 border border-slate-200/70 dark:border-stone-800 text-center"
              >
                <div className="text-[10px] font-bold uppercase text-slate-500 dark:text-stone-400">
                  {pt.nameEn}
                </div>
                <div className="text-xs font-extrabold text-slate-900 dark:text-white tabular-nums mt-0.5">
                  {pt.formattedTime}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
