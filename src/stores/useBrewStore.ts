import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { estimateCaffeine } from "@/src/utils/analytics";
import type {
  BeanCollectionItem,
  BrewRecipe,
  BrewSeed,
  BucketListItem,
  Cafe,
  CoffeeDraft,
  CoffeeEntry,
  SocialPost,
  ThemePreference,
  UserProfile,
  WorkSession,
} from "@/src/types/brew";

const makeId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const emptyBrewData: BrewSeed = {
  coffees: [],
  cafes: [],
  bucketList: [],
  recipes: [],
  beans: [],
  socialPosts: [],
  workSessions: [],
};

const isLegacyDemoUser = (user: UserProfile | null | undefined) =>
  user?.name === "Rey" || user?.email === "local@brewspace.app" || user?.avatarUrl?.includes("images.unsplash.com/photo-1544005313");

interface BrewState extends BrewSeed {
  user: UserProfile | null;
  hasOnboarded: boolean;
  hasHydrated: boolean;
  theme: ThemePreference;
  openAiApiKey: string | null;
}

interface BrewActions {
  setHasHydrated: (value: boolean) => void;
  completeOnboarding: () => void;
  signIn: (name: string, email: string) => void;
  signOut: () => void;
  setTheme: (theme: ThemePreference) => void;
  setCaffeineLimit: (limitMg: number) => void;
  addCoffee: (draft: CoffeeDraft) => CoffeeEntry;
  toggleCoffeeFavorite: (id: string) => void;
  toggleCafeWishlist: (id: string) => void;
  toggleBucketProgress: (id: string) => void;
  addRecipe: (recipe: Omit<BrewRecipe, "id" | "createdAt">) => void;
  addBean: (bean: Omit<BeanCollectionItem, "id">) => void;
  togglePostLike: (id: string) => void;
  addComment: (postId: string, text: string) => void;
  clearLocalData: () => void;
  setOpenAiApiKey: (key: string | null) => void;
}

type BrewStore = BrewState & BrewActions;

const initialState: BrewState = {
  ...emptyBrewData,
  user: null,
  hasOnboarded: false,
  hasHydrated: false,
  theme: "system",
  openAiApiKey: null, // SECURITY: Never hardcode or bundle OpenAI keys in client applications. Use Settings UI instead.
};

export const useBrewStore = create<BrewStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      setHasHydrated: (value) => set({ hasHydrated: value }),
      completeOnboarding: () => set({ hasOnboarded: true }),
      signIn: (name, email) =>
        set({
          user: {
            id: makeId("user"),
            name: name.trim() || "BrewSpace Guest",
            email: email.trim() || "guest@brewspace.local",
            caffeineLimitMg: 400,
            sleepSensitiveAfterHour: 17,
          },
        }),
      signOut: () => set({ user: null }),
      setTheme: (theme) => set({ theme }),
      setCaffeineLimit: (limitMg) =>
        set((state) => ({
          user: state.user ? { ...state.user, caffeineLimitMg: limitMg } : state.user,
        })),
      addCoffee: (draft) => {
        const entry: CoffeeEntry = {
          ...draft,
          id: makeId("coffee"),
          createdAt: new Date().toISOString(),
          caffeineMg: estimateCaffeine(draft.type, draft.caffeineMg),
        };
        set((state) => ({ coffees: [entry, ...state.coffees] }));
        return entry;
      },
      toggleCoffeeFavorite: (id) =>
        set((state) => ({
          coffees: state.coffees.map((entry) => (entry.id === id ? { ...entry, isFavorite: !entry.isFavorite } : entry)),
        })),
      toggleCafeWishlist: (id) =>
        set((state) => ({
          cafes: state.cafes.map((cafe) => (cafe.id === id ? { ...cafe, saved: !cafe.saved } : cafe)),
        })),
      toggleBucketProgress: (id) =>
        set((state) => ({
          bucketList: state.bucketList.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)),
        })),
      addRecipe: (recipe) =>
        set((state) => ({
          recipes: [{ ...recipe, id: makeId("recipe"), createdAt: new Date().toISOString() }, ...state.recipes],
        })),
      addBean: (bean) =>
        set((state) => ({
          beans: [{ ...bean, id: makeId("bean") }, ...state.beans],
        })),
      togglePostLike: (id) =>
        set((state) => ({
          socialPosts: state.socialPosts.map((post) =>
            post.id === id
              ? { ...post, likedByMe: !post.likedByMe, likes: post.likedByMe ? post.likes - 1 : post.likes + 1 }
              : post,
          ),
        })),
      addComment: (postId, text) =>
        set((state) => ({
          socialPosts: state.socialPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  comments: [
                    ...post.comments,
                    { id: makeId("comment"), author: state.user?.name ?? "You", text, createdAt: new Date().toISOString() },
                  ],
                }
              : post,
          ),
        })),
      clearLocalData: () => {
        set((state) => ({
          ...emptyBrewData,
          user: state.user,
          hasOnboarded: state.hasOnboarded,
          hasHydrated: state.hasHydrated,
          theme: state.theme,
          openAiApiKey: state.openAiApiKey,
        }));
      },
      setOpenAiApiKey: (key) => set({ openAiApiKey: key }),
    }),
    {
      name: "brewspace-local-storage-v1",
      storage: createJSONStorage(() => AsyncStorage),
      version: 3,
      migrate: (persistedState) => {
        const state = persistedState as Partial<BrewState> | undefined;
        return {
          ...initialState,
          user: isLegacyDemoUser(state?.user) ? null : state?.user ?? null,
          hasOnboarded: state?.hasOnboarded ?? false,
          theme: state?.theme ?? "system",
          openAiApiKey: state?.openAiApiKey ?? null,
        };
      },
      partialize: (state) => ({
        user: state.user,
        hasOnboarded: state.hasOnboarded,
        theme: state.theme,
        coffees: state.coffees,
        cafes: state.cafes,
        bucketList: state.bucketList,
        recipes: state.recipes,
        beans: state.beans,
        socialPosts: state.socialPosts,
        workSessions: state.workSessions,
        openAiApiKey: state.openAiApiKey,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

export const selectCoffees = (state: BrewStore) => state.coffees;
export const selectCafes = (state: BrewStore) => state.cafes;
export const selectBucketList = (state: BrewStore) => state.bucketList;
export const selectRecipes = (state: BrewStore) => state.recipes;
export const selectBeans = (state: BrewStore) => state.beans;
export const selectSocialPosts = (state: BrewStore) => state.socialPosts;
export const selectWorkSessions = (state: BrewStore) => state.workSessions;
