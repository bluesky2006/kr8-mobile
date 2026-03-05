import SquareCover from "@/components/SquareCover";
import { convertLengthToTime } from "@/utils/convertLengthToTime";
import { getPlaylistTotalSeconds } from "@/utils/getPlaylistTotalSeconds";
import { FontAwesome } from "@expo/vector-icons";
import { useMemo } from "react";
import { Pressable, Text, View } from "react-native";

export default function PlaylistCard({ playlist, onPress, onToggleFavourite, onDelete }) {
  const tracks = useMemo(() => playlist?.playlist_tracks ?? playlist?.tracks ?? [], [playlist]);
  const covers = tracks.slice(0, 3);

  const totalLengthSeconds = useMemo(() => getPlaylistTotalSeconds(tracks), [tracks]);
  const totalLengthFormatted = convertLengthToTime(totalLengthSeconds) ?? "0:00";

  const isFave = !!playlist?.favourite;

  return (
    <Pressable
      onPress={onPress}
      className="
        mx-4 mb-4 py-3 px-4
        rounded-lg
        bg-white dark:bg-gray-900
        border border-black/5 dark:border-white/10
        shadow-sm
        active:opacity-90
      "
    >
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100" numberOfLines={1}>
          {playlist?.playlist_name || "Untitled playlist"}
        </Text>
        <View className="flex-row gap-2">
          <View className="px-2 py-1 rounded-full bg-red-400 dark:bg-gray-800">
            <Text className="text-xs font-medium text-white dark:text-gray-300">
              {tracks.length} {tracks.length === 1 ? "track" : "tracks"}
            </Text>
          </View>
          <View className="px-2 py-1 rounded-full bg-red-400 dark:bg-gray-800">
            <Text className="text-xs font-medium text-white dark:text-gray-300">
              {totalLengthFormatted}
            </Text>
          </View>
        </View>
      </View>

      <View className="flex-row gap-2">
        {covers.length > 0 ? (
          covers.map((track, index) => (
            <View key={track?.id ?? `${track?.track_title}-${index}`} className="flex-1">
              <SquareCover imageBytes={track?.track_image} />
            </View>
          ))
        ) : (
          <View className="w-full">
            <SquareCover />
          </View>
        )}
      </View>

      {/* actions row under artwork */}
      <View className="mt-3 flex-row items-center justify-between">
        <Pressable
          onPress={(e) => {
            e.stopPropagation?.();
            onToggleFavourite?.();
          }}
          hitSlop={10}
        >
          <FontAwesome name={isFave ? "star" : "star-o"} size={18} color="#f87171" />
        </Pressable>

        <Pressable
          onPress={(e) => {
            e.stopPropagation?.();
            onDelete?.();
          }}
          hitSlop={10}
        >
          <FontAwesome name="trash" size={18} color="#f87171" />
        </Pressable>
      </View>
    </Pressable>
  );
}
