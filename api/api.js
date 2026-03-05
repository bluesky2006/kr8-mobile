const envBaseURL = process.env.EXPO_PUBLIC_API_BASE_URL?.trim();
export const baseURL = (envBaseURL || "http://100.106.142.112:8787").replace(/\/+$/, "");

async function handle(res) {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
  if (res.status === 204) return null;

  const contentType = res.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return res.json();
  }

  const text = await res.text().catch(() => "");
  return text || null;
}

export function fetchPlaylistsByUserId(userId) {
  // GET /users/:userId/playlists -> array of playlists
  return fetch(`${baseURL}/users/${userId}/playlists`).then(handle);
}

export function fetchPlaylistById(playlistId) {
  // GET /playlists/:playlistId -> playlist + playlist_tracks[]
  return fetch(`${baseURL}/playlists/${playlistId}`).then(handle);
}

export function deletePlaylist(playlistId) {
  return fetch(`${baseURL}/playlists/${playlistId}`, { method: "DELETE" }).then(handle);
}

export function deleteTrack(trackId) {
  return fetch(`${baseURL}/tracks/${trackId}`, { method: "DELETE" }).then(handle);
}

export function setPlaylistFavourite(playlistId, favourite) {
  return fetch(`${baseURL}/playlists/${playlistId}/favourite`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ favourite }),
  }).then(handle);
}

export function setTrackFavourite(trackId, favourite) {
  return fetch(`${baseURL}/tracks/${trackId}/favourite`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ favourite }),
  }).then(handle);
}
