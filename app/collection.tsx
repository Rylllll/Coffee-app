import { Plus } from "lucide-react-native";
import { useState } from "react";
import { TextInput, View } from "react-native";
import { originCountries, roastLevels } from "@/constants/coffee";
import { BrewText } from "@/components/ui/BrewText";
import { EmptyState } from "@/components/ui/EmptyState";
import { GlassCard } from "@/components/ui/GlassCard";
import { Pill } from "@/components/ui/Pill";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useBrewStore } from "@/src/stores/useBrewStore";
import type { CoffeeOrigin, RoastLevel } from "@/src/types/brew";
import { getBeanExpiryLabel } from "@/src/utils/analytics";

export default function CollectionScreen() {
  const beans = useBrewStore((state) => state.beans);
  const addBean = useBrewStore((state) => state.addBean);
  const [name, setName] = useState("");
  const [roaster, setRoaster] = useState("");
  const [flavorNotes, setFlavorNotes] = useState("");
  const [originCountry, setOriginCountry] = useState<CoffeeOrigin>("Colombia");
  const [roastLevel, setRoastLevel] = useState<RoastLevel>("Medium");

  const saveBean = () => {
    const opened = new Date();
    const expires = new Date();
    expires.setDate(expires.getDate() + 30);
    addBean({
      name: name.trim() || "Untitled beans",
      roaster: roaster.trim(),
      originCountry,
      roastLevel,
      flavorNotes: flavorNotes
        .split(",")
        .map((note) => note.trim())
        .filter(Boolean),
      openedAt: opened.toISOString(),
      expiresAt: expires.toISOString(),
      gramsRemaining: 200,
    });
    setName("");
    setRoaster("");
    setFlavorNotes("");
  };

  return (
    <Screen>
      <View className="gap-2">
        <BrewText variant="caption">Beans shelf</BrewText>
        <BrewText variant="hero">Collection</BrewText>
      </View>

      <GlassCard>
        <View className="gap-4">
          <SectionHeader eyebrow="Add beans" title="Track freshness" />
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Bean name"
            placeholderTextColor="#8F7868"
            className="min-h-14 rounded-full border border-white/70 bg-white/75 px-5 text-base text-espresso dark:border-white/10 dark:bg-white/10 dark:text-crema"
          />
          <TextInput
            value={roaster}
            onChangeText={setRoaster}
            placeholder="Roaster"
            placeholderTextColor="#8F7868"
            className="min-h-14 rounded-full border border-white/70 bg-white/75 px-5 text-base text-espresso dark:border-white/10 dark:bg-white/10 dark:text-crema"
          />
          <TextInput
            value={flavorNotes}
            onChangeText={setFlavorNotes}
            placeholder="Flavor notes, comma separated"
            placeholderTextColor="#8F7868"
            className="min-h-14 rounded-full border border-white/70 bg-white/75 px-5 text-base text-espresso dark:border-white/10 dark:bg-white/10 dark:text-crema"
          />
          <View className="flex-row flex-wrap gap-2">
            {originCountries.map((country) => (
              <Pill key={country} label={country} selected={originCountry === country} onPress={() => setOriginCountry(country)} />
            ))}
          </View>
          <View className="flex-row flex-wrap gap-2">
            {roastLevels.map((level) => (
              <Pill key={level} label={level} selected={roastLevel === level} onPress={() => setRoastLevel(level)} />
            ))}
          </View>
          <PrimaryButton label="Add beans" onPress={saveBean} icon={<Plus size={18} color="#FFF9EF" />} />
        </View>
      </GlassCard>

      <SectionHeader eyebrow={`${beans.length} bags`} title="Owned beans" />
      <View className="gap-3">
        {beans.length > 0 ? (
          beans.map((bean) => (
            <GlassCard key={bean.id}>
              <View className="gap-3">
                <View>
                  <BrewText variant="subtitle">{bean.name}</BrewText>
                  <BrewText>
                    {bean.roaster || "No roaster"} - {bean.originCountry} - {bean.roastLevel}
                  </BrewText>
                </View>
                <View className="flex-row flex-wrap gap-2">
                  {bean.flavorNotes.map((note) => (
                    <Pill key={note} label={note} />
                  ))}
                  <Pill label={`${bean.gramsRemaining}g`} selected />
                  <Pill label={getBeanExpiryLabel(bean)} selected={getBeanExpiryLabel(bean) !== "Expired"} />
                </View>
              </View>
            </GlassCard>
          ))
        ) : (
          <EmptyState title="No beans yet" body="Add your first bag to start tracking freshness and origins." />
        )}
      </View>
    </Screen>
  );
}
