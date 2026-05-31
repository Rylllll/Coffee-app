import { Link } from "expo-router";
import { Award, BarChart3, Bean, BookmarkCheck, CalendarDays, ChevronRight, Globe2, Settings, Users } from "lucide-react-native";
import { Image, Pressable, View } from "react-native";
import { originCountries } from "@/constants/coffee";
import { BrewText } from "@/components/ui/BrewText";
import { GlassCard } from "@/components/ui/GlassCard";
import { MetricCard } from "@/components/ui/MetricCard";
import { Pill } from "@/components/ui/Pill";
import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useBrewAnalytics } from "@/hooks/useBrewAnalytics";
import { useBrewStore } from "@/src/stores/useBrewStore";
import { formatCurrency } from "@/src/utils/analytics";

const links = [
  { href: "/stats", label: "Statistics", icon: BarChart3 },
  { href: "/wrapped", label: "Coffee Wrapped", icon: CalendarDays },
  { href: "/collection", label: "Coffee collection", icon: Bean },
  { href: "/bucket-list", label: "Bucket list", icon: BookmarkCheck },
  { href: "/social", label: "Social feed", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
] as const;

export default function ProfileScreen() {
  const user = useBrewStore((state) => state.user);
  const coffees = useBrewStore((state) => state.coffees);
  const { dna, spending, passportCountries } = useBrewAnalytics();
  const unlockedAchievements = [
    coffees.length > 0 && "First Sip",
    coffees.filter((entry) => entry.type === "Espresso").length >= 1 && "Espresso Master",
    passportCountries.length >= 3 && "World Bean Traveler",
    coffees.length >= 5 && "Cafe Explorer",
  ].filter(Boolean);

  return (
    <Screen>
      <GlassCard contentClassName="p-5">
        <View className="flex-row items-center gap-4">
          {user?.avatarUrl ? (
            <Image source={{ uri: user.avatarUrl }} className="h-20 w-20 rounded-full bg-latte" />
          ) : (
            <View className="h-20 w-20 items-center justify-center rounded-full bg-espresso dark:bg-crema">
              <BrewText variant="title" className="text-crema dark:text-espresso">
                {user?.name?.charAt(0)?.toUpperCase() ?? "B"}
              </BrewText>
            </View>
          )}
          <View className="flex-1">
            <BrewText variant="caption">Profile</BrewText>
            <BrewText variant="title">{user?.name ?? "BrewSpace Guest"}</BrewText>
            <BrewText>{dna.persona}</BrewText>
          </View>
        </View>
      </GlassCard>

      <View className="flex-row gap-3">
        <MetricCard label="Coffees" value={`${coffees.length}`} detail="Logged memories" />
        <MetricCard label="Annual" value={formatCurrency(spending.annual)} detail="Projected spend" />
      </View>

      <SectionHeader eyebrow="Coffee passport" title="Origins unlocked" />
      <GlassCard>
        <View className="gap-4">
          <View className="flex-row items-center gap-3">
            <View className="h-12 w-12 items-center justify-center rounded-full bg-sage/20">
              <Globe2 size={22} color="#7C9A78" />
            </View>
            <BrewText>
              {passportCountries.length} of {originCountries.length} countries unlocked
            </BrewText>
          </View>
          <View className="flex-row flex-wrap gap-2">
            {originCountries.map((country) => (
              <Pill key={country} label={country} selected={passportCountries.includes(country)} />
            ))}
          </View>
        </View>
      </GlassCard>

      <SectionHeader eyebrow="Achievements" title="Progress" />
      <GlassCard>
        <View className="gap-3">
          {["First Sip", "Espresso Master", "Cafe Explorer", "Brew Scientist", "30-Day Streak", "World Bean Traveler"].map((title) => (
            <View key={title} className="flex-row items-center gap-3 rounded-[28px] bg-white/45 p-3 dark:bg-white/10">
              <View className="h-11 w-11 items-center justify-center rounded-full bg-orange/15">
                <Award size={18} color="#C96B38" />
              </View>
              <View className="flex-1">
                <BrewText className="font-bold">{title}</BrewText>
                <BrewText className="text-sm">{unlockedAchievements.includes(title) ? "Unlocked" : "Keep brewing to unlock"}</BrewText>
              </View>
            </View>
          ))}
        </View>
      </GlassCard>

      <SectionHeader eyebrow="Smart spending" title={spending.comparison} />
      <View className="flex-row gap-3">
        <MetricCard label="Week" value={formatCurrency(spending.weekly)} />
        <MetricCard label="Month" value={formatCurrency(spending.monthly)} />
      </View>

      <View className="gap-3">
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} asChild>
              <Pressable>
                <GlassCard contentClassName="p-4">
                  <View className="flex-row items-center gap-3">
                    <View className="h-11 w-11 items-center justify-center rounded-full bg-white/70 dark:bg-white/10">
                      <Icon size={20} color="#C96B38" />
                    </View>
                    <BrewText className="flex-1 font-bold">{item.label}</BrewText>
                    <ChevronRight size={18} color="#7C9A78" />
                  </View>
                </GlassCard>
              </Pressable>
            </Link>
          );
        })}
      </View>
    </Screen>
  );
}
