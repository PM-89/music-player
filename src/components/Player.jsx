import { useRef, useState, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaVolumeUp,
  FaDownload,
} from "react-icons/fa";

function Player({ songs, currentSong, setCurrentSong }) {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Set volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Play selected song automatically
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();

      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSong]);

  // Play / Pause
  const playPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  // Next Song
  const nextSong = () => {
    setCurrentSong((currentSong + 1) % songs.length);
  };

  // Previous Song
  const prevSong = () => {
    setCurrentSong((currentSong - 1 + songs.length) % songs.length);
  };

  // Seek Bar
  const handleSeek = (e) => {
    audioRef.current.currentTime = Number(e.target.value);
    setCurrentTime(Number(e.target.value));
  };

  // Time Format
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="mt-8">

      <audio
        ref={audioRef}
        src={songs[currentSong].src}
        onLoadedMetadata={() =>
          setDuration(audioRef.current.duration)
        }
        onTimeUpdate={() =>
          setCurrentTime(audioRef.current.currentTime)
        }
        onEnded={nextSong}
      />

      {/* Progress Bar */}

      <div className="mt-6">

        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full cursor-pointer"
        />

        <div className="flex justify-between text-sm mt-2 text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

      </div>

      {/* Controls */}

      <div className="flex justify-center items-center gap-8 mt-8">

        <button
          onClick={prevSong}
          className="text-3xl hover:text-blue-500 transition"
        >
          <FaStepBackward />
        </button>

        <button
          onClick={playPause}
          className="bg-blue-600 hover:bg-blue-700 p-5 rounded-full text-3xl transition"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        <button
          onClick={nextSong}
          className="text-3xl hover:text-blue-500 transition"
        >
          <FaStepForward />
        </button>

      </div>

      {/* Volume */}

      <div className="flex items-center gap-4 mt-8">

        <FaVolumeUp size={22} />

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-full cursor-pointer"
        />

      </div>

      {/* Download */}

      <div className="flex justify-center mt-8">

        <a
          href={songs[currentSong].src}
          download
          className="bg-green-600 hover:bg-green-700 p-4 rounded-full transition"
        >
          <FaDownload size={22} />
        </a>

      </div>

    </div>
  );
}

export default Player;