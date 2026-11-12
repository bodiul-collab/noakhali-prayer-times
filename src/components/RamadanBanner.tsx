import React from 'react';
import { Moon, Sparkles, Utensils, Clock, CheckCircle2 } from 'lucide-react';

interface RamadanBannerProps {
  isRamadanActive: boolean;
  onToggleRamadanPreview: () => void;
  suhoorTimeFormatted: string;
  iftarTimeFormatted: string;
  fastingDurationFormatted: string;
  suhoorDate: Date;
  iftarDate: Date;
  now: Date;
}

export const RamadanBanner: React.FC<RamadanBannerProps> = ({
  isRamadanActive,
  onToggleRamadanPreview,
  suhoorTimeFormatted,
  iftarTimeFormatted,
  fastingDurationFormatted,
  suhoorDate,
  iftarDate,
  now,
}) => {
  if (!isRamadanActive) {
    return (
      <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-emerald-50 dark:bg-stone-900 border border-emerald-200/70 dark:border-stone-800 text-xs text-emerald-800 dark:text-emerald-300">
        <div className="flex items-center gap-2">
          <Moon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>
            Ramadan Mode: <strong className="font-medium text-emerald-900 dark:text-white">Auto (Off)</strong>
          </span>
          <span aria-hidden="true" className="text-emerald-300 dark:text-stone-700">·</span>
          <span className="hidden sm:inline text-emerald-600 dark:text-stone-400">
            Suhoor ends at Fajr, Iftar at Maghrib
          </span>
        </div>
        <button
          onClick={onToggleRamadanPreview}
          className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-200 underline underline-offset-2 shrink-0 py-1"
        >
          Preview Ramadan Timings
        </button>
      </div>
    );
  }

  // Calculate countdown to Suhoor or Iftar
  const isBeforeSuhoor = now.getTime() < suhoorDate.getTime();
  const isFastingNow = now.getTime() >= suhoorDate.getTime() && now.getTime() < iftarDate.getTime();
  const isAfterIftar = now.getTime() >= iftarDate.getTime();

  let nextEventTitle = 'Time until Iftar (ইফতার বাকি)';
  let targetTime = iftarDate.getTime();

  if (isBeforeSuhoor) {
    nextEventTitle = 'Time until Suhoor ends (সেহরির বাকি)';
    targetTime = suhoorDate.getTime();
  } else if (isAfterIftar) {
    nextEventTitle = 'Iftar completed for today · আলহামদুলিল্লাহ';
  }

  const diffMs = Math.max(0, targetTime - now.getTime());
  const h = Math.floor(diffMs / (1000 * 60 * 60));
  const m = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diffMs % (1000 * 60)) / 1000);
  const formattedCountdown = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

  return (
    <div className="rounded-3xl bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-5 md:p-6 shadow-lg border border-emerald-700/60 relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-emerald-700/50">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <h3 className="font-bold text-sm tracking-wide text-amber-200 uppercase">
            Ramadan Mubarak · মাহে রমজান
          </h3>
          <span aria-hidden="true" className="text-emerald-500">·</span>
          <span className="text-xs text-emerald-200">
            Fasting: <strong className="text-white font-medium">{fastingDurationFormatted}</strong>
          </span>
        </div>
        <button
          onClick={onToggleRamadanPreview}
          className="text-xs text-emerald-200 hover:text-white underline underline-offset-2 py-0.5"
        >
          Exit Preview
        </button>
      </div>

      {/* Two Main Cards: Suhoor & Iftar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Suhoor Ends Card */}
        <div className={`rounded-2xl p-4 border transition-all ${
          isBeforeSuhoor 
            ? 'bg-emerald-950/80 border-amber-400/80 shadow-md ring-1 ring-amber-400/50' 
            : 'bg-emerald-950/40 border-emerald-700/40 opacity-90'
        }`}>
          <div className="flex items-center justify-between text-xs text-emerald-300 mb-1">
            <span className="font-semibold uppercase tracking-wider">Suhoor Ends (সেহরি শেষ)</span>
            <Utensils className="w-3.5 h-3.5 text-amber-300" />
          </div>
          <div className="text-2xl md:text-3xl font-extrabold text-white tabular-nums tracking-tight">
            {suhoorTimeFormatted}
          </div>
          <p className="text-[11px] text-emerald-300/80 mt-1">
            Concludes precisely at Fajr prayer start
          </p>
        </div>

        {/* Iftar Time Card */}
        <div className={`rounded-2xl p-4 border transition-all ${
          isFastingNow 
            ? 'bg-emerald-950/80 border-amber-400/80 shadow-md ring-1 ring-amber-400/50' 
            : 'bg-emerald-950/40 border-emerald-700/40 opacity-90'
        }`}>
          <div className="flex items-center justify-between text-xs text-emerald-300 mb-1">
            <span className="font-semibold uppercase tracking-wider">Iftar Time (ইফতারের সময়)</span>
            <Moon className="w-3.5 h-3.5 text-amber-300" />
          </div>
          <div className="text-2xl md:text-3xl font-extrabold text-amber-300 tabular-nums tracking-tight">
            {iftarTimeFormatted}
          </div>
          <p className="text-[11px] text-emerald-300/80 mt-1">
            Begins at sunset (Maghrib prayer start)
          </p>
        </div>
      </div>

      {/* Dynamic Status / Countdown Footer */}
      <div className="mt-4 pt-3 border-t border-emerald-700/40 flex items-center justify-between text-xs text-emerald-100">
        <div className="flex items-center gap-1.5">
          {isAfterIftar ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <Clock className="w-4 h-4 text-amber-300 shrink-0" />
          )}
          <span>{nextEventTitle}</span>
        </div>
        {!isAfterIftar && (
          <div className="font-mono font-bold text-amber-300 tabular-nums text-sm">
            {formattedCountdown}
          </div>
        )}
      </div>
    </div>
  );
};
