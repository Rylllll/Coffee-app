import { Tabs } from "expo-router";
import { BookOpen, Compass, History, Home, User } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { View, Text } from "react-native";

const tabIcons = {
  index: Home,
  history: History,
  discover: Compass,
  recipes: BookOpen,
  profile: User,
};

const tabTitles = {
  index: "Home",
  history: "History",
  discover: "Discover",
  recipes: "Recipes",
  profile: "Profile",
};

export default function TabsLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Tabs
      screenOptions={({ route }) => {
        const Icon = tabIcons[route.name as keyof typeof tabIcons] ?? Home;
        const title = tabTitles[route.name as keyof typeof tabTitles] ?? "Tab";

        return {
          headerShown: false,
          tabBarShowLabel: false, // We render our own label inside tabBarIcon
          tabBarActiveTintColor: isDark ? "#210B05" : "#FFF9EF",
          tabBarInactiveTintColor: isDark ? "#FFF9EF" : "#210B05",
          tabBarStyle: {
            position: "absolute",
            left: 22,
            right: 22,
            bottom: 22,
            height: 72,
            borderRadius: 42,
            backgroundColor: isDark
              ? "rgba(33, 11, 5, 0.88)"
              : "rgba(255, 255, 255, 0.82)",
            borderTopWidth: 0,
            borderWidth: 1,
            borderColor: isDark
              ? "rgba(255,255,255,0.10)"
              : "rgba(255,255,255,0.78)",
            paddingBottom: 10,
            paddingTop: 10,
            paddingHorizontal: 10,
            shadowColor: "#210B05",
            shadowOffset: { width: 0, height: 18 },
            shadowOpacity: 0.16,
            shadowRadius: 28,
            elevation: 8,
          },
          tabBarItemStyle: {
            height: 52,
            borderRadius: 32,
          },
          tabBarIcon: ({ color, focused }) => (
            <View
              className="flex-row items-center rounded-full"
              style={{
                height: 52,
                padding: 2,
                backgroundColor: focused
                  ? isDark
                    ? "rgba(255, 255, 255, 0.15)" // Outer pill background (Dark Mode)
                    : "#FFFFFF" // Outer pill background (Light Mode)
                  : "transparent",
              }}
            >
              {/* Inner Circle Icon Container */}
              <View
                className="h-12 w-12 items-center justify-center rounded-full"
                style={{
                  backgroundColor: focused
                    ? isDark
                      ? "#FFF9EF"
                      : "#210B05"
                    : isDark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(255,255,255,0.72)",
                }}
              >
                <Icon
                  color={focused ? (isDark ? "#210B05" : "#FFF9EF") : color}
                  size={focused ? 20 : 22}
                  strokeWidth={focused ? 2.5 : 2}
                />
              </View>

              {/* Expanding Text Label */}
              {focused && (
                <Text
                  className="ml-2 mr-4 font-semibold"
                  style={{
                    color: isDark ? "#FFF9EF" : "#210B05",
                    fontSize: 15,
                  }}
                >
                  {title}
                </Text>
              )}
            </View>
          ),
        };
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="history" options={{ title: "History" }} />
      <Tabs.Screen name="discover" options={{ title: "Discover" }} />
      <Tabs.Screen name="recipes" options={{ title: "Recipes" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}