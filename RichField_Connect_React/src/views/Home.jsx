import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Richfield Connect</h1>
      <p>The central hub for students to connect, share updates, and collaborate across campuses.</p>
      <div className="cta-buttons">
        <Link to="/signup" className="btn-primary">Register Now</Link>
        <Link to="/feed" className="btn-secondary">Explore Feed</Link>
      </div>
    </div>
  );
}