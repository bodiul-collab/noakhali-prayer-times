import React, { useState } from 'react';
import { X, Smartphone, Share, PlusSquare, MoreVertical, Download, Check } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface AddToHomeScreenModalProps {
  isOpen: boolean;
  onClose: (dontShowAgain?: boolean) => void;
}

export const AddToHomeScreenModal: React.FC<AddToHomeScreenModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [platformTab, setPlatformTab] = useState<'ios' | 'android'>(isIOS ? 'ios' : 'android');
  const [dontShowAgain, setDontShowAgain] = useState(true);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    const success = await install();
    if (success) {
      onClose(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-stone-800 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 pb-4 border-b border-slate-100 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Add to Your Home Screen
              </h3>
              <p className="text-xs text-slate-500 dark:text-stone-400 font-bangla">
                মোবাইলের হোম স্ক্রিনে অ্যাপ আকারে সেভ করুন
              </p>
            </div>
          </div>
          <button
            onClick={() => onClose(dontShowAgain)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-stone-200 hover:bg-slate-100 dark:hover:bg-stone-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chromium Direct Install (if available) */}
        {isInstallable && (
          <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/40 border-b border-emerald-100 dark:border-emerald-900/40">
            <button
              onClick={handleInstallClick}
              className="w-full min-h-[46px] rounded-2xl bg-emerald-700 hover:bg-emerald-600 active:scale-[0.98] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition"
            >
              <Download className="w-4 h-4" />
              <span>1-Tap Install App Now</span>
            </button>
            <p className="text-[11px] text-center text-emerald-800 dark:text-emerald-300 mt-1.5">
              Works completely offline with fast loading
            </p>
          </div>
        )}

        {/* Platform Selection Tabs */}
        <div className="p-3 border-b border-slate-100 dark:border-stone-800 flex gap-2">
          <button
            onClick={() => setPlatformTab('ios')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              platformTab === 'ios'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-stone-900 shadow-xs'
                : 'bg-slate-100 dark:bg-stone-800 text-slate-600 dark:text-stone-300'
            }`}
          >
            <span>iPhone / iPad (Safari)</span>
          </button>
          <button
            onClick={() => setPlatformTab('android')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              platformTab === 'android'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-stone-900 shadow-xs'
                : 'bg-slate-100 dark:bg-stone-800 text-slate-600 dark:text-stone-300'
            }`}
          >
            <span>Android (Chrome)</span>
          </button>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="p-5 space-y-4 text-xs text-slate-700 dark:text-stone-300">
          {platformTab === 'ios' ? (
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-stone-800 text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>Tap the Safari <strong>Share</strong> icon</span>
                    <Share className="w-3.5 h-3.5 text-blue-500 inline" />
                  </div>
                  <p className="text-slate-500 dark:text-stone-400 mt-0.5">
                    Located in the bottom navigation bar of Safari on iPhone (or top bar on iPad).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-stone-800 text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>Scroll down and select <strong>"Add to Home Screen"</strong></span>
                    <PlusSquare className="w-3.5 h-3.5 text-slate-600 dark:text-stone-300 inline" />
                  </div>
                  <p className="text-slate-500 dark:text-stone-400 mt-0.5">
                    Look for the square icon with a plus sign.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-stone-800 text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">
                    Tap <strong>"Add"</strong> in the top-right corner
                  </div>
                  <p className="text-slate-500 dark:text-stone-400 mt-0.5">
                    The green Noakhali Kitchen Prayer Times icon will appear on your phone's home screen!
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-stone-800 text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>Tap Chrome's <strong>Three Dots (⋮)</strong> menu</span>
                    <MoreVertical className="w-3.5 h-3.5 text-slate-600 dark:text-stone-300 inline" />
                  </div>
                  <p className="text-slate-500 dark:text-stone-400 mt-0.5">
                    Located in the upper right corner of your browser.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-stone-800 text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">
                    Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>
                  </div>
                  <p className="text-slate-500 dark:text-stone-400 mt-0.5">
                    Chrome will prompt you to confirm the installation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-stone-800 text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">
                    Confirm <strong>Install</strong>
                  </div>
                  <p className="text-slate-500 dark:text-stone-400 mt-0.5">
                    The app will install like a native app with zero browser url bars.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Don't show again checkbox */}
          <label className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-stone-800 text-slate-600 dark:text-stone-400 cursor-pointer">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
            />
            <span>Don't show this hint automatically on startup</span>
          </label>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-stone-950/40 border-t border-slate-100 dark:border-stone-800 flex justify-end">
          <button
            onClick={() => onClose(dontShowAgain)}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-stone-800 dark:hover:bg-stone-700 text-white text-xs font-semibold transition"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
