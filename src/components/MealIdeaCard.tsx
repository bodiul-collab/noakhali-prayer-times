import React from 'react';
import { UtensilsCrossed, Heart, ExternalLink, Clock, Sparkles } from 'lucide-react';
import { BangladeshiRecipe } from '../data/recipes';

interface MealIdeaCardProps {
  recipe: BangladeshiRecipe;
  isFavorite: boolean;
  onToggleFavorite: (recipeId: string) => void;
  onOpenAllRecipes: () => void;
}

export const MealIdeaCard: React.FC<MealIdeaCardProps> = ({
  recipe,
  isFavorite,
  onToggleFavorite,
  onOpenAllRecipes,
}) => {
  const periodLabels: Record<string, { en: string; bn: string; badgeClass: string }> = {
    suhoor: {
      en: 'Suhoor Suggestion',
      bn: 'সেহরির খাবার আইডিয়া',
      badgeClass: 'text-amber-800 dark:text-amber-300',
    },
    lunch: {
      en: 'Midday Lunch Idea',
      bn: 'দুপুরের খাবার আইডিয়া',
      badgeClass: 'text-emerald-800 dark:text-emerald-300',
    },
    iftar: {
      en: 'Iftar Special',
      bn: 'ইফতারের ঐতিহ্যবাহী পদ',
      badgeClass: 'text-rose-800 dark:text-rose-300',
    },
    dinner: {
      en: 'Evening Dinner Idea',
      bn: 'নৈশভোজের রেসিপি',
      badgeClass: 'text-indigo-800 dark:text-indigo-300',
    },
  };

  const currentPeriod = periodLabels[recipe.period] || periodLabels.dinner;

  return (
    <div className="rounded-3xl bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-800 shadow-sm p-5 md:p-6 transition-all">
      {/* Header: Zero-Pill Discipline */}
      <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-stone-800">
        <div className="flex items-center gap-2 text-xs">
          <UtensilsCrossed className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Today's Meal Idea
          </span>
          <span aria-hidden="true" className="text-slate-300 dark:text-stone-700">·</span>
          <span className={`font-semibold ${currentPeriod.badgeClass}`}>
            {currentPeriod.en}
          </span>
          <span aria-hidden="true" className="text-slate-300 dark:text-stone-700 hidden sm:inline">·</span>
          <span className="font-bangla text-slate-500 dark:text-stone-400 hidden sm:inline">
            {currentPeriod.bn}
          </span>
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={() => onToggleFavorite(recipe.id)}
          className={`min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center transition-all ${
            isFavorite
              ? 'text-rose-600 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/40'
              : 'text-slate-400 dark:text-stone-500 hover:text-rose-500 bg-slate-50 dark:bg-stone-800'
          }`}
          title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
          aria-label="Save to favorites"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-600' : ''}`} />
        </button>
      </div>

      {/* Main Recipe Info */}
      <div className="space-y-3">
        <div>
          <h4 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
            <a
              href={recipe.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors inline-flex items-baseline gap-2 group"
            >
              <span>{recipe.name}</span>
              <ExternalLink className="w-4 h-4 text-emerald-600/70 dark:text-emerald-400/70 opacity-75 group-hover:opacity-100 shrink-0 self-center" />
            </a>
          </h4>
          <p className="text-sm font-bangla font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5">
            {recipe.bengaliName}
          </p>
        </div>

        <p className="text-sm text-slate-600 dark:text-stone-300 leading-relaxed">
          {recipe.description}
        </p>

        {/* Ingredients Highlights */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-stone-400 mb-1.5">
            Key Ingredients · মূল উপকরণ
          </div>
          <div className="flex flex-wrap gap-1.5 text-xs text-slate-700 dark:text-stone-300">
            {recipe.ingredients.map((ing, i) => (
              <span key={i} className="inline-flex items-center">
                <span>{ing}</span>
                {i < recipe.ingredients.length - 1 && (
                  <span aria-hidden="true" className="mx-1.5 text-slate-300 dark:text-stone-700">·</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Kitchen Tip / Noakhali Note */}
        <div className="p-3 rounded-2xl bg-amber-50/70 dark:bg-stone-800/60 border border-amber-200/60 dark:border-stone-700/80 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold">Kitchen Tradition: </strong>
            <span>{recipe.tips}</span>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-stone-400">
          <Clock className="w-3.5 h-3.5" />
          <span>Prep time: <strong className="text-slate-800 dark:text-stone-200 font-medium">{recipe.prepTime}</strong></span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenAllRecipes}
            className="min-h-[40px] text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 py-2 px-2.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Browse All 20 Recipes →
          </button>

          <a
            href={recipe.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[40px] inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white text-xs font-bold shadow-sm transition-colors"
          >
            <span>{recipe.websiteUrl.includes('/recipes/') ? 'View Recipe' : 'Visit Noakhali Kitchen'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
