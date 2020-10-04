import React, { useEffect, useState } from "react";
import Editor from "./components/editor/Editor";
import Sidebar from "./components/sidebar/Sidebar";
import {firestore} from "./firebase.config";
import "./App.css";

const App = () => {
	const [selectedNote, setselectedNote] = useState(null);
	const [notes, setNotes] = useState(null);

	const selectNote = (note)=> setselectedNote(note);

	useEffect(()=>{
		firestore.collection('notes').onSnapshot(snapshot=>{
			const allNotes=snapshot.docs.map(doc=>({
				...doc.data(),
				id: doc.id
			}));
			console.log(allNotes);
			setNotes(allNotes);
		});
	},[])
	return (
		<div className="app-container">
			<Sidebar notes={notes} selectedNoteIndex={selectedNote?selectedNote.id:null} selectNote={selectNote} />
			{selectedNote && <Editor selectedNote={selectedNote} />}
		</div>
	)
};

export default App;
