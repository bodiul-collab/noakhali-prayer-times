import React, { useState, useMemo } from 'react';
import { X, Search, Navigation, Check, ShieldCheck, MapPin, Globe } from 'lucide-react';
import { City, GLOBAL_CITIES } from '../data/cities';
import { UserLocation } from '../types';

interface CityPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: UserLocation;
  onSelectCity: (city: City) => void;
  onUseCurrentLocation: () => void;
  isLocating: boolean;
  locationError: string | null;
}

type RegionFilter = 'all' | 'bd' | 'us' | 'uk_eu' | 'me' | 'ca' | 'asia_world';

export const CityPickerModal: React.FC<CityPickerModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
  onSelectCity,
  onUseCurrentLocation,
  isLocating,
  locationError,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRegion, setActiveRegion] = useState<RegionFilter>('all');

  const filteredCities = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return GLOBAL_CITIES.filter((c) => {
      // Region filter
      if (activeRegion !== 'all') {
        if (c.region !== activeRegion) return false;
      }

      // Search query filter
      if (!q) return true;

      const nameMatch = c.name.toLowerCase().includes(q);
      const stateMatch = c.state.toLowerCase().includes(q);
      const stateCodeMatch = c.stateCode.toLowerCase().includes(q);
      const countryMatch = c.country?.toLowerCase().includes(q);
      const countryCodeMatch = c.countryCode?.toLowerCase().includes(q);

      return nameMatch || stateMatch || stateCodeMatch || countryMatch || countryCodeMatch;
    });
  }, [searchQuery, activeRegion]);

  if (!isOpen) return null;

  const regionTabs: { id: RegionFilter; label: string; count: number }[] = [
    { id: 'all', label: 'All Cities', count: GLOBAL_CITIES.length },
    { id: 'bd', label: 'Bangladesh 🇧🇩', count: GLOBAL_CITIES.filter((c) => c.region === 'bd').length },
    { id: 'us', label: 'USA 🇺🇸', count: GLOBAL_CITIES.filter((c) => c.region === 'us').length },
    { id: 'uk_eu', label: 'UK & Europe 🇬🇧🇪🇺', count: GLOBAL_CITIES.filter((c) => c.region === 'uk_eu').length },
    { id: 'me', label: 'Middle East 🇸🇦', count: GLOBAL_CITIES.filter((c) => c.region === 'me').length },
    { id: 'ca', label: 'Canada 🇨🇦', count: GLOBAL_CITIES.filter((c) => c.region === 'ca').length },
    { id: 'asia_world', label: 'Asia & World 🌏', count: GLOBAL_CITIES.filter((c) => c.region === 'asia_world').length },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-stone-800 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-5 pb-4 border-b border-slate-100 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Select Your City</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold">
                  {GLOBAL_CITIES.length}+ Cities Worldwide
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-stone-400 font-bangla mt-0.5">
                বাংলাদেশ, যুক্তরাষ্ট্র, যুক্তরাজ্য ও বিশ্বজুড়ে প্রধান শহরসমূহ
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

        {/* Use My Location Prominent Button */}
        <div className="p-4 bg-emerald-50/70 dark:bg-stone-950/60 border-b border-emerald-100 dark:border-stone-800">
          <button
            onClick={onUseCurrentLocation}
            disabled={isLocating}
            className="w-full min-h-[48px] px-4 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-700 active:scale-[0.99] text-white font-semibold text-sm flex items-center justify-center gap-2.5 shadow-md shadow-emerald-900/10 transition-all disabled:opacity-75 cursor-pointer"
          >
            <Navigation className={`w-4 h-4 text-amber-300 ${isLocating ? 'animate-spin' : ''}`} />
            <span>{isLocating ? 'Detecting Precise Location...' : 'Use My Exact Location (GPS / Geolocation)'}</span>
          </button>

          {locationError && (
            <div className="mt-2 text-xs text-rose-600 dark:text-rose-400 font-medium">
              {locationError}
            </div>
          )}

          {/* Privacy Guarantee Required Line */}
          <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-emerald-900/80 dark:text-emerald-300/80 font-medium justify-center text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Your location is processed entirely in your browser and is never sent or stored on any server.</span>
          </div>
        </div>

        {/* Search Input Box */}
        <div className="p-4 pb-2 border-b border-slate-100 dark:border-stone-800 space-y-2.5">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city, division, state, or country (e.g. Noakhali, Dhaka, London, Dallas)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-stone-800 border-none text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-stone-200"
              >
                Clear
              </button>
            )}
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {regionTabs.map((tab) => {
              const isSelected = activeRegion === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveRegion(tab.id)}
                  className={`min-h-[36px] px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-stone-800 text-slate-600 dark:text-stone-400 hover:bg-slate-200 dark:hover:bg-stone-700'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className="ml-1 opacity-75 text-[10px]">({tab.count})</span>
                </button>
              );
            })}
          </div>

          <div className="text-[11px] text-slate-400 dark:text-stone-500 flex justify-between">
            <span>Showing {filteredCities.length} locations</span>
            <span>Starred (★) = Top Bangladeshi Hubs</span>
          </div>
        </div>

        {/* City List Scrollable */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-stone-800 p-2">
          {filteredCities.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500 dark:text-stone-400">
              No matching locations found for "{searchQuery}".
              <br />
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveRegion('all');
                }}
                className="mt-3 text-xs font-semibold text-emerald-600 dark:text-emerald-400 underline"
              >
                Reset search & region filter
              </button>
            </div>
          ) : (
            filteredCities.map((city) => {
              const isSelected =
                currentLocation.city?.id === city.id ||
                (!currentLocation.city && currentLocation.name.includes(city.name));

              return (
                <button
                  key={city.id}
                  onClick={() => {
                    onSelectCity(city);
                    onClose();
                  }}
                  className={`w-full min-h-[52px] px-4 py-3 rounded-xl flex items-center justify-between text-left transition-colors ${
                    isSelected
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold'
                      : 'hover:bg-slate-50 dark:hover:bg-stone-800/60 text-slate-800 dark:text-stone-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MapPin className={`w-4 h-4 shrink-0 ${city.popularBangladeshHub ? 'text-amber-500' : 'text-slate-400'}`} />
                    <div>
                      <div className="text-sm font-medium flex items-center gap-1.5 flex-wrap">
                        <span>{city.name}</span>
                        {city.popularBangladeshHub && (
                          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
                            ★ BD Hub
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 dark:text-stone-500">
                        {city.state} {city.country ? `· ${city.country}` : ''} ({city.stateCode}) · {city.timeZone}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 dark:bg-stone-950/40 border-t border-slate-100 dark:border-stone-800 text-center text-xs text-slate-500 dark:text-stone-400">
          Saved automatically to your device for instant offline access anywhere in the world.
        </div>
      </div>
    </div>
  );
};
