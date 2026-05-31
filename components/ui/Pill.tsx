import { Pressable } from "react-native";
import { cn } from "@/src/utils/cn";
import { BrewText } from "@/components/ui/BrewText";

interface PillProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

export function Pill({ label, selected, onPress }: PillProps) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        "min-h-12 rounded-full border px-4 py-3",
        selected
          ? "border-espresso bg-espresso dark:border-crema dark:bg-crema"
          : "border-white/70 bg-white/60 dark:border-white/10 dark:bg-white/10",
      )}
    >
      <BrewText className={cn("text-sm font-bold", selected && "text-crema dark:text-espresso")}>{label}</BrewText>
    </Pressable>
  );
}
