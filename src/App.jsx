import { useState } from "react";
import songs from "./data/songs";
import Player from "./components/Player";

function App() {
  const [currentSong, setCurrentSong] = useState(0);

  return (
    <div className="h-screen bg-black flex justify-center items-center overflow-hidden p-4">
      <div className="bg-[#111827] w-[380px] h-[700px] rounded-3xl shadow-2xl p-6 flex flex-col">

        {/* Header */}
        <h1 className="text-white text-4xl font-bold text-center mb-4">
          🎵 Music Player
        </h1>

        {/* Album Cover */}
        <img
          src={`https://picsum.photos/400?random=${currentSong}`}
          alt="cover"
          className="w-56 h-56 rounded-2xl object-cover mx-auto"
        />

        {/* Song Details */}
        <div className="text-center mt-5">
          <h2 className="text-3xl font-bold text-white">
            {songs[currentSong].title}
          </h2>

          <p className="text-gray-400 text-lg mt-2">
            {songs[currentSong].artist}
          </p>
        </div>

        {/* Player */}
        <div className="mt-6 flex-1">
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