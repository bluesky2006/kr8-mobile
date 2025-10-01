import { router } from "expo-router";
import { Pressable, SafeAreaView, Text } from "react-native";

export default function LandingPage() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white">
      <Pressable onPress={() => router.push("/tabs")}>
        <Text className="text-8xl mb-4 text-red-400 font-rubik80s">kr8</Text>
      </Pressable>
    </SafeAreaView>
  );
}
