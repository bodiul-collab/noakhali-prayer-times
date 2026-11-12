import React from 'react';
import { Clock, Calendar, Sunrise, Sun, Sunset, Moon, Sparkles } from 'lucide-react';
import { NextPrayerInfo, PrayerName, UserLocation } from '../types';

interface NextPrayerCardProps {
  nextPrayer: NextPrayerInfo;
  gregorianDate?: {
    formattedEn: string;
    formattedShortEn: string;
  };
  hijriDate: {
    formattedEn: string;
    formattedAr?: string;
    formattedBn: string;
    isRamadan: boolean;
  };
  location: UserLocation;
  currentTimeFormatted: string;
  asrMadhab: 'standard' | 'hanafi';
}

const PRAYER_ICONS: Record<PrayerName, React.ReactNode> = {
  fajr: <Sunrise className="w-6 h-6 text-amber-300" />,
  sunrise: <Sun className="w-6 h-6 text-amber-400" />,
  dhuhr: <Sun className="w-6 h-6 text-amber-300" />,
  asr: <Sunset className="w-6 h-6 text-orange-300" />,
  maghrib: <Sunset className="w-6 h-6 text-rose-300" />,
  isha: <Moon className="w-6 h-6 text-indigo-300" />,
};

export const NextPrayerCard: React.FC<NextPrayerCardProps> = ({
  nextPrayer,
  gregorianDate,
  hijriDate,
  location,
  currentTimeFormatted,
  asrMadhab,
}) => {
  const { countdown } = nextPrayer;

  const scrollToCalendar = () => {
    const el = document.getElementById('calendar-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-950 to-stone-950 text-white shadow-xl border border-emerald-800/40 p-5 sm:p-6 md:p-8">
      {/* Subtle Islamic Arch Decorative SVG Background */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-5 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 200 300" className="w-full h-full object-cover">
          <path d="M100 0 C150 50 200 120 200 220 L200 300 L0 300 L0 220 C0 120 50 50 100 0 Z" fill="currentColor" />
        </svg>
      </div>

      {/* Top Metadata Row: Dual English & Arabic Calendar Dates (Visible on Desktop & Mobile) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-emerald-200/85 mb-5 pb-4 border-b border-emerald-800/50">
        <button
          type="button"
          onClick={scrollToCalendar}
          className="text-left group cursor-pointer space-y-1"
          title="View Full English & Arabic Calendar"
        >
          {gregorianDate && (
            <div className="flex items-center gap-1.5 text-white font-semibold tracking-wide">
              <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="group-hover:text-amber-200 transition-colors">
                {gregorianDate.formattedEn}
              </span>
            </div>
          )}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] sm:text-xs">
            <span className="font-semibold text-amber-200 tracking-wide">
              {hijriDate.formattedEn}
            </span>
            {hijriDate.formattedAr && (
              <>
                <span aria-hidden="true" className="text-emerald-700">·</span>
                <span className="font-semibold text-amber-100/95" dir="rtl">
                  {hijriDate.formattedAr}
                </span>
              </>
            )}
            <span aria-hidden="true" className="text-emerald-700">·</span>
            <span className="font-bangla text-emerald-300">{hijriDate.formattedBn}</span>
          </div>
        </button>

        <div className="flex items-center gap-2 text-emerald-300/90 shrink-0 self-start sm:self-center">
          <Clock className="w-3.5 h-3.5 shrink-0" />
          <span className="tabular-nums font-medium">{currentTimeFormatted}</span>
          <span aria-hidden="true" className="text-emerald-700">·</span>
          <span className="truncate max-w-[160px]">{location.name.split('(')[0].trim()}</span>
        </div>
      </div>

      {/* Main Focus: Next Prayer Title & Rollover Tag */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs font-semibold uppercase tracking-wider text-emerald-300/90 mb-1">
            <span>{nextPrayer.isTomorrow ? 'Next Prayer (Tomorrow)' : 'Next Prayer'}</span>
            <span aria-hidden="true">·</span>
            <span>পরবর্তী নামাজ</span>
          </div>

          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2.5 sm:p-3 rounded-2xl bg-emerald-800/60 border border-emerald-700/60 shadow-inner shrink-0">
              {PRAYER_ICONS[nextPrayer.id] || <Sun className="w-6 h-6 text-amber-300" />}
            </div>
            <div className="min-w-0">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                <span>{nextPrayer.nameEn}</span>
                <span className="text-lg sm:text-xl md:text-2xl font-bangla font-semibold text-emerald-300">
                  {nextPrayer.nameBn}
                </span>
              </h2>
              <div className="text-xs text-emerald-300/70 mt-0.5">
                Starts at <strong className="text-white font-semibold">{nextPrayer.formattedTime}</strong>
                {nextPrayer.id === 'asr' && (
                  <span className="ml-2 text-emerald-400">({asrMadhab === 'hanafi' ? 'Hanafi' : 'Standard'})</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Live Countdown Display */}
        <div className="bg-emerald-950/70 dark:bg-black/40 rounded-2xl p-4 border border-emerald-800/60 md:min-w-[220px]">
          <div className="text-[11px] text-emerald-300/80 uppercase font-medium tracking-wider mb-1">
            Time Remaining · বাকি সময়
          </div>
          <div className="text-3xl md:text-4xl font-extrabold text-amber-300 tabular-nums tracking-tight font-mono">
            {countdown.formatted}
          </div>
          <div className="flex items-center justify-between text-[11px] text-emerald-300/60 font-mono mt-1 px-0.5">
            <span>hours</span>
            <span>mins</span>
            <span>secs</span>
          </div>
        </div>
      </div>

      {/* Rollover notice if after Isha */}
      {nextPrayer.isTomorrow && (
        <div className="mt-4 pt-3 border-t border-emerald-800/40 text-xs text-amber-200/90 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          <span>Isha has concluded for today. Counting down to tomorrow morning's Fajr prayer.</span>
        </div>
      )}
    </div>
  );
};
