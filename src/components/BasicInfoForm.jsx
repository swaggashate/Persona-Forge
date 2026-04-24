import React, { useRef } from 'react';

export default function BasicInfoForm({ profile, onChange }) {
  const avatarInput = useRef();
  const bannerInput = useRef();

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onChange({ [field]: ev.target.result });
    reader.readAsDataURL(file);
  };

  return (
    <section className="form-section">
      <h3>👤 Basic Info</h3>
      <div className="form-grid">
        <label>
          <span>Username</span>
          <div className="input-with-prefix">
            <span className="prefix">@</span>
            <input
              value={profile.username}
              onChange={e => onChange({ username: e.target.value.replace(/\s/g, '').toLowerCase() })}
              placeholder="handle"
            />
          </div>
        </label>
        <label>
          <span>Display Name</span>
          <input value={profile.displayName} onChange={e => onChange({ displayName: e.target.value })} placeholder="Your Name" />
        </label>
        <label className="full-width">
          <span>Bio</span>
          <textarea value={profile.bio} onChange={e => onChange({ bio: e.target.value })} placeholder="Tell the world about this persona…" rows={3} />
        </label>
        <label>
          <span>Avatar (URL)</span>
          <input value={profile.avatar} onChange={e => onChange({ avatar: e.target.value })} placeholder="https://..." />
          <button type="button" className="btn btn-sm btn-ghost" onClick={() => avatarInput.current.click()}>or Upload</button>
          <input ref={avatarInput} type="file" accept="image/*" hidden onChange={e => handleFileUpload(e, 'avatar')} />
        </label>
        <label>
          <span>Banner (URL)</span>
          <input value={profile.banner} onChange={e => onChange({ banner: e.target.value })} placeholder="https://..." />
          <button type="button" className="btn btn-sm btn-ghost" onClick={() => bannerInput.current.click()}>or Upload</button>
          <input ref={bannerInput} type="file" accept="image/*" hidden onChange={e => handleFileUpload(e, 'banner')} />
        </label>
        <label>
          <span>Banner Color (fallback)</span>
          <input type="color" value={profile.bannerColor || '#1a1a2e'} onChange={e => onChange({ bannerColor: e.target.value })} />
        </label>
      </div>
    </section>
  );
}