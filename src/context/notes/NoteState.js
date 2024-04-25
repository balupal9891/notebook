import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {

  const host = `http://localhost:${process.env.REACT_APP_BACKEND_PORT}`;
  const notesInitial = []

  let [notes, setNotes] = useState(notesInitial)

  //   Get All notes
  const getNotes = async () => {

    // Api call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    // console.log(json);
    // all fetched notes assined to notes and it will be used 
    setNotes(json);
  }


  //   Add a note 
  const addNote = async (title, description, tag) => {

    // Api call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();

    // Logic to add a Note in client
    setNotes(notes.concat(note));


  }

  //   Delete a note 
  const deleteNote = async (id) => {

    // Api call 
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    console.log(json)

    // Logic to delete a note in client 
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    })
    setNotes(newNotes);
  }


  //   Edit a note 
  const editNote = async (id, title, description, tag) => {

    // Api call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json)

    // Logic to edit in client 

    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let i = 0; i < newNotes.length; i++) {
      if (newNotes[i]._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, getNotes, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;