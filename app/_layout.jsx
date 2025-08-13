import { CurrentPlaylistProvider } from "@/context/CurrentPlaylistContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Inter_400Regular, Inter_600SemiBold } from "@expo-google-fonts/inter";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { View } from "react-native";
import "react-native-reanimated";
import "../global.css";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
  });
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  if (!fontsLoaded) return <View />;

  return (
    <CurrentPlaylistProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </CurrentPlaylistProvider>
  );
}
