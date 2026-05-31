export type CoffeeType =
  | "Latte"
  | "Cappuccino"
  | "Flat White"
  | "Americano"
  | "Matcha Latte"
  | "Espresso"
  | "Cold Brew"
  | "Pour Over"
  | "Mocha";

export type CoffeeSource = "Cafe" | "Homemade";
export type RoastLevel = "Light" | "Medium" | "Medium-Dark" | "Dark";
export type Mood = "Tired" | "Stressed" | "Focused" | "Happy" | "Productive";
export type BrewMethod = "V60" | "Aeropress" | "French Press" | "Chemex" | "Espresso";
export type ThemePreference = "system" | "light" | "dark";
export type CoffeeOrigin = "Brazil" | "Colombia" | "Ethiopia" | "Kenya" | "Vietnam" | "Indonesia";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  caffeineLimitMg: number;
  sleepSensitiveAfterHour: number;
}

export interface CoffeeEntry {
  id: string;
  name: string;
  type: CoffeeType;
  shopName: string;
  source: CoffeeSource;
  price: number;
  rating: number;
  photoUri?: string;
  notes: string;
  tags: string[];
  moodBefore: Mood;
  moodAfter?: Mood;
  roastLevel?: RoastLevel;
  originCountry?: CoffeeOrigin;
  caffeineMg: number;
  productivityScore?: number;
  location?: string;
  people?: string[];
  drankAt: string;
  createdAt: string;
  isFavorite?: boolean;
}

export type CoffeeDraft = Omit<CoffeeEntry, "id" | "createdAt" | "caffeineMg"> & {
  caffeineMg?: number;
};

export interface Cafe {
  id: string;
  name: string;
  neighborhood: string;
  distanceKm: number;
  rating: number;
  priceLevel: "$" | "$$" | "$$$";
  tags: string[];
  recommendation: string;
  photoUri: string;
  saved: boolean;
  isTrending?: boolean;
  isHiddenGem?: boolean;
}

export interface BucketListItem {
  id: string;
  name: string;
  note: string;
  completed: boolean;
  targetCafe?: string;
}

export interface BrewRecipe {
  id: string;
  name: string;
  beans: string;
  grindSize: string;
  waterTemperatureC: number;
  method: BrewMethod;
  brewTimeSeconds: number;
  ratio: string;
  notes: string;
  createdAt: string;
}

export interface BeanCollectionItem {
  id: string;
  name: string;
  roaster: string;
  originCountry: CoffeeOrigin;
  roastLevel: RoastLevel;
  flavorNotes: string[];
  openedAt: string;
  expiresAt: string;
  gramsRemaining: number;
}

export interface SocialComment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface SocialPost {
  id: string;
  authorName: string;
  avatarUrl?: string;
  coffeeName: string;
  cafeName: string;
  rating: number;
  photoUri: string;
  caption: string;
  likes: number;
  likedByMe: boolean;
  comments: SocialComment[];
  createdAt: string;
}

export interface WorkSession {
  id: string;
  title: string;
  kind: "Work" | "Study";
  startedAt: string;
  durationMinutes: number;
  productivityScore: number;
  coffeeEntryId?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface BrewSeed {
  coffees: CoffeeEntry[];
  cafes: Cafe[];
  bucketList: BucketListItem[];
  recipes: BrewRecipe[];
  beans: BeanCollectionItem[];
  socialPosts: SocialPost[];
  workSessions: WorkSession[];
}

export interface CoffeeDNA {
  persona: string;
  favoriteType: CoffeeType | "Unknown";
  favoriteRoast: RoastLevel | "Unknown";
  spendingBehavior: string;
  preferredTimeWindow: string;
  insightLines: string[];
}

export interface WrappedReport {
  totalCoffees: number;
  totalSpending: number;
  favoriteCafe: string;
  favoriteDrink: string;
  mostActiveDay: string;
  coffeeStreak: number;
}
