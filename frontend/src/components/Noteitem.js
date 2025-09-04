import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import './Note.css'

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { note , updateNote} = props;
    const { deleteNote } = context;
     
    return (
        <div className='col-md-4 col-lg-3 mb-4'>       
            <div className="note-card">
                <div className="note-card-body">
                    <h5 className="note-card-title">{note.title}</h5>
                    <p className="note-card-text">{note.description}</p>
                    {note.tag && <div className="note-card-tag">
                        <i className="fas fa-tag" style={{ marginRight: '0.5rem' }}></i>
                        {note.tag}
                    </div>}
                    <div className="note-card-actions">
                        <button 
                            className="note-action-btn edit" 
                            onClick={() => updateNote(note)}
                            title="Edit Note"
                        >
                            <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button 
                            className="note-action-btn delete" 
                            onClick={() => {deleteNote(note._id)}}
                            title="Delete Note"
                        >
                            <i className="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default Noteitem
