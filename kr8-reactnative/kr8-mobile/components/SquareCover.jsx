import PlaceholderArtwork from "@/components/PlaceholderArtwork";
import { renderImageFromUint8 } from "@/utils/imageRenderer";
import { View } from "react-native";

/**
 * Renders a square cover image or a placeholder if no imageBytes provided.
 *
 * @param {Uint8Array|string|null} imageBytes - Optional cover art data
 * @param {object} [style] - Additional className/style props
 */
export default function SquareCover({ imageBytes, className = "" }) {
  return (
    <View
      className={`aspect-square rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-800 ${className}`}
    >
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
