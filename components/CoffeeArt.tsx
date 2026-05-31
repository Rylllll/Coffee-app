import { View } from "react-native";
import { BrewText } from "@/components/ui/BrewText";
import { cn } from "@/src/utils/cn";

interface CoffeeArtProps {
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

export function CoffeeArt({ size = "md", label = "Caramel Cloud", className }: CoffeeArtProps) {
  const cupSize = size === "lg" ? "h-72 w-56" : size === "sm" ? "h-28 w-24" : "h-48 w-40";
  const creamSize = size === "lg" ? "h-28 w-52" : size === "sm" ? "h-12 w-24" : "h-20 w-36";

  return (
    <View className={cn("items-center justify-center", className)}>
      <View className="absolute h-full w-full rounded-full bg-white/30 dark:bg-white/10" />
      <View className={cn("relative overflow-hidden rounded-b-[42px] rounded-t-[72px] border border-white/70 bg-white/45", cupSize)}>
        <View className="absolute inset-x-4 bottom-4 h-1/2 rounded-b-[34px] bg-cocoa" />
        <View className="absolute inset-x-4 bottom-14 h-1/3 bg-caramel/85" />
        <View className="absolute inset-x-4 bottom-24 h-1/4 bg-crema/90" />
        <View className="absolute inset-x-8 bottom-10 h-40 rotate-12 rounded-full bg-white/55" />
        <View className="absolute bottom-0 left-8 h-full w-8 rotate-12 bg-orange/30" />
        <View className="absolute bottom-0 right-10 h-5/6 w-5 -rotate-12 bg-white/35" />
      </View>
      <View className={cn("absolute top-1 rounded-[48px] bg-crema shadow-sm", creamSize)}>
        <View className="absolute left-4 top-4 h-8 w-20 rounded-full bg-white" />
        <View className="absolute right-5 top-2 h-10 w-16 rounded-full bg-white/95" />
        <View className="absolute left-12 top-0 h-10 w-20 rounded-full bg-white" />
        <View className="absolute bottom-3 left-8 h-2 w-20 rounded-full bg-caramel" />
        <View className="absolute bottom-7 right-8 h-2 w-14 -rotate-12 rounded-full bg-orange" />
      </View>
      <View className="mt-4 rounded-full bg-white/70 px-4 py-2 dark:bg-white/10">
        <BrewText className="text-sm font-bold">{label}</BrewText>
      </View>
    </View>
  );
}
