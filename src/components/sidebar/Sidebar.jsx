import React, { useState } from 'react';
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";
import SidebarItem from '../sidebarItem/SidebarItem';
import { addNote, deleteNote } from '../../firebase.config';
import useStyles from "./Sidebar.styles";

const Sidebar = ({ notes, selectedNoteIndex,selectNote }) => {
    const classes = useStyles();
    const [values,setValues] = useState({title:'', isAdding: false});
    const newNoteBtnClick = ()=> setValues(values=>({...values,title:'',isAdding:!values.isAdding}));
    const handleChange = e=> setValues({...values,title: e.target.value})
    const handleSubmit = async e=>{
        e.preventDefault();
        const newNote=await addNote(values.title);
        selectNote(newNote);
        setValues({...values,title:'',isAdding:false});
    }
    
    const removeNote=(note)=> {
        if(window.confirm(`Are you sure you want to delete: ${note.title}`)){
            if(note.id===selectedNoteIndex)
                selectNote(null);
            deleteNote(note.id);
        }
    };
    return (
		<div className={classes.sidebarContainer}>
			<Button className={classes.newNoteBtn} onClick={newNoteBtnClick}>
				{values.isAdding ? "Cancel" : "New Note"}
			</Button>
			{values.isAdding && (
				<form onSubmit={handleSubmit}>
					<input type='text' className={classes.newNoteInput} placeholder="Enter Note Title" onChange={handleChange} value={values.title}></input>
					<Button type="submit" className={classes.newNoteSubmitBtn}>
						Submit Note
					</Button>
				</form>
			)}
            {
                notes && notes.length>0 && (
                    <List>
                    {
                        notes.map(note=> <SidebarItem key={note.id} note={note} selectedNoteIndex={selectedNoteIndex} selectNote={selectNote} deleteNote={removeNote} /> )
                    }
                    </List>)
            }
            <Divider />
		</div>
	);
};

export default Sidebar;