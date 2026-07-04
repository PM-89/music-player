import { useState } from "react";
import songs from "./data/songs";
import Player from "./components/Player";

function App() {
  const [currentSong, setCurrentSong] = useState(0);

  return (
    <div className="min-h-screen bg-black flex justify-center items-center p-6">

      <div className="bg-[#111827] w-[90vw] max-w-2xl h-[90vh] rounded-3xl shadow-2xl p-8 flex flex-col">

        <h1 className="text-5xl font-bold text-white text-center mb-6">
          🎵 Music Player
        </h1>

        <div className="flex justify-center">

          <img
            src="https://picsum.photos/300"
            alt="cover"
            className="w-72 h-72 rounded-2xl object-cover shadow-xl"
          />

        </div>

        <h2 className="text-4xl font-bold text-white text-center mt-6">
          {songs[currentSong].title}
        </h2>

        <p className="text-xl text-gray-400 text-center mt-2">
          {songs[currentSong].artist}
        </p>

        <Player
          songs={songs}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
        />

      </div>

    </div>
  );
}

export default App;