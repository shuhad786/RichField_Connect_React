import React from 'react';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Richfield Connect. All rights reserved.</p>
        <p className="footer-subtext">Connecting Higher Education Students Across Campuses</p>
      </div>
    </footer>
  );
}