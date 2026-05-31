import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import { cn } from "@/src/utils/cn";

interface ScreenProps {
  children: ReactNode;
  scroll?: boolean;
  className?: string;
  contentClassName?: string;
}

export function Screen({
  children,
  scroll = true,
  className,
  contentClassName,
}: ScreenProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const colors = isDark
    ? (["#170805", "#2B120C", "#120705"] as const)
    : (["#FFF9EF", "#F4E5D7", "#DFC8B4"] as const);
  const content = (
    <View
      className={cn(
        "w-full max-w-[460px] self-center gap-5 px-5 pb-28 pt-2",
        contentClassName,
      )}
    >
      {children}
    </View>
  );

  return (
    <SafeAreaView
      className={cn(
        "flex-1 bg-mist dark:bg-espresso",
        isDark && "dark",
        className,
      )}
    >
      <LinearGradient colors={colors} style={StyleSheet.absoluteFill} />
      <View className="absolute -right-24 top-8 h-72 w-72 rounded-full bg-white/35 dark:bg-white/5" />
      <View className="absolute -left-20 top-56 h-64 w-64 rounded-full bg-orange/15 dark:bg-orange/10" />
      <View className="absolute bottom-8 right-4 h-44 w-44 rounded-full bg-latte/25 dark:bg-caramel/10" />
      {scroll ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 8 }}
        >
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}
