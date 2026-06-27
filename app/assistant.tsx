import { Bot, Coffee, MapPin, Sparkles, Send } from "lucide-react-native";
import { useState } from "react";
import { View, TextInput, Pressable, ActivityIndicator } from "react-native";
import { BrewText } from "@/components/ui/BrewText";
import { GlassCard } from "@/components/ui/GlassCard";

import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useBrewAnalytics } from "@/hooks/useBrewAnalytics";
import { useBrewStore } from "@/src/stores/useBrewStore";

export default function AssistantScreen() {
  const cafes = useBrewStore((state) => state.cafes);
  const _beans = useBrewStore((state) => state.beans);
  const _recipes = useBrewStore((state) => state.recipes);
  const coffees = useBrewStore((state) => state.coffees);
  const user = useBrewStore((state) => state.user);
  const openAiApiKey = useBrewStore((state) => state.openAiApiKey);
  const { dna, caffeine } = useBrewAnalytics();

  const savedCafe = cafes.find((cafe) => cafe.saved) ?? cafes[0];
  const _bean = _beans[0];
  const _recipe = _recipes[0];
  const hasTasteData =
    dna.favoriteType !== "Unknown" || dna.favoriteRoast !== "Unknown";

  const [customPrompt, setCustomPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAIRecommendation = async () => {
    if (!openAiApiKey) {
      setError(
        "Please add your OpenAI API Key in Settings to use AI insights.",
      );
      return;
    }

    setLoading(true);
    setError(null);

    const context = `
      User Profile: ${user?.name || "User"}
      Coffee DNA Persona: ${dna.persona}
      Favorite Type: ${dna.favoriteType}
      Favorite Roast: ${dna.favoriteRoast}
      Preferred Time Window: ${dna.preferredTimeWindow}
      Total Coffees Logged: ${coffees.length}
      Recent Cafes: ${cafes.map((c) => c.name).join(", ")}
      Recent Beans: ${_beans.map((b) => b.name).join(", ")}
    `;

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openAiApiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content:
                  "You are a friendly, knowledgeable coffee assistant inside the BrewSpace app. Provide a short, personalized recommendation or insight (2-3 sentences) based on the user's data.",
              },
              {
                role: "user",
                content: `Here is my data: ${context}. ${customPrompt ? `My specific request: ${customPrompt}` : "Give me a recommendation on what coffee to drink or which cafe to visit next."}`,
              },
            ],
          }),
        },
      );

      const data = await response.json();

      if (data.error) {
        setError(data.error.message);
      } else {
        setAiResponse(data.choices[0].message.content);
        setCustomPrompt("");
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch AI recommendation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <View className="gap-2">
        <BrewText variant="caption">AI Coffee Assistant</BrewText>
        <BrewText variant="hero">Smart insights</BrewText>
        <BrewText>
          Powered by OpenAI, using your stored data to give personalized coffee
          advice.
        </BrewText>
      </View>

      <GlassCard>
        <View className="gap-4">
          <View className="flex-row items-center gap-3">
            <Bot size={24} color="#C96B38" />
            <BrewText variant="subtitle">Ask the Assistant</BrewText>
          </View>

          <View className="flex-row items-center gap-2">
            <TextInput
              value={customPrompt}
              onChangeText={setCustomPrompt}
              placeholder="e.g. Suggest a new bean..."
              placeholderTextColor="#8F7868"
              className="min-h-12 flex-1 rounded-full border border-white/70 bg-white/75 px-5 text-espresso dark:border-white/10 dark:bg-white/10 dark:text-crema"
            />
            <Pressable
              onPress={getAIRecommendation}
              disabled={loading}
              className="h-12 w-12 items-center justify-center rounded-full bg-espresso dark:bg-crema opacity-90 disabled:opacity-50"
            >
              {loading ? (
                <ActivityIndicator color="#C96B38" size="small" />
              ) : (
                <Send size={18} color="#C96B38" />
              )}
            </Pressable>
          </View>

          {error && <BrewText className="text-red-500 mt-2">{error}</BrewText>}

          {aiResponse && (
            <View className="mt-4 p-4 rounded-xl bg-sage/10 border border-sage/20">
              <BrewText className="text-base leading-relaxed">
                {aiResponse}
              </BrewText>
            </View>
          )}
        </View>
      </GlassCard>

      <SectionHeader eyebrow="Overview" title="Your habits" />
      <GlassCard>
        <View className="gap-3">
          <View className="flex-row gap-3">
            <Bot size={22} color="#C96B38" />
            <View className="flex-1">
              <BrewText className="font-semibold">Taste Profile</BrewText>
              <BrewText>
                {hasTasteData
                  ? `You seem to enjoy ${dna.favoriteRoast.toString().toLowerCase()} roast, ${dna.favoriteType.toString().toLowerCase()} style coffees.`
                  : "Log coffees to unlock personalized taste and habit recommendations."}
              </BrewText>
            </View>
          </View>
          <View className="flex-row gap-3">
            <Sparkles size={22} color="#C96B38" />
            <View className="flex-1">
              <BrewText className="font-semibold">Sleep Impact</BrewText>
              <BrewText>{caffeine.sleepImpact}</BrewText>
            </View>
          </View>
        </View>
      </GlassCard>

      <SectionHeader eyebrow="Recommendations" title="Try next" />
      <GlassCard>
        <View className="gap-3">
          <View className="flex-row gap-3">
            <Coffee size={22} color="#C96B38" />
            <View className="flex-1">
              <BrewText className="font-semibold">Drink</BrewText>
              <BrewText>
                {hasTasteData
                  ? `Try another ${dna.favoriteType} and compare your rating.`
                  : "Log coffee ratings to unlock drink suggestions."}
              </BrewText>
            </View>
          </View>
          <View className="flex-row gap-3">
            <MapPin size={22} color="#7C9A78" />
            <View className="flex-1">
              <BrewText className="font-semibold">Cafe</BrewText>
              <BrewText>
                {savedCafe
                  ? `${savedCafe.name}: ${savedCafe.recommendation}`
                  : "Save cafes to improve suggestions."}
              </BrewText>
            </View>
          </View>
        </View>
      </GlassCard>
    </Screen>
  );
}
