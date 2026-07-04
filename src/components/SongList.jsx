function SongList({ songs, currentSong, setCurrentSong }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-3">Songs</h2>

      {songs.map((song, index) => (
        <div
          key={song.id}
          onClick={() => setCurrentSong(index)}
          className={`p-3 rounded-lg mb-2 cursor-pointer ${
            currentSong === index
              ? "bg-blue-500 text-white"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          <h3>{song.title}</h3>
          <p className="text-sm">{song.artist}</p>
        </div>
      ))}
    </div>
  );
}

export default SongList;