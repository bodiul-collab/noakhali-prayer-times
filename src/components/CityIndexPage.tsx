import React, { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, Compass, ArrowRight, Home, Globe } from 'lucide-react';
import { SEO_CITIES, getAllSeoCities } from '../data/seoCities';
import { GLOBAL_CITIES } from '../data/cities';
import { updatePageSeo } from '../utils/seo';

interface CityIndexPageProps {
  onNavigate: (path: string) => void;
}

export const CityIndexPage: React.FC<CityIndexPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRegion, setFilterRegion] = useState<'all' | 'featured' | 'us' | 'world'>('all');

  const allFeaturedCities = useMemo(() => getAllSeoCities(), []);

  useEffect(() => {
    updatePageSeo({
      title: 'Muslim Prayer Times Directory by City | Noakhali Kitchen',
      description:
        'Browse daily Muslim prayer times, Qibla direction, and Ramadan schedule for cities across the United States, Bangladesh, and worldwide.',
      canonicalUrl: 'https://www.noakhalikitchen.com/prayer-times',
    });
  }, []);

  const filteredFeatured = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return allFeaturedCities.filter((city) => {
      if (!q) return true;
      return (
        city.name.toLowerCase().includes(q) ||
        city.state.toLowerCase().includes(q) ||
        city.stateCode.toLowerCase().includes(q) ||
        city.country.toLowerCase().includes(q)
      );
    });
  }, [allFeaturedCities, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-stone-400">
        <button
          onClick={() => onNavigate('/')}
          className="hover:text-emerald-700 dark:hover:text-emerald-400 flex items-center gap-1 font-medium transition cursor-pointer"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>
        <span>/</span>
        <span className="font-semibold text-slate-800 dark:text-stone-200">
          City Prayer Times Directory
        </span>
      </nav>

      {/* Main Index Header */}
      <div className="rounded-3xl bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-800 p-6 md:p-8 shadow-xs">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            <Globe className="w-4 h-4" />
            <span>US & Worldwide Prayer Timetables</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Prayer Times Directory by City
          </h1>
          <p className="text-sm text-slate-600 dark:text-stone-300 leading-relaxed">
            Select your city to view verified daily prayer times (Fajr, Dhuhr, Asr, Maghrib, Isha), live countdowns, precise Qibla bearing, and traditional Bangladeshi meal inspirations.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mt-6 relative max-w-xl">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by city, state, or metro area (e.g. Houston, New York, Detroit)..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-100 dark:bg-stone-800 border border-transparent focus:border-emerald-600 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Primary Featured City Pages */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Major City Prayer Pages</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold">
              {filteredFeatured.length} Cities
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredFeatured.map((city) => (
            <button
              key={city.slug}
              onClick={() => onNavigate(`/prayer-times/${city.slug}`)}
              className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-800 hover:border-emerald-600 dark:hover:border-emerald-500 hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 dark:text-stone-500 mb-1">
                  <span>{city.state}</span>
                  <span className="font-mono">{city.stateCode}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  {city.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-stone-400 mt-1 line-clamp-2">
                  {city.intro}
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-stone-800/80 flex items-center justify-between text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                <span>View Prayer Schedule</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Note about 500+ Worldwide Cities */}
      <div className="rounded-2xl p-5 bg-emerald-50/70 dark:bg-stone-900 border border-emerald-200/80 dark:border-stone-800 text-xs text-emerald-950 dark:text-emerald-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <strong className="block font-bold text-sm text-emerald-900 dark:text-white">
            Looking for another US town or international city?
          </strong>
          <span className="text-xs text-emerald-800/80 dark:text-emerald-400">
            Our interactive calculator supports 575+ cities across the US, Bangladesh, UK, Canada, and the Middle East.
          </span>
        </div>
        <button
          onClick={() => onNavigate('/')}
          className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs shrink-0 transition"
        >
          Open Interactive Calculator
        </button>
      </div>
    </div>
  );
};
