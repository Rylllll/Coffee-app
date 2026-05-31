import { View } from "react-native";
import { BrewText } from "@/components/ui/BrewText";
import { cn } from "@/src/utils/cn";

interface StatBarProps {
  label: string;
  value: number;
  max: number;
  tone?: "orange" | "sage" | "mocha";
}

export function StatBar({ label, value, max, tone = "orange" }: StatBarProps) {
  const width =
    `${Math.min(100, Math.round((value / Math.max(1, max)) * 100))}%` as `${number}%`;
  const colorClass =
    tone === "sage" ? "bg-sage" : tone === "mocha" ? "bg-mocha" : "bg-orange";

  return (
    <View className="gap-2">
      <View className="flex-row justify-between">
        <BrewText className="text-sm font-semibold">{label}</BrewText>
        <BrewText className="text-sm">{value}</BrewText>
      </View>
      <View className="h-3 overflow-hidden rounded-full bg-white/70 dark:bg-white/10">
        <View
          className={cn("h-full rounded-full", colorClass)}
          style={{ width }}
        />
      </View>
    </View>
  );
}
