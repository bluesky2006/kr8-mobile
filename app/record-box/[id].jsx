// app/record-box/[id].jsx
import FilterBar from "@/components/FilterBar";
import PlaceholderArtwork from "@/components/PlaceholderArtwork";
import TrackDetail from "@/components/TrackDetail";
import { useCurrentPlaylist } from "@/context/CurrentPlaylistContext";
import { convertLengthToTime } from "@/utils/convertLengthToTime";
import { getPlaylistTotalSeconds } from "@/utils/getPlaylistTotalSeconds";
import { renderImageFromUint8 } from "@/utils/renderImageFromUint8";
import { FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
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

  const tracks = useMemo(() => playlist?.tracks ?? [], [playlist]);
  const heroCover = tracks.length > 0 ? tracks[0]?.track_image : null;

  const totalLengthSeconds = useMemo(() => getPlaylistTotalSeconds(tracks), [tracks]);
  const totalLengthFormatted = convertLengthToTime(totalLengthSeconds);

  // ---- Filter state (tracks)
  const [showFaves, setShowFaves] = useState(false);
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredTracks = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tracks.filter((t) => {
      if (showFaves && !t?.favourite) return false;
      if (!q) return true;
      const haystack = `${t?.track_title ?? ""} ${t?.track_artist ?? ""}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [tracks, showFaves, query]);

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <FlatList
        data={filteredTracks}
        keyExtractor={(t, i) => String(t?.id ?? `${t?.track_title}-${i}`)}
        renderItem={({ item }) => <TrackDetail track={item} />}
        ItemSeparatorComponent={() => <View className="h-4" />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 24 }}
        ListHeaderComponent={
          <View>
            {/* Header card */}
            <View
              className="
                mb-2 p-4 
                rounded-lg
                bg-white/90 dark:bg-gray-900
                border border-black/5 dark:border-white/10
                shadow-sm
                flex-row items-stretch
              "
            >
              <View className="flex-1 pr-4 justify-between">
                <Text
                  className="text-2xl font-semibold text-gray-900 dark:text-gray-100"
                  numberOfLines={2}
                >
                  {playlist?.playlist_name || "Playlist"}
                </Text>
                <View className="flex-2 flex-row gap-2 mt-2">
                  <View className="px-2 py-1 self-start rounded-full bg-red-400 dark:bg-gray-800">
                    <Text className="text-xs font-medium text-white dark:text-gray-300">
                      {tracks.length} {tracks.length === 1 ? "track" : "tracks"}
                    </Text>
                  </View>
                  <View className="px-2 py-1 self-start rounded-full bg-red-400 dark:bg-gray-800">
                    <Text className="text-xs font-medium text-white dark:text-gray-300">
                      {totalLengthFormatted}
                    </Text>
                  </View>
                </View>
              </View>

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

            {/* Reusable FilterBar */}
            <FilterBar
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              showFaves={showFaves}
              setShowFaves={setShowFaves}
              query={query}
              setQuery={setQuery}
              placeholder="Search title or artist…"
              helperText={
                showFaves || query
                  ? `Showing ${filteredTracks.length} of ${tracks.length} tracks` +
                    (showFaves ? " • favourites only" : "") +
                    (query ? " • filtered" : "")
                  : undefined
              }
            />
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
