import React, { useEffect, useMemo, useState } from 'react';
import {
  MapPin,
  Clock,
  Compass,
  UtensilsCrossed,
  Share2,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Building2,
  Heart,
  Home,
  Check,
  Sliders,
  Calendar,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';
import { SeoCity, SEO_CITIES } from '../data/seoCities';
import { AppSettings, UserLocation } from '../types';
import { calculatePrayerTimes, formatPrayerTime } from '../utils/prayer';
import { getMealSuggestionForTime } from '../data/recipes';
import { updatePageSeo } from '../utils/seo';

import { NextPrayerCard } from './NextPrayerCard';
import { RamadanBanner } from './RamadanBanner';
import { PrayerList } from './PrayerList';
import { DualCalendarCard } from './DualCalendarCard';
import { QiblaCompass } from './QiblaCompass';
import { MealIdeaCard } from './MealIdeaCard';
import { ShareButtons } from './ShareButtons';

interface CityPageProps {
  city: SeoCity;
  settings: AppSettings;
  favorites: string[];
  onToggleFavorite: (recipeId: string) => void;
  onOpenAllRecipes: () => void;
  onOpenSettings: () => void;
  onOpenGuide: () => void;
  onSetAsDefaultLocation: (loc: UserLocation) => void;
  isCurrentDefault: boolean;
  onNavigate: (path: string) => void;
}

export const CityPage: React.FC<CityPageProps> = ({
  city,
  settings,
  favorites,
  onToggleFavorite,
  onOpenAllRecipes,
  onOpenSettings,
  onOpenGuide,
  onSetAsDefaultLocation,
  isCurrentDefault,
  onNavigate,
}) => {
  const [now, setNow] = useState<Date>(new Date());
  const [defaultSavedToast, setDefaultSavedToast] = useState(false);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Construct location representation
  const location: UserLocation = useMemo(
    () => ({
      type: 'city',
      name: `${city.name}, ${city.stateCode}`,
      stateCode: city.stateCode,
      latitude: city.latitude,
      longitude: city.longitude,
      timeZone: city.timeZone,
    }),
    [city]
  );

  // Calculate prayer times
  const calculatedTimes = useMemo(() => {
    return calculatePrayerTimes(location, settings, now);
  }, [location, settings, now]);

  const currentTimeFormatted = useMemo(() => {
    return formatPrayerTime(now, location.timeZone, settings.timeFormat24h);
  }, [now, location.timeZone, settings.timeFormat24h]);

  const currentMealIdea = useMemo(() => {
    return getMealSuggestionForTime(now);
  }, [now]);

  // Is Ramadan active?
  const isRamadanActive = useMemo(() => {
    if (settings.ramadanModeOverride !== null) return settings.ramadanModeOverride;
    return calculatedTimes.hijri.isRamadan;
  }, [settings.ramadanModeOverride, calculatedTimes.hijri.isRamadan]);

  // Nearby cities
  const nearbyCitiesList = useMemo(() => {
    return city.nearbySlugs
      .map((slug) => SEO_CITIES[slug])
      .filter((c): c is SeoCity => Boolean(c));
  }, [city]);

  // SEO: Dynamic title, meta description, canonical, and JSON-LD structured data
  useEffect(() => {
    const pageTitle = `Prayer Times in ${city.name}, ${city.stateCode} Today | Noakhali Kitchen`;
    const pageUrl = `https://www.noakhalikitchen.com/prayer-times/${city.slug}`;

    // Schema.org Structured Data: BreadcrumbList + WebPage + Place / Mosque schedule
    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': 'https://www.noakhalikitchen.com/',
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Prayer Times Directory',
              'item': 'https://www.noakhalikitchen.com/prayer-times',
            },
            {
              '@type': 'ListItem',
              'position': 3,
              'name': `${city.name}, ${city.stateCode}`,
              'item': pageUrl,
            },
          ],
        },
        {
          '@type': 'WebPage',
          '@id': `${pageUrl}#webpage`,
          'url': pageUrl,
          'name': pageTitle,
          'description': city.metaDescription,
          'inLanguage': ['en', 'bn'],
          'isPartOf': {
            '@type': 'WebSite',
            '@id': 'https://www.noakhalikitchen.com/#website',
            'name': 'Noakhali Kitchen Prayer Times',
            'url': 'https://www.noakhalikitchen.com/',
          },
        },
        {
          '@type': 'Place',
          'name': `${city.name}, ${city.stateCode}`,
          'address': {
            '@type': 'PostalAddress',
            'addressLocality': city.name,
            'addressRegion': city.stateCode,
            'addressCountry': city.countryCode || 'US',
          },
          'geo': {
            '@type': 'GeoCoordinates',
            'latitude': city.latitude,
            'longitude': city.longitude,
          },
        },
      ],
    };

    updatePageSeo({
      title: pageTitle,
      description: city.metaDescription,
      canonicalUrl: pageUrl,
      cityName: city.name,
      stateName: city.state,
      countryName: city.country,
      jsonLd,
    });
  }, [city]);

  const handleSetDefault = () => {
    onSetAsDefaultLocation(location);
    setDefaultSavedToast(true);
    setTimeout(() => setDefaultSavedToast(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation: Zero-Pill Discipline */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-stone-400">
        <button
          onClick={() => onNavigate('/')}
          className="hover:text-emerald-700 dark:hover:text-emerald-400 flex items-center gap-1 font-medium transition cursor-pointer"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>
        <ChevronRight className="w-3 h-3 text-slate-300 dark:text-stone-700" />
        <button
          onClick={() => onNavigate('/prayer-times')}
          className="hover:text-emerald-700 dark:hover:text-emerald-400 font-medium transition cursor-pointer"
        >
          Prayer Times
        </button>
        <ChevronRight className="w-3 h-3 text-slate-300 dark:text-stone-700" />
        <span className="font-semibold text-slate-800 dark:text-stone-200">
          {city.name}, {city.stateCode}
        </span>
      </nav>

      {/* Main City Header Banner with H1 and Tailored Intro */}
      <div className="rounded-3xl bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-800 p-4 sm:p-6 md:p-8 shadow-xs overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2 min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-emerald-700 dark:text-emerald-400 font-semibold tracking-wide uppercase">
              <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>
                {city.state}{city.countryCode !== 'US' ? `, ${city.country}` : ''} · {city.timeZone.replace('America/', '').replace(/_/g, ' ')} Time Zone
              </span>
              <span aria-hidden="true" className="text-slate-300 dark:text-stone-700">·</span>
              <span className="font-bangla">{city.banglaTitle}</span>
            </div>

            {/* Exactly ONE clean H1 */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Prayer Times in {city.name}, {city.stateCode} Today
            </h1>

            {/* Genuinely useful, tailored 2-3 sentence intro */}
            <p className="text-sm md:text-base text-slate-600 dark:text-stone-300 leading-relaxed max-w-3xl pt-1">
              {city.intro}
            </p>
          </div>

          {/* Set as Default City Button */}
          <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2">
            <button
              onClick={handleSetDefault}
              className={`min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isCurrentDefault
                  ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800'
                  : 'bg-emerald-800 hover:bg-emerald-700 text-white shadow-xs'
              }`}
            >
              {isCurrentDefault ? (
                <>
                  <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span>Default Home City</span>
                </>
              ) : (
                <>
                  <MapPin className="w-4 h-4 text-amber-300" />
                  <span>Set as My Default Home City</span>
                </>
              )}
            </button>

            {defaultSavedToast && (
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium text-center">
                ✓ Saved to your device!
              </span>
            )}
          </div>
        </div>

        {/* Share buttons row */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-stone-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-stone-400">
            <Share2 className="w-3.5 h-3.5 text-slate-400" />
            <span>Share daily schedule with friends & family:</span>
          </div>
          <ShareButtons
            title={`Prayer Times in ${city.name}, ${city.stateCode} Today`}
            cityName={`${city.name}, ${city.stateCode}`}
          />
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

      {/* 2. Ramadan Banner (when active) */}
      <RamadanBanner
        isRamadanActive={isRamadanActive}
        onToggleRamadanPreview={() => {}}
        suhoorTimeFormatted={calculatedTimes.fastingInfo.formattedSuhoor}
        iftarTimeFormatted={calculatedTimes.fastingInfo.formattedIftar}
        fastingDurationFormatted={calculatedTimes.fastingInfo.formattedDuration}
        suhoorDate={calculatedTimes.fastingInfo.suhoorEnds}
        iftarDate={calculatedTimes.fastingInfo.iftarTime}
        now={now}
      />

      {/* 3. Today's Full Schedule with Highlight */}
      <PrayerList prayers={calculatedTimes.list} asrMadhab={settings.asrMadhab} />

      {/* 4. English & Arabic (Hijri) Dual Calendar */}
      <DualCalendarCard location={location} settings={settings} now={now} />

      {/* 5. Qibla Direction in Degrees with Dial */}
      <QiblaCompass
        qiblaDegrees={calculatedTimes.qiblaDegrees}
        cityName={city.name}
        latitude={city.latitude}
        longitude={city.longitude}
      />

      {/* 5. Today's Meal Idea Card */}
      <MealIdeaCard
        recipe={currentMealIdea}
        isFavorite={favorites.includes(currentMealIdea.id)}
        onToggleFavorite={onToggleFavorite}
        onOpenAllRecipes={onOpenAllRecipes}
      />

      {/* 6. Placeholder Section: Halal Food & Mosques in [City] */}
      <div className="rounded-3xl bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-800 p-6 md:p-8 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-stone-800 pb-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Halal Food and Mosques in {city.name}
            </h2>
          </div>
          <a
            href={`/directory/${city.slug}`}
            onClick={(e) => {
              e.preventDefault();
              alert(`The full halal directory for ${city.name} is launching soon! Check back for mosque schedules and community reviews.`);
            }}
            className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 hover:underline inline-flex items-center gap-1"
          >
            <span>Explore {city.name} Halal Directory</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs text-slate-600 dark:text-stone-300">
          {/* Prominent Mosques */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-stone-800/50 border border-slate-100 dark:border-stone-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Prominent Mosques & Islamic Centers
            </h3>
            <ul className="space-y-1.5 list-disc pl-4 text-slate-600 dark:text-stone-400">
              {city.prominentMosques.map((mosque, idx) => (
                <li key={idx}>
                  <strong className="text-slate-800 dark:text-stone-200">{mosque}</strong>
                </li>
              ))}
            </ul>
          </div>

          {/* Halal Hubs */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-stone-800/50 border border-slate-100 dark:border-stone-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Popular Halal Dining & Deshi Corridors
            </h3>
            <ul className="space-y-1.5 list-disc pl-4 text-slate-600 dark:text-stone-400">
              {city.halalHubs.map((hub, idx) => (
                <li key={idx}>
                  <span>{hub}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 dark:text-stone-500 italic">
          Are you a local community member in {city.name}? Our community directory continuously updates local Jumu’ah and Taraweeh times.
        </p>
      </div>

      {/* 7. Nearby City Pages Links */}
      {nearbyCitiesList.length > 0 && (
        <div className="rounded-3xl bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-800 p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-stone-400">
            <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Nearby Cities & Metro Areas</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {nearbyCitiesList.map((nearby) => (
              <button
                key={nearby.slug}
                onClick={() => onNavigate(`/prayer-times/${nearby.slug}`)}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-stone-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200/80 dark:border-stone-800 text-left transition-all group cursor-pointer"
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                  {nearby.name}, {nearby.stateCode}
                </div>
                <div className="text-[11px] text-slate-400 dark:text-stone-500 mt-0.5">
                  View Today’s Times →
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mosque Timetable Testing Disclaimer */}
      <div className="rounded-2xl p-4 bg-slate-100/80 dark:bg-stone-900/60 border border-slate-200/80 dark:border-stone-800 text-xs text-slate-600 dark:text-stone-400 space-y-2">
        <p className="font-medium text-slate-800 dark:text-stone-300">
          <strong>Important Note:</strong> Times are calculated and may differ from your local mosque. Please confirm with your mosque.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            onClick={onOpenGuide}
            className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            How to calibrate with your {city.name} mosque →
          </button>
          <span aria-hidden="true" className="text-slate-300 dark:text-stone-700">·</span>
          <button
            onClick={onOpenSettings}
            className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            Change calculation method (ISNA / Karachi / Hanafi)
          </button>
        </div>
      </div>
    </div>
  );
};
