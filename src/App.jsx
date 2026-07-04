import { useState } from "react";
import Player from "./components/Player";
import songs from "./data/songs";

function App() {
  const [currentSong, setCurrentSong] = useState(0);

  return (
    <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-black flex justify-center items-center overflow-hidden">

      <div className="w-[380px] h-[720px] bg-[#111827] rounded-3xl shadow-2xl p-6 flex flex-col">

        {/* Header */}

        <h1 className="text-4xl font-bold text-center text-white">
          🎵 Music Player
        </h1>

        {/* Album */}

        <div className="flex justify-center mt-6">

          <img
            src={`https://picsum.photos/400?random=${currentSong}`}
            alt="cover"
            className="w-60 h-60 rounded-3xl object-cover shadow-xl"
          />

        </div>

        {/* Song */}

        <div className="text-center mt-6">

          <h2 className="text-4xl font-bold text-white">
            {songs[currentSong].title}
          </h2>

          <p className="text-gray-400 text-xl mt-2">
            {songs[currentSong].artist}
          </p>

        </div>

        {/* Player */}

        <div className="flex-1 flex items-end">

          <Player
            songs={songs}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
          />

        </div>

      </div>

    </div>
  );
}

export default App;