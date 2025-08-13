// app/(tabs)/index.jsx
import FilterBar from "@/components/FilterBar";
import PlaylistCard from "@/components/PlaylistCard";
import { useCurrentPlaylist } from "@/context/CurrentPlaylistContext";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, RefreshControl, SafeAreaView, Text, View } from "react-native";
import { fetchPlaylistsByUserId } from "../../api/api";

export default function HomeView() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setCurrentPlaylist } = useCurrentPlaylist();
  const userId = 1;
  const router = useRouter();

  // --- filters for playlists
  const [showFilters, setShowFilters] = useState(false);
  const [showFaves, setShowFaves] = useState(false); // assumes playlist.favourite boolean
  const [query, setQuery] = useState("");

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPlaylistsByUserId(userId);
      const playlistArray = data?.nestedData?.playlists ?? [];
      setPlaylists(playlistArray);
    } catch (err) {
      setError(err?.message || "Failed to load playlists");
      setPlaylists([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    load();
  }, [load]);

  // --- derived filtered playlists
  const filteredPlaylists = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (playlists ?? []).filter((p) => {
      if (showFaves && !p?.favourite) return false;
      if (!q) return true;
      const name = (p?.playlist_name ?? "").toLowerCase();
      return name.includes(q);
    });
  }, [playlists, showFaves, query]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={filteredPlaylists}
        keyExtractor={(p, i) => String(p?.id ?? p?.playlist_name ?? i)}
        renderItem={({ item }) => (
          <PlaylistCard
            playlist={item}
            onPress={() => {
              setCurrentPlaylist(item);
              router.push({
                pathname: "/record-box/[id]",
                params: {
                  id: String(item?.id ?? item?.playlist_name),
                  payload: JSON.stringify(item),
                },
              });
            }}
          />
        )}
        refreshControl={<RefreshControl refreshing={!!loading} onRefresh={load} />}
        ListHeaderComponent={
          <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
            <FilterBar
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              showFaves={showFaves}
              setShowFaves={setShowFaves}
              query={query}
              setQuery={setQuery}
              placeholder="Search playlists…"
              helperText={
                showFaves || query
                  ? `Showing ${filteredPlaylists.length} of ${playlists.length} playlists` +
                    (showFaves ? " • favourites only" : "") +
                    (query ? " • filtered" : "")
                  : undefined
              }
            />
          </View>
        }
        ListEmptyComponent={
          <View style={{ padding: 16 }}>
            <Text>{loading ? "Loading…" : error || "No playlists yet."}</Text>
          </View>
        }
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        contentContainerStyle={{ paddingVertical: 8 }}
      />
    </SafeAreaView>
  );
}
