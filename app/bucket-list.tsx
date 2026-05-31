import { CheckCircle2, Circle } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { BrewText } from "@/components/ui/BrewText";
import { EmptyState } from "@/components/ui/EmptyState";
import { GlassCard } from "@/components/ui/GlassCard";
import { MetricCard } from "@/components/ui/MetricCard";
import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useBrewStore } from "@/src/stores/useBrewStore";

export default function BucketListScreen() {
  const bucketList = useBrewStore((state) => state.bucketList);
  const toggleBucketProgress = useBrewStore(
    (state) => state.toggleBucketProgress,
  );
  const completed = bucketList.filter((item) => item.completed).length;

  return (
    <Screen>
      <View className="gap-2">
        <BrewText variant="caption">Coffee bucket list</BrewText>
        <BrewText variant="hero">Try next</BrewText>
      </View>
      <View className="flex-row gap-3">
        <MetricCard
          label="Progress"
          value={`${completed}/${bucketList.length}`}
          detail="Coffees tried"
        />
        <MetricCard
          label="Next"
          value={bucketList.find((item) => !item.completed)?.name ?? "None yet"}
          detail="Suggested cup"
        />
      </View>
      <SectionHeader eyebrow="Wishlist" title="Coffee goals" />
      <View className="gap-3">
        {bucketList.length > 0 ? (
          bucketList.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => toggleBucketProgress(item.id)}
            >
              <GlassCard>
                <View className="flex-row gap-3">
                  {item.completed ? (
                    <CheckCircle2 size={24} color="#7C9A78" />
                  ) : (
                    <Circle size={24} color="#C96B38" />
                  )}
                  <View className="flex-1 gap-1">
                    <BrewText variant="subtitle">{item.name}</BrewText>
                    <BrewText>{item.note}</BrewText>
                    {item.targetCafe ? (
                      <BrewText className="text-sm">
                        Target: {item.targetCafe}
                      </BrewText>
                    ) : null}
                  </View>
                </View>
              </GlassCard>
            </Pressable>
          ))
        ) : (
          <EmptyState
            title="No bucket list items"
            body="Coffees you want to try will appear here."
          />
        )}
      </View>
    </Screen>
  );
}
