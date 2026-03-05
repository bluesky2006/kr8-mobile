import { CurrentPlaylistProvider } from "@/context/CurrentPlaylistContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import "react-native-reanimated";
import "../global.css";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Rubik80sFade: require("../assets/fonts/Rubik80sFade-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <CurrentPlaylistProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="tabs" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </CurrentPlaylistProvider>
  );
}
