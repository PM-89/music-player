
import { useState } from "react";
import Player from "./components/Player";
import SongList from "./components/SongList";
import AvailableSongs from "./components/AvailableSongs";
import allSongs from "./data/songs";

function App() {
  // Songs currently in the playlist
  const [playlist, setPlaylist] = useState([allSongs[0]]);

  // Index of the currently playing song in the playlist
  const [currentSong, setCurrentSong] = useState(0);

  // Add a song to the playlist
  const addToPlaylist = (song) => {
    const exists = playlist.some((item) => item.id === song.id);

    if (!exists) {
      setPlaylist((prev) => [...prev, song]);
    }
  };

  // Remove a song from the playlist
  const removeFromPlaylist = (id) => {
    const index = playlist.findIndex((song) => song.id === id);

    const updatedPlaylist = playlist.filter((song) => song.id !== id);

    setPlaylist(updatedPlaylist);

    if (updatedPlaylist.length === 0) {
      setCurrentSong(0);
      return;
    }

    if (index === currentSong) {
      setCurrentSong(0);
    } else if (index < currentSong) {
      setCurrentSong((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center p-5">
      <div className="grid grid-cols-3 gap-6 w-full max-w-7xl">

        {/* Available Songs */}
        <div className="bg-gray-900 p-5 rounded-2xl">
          <AvailableSongs
            songs={allSongs}
            playlist={playlist}
            addToPlaylist={addToPlaylist}
          />
        </div>

        {/* Music Player */}
        <div className="bg-gray-900 p-6 rounded-2xl">

          <h1 className="text-3xl font-bold text-center">
            🎵 Music Player
          </h1>

          <div className="flex justify-center mt-5">
            <img
              src={`https://picsum.photos/300?random=${currentSong}`}
              alt="cover"
              className="w-64 h-64 rounded-xl object-cover"
            />
          </div>

          {playlist.length > 0 && (
            <>
              <h2 className="text-2xl font-bold text-center mt-5">
                {playlist[currentSong].title}
              </h2>

              <p className="text-center text-gray-400">
                {playlist[currentSong].artist}
              </p>
            </>
          )}

          <Player
            songs={playlist}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
          />
        </div>

        {/* Playlist */}
        <div className="bg-gray-900 p-5 rounded-2xl">
          <SongList
            songs={playlist}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            removeSong={removeFromPlaylist}
          />
        </div>

      </div>
    </div>
  );
}

export default App;
