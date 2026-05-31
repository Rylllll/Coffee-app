import { Text, type TextProps } from "react-native";
import { cn } from "@/src/utils/cn";

type BrewTextVariant = "hero" | "title" | "subtitle" | "body" | "caption" | "metric";

const variants: Record<BrewTextVariant, string> = {
  hero: "text-[38px] font-black leading-[44px] tracking-[-1.5px] text-espresso dark:text-crema",
  title: "text-[28px] font-black leading-[34px] tracking-[-1px] text-espresso dark:text-crema",
  subtitle: "text-lg font-bold tracking-[-0.3px] text-espresso dark:text-crema",
  body: "text-base leading-6 text-mocha/85 dark:text-latte/90",
  caption: "text-xs font-semibold uppercase tracking-[1.6px] text-mocha/55 dark:text-crema/55",
  metric: "text-[32px] font-black tracking-[-1px] text-espresso dark:text-crema",
};

interface BrewTextProps extends TextProps {
  variant?: BrewTextVariant;
}

export function BrewText({ variant = "body", className, ...props }: BrewTextProps) {
  return <Text className={cn(variants[variant], className)} {...props} />;
}
