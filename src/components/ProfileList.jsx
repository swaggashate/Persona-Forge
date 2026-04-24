import React from 'react';

export default function ProfileList({ profiles, onNew, onEdit, onView, onDelete, onExport, onImport }) {
  return (
    <div className="profile-list">
      <div className="list-header">
        <h2>📂 Profile Library</h2>
        <div className="list-actions">
          <button className="btn btn-primary" onClick={onNew}>+ New Profile</button>
          <label className="btn btn-ghost import-btn">
            📥 Import
            <input type="file" accept=".json" onChange={onImport} hidden />
          </label>
        </div>
      </div>

      {profiles.length === 0 ? (
        <div className="empty-state">
          <p>🎭 No profiles yet. Create your first persona!</p>
        </div>
      ) : (
        <div className="profile-grid">
          {profiles.map(p => (
            <div key={p.id} className="profile-card" style={{ borderColor: 'var(--accent)' }}>
              <div
                className="card-banner"
                style={{
                  background: p.banner ? `url(${p.banner}) center/cover` : (p.bannerColor || 'var(--surface2)'),
                }}
              >
                {p.avatar ? (
                  <img src={p.avatar} alt="" className="card-avatar" />
                ) : (
                  <div className="card-avatar card-avatar-placeholder">👤</div>
                )}
              </div>
              <div className="card-body">
                <h3>{p.displayName || 'Unnamed'}</h3>
                <span className="handle">@{p.username || '???'}</span>
                <p className="card-bio">{p.bio?.slice(0, 60)}{p.bio?.length > 60 ? '…' : ''}</p>
                <div className="card-meta">
                  <span>{p.posts?.length || 0} posts</span>
                  {p.song?.name && <span>🎧 {p.song.name}</span>}
                </div>
              </div>
              <div className="card-actions">
                <button className="btn btn-sm" onClick={() => onView(p)}>👁 View</button>
                <button className="btn btn-sm" onClick={() => onEdit(p)}>✏️ Edit</button>
                <button className="btn btn-sm" onClick={() => onExport(p)}>💾 Export</button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(p.id)}>🗑</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}