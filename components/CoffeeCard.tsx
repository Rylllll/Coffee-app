import { Link } from "expo-router";
import { Heart, MapPin, Star } from "lucide-react-native";
import { Image, Pressable, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { BrewText } from "@/components/ui/BrewText";
import { GlassCard } from "@/components/ui/GlassCard";
import type { CoffeeEntry } from "@/src/types/brew";
import { formatCurrency } from "@/src/utils/analytics";

interface CoffeeCardProps {
  coffee: CoffeeEntry;
}

export function CoffeeCard({ coffee }: CoffeeCardProps) {
  return (
    <Link
      href={{ pathname: "/coffee/[id]", params: { id: coffee.id } }}
      asChild
    >
      <Pressable>
        <Animated.View entering={FadeInDown.duration(300)}>
          <GlassCard className="rounded-[32px]" contentClassName="p-3">
            <View className="flex-row gap-3">
              <View className="overflow-hidden rounded-[28px] bg-latte">
                {coffee.photoUri ? (
                  <Image
                    source={{ uri: coffee.photoUri }}
                    className="h-28 w-28"
                  />
                ) : (
                  <View className="h-28 w-28 items-center justify-center bg-almond">
                    <BrewText className="text-3xl">☕</BrewText>
                  </View>
                )}
              </View>
              <View className="flex-1 gap-2">
                <View className="flex-row justify-between gap-3">
                  <View className="flex-1">
                    <BrewText variant="subtitle" numberOfLines={1}>
                      {coffee.name}
                    </BrewText>
                    <BrewText className="text-sm" numberOfLines={1}>
                      {coffee.type} at {coffee.shopName}
                    </BrewText>
                  </View>
                  {coffee.isFavorite ? (
                    <Heart size={18} color="#C96B38" fill="#C96B38" />
                  ) : null}
                </View>
                <View className="flex-row flex-wrap gap-2">
                  <View className="flex-row items-center gap-1 rounded-full bg-white/70 px-2 py-1 dark:bg-white/10">
                    <Star size={14} color="#C96B38" fill="#C96B38" />
                    <BrewText className="text-sm font-semibold">
                      {coffee.rating}/10
                    </BrewText>
                  </View>
                  <View className="flex-row items-center gap-1 rounded-full bg-white/70 px-2 py-1 dark:bg-white/10">
                    <MapPin size={14} color="#7C9A78" />
                    <BrewText className="text-sm">{coffee.source}</BrewText>
                  </View>
                  <BrewText className="rounded-full bg-cocoa px-2 py-1 text-sm font-bold text-crema">
                    {formatCurrency(coffee.price)}
                  </BrewText>
                </View>
                <BrewText className="text-sm" numberOfLines={2}>
                  {coffee.notes}
                </BrewText>
              </View>
            </View>
          </GlassCard>
        </Animated.View>
      </Pressable>
    </Link>
  );
}
