import React from 'react'
import Notes from './Notes'
import AddNote from './AddNote'
import { Route, Routes } from 'react-router-dom'

const Home = (props) => {
  const {showAlert} = props //---> iska matlab hota he showAlert ko nikal rhe he props se (isko DeStructuring bolte he.
  
  return (
    <div>
      <Routes>
        <Route path='/' element={<AddNote/>}/>
        <Route path='/notes' element={<Notes showAlert={showAlert}/> } />
      </Routes>
      
      
    </div>
  )
}

export default Home
