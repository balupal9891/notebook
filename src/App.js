import './App.css';
import About from './component/About';
import Home from './component/Home';
import Navbar from './component/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './component/Alert';
import Login from './component/Login';
import Signup from './component/Signup';
import { useState } from 'react';

function App() { 
  const [alert, setAlert] = useState(null);
  const showAlert = (type, message)=>{
    setAlert({message:message, type:type})
    setTimeout(()=>{
      setAlert(null);
    },1500)
  }
  return (
    <div>
      <NoteState>
        <BrowserRouter>

          <Navbar showAlert={showAlert} />
          <Alert alert={alert} />
          
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login showAlert={showAlert} />} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert} /> } />
          </Routes>

        </BrowserRouter>
      </NoteState>
    </div>
  );
}

export default App;
