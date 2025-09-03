import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';

import NoteState from './context/notes/NoteState';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Alert from './components/Alert';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
      <NoteState>
        < BrowserRouter>      
            <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <h1>iNotebook</h1>
            <Routes>
              <Route exact path='/' element={<Home showAlert={showAlert} />} />
              
              <Route exact path='/login' element={<Signin showAlert={showAlert}/>} />
              <Route exact path='/signup' element={<Signup showAlert={showAlert}/>} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>

    </>

  );
}

export default App;
