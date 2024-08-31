// src/components/common/AuthLoader.jsx
import React from 'react';
import './AuthLoader.css'; // Import the CSS file for the loader styles

const AuthLoader = ({ small = false }) => {
  return (
    <div className={`authLoader ${small ? 'small' : ''}`}>
      <div className="spinner"></div>
    </div>
  );
};

export default AuthLoader;
