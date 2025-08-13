// components/TrackDetail.jsx
import SquareCover from "@/components/SquareCover";
import { Pressable, Text, View } from "react-native";
import { convertLengthToTime } from "../utils/convertLengthToTime";
import { InfoPill } from "./InfoPill";

export default function TrackDetail({ track, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className="
        w-full aspect-square relative
        rounded-lg overflow-hidden
        bg-white dark:bg-gray-900
        border border-black/5 dark:border-white/10
        shadow-sm active:opacity-95
      "
    >
      {/* Cover image */}
      <View className="absolute inset-0">
        <SquareCover imageBytes={track?.track_image} className="w-full h-full rounded-none" />
      </View>

      {/* Title / artist */}
      <View
        className="
           top-0 left-0 right-0
          p-4
          bg-gray-400 dark:bg-black/50
        "
      >
        <View className="mb-3">
          <Text
            className="text-white font-inter-semibold text-base leading-tight"
            numberOfLines={1}
          >
            {track?.track_title || "Untitled"}
          </Text>
          <Text className="text-white/80 font-inter text-xs" numberOfLines={1}>
            {track?.track_artist || "Unknown artist"}
          </Text>
        </View>

        {/* Info pills */}
        <View
          className="
          flex-row gap-2 items-center justify-end
        "
        >
          <InfoPill label={`${track?.track_bpm ?? "—"} BPM`} />
          <InfoPill label={convertLengthToTime(track?.track_length) ?? "—:—"} />
        </View>
      </View>
    </Pressable>
  );
}
