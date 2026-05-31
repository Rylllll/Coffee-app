import { useMemo, useState } from "react";
import { View } from "react-native";
import { CoffeeCard } from "@/components/CoffeeCard";
import { BrewText } from "@/components/ui/BrewText";
import { EmptyState } from "@/components/ui/EmptyState";
import { Pill } from "@/components/ui/Pill";
import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useBrewStore } from "@/src/stores/useBrewStore";

const filters = ["All", "Cafe", "Homemade", "Favorites"] as const;

export default function HistoryScreen() {
  const coffees = useBrewStore((state) => state.coffees);
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const visible = useMemo(() => {
    if (filter === "Cafe") return coffees.filter((entry) => entry.source === "Cafe");
    if (filter === "Homemade") return coffees.filter((entry) => entry.source === "Homemade");
    if (filter === "Favorites") return coffees.filter((entry) => entry.isFavorite);
    return coffees;
  }, [coffees, filter]);

  return (
    <Screen>
      <View className="gap-2">
        <BrewText variant="caption">Coffee memory journal</BrewText>
        <BrewText variant="hero">History</BrewText>
      </View>
      <View className="flex-row flex-wrap gap-2">
        {filters.map((item) => (
          <Pill key={item} label={item} selected={filter === item} onPress={() => setFilter(item)} />
        ))}
      </View>
      <SectionHeader eyebrow={`${visible.length} memories`} title="Your logged coffees" />
      <View className="gap-3">
        {visible.length > 0 ? (
          visible.map((coffee) => <CoffeeCard key={coffee.id} coffee={coffee} />)
        ) : (
          <EmptyState title="No coffees here yet" body="Try another filter or log a new coffee memory." />
        )}
      </View>
    </Screen>
  );
}
