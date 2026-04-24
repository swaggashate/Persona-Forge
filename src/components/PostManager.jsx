import React, { useState, useRef } from 'react';

export default function PostManager({ posts, onChange }) {
  const [image, setImage] = useState('');
  const [caption, setCaption] = useState('');
  const fileInput = useRef();

  const addPost = () => {
    if (!image && !caption) return;
    onChange([...posts, { id: crypto.randomUUID(), image, caption, createdAt: Date.now() }]);
    setImage('');
    setCaption('');
  };

  const removePost = (id) => onChange(posts.filter(p => p.id !== id));

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImage(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <section className="form-section">
      <h3>📸 Posts</h3>
      <div className="post-form">
        <input value={image} onChange={e => setImage(e.target.value)} placeholder="Image URL" />
        <button type="button" className="btn btn-sm btn-ghost" onClick={() => fileInput.current.click()}>Upload</button>
        <input ref={fileInput} type="file" accept="image/*" hidden onChange={handleUpload} />
        <input value={caption} onChange={e => setCaption(e.target.value)} placeholder="Caption" />
        <button className="btn btn-primary btn-sm" onClick={addPost}>+ Add</button>
      </div>

      {posts.length > 0 && (
        <div className="post-list">
          {posts.map((p, i) => (
            <div key={p.id} className="post-item">
              {p.image && <img src={p.image} alt="" className="post-thumb" />}
              <span className="post-caption">{p.caption || `Post ${i + 1}`}</span>
              <button className="btn btn-sm btn-danger" onClick={() => removePost(p.id)}>✕</button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}