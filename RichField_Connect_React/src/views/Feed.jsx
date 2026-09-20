import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import CreatePost from '../components/Post';
import Post from '../components/Post';

export default function Feed() {
  const { state } = useContext(AppContext);

  return (
    <div className="feed-container">
      <h2>Campus Activity Feed</h2>
      <CreatePost />
      <div className="posts-list">
        {state.posts.length === 0 ? (
          <p>No posts yet. Be the first to post!</p>
        ) : (
          state.posts.map(post => <Post key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}