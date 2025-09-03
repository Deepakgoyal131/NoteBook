import React from 'react'
import Notes from './Notes'

const Home = (props) => {
  const {showAlert} = props //---> iska matlab hota he showAlert ko nikal rhe he props se (isko DeStructuring bolte he.
  
  return (
    <div>
      <Notes showAlert={showAlert}/>  
    </div>
  )
}

export default Home
