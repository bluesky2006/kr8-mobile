// app/(tabs)/index.tsx
import PlaylistsList from "@/components/PlaylistsList"; // adjust path
import { useEffect } from "react";
import { SafeAreaView } from "react-native";

export default function HomeView() {
  useEffect(() => {
    console.log("HomeView mounted");
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PlaylistsList />
    </SafeAreaView>
  );
}
