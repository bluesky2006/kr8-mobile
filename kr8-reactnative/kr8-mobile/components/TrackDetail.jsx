import { Text, View } from "react-native";
import { renderImageFromUint8 } from "../utils/imageRenderer";

export default function TrackDetail({ track }) {
  return (
    <View className="flex-1 flex-col gap-2">
      {/* Text container */}
      <View className="flex-1 flex-col gap-2">
        {/* Header block */}
        <View className="flex-1 flex-col gap-2">
          <Text>{track.track_title}</Text>
          <Text>{track.track_artist}</Text>
        </View>

        {/* Info block */}

        <View className="flex-1 flex-row justify-between">
          <Text>{track.track_bpm}</Text>
          <Text>{track.track_length}</Text>
        </View>
      </View>
      {/* Image container */}

      <View>{renderImageFromUint8(track.track_image)}</View>
    </View>
  );
}
