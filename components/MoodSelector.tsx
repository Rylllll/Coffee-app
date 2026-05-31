import { View } from "react-native";
import { moods } from "@/constants/coffee";
import { Pill } from "@/components/ui/Pill";
import type { Mood } from "@/src/types/brew";

interface MoodSelectorProps {
  value: Mood;
  onChange: (mood: Mood) => void;
}

export function MoodSelector({ value, onChange }: MoodSelectorProps) {
  return (
    <View className="flex-row flex-wrap gap-2">
      {moods.map((mood) => (
        <Pill
          key={mood}
          label={mood}
          selected={value === mood}
          onPress={() => onChange(mood)}
        />
      ))}
    </View>
  );
}
