import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function Post({ post }) {
  const { dispatch } = useContext(AppContext);

  // Return early if post is somehow missing to prevent runtime crashes
  if (!post) return null;

  // Safely resolve the author display name regardless of property naming
  const authorName = post.username || post.authorName || post.author || 'Anonymous Student';

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
        <strong>{authorName}</strong>
        <span className="timestamp">{post.timestamp || 'Just now'}</span>
      </div>
      <p className="post-content">{post.content}</p>
      <div className="post-actions">
        <button 
          className={`btn-like ${post.liked ? 'liked' : ''}`} 
          onClick={handleLike}
        >
          {post.liked ? '❤️ Liked' : '🤍 Like'} ({post.likes ?? 0})
        </button>
        <button className="btn-delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}