import React from 'react';
import { Sunrise, Sun, Sunset, Moon, Check, BellRing } from 'lucide-react';
import { PrayerItem, PrayerName } from '../types';

interface PrayerListProps {
  prayers: PrayerItem[];
  asrMadhab: 'standard' | 'hanafi';
}

const PRAYER_ICONS: Record<PrayerName, React.ReactNode> = {
  fajr: <Sunrise className="w-5 h-5 text-amber-500 dark:text-amber-400" />,
  sunrise: <Sun className="w-5 h-5 text-amber-500 dark:text-amber-400" />,
  dhuhr: <Sun className="w-5 h-5 text-amber-500 dark:text-amber-400" />,
  asr: <Sunset className="w-5 h-5 text-orange-500 dark:text-orange-400" />,
  maghrib: <Sunset className="w-5 h-5 text-rose-500 dark:text-rose-400" />,
  isha: <Moon className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />,
};

export const PrayerList: React.FC<PrayerListProps> = ({ prayers, asrMadhab }) => {
  return (
    <div className="rounded-3xl bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-800 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 dark:border-stone-800 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Today's Prayer Schedule
          </h3>
          <p className="text-xs text-slate-500 dark:text-stone-400 font-bangla mt-0.5">
            আজকের নামাজের সময়সূচী
          </p>
        </div>
        <div className="text-xs text-slate-500 dark:text-stone-400 font-medium">
          Asr: <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{asrMadhab === 'hanafi' ? 'Hanafi' : 'Standard'}</span>
        </div>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-stone-800/80">
        {prayers.map((prayer) => {
          const isNext = prayer.isNext;
          const isPassed = prayer.isPassed;
          const isCurrent = prayer.isCurrent;

          return (
            <div
              key={prayer.id}
              className={`flex items-center justify-between px-5 py-3.5 transition-colors min-h-[58px] ${
                isNext
                  ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-l-4 border-l-emerald-600 dark:border-l-emerald-500'
                  : isCurrent
                  ? 'bg-amber-50/50 dark:bg-stone-800/40'
                  : 'hover:bg-slate-50/60 dark:hover:bg-stone-800/20'
              }`}
            >
              {/* Left Slot: Icon + Prayer Names */}
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isNext
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : isPassed
                      ? 'bg-slate-100 dark:bg-stone-800 text-slate-400 dark:text-stone-500'
                      : 'bg-emerald-50 dark:bg-stone-800/60'
                  }`}
                >
                  {isNext ? (
                    <BellRing className="w-5 h-5 animate-bounce" />
                  ) : (
                    PRAYER_ICONS[prayer.id]
                  )}
                </div>

                <div>
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`text-base font-bold ${
                        isNext
                          ? 'text-emerald-900 dark:text-emerald-300'
                          : isPassed
                          ? 'text-slate-600 dark:text-stone-400'
                          : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {prayer.nameEn}
                    </span>
                    <span className="text-sm font-bangla font-medium text-slate-500 dark:text-stone-400">
                      {prayer.nameBn}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-stone-500">
                    <span className="font-arabic">{prayer.arabicName}</span>
                    {prayer.id === 'sunrise' && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>Dhuha window opens</span>
                      </>
                    )}
                    {isNext && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                          Next upcoming prayer
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Slot: Formatted Time + Status Tag */}
              <div className="text-right">
                <div
                  className={`text-lg md:text-xl font-bold tabular-nums tracking-tight ${
                    isNext
                      ? 'text-emerald-700 dark:text-emerald-300 text-xl md:text-2xl font-extrabold'
                      : isPassed
                      ? 'text-slate-500 dark:text-stone-400'
                      : 'text-slate-900 dark:text-white'
                  }`}
                >
                  {prayer.formattedTime}
                </div>
                <div className="text-[11px] font-medium mt-0.5">
                  {isNext ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      Upcoming
                    </span>
                  ) : isCurrent ? (
                    <span className="text-amber-600 dark:text-amber-400 font-medium">
                      Current Window
                    </span>
                  ) : isPassed ? (
                    <span className="text-slate-400 dark:text-stone-500 inline-flex items-center gap-0.5">
                      <Check className="w-3 h-3 text-slate-400 dark:text-stone-500" /> Done
                    </span>
                  ) : (
                    <span className="text-slate-400 dark:text-stone-500">Upcoming</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
