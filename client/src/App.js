import './App.css';
import {BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom"
import Tutorial from './Pages/Tutorial.js';
import Login from './Pages/Login.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/tutorial' element={<Tutorial/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
