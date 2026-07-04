import { useState } from "react";
import songs from "./data/songs";
import Player from "./components/Player";

function App() {
  const [currentSong, setCurrentSong] = useState(0);

  return (
    <div className="h-screen bg-black flex justify-center items-center overflow-hidden">

      <div className="w-[380px] h-[660px] bg-[#111827] rounded-3xl shadow-2xl p-5 flex flex-col">

        <h1 className="text-3xl font-bold text-center text-white mb-5">
          🎵 Music Player
        </h1>

        <img
          src={`https://picsum.photos/400?random=${currentSong}`}
          alt="Album"
          className="w-56 h-56 mx-auto rounded-3xl object-cover shadow-xl"
        />

        <div className="text-center mt-5">
          <h2 className="text-2xl font-bold text-white">
            {songs[currentSong].title}
          </h2>

          <p className="text-gray-400 mt-1">
            {songs[currentSong].artist}
          </p>
        </div>

        <div className="flex-1 mt-5">
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