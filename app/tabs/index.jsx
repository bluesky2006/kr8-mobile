import PlaylistCard from "@/components/PlaylistCard";
import { useCurrentPlaylist } from "@/context/CurrentPlaylistContext";
import { FontAwesome } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, FlatList, Pressable, RefreshControl, Text, TextInput, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import {
  deletePlaylist,
  fetchPlaylistById,
  fetchPlaylistsByUserId,
  setPlaylistFavourite,
} from "../../api/api";
import { readCachedPlaylistsSnapshot, saveCachedPlaylists } from "../../utils/playlistCache";

export default function CratesView() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFaves, setShowFaves] = useState(false);
  const [query, setQuery] = useState("");
  const [showingOfflineCache, setShowingOfflineCache] = useState(false);
  const [cacheUpdatedAt, setCacheUpdatedAt] = useState(null);
  const { setCurrentPlaylist } = useCurrentPlaylist();

  // Hardcoded userId for now
  const userId = 1;
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const router = useRouter();

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const list = await fetchPlaylistsByUserId(userId); // array
      // Hydrate each playlist with its tracks (so cards can show counts/covers)
      const detailed = await Promise.all(
        (list ?? []).map(async (p) => {
          const full = await fetchPlaylistById(p.id);
          return {
            ...p,
            // your UI expects `tracks`, server gives `playlist_tracks`
            tracks: full.playlist_tracks ?? [],
          };
        })
      );
      setPlaylists(detailed);
      const snapshot = await saveCachedPlaylists(detailed);
      setShowingOfflineCache(false);
      setCacheUpdatedAt(snapshot.updatedAt);
    } catch (err) {
      const snapshot = await readCachedPlaylistsSnapshot();
      if (snapshot.playlists.length > 0) {
        setPlaylists(snapshot.playlists);
        setError("You are offline. Showing cached playlists.");
        setShowingOfflineCache(true);
        setCacheUpdatedAt(snapshot.updatedAt);
      } else {
        setError(err?.message || "Failed to load playlists");
        setPlaylists([]);
        setShowingOfflineCache(false);
        setCacheUpdatedAt(null);
      }
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
      if (showFaves && !playlist?.favourite) return false;
      if (!trimmedQuery) return true;
      const name = (playlist?.playlist_name ?? "").toLowerCase();
      return name.includes(trimmedQuery);
    });
  }, [playlists, showFaves, query]);

  const formattedCacheUpdatedAt = useMemo(() => {
    if (!cacheUpdatedAt) return null;

    const date = new Date(cacheUpdatedAt);
    if (Number.isNaN(date.getTime())) return null;

    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  }, [cacheUpdatedAt]);

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{ flex: 1 }}
      className="bg-white dark:bg-black"
    >
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
              router.push({ pathname: "/tabs/crate/[id]", params: { id: String(item?.id) } });
            }}
            onToggleFavourite={async () => {
              const next = !item.favourite;
              await setPlaylistFavourite(item.id, next);
              setPlaylists((prev) => {
                const nextPlaylists = prev.map((p) =>
                  p.id === item.id ? { ...p, favourite: next } : p
                );
                void saveCachedPlaylists(nextPlaylists);
                return nextPlaylists;
              });
            }}
            onDelete={() => {
              Alert.alert(
                "Delete playlist?",
                `Delete '${item.playlist_name}' and all its tracks?`,
                [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                      await deletePlaylist(item.id);
                      setPlaylists((prev) => {
                        const nextPlaylists = prev.filter((p) => p.id !== item.id);
                        void saveCachedPlaylists(nextPlaylists);
                        return nextPlaylists;
                      });
                    },
                  },
                ]
              );
            }}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
        contentContainerStyle={{
          paddingTop: 72,
          paddingBottom: showingOfflineCache ? tabBarHeight + 52 : 8,
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

      {showingOfflineCache && (
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            left: 12,
            right: 12,
            bottom: 8,
            zIndex: 30,
          }}
        >
          <View className="rounded-xl border border-amber-300/80 bg-amber-100/95 px-3 py-2 dark:border-amber-500/60 dark:bg-amber-900/90">
            <Text className="text-xs font-medium text-amber-800 dark:text-amber-100">
              Offline mode • showing cached playlists
              {formattedCacheUpdatedAt ? ` • updated ${formattedCacheUpdatedAt}` : ""}
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
