import { Directory, File, Paths } from "expo-file-system";

const CACHE_VERSION = "v1";
const cacheDirectory = new Directory(Paths.document, "kr8-cache");
const playlistsCacheFile = new File(cacheDirectory, `playlists-${CACHE_VERSION}.json`);

function ensureCacheDirectory() {
  if (!cacheDirectory.exists) {
    cacheDirectory.create({ idempotent: true, intermediates: true });
  }
}

function safeParsePlaylists(raw) {
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      // Backward compatibility for earlier cache format.
      return { playlists: parsed, updatedAt: null };
    }

    if (parsed && typeof parsed === "object" && Array.isArray(parsed.playlists)) {
      return {
        playlists: parsed.playlists,
        updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : null,
      };
    }

    return { playlists: [], updatedAt: null };
  } catch {
    return { playlists: [], updatedAt: null };
  }
}

export async function readCachedPlaylistsSnapshot() {
  try {
    if (!playlistsCacheFile.exists) return { playlists: [], updatedAt: null };
    const raw = await playlistsCacheFile.text();
    return safeParsePlaylists(raw);
  } catch {
    return { playlists: [], updatedAt: null };
  }
}

export async function readCachedPlaylists() {
  const snapshot = await readCachedPlaylistsSnapshot();
  return snapshot.playlists;
}

export async function readCachedPlaylistById(playlistId) {
  const all = await readCachedPlaylists();
  const id = Number(playlistId);
  return all.find((playlist) => Number(playlist?.id) === id) ?? null;
}

export async function saveCachedPlaylists(playlists, updatedAt = new Date().toISOString()) {
  try {
    ensureCacheDirectory();
    if (!playlistsCacheFile.exists) {
      playlistsCacheFile.create({ intermediates: true });
    }
    const snapshot = {
      playlists: Array.isArray(playlists) ? playlists : [],
      updatedAt,
    };
    playlistsCacheFile.write(JSON.stringify(snapshot));
    return snapshot;
  } catch {
    // Avoid crashing UI when filesystem writes fail.
    return { playlists: Array.isArray(playlists) ? playlists : [], updatedAt: null };
  }
}

export async function upsertCachedPlaylist(playlist) {
  if (!playlist) return;

  const cached = await readCachedPlaylists();
  const id = Number(playlist?.id);
  const existingIndex = cached.findIndex((entry) => Number(entry?.id) === id);

  if (existingIndex >= 0) {
    cached[existingIndex] = playlist;
  } else {
    cached.push(playlist);
  }

  await saveCachedPlaylists(cached);
}
