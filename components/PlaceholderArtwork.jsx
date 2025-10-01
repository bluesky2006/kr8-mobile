import { FontAwesome5 } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function PlaceholderArtwork({
  size = 20,
  label = "No artwork",
  iconColor = "#f87171",
}) {
  return (
    <View className="flex-1 items-center justify-center">
      <FontAwesome5 name="compact-disc" size={size} color={iconColor} />
      {label ? <Text className="mt-1 text-[11px] text-gray-400">{label}</Text> : null}
    </View>
  );
}
