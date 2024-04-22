import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {LoginComponent} from "./Pages/Login.jsx"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<LoginComponent/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
