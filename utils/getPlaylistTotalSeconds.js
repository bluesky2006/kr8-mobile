export function getPlaylistTotalSeconds(tracks = []) {
  return tracks.reduce((sum, track) => {
    const num = Math.floor(Number(track?.track_length) || 0);
    return sum + num;
  }, 0);
}
