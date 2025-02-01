import React from 'react';

export const ContentHeader = () => {
  return (
    <div className="header">
        <div className="title"><h1>DASHBOARD</h1></div>
        <div className="welcome"><h3>Welcome, []! Ready to create some music?</h3></div>
        <div className="profile-section">
      <div className="profile-container">
        <div className="profile-pic">
          <img
            src="src/assets/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg" // Fallback image
            alt="Profile"
          />
        </div>
        <div className="profile-details">
          <p className="profile-name">name</p>
          <button className="edit-profile-btn">Edit Profile</button>
        </div>
      </div>
    </div>
        
    </div>
  )
}
