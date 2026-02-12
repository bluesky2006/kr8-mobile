import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";

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
          backgroundColor: themeColors.background,
          borderTopWidth: 0.5,
          height: 90,
          paddingBottom: 12,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Inter",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <FontAwesome size={22} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Crates",
          tabBarIcon: ({ color }) => <FontAwesome size={22} name="archive" color={color} />,
        }}
      />
      <Tabs.Screen
        name="crate/[id]"
        options={{
          title: "Current Crate",
          tabBarIcon: ({ color }) => <FontAwesome size={22} name="headphones" color={color} />,
        }}
      />
    </Tabs>
  );
}
