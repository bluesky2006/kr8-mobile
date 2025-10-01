import PlaylistCard from "@/components/PlaylistCard";
import { useCurrentPlaylist } from "@/context/CurrentPlaylistContext";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, RefreshControl, Text, TextInput, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { fetchPlaylistsByUserId } from "../../api/api";

export default function CratesView() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFaves, setShowFaves] = useState(false);
  const [query, setQuery] = useState("");
  const { setCurrentPlaylist } = useCurrentPlaylist();

  // Hardcoded userId for now
  const userId = 1;
  const insets = useSafeAreaInsets();
  const router = useRouter();

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
    const trimmedQuery = query.trim().toLowerCase();
    return playlists.filter((playlist) => {
      if (!trimmedQuery) return true;
      if (showFaves && !playlist?.favourite) return false;
      const name = (playlist?.playlist_name ?? "").toLowerCase();
      return name.includes(trimmedQuery);
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
          padding: 16,
          backgroundColor: "white",
        }}
      >

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
              placeholder="Search playlists…"
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
            Showing {filteredPlaylists.length} of {playlists.length} playlists
            {showFaves ? " • favourites only" : ""}
            {query ? " • filtered" : ""}
          </Text>
        )}
      </View>

      <FlatList
        data={filteredPlaylists}
        keyExtractor={(playlist, index) => String(playlist?.id ?? playlist?.playlist_name ?? index)}
        renderItem={({ item }) => (
          <PlaylistCard
            playlist={item}
            onPress={() => {
              setCurrentPlaylist(item);
              router.push({
                pathname: "/tabs/crate/[id]",
                params: {
                  id: String(item?.id ?? item?.playlist_name),
                },
              });
            }}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        contentContainerStyle={{
          paddingTop: 72,
          paddingBottom: 8,
        }}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
        ListEmptyComponent={
          <View className="py-20 items-center">
            <Text className="mt-3 text-gray-500 dark:text-gray-400">
              {loading ? "Loading…" : error || `No playlists matching '${query}'.`}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
