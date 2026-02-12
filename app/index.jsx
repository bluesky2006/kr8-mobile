import { router } from "expo-router";
import { Image, Pressable, SafeAreaView } from "react-native";

export default function LandingPage() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white">
      <Pressable onPress={() => router.push("/tabs")}>
        <Image
          source={require("../assets/kr8-logo.png")}
          style={{ width: 220, height: 120 }}
          resizeMode="contain"
        />
      </Pressable>
    </SafeAreaView>
  );
}
