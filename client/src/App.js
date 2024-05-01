import './App.css';
import {BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom"
import Tutorial from './Pages/Tutorial.js';
import Login from './Pages/Login.js';
import Lobby from './Pages/Lobby.js';
import Game from './Pages/Game.js';
import { useState } from 'react';

function App() {
  const [localGameInfo, setLocalGameInfo] = useState({});

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/tutorial' element={<Tutorial/>}/>
          <Route path='/lobby' element={<Lobby setLocalGameInfo={setLocalGameInfo}/>}/>
          <Route path='/game' element={<Game localGameInfo={localGameInfo} />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
