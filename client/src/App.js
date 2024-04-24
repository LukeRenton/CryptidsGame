import './App.css';
import {BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom"
import Tutorial from './Pages/Tutorial.js';
import Login from './Pages/Login.js';
import Lobby from './Pages/Lobby.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/tutorial' element={<Tutorial/>}/>
          <Route path='/lobby' element={<Lobby/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
