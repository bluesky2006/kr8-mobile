export const baseURL = "http://100.106.142.112:3000/api";

export function fetchPlaylistsByUserId(userId) {
  return fetch(`${baseURL}/users/${userId}/playlists`).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch user playlists");
    return res.json();
  });
}
