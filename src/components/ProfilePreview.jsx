import React from 'react';

export default function ProfilePreview({ profile, layout, onLayoutChange, onEdit }) {
  const { username, displayName, bio, avatar, banner, bannerColor, song, posts } = profile;

  return (
    <div className={`preview layout-${layout}`}>
      <div className="preview-toolbar">
        <select value={layout} onChange={e => onLayoutChange(e.target.value)} className="layout-select">
          <option value="instagram">📷 Instagram</option>
          <option value="twitter">🐦 Twitter</option>
          <option value="chaos">🧩 Chaos Grid</option>
        </select>
        <button className="btn btn-ghost" onClick={onEdit}>✏️ Edit</button>
      </div>

      {/* Banner */}
      <div
        className="preview-banner"
        style={{ background: banner ? `url(${banner}) center/cover` : (bannerColor || 'var(--surface2)') }}
      >
        <div className="preview-avatar-wrap">
          {avatar ? (
            <img src={avatar} alt="" className="preview-avatar" />
          ) : (
            <div className="preview-avatar preview-avatar-placeholder">👤</div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="preview-info">
        <h2 className="preview-name">{displayName || 'Display Name'}</h2>
        <span className="preview-handle">@{username || 'handle'}</span>
        <p className="preview-bio">{bio || 'No bio yet.'}</p>

        <div className="preview-stats">
          <span><strong>{posts.length}</strong> posts</span>
          <span><strong>{Math.floor(Math.random() * 5000)}</strong> followers</span>
          <span><strong>{Math.floor(Math.random() * 500)}</strong> following</span>
        </div>
      </div>

      {/* Now Playing */}
      {song?.name && (
        <div className="preview-song">
          {song.albumCover && <img src={song.albumCover} alt="" className="album-thumb" />}
          <span>🎧 Now Playing: <strong>{song.name}</strong> — {song.artist}</span>
        </div>
      )}

      {/* Posts Grid */}
      {posts.length > 0 && (
        <div className={`preview-posts grid-${layout}`}>
          {posts.map((p, i) => (
            <div key={p.id} className="preview-post" style={layout === 'chaos' ? {
              transform: `rotate(${(Math.random() - 0.5) * 12}deg)`,
              gridColumn: Math.random() > 0.7 ? 'span 2' : 'span 1',
            } : {}}>
              {p.image && <img src={p.image} alt="" />}
              {p.caption && <p className="post-overlay-caption">{p.caption}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}