import logo from './logo.svg';
import './App.css';
import { Sidebar} from './components/Sidebar';
import {Content} from './components/Content';

function App() {
  return (
    <div className="generate">
      <Sidebar />
      <div className="generate-content">
        <Content/>
      </div>
      <div className="background"></div>
    </div>
  );
}

export default App;
