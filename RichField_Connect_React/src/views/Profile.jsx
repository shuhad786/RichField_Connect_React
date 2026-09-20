import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { state } = useContext(AppContext);
  const { user } = state;

  if (!user) {
    return (
      <div className="profile-card">
        <h2>No Profile Found</h2>
        <p>You haven't registered yet. Please create a profile first.</p>
        <Link to="/signup" className="btn-primary">Go to Registration</Link>
      </div>
    );
  }

  return (
    <div className="profile-card">
      <h2>Student Profile</h2>
      <p><strong>Name:</strong> {user.fullName}</p>
      <p><strong>Student Number:</strong> {user.studentNumber}</p>
      <p><strong>Campus:</strong> {user.campus}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Bio:</strong> {user.bio}</p>
      <div>
        <strong>Interests:</strong>
        <div className="tags-container">
          {user.interests.map(interest => (
            <span key={interest} className="tag-badge">{interest}</span>
          ))}
        </div>
      </div>
    </div>
  );
}