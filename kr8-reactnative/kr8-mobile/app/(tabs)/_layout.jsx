import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute", // transparent background on iOS
          },
          default: {},
        }),
      }}
    >
      {/* Playlists tab */}
      <Tabs.Screen
        name="index" // app/(tabs)/index.jsx
        options={{
          title: "Playlists",
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="list" color={color} />,
        }}
      />

      {/* Current Playlist tab */}
      <Tabs.Screen
        name="current" // app/(tabs)/current.jsx (you'll create this)
        options={{
          title: "Current Playlist",
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="play-circle" color={color} />,
        }}
      />
    </Tabs>
  );
}
