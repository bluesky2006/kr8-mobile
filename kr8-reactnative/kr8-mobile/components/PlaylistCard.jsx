// components/PlaylistCard.jsx
import SquareCover from "@/components/SquareCover";
import { Pressable, Text, View } from "react-native";

export default function PlaylistCard({ playlist, onPress }) {
  const tracks = playlist?.playlist_tracks ?? [];
  const covers = tracks.slice(0, 3); // preview first 3

  return (
    <Pressable
      onPress={onPress}
      className="
        mx-4 mb-4 p-4
        rounded-2xl
        bg-white dark:bg-gray-900
        border border-black/5 dark:border-white/10
        shadow-sm
        active:opacity-90
      "
    >
      {/* Header */}
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100" numberOfLines={1}>
          {playlist?.playlist_name || "Untitled playlist"}
        </Text>

        <View className="px-2 py-1 rounded-full bg-red-400 dark:bg-gray-800">
          <Text className="text-xs font-medium text-white dark:text-gray-300">
            {tracks.length} {tracks.length === 1 ? "track" : "tracks"}
          </Text>
        </View>
      </View>

      {/* Covers row */}
      <View className="flex-row gap-2">
        {covers.length > 0 ? (
          covers.map((t, idx) => (
            <View key={t?.track_id ?? `${t?.track_title}-${idx}`} className="flex-1">
              <SquareCover imageBytes={t?.track_image} />
            </View>
          ))
        ) : (
          // If no tracks at all, show a single wide placeholder
          <View className="w-full">
            <SquareCover />
          </View>
        )}
      </View>
    </Pressable>
  );
}
