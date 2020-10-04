import firebase from "firebase/app";
import "firebase/firestore";

firebase.initializeApp({
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: "evernote-clone-d1609.firebaseapp.com",
	databaseURL: "https://evernote-clone-d1609.firebaseio.com",
	projectId: "evernote-clone-d1609",
	storageBucket: "evernote-clone-d1609.appspot.com",
	messagingSenderId: "674923701893",
	appId: "1:674923701893:web:ca4c52446961e7c1acebec",
});

export const firestore= firebase.firestore();

export const noteUpdate = (note)=>{
	firestore.collection('notes').doc(note.id).update({body:note.body,title:note.title,timestamp: firebase.firestore.FieldValue.serverTimestamp()});
}

export const addNote = async (title) => {
	const note = { title, body: "" };
	const newNoteRef = await firestore.collection("notes").add({...note,timestamp: firebase.firestore.FieldValue.serverTimestamp()});
	const newNote={id:newNoteRef.id,...note};
	return newNote;
};

export const deleteNote = (noteIndex) =>{
	firestore.collection('notes').doc(noteIndex).delete();
}
