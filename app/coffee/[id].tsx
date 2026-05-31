import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, Heart, MapPin, Minus, Plus, Star, Zap } from "lucide-react-native";
import { Image, Pressable, View } from "react-native";
import { CoffeeArt } from "@/components/CoffeeArt";
import { BrewText } from "@/components/ui/BrewText";
import { GlassCard } from "@/components/ui/GlassCard";
import { Pill } from "@/components/ui/Pill";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useBrewStore } from "@/src/stores/useBrewStore";
import { formatCurrency } from "@/src/utils/analytics";
import { cn } from "@/src/utils/cn";

export default function CoffeeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const coffee = useBrewStore((state) => state.coffees.find((entry) => entry.id === id));
  const toggleCoffeeFavorite = useBrewStore((state) => state.toggleCoffeeFavorite);

  if (!coffee) {
    return (
      <Screen>
        <PrimaryBack />
        <GlassCard>
          <BrewText>That coffee memory could not be found.</BrewText>
        </GlassCard>
      </Screen>
    );
  }

  return (
    <Screen>
      <View className="flex-row items-center justify-between">
        <PrimaryBack />
        <BrewText variant="subtitle">{coffee.name}</BrewText>
        <Pressable onPress={() => toggleCoffeeFavorite(coffee.id)} className="h-12 w-12 items-center justify-center rounded-full bg-white/70 dark:bg-white/10">
          <Heart size={20} color="#C96B38" fill={coffee.isFavorite ? "#C96B38" : "transparent"} />
        </Pressable>
      </View>

      <GlassCard contentClassName="items-center gap-4 p-6">
        {coffee.photoUri ? (
          <Image source={{ uri: coffee.photoUri }} className="h-80 w-full rounded-[42px] bg-latte" resizeMode="cover" />
        ) : (
          <CoffeeArt size="lg" label={coffee.type} />
        )}
        <BrewText className="text-center font-bold">Medium memory cup</BrewText>
      </GlassCard>

      <View className="gap-2">
        <BrewText variant="caption">{new Date(coffee.drankAt).toLocaleString()}</BrewText>
        <BrewText variant="hero">{coffee.name}</BrewText>
        <View className="flex-row flex-wrap items-center gap-3">
          <View className="flex-row items-center gap-1 rounded-full bg-white/70 px-3 py-2 dark:bg-white/10">
            <Star size={18} color="#F4B400" fill="#F4B400" />
            <BrewText className="font-bold">{coffee.rating}/10</BrewText>
          </View>
          <BrewText className="rounded-full bg-cocoa px-4 py-2 font-black text-crema">{formatCurrency(coffee.price)}</BrewText>
        </View>
      </View>

      <GlassCard>
        <View className="gap-3">
          <View className="flex-row items-center gap-2">
            <MapPin size={18} color="#7C9A78" />
            <BrewText>{coffee.location || coffee.shopName}</BrewText>
          </View>
          <View className="flex-row items-center gap-2">
            <Zap size={18} color="#C96B38" />
            <BrewText>{coffee.caffeineMg} mg caffeine</BrewText>
          </View>
          <BrewText>{coffee.notes || "No notes added yet."}</BrewText>
        </View>
      </GlassCard>

      <SectionHeader eyebrow="Size" title="Quick controls" />
      <View className="flex-row items-center justify-between">
        <View className="flex-row gap-3">
          {["S", "M", "L"].map((size) => (
            <View key={size} className={cn("h-14 w-14 items-center justify-center rounded-full", size === "M" ? "bg-espresso dark:bg-crema" : "bg-white/70 dark:bg-white/10")}>
              <BrewText className={cn("font-bold", size === "M" && "text-crema dark:text-espresso")}>{size}</BrewText>
            </View>
          ))}
        </View>
        <View className="flex-row items-center gap-4">
          <View className="h-12 w-12 items-center justify-center rounded-full bg-white/70 dark:bg-white/10">
            <Minus size={18} color="#210B05" />
          </View>
          <BrewText variant="title">1</BrewText>
          <View className="h-12 w-12 items-center justify-center rounded-full bg-espresso dark:bg-crema">
            <Plus size={18} color="#FFF9EF" />
          </View>
        </View>
      </View>

      <SectionHeader eyebrow="Mood memory" title={`${coffee.moodBefore} to ${coffee.moodAfter ?? "Unknown"}`} />
      <View className="flex-row flex-wrap gap-2">
        {coffee.tags.length > 0 ? coffee.tags.map((tag) => <Pill key={tag} label={tag} selected />) : <Pill label="No tags yet" />}
      </View>

      {coffee.people?.length ? (
        <GlassCard>
          <BrewText>With {coffee.people.join(", ")}</BrewText>
        </GlassCard>
      ) : null}

      <PrimaryButton label="Back to journal" onPress={() => router.back()} />
    </Screen>
  );
}

function PrimaryBack() {
  return (
    <Pressable onPress={() => router.back()} className="h-12 w-12 items-center justify-center rounded-full bg-white/70 dark:bg-white/10">
      <ArrowLeft size={20} color="#210B05" />
    </Pressable>
  );
}
