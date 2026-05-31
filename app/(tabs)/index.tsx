import { Link } from "expo-router";
import {
  Bell,
  BookOpen,
  CalendarDays,
  Coffee,
  Compass,
  Plus,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react-native";
import { Pressable, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { CoffeeArt } from "@/components/CoffeeArt";
import { CoffeeCard } from "@/components/CoffeeCard";
import { BrewText } from "@/components/ui/BrewText";
import { EmptyState } from "@/components/ui/EmptyState";
import { GlassCard } from "@/components/ui/GlassCard";
import { MetricCard } from "@/components/ui/MetricCard";
import { Pill } from "@/components/ui/Pill";
import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatBar } from "@/components/ui/StatBar";
import { useBrewAnalytics } from "@/hooks/useBrewAnalytics";
import { useBrewStore } from "@/src/stores/useBrewStore";
import { formatCurrency } from "@/src/utils/analytics";
import { cn } from "@/src/utils/cn";

const categoryLinks = [
  { label: "Coffee", href: "/add-coffee", icon: Coffee },
  { label: "Recipes", href: "/(tabs)/recipes", icon: BookOpen },
  { label: "Cafes", href: "/(tabs)/discover", icon: Compass },
] as const;

export default function HomeScreen() {
  const user = useBrewStore((state) => state.user);
  const coffees = useBrewStore((state) => state.coffees);
  const { caffeine, dna, spending, productivity } = useBrewAnalytics();
  const recent = coffees.slice(0, 3);

  return (
    <Screen>
      {/* Main Container with generous spacing for a modern, uncluttered feel */}
      <View className="gap-7 pb-24 pt-2">
        {/* HEADER */}
        <Animated.View
          entering={FadeInDown.duration(400).springify()}
          className="flex-row items-center justify-between"
        >
          <View className="flex-row items-center gap-3 rounded-full bg-white/80 p-2 pr-6 shadow-sm dark:bg-white/10">
            <View className="h-12 w-12 items-center justify-center rounded-full bg-espresso dark:bg-crema">
              <BrewText className="font-black text-crema dark:text-espresso">
                {user?.name?.charAt(0)?.toUpperCase() ?? "B"}
              </BrewText>
            </View>
            <View className="justify-center">
              <BrewText className="text-xs font-medium text-mocha/60 dark:text-crema/60">
                Good Morning,
              </BrewText>
              <BrewText className="text-base font-bold tracking-tight">
                {user?.name || "BrewSpace Guest"}
              </BrewText>
            </View>
          </View>
          <Pressable className="h-14 w-14 items-center justify-center rounded-full bg-white/80 shadow-sm active:scale-95 dark:bg-white/10">
            <Search size={22} color="#210B05" strokeWidth={2.5} />
          </Pressable>
        </Animated.View>

        {/* HERO CARD */}
        <Animated.View
          entering={FadeInDown.delay(100).duration(400).springify()}
        >
          <GlassCard className="overflow-hidden" contentClassName="p-0">
            <View className="min-h-[280px] p-7">
              <View className="max-w-[240px] gap-2">
                <View className="self-start rounded-full bg-orange/20 px-3 py-1">
                  <BrewText
                    variant="caption"
                    className="text-orange-700 font-bold"
                  >
                    Caramel Cloud
                  </BrewText>
                </View>
                <BrewText variant="hero" className="mt-2 leading-tight">
                  Sip, track and explore your coffee world
                </BrewText>
              </View>
              <CoffeeArt
                size="md"
                className="absolute -bottom-2 -right-2 opacity-90"
                label="Today"
              />
            </View>
          </GlassCard>
        </Animated.View>

        {/* QUICK ACTIONS */}
        <Animated.View
          entering={FadeInDown.delay(200).duration(400).springify()}
          className="flex-row gap-3"
        >
          {categoryLinks.map((item, index) => {
            const Icon = item.icon;
            const isPrimary = index === 0;
            return (
              <Link key={item.label} href={item.href} asChild>
                <Pressable className="flex-1 active:scale-95">
                  <View
                    className={cn(
                      "min-h-[60px] flex-row items-center justify-center gap-2 rounded-2xl px-3 shadow-sm",
                      isPrimary
                        ? "bg-espresso dark:bg-crema"
                        : "bg-white/80 dark:bg-white/10",
                    )}
                  >
                    <Icon
                      size={18}
                      strokeWidth={2.5}
                      color={isPrimary ? "#FFF9EF" : "#210B05"}
                    />
                    <BrewText
                      className={cn(
                        "font-bold",
                        isPrimary && "text-crema dark:text-espresso",
                      )}
                    >
                      {item.label}
                    </BrewText>
                  </View>
                </Pressable>
              </Link>
            );
          })}
        </Animated.View>

        {/* OVERVIEW BENTO GRID */}
        <Animated.View
          entering={FadeInDown.delay(300).duration(400).springify()}
          className="gap-4"
        >
          <SectionHeader eyebrow="Today" title="Overview" />
          <View className="flex-row gap-3">
            <MetricCard
              label="Caffeine"
              value={`${caffeine.todayMg}mg`}
              detail={`Safe ${caffeine.safeRangeLabel}`}
            />
            <MetricCard
              label="Spend"
              value={formatCurrency(spending.monthly)}
              detail="This month"
            />
          </View>

          <GlassCard>
            <View className="gap-5">
              <View className="flex-row items-start justify-between">
                <View className="flex-1 gap-1">
                  <BrewText
                    variant="caption"
                    className="uppercase tracking-wider opacity-60"
                  >
                    Caffeine Intelligence
                  </BrewText>
                  <BrewText variant="subtitle" className="text-lg">
                    {caffeine.isOverLimit
                      ? "Slow down today"
                      : "Inside your range"}
                  </BrewText>
                </View>
                <View className="h-12 w-12 items-center justify-center rounded-full bg-orange/15">
                  <TrendingUp size={22} color="#C96B38" strokeWidth={2.5} />
                </View>
              </View>
              <StatBar
                label="Daily caffeine"
                value={caffeine.todayMg}
                max={user?.caffeineLimitMg ?? 400}
              />
              <BrewText className="text-sm opacity-80 leading-relaxed">
                {caffeine.sleepImpact}
              </BrewText>
            </View>
          </GlassCard>
        </Animated.View>

        {/* COFFEE DNA */}
        <Animated.View
          entering={FadeInDown.delay(400).duration(400).springify()}
          className="gap-4"
        >
          <SectionHeader eyebrow="Coffee DNA" title={dna.persona} />
          <GlassCard>
            <View className="gap-4">
              <View className="gap-2">
                {dna.insightLines.map((line) => (
                  <BrewText key={line} className="text-base leading-relaxed">
                    {line}
                  </BrewText>
                ))}
              </View>
              <View className="mt-1 flex-row flex-wrap gap-2">
                <Pill
                  label={`${dna.favoriteType}`}
                  selected={dna.favoriteType !== "Unknown"}
                />
                <Pill
                  label={`${dna.favoriteRoast}`}
                  selected={dna.favoriteRoast !== "Unknown"}
                />
              </View>
            </View>
          </GlassCard>
        </Animated.View>

        {/* RECENT COFFEES */}
        <Animated.View
          entering={FadeInDown.delay(500).duration(400).springify()}
          className="gap-4"
        >
          <SectionHeader eyebrow="Memories" title="Recent coffees" />
          <View className="gap-3">
            {recent.length > 0 ? (
              recent.map((coffee) => (
                <CoffeeCard key={coffee.id} coffee={coffee} />
              ))
            ) : (
              <EmptyState
                title="No coffees yet"
                body="Log your first coffee to start building your dashboard."
                action={
                  <Link href="/add-coffee" asChild>
                    <Pressable className="mt-4 h-14 flex-row items-center justify-center gap-2 rounded-full bg-espresso px-6 dark:bg-crema active:scale-95">
                      <Plus size={20} color="#FFF9EF" strokeWidth={2.5} />
                      <BrewText className="font-bold text-crema text-base dark:text-espresso">
                        Log coffee
                      </BrewText>
                    </Pressable>
                  </Link>
                }
              />
            )}
          </View>
        </Animated.View>

        {/* INSIGHTS & AI */}
        <Animated.View
          entering={FadeInDown.delay(600).duration(400).springify()}
          className="gap-4"
        >
          <SectionHeader eyebrow="Productivity" title="Correlation insight" />
          <GlassCard>
            <BrewText className="leading-relaxed">{productivity}</BrewText>
          </GlassCard>

          <Link href="/assistant" asChild>
            <Pressable className="active:scale-[0.98]">
              <GlassCard className="border border-orange/20 bg-orange/5">
                <View className="flex-row items-center gap-4">
                  <View className="h-14 w-14 items-center justify-center rounded-2xl bg-orange/15">
                    <Sparkles size={24} color="#C96B38" strokeWidth={2.5} />
                  </View>
                  <View className="flex-1 gap-1">
                    <BrewText variant="subtitle" className="text-lg">
                      AI Coffee Assistant
                    </BrewText>
                    <BrewText className="text-sm opacity-80 leading-tight">
                      Get local recommendations from your BrewSpace data.
                    </BrewText>
                  </View>
                  <View className="h-10 w-10 items-center justify-center rounded-full bg-white/50">
                    <Bell size={18} color="#C96B38" />
                  </View>
                </View>
              </GlassCard>
            </Pressable>
          </Link>
        </Animated.View>

        {/* WRAPPED BUTTON */}
        <Animated.View
          entering={FadeInDown.delay(700).duration(400).springify()}
          className="mt-4"
        >
          <Link href="/wrapped" asChild>
            <Pressable className="min-h-[64px] flex-row items-center justify-center gap-3 rounded-2xl bg-orange shadow-sm active:scale-95 px-5">
              <CalendarDays size={20} color="#210B05" strokeWidth={2.5} />
              <BrewText className="text-base font-black uppercase tracking-wider text-espresso">
                Open Coffee Wrapped
              </BrewText>
            </Pressable>
          </Link>
        </Animated.View>
      </View>
    </Screen>
  );
}
