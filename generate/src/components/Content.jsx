import React ,{useState} from 'react'
import { ContentHeader } from './ContentHeader'
import {ContentUpload} from './ContentUpload'
import {ContentBottom} from './ContentBottom'
import './Content.css';

export const Content = () => {
  const [uploadedFile, setUploadedFile] = useState(null); // To store the uploaded file

  // Callback function to handle the uploaded file
  const handleFileUpload = (file) => {
    setUploadedFile(file);
    console.log('Uploaded file:', file); // You can use the file here
  };
  return (
    <div className="content-section">
      <ContentHeader/>
      <ContentUpload onFileUpload={handleFileUpload} />
      {uploadedFile ? (
        <ContentBottom audioFile={URL.createObjectURL(uploadedFile)} />
      ) : (
        <div className="upload-placeholder">
          <p>Upload a song to get started</p>
        </div>
      )}
    </div>
  )
}
