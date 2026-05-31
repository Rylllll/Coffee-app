import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { View } from "react-native";
import { BrewText } from "@/components/ui/BrewText";

interface StoryCardProps {
  title: string;
  value: string;
  detail: string;
  children?: ReactNode;
}

export function StoryCard({ title, value, detail, children }: StoryCardProps) {
  return (
    <View className="h-[500px] overflow-hidden rounded-[42px] bg-espresso">
      <LinearGradient colors={["#210B05", "#5C3A2A", "#C96B38", "#F4E5D7"]} className="absolute inset-0" />
      <View className="absolute -right-14 top-10 h-44 w-44 rounded-full bg-white/20" />
      <View className="absolute bottom-24 left-8 h-28 w-28 rounded-full bg-orange/25" />
      <View className="flex-1 justify-between p-6">
        <View>
          <BrewText variant="caption" className="text-crema/70">
            BrewSpace Wrapped
          </BrewText>
          <BrewText variant="title" className="mt-2 max-w-[260px] text-crema">
            {title}
          </BrewText>
        </View>
        <View className="gap-4">
          <BrewText className="text-7xl font-black tracking-[-3px] text-crema">{value}</BrewText>
          <BrewText className="text-lg text-crema/85">{detail}</BrewText>
          {children}
        </View>
      </View>
    </View>
  );
}
