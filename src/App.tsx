/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  MapPin,
  Sliders,
  UtensilsCrossed,
  BookOpen,
  Compass,
  Download,
  ExternalLink,
  ShieldCheck,
  WifiOff,
  Globe,
} from 'lucide-react';

import { AppSettings, UserLocation } from './types';
import { City, GLOBAL_CITIES } from './data/cities';
import { SEO_CITIES, getSeoCityBySlug, SeoCity } from './data/seoCities';
import { BANGLADESHI_RECIPES, getMealSuggestionForTime } from './data/recipes';
import { calculatePrayerTimes, formatPrayerTime } from './utils/prayer';
import { updatePageSeo } from './utils/seo';
import {
  DEFAULT_SETTINGS,
  DEFAULT_LOCATION,
  loadSettings,
  saveSettings,
  loadLocation,
  saveLocation,
  loadFavorites,
  saveFavorites,
  isA2HSDismissed,
  setA2HSDismissed,
} from './utils/storage';
import { usePWAInstall } from './hooks/usePWAInstall';
import { useOnlineStatus } from './hooks/useOnlineStatus';

import { Header } from './components/Header';
import { NextPrayerCard } from './components/NextPrayerCard';
import { RamadanBanner } from './components/RamadanBanner';
import { PrayerList } from './components/PrayerList';
import { DualCalendarCard } from './components/DualCalendarCard';
import { QiblaCompass } from './components/QiblaCompass';
import { MealIdeaCard } from './components/MealIdeaCard';
import { CityPickerModal } from './components/CityPickerModal';
import { SettingsModal } from './components/SettingsModal';
import { RecipesModal } from './components/RecipesModal';
import { MosqueGuideModal } from './components/MosqueGuideModal';
import { AddToHomeScreenModal } from './components/AddToHomeScreenModal';
import { CityPage } from './components/CityPage';
import { CityIndexPage } from './components/CityIndexPage';

