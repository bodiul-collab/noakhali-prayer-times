import React, { useState } from 'react';
import { Copy, Check, Share2 } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url?: string;
  cityName: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url, cityName }) => {
  const [copied, setCopied] = useState(false);

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const shareText = `Check today's prayer times and Qibla for ${cityName} on Noakhali Kitchen:\n${shareUrl}`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.warn('Failed to copy to clipboard', err);
    }
  };

  const handleWhatsApp = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-wrap items-center gap-2 pt-2">
      {/* WhatsApp Share Button */}
      <button
        onClick={handleWhatsApp}
        className="min-h-[40px] px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-xs cursor-pointer"
        title="Share on WhatsApp"
        aria-label="Share on WhatsApp"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.78 14.04c-.24.68-1.2 1.26-1.68 1.34-.45.08-1.04.14-3.04-.69-2.55-1.06-4.18-3.66-4.31-3.83-.13-.17-1.03-1.37-1.03-2.61 0-1.25.65-1.86.88-2.11.23-.25.5-.32.67-.32.17 0 .34.01.49.02.16.01.37-.06.58.44.22.52.74 1.8.8 1.93.07.13.11.29.02.46-.08.17-.13.28-.26.43-.13.15-.27.33-.39.45-.13.13-.26.27-.11.53.15.26.67 1.1 1.44 1.78.99.88 1.83 1.15 2.09 1.28.26.13.41.11.56-.06.15-.17.65-.76.82-1.02.17-.26.35-.22.58-.13.24.08 1.5.71 1.76.84.26.13.43.19.49.3.06.11.06.66-.18 1.34z" />
        </svg>
        <span>Share via WhatsApp</span>
      </button>

      {/* Copy Link Button */}
      <button
        onClick={handleCopy}
        className="min-h-[40px] px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-stone-800 dark:hover:bg-stone-700 active:scale-[0.98] text-slate-800 dark:text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
        title="Copy Link"
        aria-label="Copy Link"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-emerald-700 dark:text-emerald-300">Link Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 text-slate-500" />
            <span>Copy Link</span>
          </>
        )}
      </button>
    </div>
  );
};
