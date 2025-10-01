import { Text, View } from "react-native";

export function InfoPill({ label }) {
  return (
    <View className="px-2 py-1 rounded bg-white/25">
      <Text className="text-white text-[11px] font-inter">{label}</Text>
    </View>
  );
}
