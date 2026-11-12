import React, { useState } from 'react';
import { X, Heart, ExternalLink, UtensilsCrossed, Clock, Sparkles } from 'lucide-react';
import { BANGLADESHI_RECIPES, BangladeshiRecipe, MealPeriod } from '../data/recipes';

interface RecipesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  onToggleFavorite: (recipeId: string) => void;
}

export const RecipesModal: React.FC<RecipesModalProps> = ({
  isOpen,
  onClose,
  favorites,
  onToggleFavorite,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | MealPeriod | 'favorites'>('all');

  if (!isOpen) return null;

  const filteredRecipes = BANGLADESHI_RECIPES.filter((recipe) => {
    if (activeTab === 'favorites') {
      return favorites.includes(recipe.id);
    }
    if (activeTab === 'all') return true;
    return recipe.period === activeTab;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-stone-800 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="p-5 pb-4 border-b border-slate-100 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Bangladeshi Kitchen Recipes</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold">
                  20 Recipes
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-stone-400 font-bangla mt-0.5">
                নোয়াখালী ও বাংলাদেশি ঘরোয়া রান্নার স্বাদ ও সুস্বাদু পদসমূহ
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

        {/* Filter Navigation Tabs */}
        <div className="px-5 pt-3 pb-2 border-b border-slate-100 dark:border-stone-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All Dishes (20)', bn: 'সকল পদ' },
            { id: 'favorites', label: `My Favorites (${favorites.length})`, bn: 'পছন্দের তালিকা' },
            { id: 'suhoor', label: 'Suhoor', bn: 'সেহরি' },
            { id: 'lunch', label: 'Lunch', bn: 'দুপুর' },
            { id: 'iftar', label: 'Iftar', bn: 'ইফতার' },
            { id: 'dinner', label: 'Dinner', bn: 'রাত' },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-stone-800 text-slate-600 dark:text-stone-300 hover:bg-slate-200 dark:hover:bg-stone-700'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Recipe Cards List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {filteredRecipes.length === 0 ? (
            <div className="p-12 text-center text-slate-500 dark:text-stone-400">
              <Heart className="w-8 h-8 text-slate-300 dark:text-stone-700 mx-auto mb-2" />
              <p className="text-sm font-semibold">No favorite recipes saved yet.</p>
              <p className="text-xs text-slate-400 mt-1">
                Tap the heart icon on any recipe to add it to your personal favorites.
              </p>
            </div>
          ) : (
            filteredRecipes.map((recipe) => {
              const isFav = favorites.includes(recipe.id);
              return (
                <div
                  key={recipe.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-stone-800/40 border border-slate-200 dark:border-stone-800 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        {recipe.period.toUpperCase()} · {recipe.prepTime}
                      </div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                        <a
                          href={recipe.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors hover:underline underline-offset-2"
                        >
                          {recipe.name}
                        </a>
                      </h4>
                      <p className="text-xs font-bangla font-medium text-emerald-800 dark:text-emerald-300">
                        {recipe.bengaliName}
                      </p>
                    </div>

                    <button
                      onClick={() => onToggleFavorite(recipe.id)}
                      className={`min-h-[40px] min-w-[40px] rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                        isFav
                          ? 'text-rose-600 bg-rose-50 dark:bg-rose-950/60'
                          : 'text-slate-400 dark:text-stone-500 hover:text-rose-500 bg-white dark:bg-stone-700'
                      }`}
                      title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-600' : ''}`} />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-stone-300 leading-relaxed">
                    {recipe.description}
                  </p>

                  <div className="flex flex-wrap gap-1 text-[11px] text-slate-500 dark:text-stone-400">
                    <span className="font-semibold text-slate-700 dark:text-stone-300">Ingredients:</span>
                    {recipe.ingredients.join(', ')}
                  </div>

                  <div className="pt-2.5 border-t border-slate-200/80 dark:border-stone-800 flex flex-wrap items-center justify-between gap-2.5 text-xs">
                    <span className="text-[11px] text-amber-800 dark:text-amber-300 italic flex-1 min-w-[180px]">
                      Tip: {recipe.tips}
                    </span>
                    <a
                      href={recipe.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`min-h-[36px] inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold transition-colors shrink-0 ${
                        recipe.websiteUrl.includes('/recipes/')
                          ? 'bg-emerald-800 hover:bg-emerald-700 text-white shadow-xs'
                          : 'bg-white dark:bg-stone-700 hover:bg-emerald-50 dark:hover:bg-stone-600 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-stone-600'
                      }`}
                    >
                      <span>{recipe.websiteUrl.includes('/recipes/') ? 'View Recipe' : 'Visit Site'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-emerald-950 text-white border-t border-emerald-900 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <strong className="block text-amber-300">Noakhali Kitchen Online</strong>
            <span className="text-emerald-300/80">Traditional recipes for the diaspora</span>
          </div>
          <a
            href="https://www.noakhalikitchen.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-semibold flex items-center gap-1.5"
          >
            <span>Visit www.noakhalikitchen.com</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
