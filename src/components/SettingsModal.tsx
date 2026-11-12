import React from 'react';
import { X, Sliders, RotateCcw, Check, Sparkles } from 'lucide-react';
import { AppSettings, CalculationMethodKey, AsrMadhabKey, HighLatitudeRuleKey, PrayerName } from '../types';
import { DEFAULT_SETTINGS } from '../utils/storage';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
  onOpenGuide: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onOpenGuide,
}) => {
  if (!isOpen) return null;

  const handleMethodChange = (method: CalculationMethodKey) => {
    onUpdateSettings({ ...settings, calculationMethod: method });
  };

  const handleMadhabChange = (madhab: AsrMadhabKey) => {
    onUpdateSettings({ ...settings, asrMadhab: madhab });
  };

  const handleHighLatitudeChange = (rule: HighLatitudeRuleKey) => {
    onUpdateSettings({ ...settings, highLatitudeRule: rule });
  };

  const handleOffsetChange = (prayer: PrayerName, delta: number) => {
    const current = settings.minuteOffsets[prayer] || 0;
    const updated = Math.max(-60, Math.min(60, current + delta));
    onUpdateSettings({
      ...settings,
      minuteOffsets: {
        ...settings.minuteOffsets,
        [prayer]: updated,
      },
    });
  };

  const handleReset = () => {
    onUpdateSettings({
      ...DEFAULT_SETTINGS,
      theme: settings.theme,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-stone-800 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-5 pb-4 border-b border-slate-100 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Calculation Settings
              </h3>
              <p className="text-xs text-slate-500 dark:text-stone-400 font-bangla mt-0.5">
                নামাজের হিসাব পদ্ধতি ও মাযহাব সেটিংস
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-stone-200 hover:bg-slate-100 dark:hover:bg-stone-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Quick Notice to Mosque Guide */}
          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-stone-800/80 border border-amber-200/80 dark:border-stone-700 text-xs text-amber-900 dark:text-amber-200 flex items-center justify-between gap-3">
            <div>
              <strong className="font-semibold">Matching your local mosque timetable?</strong>
              <p className="text-[11px] text-amber-800/90 dark:text-amber-300 mt-0.5">
                Most mosques in the US follow ISNA or Karachi with Hanafi Asr.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenGuide();
              }}
              className="px-3 py-1.5 rounded-lg bg-amber-200/80 dark:bg-stone-700 text-amber-900 dark:text-amber-100 font-semibold text-xs shrink-0 hover:bg-amber-300 dark:hover:bg-stone-600 transition"
            >
              Read Guide
            </button>
          </div>

          {/* 1. Calculation Method */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-stone-400 mb-2">
              Calculation Method · হিসাবের পদ্ধতি
            </label>
            <div className="space-y-2">
              {[
                {
                  id: 'isna' as CalculationMethodKey,
                  title: 'ISNA (Islamic Society of North America) — Recommended',
                  desc: 'Default standard across most US mosques. Fajr 15°, Isha 15°.',
                },
                {
                  id: 'karachi' as CalculationMethodKey,
                  title: 'University of Islamic Sciences, Karachi',
                  desc: 'Popular in South Asian & Bangladeshi community mosques. Fajr 18°, Isha 18°.',
                },
                {
                  id: 'mwl' as CalculationMethodKey,
                  title: 'Muslim World League (MWL)',
                  desc: 'Widely used in Europe and parts of North America. Fajr 18°, Isha 17°.',
                },
                {
                  id: 'egyptian' as CalculationMethodKey,
                  title: 'Egyptian General Authority of Survey',
                  desc: 'Fajr 19.5°, Isha 17.5°.',
                },
                {
                  id: 'makkah' as CalculationMethodKey,
                  title: 'Umm al-Qura University, Makkah',
                  desc: 'Standard Saudi Arabia method. Fajr 18.5°, Isha 90 min after Maghrib.',
                },
              ].map((item) => {
                const isSelected = settings.calculationMethod === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMethodChange(item.id)}
                    className={`w-full p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-950 dark:text-white shadow-xs'
                        : 'border-slate-200 dark:border-stone-800 hover:border-slate-300 dark:hover:border-stone-700 text-slate-800 dark:text-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">{item.title}</span>
                      {isSelected && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-stone-400 mt-1">{item.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Asr School (Madhab) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-stone-400 mb-2">
              Asr Madhab (School) · আসর নামাজের ওয়াক্ত
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  id: 'hanafi' as AsrMadhabKey,
                  title: 'Hanafi (হানাফি)',
                  desc: 'Later time (shadow 2x). Standard across Bangladesh.',
                },
                {
                  id: 'standard' as AsrMadhabKey,
                  title: 'Standard (Shafi‘i / Maliki / Hanbali)',
                  desc: 'Earlier time (shadow 1x length).',
                },
              ].map((item) => {
                const isSelected = settings.asrMadhab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMadhabChange(item.id)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-950 dark:text-white shadow-xs'
                        : 'border-slate-200 dark:border-stone-800 hover:border-slate-300 dark:hover:border-stone-700 text-slate-800 dark:text-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{item.title}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-stone-400 mt-1">{item.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. High Latitude Rule for Northern States */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-stone-400 mb-1">
              High-Latitude Rule · উত্তরাঞ্চলের গ্রীষ্মকালীন নিয়ম
            </label>
            <p className="text-xs text-slate-500 dark:text-stone-400 mb-2">
              Ensures Fajr and Isha calculate properly in summer for Seattle, Minneapolis, Detroit, Buffalo, etc.
            </p>
            <div className="space-y-2">
              {[
                {
                  id: 'twilight' as HighLatitudeRuleKey,
                  title: 'Twilight Angle (Default)',
                  desc: 'Proportional interval based on solar twilight angles. Recommended for US.',
                },
                {
                  id: 'middle' as HighLatitudeRuleKey,
                  title: 'Middle of the Night',
                  desc: 'Splits the night between Sunset and Sunrise in half.',
                },
                {
                  id: 'seventh' as HighLatitudeRuleKey,
                  title: 'Seventh of the Night',
                  desc: 'Allocates the first and last seventh of the night.',
                },
              ].map((item) => {
                const isSelected = settings.highLatitudeRule === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleHighLatitudeChange(item.id)}
                    className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-950 dark:text-white font-medium'
                        : 'border-slate-200 dark:border-stone-800 hover:border-slate-300 text-slate-700 dark:text-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{item.title}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-stone-400 mt-0.5">{item.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Per-Prayer Minute Fine-Tuning */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-stone-400">
                Minute Fine-Tuning (Mosque Offset)
              </label>
              <span className="text-[11px] text-slate-400">Add / subtract minutes</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-stone-400 mb-3">
              Does your local mosque add 2 or 5 minutes for safety buffer? Calibrate each prayer directly:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {(['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'] as PrayerName[]).map((prayer) => {
                const offset = settings.minuteOffsets[prayer] || 0;
                return (
                  <div
                    key={prayer}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-stone-800/50 border border-slate-200 dark:border-stone-800 flex items-center justify-between"
                  >
                    <div className="text-xs font-semibold capitalize text-slate-800 dark:text-stone-200">
                      {prayer}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOffsetChange(prayer, -1)}
                        className="w-6 h-6 rounded-md bg-white dark:bg-stone-700 border border-slate-300 dark:border-stone-600 flex items-center justify-center text-xs font-bold hover:bg-slate-100"
                        title="Subtract 1 minute"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-bold font-mono tabular-nums text-emerald-700 dark:text-emerald-400">
                        {offset > 0 ? `+${offset}` : offset}
                      </span>
                      <button
                        onClick={() => handleOffsetChange(prayer, 1)}
                        className="w-6 h-6 rounded-md bg-white dark:bg-stone-700 border border-slate-300 dark:border-stone-600 flex items-center justify-center text-xs font-bold hover:bg-slate-100"
                        title="Add 1 minute"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. 24-Hour Format Toggle */}
          <div className="pt-2 border-t border-slate-100 dark:border-stone-800 flex items-center justify-between">
            <div>
              <span className="text-sm font-semibold text-slate-900 dark:text-white block">
                24-Hour Clock (সামরিক সময়)
              </span>
              <span className="text-xs text-slate-500 dark:text-stone-400">
                Display 18:30 instead of 6:30 PM
              </span>
            </div>
            <button
              onClick={() => onUpdateSettings({ ...settings, timeFormat24h: !settings.timeFormat24h })}
              className={`w-12 h-7 rounded-full p-1 transition-colors ${
                settings.timeFormat24h ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-stone-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.timeFormat24h ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 dark:bg-stone-950/40 border-t border-slate-100 dark:border-stone-800 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 dark:text-stone-400 dark:hover:text-stone-200"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm transition"
          >
            Save & Done
          </button>
        </div>
      </div>
    </div>
  );
};
