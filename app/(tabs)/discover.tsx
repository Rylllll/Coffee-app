import { Bookmark, MapPin, Navigation } from "lucide-react-native";
import { Image, Platform, Pressable, View } from "react-native";
import { BrewText } from "@/components/ui/BrewText";
import { EmptyState } from "@/components/ui/EmptyState";
import { GlassCard } from "@/components/ui/GlassCard";
import { Pill } from "@/components/ui/Pill";
import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useBrewStore } from "@/src/stores/useBrewStore";
import { useColorScheme } from "nativewind";

// Dynamic require to prevent evaluating react-native-maps on web
const MapView = Platform.OS === 'web' ? null : require('react-native-maps').default;
const { Marker } = Platform.OS === 'web' ? { Marker: null } : require('react-native-maps');

export default function DiscoverScreen() {
  const cafes = useBrewStore((state) => state.cafes);
  const toggleCafeWishlist = useBrewStore((state) => state.toggleCafeWishlist);
  const { colorScheme } = useColorScheme();

  const isDark = colorScheme === "dark";

  return (
    <Screen>
      <View className="gap-2">
        <BrewText variant="caption">Cafe discovery</BrewText>
        <BrewText variant="hero">Find your next cup</BrewText>
      </View>

      <GlassCard contentClassName="p-0">
        <View className="h-72 overflow-hidden rounded-[38px] bg-latte/40 relative">
          {Platform.OS === 'web' || !MapView || !Marker ? (
            <>
              <View className="absolute inset-0 bg-crema dark:bg-mocha" />
              <View className="absolute left-6 top-8 h-32 w-56 rotate-6 rounded-[40px] bg-sage/20" />
              <View className="absolute bottom-8 right-4 h-28 w-48 -rotate-6 rounded-[40px] bg-orange/20" />
              {cafes.map((cafe, index) => (
                <View
                  key={cafe.id}
                  className="absolute items-center"
                  style={{ left: `${18 + index * 28}%`, top: `${28 + (index % 2) * 24}%` }}
                >
                  <View className="h-11 w-11 items-center justify-center rounded-full bg-espresso shadow-sm dark:bg-crema">
                    <MapPin size={20} color="#C96B38" />
                  </View>
                  <BrewText className="mt-1 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold dark:bg-espresso/80">
                    {cafe.name}
                  </BrewText>
                </View>
              ))}
            </>
          ) : (
            <MapView
              style={{ width: "100%", height: "100%" }}
              initialRegion={{
                latitude: cafes.length > 0 && cafes[0].latitude ? cafes[0].latitude : 40.7128,
                longitude: cafes.length > 0 && cafes[0].longitude ? cafes[0].longitude : -74.0060,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              userInterfaceStyle={isDark ? "dark" : "light"}
            >
              {cafes.map((cafe) =>
                cafe.latitude && cafe.longitude ? (
                  <Marker
                    key={cafe.id}
                    coordinate={{ latitude: cafe.latitude, longitude: cafe.longitude }}
                    title={cafe.name}
                    description={cafe.recommendation}
                  >
                    <View className="items-center">
                      <View className="h-11 w-11 items-center justify-center rounded-full bg-espresso shadow-sm dark:bg-crema">
                        <MapPin size={20} color={isDark ? "#210B05" : "#FFF9EF"} />
                      </View>
                      <BrewText className="mt-1 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold dark:bg-espresso/80">
                        {cafe.name}
                      </BrewText>
                    </View>
                  </Marker>
                ) : null
              )}
            </MapView>
          )}
          <View className="absolute bottom-4 left-4 flex-row items-center gap-2 rounded-full bg-white/80 px-4 py-3 dark:bg-espresso/85 pointer-events-none">
            <Navigation size={16} color="#C96B38" />
            <BrewText className="text-sm font-semibold">Nearby cafes</BrewText>
          </View>
        </View>
      </GlassCard>

      <SectionHeader eyebrow="Trending and hidden gems" title="Recommendations" />
      <View className="gap-3">
        {cafes.length > 0 ? (
          cafes.map((cafe) => (
            <GlassCard key={cafe.id} contentClassName="p-3">
              <View className="flex-row gap-3">
                <Image source={{ uri: cafe.photoUri }} className="h-24 w-24 rounded-[28px] bg-latte" />
                <View className="flex-1 gap-2">
                  <View className="flex-row justify-between gap-2">
                    <View className="flex-1">
                      <BrewText variant="subtitle" numberOfLines={1}>
                        {cafe.name}
                      </BrewText>
                      <BrewText className="text-sm">
                        {cafe.neighborhood} - {cafe.distanceKm} km - {cafe.priceLevel}
                      </BrewText>
                    </View>
                    <Pressable onPress={() => toggleCafeWishlist(cafe.id)} className="h-11 w-11 items-center justify-center rounded-full bg-white/70 dark:bg-white/10">
                      <Bookmark size={18} color="#C96B38" fill={cafe.saved ? "#C96B38" : "transparent"} />
                    </Pressable>
                  </View>
                  <View className="flex-row flex-wrap gap-2">
                    {cafe.isTrending ? <Pill label="Trending" selected /> : null}
                    {cafe.isHiddenGem ? <Pill label="Hidden gem" /> : null}
                  </View>
                  <BrewText className="text-sm">{cafe.recommendation}</BrewText>
                </View>
              </View>
            </GlassCard>
          ))
        ) : (
          <EmptyState title="No cafes yet" body="Saved and recommended cafes will appear here when you add them." />
        )}
      </View>
    </Screen>
  );
}
