export type MealPeriod = 'suhoor' | 'lunch' | 'iftar' | 'dinner';

export interface BangladeshiRecipe {
  id: string;
  name: string;
  bengaliName: string;
  period: MealPeriod;
  prepTime: string;
  description: string;
  ingredients: string[];
  tips: string;
  websiteUrl: string;
}

export const BANGLADESHI_RECIPES: BangladeshiRecipe[] = [
  // Suhoor Ideas (Nourishing, slow-burning energy before Fajr)
  {
    id: "panta-ilish",
    name: "Panta Ilish with Green Chili & Mustard",
    bengaliName: "পান্তা ইলিশ ও কাঁচামরিচ",
    period: "suhoor",
    prepTime: "15 mins (fermented rice)",
    description: "Traditional fermented rice soaked in cold water, served with lightly crisped Hilsa fish, pungent mustard oil, sliced shallots, and fiery green chili.",
    ingredients: ["Cooked aromatic rice", "Hilsa (Ilish) fish steaks", "Cold water", "Pure mustard oil", "Green chilies", "Red onions"],
    tips: "Extremely cooling and hydrating for long summer fasting days in the US.",
    websiteUrl: "https://www.noakhalikitchen.com/recipes/panta-ilish-with-green-chili-mustard"
  },
  {
    id: "plain-paratha",
    name: "Plain Paratha",
    bengaliName: "সাধারণ পরোটা",
    period: "suhoor",
    prepTime: "20 mins",
    description: "Soft, golden hand-layered Bangladeshi flatbread toasted with oil or ghee until crisp outside and tender inside—perfect with dim bhaji, bhuna curry, or hot tea.",
    ingredients: ["All-purpose flour (Maida)", "Warm water", "Ghee or vegetable oil", "Pinch of sugar", "Salt"],
    tips: "Rest the dough for 20 minutes before rolling and folding for ultra-flaky layers at Suhoor.",
    websiteUrl: "https://www.noakhalikitchen.com/recipes/plain-paratha"
  },
  {
    id: "bengali-khichuri-bhuna",
    name: "Bengali Khichuri Bhuna",
    bengaliName: "বাংলা খিচুড়ি ভুনা",
    period: "suhoor",
    prepTime: "35 mins",
    description: "Fragrant Chinigura or Kalijira rice slow-braised with roasted Moong dal, whole cinnamon, green cardamom, ginger paste, and ghee into a rich, dry-textured bhuna khichuri.",
    ingredients: ["Chinigura / Kalijira aromatic rice", "Roasted moong dal", "Ginger-garlic paste", "Ghee & mustard oil", "Whole garam masala", "Bay leaves"],
    tips: "Moong dal and warm spices are gentle on the stomach and provide steady energy for fasting.",
    websiteUrl: "https://www.noakhalikitchen.com/recipes/bengali-khichuri-bhuna"
  },
  {
    id: "suji-halwa",
    name: "Suji Halwa (Semolina Halva)",
    bengaliName: "সুজির হালুয়া",
    period: "suhoor",
    prepTime: "15 mins",
    description: "Fine semolina gently toasted in fragrant clarified ghee and simmered with milk or water, crushed green cardamoms, sugar, raisins, and sliced almonds.",
    ingredients: ["Fine semolina (suji)", "Pure ghee", "Whole milk or water", "Green cardamom", "Sugar", "Almonds and golden raisins"],
    tips: "Toast the semolina slowly on low heat until nutty and golden before adding warm liquid.",
    websiteUrl: "https://www.noakhalikitchen.com/recipes/suji-halwa-halva"
  },
  {
    id: "doodh-bhaat-kola",
    name: "Doodh Bhaat with Ripe Banana & Date Molasses",
    bengaliName: "দুধ ভাত, পাকা কলা ও খেজুরের গুড়",
    period: "suhoor",
    prepTime: "5 mins",
    description: "Warm steamed rice bathed in sweet warm milk, hand-mashed with fragrant ripe bananas and a drizzle of rich Patali Gur (date palm jaggery).",
    ingredients: ["Warm steamed rice", "Whole warm milk", "Ripe bananas", "Date palm jaggery (Patali gur)", "Pinch of salt"],
    tips: "A beloved village classic that soothes digestion and prevents morning thirst.",
    websiteUrl: "https://www.noakhalikitchen.com/recipes/doodh-bhaat-with-ripe-banana-date-molasses"
  },

  // Lunch Ideas (Midday sustenance, classic comforting spreads)
  {
    id: "noakhali-beef-bhuna",
    name: "Noakhali Special Beef Bhuna",
    bengaliName: "নোয়াখালীর ঐতিহ্যবাহী গরুর মাংস ভুনা",
    period: "lunch",
    prepTime: "55 mins",
    description: "Tender beef chunks slow-cooked with caramelized onions, roasted cumin powder, crushed dried red chilies, and whole garlic cloves until a dark, velvety gravy forms.",
    ingredients: ["Stewing beef chunks", "Sliced red onions (lots)", "Mustard oil", "Roasted cumin & coriander", "Whole garlic bulbs", "Dried bay leaves"],
    tips: "Let the gravy cook down on low heat (dum) for that signature dark Noakhali richness.",
    websiteUrl: "https://www.noakhalikitchen.com/recipes/bengali-beef-bhuna"
  },
  {
    id: "rui-macher-jhol",
    name: "Rui Macher Patla Jhol with Vegetables",
    bengaliName: "ফুলকপি ও আলু দিয়ে রুই মাছের ঝোল",
    period: "lunch",
    prepTime: "30 mins",
    description: "Light, cumin-tempered stew of fresh Rohu carp steaks with potato wedges, cauliflower florets, and fresh green chili simmered in fragrant turmeric broth.",
    ingredients: ["Rui / Rohu fish steaks", "Cauliflower florets", "Potato batons", "Kalo jeere (nigella seeds)", "Turmeric & green chilies", "Fresh cilantro"],
    tips: "The ultimate weekday comfort food across Bangladeshi households in the US.",
    websiteUrl: "https://www.noakhalikitchen.com/recipes/rohu-fish-curry"
  },
  {
    id: "chingri-malai-curry",
    name: "Golda Chingri Malai Curry",
    bengaliName: "গলদা চিংড়ির মালাইকারি",
    period: "lunch",
    prepTime: "35 mins",
    description: "Jumbo tiger prawns simmered in silky coconut milk infused with whole spices, mild green chilies, and a touch of clarified butter.",
    ingredients: ["Jumbo head-on prawns", "Thick coconut milk", "Onion paste", "Green cardamom & cloves", "Pinch of sugar", "Pure ghee"],
    tips: "Noakhali's coastal heritage shines through the balance of rich coconut milk and sweet prawns.",
    websiteUrl: "https://www.noakhalikitchen.com/recipes/golda-chingri-malai-curry"
  },
  {
    id: "morog-polao",
    name: "Dhaka Style Shahi Morog Polao",
    bengaliName: "সুস্বাদু শাহী মোরগ পোলাও",
    period: "lunch",
    prepTime: "50 mins",
    description: "Tender bone-in chicken braised with sour yogurt, mace, and nutmeg, layered with ghee-tossed Chinigura rice and golden crisp fried onions (beresta).",
    ingredients: ["Chicken bone-in pieces", "Plain curd / yogurt", "Chinigura / Kalijira rice", "Kewra water", "Golden beresta (fried onions)", "Alu Bukhara (prunes)"],
    tips: "Garnish with boiled eggs and fried cashew nuts for festive Friday family lunches.",
    websiteUrl: "https://www.noakhalikitchen.com/recipes/morog-polao"
  },
  {
    id: "sorshe-ilish",
    name: "Shorshe Ilish (Mustard Hilsa Curry)",
    bengaliName: "সরিষা ইলিশের খাঁটি স্বাদ",
    period: "lunch",
    prepTime: "25 mins",
    description: "Fresh Hilsa slices gently poached in freshly ground yellow and black mustard paste, seasoned with pungent virgin mustard oil and split green chilies.",
    ingredients: ["Hilsa fish steaks", "Yellow & black mustard paste", "Pure mustard oil", "Turmeric powder", "Slit fresh green chilies", "Pinch of salt"],
    tips: "Never over-fry the Hilsa before adding the mustard paste to retain the sweet natural oils.",
    websiteUrl: "https://www.noakhalikitchen.com/recipes/noakhali-shorshe-ilish"
  },

  // Iftar Ideas (Ramadan classics & evening sunset delights)
  {
    id: "crispy-piaju",
    name: "Crunchy Musur Dal Piaju (Lentil Fritters)",
    bengaliName: "মুচমুচে মসুর ডালের পেঁয়াজু",
    period: "iftar",
    prepTime: "25 mins",
    description: "Coarsely ground red lentils whipped with thinly sliced red shallots, minced ginger, green chili, and cilantro, fried until deeply crisp and amber.",
    ingredients: ["Red lentils (musur dal)", "Finely sliced red onions", "Minced green chilies", "Fresh cilantro", "Ginger paste", "Vegetable oil for frying"],
    tips: "Keep the lentil paste slightly coarse and pulse without water for maximum crunch at Iftar.",
    websiteUrl: "https://www.noakhalikitchen.com/recipes/dal-piyaju-pakora"
  },
  {
    id: "beguni-crunch",
    name: "Paper-Thin Crispy Beguni",
    bengaliName: "মুচমুচে ফুলকো বেগুনি",
    period: "iftar",
    prepTime: "20 mins",
    description: "Wafer-thin long eggplant slices dipped in an aerated besan batter spiked with cumin, red chili, and a dash of rice flour, puffed to crisp perfection.",
    ingredients: ["Long purple eggplants", "Gram flour (besan)", "Rice flour (for crispiness)", "Kalo jeere (nigella seeds)", "Turmeric & chili powder"],
    tips: "Rest the sliced eggplants with a pinch of salt to remove excess moisture before dipping.",
    websiteUrl: "https://www.noakhalikitchen.com/recipes/beguni-eggplant-pakora"
  },
  {
    id: "chhola-bhuna",
    name: "Spiced Masala Chhola Boot Bhuna",
    bengaliName: "স্পাইসি ইফতারি ছোলা ভুনা",
    period: "iftar",
    prepTime: "30 mins",
    description: "Tender brown chickpeas tempered with mustard oil, cubed baby potatoes, roasted cumin, ginger slivers, and finished with fresh lemon juice and raw cucumber.",
    ingredients: ["Brown chickpeas (kala chana)", "Boiled potato cubes", "Chopped ginger & green chili", "Roasted bhuna masala", "Fresh lemon juice", "Finely diced red onion"],
    tips: "Essential Iftar staple across every Bangladeshi table from Dhaka to Dallas.",
    websiteUrl: "https://www.noakhalikitchen.com/recipes/black-chana"
  },
  {
    id: "shahi-halim",
    name: "Shahi Mutton Halim (Slow Cooked)",
    bengaliName: "শাহী খাসির মাংসের হালিম",
    period: "iftar",
    prepTime: "1 hr 15 mins",
    description: "Rich, slow-simmered blend of five lentils, cracked wheat, and shredded tender goat meat infused with 14 aromatic whole spices, fried onions, and julienned ginger.",
    ingredients: ["Goat / mutton bone-in pieces", "Five lentils blend", "Cracked bulgur wheat", "Special Halim masala", "Julienned ginger", "Fresh lemon wedges"],
    tips: "Serve piping hot with a squeeze of fresh lime, fried shallots, and chopped mint leaves.",
    websiteUrl: "https://www.noakhalikitchen.com/recipes/royal-hyderabadi-mutton-haleem"
  },
  {
    id: "shahi-borhani",
    name: "Traditional Spicy Wedding Borhani",
    bengaliName: "নোয়াখালী ও ঢাকার শাহী বোরহানি",
    period: "iftar",
    prepTime: "10 mins",
    description: "A probiotic savory spiced yogurt drink blended with fresh mint leaves, roasted cumin, black salt (bit laban), crushed mustard, and green chili.",
    ingredients: ["Full fat plain yogurt", "Fresh mint & cilantro leaves", "Black salt (bit laban)", "Roasted cumin & coriander", "Green chili paste", "Ice cold water"],
    tips: "Aiding fast digestion after a rich Iftar or dinner meal.",
    websiteUrl: "https://www.noakhalikitchen.com/recipes/borhani"
  },

  // Dinner Ideas (Nighttime family comfort & sweets)
  {
    id: "noakhali-narkel-murgi",
    name: "Noakhali Coconut Milk Chicken Curry",
    bengaliName: "নারকেল দুধে নোয়াখালীর দেশি মুরগি",
    period: "dinner",
    prepTime: "40 mins",
    description: "Country chicken braised in freshly pressed coconut milk, fried shallot paste, whole cardamoms, and aromatic bay leaves—a celebrated Noakhali coastal specialty.",
    ingredients: ["Free-range chicken pieces", "Fresh thick coconut milk", "Caramelized onion paste", "Whole green cardamoms", "Cloves & cinnamon stick", "Green chili"],
    tips: "Pairs heavenly with hot basmati rice, luchi, or steamed ruti at family dinner.",
    websiteUrl: "https://www.noakhalikitchen.com/recipes/chicken-rezala"
  },
  {
    id: "rui-macher-macher-dim-bhuna",
    name: "Spiced Fish Roe Bhuna with Onions",
    bengaliName: "মাছের ডিম ভুনা",
    period: "dinner",
    prepTime: "25 mins",
    description: "Fresh carp roe broken down and pan-roasted with diced onions, tomatoes, turmeric, slit green chilies, and lots of fresh chopped coriander.",
    ingredients: ["Fresh fish roe", "Coarsely chopped onions", "Tomatoes", "Turmeric & Kashmiri chili", "Fresh green coriander", "Mustard oil"],
    tips: "Fry with generous onions until the roe is pleasantly crumbly and fragrant.",
    websiteUrl: "https://www.noakhalikitchen.com/recipes/bengali-fish-curry-macher-jhol"
  },
  {
    id: "patishapta-pitha",
    name: "Authentic Patishapta Pitha",
    bengaliName: "পাটিসাপ্টা পিঠা",
    period: "dinner",
    prepTime: "35 mins",
    description: "Delicate thin Bengali crepes rolled around a rich caramelized khoya, coconut, and date palm jaggery (khejurer gur) filling—a nostalgic family dessert.",
    ingredients: ["Rice flour & all-purpose flour", "Whole milk & khoya/kheer", "Grated fresh coconut", "Date palm jaggery (gur)", "Cardamom powder", "Ghee"],
    tips: "Keep the pan on medium-low heat and brush lightly with ghee so every pitha rolls smoothly.",
    websiteUrl: "https://www.noakhalikitchen.com/recipes/patishapta-pitha"
  },
  {
    id: "shahi-firni",
    name: "Clay Pot Shahi Firni with Rose Water",
    bengaliName: "মাটির পাত্রে শাহী ফিরনি",
    period: "dinner",
    prepTime: "30 mins",
    description: "Coarsely ground aromatic Chinigura rice simmered patiently in full cream milk until thick and creamy, perfumed with rose water and crushed cardamoms.",
    ingredients: ["Chinigura rice coarsely crushed", "Rich whole milk", "Cardamom powder", "Pure rose water", "Sugar", "Silver leaf & crushed pistachios"],
    tips: "Chill in the refrigerator for at least 2 hours to let the clay pot set the texture.",
    websiteUrl: "https://www.noakhalikitchen.com/recipes/kheer-shahi-rice-kheer-payesh"
  },
  {
    id: "dim-korma",
    name: "Shahi Dim Korma (Braised Egg White Korma)",
    bengaliName: "নরম মিষ্টি শাহী ডিম কোরমা",
    period: "dinner",
    prepTime: "30 mins",
    description: "Hard-boiled eggs gently pierced and simmered in a mildly sweet, aromatic white onion-almond sauce with green chilies, whole spices, and milk.",
    ingredients: ["Hard-boiled farm eggs", "White onion paste", "Yogurt & heavy cream", "Almond paste", "Whole green cardamoms", "Slit green chilies (flavor without heat)"],
    tips: "Classic celebratory dinner companion to ghee rice or fragrant saffron polao.",
    websiteUrl: "https://www.noakhalikitchen.com/recipes/shahi-dim-korma"
  }
];

export function getMealSuggestionForTime(now: Date): BangladeshiRecipe {
  const hour = now.getHours();
  let targetPeriod: MealPeriod = 'suhoor';
  if (hour >= 3 && hour < 12) {
    targetPeriod = 'suhoor';
  } else if (hour >= 12 && hour < 16) {
    targetPeriod = 'lunch';
  } else if (hour >= 16 && hour < 20) {
    targetPeriod = 'iftar';
  } else {
    targetPeriod = 'dinner';
  }

  const matching = BANGLADESHI_RECIPES.filter((r) => r.period === targetPeriod);
  if (matching.length === 0) return BANGLADESHI_RECIPES[0];

  // Pick a deterministic yet changing recipe based on the day of the month
  const day = now.getDate();
  return matching[day % matching.length];
}
