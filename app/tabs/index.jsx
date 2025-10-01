import FilterBar from "@/components/FilterBar";
import PlaylistCard from "@/components/PlaylistCard";
import { useCurrentPlaylist } from "@/context/CurrentPlaylistContext";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { fetchPlaylistsByUserId } from "../../api/api";

export default function CratesView() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFaves, setShowFaves] = useState(false);
  const [query, setQuery] = useState("");
  const { setCurrentPlaylist } = useCurrentPlaylist();

  const insets = useSafeAreaInsets();
  const router = useRouter();

  // Hardcoded userId for now
  const userId = 1;

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
    <SafeAreaView style={{ flex: 1 }} className="bg-white dark:bg-black">
      <View
        style={{
          position: "absolute",
          top: insets.top,
          left: 0,
          right: 0,
          zIndex: 20,
        }}
      >
        <FilterBar
          style={{ padding: 16 }}
          className="bg-white"
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

      <FlatList
        data={filteredPlaylists}
        keyExtractor={(p, i) => String(p?.id ?? p?.playlist_name ?? i)}
        renderItem={({ item }) => (
          <PlaylistCard
            playlist={item}
            onPress={() => {
              setCurrentPlaylist(item);
              router.push({
                pathname: "/tabs/crate/[id]",
                params: {
                  id: String(item?.id ?? item?.playlist_name),
                  payload: JSON.stringify(item),
                },
              });
            }}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        contentContainerStyle={{
          paddingTop: 72, // height of your header (adjust!)
          paddingBottom: 8,
        }}
        refreshControl={<RefreshControl refreshing={!!loading} onRefresh={load} />}
        ListEmptyComponent={
          <View style={{ padding: 16 }}>
            <Text>{loading ? "Loading…" : error || "No playlists yet."}</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
