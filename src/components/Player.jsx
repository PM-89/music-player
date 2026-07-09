
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

  // Load new song
  useEffect(() => {
    if (songs.length === 0 || !audioRef.current) return;

    audioRef.current.load();
    setCurrentTime(0);

    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    }
  }, [currentSong, songs]);

  // Play / Pause
  const playPause = () => {
    if (songs.length === 0) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  // Next Song
  const nextSong = () => {
    if (songs.length === 0) return;

    setCurrentSong((prev) => (prev + 1) % songs.length);
  };

  // Previous Song
  const prevSong = () => {
    if (songs.length === 0) return;

    setCurrentSong((prev) =>
      prev === 0 ? songs.length - 1 : prev - 1
    );
  };

  // Seek
  const handleSeek = (e) => {
    const value = Number(e.target.value);

    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  // Format Time
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";

    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);

    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  if (songs.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-400">
        Add songs to the playlist.
      </div>
    );
  }

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

      <input
        type="range"
        min="0"
        max={duration || 0}
        value={currentTime}
        onChange={handleSeek}
        className="w-full cursor-pointer"
      />

      <div className="flex justify-between text-sm text-gray-400 mt-2">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Controls */}

      <div className="flex justify-center items-center gap-8 mt-8">

        <button
          onClick={prevSong}
          className="text-3xl hover:text-blue-500"
        >
          <FaStepBackward />
        </button>

        <button
          onClick={playPause}
          className="bg-blue-600 hover:bg-blue-700 p-5 rounded-full text-3xl"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        <button
          onClick={nextSong}
          className="text-3xl hover:text-blue-500"
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
          className="bg-green-600 hover:bg-green-700 p-4 rounded-full"
        >
          <FaDownload size={22} />
        </a>

      </div>

    </div>
  );
}

export default Player;
