import { Bot, Coffee, MapPin, Sparkles } from "lucide-react-native";
import { View } from "react-native";
import { BrewText } from "@/components/ui/BrewText";
import { GlassCard } from "@/components/ui/GlassCard";
import { Pill } from "@/components/ui/Pill";
import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useBrewAnalytics } from "@/hooks/useBrewAnalytics";
import { useBrewStore } from "@/src/stores/useBrewStore";

export default function AssistantScreen() {
  const cafes = useBrewStore((state) => state.cafes);
  const beans = useBrewStore((state) => state.beans);
  const recipes = useBrewStore((state) => state.recipes);
  const { dna, caffeine } = useBrewAnalytics();
  const savedCafe = cafes.find((cafe) => cafe.saved) ?? cafes[0];
  const bean = beans[0];
  const recipe = recipes[0];
  const hasTasteData = dna.favoriteType !== "Unknown" || dna.favoriteRoast !== "Unknown";

  return (
    <Screen>
      <View className="gap-2">
        <BrewText variant="caption">AI Coffee Assistant</BrewText>
        <BrewText variant="hero">Local recommendations</BrewText>
        <BrewText>
          This build uses deterministic on-device rules. Recommendations use only the coffee, cafe, recipe, and bean data stored on this device.
        </BrewText>
      </View>

      <GlassCard>
        <View className="gap-3">
          <View className="flex-row items-center gap-3">
            <Bot size={24} color="#C96B38" />
            <BrewText variant="subtitle">Habit read</BrewText>
          </View>
          <BrewText>
            {hasTasteData
              ? `You seem to enjoy ${dna.favoriteRoast.toString().toLowerCase()} roast, ${dna.favoriteType.toString().toLowerCase()} style coffees.`
              : "Log coffees to unlock personalized taste and habit recommendations."}
          </BrewText>
          <BrewText>{caffeine.sleepImpact}</BrewText>
        </View>
      </GlassCard>

      <SectionHeader eyebrow="Recommendations" title="Try next" />
      <GlassCard>
        <View className="gap-3">
          <View className="flex-row gap-3">
            <Coffee size={22} color="#C96B38" />
            <View className="flex-1">
              <BrewText className="font-semibold">Drink</BrewText>
              <BrewText>
                {hasTasteData ? `Try another ${dna.favoriteType} and compare your rating.` : "Log coffee ratings to unlock drink suggestions."}
              </BrewText>
            </View>
          </View>
          <View className="flex-row gap-3">
            <MapPin size={22} color="#7C9A78" />
            <View className="flex-1">
              <BrewText className="font-semibold">Cafe</BrewText>
              <BrewText>{savedCafe ? `${savedCafe.name}: ${savedCafe.recommendation}` : "Save cafes to improve suggestions."}</BrewText>
            </View>
          </View>
          <View className="flex-row gap-3">
            <Sparkles size={22} color="#C96B38" />
            <View className="flex-1">
              <BrewText className="font-semibold">Recipe</BrewText>
              <BrewText>{recipe ? `${recipe.name}: ${recipe.ratio}, ${recipe.brewTimeSeconds}s.` : "Create a recipe to unlock brew suggestions."}</BrewText>
            </View>
          </View>
        </View>
      </GlassCard>

      <SectionHeader eyebrow="Collection match" title="Bean suggestion" />
      <GlassCard>
        <View className="gap-3">
          <BrewText variant="subtitle">{bean?.name ?? "No bean match yet"}</BrewText>
          <BrewText>
            {bean
              ? `Use your ${bean.roaster || "saved"} bag for your next recipe. Its ${bean.flavorNotes.join(", ") || "saved"} notes should fit your Coffee DNA.`
              : "Add beans to the collection to get origin-aware recommendations."}
          </BrewText>
          {bean ? (
            <View className="flex-row flex-wrap gap-2">
              {bean.flavorNotes.map((note) => (
                <Pill key={note} label={note} selected />
              ))}
            </View>
          ) : null}
        </View>
      </GlassCard>
    </Screen>
  );
}
