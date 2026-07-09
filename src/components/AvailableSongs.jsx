
import { FaPlus, FaCheck } from "react-icons/fa";

function AvailableSongs({ songs, playlist, addToPlaylist }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-5 text-center">
        🎵 All Songs
      </h2>

      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {songs.map((song) => {
          const exists = playlist.some((item) => item.id === song.id);

          return (
            <div
              key={song.id}
              className="flex items-center justify-between bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition"
            >
              <div>
                <h3 className="font-semibold">{song.title}</h3>
                <p className="text-sm text-gray-400">
                  {song.artist}
                </p>
              </div>

              {exists ? (
                <button
                  disabled
                  className="bg-green-600 p-2 rounded-full cursor-not-allowed"
                >
                  <FaCheck />
                </button>
              ) : (
                <button
                  onClick={() => addToPlaylist(song)}
                  className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full"
                >
                  <FaPlus />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AvailableSongs;
