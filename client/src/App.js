/*
APP.JS
Type: main react component
Description: Renders all pages and provides variables needed accross components
*/

import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Tutorial from './Pages/Tutorial.js';
import Login from './Pages/Login.js';
import Lobby from './Pages/Lobby.js';
import Game from './Pages/Game.js';
import { useState } from 'react';
import Cookies from 'js-cookie';

function App() {
  // State variable to manage local game information
  const [localGameInfo, setLocalGameInfo] = useState({});
  const [playerNames, setPlayerNames] = useState(["","","","",""]);
  const [movesList, setMovesList] = useState([[],[],[],[],[]]);
  const [user, setUser] = useState(null);
  

  const updateUser = (newUser) => {
    Cookies.set('user',newUser);
    setUser(newUser);
  }

  return (
    <main className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login updateUser={updateUser}/>}/>
          {user !== null ?
          <> 
            <Route path='/tutorial' element={<Tutorial/>}/>
            <Route path='/lobby' element={<Lobby updateUser={updateUser} setMovesList={setMovesList} playerNames={playerNames} setPlayerNames={setPlayerNames} localGameInfo={localGameInfo} setLocalGameInfo={setLocalGameInfo}/>}/>
            <Route path='/game' element={<Game movesList={movesList} setMovesList={setMovesList} playerNames={playerNames} localGameInfo={localGameInfo} />}/>
          </>
          :
          <></>
          }
        </Routes>
      </Router>
    </main>
  );
}

export default App;
