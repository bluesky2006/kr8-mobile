import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? "light"];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#f87171",
        tabBarInactiveTintColor: themeColors.tabIconDefault,
        tabBarStyle: {
          backgroundColor: themeColors.background, // matches SafeAreaView
          borderTopWidth: 0, // no divider line
          height: Platform.OS === "ios" ? 90 : 70, // taller on iOS
          paddingBottom: Platform.OS === "ios" ? 24 : 12, // breathing space
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Inter",
        },
      }}
    >
      {/* Playlists tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Playlists",
          tabBarIcon: ({ color }) => <FontAwesome size={22} name="list" color={color} />,
        }}
      />

      {/* Current Playlist tab */}
      <Tabs.Screen
        name="current"
        options={{
          title: "Current",
          tabBarIcon: ({ color }) => <FontAwesome size={22} name="play-circle" color={color} />,
        }}
      />
    </Tabs>
  );
}
