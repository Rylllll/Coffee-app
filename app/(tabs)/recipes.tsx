import { Plus } from "lucide-react-native";
import { useState } from "react";
import { TextInput, View } from "react-native";
import { brewMethods } from "@/constants/coffee";
import { BrewText } from "@/components/ui/BrewText";
import { EmptyState } from "@/components/ui/EmptyState";
import { GlassCard } from "@/components/ui/GlassCard";
import { Pill } from "@/components/ui/Pill";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useBrewStore } from "@/src/stores/useBrewStore";
import type { BrewMethod } from "@/src/types/brew";

export default function RecipesScreen() {
  const recipes = useBrewStore((state) => state.recipes);
  const addRecipe = useBrewStore((state) => state.addRecipe);
  const [name, setName] = useState("");
  const [method, setMethod] = useState<BrewMethod>("V60");
  const [beans, setBeans] = useState("");

  const saveRecipe = () => {
    addRecipe({
      name: name.trim() || `${method} recipe`,
      beans: beans.trim(),
      method,
      grindSize: method === "Espresso" ? "Fine" : "Medium-fine",
      waterTemperatureC: method === "French Press" ? 92 : 94,
      brewTimeSeconds: method === "Espresso" ? 28 : 180,
      ratio: method === "Espresso" ? "1:2" : "1:16",
      notes: "Created from the quick BrewSpace recipe composer.",
    });
    setName("");
    setBeans("");
  };

  return (
    <Screen>
      <View className="gap-2">
        <BrewText variant="caption">Brew lab</BrewText>
        <BrewText variant="hero">Recipes</BrewText>
      </View>

      <GlassCard>
        <View className="gap-4">
          <SectionHeader eyebrow="Create" title="Quick brew recipe" />
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Recipe name"
            placeholderTextColor="#8F7868"
            className="min-h-14 rounded-full border border-white/70 bg-white/75 px-5 text-base text-espresso dark:border-white/10 dark:bg-white/10 dark:text-crema"
          />
          <TextInput
            value={beans}
            onChangeText={setBeans}
            placeholder="Coffee beans"
            placeholderTextColor="#8F7868"
            className="min-h-14 rounded-full border border-white/70 bg-white/75 px-5 text-base text-espresso dark:border-white/10 dark:bg-white/10 dark:text-crema"
          />
          <View className="flex-row flex-wrap gap-2">
            {brewMethods.map((item) => (
              <Pill key={item} label={item} selected={method === item} onPress={() => setMethod(item)} />
            ))}
          </View>
          <PrimaryButton label="Save recipe" onPress={saveRecipe} icon={<Plus size={18} color="#FFF9EF" />} />
        </View>
      </GlassCard>

      <SectionHeader eyebrow={`${recipes.length} recipes`} title="Saved brews" />
      <View className="gap-3">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <GlassCard key={recipe.id}>
              <View className="gap-3">
                <View>
                  <BrewText variant="subtitle">{recipe.name}</BrewText>
                  <BrewText>
                    {recipe.method} - {recipe.beans || "No beans assigned"}
                  </BrewText>
                </View>
                <View className="flex-row flex-wrap gap-2">
                  <Pill label={recipe.grindSize} />
                  <Pill label={`${recipe.waterTemperatureC}C`} />
                  <Pill label={`${recipe.brewTimeSeconds}s`} />
                  <Pill label={recipe.ratio} selected />
                </View>
                <BrewText>{recipe.notes}</BrewText>
              </View>
            </GlassCard>
          ))
        ) : (
          <EmptyState title="No recipes yet" body="Create your first brew recipe to start building your library." />
        )}
      </View>
    </Screen>
  );
}
