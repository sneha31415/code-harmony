// import React,{useRef,useState,useEffect} from 'react';
// import WaveSurfer from 'wavesurfer.js';
// import { FaPlay,FaPause,IoPlayBack,IoPlayForward,FaVolumeUp,FaVolumeDown } from "react-icons/fa";

// const formWaveSurferOptions = (ref) => ({
//     container:ref,
//     waveColor: '#ccc',
//     progressColor:'#0178ff',
//     cursorColor: 'transparent',
//     responsive:true,
//     height: 80,
//     normalize: true,
//     backend:'WebAudio',
//     barWidth:2,
//     barGap:3,
// })
// console.log('Wavesurfer initialized:', formWaveSurferOptions);



// function formatTime(seconds) {
//   let date=new Date(0);
//   date.setSeconds(seconds);
//   return date.toISOString().substr(11,8);
// }

// export const AudioPlayer = ({audioFile}) => {
//     const waveformRef= useRef(null);
//     const wavesurfer = useRef(null);
//     const [playing, setPlaying] = useState(false);
//     const [volume, setVolume] = useState(0.5);
//     const [muted, setMuted] = useState(false);
//     const [duration,setDuration] = useState(0);
//     const [currentTime, setCurrentTime] = useState(0);
//     const [audioFileName, setAudioFileName] = useState('');

//     useEffect(()=>{

//       const options = formWaveSurferOptions(waveformRef.current);
//       wavesurfer.current = WaveSurfer.create(options);

//       wavesurfer.current.load(audioFile);

//       wavesurfer.current.on('ready',()=> {
//         setVolume(wavesurfer.current.getVolume());
//         setDuration(wavesurfer.current.getDuration());
//         setAudioFileName(audioFileName.split('/').pop());
//       });

//       wavesurfer.current.on('audioprocess',() =>{
//         setCurrentTime(wavesurfer.current.getCurrentTime());
//       });

//       return () => {
//         wavesurfer.current.un('audioprocess');
//         wavesurfer.current.un('ready');
//         wavesurfer.current.destroy();
//       };

//     }, [{audioFile}]);

//     const handlePlayPause = () => {
//       setPlaying(!playing);
//       wavesurfer.current.playPause();
//     };

//     const handleVolumeChange = (newVolume) => {
//       setVolume(newVolume);
//       wavesurfer.current.setVolume(newVolume);
//       setMuted(newVolume === 0);
//     };

//     const handleVolumeUp = () => {
//         handleVolumeChange(Math.min(volume+0.1,1));
//     };

//     const handleVolumeDown = () => {
//       handleVolumeChange(Math.min(volume-0.1,1));
//   };
    

//   return (
//     <div id='waveform' ref={waveformRef} style={{width:'100%'}}>
//         <div className='controls'>
//             <button onClick={handlePlayPause}>
//             {playing ? <FaPause /> : <FaPlay />}
//             </button>
//             <input 
//             type='range'
//             id='volume'
//             name='volume'
//             min='0'
//             max='1'
//             step='0.1'
//             value={muted ? 0:volume}
//             onChange={(e)=>handleVolumeChange(parseFloat(e.target.value))}
//             />
//             <button onClick={handleVolumeDown}>
//             <FaVolumeDown />
//             </button>
//             <button onClick={handleVolumeUp}>
//             <FaVolumeUp />
//             </button>
//         </div>
//         <div className='audio-info'>
//         <span>
//           Playing: {audioFileName} <br/>
//         </span>
//         <span>
//           Duration:{formatTime(duration)} | Current Time:{' '}
//           {formatTime(currentTime)} <br/>
//         </span>
//         <span>
//           Volume: {Math.round(volume*100)}%
//         </span>
//     </div>
//     </div>
//   )
// }


// import React, { useRef, useState, useEffect } from 'react';
// import WaveSurfer from 'wavesurfer.js';
// import { FaPlay, FaPause, FaVolumeUp, FaVolumeDown } from 'react-icons/fa';
// import './AudioPlayer.css';

// export const AudioPlayer = ({ audioFile }) => {
//   const waveformRef = useRef(null);
//   const wavesurfer = useRef(null);
//   const audioRef = useRef(null)
//   const [playing, setPlaying] = useState(false);
//   const [volume, setVolume] = useState(0.5);
//   const [muted, setMuted] = useState(false);
//   const [duration, setDuration] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [audiofile, setAudioFile] = useState();

//   useEffect(() => {
//       if (audioRef.current) {
//         audioRef.current.volume = volume;
//       }
//     }, [volume]);

//   useEffect(() => {
//     const options = {
//       container: waveformRef.current,
//       waveColor: '#ccc',
//       progressColor: '#0178ff',
//       cursorColor: 'transparent',
//       responsive: true,
//       height: 80,
//       normalize: true,
//       backend: 'WebAudio',
//       barWidth: 2,
//       barGap: 3,
//     };

