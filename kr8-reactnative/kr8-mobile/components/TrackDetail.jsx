// components/TrackDetail.jsx
import SquareCover from "@/components/SquareCover";
import { Pressable, Text, View } from "react-native";

export default function TrackDetail({ track, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className="
        w-full aspect-square relative
        rounded-2xl overflow-hidden
        bg-white dark:bg-gray-900
        border border-black/5 dark:border-white/10
        shadow-sm active:opacity-95
      "
    >
      {/* Cover image (fills the tile) */}
      <View className="absolute inset-0">
        <SquareCover imageBytes={track?.track_image} className="w-full h-full rounded-none" />
      </View>

      {/* Top overlay: title / artist */}
      <View
        className="
          absolute top-0 left-0 right-0
          p-4
          bg-black/45 dark:bg-black/50
        "
      >
        <Text className="text-white font-inter-semibold text-base leading-tight" numberOfLines={1}>
          {track?.track_title || "Untitled"}
        </Text>
        <Text className="text-white/80 font-inter text-xs" numberOfLines={1}>
          {track?.track_artist || "Unknown artist"}
        </Text>
      </View>

      {/* Bottom overlay: info pills */}
      <View
        className="
          absolute bottom-0 left-0 right-0
          p-3 flex-row justify-between items-center
          bg-black/40 dark:bg-black/45
        "
      >
        <InfoPill label={`${track?.track_bpm ?? "—"} BPM`} />
        <InfoPill label={track?.track_length ?? "—:—"} />
      </View>
    </Pressable>
  );
}

/* --- small pill component for consistent styling --- */
function InfoPill({ label }) {
  return (
    <View className="px-2 py-1 rounded-full bg-white/15">
      <Text className="text-white text-[11px] font-inter">{label}</Text>
    </View>
  );
}
