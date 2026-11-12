import React from 'react';
import {
  Sun,
  Moon,
  MapPin,
  Sliders,
  BookOpen,
  Compass,
  UtensilsCrossed,
  CalendarDays,
  Home,
  Globe,
} from 'lucide-react';
import { UserLocation } from '../types';

interface HeaderProps {
  location: UserLocation;
  isDarkMode: boolean;
  currentPath?: string;
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
  currentPath = '/',
  onToggleTheme,
  onOpenLocationPicker,
  onOpenSettings,
  onOpenRecipes,
  onOpenGuide,
  onScrollToQibla,
  onScrollToCalendar,
  onNavigate,
}) => {
  const normalizedPath = currentPath.replace(/\/+$/, '') || '/';
  const isHome = normalizedPath === '/';
  const isDirectory = normalizedPath === '/prayer-times' || normalizedPath.startsWith('/prayer-times/');

  const goTo = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.href = path;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-emerald-950/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-emerald-900/50 dark:border-stone-800 text-white shadow-sm transition-colors duration-200">
      {/* Row 1: Brand + Desktop Nav + Action Controls */}
      <div className="max-w-4xl mx-auto px-2.5 sm:px-4 h-14 sm:h-16 flex items-center justify-between gap-1.5 sm:gap-3">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => goTo('/')}
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
              নামাজের সময়সূচী · World &amp; USA
            </span>
          </div>
        </button>

        {/* Zone 2: Always-Visible Desktop Navigation Links */}
        <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-4 text-xs font-medium text-emerald-100/85">
          <button
            onClick={() => goTo('/')}
            className={`flex items-center gap-1.5 hover:text-white transition-colors py-1.5 whitespace-nowrap cursor-pointer ${
              isHome ? 'text-amber-300 font-semibold' : ''
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Today</span>
          </button>
          <button
            onClick={() => goTo('/prayer-times')}
            className={`flex items-center gap-1.5 hover:text-white transition-colors py-1.5 whitespace-nowrap cursor-pointer ${
              isDirectory ? 'text-amber-300 font-semibold' : ''
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-emerald-300" />
            <span>City Pages</span>
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
            onClick={onScrollToQibla}
            className="flex items-center gap-1.5 hover:text-white transition-colors py-1.5 whitespace-nowrap cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>Qibla</span>
          </button>
          <button
            onClick={onOpenRecipes}
            className="flex items-center gap-1.5 hover:text-white transition-colors py-1.5 whitespace-nowrap cursor-pointer"
          >
            <UtensilsCrossed className="w-3.5 h-3.5 text-amber-400" />
            <span>Meals</span>
          </button>
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 hover:text-white transition-colors py-1.5 whitespace-nowrap cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-300" />
            <span>Guide</span>
          </button>
        </nav>

        {/* Zone 3: Actions & Controls (City, Settings, Theme) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={onOpenLocationPicker}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg bg-emerald-900/70 hover:bg-emerald-800/80 dark:bg-stone-900 dark:hover:bg-stone-800 border border-emerald-700/50 dark:border-stone-700 text-xs font-medium text-emerald-100 hover:text-white transition-all max-w-[105px] sm:max-w-[180px] shrink cursor-pointer"
            title="Change City or Geolocation"
          >
            <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />
            <span className="truncate text-[11px] sm:text-xs">
              {location.name.split('(')[0].trim()}
              {location.stateCode ? `, ${location.stateCode}` : ''}
            </span>
          </button>

          <button
            onClick={onOpenSettings}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-900/70 hover:bg-emerald-800/80 dark:bg-stone-900 dark:hover:bg-stone-800 border border-emerald-700/50 dark:border-stone-700 flex items-center justify-center text-emerald-200 hover:text-white transition-colors shrink-0 cursor-pointer active:scale-95 touch-manipulation"
            title="Calculation Settings (Hanafi/ISNA/Offsets)"
            aria-label="Calculation Settings"
          >
            <Sliders className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300" />
          </button>

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

      {/* Row 2: Always-Visible Sticky Mobile & Tablet Sub-Navigation */}
      <nav
        aria-label="Mobile Sticky Navigation"
        className="lg:hidden border-t border-emerald-900/50 dark:border-stone-800/80 bg-emerald-950/90 dark:bg-stone-950/90"
      >
        <div className="max-w-4xl mx-auto px-1.5 sm:px-3 py-1 grid grid-cols-6 sm:flex sm:items-center sm:justify-center gap-0.5 sm:gap-2 text-[10px] sm:text-xs font-semibold">
          <button
            onClick={() => goTo('/')}
            className={`flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 px-1 sm:px-2.5 py-1 sm:py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              isHome
                ? 'bg-emerald-800 text-amber-300'
                : 'text-emerald-100/85 hover:bg-emerald-900/60 hover:text-white'
            }`}
          >
            <Home className="w-3.5 h-3.5 shrink-0" />
            <span>Today</span>
          </button>

          <button
            onClick={() => goTo('/prayer-times')}
            className={`flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 px-1 sm:px-2.5 py-1 sm:py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              isDirectory
                ? 'bg-emerald-800 text-amber-300'
                : 'text-emerald-100/85 hover:bg-emerald-900/60 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
            <span>Cities</span>
          </button>

          <button
            onClick={() => (onScrollToCalendar ? onScrollToCalendar() : goTo('/'))}
            className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 px-1 sm:px-2.5 py-1 sm:py-1.5 rounded-lg whitespace-nowrap text-emerald-100/85 hover:bg-emerald-900/60 hover:text-white transition-colors cursor-pointer"
          >
            <CalendarDays className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>Calendar</span>
          </button>

          <button
            onClick={onScrollToQibla}
            className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 px-1 sm:px-2.5 py-1 sm:py-1.5 rounded-lg whitespace-nowrap text-emerald-100/85 hover:bg-emerald-900/60 hover:text-white transition-colors cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Qibla</span>
          </button>

          <button
            onClick={onOpenRecipes}
            className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 px-1 sm:px-2.5 py-1 sm:py-1.5 rounded-lg whitespace-nowrap text-emerald-100/85 hover:bg-emerald-900/60 hover:text-white transition-colors cursor-pointer"
          >
            <UtensilsCrossed className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Meals</span>
          </button>

          <button
            onClick={onOpenGuide}
            className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 px-1 sm:px-2.5 py-1 sm:py-1.5 rounded-lg whitespace-nowrap text-emerald-100/85 hover:bg-emerald-900/60 hover:text-white transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
            <span>Guide</span>
          </button>
        </div>
      </nav>
    </header>
  );
};
