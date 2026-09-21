import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function CreatePost() {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const { state, dispatch } = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError('Post content cannot be empty.');
      return;
    }

    const newPost = {
      id: Date.now(),
      username: state.user?.fullName || 'Anonymous Student',
      timestamp: new Date().toLocaleString(),
      content,
      likes: 0,
      liked: false
    };

    dispatch({ type: 'ADD_POST', payload: newPost });
    setContent('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="create-post-card">
      <textarea
        placeholder="Share thoughts or academic updates..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      {error && <span className="error-text">{error}</span>}
      <button type="submit" className="btn-primary">Publish Post</button>
    </form>
  );
}