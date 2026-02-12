export const baseURL = "http://100.106.142.112:8787"; // your server host + port

async function handle(res) {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json();
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
