import { router } from "expo-router";
import { Coffee, LogIn } from "lucide-react-native";
import { useState } from "react";
import { TextInput, View } from "react-native";
import { CoffeeArt } from "@/components/CoffeeArt";
import { BrewText } from "@/components/ui/BrewText";
import { GlassCard } from "@/components/ui/GlassCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Screen } from "@/components/ui/Screen";
import { useBrewStore } from "@/src/stores/useBrewStore";

export default function LoginScreen() {
  const signIn = useBrewStore((state) => state.signIn);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSignIn = () => {
    signIn(name, email);
    router.replace("/(tabs)");
  };

  return (
    <Screen contentClassName="min-h-full justify-center gap-6">
      <View className="items-center gap-4">
        <View className="h-16 w-16 items-center justify-center rounded-full bg-espresso dark:bg-crema">
          <Coffee size={32} color="#C96B38" />
        </View>
        <View className="items-center gap-2">
          <BrewText variant="hero" className="text-center">
            BrewSpace
          </BrewText>
          <BrewText className="max-w-[320px] text-center">
            Your profile and coffee data stay on this device.
          </BrewText>
        </View>
      </View>

      <GlassCard contentClassName="items-center p-6">
        <CoffeeArt size="md" label="Local-first" />
      </GlassCard>

      <GlassCard>
        <View className="gap-4">
          <Field label="Name" value={name} onChangeText={setName} placeholder="Your name" />
          <Field label="Email" value={email} onChangeText={setEmail} placeholder="you@example.com" />
          <PrimaryButton label="Enter BrewSpace" onPress={handleSignIn} icon={<LogIn size={18} color="#FFF9EF" />} />
        </View>
      </GlassCard>
    </Screen>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
}

function Field({ label, value, onChangeText, placeholder }: FieldProps) {
  return (
    <View className="gap-2">
      <BrewText variant="caption">{label}</BrewText>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={label === "Email" ? "email-address" : "default"}
        autoCapitalize={label === "Email" ? "none" : "words"}
        placeholder={placeholder}
        placeholderTextColor="#8F7868"
        className="min-h-14 rounded-full border border-white/70 bg-white/75 px-5 text-base text-espresso dark:border-white/10 dark:bg-white/10 dark:text-crema"
      />
    </View>
  );
}
