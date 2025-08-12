// TEMP: Test screen for TrackDetail using local playlistData.js
import TrackDetail from "@/components/TrackDetail";
import { FlatList, Text, View } from "react-native";
import { playlistData } from "../../playlistData.js"; // ✅ Local dummy data

export default function TestTrackDetailScreen() {
  const samplePlaylist = playlistData?.[0] ?? null;
  const tracks = samplePlaylist?.playlist_tracks ?? [];

  return (
    <View className="flex-1 bg-gray-100 dark:bg-black p-4">
      {/* Page heading */}
      <Text className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Preview: {samplePlaylist?.playlist_name || "No playlist"}
      </Text>

      <FlatList
        data={tracks}
        keyExtractor={(t, i) => String(t?.track_id ?? i)}
        renderItem={({ item }) => (
          <TrackDetail
            track={{
              ...item,
              // Format length into mm:ss
              track_length: formatLength(item.track_length),
            }}
          />
        )}
        ItemSeparatorComponent={() => <View className="h-4" />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

/* --- helper to format length (seconds) into mm:ss --- */
function formatLength(seconds) {
  if (!seconds || isNaN(seconds)) return "—:—";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
}
