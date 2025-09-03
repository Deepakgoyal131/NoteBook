import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom';

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
  return (
    <>
      <AddNote/>
      <button type="button" ref={ref} className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal" id="D">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">TITLE</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={3} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">DESCRIPTION</label>
                  <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                </div>
              </form>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" ref={refCloss}>Close</button>
              <button disabled = {note.etitle.length<3 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1>Your Notes</h1>
        <div className="container mx-2">
           {notes.length === 0 && 'No Notes to Display'}
        </div> 
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} note={note} />
        })}
      </div>
    </>

  )
}

export default Notes
