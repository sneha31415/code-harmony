import React, { useState } from "react";
import './HandleUpload.css'

export const HandleUpload = ({ onFileUpload }) => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      onFileUpload(file);
    }
  };

  return (
    <div className="upload-section">
      <label htmlFor="file-upload" className="upload-label">
        Upload Audio File
        <input
          type="file"
          id="file-upload"
          accept="audio/*"
          onChange={handleFileUpload}
          className="upload-input"
        />
      </label>
      {uploadedFile && (
        <div className="file-info">
          <p>Uploaded File: <strong>{uploadedFile.name}</strong></p>
        </div>
      )}
    </div>
  );
}
