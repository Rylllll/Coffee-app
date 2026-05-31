import { router } from "expo-router";
import { ArrowRight, BarChart3, Coffee, Sparkles } from "lucide-react-native";
import { View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { CoffeeArt } from "@/components/CoffeeArt";
import { BrewText } from "@/components/ui/BrewText";
import { GlassCard } from "@/components/ui/GlassCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Screen } from "@/components/ui/Screen";
import { useBrewStore } from "@/src/stores/useBrewStore";

const panels = [
  { title: "Mood", icon: Sparkles },
  { title: "Stats", icon: BarChart3 },
  { title: "Log", icon: Coffee },
];

export default function OnboardingScreen() {
  const completeOnboarding = useBrewStore((state) => state.completeOnboarding);

  const handleContinue = () => {
    completeOnboarding();
    router.replace("/(auth)/login");
  };

  return (
    <Screen contentClassName="min-h-full justify-between">
      <View className="gap-8 pt-4">
        <Animated.View entering={FadeInDown.duration(450)}>
          <GlassCard className="h-[560px] justify-between bg-cocoa/90" contentClassName="flex-1 justify-between p-7">
            <View className="gap-5">
              <View className="flex-row items-center gap-3">
                <View className="rounded-full bg-white px-5 py-3">
                  <BrewText variant="title" className="text-cocoa">
                    Brew
                  </BrewText>
                </View>
                <BrewText variant="title" className="text-crema">
                  Space
                </BrewText>
              </View>
              <BrewText variant="hero" className="text-center text-crema">
                Your coffee journey starts here
              </BrewText>
            </View>

            <View className="items-center">
              <CoffeeArt size="lg" label="Premium" />
            </View>

            <View className="flex-row justify-between">
              {panels.map((panel) => {
                const Icon = panel.icon;
                return (
                  <View key={panel.title} className="items-center gap-2 rounded-full bg-white/12 px-4 py-3">
                    <Icon size={18} color="#FFF9EF" />
                    <BrewText className="text-sm font-bold text-crema">{panel.title}</BrewText>
                  </View>
                );
              })}
            </View>
          </GlassCard>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(120)} className="gap-3">
          <BrewText variant="caption" className="text-center">
            Cafeor x Letterboxd x Wrapped
          </BrewText>
          <BrewText className="text-center text-lg">
            Track cups, build a coffee DNA, collect recipes, and turn your month into shareable story cards.
          </BrewText>
        </Animated.View>
      </View>

      <PrimaryButton label="Get started" onPress={handleContinue} icon={<ArrowRight size={18} color="#FFF9EF" />} />
    </Screen>
  );
}
