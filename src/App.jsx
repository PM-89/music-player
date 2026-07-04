import { useState } from "react";
import songs from "./data/songs";
import Player from "./components/Player";

function App() {
  const [currentSong, setCurrentSong] = useState(0);

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center">

      <div className="bg-gray-900 p-10 rounded-3xl w-[400px] shadow-lg">

        <h1 className="text-3xl font-bold text-center">
          🎵 Music Player
        </h1>

        <div className="mt-8 flex justify-center">

          <img
            src="https://picsum.photos/250"
            alt="cover"
            className="rounded-xl"
          />

        </div>

        <h2 className="text-3xl text-center mt-8 font-bold">
          {songs[currentSong].title}
        </h2>

        <p className="text-center text-gray-400 mt-2">
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