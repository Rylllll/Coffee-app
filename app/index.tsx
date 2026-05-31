import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { BrewText } from "@/components/ui/BrewText";
import { useBrewStore } from "@/src/stores/useBrewStore";

export default function IndexRoute() {
  const hasHydrated = useBrewStore((state) => state.hasHydrated);
  const hasOnboarded = useBrewStore((state) => state.hasOnboarded);
  const user = useBrewStore((state) => state.user);

  if (!hasHydrated) {
    return (
      <View className="flex-1 items-center justify-center bg-espresso">
        <ActivityIndicator color="#C96B38" />
        <BrewText className="mt-3 text-crema">Preparing your coffee shelf...</BrewText>
      </View>
    );
  }

  if (!hasOnboarded) return <Redirect href="/(onboarding)" />;
  if (!user) return <Redirect href="/(auth)/login" />;

  return <Redirect href="/(tabs)" />;
}
