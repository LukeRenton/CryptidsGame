import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {LoginComponent} from "./Pages/Login.jsx"
import Tutorial from './Pages/Tutorial.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<LoginComponent/>}/>
          <Route path='/tutorial' element={<Tutorial/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