//     wavesurfer.current = WaveSurfer.create(options);
    
//       console.log(waveformRef.current);
//       wavesurfer.current.load(audiofile);


//     wavesurfer.current.on('audioprocess', () => {
//       setCurrentTime(wavesurfer.current.getCurrentTime());
//     });

    
    
//     fetch('/assets/audio1.mp3')
//       .then((response) => response.blob())
//       .then((blob) => {
//         const audioUrl = URL.createObjectURL(blob);
//         setAudioFile(audioUrl);
//       })
//       .catch((error) => {
//         console.error('Error loading audio file:', error);
//       });


//       return () => {
//         wavesurfer.current.destroy();
//       };
      
    
//   }, [audiofile]);


//   const handlePlayPause = () => {
//     setPlaying(!playing);
//     wavesurfer.current.playPause();
//   };

//   const handleVolumeChange = (newVolume) => {
//     setVolume(newVolume);
//     wavesurfer.current.setVolume(newVolume);
//     setMuted(newVolume === 0);
//   };

//   const handleVolumeUp = () => {
//     handleVolumeChange(Math.min(volume + 0.1, 1));
//   };

//   const handleVolumeDown = () => {
//     handleVolumeChange(Math.max(volume - 0.1, 0));
//   };

//   const formatTime = (seconds) => {
//     let date = new Date(0);
//     date.setSeconds(seconds);
//     return date.toISOString().substr(11, 8);
//   };

//   return (
//     <div className="hold">
//       <div ref={waveformRef} style={{ width: '100%' }} />
//       <div className="controls">
//         <button onClick={handlePlayPause}>
//           {playing ? <FaPause /> : <FaPlay />}
//         </button>
//         <input
//           type="range"
//           min="0"
//           max="1"
//           step="0.1"
//           value={muted ? 0 : volume}
//           onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
//         />
//         <button onClick={handleVolumeDown}>
//           <FaVolumeDown />
//         </button>
//         <button onClick={handleVolumeUp}>
//           <FaVolumeUp />
//         </button>
//       </div>
//       <div className="audio-info">
//         <span>
//           Duration: {formatTime(duration)} | Current Time: {formatTime(currentTime)}
//         </span>
//       </div>
//     </div>
//   );
// };


// import React, { useState, useRef, useEffect } from 'react';
// import WaveSurfer from 'wavesurfer.js';
// import { FaPlay, FaPause, FaVolumeUp, FaVolumeDown } from 'react-icons/fa';
// import './AudioPlayer.css';

// export const AudioPlayer = () => {
//   const containerRef = useRef(null);
//   const waveformRef = useRef(null);
  
  
//   const [playing, setPlaying] = useState(false);
//   const [volume, setVolume] = useState(0.5);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);

  

//   useEffect(() => {
//     if (!containerRef.current) return;

//     const wavesurfer = WaveSurfer.create({
//       container: containerRef.current,
//       waveColor: '#ccc',
//       progressColor: '#0178ff',
//       cursorColor: 'transparent',
//       responsive: true,
//       height: 80,
//       normalize: true,
//       backend: 'MediaElement',
//       barWidth: 2,
//       barGap: 3,
//     });

//     waveformRef.current = wavesurfer;

    

//     wavesurfer.on('ready', () => {
//       setDuration(wavesurfer.current.getDuration());
//     });

//     wavesurfer.on('audioprocess', () => {
//       setCurrentTime(wavesurfer.current.getCurrentTime());
//     });

//     return () => {
//       wavesurfer.destroy();
//     };
//   }, []);

//   useEffect(() =>{
//     const fetchAudio= async () => {
//       try {
//         const response = await fetch('/audio1.mp3');
//         const blob = await response.blob();
//         waveformRef.current.loadBlob(blob);
//       }
//       catch (error) {
//         console.error("Error fetching audio:", error);
//       }
      
//     };
//     fetchAudio();

//   },[]);

//   const handlePlayPause = () => {
//     if (waveformRef.current) {
//       waveformRef.current.playPause();
//       setPlaying(!playing);
//     }
//   };

//   const handleVolumeChange = (e) => {
//     const newVolume = parseFloat(e.target.value);
//     setVolume(newVolume);
//     if (waveformRef.current) {
//       waveformRef.current.setVolume(newVolume);
//     }
//   };

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = Math.floor(seconds % 60);
//     return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
//   };

//   return (
//     <div className="simple-audio-player">
//       <div ref={waveformRef} className="waveform"></div>

//       <div className="controls">
//         <button onClick={handlePlayPause}>
//           {playing ? <FaPause /> : <FaPlay />}
//         </button>
        
//         <div className="audio-info">
//           <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
//         </div>

//         <div className="volume-control">
//           <button onClick={() => setVolume(Math.max(volume - 0.1, 0))}>
//             <FaVolumeDown />
//           </button>
//           <input
//             type="range"
//             min="0"
//             max="1"
//             step="0.1"
//             value={volume}
//             onChange={handleVolumeChange}
//           />
//           <button onClick={() => setVolume(Math.min(volume + 0.1, 1))}>
//             <FaVolumeUp />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };




