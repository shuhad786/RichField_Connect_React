import React from 'react';

export default function ProfilePreview({ formData }) {
  return (
    <div className="profile-preview-card">
      <h3>Live Profile Preview</h3>
      <p><strong>Name:</strong> {formData.fullName || '—'}</p>
      <p><strong>Campus:</strong> {formData.campus || '—'}</p>
      <p><strong>Bio:</strong> {formData.bio || '—'}</p>
      <div className="tags-container">
        {formData.interests.map(interest => (
          <span key={interest} className="tag-badge">{interest}</span>
        ))}
      </div>
    </div>
  );
}