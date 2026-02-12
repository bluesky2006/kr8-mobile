import { createContext, useContext, useMemo, useState } from "react";

const CurrentPlaylistContext = createContext();

export function CurrentPlaylistProvider({ children }) {
  const [currentPlaylist, setCurrentPlaylist] = useState(null);

  const setPlaylist = (playlist) => {
    if (!playlist) return setCurrentPlaylist(null);
    const tracks = playlist.tracks ?? playlist.playlist_tracks ?? [];
    setCurrentPlaylist({ ...playlist, tracks });
  };

  const value = useMemo(
    () => ({ currentPlaylist, setCurrentPlaylist: setPlaylist }),
    [currentPlaylist]
  );
  return (
    <CurrentPlaylistContext.Provider value={value}>{children}</CurrentPlaylistContext.Provider>
  );
}

export function useCurrentPlaylist() {
  const ctx = useContext(CurrentPlaylistContext);
  if (!ctx) throw new Error("useCurrentPlaylist must be used within CurrentPlaylistProvider");
  return ctx;
}
