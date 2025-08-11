import { FlatList, Text, View } from "react-native";
import TrackDetail from "./TrackDetail";

export default function PlaylistCard({ playlist }) {
  return (
    <View style={{ padding: 16 }}>
      <View style={{ marginBottom: 8 }}>
        <Text>{playlist.playlist_name}</Text>
        <Text>{playlist.playlist_tracks?.length ?? 0} tracks</Text>
      </View>
      <FlatList
        data={playlist.playlist_tracks}
        renderItem={({ item }) => <TrackDetail track={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </View>
  );
}
