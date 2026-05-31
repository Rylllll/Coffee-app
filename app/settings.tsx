import { LogOut, Trash2 } from "lucide-react-native";
import { useState } from "react";
import { TextInput, View } from "react-native";
import { BrewText } from "@/components/ui/BrewText";
import { GlassCard } from "@/components/ui/GlassCard";
import { Pill } from "@/components/ui/Pill";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useBrewStore } from "@/src/stores/useBrewStore";
import type { ThemePreference } from "@/src/types/brew";

const themes: ThemePreference[] = ["system", "light", "dark"];

export default function SettingsScreen() {
  const user = useBrewStore((state) => state.user);
  const theme = useBrewStore((state) => state.theme);
  const setTheme = useBrewStore((state) => state.setTheme);
  const setCaffeineLimit = useBrewStore((state) => state.setCaffeineLimit);
  const clearLocalData = useBrewStore((state) => state.clearLocalData);
  const openAiApiKey = useBrewStore((state) => state.openAiApiKey);
  const setOpenAiApiKey = useBrewStore((state) => state.setOpenAiApiKey);
  const signOut = useBrewStore((state) => state.signOut);
  const [limit, setLimit] = useState(String(user?.caffeineLimitMg ?? 400));
  const [notificationStatus, setNotificationStatus] = useState("Not scheduled");

  const saveLimit = () => {
    setCaffeineLimit(Number(limit) || 400);
  };

  const scheduleReminder = async () => {
    const Notifications = await import("expo-notifications");
    const permission = await Notifications.requestPermissionsAsync();
    if (!permission.granted) {
      setNotificationStatus("Notifications permission denied");
      return;
    }
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "BrewSpace reminder",
        body: "Log today's coffee memory and check your caffeine range.",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 10,
      },
    });
    setNotificationStatus("Local reminder scheduled");
  };

  return (
    <Screen>
      <View className="gap-2">
        <BrewText variant="caption">Settings</BrewText>
        <BrewText variant="hero">Local-first controls</BrewText>
      </View>

      <GlassCard>
        <View className="gap-4">
          <SectionHeader eyebrow="Appearance" title="Theme" />
          <View className="flex-row flex-wrap gap-2">
            {themes.map((item) => (
              <Pill
                key={item}
                label={item}
                selected={theme === item}
                onPress={() => setTheme(item)}
              />
            ))}
          </View>
        </View>
      </GlassCard>

      <GlassCard>
        <View className="gap-4">
          <SectionHeader eyebrow="Caffeine" title="Daily safe range" />
          <TextInput
            value={limit}
            onChangeText={setLimit}
            keyboardType="number-pad"
            className="min-h-14 rounded-full border border-white/70 bg-white/75 px-5 text-base text-espresso dark:border-white/10 dark:bg-white/10 dark:text-crema"
          />
          <PrimaryButton label="Save caffeine limit" onPress={saveLimit} />
        </View>
      </GlassCard>

      <GlassCard>
        <View className="gap-4">
          <SectionHeader eyebrow="AI Assistant" title="OpenAI API Key" />
          <TextInput
            value={openAiApiKey ?? ""}
            onChangeText={setOpenAiApiKey}
            placeholder="sk-..."
            secureTextEntry
            className="min-h-14 rounded-full border border-white/70 bg-white/75 px-5 text-base text-espresso dark:border-white/10 dark:bg-white/10 dark:text-crema"
          />
        </View>
      </GlassCard>

      <GlassCard>
        <View className="gap-4">
          <SectionHeader eyebrow="Push notifications" title="Local reminders" />
          <BrewText>{notificationStatus}</BrewText>
          <PrimaryButton
            label="Schedule reminder"
            onPress={scheduleReminder}
            variant="secondary"
          />
        </View>
      </GlassCard>

      <GlassCard>
        <View className="gap-4">
          <SectionHeader eyebrow="Storage" title="Device-only data" />
          <BrewText>
            BrewSpace stores authentication state, coffees, recipes, cafes,
            collection, social activity, and settings in AsyncStorage on this
            device.
          </BrewText>
          <PrimaryButton
            label="Clear local records"
            onPress={clearLocalData}
            variant="secondary"
            icon={<Trash2 size={18} color="#C96B38" />}
          />
          <PrimaryButton
            label="Sign out locally"
            onPress={signOut}
            variant="ghost"
            icon={<LogOut size={18} color="#C96B38" />}
          />
        </View>
      </GlassCard>
    </Screen>
  );
}
