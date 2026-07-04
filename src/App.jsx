import { useState } from "react";
import songs from "./data/songs";
import Player from "./components/Player";

function App() {
  const [currentSong, setCurrentSong] = useState(0);

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center p-6">

      <div className="w-full max-w-6xl h-[90vh] bg-[#111827] rounded-3xl shadow-2xl flex items-center justify-between px-16">

        {/* Left */}
        <div className="w-[40%] flex flex-col items-center">

          <h1 className="text-5xl font-bold text-white mb-10">
            🎵 Music Player
          </h1>

          <img
            src={`https://picsum.photos/400?random=${currentSong}`}
            alt="cover"
            className="w-80 h-80 rounded-3xl object-cover shadow-xl"
          />

        </div>

        {/* Right */}
        <div className="w-[50%]">

          <h2 className="text-5xl font-bold text-white text-center">
            {songs[currentSong].title}
          </h2>

          <p className="text-2xl text-gray-400 text-center mt-3 mb-8">
            {songs[currentSong].artist}
          </p>

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