import * as Sharing from "expo-sharing";
import { Share2 } from "lucide-react-native";
import { useRef } from "react";
import { Pressable, View } from "react-native";
import { captureRef } from "react-native-view-shot";
import { StoryCard } from "@/components/StoryCard";
import { BrewText } from "@/components/ui/BrewText";
import { GlassCard } from "@/components/ui/GlassCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Screen } from "@/components/ui/Screen";
import { useBrewAnalytics } from "@/hooks/useBrewAnalytics";
import { formatCurrency } from "@/src/utils/analytics";

export default function WrappedScreen() {
  const { wrapped } = useBrewAnalytics();
  const storyRef = useRef<View>(null);

  const shareStory = async () => {
    if (!storyRef.current) return;
    const uri = await captureRef(storyRef, { format: "png", quality: 0.92 });
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri);
    }
  };

  return (
    <Screen>
      <View className="gap-2">
        <BrewText variant="caption">Spotify Wrapped for coffee</BrewText>
        <BrewText variant="hero">Coffee Wrapped</BrewText>
      </View>
      <View ref={storyRef} collapsable={false}>
        <StoryCard
          title="Your month in coffee"
          value={`${wrapped.totalCoffees}`}
          detail={`${formatCurrency(wrapped.totalSpending)} spent, led by ${wrapped.favoriteDrink}.`}
        />
      </View>
      <PrimaryButton
        label="Share story card"
        onPress={shareStory}
        icon={<Share2 size={18} color="#FFF9EF" />}
      />
      <GlassCard>
        <View className="gap-3">
          <Row label="Favorite cafe" value={wrapped.favoriteCafe} />
          <Row label="Favorite drink" value={wrapped.favoriteDrink} />
          <Row label="Most active day" value={wrapped.mostActiveDay} />
          <Row label="Coffee streak" value={`${wrapped.coffeeStreak} days`} />
        </View>
      </GlassCard>
    </Screen>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <Pressable className="flex-row items-center justify-between rounded-full bg-white/55 px-4 py-4 dark:bg-white/10">
      <BrewText>{label}</BrewText>
      <BrewText className="font-semibold">{value}</BrewText>
    </Pressable>
  );
}
