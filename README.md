# BrewSpace

BrewSpace is a local-first Expo mobile app for coffee tracking, discovery, recipes, social coffee cards, caffeine intelligence, and coffee lifestyle insights.

## Stack

- React Native + Expo SDK 56
- TypeScript
- Expo Router
- NativeWind / Tailwind CSS
- Zustand with `@react-native-async-storage/async-storage`
- React Query
- Victory Native charts
- React Native Reanimated and Gesture Handler
- Expo Blur, Linear Gradient, Image Picker, Notifications, Sharing, View Shot

## Local Storage Policy

The current build stores all app data on the device through AsyncStorage-backed Zustand persistence:

- Local profile and auth state
- Coffee logs and memories
- Caffeine, spending, Coffee DNA, and Wrapped inputs
- Cafe wishlist and bucket list
- Recipes and bean collection
- Social feed interactions
- Theme and settings

Firebase is intentionally not wired in because the requested storage target is local storage. The store is isolated in `src/stores/useBrewStore.ts`, so a future sync adapter can be added without changing most screens.

## Project Structure

```text
app/
  (auth)/login.tsx
  (onboarding)/index.tsx
  (tabs)/
  add-coffee.tsx
  assistant.tsx
  bucket-list.tsx
  coffee/[id].tsx
  collection.tsx
  settings.tsx
  social.tsx
  stats.tsx
  wrapped.tsx
components/
  ui/
  CoffeeCard.tsx
  MoodSelector.tsx
  StoryCard.tsx
constants/
  coffee.ts
hooks/
  useBrewAnalytics.ts
src/
  stores/useBrewStore.ts
  types/brew.ts
  utils/
```

## Run Locally

```bash
npm install
npm run start
```

Then open the app with Expo Go or a simulator. For web preview:

```bash
npm run web
```

## Useful Commands

```bash
npm run typecheck
npx expo start --clear
```

## Data Policy

BrewSpace starts with empty local state. Settings includes a clear action for removing local records.

## Notes

- The AI Coffee Assistant is a local deterministic assistant that analyzes stored BrewSpace data.
- The discovery map is a local preview suitable for Expo Go without requiring native map credentials.
- Push notifications are local reminders, not remote push notifications.
