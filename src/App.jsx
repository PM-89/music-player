import { useState } from "react";
import songs from "./data/songs";
import Player from "./components/Player";

function App() {
  const [currentSong, setCurrentSong] = useState(0);

  return (
    <div className="h-screen bg-black flex justify-center items-center overflow-hidden">

      <div className="bg-[#111827] w-[380px] h-[700px] rounded-3xl shadow-2xl p-8 flex flex-col">

        <h1 className="text-5xl font-bold text-white text-center">
          🎵 Music Player
        </h1>

        <img
          src="https://picsum.photos/260"
          alt="cover"
          className="w-64 h-64 mx-auto mt-8 rounded-2xl object-cover"
        />

        <h2 className="text-4xl font-bold text-white text-center mt-8">
          {songs[currentSong].title}
        </h2>

        <p className="text-gray-400 text-center text-xl mt-2">
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