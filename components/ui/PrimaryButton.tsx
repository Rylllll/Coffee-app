import * as Haptics from "expo-haptics";
import { ReactNode } from "react";
import { Pressable, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { cn } from "@/src/utils/cn";
import { BrewText } from "@/components/ui/BrewText";

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  icon?: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  className?: string;
}

export function PrimaryButton({ label, onPress, icon, variant = "primary", disabled, className }: PrimaryButtonProps) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    if (disabled) return;
    Haptics.selectionAsync().catch(() => undefined);
    onPress();
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        accessibilityRole="button"
        disabled={disabled}
        onPress={handlePress}
        onPressIn={() => {
          scale.value = withSpring(0.97, { damping: 18, stiffness: 320 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 18, stiffness: 320 });
        }}
        className={cn(
          "min-h-14 flex-row items-center justify-center gap-2 rounded-full px-6",
          variant === "primary" && "bg-espresso dark:bg-crema",
          variant === "secondary" && "border border-white/70 bg-white/75 dark:border-white/10 dark:bg-white/10",
          variant === "ghost" && "bg-white/0",
          disabled && "opacity-50",
          className,
        )}
      >
        {icon ? <View>{icon}</View> : null}
        <BrewText
          className={cn(
            "font-bold",
            variant === "primary" && "text-crema dark:text-espresso",
            variant !== "primary" && "text-espresso dark:text-crema",
          )}
        >
          {label}
        </BrewText>
      </Pressable>
    </Animated.View>
  );
}
