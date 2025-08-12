// utils/getPlaylistTotalSeconds.js
export function getPlaylistTotalSeconds(tracks = []) {
  return tracks.reduce((sum, track) => {
    const raw = track?.track_length;

    // Handle "mm:ss" strings
    if (typeof raw === "string" && raw.includes(":")) {
      const [m, s] = raw.split(":").map(Number);
      const val = (Number.isFinite(m) ? m : 0) * 60 + (Number.isFinite(s) ? s : 0);
      return sum + val;
    }

    const num = Number(raw);
    if (!Number.isFinite(num)) return sum;

    // Heuristic: if it looks like ms, convert to seconds
    const seconds = num > 10000 ? Math.floor(num / 1000) : num;
    return sum + seconds;
  }, 0);
}
