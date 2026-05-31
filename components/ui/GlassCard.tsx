import { BlurView } from "expo-blur";
import { ReactNode } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { useColorScheme } from "nativewind";
import { cn } from "@/src/utils/cn";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export function GlassCard({
  children,
  className,
  contentClassName,
}: GlassCardProps) {
  const { colorScheme } = useColorScheme();

  return (
    <View
      className={cn(
        "overflow-hidden rounded-[34px] border border-white/70 bg-white/68 shadow-sm dark:border-white/10 dark:bg-white/10",
        className,
      )}
      style={Platform.select({
        ios: {
          shadowColor: "#210B05",
          shadowOffset: { width: 0, height: 18 },
          shadowOpacity: 0.1,
          shadowRadius: 28,
        },
        android: { elevation: 2 },
        web: { boxShadow: "0 22px 60px rgba(33, 11, 5, 0.10)" } as never,
      })}
    >
      <BlurView
        intensity={38}
        tint={colorScheme === "dark" ? "dark" : "light"}
        style={StyleSheet.absoluteFill}
      />
      <View className="absolute inset-x-0 top-0 h-px bg-white/90 dark:bg-white/20" />
      <View className={cn("p-5", contentClassName)}>{children}</View>
    </View>
  );
}
