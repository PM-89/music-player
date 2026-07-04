import { useState } from "react";
import songs from "./data/songs";
import Player from "./components/Player";
import "./styles.css";

export default function App() {
  const [currentSong, setCurrentSong] = useState(0);

  const song = songs[currentSong];

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center overflow-hidden">

      <div className="w-[360px] h-[620px] bg-[#111827] rounded-3xl shadow-2xl p-6 flex flex-col">

        {/* Title */}
        <h1 className="text-white text-2xl font-bold text-center mb-4">
          Music Player
        </h1>

        {/* Album */}
        <div className="flex justify-center">
          <img
            src={`https://picsum.photos/300?random=${currentSong}`}
            className="w-48 h-48 rounded-2xl object-cover shadow-lg"
          />
        </div>

        {/* Song Info */}
        <div className="text-center mt-4">
          <h2 className="text-white text-xl font-semibold">
            {song.title}
          </h2>
          <p className="text-gray-400 text-sm">
            {song.artist}
          </p>
        </div>

        {/* Player */}
        <div className="mt-auto">
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