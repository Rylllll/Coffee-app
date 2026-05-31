import { View } from "react-native";
import { BrewText } from "@/components/ui/BrewText";
import { GlassCard } from "@/components/ui/GlassCard";

interface MetricCardProps {
  label: string;
  value: string;
  detail?: string;
}

export function MetricCard({ label, value, detail }: MetricCardProps) {
  return (
    <GlassCard className="flex-1 rounded-[28px]" contentClassName="p-4">
      <View className="gap-2">
        <BrewText variant="caption">{label}</BrewText>
        <BrewText variant="metric">{value}</BrewText>
        {detail ? <BrewText className="text-sm">{detail}</BrewText> : null}
      </View>
    </GlassCard>
  );
}
