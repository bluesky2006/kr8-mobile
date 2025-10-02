import PlaceholderArtwork from "@/components/PlaceholderArtwork";
import { renderImageFromUint8 } from "@/utils/renderImageFromUint8";
import { View } from "react-native";

export default function SquareCover({ imageBytes }) {
  return (
    <View className={"aspect-square rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-800"}>
      {imageBytes ? (
        renderImageFromUint8(imageBytes, {
          className: "w-full h-full",
          resizeMode: "cover",
        })
      ) : (
        <PlaceholderArtwork />
      )}
    </View>
  );
}
