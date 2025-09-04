import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import NoteBookInfo from './components/NoteBookInfo';

import NoteState from './context/notes/NoteState';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Alert from './components/Alert';
import Footer from './components/Footer';
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
    <div className="app-container">
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <div className="alert-wrapper">
              <Alert alert={alert} />
          </div>
          <div className="main-container">
            <header className="app-header">
              <h1 className="app-title">
                <i className="fas fa-book-open"></i>
                iNoteBook
              </h1>
              <p className="app-subtitle">Your personal digital notebook for capturing ideas and thoughts</p>
            </header>
            
            <Routes>
              <Route exact path='/' element={<NoteBookInfo />} />
              <Route exact path='/user' element={<Home showAlert={showAlert} />} />
              <Route exact path='/login' element={<Signin showAlert={showAlert} />} />
              <Route exact path='/signup' element={<Signup showAlert={showAlert} />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </NoteState>
    </div>

  );
}

export default App;
