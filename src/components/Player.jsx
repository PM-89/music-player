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

  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();

      if (playing) {
        audioRef.current.play();
      }
    }
  }, [currentSong]);

  const playPause = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setPlaying(!playing);
  };

  const nextSong = () => {
    setCurrentSong((currentSong + 1) % songs.length);
  };

  const prevSong = () => {
    setCurrentSong((currentSong - 1 + songs.length) % songs.length);
  };

  const seekSong = (e) => {
    const value = Number(e.target.value);
    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";

    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);

    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div className="w-full">

      <audio
        ref={audioRef}
        src={songs[currentSong].src}
        onLoadedMetadata={() => setDuration(audioRef.current.duration)}
        onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
        onEnded={nextSong}
      />

      {/* Progress */}

      <input
        type="range"
        min="0"
        max={duration || 0}
        value={currentTime}
        onChange={seekSong}
        className="w-full accent-blue-500 cursor-pointer"
      />

      <div className="flex justify-between text-gray-400 text-sm mt-1">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Controls */}

      <div className="flex justify-center items-center gap-8 mt-8">

        <button
          onClick={prevSong}
          className="text-white text-3xl hover:text-blue-500 transition"
        >
          <FaStepBackward />
        </button>

        <button
          onClick={playPause}
          className="w-20 h-20 rounded-full bg-blue-600 hover:bg-blue-700 flex justify-center items-center text-white text-3xl shadow-xl"
        >
          {playing ? <FaPause /> : <FaPlay />}
        </button>

        <button
          onClick={nextSong}
          className="text-white text-3xl hover:text-blue-500 transition"
        >
          <FaStepForward />
        </button>

      </div>

      {/* Volume */}

      <div className="flex items-center gap-3 mt-8">

        <FaVolumeUp className="text-white text-xl" />

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="flex-1 accent-blue-500"
        />

      </div>

      {/* Download */}

      <div className="flex justify-center mt-8">

        <a
          href={songs[currentSong].src}
          download
          className="w-12 h-12 rounded-full bg-green-600 hover:bg-green-700 flex justify-center items-center"
        >
          <FaDownload className="text-white text-xl" />
        </a>

      </div>

    </div>
  );
}

export default Player;