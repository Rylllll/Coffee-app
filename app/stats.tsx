import { Platform, View } from "react-native";
import { Bar, CartesianChart, Line } from "victory-native";
import { BrewText } from "@/components/ui/BrewText";
import { GlassCard } from "@/components/ui/GlassCard";
import { MetricCard } from "@/components/ui/MetricCard";
import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useBrewAnalytics } from "@/hooks/useBrewAnalytics";
import { useBrewStore } from "@/src/stores/useBrewStore";
import { formatCurrency } from "@/src/utils/analytics";

export default function StatsScreen() {
  const coffees = useBrewStore((state) => state.coffees);
  const { caffeine, spending } = useBrewAnalytics();
  const chartData = coffees.slice(0, 7).reverse().map((entry, index) => ({
    day: index + 1,
    caffeine: entry.caffeineMg,
  }));
  const ratingData = coffees.slice(0, 7).reverse().map((entry, index) => ({
    day: index + 1,
    rating: entry.rating,
  }));
  const hasCaffeineData = chartData.length > 0;
  const hasRatingData = ratingData.length > 0;
  const useNativeCharts = Platform.OS !== "web";

  return (
    <Screen>
      <View className="gap-2">
        <BrewText variant="caption">Statistics</BrewText>
        <BrewText variant="hero">Coffee intelligence</BrewText>
      </View>
      <View className="flex-row gap-3">
        <MetricCard label="Daily" value={`${caffeine.todayMg}mg`} />
        <MetricCard label="Weekly" value={`${caffeine.weekMg}mg`} />
      </View>
      <View className="flex-row gap-3">
        <MetricCard label="Monthly caffeine" value={`${caffeine.monthMg}mg`} />
        <MetricCard label="Monthly spend" value={formatCurrency(spending.monthly)} />
      </View>

      <SectionHeader eyebrow="Chart" title="Recent caffeine" />
      <GlassCard>
        <View className="h-64">
          {hasCaffeineData ? (
            useNativeCharts ? (
              <CartesianChart data={chartData} xKey="day" yKeys={["caffeine"]} domainPadding={{ left: 24, right: 24, top: 16 }}>
                {({ points, chartBounds }) =>
                  points.caffeine ? (
                    <Bar points={points.caffeine} chartBounds={chartBounds} color="#C96B38" roundedCorners={{ topLeft: 12, topRight: 12 }} />
                  ) : null
                }
              </CartesianChart>
            ) : (
              <CaffeineFallbackChart data={chartData} />
            )
          ) : (
            <View className="flex-1 items-center justify-center px-6">
              <BrewText variant="body" className="text-center text-espresso-500">
                Log your first coffee to unlock caffeine charts.
              </BrewText>
            </View>
          )}
        </View>
      </GlassCard>

      <SectionHeader eyebrow="Taste" title="Recent ratings" />
      <GlassCard>
        <View className="h-60">
          {hasRatingData ? (
            useNativeCharts ? (
              <CartesianChart data={ratingData} xKey="day" yKeys={["rating"]} domain={{ y: [0, 10] }} domainPadding={{ left: 16, right: 16 }}>
                {({ points }) => (points.rating ? <Line points={points.rating} color="#7C9A78" strokeWidth={4} curveType="natural" /> : null)}
              </CartesianChart>
            ) : (
              <RatingFallbackChart data={ratingData} />
            )
          ) : (
            <View className="flex-1 items-center justify-center px-6">
              <BrewText variant="body" className="text-center text-espresso-500">
                Add rated coffees to see your taste trends.
              </BrewText>
            </View>
          )}
        </View>
      </GlassCard>
    </Screen>
  );
}

type CaffeineDatum = {
  day: number;
  caffeine: number;
};

type RatingDatum = {
  day: number;
  rating: number;
};

function CaffeineFallbackChart({ data }: { data: CaffeineDatum[] }) {
  const maxCaffeine = Math.max(...data.map((item) => item.caffeine), 1);

  return (
    <View className="flex-1 flex-row items-end gap-2 px-1 pb-3">
      {data.map((item) => (
        <View key={item.day} className="flex-1 items-center gap-2">
          <View
            className="w-full rounded-t-[18px] bg-orange/85"
            style={{
              height: Math.max(14, (item.caffeine / maxCaffeine) * 180),
            }}
          />
          <BrewText variant="caption" className="text-espresso-500">
            {item.day}
          </BrewText>
        </View>
      ))}
    </View>
  );
}

function RatingFallbackChart({ data }: { data: RatingDatum[] }) {
  return (
    <View className="flex-1 justify-end gap-3 py-4">
      {data.map((item) => (
        <View key={item.day} className="flex-row items-center gap-3">
          <BrewText variant="caption" className="w-7 text-espresso-500">
            D{item.day}
          </BrewText>
          <View className="h-3 flex-1 overflow-hidden rounded-full bg-white/70">
            <View
              className="h-3 rounded-full bg-sage"
              style={{
                width: `${Math.max(8, (item.rating / 10) * 100)}%`,
              }}
            />
          </View>
          <BrewText variant="caption" className="w-9 text-right text-espresso">
            {item.rating.toFixed(1)}
          </BrewText>
        </View>
      ))}
    </View>
  );
}
