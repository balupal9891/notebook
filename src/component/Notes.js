import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';

export default function Notes(props) {

  const context = useContext(noteContext);
  const navigate = useNavigate();

  const ref = useRef(null);
  const refClose = useRef(null);

  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    }
    else {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, [])

  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
  const updateNote = (currentNote) => {
    // clicking to edit icon of Noteitem will be like clicking to launch modal by below line
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })

  }
  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("success","Note has been updated")
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }


  return (
    <>
      <Addnote showAlert={props.showAlert}/>

      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* Modal Body  */}
              <form>
                <div className="mb-3">
                  <label htmlFor="eetitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={note.etitle.length < 5 || note.edescription.length < 5} className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className='row my-5'>
        <h1>MY NOTES</h1>
        {notes.map((note) => {
          return <Noteitem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert} />
        })}
      </div>
    </>
  )
}
