import React from 'react';
import { X, BookOpen, CheckCircle, HelpCircle, Compass, Sliders, ExternalLink } from 'lucide-react';

interface MosqueGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSettings: () => void;
}

export const MosqueGuideModal: React.FC<MosqueGuideModalProps> = ({
  isOpen,
  onClose,
  onOpenSettings,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-stone-800 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-5 pb-4 border-b border-slate-100 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                How to Test Against Your Local Mosque
              </h3>
              <p className="text-xs text-slate-500 dark:text-stone-400 font-bangla mt-0.5">
                মসজিদের সময়সূচীর সাথে মিল রাখার সহজ নির্দেশিকা
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-sm text-slate-700 dark:text-stone-300 leading-relaxed">
          {/* Important Principle: Adhan vs Iqamah */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-stone-800/80 border border-amber-200 dark:border-stone-700 text-amber-950 dark:text-amber-200 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-sm text-amber-900 dark:text-amber-100">
              <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>Crucial Distinction: "Azaan / Begins" vs "Iqamah / Jama'at"</span>
            </div>
            <p>
              Your local mosque timetable prints two times for each prayer:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Beginning Time (Azaan / Start):</strong> When the prayer window enters astronomically. This app calculates this exact astronomical start time.</li>
              <li><strong>Jama'at Time (Iqamah):</strong> When congregation stands to pray (usually 15 to 30 minutes after the prayer enters).</li>
            </ul>
            <p className="font-semibold text-amber-900 dark:text-amber-100">
              Always test this app against the "Begins / Start" column on your mosque's sheet, not the Iqamah column!
            </p>
          </div>

          {/* Step 1: Check Asr Madhab */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center justify-center">1</span>
              <span>Why is my mosque's Asr time different? (Hanafi vs Standard)</span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-stone-400">
              In Bangladesh and most South Asian mosques in the USA (e.g. Jackson Heights NYC, Hamtramck MI, Irving TX), mosques follow the <strong>Hanafi</strong> madhab for Asr, which starts when an object's shadow is twice its length plus noon shadow. This is typically <strong>45 to 60 minutes later</strong> than the Standard Shafi'i/Maliki/Hanbali time.
            </p>
            <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
              👉 If your mosque's Asr is earlier, open <strong>Settings</strong> and switch Asr Madhab to <strong>Standard</strong>.
            </p>
          </div>

          {/* Step 2: Calculation Method */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center justify-center">2</span>
              <span>Fajr & Isha Angles: ISNA (15°) vs Karachi (18°)</span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-stone-400">
              Most North American mosques use <strong>ISNA (15°)</strong> as the baseline standard. However, many traditional Bangladeshi/Pakistani masajid use the <strong>University of Karachi (18°)</strong> method.
            </p>
            <p className="text-xs text-slate-600 dark:text-stone-400">
              An 18° Fajr angle means Fajr begins approximately 12–15 minutes earlier than ISNA 15°. Look at your mosque calendar: if Fajr is ~15 min earlier, switch Calculation Method to <strong>Karachi</strong>.
            </p>
          </div>

          {/* Step 3: Minute Calibration */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center justify-center">3</span>
              <span>Mosque Precautionary Safety Buffers (+2 to +5 mins)</span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-stone-400">
              Many local committees add a 2 or 3-minute safety buffer (Ihtiyat) after Sunset for Maghrib/Iftar, or 5 minutes after solar noon for Dhuhr.
            </p>
            <p className="text-xs text-slate-600 dark:text-stone-400">
              You can calibrate this app to match your exact mosque down to the minute: open <strong>Settings → Minute Fine-Tuning</strong> and add or subtract minutes for each prayer.
            </p>
          </div>

          {/* Step 4: Northern US States */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center justify-center">4</span>
              <span>High Latitude Rule (Summer in Northern States)</span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-stone-400">
              In northern states like Washington, Minnesota, Michigan, Wisconsin, and upstate New York, true night can disappear between May and July. The app's built-in <strong>Twilight Angle Rule</strong> automatically ensures your Fajr and Isha remain accurate and realistic.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-stone-950/40 border-t border-slate-100 dark:border-stone-800 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onOpenSettings();
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Open Settings & Calibrate</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-stone-800 hover:bg-slate-300 dark:hover:bg-stone-700 text-slate-800 dark:text-stone-200 text-xs font-semibold transition"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
