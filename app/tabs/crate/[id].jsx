import TrackDetail from "@/components/TrackDetail";
import { useCurrentPlaylist } from "@/context/CurrentPlaylistContext";
import { convertLengthToTime } from "@/utils/convertLengthToTime";
import { getPlaylistTotalSeconds } from "@/utils/getPlaylistTotalSeconds";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { Dimensions, Pressable, SafeAreaView, Text, TextInput, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

export default function CrateScreen() {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showFaves, setShowFaves] = useState(false);
  const { currentPlaylist } = useCurrentPlaylist();

  const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

  const playlist = currentPlaylist;
  const tracks = useMemo(() => playlist?.tracks ?? [], [playlist]);
  const totalLengthSeconds = useMemo(() => getPlaylistTotalSeconds(tracks), [tracks]);
  const totalLengthFormatted = convertLengthToTime(totalLengthSeconds);

  const filteredTracks = useMemo(() => {
    const trimmedQuery = query.trim().toLowerCase();
    return tracks.filter((track) => {
      if (!trimmedQuery) return true;
      if (showFaves && !track?.favourite) return false;
      const titleAndArtist =
        `${track?.track_title ?? ""} ${track?.track_artist ?? ""}`.toLowerCase();
      return titleAndArtist.includes(trimmedQuery);
    });
  }, [tracks, showFaves, query]);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <View className="p-4">
        <Text className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {playlist?.playlist_name || "Playlist"}
        </Text>
        <Text className="text-sm text-gray-500 dark:text-gray-400">
          {tracks.length} {tracks.length === 1 ? "track" : "tracks"} • {totalLengthFormatted}
        </Text>

        <View>
          <Pressable
            onPress={() => setShowFilters((prev) => !prev)}
            className={`flex-row items-center justify-center gap-2 ${showFilters ? "mb-2" : ""}`}
          >
            <Text className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {showFilters ? "Hide filters" : "Show filters"}
            </Text>
            <FontAwesome5
              name={showFilters ? "chevron-up" : "chevron-down"}
              size={12}
              color="#9CA3AF"
            />
          </Pressable>

          {showFilters && (
            <View className="bg-white dark:bg-gray-900 shadow-xs">
              <View className="flex-row gap-4 items-center">
                <Pressable
                  onPress={() => setShowFaves((v) => !v)}
                  className={`flex-row items-center gap-2 px-3 py-2 rounded-full ${
                    showFaves ? "bg-red-400" : "bg-gray-200 dark:bg-gray-800"
                  }`}
                >
                  <FontAwesome
                    name={showFaves ? "star" : "star-o"}
                    size={14}
                    color={showFaves ? "#fff" : "#9CA3AF"}
                  />
                  <Text
                    className={`text-xs font-medium ${
                      showFaves ? "text-white" : "text-gray-500 dark:text-gray-300"
                    }`}
                  >
                    Favourites
                  </Text>
                </Pressable>

                <View className="flex-1">
                  <TextInput
                    value={query}
                    onChangeText={setQuery}
                    placeholder="Search title or artist…"
                    placeholderTextColor="#9CA3AF"
                    className="
                      px-3 py-2 rounded-lg
                      bg-gray-100 dark:bg-gray-800
                      text-gray-900 dark:text-gray-100
                      border border-black/5 dark:border-white/10
                    "
                  />
                </View>
              </View>

              {(showFaves || query) && (
                <Text className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Showing {filteredTracks.length} of {tracks.length} tracks
                  {showFaves ? " • favourites only" : ""}
                  {query ? " • filtered" : ""}
                </Text>
              )}
            </View>
          )}
        </View>
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
          pagingEnabled
          loop={false}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 1,
            parallaxScrollingOffset: 100,
          }}
        />
      ) : (
        <View className="py-20 items-center">
          <FontAwesome5 name="compact-disc" size={32} color="#9CA3AF" />
          <Text className="mt-3 text-gray-500 dark:text-gray-400">
            {tracks.length === 0
              ? "This playlist is empty"
              : `No tracks in this playlist matching ‘${query}’.`}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
