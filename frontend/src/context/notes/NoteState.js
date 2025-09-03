import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {

  const host = process.env.REACT_APP_API_HOST;

  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial)

  //Get all Note     
  const getNotes = async () => {
    // API call
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      });
      const json = await response.json();

      setNotes(json)
    } catch (error) {
      alert("try and login after some time unable to perform action")
    }


  }

  //Add a Note
  const addNote = async (title, description, tag) => {
    // API call

    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
      });
      const json = await response.json();
      console.log(json);

      console.log("Adding a new note")
      const note = {
        "_id": json._id,
        "user": json.user,
        "title": json.title,
        "description": json.description,
        "tag": json.tag,
        "name": json.name,
        "__v": json._v
      }
      setNotes(notes.concat(note));
    } catch (error) {
      alert("try and login after some time! unable to perform action")
    }

  }

  //Delete a Note
  const deleteNote = async (id) => {
    // API CALL
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },

      });
      const json = await response.json();
      console.log(json);

      console.log("Note delete " + id)
      const newNotes = notes.filter((note) => { return note._id !== id })
      setNotes(newNotes);
    } catch (error) {
      alert("try and login after some time unable to perform action")
    }

  }

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API Call
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
      });
      const json = await response.json();
      console.log(json)

      let newNotes = JSON.parse(JSON.stringify(notes))
      // logic to edit in client
      for (let i = 0; i < notes.length; i++) {
        const element = newNotes[i];
        if (element._id === id) {
          newNotes[i].title = title;
          newNotes[i].description = description;
          newNotes[i].tag = tag;
          break;
        }

      }
      setNotes(newNotes);
    } catch (error) {
      alert("try and login after some time unable to perform action")
    }

  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState;
