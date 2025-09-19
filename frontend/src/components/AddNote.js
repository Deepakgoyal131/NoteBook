import React, { useContext, useState, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import './Note.css'

const AddNote = () => {
    const context = useContext(noteContext);
    
    const {addNote} = context;

    const [note, setNote] = useState({title:"",description:"",tag:""})
    
      const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const getGreeting = () => {
      const hour = new Date().getHours();

      if (hour >= 5 && hour < 12) {
        return 'Good Morning';
      } else if (hour >= 12 && hour < 17) {
        return 'Good Afternoon';
      } else {
        return 'Good Evening';
      }
    };

    setGreeting(getGreeting());
  }, []);

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
    }    

    const onChange =(e)=>{
        setNote({...note, [e.target.name]: e.target.value});
    }

  return (
    <div className="note-container">
      <div className="note-header">
        <h2>{greeting}, {localStorage.getItem('name')}</h2>
        <p>Capture your thoughts, ideas, and reminders</p>
      </div>
      <form className="note-form">
        <div className="note-form-group">
          <label htmlFor="title">Title</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            placeholder="Enter a descriptive title"
            value={note.title} 
            onChange={onChange} 
            minLength={3} 
            required
          />
          <div className="character-count">{note.title.length}/50</div>
        </div>
        <div className="note-form-group">
          <label htmlFor="description">Description</label>
          <textarea 
            id="description" 
            name="description" 
            placeholder="Write your note here..."
            value={note.description} 
            onChange={onChange} 
            minLength={5} 
            required
          />
          <div className="character-count">{note.description.length}/200</div>
        </div>
        <div className="note-form-group">
          <label htmlFor="tag">Tags</label>
          <div className="tag-input">
            <input 
              type="text" 
              id="tag" 
              name="tag" 
              placeholder="Add tags to organize your notes"
              value={note.tag} 
              onChange={onChange}
            />
          </div>
          <div className="tag-hint">Separate multiple tags with commas (e.g., work, ideas, todo)</div>
        </div>

        <button 
          disabled={note.title.length < 3 || note.description.length < 5} 
          type="submit" 
          className="note-button" 
          onClick={handleClick}
        >
          Create Note
        </button>
      </form>
    </div>
  )
}

export default AddNote
