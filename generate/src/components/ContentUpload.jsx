import React,{useState,useEffect} from 'react'
import './ContentUpload.css';
import { MdDelete } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import { FaShareAlt } from "react-icons/fa";
import { MdAddBox } from "react-icons/md";
import {HandleUpload} from './HandleUpload';
import { AudioPlayer } from './AudioPlayer';
import { PreviousCreation } from "./PreviousCreation";
import { AuthService } from "./AuthService";




export const ContentUpload = ({onFileUpload}) => {

const [selectedInstrument, setSelectedInstrument] = useState(""); // To store the selected instrument
const [generatedTrack, setGeneratedTrack] = useState(null); // To store the generated track
const [isLoading, setIsLoading] = useState(false); // Loading state
const [error, setError] = useState(null); // Error state

const files = [
  { name: "File1.mp3" },
  { name: "File2.mp3" },
  { name: "File3.mp3" },
];

const handleDownload = () => {
  if (generatedTrack && generatedTrack.url) {
    const a = document.createElement('a');
    a.href = generatedTrack.url;
    a.download = generatedTrack.name;
    a.click();
  }
};

const handleFileUpload = async (file) => {
  const token = AuthService.getToken();
  if (!token) {
    setError("Please log in to upload files");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("instrument", selectedInstrument);

  try {
    setIsLoading(true);
    const response = await fetch("http://localhost:3000/conversion/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
      setGeneratedTrack({ name: file.name, url: `http://localhost:3000/uploads/${data.processedFilePath}` });
    } else {
      setError(data.msg);
    }
  } catch (error) {
    setError("Upload failed");
  } finally {
    setIsLoading(false);
  }
};


// Handle instrument selection
const handleInstrumentChange = (event) => {
  setSelectedInstrument(event.target.value);
  setGeneratedTrack(null); // Clear previously generated track
};

// Simulate generating the track when both file and instrument are selected
useEffect(() => {
  const generateTrack = async () => {
    if (onFileUpload && selectedInstrument) {
      setIsLoading(true);
      setError(null);

      try {
        // Simulate track generation process
        const simulatedGeneratedTrack = {
          name: `Converted to ${selectedInstrument}`,
          url: URL.createObjectURL(onFileUpload), // Simulating a URL for the generated track
        };
        setTimeout(() => {
          setGeneratedTrack(simulatedGeneratedTrack);
          setIsLoading(false);
        }, 2000); // Simulating delay for track generation
      } catch (err) {
        setError("Failed to generate the track. Please try again.");
        setIsLoading(false);
      }
    }
  };

  generateTrack();

  
}, [onFileUpload, selectedInstrument]); 

  return (
    <div className="container">
        <div className="generate-section">
            <div className="generate-top">
                <div className="upload-left">
                    <div className="choose-instrument">
                    <h3>Choose Instrument</h3>
        {/* Dropdown or buttons to select instruments */}
        <select onChange={handleInstrumentChange} value={selectedInstrument}>
          <option value="piano">Piano</option>
          <option value="guitar">Guitar</option>
          <option value="violin">Violin</option>
        </select>
                    </div>
                    <div className="generate">
                        <button className="gen">GENERATE</button>
                    </div>

                </div>
                <div className="upload">
                        <HandleUpload onFileUpload={handleFileUpload}/>
                </div>
                
            </div>
            <div>
              
            </div>
            <div className="generated-preview">
                <div className="generated-track"><AudioPlayer/></div>
                <div className="handle-buttons">
                <button className="action"
                onClick={handleDownload}
                style={{
                    
      border: '2px solid #00d9ff',
      color: '#00d9ff',
      transition: 'all 0.3s ease',
      boxShadow: '0 0 10px rgba(0, 217, 255, 0.8)',
                }}
                onMouseEnter={(e) => (e.target.style.boxShadow = '0 0 20px rgba(0, 217, 255, 1)')}
    onMouseLeave={(e) => (e.target.style.boxShadow = '0 0 10px rgba(0, 217, 255, 0.8)')}
    >
                  Download
                <IoMdDownload />
                </button>
        <button className="action"
        style={{
          
border: '2px solid #FFFF33',
color: '#FFFF33',
transition: 'all 0.3s ease',
boxShadow: '0 0 10px rgba(255, 255, 51,0.8)',
      }}
      onMouseEnter={(e) => (e.target.style.boxShadow = '0 0 20px rgba(255, 255, 51,1)')}
onMouseLeave={(e) => (e.target.style.boxShadow = '0 0 10px rgba(255, 255, 51,0.8)')}>
          Share
          <FaShareAlt />
          </button>
        <button className="action"
        style={{
          
border: '2px solid #39FF14',
color: '#39FF14',
transition: 'all 0.3s ease',
boxShadow: '0 0 10px rgba(57, 255, 20,0.8)',
      }}
      onMouseEnter={(e) => (e.target.style.boxShadow = '0 0 20px rgba(57, 255, 20,1)')}
onMouseLeave={(e) => (e.target.style.boxShadow = '0 0 10px rgba(57, 255, 20,0.8)')}
        >
          Add to Playlist
          <MdAddBox />
          </button>
        <button className="action"
        style={{
          
border: '2px solid #FF073A',
color: '#FF073A',
transition: 'all 0.3s ease',
boxShadow: '0 0 10px rgba(255, 7, 58,0.8)',
      }}
      onMouseEnter={(e) => (e.target.style.boxShadow = '0 0 20px rgba(255, 7, 58,1)')}
onMouseLeave={(e) => (e.target.style.boxShadow = '0 0 10px rgba(255, 7, 58,0.8)')}
        >
          Delete
        <MdDelete />
        </button>
        </div>
        </div>
        </div>
        <div className="previous-creation"
        style={{background: "#1e1e1e"}}><PreviousCreation files={files} /></div>
    </div>
  )
}


