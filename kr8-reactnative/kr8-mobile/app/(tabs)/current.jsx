import TrackDetail from "@/components/TrackDetail";
import { useCurrentPlaylist } from "@/context/CurrentPlaylistContext";
import { FlatList, Text, View } from "react-native";

export default function CurrentPlaylistScreen() {
  const { currentPlaylist } = useCurrentPlaylist();
  const tracks = currentPlaylist?.playlist_tracks ?? [];

  if (!currentPlaylist) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
        <Text style={{ fontSize: 16, textAlign: "center" }}>
          No current playlist yet. Pick one from the Playlists tab.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 16, paddingBottom: 8 }}>
        <Text style={{ fontSize: 22, fontWeight: "700" }}>{currentPlaylist?.playlist_name}</Text>
        <Text style={{ color: "#666" }}>{tracks.length} tracks</Text>
      </View>

      <FlatList
        data={tracks}
        keyExtractor={(t, i) => String(t?.track_id ?? `${t?.track_title}-${i}`)}
        renderItem={({ item }) => <TrackDetail track={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        contentContainerStyle={{ padding: 16, paddingTop: 8 }}
      />
    </View>
  );
}
