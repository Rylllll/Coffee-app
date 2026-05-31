import { ReactNode } from "react";
import { View } from "react-native";
import { BrewText } from "@/components/ui/BrewText";
import { GlassCard } from "@/components/ui/GlassCard";

interface EmptyStateProps {
  title: string;
  body: string;
  action?: ReactNode;
}

export function EmptyState({ title, body, action }: EmptyStateProps) {
  return (
    <GlassCard className="border-dashed">
      <View className="items-center gap-3 py-3">
        <BrewText variant="subtitle">{title}</BrewText>
        <BrewText className="text-center">{body}</BrewText>
        {action}
      </View>
    </GlassCard>
  );
}