export default function App() {
  // 1. URL Route State for SEO-Friendly City Pages
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  });

  // Listen to popstate (Back/Forward navigation)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = useCallback((path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // 2. Persistent State
  const [settings, setSettings] = useState<AppSettings>(() => loadSettings());
  const [location, setLocation] = useState<UserLocation>(() => loadLocation());
  const [favorites, setFavorites] = useState<string[]>(() => loadFavorites());

  // 3. Live Time State (Updated every second for smooth live countdown)
  const [now, setNow] = useState<Date>(new Date());

  // 4. Modals and UI State
  const [isCityPickerOpen, setIsCityPickerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isRecipesOpen, setIsRecipesOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isA2HSOpen, setIsA2HSOpen] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // 5. PWA & Network Hooks
  const { isInstallable, isInstalled } = usePWAInstall();
  const isOnline = useOnlineStatus();

  // 6. Theme State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const saved = loadSettings().theme;
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Keep theme synced with documentElement
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    const newSettings: AppSettings = {
      ...settings,
      theme: nextDark ? 'dark' : 'light',
    };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  // Timer interval for clock and prayer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Show Add to Home Screen once if not dismissed
  useEffect(() => {
    if (!isA2HSDismissed() && !isInstalled) {
      const timer = setTimeout(() => {
        setIsA2HSOpen(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isInstalled]);

  // Handle location update
  const handleSelectCity = useCallback((city: City) => {
    const newLoc: UserLocation = {
      type: 'city',
      city,
      name: city.name,
      stateCode: city.stateCode,
      latitude: city.latitude,
      longitude: city.longitude,
      timeZone: city.timeZone,
    };
    setLocation(newLoc);
    saveLocation(newLoc);
    setLocationError(null);
  }, []);

  // Handle browser geolocation
  const handleUseCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        const { latitude, longitude } = position.coords;
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York';
        const newLoc: UserLocation = {
          type: 'coords',
          name: 'My Exact Location',
          stateCode: 'GPS',
          latitude,
          longitude,
          timeZone,
        };
        setLocation(newLoc);
        saveLocation(newLoc);
        setIsCityPickerOpen(false);
      },
      (error) => {
        setIsLocating(false);
        let msg = 'Could not retrieve your location.';
        if (error.code === error.PERMISSION_DENIED) {
          msg = 'Location permission was denied. Please select your city from the list below.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = 'Location information is currently unavailable.';
        } else if (error.code === error.TIMEOUT) {
          msg = 'Location request timed out. Please try again or select your city.';
        }
        setLocationError(msg);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  }, []);

  // Handle settings update
  const handleUpdateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  // Handle recipe favorites toggle
  const handleToggleFavorite = (recipeId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId];
      saveFavorites(next);
      return next;
    });
  };

  // Close A2HS modal
  const handleCloseA2HS = (dontShowAgain?: boolean) => {
    setIsA2HSOpen(false);
    if (dontShowAgain) {
      setA2HSDismissed(true);
    }
  };

  // Set city page location as default user location in localStorage
  const handleSetAsDefaultLocation = useCallback((newLoc: UserLocation) => {
    setLocation(newLoc);
    saveLocation(newLoc);
  }, []);

  // 7. Calculate Prayer Times & Hijri Calendar for Home Page
  const calculatedTimes = useMemo(() => {
    return calculatePrayerTimes(location, settings, now);
  }, [location, settings, now]);

  // Is Ramadan active?
  const isRamadanActive = useMemo(() => {
    if (settings.ramadanModeOverride !== null) {
      return settings.ramadanModeOverride;
    }
    return calculatedTimes.hijri.isRamadan;
  }, [settings.ramadanModeOverride, calculatedTimes.hijri.isRamadan]);

  const toggleRamadanPreview = () => {
    const nextOverride = isRamadanActive ? false : true;
    const updated: AppSettings = {
      ...settings,
      ramadanModeOverride: nextOverride,
    };
    handleUpdateSettings(updated);
  };

  const currentMealIdea = useMemo(() => {
    return getMealSuggestionForTime(now);
  }, [now]);

  const currentTimeFormatted = useMemo(() => {
    return formatPrayerTime(now, location.timeZone, settings.timeFormat24h);
  }, [now, location.timeZone, settings.timeFormat24h]);

  const scrollToQibla = () => {
    const el = document.getElementById('qibla-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCalendar = () => {
    const el = document.getElementById('calendar-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 8. Route Determination
  // Format 1: /prayer-times -> Index
  // Format 2: /prayer-times/:citySlug -> City Page
  // Format 3: / -> Home Dashboard
  const { isCityPage, isIndexPage, targetCity } = useMemo(() => {
    const normalized = currentPath.replace(/\/+$/, '') || '/';

    if (normalized === '/prayer-times') {
      return { isCityPage: false, isIndexPage: true, targetCity: null };
    }

    if (normalized.startsWith('/prayer-times/')) {
      const slug = normalized.replace('/prayer-times/', '').trim();
      const matchedCity = getSeoCityBySlug(slug);
      if (matchedCity) {
        return { isCityPage: true, isIndexPage: false, targetCity: matchedCity };
      }

      // Check if slug matches an id in GLOBAL_CITIES
      const fallbackGlobal = GLOBAL_CITIES.find(
        (c) => c.id === slug || c.id === `${slug}-bd` || c.id === `${slug}-us`
      );
      if (fallbackGlobal) {
        const synthesized: SeoCity = {
          slug,
          name: fallbackGlobal.name.split('(')[0].trim(),
          state: fallbackGlobal.state,
          stateCode: fallbackGlobal.stateCode,
          country: fallbackGlobal.country || 'USA',
          countryCode: fallbackGlobal.countryCode || 'US',
          latitude: fallbackGlobal.latitude,
          longitude: fallbackGlobal.longitude,
          timeZone: fallbackGlobal.timeZone,
          intro: `Accurate daily prayer times and Qibla direction for Muslim families living in ${fallbackGlobal.name}. Calculated on-device with zero server tracking and full offline support.`,
          nearbySlugs: ['houston-tx', 'dallas-tx', 'new-york-ny', 'chicago-il'],
          prominentMosques: ['Local Community Mosque', 'Islamic Center'],
          halalHubs: ['Local Halal Groceries & Restaurants'],
          metaDescription: `Daily prayer times, Qibla compass, and Ramadan timings in ${fallbackGlobal.name}.`,
          banglaTitle: `${fallbackGlobal.name} নামাজের সময়সূচী`,
        };
        return { isCityPage: true, isIndexPage: false, targetCity: synthesized };
      }

      // Not found, return city page null
      return { isCityPage: true, isIndexPage: false, targetCity: null };
    }

    return { isCityPage: false, isIndexPage: false, targetCity: null };
  }, [currentPath]);

  // Home Page SEO updates
  useEffect(() => {
    if (!isCityPage && !isIndexPage) {
      updatePageSeo({
        title: 'Noakhali Kitchen Prayer Times | Muslim Daily Schedule & Qibla',
        description:
          'Mobile-first offline prayer times, Qibla compass, Ramadan schedule, and authentic Bangladeshi meal ideas for families in the USA and worldwide.',
        canonicalUrl: 'https://www.noakhalikitchen.com/',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          'name': 'Noakhali Kitchen Prayer Times',
          'applicationCategory': 'LifestyleApplication',
          'operatingSystem': 'All',
          'url': 'https://www.noakhalikitchen.com/',
          'description':
            'Accurate offline Muslim prayer times, Qibla compass, Ramadan schedule, and Bangladeshi meal ideas for families.',
        },
      });
    }
  }, [isCityPage, isIndexPage]);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-slate-900 dark:text-stone-100 flex flex-col font-sans transition-colors duration-200">
      {/* Offline Toast Banner */}
      {!isOnline && (
        <div className="bg-amber-600 text-white px-4 py-2 text-xs font-medium flex items-center justify-center gap-2 sticky top-0 z-40 shadow-sm">
          <WifiOff className="w-3.5 h-3.5 shrink-0" />
          <span>Offline Mode — All prayer times and recipes are calculated locally on your device.</span>
        </div>
      )}

      {/* Top Navigation Bar adhering to Top Bar Contract */}
      <Header
        location={targetCity ? {
          type: 'city',
          name: `${targetCity.name}, ${targetCity.stateCode}`,
          stateCode: targetCity.stateCode,
          latitude: targetCity.latitude,
          longitude: targetCity.longitude,
          timeZone: targetCity.timeZone,
        } : location}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        onOpenLocationPicker={() => setIsCityPickerOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenRecipes={() => setIsRecipesOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        onScrollToQibla={scrollToQibla}
        onScrollToCalendar={scrollToCalendar}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-5 md:py-8 space-y-6">
        {/* ROUTE 1: Specific City Page */}
        {isCityPage && targetCity && (
          <CityPage
            city={targetCity}
            settings={settings}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onOpenAllRecipes={() => setIsRecipesOpen(true)}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenGuide={() => setIsGuideOpen(true)}
            onSetAsDefaultLocation={handleSetAsDefaultLocation}
            isCurrentDefault={
              location.name.toLowerCase().includes(targetCity.name.toLowerCase()) &&
              location.stateCode === targetCity.stateCode
            }
            onNavigate={handleNavigate}
          />
        )}

        {/* ROUTE 1b: City Not Found Fallback */}
        {isCityPage && !targetCity && (
          <div className="rounded-3xl bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-800 p-8 text-center space-y-4">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">City Page Not Found</h1>
            <p className="text-sm text-slate-600 dark:text-stone-400 max-w-md mx-auto">
              We couldn’t locate a dedicated page for that URL. Browse our directory of cities or use the search calculator.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => handleNavigate('/prayer-times')}
                className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs"
              >
                Browse All City Pages
              </button>
              <button
                onClick={() => handleNavigate('/')}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-stone-800 text-slate-800 dark:text-stone-200 font-semibold text-xs"
              >
                Go to Home Calculator
              </button>
            </div>
          </div>
        )}

        {/* ROUTE 2: City Index Page */}
        {isIndexPage && (
          <CityIndexPage onNavigate={handleNavigate} />
        )}

        {/* ROUTE 3: Standard Home Page (Personalized with User's Saved Location) */}
        {!isCityPage && !isIndexPage && (
          <>
            {/* Quick Location Bar with Switcher & Privacy Guarantee */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 px-4 py-3 rounded-2xl bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-800 text-xs shadow-xs">
              <div className="flex items-center gap-2 text-slate-700 dark:text-stone-300">
                <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>
                  Prayer times for <strong className="text-slate-900 dark:text-white font-semibold">{location.name}</strong>
                  {location.stateCode ? ` (${location.stateCode})` : ''}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsCityPickerOpen(true)}
                  className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 underline underline-offset-2 py-1 cursor-pointer"
                >
                  Change City (500+ Worldwide)
                </button>
                <span aria-hidden="true" className="text-slate-300 dark:text-stone-700">·</span>
                <button
                  onClick={handleUseCurrentLocation}
                  disabled={isLocating}
                  className="text-xs font-medium text-slate-600 dark:text-stone-400 hover:text-slate-900 dark:hover:text-stone-200 py-1 cursor-pointer"
                >
                  {isLocating ? 'Locating...' : 'Use GPS'}
                </button>
                <span aria-hidden="true" className="text-slate-300 dark:text-stone-700">·</span>
                <button
                  onClick={() => handleNavigate('/prayer-times')}
                  className="text-xs font-semibold text-slate-700 dark:text-stone-300 hover:text-emerald-600 dark:hover:text-emerald-400 py-1 cursor-pointer"
                >
                  City Directory
                </button>
              </div>
            </div>

            {/* 1. Large Next Prayer Hero Card */}
            <NextPrayerCard
              nextPrayer={calculatedTimes.nextPrayer}
              gregorianDate={calculatedTimes.gregorian}
              hijriDate={calculatedTimes.hijri}
              location={location}
              currentTimeFormatted={currentTimeFormatted}
              asrMadhab={settings.asrMadhab}
            />

            {/* 2. Ramadan Mode (Suhoor ends at Fajr & Iftar at Maghrib) */}
            <RamadanBanner
              isRamadanActive={isRamadanActive}
              onToggleRamadanPreview={toggleRamadanPreview}
              suhoorTimeFormatted={calculatedTimes.fastingInfo.formattedSuhoor}
              iftarTimeFormatted={calculatedTimes.fastingInfo.formattedIftar}
              fastingDurationFormatted={calculatedTimes.fastingInfo.formattedDuration}
              suhoorDate={calculatedTimes.fastingInfo.suhoorEnds}
              iftarDate={calculatedTimes.fastingInfo.iftarTime}
              now={now}
            />

            {/* 3. Today's Full Prayer Schedule with Next Prayer Highlight */}
            <PrayerList
              prayers={calculatedTimes.list}
              asrMadhab={settings.asrMadhab}
            />

            {/* 4. English & Arabic (Hijri) Dual Calendar */}
            <DualCalendarCard
              location={location}
              settings={settings}
              now={now}
            />

            {/* 5. Qibla Compass with Degree Reading & Dial */}
            <QiblaCompass
              qiblaDegrees={calculatedTimes.qiblaDegrees}
              cityName={location.name}
              latitude={location.latitude}
              longitude={location.longitude}
            />

            {/* 5. Today's Meal Idea Card (Bangladeshi Recipe Rotation) */}
            <MealIdeaCard
              recipe={currentMealIdea}
              isFavorite={favorites.includes(currentMealIdea.id)}
              onToggleFavorite={handleToggleFavorite}
              onOpenAllRecipes={() => setIsRecipesOpen(true)}
            />

            {/* Featured City Pages Bar */}
            <div className="rounded-3xl bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-800 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Popular City Prayer Pages</span>
                </div>
                <button
                  onClick={() => handleNavigate('/prayer-times')}
                  className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
                >
                  View All Directory →
                </button>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  { slug: 'houston-tx', name: 'Houston, TX' },
                  { slug: 'dallas-tx', name: 'Dallas, TX' },
                  { slug: 'new-york-ny', name: 'New York, NY' },
                  { slug: 'jersey-city-nj', name: 'Jersey City, NJ' },
                  { slug: 'washington-dc', name: 'Washington, DC' },
                  { slug: 'detroit-mi', name: 'Detroit / Dearborn' },
                  { slug: 'chicago-il', name: 'Chicago, IL' },
                  { slug: 'atlanta-ga', name: 'Atlanta, GA' },
                  { slug: 'los-angeles-ca', name: 'Los Angeles, CA' },
                  { slug: 'san-francisco-ca', name: 'San Francisco, CA' },
                  { slug: 'seattle-wa', name: 'Seattle, WA' },
                  { slug: 'minneapolis-mn', name: 'Minneapolis, MN' },
                  { slug: 'philadelphia-pa', name: 'Philadelphia, PA' },
                  { slug: 'boston-ma', name: 'Boston, MA' },
                  { slug: 'toronto-ca', name: 'Toronto, Canada' },
                ].map((c) => (
                  <button
                    key={c.slug}
                    onClick={() => handleNavigate(`/prayer-times/${c.slug}`)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 dark:bg-stone-800 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-stone-300 hover:text-emerald-800 dark:hover:text-emerald-200 font-medium transition cursor-pointer"
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Action Strip for Mobile */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setIsGuideOpen(true)}
                className="min-h-[50px] p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-800 hover:border-emerald-600 text-left transition-all shadow-xs flex items-center gap-3 cursor-pointer"
              >
                <div className="p-2 rounded-xl bg-amber-50 dark:bg-stone-800 text-amber-700 dark:text-amber-400 shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Mosque Guide</div>
                  <div className="text-[11px] text-slate-500 dark:text-stone-400">Match your local masjid</div>
                </div>
              </button>

              <button
                onClick={() => setIsSettingsOpen(true)}
                className="min-h-[50px] p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-800 hover:border-emerald-600 text-left transition-all shadow-xs flex items-center gap-3 cursor-pointer"
              >
                <div className="p-2 rounded-xl bg-emerald-50 dark:bg-stone-800 text-emerald-700 dark:text-emerald-400 shrink-0">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Settings</div>
                  <div className="text-[11px] text-slate-500 dark:text-stone-400">Hanafi / ISNA / offsets</div>
                </div>
              </button>

              <button
                onClick={() => setIsA2HSOpen(true)}
                className="col-span-2 sm:col-span-1 min-h-[50px] p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-stone-900 border border-emerald-200/80 dark:border-stone-800 hover:border-emerald-600 text-left transition-all shadow-xs flex items-center gap-3 cursor-pointer"
              >
                <div className="p-2 rounded-xl bg-emerald-700 text-white shrink-0">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-950 dark:text-white">Add to Home Screen</div>
                  <div className="text-[11px] text-emerald-800/80 dark:text-emerald-400">iPhone & Android app</div>
                </div>
              </button>
            </div>

            {/* Short Mosque Disclaimers & Privacy Notice */}
            <div className="rounded-2xl p-4 bg-slate-100/80 dark:bg-stone-900/60 border border-slate-200/80 dark:border-stone-800 text-xs text-slate-600 dark:text-stone-400 space-y-1.5">
              <p className="font-medium text-slate-800 dark:text-stone-300">
                <strong>Please note:</strong> Times are calculated and may differ from your local mosque. Please confirm with your mosque.
              </p>
              <p className="text-[11px] text-slate-500 dark:text-stone-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Your location is processed entirely in your browser and is never sent or stored on any server.</span>
              </p>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-slate-600 dark:text-stone-400 py-8 px-4 transition-colors">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-bold text-slate-900 dark:text-white text-sm">
              Noakhali Kitchen Prayer Times
            </span>
            <span className="font-bangla text-emerald-700 dark:text-emerald-400">
              প্রবাসী বাংলাদেশি ও মুসলিম পরিবারের নির্ভরযোগ্য নামাজের সময়সূচী
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
            <button
              onClick={() => handleNavigate('/prayer-times')}
              className="hover:text-emerald-700 dark:hover:text-emerald-400 transition cursor-pointer"
            >
              City Directory
            </button>
            <span aria-hidden="true" className="text-slate-300 dark:text-stone-700">·</span>
            <button
              onClick={() => setIsGuideOpen(true)}
              className="hover:text-emerald-700 dark:hover:text-emerald-400 transition cursor-pointer"
            >
              Mosque Timetable Guide
            </button>
            <span aria-hidden="true" className="text-slate-300 dark:text-stone-700">·</span>
            <button
              onClick={() => setIsRecipesOpen(true)}
              className="hover:text-emerald-700 dark:hover:text-emerald-400 transition cursor-pointer"
            >
              Bangladeshi Recipes
            </button>
            <span aria-hidden="true" className="text-slate-300 dark:text-stone-700">·</span>
            <a
              href="https://www.noakhalikitchen.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 hover:underline font-semibold"
            >
              <span>www.noakhalikitchen.com</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <CityPickerModal
        isOpen={isCityPickerOpen}
        onClose={() => setIsCityPickerOpen(false)}
        currentLocation={location}
        onSelectCity={handleSelectCity}
        onUseCurrentLocation={handleUseCurrentLocation}
        isLocating={isLocating}
        locationError={locationError}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      <RecipesModal
        isOpen={isRecipesOpen}
        onClose={() => setIsRecipesOpen(false)}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />

      <MosqueGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <AddToHomeScreenModal
        isOpen={isA2HSOpen}
        onClose={handleCloseA2HS}
      />
    </div>
  );
}
