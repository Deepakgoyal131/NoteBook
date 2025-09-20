import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';
import './Note.css';

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  
  let navigate = useNavigate();
  useEffect(() => {
    
    if(localStorage.getItem('token')){
      getNotes()
    }
    else{
      navigate('/login')
    }
    
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null)
  const refCloss = useRef(null)
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" })
  const [searchedNotes,setSearchedNotes] = useState([]);

  const updateNote = (currentNote) => {
    ref.current.click();
    //OR
    // const D = document.getElementById("D");
    // D.click();

    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  }


  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refCloss.current.click();
    // console.log(note)

  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  const searchingNotes = (e)=>{
    let searchText = e.target.value.toLocaleLowerCase();
    setSearchedNotes(notes.filter((note)=>{ return note.title.toLocaleLowerCase().includes(searchText)}))
  }

  
  return (
    <>
      <button type="button" ref={ref} className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal" id="D">
        Launch demo modal
      </button>
      <div className="modal fade note-modal" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                <i className="fas fa-edit me-2"></i>
                Edit Note
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="note-form">
                <div className="note-form-group">
                  <label htmlFor="etitle">Title</label>
                  <input 
                    type="text" 
                    id="etitle" 
                    name="etitle" 
                    value={note.etitle} 
                    onChange={onChange} 
                    minLength={3} 
                    required
                    placeholder="Enter note title"
                  />
                  <div className="character-count">{note.etitle.length}/50</div>
                </div>
                <div className="note-form-group">
                  <label htmlFor="edescription">Description</label>
                  <textarea 
                    id="edescription" 
                    name="edescription" 
                    value={note.edescription} 
                    onChange={onChange} 
                    minLength={5} 
                    required
                    placeholder="Enter note description"
                    rows="4"
                  />
                  <div className="character-count">{note.edescription.length}/200</div>
                </div>
                <div className="note-form-group">
                  <label htmlFor="etag">Tags</label>
                  <input 
                    type="text" 
                    id="etag" 
                    name="etag" 
                    value={note.etag} 
                    onChange={onChange}
                    placeholder="Enter tags (e.g., work, personal, ideas)" 
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="note-modal-btn secondary" data-dismiss="modal" ref={refCloss}>
                Cancel
              </button>
              <button 
                disabled={note.etitle.length < 3 || note.edescription.length < 5} 
                type="button" 
                className="note-modal-btn primary" 
                onClick={handleClick}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="notes-container">
        <div className="notes-header">
          <h1 className="notes-title">Your Notes</h1>
        </div>
        <div  className="note-form-group" style={{marginBottom: '5px'}}>
          <input type="search" onChange={searchingNotes} placeholder='Search Notes'/>
        </div>
          
        {notes.length === 0 ? (
          <div className="empty-notes">
            <div className="empty-notes-icon">
              <i className="fas fa-notebook"></i>
            </div>
            <h3 className="empty-notes-text">No Notes Yet</h3>
            <p>Create your first note by clicking the form above!</p>
          </div>
        ) : (
          <div className="notes-grid">
            {searchedNotes.length > 0 ? (searchedNotes.map((note)=>{
              return <Noteitem key={note._id} updateNote={updateNote} note={note}  />
            })):
            (notes.map((note) => (
              <Noteitem key={note._id} updateNote={updateNote} note={note}  />
            )))}
          </div>
        )}
      </div>
    </>

  )
}

export default Notes
