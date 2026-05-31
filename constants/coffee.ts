import type {
  BrewMethod,
  CoffeeType,
  Mood,
  RoastLevel,
} from "@/src/types/brew";

export const coffeeTypes: CoffeeType[] = [
  "Latte",
  "Cappuccino",
  "Flat White",
  "Americano",
  "Matcha Latte",
  "Espresso",
  "Cold Brew",
  "Pour Over",
  "Mocha",
];

export const brewMethods: BrewMethod[] = [
  "V60",
  "Aeropress",
  "French Press",
  "Chemex",
  "Espresso",
];
export const roastLevels: RoastLevel[] = [
  "Light",
  "Medium",
  "Medium-Dark",
  "Dark",
];
export const moods: Mood[] = [
  "Tired",
  "Stressed",
  "Focused",
  "Happy",
  "Productive",
];

export const tagSuggestions = [
  "sweet",
  "milk-based",
  "nutty",
  "bright",
  "date",
  "work",
  "study",
  "cozy",
  "specialty",
  "late-night",
];

export const originCountries = [
  "Brazil",
  "Colombia",
  "Ethiopia",
  "Kenya",
  "Vietnam",
  "Indonesia",
] as const;

export const caffeineByType: Record<CoffeeType, number> = {
  Latte: 120,
  Cappuccino: 120,
  "Flat White": 130,
  Americano: 150,
  "Matcha Latte": 70,
  Espresso: 80,
  "Cold Brew": 200,
  "Pour Over": 170,
  Mocha: 130,
};

export const palette = {
  espresso: "#1F120C",
  mocha: "#4B2F24",
  crema: "#F7EFE2",
  latte: "#D8B98F",
  orange: "#E8783E",
  sage: "#7C9A78",
  ink: "#171412",
  mist: "#F9F7F2",
};
