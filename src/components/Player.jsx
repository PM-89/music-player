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

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();

      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSong]);

  const playPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    setCurrentSong((currentSong + 1) % songs.length);
  };

  const prevSong = () => {
    setCurrentSong((currentSong - 1 + songs.length) % songs.length);
  };

  const seekSong = (e) => {
    const time = Number(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";

    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);

    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div className="mt-10">

      <audio
        ref={audioRef}
        src={songs[currentSong].src}
        onLoadedMetadata={() => setDuration(audioRef.current.duration)}
        onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
        onEnded={nextSong}
      />

      {/* Progress Bar */}

      <input
        type="range"
        min="0"
        max={duration || 0}
        value={currentTime}
        onChange={seekSong}
        className="w-full accent-blue-600 cursor-pointer"
      />

      <div className="flex justify-between text-gray-400 mt-2">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Controls */}

      <div className="flex justify-center items-center gap-10 mt-10">

        <button
          onClick={prevSong}
          className="text-4xl text-white hover:text-blue-500"
        >
          <FaStepBackward />
        </button>

        <button
          onClick={playPause}
          className="bg-blue-600 p-6 rounded-full text-4xl hover:bg-blue-700"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        <button
          onClick={nextSong}
          className="text-4xl text-white hover:text-blue-500"
        >
          <FaStepForward />
        </button>

      </div>

      {/* Volume */}

      <div className="flex items-center gap-5 mt-10">

        <FaVolumeUp className="text-2xl text-white"/>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-full accent-blue-600"
        />

      </div>

      {/* Download */}

      <div className="flex justify-center mt-10">

        <a
          href={songs[currentSong].src}
          download
          className="bg-green-600 p-4 rounded-full hover:bg-green-700"
        >
          <FaDownload className="text-2xl text-white"/>
        </a>

      </div>

    </div>
  );
}

export default Player;