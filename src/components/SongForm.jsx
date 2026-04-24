import React from 'react';

export default function SongForm({ song, onChange }) {
  const update = (partial) => onChange({ ...song, ...partial });

  return (
    <section className="form-section">
      <h3>🎵 Now Playing</h3>
      <div className="form-grid">
        <label>
          <span>Song Name</span>
          <input value={song.name} onChange={e => update({ name: e.target.value })} placeholder="Blinding Lights" />
        </label>
        <label>
          <span>Artist</span>
          <input value={song.artist} onChange={e => update({ artist: e.target.value })} placeholder="The Weeknd" />
        </label>
        <label>
          <span>Album Cover (URL)</span>
          <input value={song.albumCover} onChange={e => update({ albumCover: e.target.value })} placeholder="https://..." />
        </label>
      </div>
      {song.name && (
        <div className="now-playing-preview">
          {song.albumCover && <img src={song.albumCover} alt="" className="album-thumb" />}
          <span>🎧 Now Playing: <strong>{song.name}</strong> — {song.artist}</span>
        </div>
      )}
    </section>
  );
}