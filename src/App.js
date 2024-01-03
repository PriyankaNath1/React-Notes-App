import NotesList from "./components/NotesList";
import { useState, useEffect } from "react";
import {nanoid} from "nanoid";
import Search from "./components/Search"
import Header from "./components/Header";

const App = ()=> {
 
  const [notes,setNotes]=useState([{
    id: nanoid(),
    text: "Here is your note!",
    date: "01/01/2023",
  },
  {
    id: nanoid(),
    text: "Here is your note!",
    date: "01/01/2023",
  },
  {
    id: nanoid(),
    text: "Here is your note!",
    date: "01/01/2023",
  },
  {
    id: nanoid(),
    text: "Here is your note!",
    date: "01/01/2023",
  }]);

  const [searchText,setSearchText]=useState("");

  const [darkMode,setDarkMode]=useState(false);

  useEffect(()=> {
    const savedNotes=JSON.parse(localStorage.getItem("my-app-data"));
    console.log(savedNotes);
    if(savedNotes){
      setNotes(savedNotes);
    }
  },[]);
  useEffect(() => {
    localStorage.setItem("my-app-data",JSON.stringify(notes));
    console.log(notes);
  },[notes]);
  


  const addNote = (text)=>{
    const date=new Date();
    const newNote={
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    }
    const newNotes = [...notes,newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id) =>{
    const newNotes = notes.filter((note)=> note.id !== id);
    setNotes(newNotes);
  }


  return (
    <div className={`${darkMode && "dark-mode"}`}>
    <div className="container">
    <Header handleDarkMode={setDarkMode}/>
    <Search handleSearchNote={setSearchText}/>
      <NotesList notes={notes.filter((note)=>
      note.text.toLowerCase().includes(searchText))} 
      handleAddNote={addNote}
        handleDeleteNote={deleteNote}
      />
    </div>
    </div>
  )
};

export default App;