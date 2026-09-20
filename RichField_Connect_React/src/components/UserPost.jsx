import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function Post({ post }) {
  const { dispatch } = useContext(AppContext);

  const handleLike = () => {
    dispatch({ type: 'TOGGLE_LIKE', payload: post.id });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch({ type: 'DELETE_POST', payload: post.id });
    }
  };

  return (
    <div className="post-card fade-in">
      <div className="post-header">
        <strong>{post.username}</strong>
        <span className="timestamp">{post.timestamp}</span>
      </div>
      <p className="post-content">{post.content}</p>
      <div className="post-actions">
        <button className={`btn-like ${post.liked ? 'liked' : ''}`} onClick={handleLike}>
          {post.liked ? '❤️ Liked' : '🤍 Like'} ({post.likes})
        </button>
        <button className="btn-delete" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}