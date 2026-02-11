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