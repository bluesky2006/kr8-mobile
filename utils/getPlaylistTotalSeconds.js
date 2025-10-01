export function getPlaylistTotalSeconds(tracks = []) {
  return tracks.reduce((sum, track) => {
    const num = Number(track?.track_length);
    return Number.isFinite(num) ? sum + Math.floor(num) : sum;
  }, 0);
}
