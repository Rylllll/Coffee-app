import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { Camera, Check, X } from "lucide-react-native";
import { useState } from "react";
import { Image, Pressable, TextInput, View } from "react-native";
import { coffeeTypes, roastLevels, tagSuggestions } from "@/constants/coffee";
import { MoodSelector } from "@/components/MoodSelector";
import { BrewText } from "@/components/ui/BrewText";
import { GlassCard } from "@/components/ui/GlassCard";
import { Pill } from "@/components/ui/Pill";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useBrewStore } from "@/src/stores/useBrewStore";
import type {
  CoffeeSource,
  CoffeeType,
  Mood,
  RoastLevel,
} from "@/src/types/brew";

export default function AddCoffeeScreen() {
  const addCoffee = useBrewStore((state) => state.addCoffee);
  const [name, setName] = useState("");
  const [type, setType] = useState<CoffeeType>("Latte");
  const [shopName, setShopName] = useState("");
  const [source, setSource] = useState<CoffeeSource>("Cafe");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [notes, setNotes] = useState("");
  const [moodBefore, setMoodBefore] = useState<Mood>("Tired");
  const [moodAfter, setMoodAfter] = useState<Mood>("Focused");
  const [roastLevel, setRoastLevel] = useState<RoastLevel>("Medium");
  const [tags, setTags] = useState<string[]>([]);
  const [photoUri, setPhotoUri] = useState<string | undefined>();

  const pickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.85,
    });
    if (!result.canceled) {
      setPhotoUri(result.assets[0]?.uri);
    }
  };

  const toggleTag = (tag: string) => {
    setTags((current) =>
      current.includes(tag)
        ? current.filter((item) => item !== tag)
        : [...current, tag],
    );
  };

  const save = () => {
    addCoffee({
      name: name.trim() || type,
      type,
      shopName: shopName.trim() || (source === "Homemade" ? "Home" : "Cafe"),
      source,
      price: Number(price) || 0,
      rating: Math.min(10, Math.max(1, Number(rating) || 1)),
      notes: notes.trim(),
      tags,
      moodBefore,
      moodAfter,
      roastLevel,
      photoUri,
      drankAt: new Date().toISOString(),
      productivityScore: moodAfter === "Productive" ? 88 : 74,
      location: shopName.trim(),
    });
    router.back();
  };

  return (
    <Screen>
      <View className="flex-row items-center justify-between">
        <View>
          <BrewText variant="caption">New memory</BrewText>
          <BrewText variant="title">Log coffee</BrewText>
        </View>
        <Pressable
          onPress={() => router.back()}
          className="h-12 w-12 items-center justify-center rounded-full bg-white/70 dark:bg-white/10"
        >
          <X size={20} color="#C96B38" />
        </Pressable>
      </View>

      <Pressable onPress={pickPhoto}>
        <GlassCard contentClassName="p-0">
          {photoUri ? (
            <Image
              source={{ uri: photoUri }}
              className="h-56 w-full rounded-[34px]"
            />
          ) : (
            <View className="h-56 items-center justify-center gap-3 rounded-[34px] bg-white/45 dark:bg-white/10">
              <View className="h-16 w-16 items-center justify-center rounded-full bg-espresso dark:bg-crema">
                <Camera size={30} color="#C96B38" />
              </View>
              <BrewText className="font-semibold">Add a coffee photo</BrewText>
            </View>
          )}
        </GlassCard>
      </Pressable>

      <GlassCard>
        <View className="gap-4">
          <Field
            label="Coffee name"
            value={name}
            onChangeText={setName}
            placeholder="Latte, espresso, pour over"
          />
          <Field
            label="Shop name"
            value={shopName}
            onChangeText={setShopName}
            placeholder="Cafe name or home"
          />
          <View className="flex-row gap-3">
            <Field
              label="Price"
              value={price}
              onChangeText={setPrice}
              keyboardType="decimal-pad"
              placeholder="0.00"
            />
            <Field
              label="Rating 1-10"
              value={rating}
              onChangeText={setRating}
              keyboardType="number-pad"
              placeholder="8"
            />
          </View>
          <Field
            label="Notes"
            value={notes}
            onChangeText={setNotes}
            multiline
            placeholder="What made this cup memorable?"
          />
        </View>
      </GlassCard>

      <SectionHeader eyebrow="Type" title="What did you drink?" />
      <View className="flex-row flex-wrap gap-2">
        {coffeeTypes.map((item) => (
          <Pill
            key={item}
            label={item}
            selected={type === item}
            onPress={() => setType(item)}
          />
        ))}
      </View>

      <SectionHeader eyebrow="Source" title="Cafe or homemade?" />
      <View className="flex-row gap-2">
        {(["Cafe", "Homemade"] as const).map((item) => (
          <Pill
            key={item}
            label={item}
            selected={source === item}
            onPress={() => setSource(item)}
          />
        ))}
      </View>

      <SectionHeader eyebrow="Mood tracker" title="Before coffee" />
      <MoodSelector value={moodBefore} onChange={setMoodBefore} />
      <SectionHeader title="After coffee" />
      <MoodSelector value={moodAfter} onChange={setMoodAfter} />

      <SectionHeader eyebrow="Roast and tags" title="Coffee context" />
      <View className="flex-row flex-wrap gap-2">
        {roastLevels.map((item) => (
          <Pill
            key={item}
            label={item}
            selected={roastLevel === item}
            onPress={() => setRoastLevel(item)}
          />
        ))}
      </View>
      <View className="flex-row flex-wrap gap-2">
        {tagSuggestions.map((item) => (
          <Pill
            key={item}
            label={item}
            selected={tags.includes(item)}
            onPress={() => toggleTag(item)}
          />
        ))}
      </View>

      <PrimaryButton
        label="Save coffee"
        onPress={save}
        icon={<Check size={18} color="#FFF9EF" />}
      />
    </Screen>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: "default" | "decimal-pad" | "number-pad";
  multiline?: boolean;
  placeholder?: string;
}

function Field({
  label,
  value,
  onChangeText,
  keyboardType = "default",
  multiline,
  placeholder,
}: FieldProps) {
  return (
    <View className="flex-1 gap-2">
      <BrewText variant="caption">{label}</BrewText>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        multiline={multiline}
        placeholder={placeholder}
        placeholderTextColor="#8F7868"
        className="min-h-14 rounded-[28px] border border-white/70 bg-white/75 px-5 py-3 text-base text-espresso dark:border-white/10 dark:bg-white/10 dark:text-crema"
      />
    </View>
  );
}
