import React from 'react';
import BasicInfoForm from './BasicInfoForm';
import SongForm from './SongForm';
import PostManager from './PostManager';

export default function ProfileEditor({ profile, onChange, onSave, onPreview }) {
  const update = (partial) => onChange({ ...profile, ...partial });

  return (
    <div className="editor">
      <div className="editor-header">
        <h2>✏️ {profile.username ? `Editing @${profile.username}` : 'New Profile'}</h2>
        <div className="editor-actions">
          <button className="btn btn-ghost" onClick={onPreview}>👁 Preview</button>
          <button className="btn btn-primary" onClick={() => onSave(profile)}>💾 Save</button>
        </div>
      </div>

      <div className="editor-sections">
        <BasicInfoForm profile={profile} onChange={update} />
        <SongForm song={profile.song} onChange={(song) => update({ song })} />
        <PostManager posts={profile.posts} onChange={(posts) => update({ posts })} />
      </div>
    </div>
  );
}