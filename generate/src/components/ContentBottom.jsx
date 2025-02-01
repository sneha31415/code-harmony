import React, { useState, useRef,useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeDown } from 'react-icons/fa';
import './ContentBottom.css'

export const ContentBottom = ({ audioFile }) => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioSrc, setAudioSrc] = useState(null); 

  // useEffect(() => {
  //   const fetchAudio = async () => {
  //     try {
  //       console.log("Fetching audio...");
  //       const response = await fetch("/audio1.mp3"); // Change to your API endpoint
  //       if (!response.ok) throw new Error("Failed to fetch audio");

  //       const blob = await response.blob();
  //       const url = URL.createObjectURL(blob); // Convert blob to a URL
  //       setAudioSrc(url); // Set fetched audio as source
  //       console.log("Audio successfully fetched:", url);
  //     } catch (error) {
  //       console.error("Error fetching audio:", error);
  //     }
  //   };

  //   fetchAudio();
  // }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Handle Play/Pause functionality
  const handlePlayPause = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  // Update the time as the audio plays
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  // Update the volume
  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
    audioRef.current.volume = e.target.value;
  };

  // Format the time for displaying
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // When the audio is loaded, set the duration
  const handleLoadedData = () => {
    setDuration(audioRef.current.duration);
  };

  return (
    
    <div className="simple-audio-player">
      <div>Original Song</div>
      <audio
        ref={audioRef}
        src={audioFile}
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={handleLoadedData}
      />

      <div className="controls">
        <button onClick={handlePlayPause}>
          {playing ? <FaPause /> : <FaPlay />}
        </button>
        <div className="progress-bar">
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={(e) => (audioRef.current.currentTime = e.target.value)}
          />
        </div>
        <div className="audio-info">
        <span>
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
        <div className="volume-control">
          <button onClick={() => handleVolumeChange({ target: { value: Math.max(volume - 0.1, 0) } })}>
            <FaVolumeDown />
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
          />
          <button onClick={() => handleVolumeChange({ target: { value: Math.min(volume + 0.1, 1) } })}>
            <FaVolumeUp />
          </button>
        </div>
      </div>
      
    </div>
  );
};



