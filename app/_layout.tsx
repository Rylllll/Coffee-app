import "react-native-gesture-handler";
import "../global.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useBrewStore } from "@/src/stores/useBrewStore";

const queryClient = new QueryClient();

function ThemeBridge() {
  const theme = useBrewStore((state) => state.theme);
  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    setColorScheme(theme);
  }, [setColorScheme, theme]);

  return null;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <ThemeBridge />
        <StatusBar style="auto" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#210B05" },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(onboarding)" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="add-coffee" options={{ presentation: "modal" }} />
          <Stack.Screen name="coffee/[id]" />
          <Stack.Screen name="assistant" />
          <Stack.Screen name="bucket-list" />
          <Stack.Screen name="collection" />
          <Stack.Screen name="settings" />
          <Stack.Screen name="social" />
          <Stack.Screen name="stats" />
          <Stack.Screen name="wrapped" />
        </Stack>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
