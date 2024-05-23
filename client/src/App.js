import './App.css';
import {BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom"
import Tutorial from './Pages/Tutorial.js';
import Login from './Pages/Login.js';
import Lobby from './Pages/Lobby.js';
import Game from './Pages/Game.js';
import { useState } from 'react';

function App() {
  // State variable to manage local game information
  const [localGameInfo, setLocalGameInfo] = useState({});
  const [playerNames, setPlayerNames] = useState(["","","","",""]);
  const [movesList, setMovesList] = useState([[],[],[],[],[]]);

  return (
    <main className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/tutorial' element={<Tutorial/>}/>
          <Route path='/lobby' element={<Lobby setMovesList={setMovesList} playerNames={playerNames} setPlayerNames={setPlayerNames} localGameInfo={localGameInfo} setLocalGameInfo={setLocalGameInfo}/>}/>
          <Route path='/game' element={<Game movesList={movesList} setMovesList={setMovesList} playerNames={playerNames} localGameInfo={localGameInfo} />}/>
        </Routes>
      </Router>
    </main>
  );
}

export default App;
