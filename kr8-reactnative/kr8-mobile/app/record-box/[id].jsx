// app/record-box/[id].jsx
import PlaceholderArtwork from "@/components/PlaceholderArtwork";
import TrackDetail from "@/components/TrackDetail";
import { useCurrentPlaylist } from "@/context/CurrentPlaylistContext";
import { renderImageFromUint8 } from "@/utils/imageRenderer";
import { FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo } from "react";
import { FlatList, Text, View } from "react-native";

export default function RecordBoxScreen() {
  const { payload } = useLocalSearchParams();
  const { setCurrentPlaylist } = useCurrentPlaylist();

  const playlist = useMemo(() => {
    try {
      return payload ? JSON.parse(payload) : null;
    } catch {
      return null;
    }
  }, [payload]);

  useEffect(() => {
    if (playlist) setCurrentPlaylist(playlist);
  }, [playlist, setCurrentPlaylist]);

  const tracks = playlist?.tracks ?? []; // ✅ matches API shape
  const heroCover = tracks.length > 0 ? tracks[0]?.track_image : null;

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <FlatList
        data={tracks}
        keyExtractor={(t, i) => String(t?.id ?? `${t?.track_title}-${i}`)}
        renderItem={({ item }) => <TrackDetail track={item} />}
        ItemSeparatorComponent={() => <View className="h-4" />}
        contentContainerStyle={{ padding: 16, paddingTop: 8 }}
        ListHeaderComponent={
          <View
            className="
              mb-4 p-4 mx-[-4px]
              rounded-2xl
              bg-white/90 dark:bg-gray-900
              border border-black/5 dark:border-white/10
              shadow-sm
              flex-row items-center
            "
          >
            {/* Left: title + track count */}
            <View className="flex-1 pr-4">
              <Text
                className="text-2xl font-semibold text-gray-900 dark:text-gray-100"
                numberOfLines={2}
              >
                {playlist?.playlist_name || "Playlist"}
              </Text>
              <View className="mt-2 px-2 py-1 self-start rounded-full bg-red-400 dark:bg-gray-800">
                <Text className="text-xs font-medium text-white dark:text-gray-300">
                  {tracks.length} {tracks.length === 1 ? "track" : "tracks"}
                </Text>
              </View>
            </View>

            {/* Right: hero cover */}
            <View className="w-24 aspect-square rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-800">
              {heroCover ? (
                renderImageFromUint8(heroCover, {
                  className: "w-full h-full",
                  resizeMode: "cover",
                })
              ) : (
                <PlaceholderArtwork />
              )}
            </View>
          </View>
        }
        ListEmptyComponent={
          <View className="py-20 items-center">
            <FontAwesome5 name="compact-disc" size={32} color="#9CA3AF" />
            <Text className="mt-3 text-gray-500 dark:text-gray-400">
              No tracks in this playlist yet.
            </Text>
          </View>
        }
      />
    </View>
  );
}
