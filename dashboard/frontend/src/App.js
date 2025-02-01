
import React from 'react';
import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './App.css';

function App() {
  return (
    <div className="Dashboard">
      <SideBar />
      <div className="Dashboard-content">
        <Content/>
      </div>
    </div>

    
    
  );
}

export default App;
