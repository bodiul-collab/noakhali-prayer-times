import React from 'react';
import { Sun, Moon, MapPin, Sliders, BookOpen, Compass, UtensilsCrossed, CalendarDays } from 'lucide-react';
import { UserLocation } from '../types';

interface HeaderProps {
  location: UserLocation;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenLocationPicker: () => void;
  onOpenSettings: () => void;
  onOpenRecipes: () => void;
  onOpenGuide: () => void;
  onScrollToQibla: () => void;
  onScrollToCalendar?: () => void;
  onNavigate?: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  location,
  isDarkMode,
  onToggleTheme,
  onOpenLocationPicker,
  onOpenSettings,
  onOpenRecipes,
  onOpenGuide,
  onScrollToQibla,
  onScrollToCalendar,
  onNavigate,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-emerald-950/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-emerald-900/50 dark:border-stone-800 text-white transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-2.5 sm:px-4 h-14 sm:h-16 flex items-center justify-between gap-1.5 sm:gap-3">
        {/* Zone 1: Brand Wordmark (Compact on mobile so it never pushes action buttons outside) */}
        <button
          onClick={() => (onNavigate ? onNavigate('/') : (window.location.href = '/'))}
          className="flex items-center gap-2 min-w-0 shrink text-left cursor-pointer group"
          title="Noakhali Kitchen Prayer Times"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-800/90 dark:bg-emerald-900/70 flex items-center justify-center border border-emerald-700/60 shadow-inner shrink-0 group-hover:border-amber-400 transition-colors">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a9 9 0 108.354 5.646A7 7 0 0112 3z" />
            </svg>
          </div>
          <div className="min-w-0">
            <span className="text-xs sm:text-base font-bold tracking-tight text-white block leading-tight truncate">
              Noakhali Kitchen
            </span>
            <span className="hidden md:block text-[11px] text-emerald-300/90 dark:text-emerald-400 font-medium leading-none mt-0.5">
              নামাজের সময়সূচী · World & USA
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Desktop/Tablet) */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-medium text-emerald-100/80">
          <button
            onClick={() => (onNavigate ? onNavigate('/prayer-times') : (window.location.href = '/prayer-times'))}
            className="flex items-center gap-1.5 hover:text-white transition-colors py-1.5 whitespace-nowrap cursor-pointer"
          >
            <span>City Pages</span>
          </button>
          <button
            onClick={onOpenRecipes}
            className="flex items-center gap-1.5 hover:text-white transition-colors py-1.5 whitespace-nowrap cursor-pointer"
          >
            <UtensilsCrossed className="w-3.5 h-3.5 text-amber-400" />
            <span>Bangladeshi Meals</span>
          </button>
          <button
            onClick={onScrollToQibla}
            className="flex items-center gap-1.5 hover:text-white transition-colors py-1.5 whitespace-nowrap cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>Qibla</span>
          </button>
          {onScrollToCalendar && (
            <button
              onClick={onScrollToCalendar}
              className="flex items-center gap-1.5 hover:text-white transition-colors py-1.5 whitespace-nowrap cursor-pointer"
            >
              <CalendarDays className="w-3.5 h-3.5 text-amber-300" />
              <span>Calendar</span>
            </button>
          )}
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 hover:text-white transition-colors py-1.5 whitespace-nowrap cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-300" />
            <span>Mosque Guide</span>
          </button>
        </nav>

        {/* Zone 3: Actions & Controls - NEVER pushes buttons outside on mobile */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Location Trigger (Flexible & Truncated on mobile) */}
          <button
            onClick={onOpenLocationPicker}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg bg-emerald-900/70 hover:bg-emerald-800/80 dark:bg-stone-900 dark:hover:bg-stone-800 border border-emerald-700/50 dark:border-stone-700 text-xs font-medium text-emerald-100 hover:text-white transition-all max-w-[85px] xs:max-w-[115px] sm:max-w-[180px] shrink cursor-pointer"
            title="Change City or Geolocation"
          >
            <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />
            <span className="truncate text-[11px] sm:text-xs">
              {location.name.split('(')[0].trim()}
              {location.stateCode ? `, ${location.stateCode}` : ''}
            </span>
          </button>

          {/* Calculation Settings Trigger (Always strictly visible inside viewport) */}
          <button
            onClick={onOpenSettings}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-900/70 hover:bg-emerald-800/80 dark:bg-stone-900 dark:hover:bg-stone-800 border border-emerald-700/50 dark:border-stone-700 flex items-center justify-center text-emerald-200 hover:text-white transition-colors shrink-0 cursor-pointer active:scale-95 touch-manipulation"
            title="Calculation Settings (Hanafi/ISNA/Offsets)"
            aria-label="Calculation Settings"
          >
            <Sliders className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300" />
          </button>

          {/* Light / Dark Mode Toggle (Always strictly visible inside viewport) */}
          <button
            onClick={onToggleTheme}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-900/70 hover:bg-emerald-800/80 dark:bg-stone-900 dark:hover:bg-stone-800 border border-emerald-700/50 dark:border-stone-700 flex items-center justify-center text-amber-300 hover:text-amber-200 transition-colors shrink-0 cursor-pointer active:scale-95 touch-manipulation"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
