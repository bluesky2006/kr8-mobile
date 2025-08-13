import { FontAwesome5 } from "@expo/vector-icons";
import { Text, View } from "react-native";

/**
 * Placeholder artwork icon for when no image is available.
 *
 * @param {object} props
 * @param {number} [props.size=20] - Icon size in px
 * @param {string} [props.label="No artwork"] - Text label under the icon
 * @param {string} [props.iconColor="#f87171"] - Icon color
 */

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
