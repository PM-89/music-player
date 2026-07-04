import { useRef, useState, useEffect } from "react";

export default function Player({ songs, currentSong, setCurrentSong }) {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);

  const song = songs[currentSong];

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.load();
    if (isPlaying) audioRef.current.play();
  }, [currentSong]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    setCurrentSong((prev) => (prev + 1) % songs.length);
  };

  const prevSong = () => {
    setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const onTimeUpdate = () => {
    const audio = audioRef.current;
    const value = (audio.currentTime / audio.duration) * 100;
    setProgress(value || 0);
  };

  const seek = (e) => {
    const value = e.target.value;
    const audio = audioRef.current;
    audio.currentTime = (value / 100) * audio.duration;
    setProgress(value);
  };

  return (
    <div className="w-full flex flex-col gap-4">

      <audio
        ref={audioRef}
        src={song.src}
        onTimeUpdate={onTimeUpdate}
        onEnded={nextSong}
      />

      {/* Progress */}
      <input
        type="range"
        value={progress}
        onChange={seek}
        className="w-full accent-blue-500"
      />

      {/* Controls */}
      <div className="flex justify-center items-center gap-6">

        <button onClick={prevSong} className="text-white text-2xl">
          ⏮
        </button>

        <button
          onClick={togglePlay}
          className="w-14 h-14 rounded-full bg-blue-600 text-white text-xl"
        >
          {isPlaying ? "⏸" : "▶"}
        </button>

        <button onClick={nextSong} className="text-white text-2xl">
          ⏭
        </button>

      </div>

      {/* Volume */}
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => {
          setVolume(e.target.value);
          audioRef.current.volume = e.target.value;
        }}
        className="w-full accent-blue-500"
      />

    </div>
  );
}