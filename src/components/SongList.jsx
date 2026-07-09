
import { FaTrash, FaMusic } from "react-icons/fa";

function SongList({
  songs,
  currentSong,
  setCurrentSong,
  removeSong,
}) {
  if (songs.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-5 text-center">
          📃 Playlist
        </h2>

        <div className="text-center text-gray-400 mt-10">
          Playlist is empty
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5 text-center">
        📃 Playlist ({songs.length})
      </h2>

      <div className="space-y-3 max-h-[600px] overflow-y-auto">

        {songs.map((song, index) => (
          <div
            key={song.id}
            className={`flex items-center justify-between p-3 rounded-lg transition ${
              currentSong === index
                ? "bg-blue-600"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            {/* Play Song */}
            <div
              className="flex items-center gap-3 flex-1 cursor-pointer"
              onClick={() => setCurrentSong(index)}
            >
              <FaMusic />

              <div>
                <h3 className="font-semibold">
                  {song.title}
                </h3>

                <p className="text-sm text-gray-300">
                  {song.artist}
                </p>
              </div>
            </div>

            {/* Remove Song */}
            <button
              onClick={() => removeSong(song.id)}
              className="bg-red-600 hover:bg-red-700 p-2 rounded-full"
            >
              <FaTrash />
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}

export default SongList;
