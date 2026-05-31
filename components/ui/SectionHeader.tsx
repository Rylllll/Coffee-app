import { ReactNode } from "react";
import { View } from "react-native";
import { BrewText } from "@/components/ui/BrewText";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
}

export function SectionHeader({ eyebrow, title, action }: SectionHeaderProps) {
  return (
    <View className="mt-1 flex-row items-end justify-between gap-4 px-1">
      <View className="flex-1">
        {eyebrow ? <BrewText variant="caption">{eyebrow}</BrewText> : null}
        <BrewText variant="subtitle">{title}</BrewText>
      </View>
      {action}
    </View>
  );
}