// import React, { useState, useRef,useEffect } from 'react';
// import { FaPlay, FaPause, FaVolumeUp, FaVolumeDown } from 'react-icons/fa';
// import './AudioPlayer.css'

// export const  AudioPlayer = ({ audioFile }) => {
//   const audioRef = useRef(null);
//   const [playing, setPlaying] = useState(false);
//   const [volume, setVolume] = useState(0.5);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [audioSrc, setAudioSrc] = useState(null); 

//   useEffect(() => {
//     const fetchAudio = async () => {
//       try {
//         console.log("Fetching audio...");
//         const response = await fetch("/audio1.mp3"); // Change to your API endpoint
//         if (!response.ok) throw new Error("Failed to fetch audio");

//         const blob = await response.blob();
//         const url = URL.createObjectURL(blob); // Convert blob to a URL
//         setAudioSrc(url); // Set fetched audio as source
//         console.log("Audio successfully fetched:", url);
//       } catch (error) {
//         console.error("Error fetching audio:", error);
//       }
//     };

//     fetchAudio();
//   }, []);

//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.volume = volume;
//     }
//   }, [volume]);

//   // Handle Play/Pause functionality
//   const handlePlayPause = () => {
//     if (playing) {
//       audioRef.current.pause();
//     } else {
//       audioRef.current.play();
//     }
//     setPlaying(!playing);
//   };

//   // Update the time as the audio plays
//   const handleTimeUpdate = () => {
//     setCurrentTime(audioRef.current.currentTime);
//   };

//   // Update the volume
//   const handleVolumeChange = (e) => {
//     setVolume(e.target.value);
//     audioRef.current.volume = e.target.value;
//   };

//   // Format the time for displaying
//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = Math.floor(seconds % 60);
//     return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
//   };

//   // When the audio is loaded, set the duration
//   const handleLoadedData = () => {
//     setDuration(audioRef.current.duration);
//   };

//   return (
    
//     <div className="simple-audio-player">
//       <div>Generated Track </div>
//       <audio
//         ref={audioRef}
//         src={audioSrc}
//         onTimeUpdate={handleTimeUpdate}
//         onLoadedData={handleLoadedData}
//       />

//       <div className="controls">
//         <button onClick={handlePlayPause}>
//           {playing ? <FaPause /> : <FaPlay />}
//         </button>
//         <div className="progress-bar">
//           <input
//             type="range"
//             min="0"
//             max={duration}
//             value={currentTime}
//             onChange={(e) => (audioRef.current.currentTime = e.target.value)}
//           />
//         </div>
//         <div className="audio-info">
//         <span>
//           {formatTime(currentTime)} / {formatTime(duration)}
//         </span>
//       </div>
//         <div className="volume-control">
//           <button onClick={() => handleVolumeChange({ target: { value: Math.max(volume - 0.1, 0) } })}>
//             <FaVolumeDown />
//           </button>
//           <input
//             type="range"
//             min="0"
//             max="1"
//             step="0.1"
//             value={volume}
//             onChange={handleVolumeChange}
//           />
//           <button onClick={() => handleVolumeChange({ target: { value: Math.min(volume + 0.1, 1) } })}>
//             <FaVolumeUp />
//           </button>
//         </div>
//       </div>
      
//     </div>
//   );
// };


import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeDown } from 'react-icons/fa';
import './AudioPlayer.css';

export const AudioPlayer = ({ audioFile }) => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioSrc, setAudioSrc] = useState(null);

  // 🔹 Fetch the processed audio file URL from the backend
  useEffect(() => {
    const fetchAudio = async () => {
      if (!audioFile) return; // Ensure audioFile is provided

      try {
        console.log('Fetching processed audio:', audioFile);
        const response = await fetch(audioFile);
        if (!response.ok) throw new Error('Failed to fetch processed audio');

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setAudioSrc(url);
        console.log('Processed audio ready:', url);
      } catch (error) {
        console.error('Error loading processed audio:', error);
      }
    };

    fetchAudio();
  }, [audioFile]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // 🔹 Play/Pause handler
  const handlePlayPause = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  // 🔹 Update time while playing
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  // 🔹 Set audio duration once loaded
  const handleLoadedData = () => {
    setDuration(audioRef.current.duration);
  };

  // 🔹 Format time for display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="simple-audio-player">
      <div>Generated Track</div>
      <audio
        ref={audioRef}
        src={audioSrc}
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
          <button onClick={() => setVolume(Math.max(volume - 0.1, 0))}>
            <FaVolumeDown />
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
          />
          <button onClick={() => setVolume(Math.min(volume + 0.1, 1))}>
            <FaVolumeUp />
          </button>
        </div>
      </div>
    </div>
  );
};

