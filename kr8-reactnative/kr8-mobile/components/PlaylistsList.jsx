// components/PlaylistsList.tsx
import { FlatList } from "react-native";
import { playlistData } from "../playlistData.js";
import PlaylistCard from "./PlaylistCard";

export default function PlaylistsList() {
  return (
    <FlatList
      data={playlistData}
      renderItem={({ item }) => <PlaylistCard playlist={item} />}
      keyExtractor={(item) => item.playlist_name}
    />
  );
}
