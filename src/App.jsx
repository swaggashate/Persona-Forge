import React, { useState, useEffect } from 'react';
import ProfileList from './components/ProfileList';
import ProfileEditor from './components/ProfileEditor';
import ProfilePreview from './components/ProfilePreview';
import { loadProfiles, saveProfiles, exportProfile, importProfile } from './utils/storage';

const THEMES = {
  dark: { '--bg': '#0d0d0d', '--surface': '#1a1a2e', '--surface2': '#16213e', '--accent': '#e94560', '--text': '#eee', '--text2': '#aaa', '--border': '#333' },
  neon: { '--bg': '#0a0a0a', '--surface': '#1b003a', '--surface2': '#2d004d', '--accent': '#00ff88', '--text': '#e0ffe0', '--text2': '#88ffbb', '--border': '#00ff8855' },
  vintage: { '--bg': '#f5f0e1', '--surface': '#fefcf3', '--surface2': '#f0e6ce', '--accent': '#b85c38', '--text': '#3c2a14', '--text2': '#7a5c3e', '--border': '#d4b896' },
  hacker: { '--bg': '#0c0c0c', '--surface': '#0f1a0f', '--surface2': '#142014', '--accent': '#00ff00', '--text': '#00ff00', '--text2': '#00aa00', '--border': '#00ff0033' },
};

function emptyProfile() {
  return {
    id: crypto.randomUUID(),
    username: '',
    displayName: '',
    bio: '',
    avatar: '',
    banner: '',
    bannerColor: '#1a1a2e',
    song: { name: '', artist: '', albumCover: '' },
    posts: [],
  };
}

export default function App() {
  const [profiles, setProfiles] = useState([]);
  const [current, setCurrent] = useState(null);
  const [mode, setMode] = useState('list'); // list | edit | preview
  const [theme, setTheme] = useState('dark');
  const [layout, setLayout] = useState('instagram');

  useEffect(() => {
    setProfiles(loadProfiles());
  }, []);

  useEffect(() => {
    const vars = THEMES[theme];
    if (vars) Object.entries(vars).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
  }, [theme]);

  const persist = (updated) => {
    setProfiles(updated);
    saveProfiles(updated);
  };

  const handleNew = () => {
    const p = emptyProfile();
    setCurrent(p);
    setMode('edit');
  };

  const handleEdit = (profile) => {
    setCurrent({ ...profile, posts: profile.posts.map(p => ({ ...p })), song: { ...profile.song } });
    setMode('edit');
  };

  const handleView = (profile) => {
    setCurrent(profile);
    setMode('preview');
  };

  const handleDelete = (id) => {
    persist(profiles.filter(p => p.id !== id));
    if (current?.id === id) { setCurrent(null); setMode('list'); }
  };

  const handleSave = (profile) => {
    const exists = profiles.find(p => p.id === profile.id);
    const updated = exists ? profiles.map(p => p.id === profile.id ? profile : p) : [...profiles, profile];
    persist(updated);
    setCurrent(profile);
    setMode('preview');
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const profile = await importProfile(file);
      persist([...profiles, profile]);
    } catch (err) {
      alert(err.message);
    }
    e.target.value = '';
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="logo">🎭 PersonaForge</h1>
        <div className="header-controls">
          <select value={theme} onChange={e => setTheme(e.target.value)} className="theme-select">
            {Object.keys(THEMES).map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
          </select>
          {mode !== 'list' && (
            <button className="btn btn-ghost" onClick={() => { setMode('list'); setCurrent(null); }}>← Library</button>
          )}
        </div>
      </header>

      <main className="app-main">
        {mode === 'list' && (
          <ProfileList
            profiles={profiles}
            onNew={handleNew}
            onEdit={handleEdit}
            onView={handleView}
            onDelete={handleDelete}
            onExport={exportProfile}
            onImport={handleImport}
          />
        )}
        {mode === 'edit' && current && (
          <ProfileEditor
            profile={current}
            onChange={setCurrent}
            onSave={handleSave}
            onPreview={() => setMode('preview')}
          />
        )}
        {mode === 'preview' && current && (
          <ProfilePreview
            profile={current}
            layout={layout}
            onLayoutChange={setLayout}
            onEdit={() => setMode('edit')}
          />
        )}
      </main>
    </div>
  );
}