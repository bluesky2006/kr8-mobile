// app/record-box/[id].jsx
import FilterBar from "@/components/FilterBar";
import TrackDetail from "@/components/TrackDetail";
import { useCurrentPlaylist } from "@/context/CurrentPlaylistContext";
import { convertLengthToTime } from "@/utils/convertLengthToTime";
import { getPlaylistTotalSeconds } from "@/utils/getPlaylistTotalSeconds";
import { FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

export default function RecordBoxScreen() {
  const { payload } = useLocalSearchParams();
  const { setCurrentPlaylist } = useCurrentPlaylist();
  const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

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
  const totalLengthSeconds = useMemo(() => getPlaylistTotalSeconds(tracks), [tracks]);
  const totalLengthFormatted = convertLengthToTime(totalLengthSeconds);

  // ---- Filter state
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
      {/* Header */}
      <View className="p-4">
        <Text className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {playlist?.playlist_name || "Playlist"}
        </Text>
        <Text className="text-sm text-gray-500 dark:text-gray-400">
          {tracks.length} {tracks.length === 1 ? "track" : "tracks"} • {totalLengthFormatted}
        </Text>
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

      {filteredTracks.length > 0 ? (
        <Carousel
          vertical
          width={windowWidth}
          height={windowHeight}
          data={filteredTracks}
          renderItem={({ item }) => (
            <View className="px-4">
              <TrackDetail track={item} />
            </View>
          )}
          pagingEnabled={true} // snaps one-by-one
          loop={false}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 1, // subtle zoom
            parallaxScrollingOffset: 100, // controls overlap spacing
          }}
        />
      ) : (
        <View className="py-20 items-center">
          <FontAwesome5 name="compact-disc" size={32} color="#9CA3AF" />
          <Text className="mt-3 text-gray-500 dark:text-gray-400">
            No tracks in this playlist yet.
          </Text>
        </View>
      )}
    </View>
  );
}
