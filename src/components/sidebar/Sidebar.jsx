import React, { useState } from 'react';
// import useStyles from "./Sidebar.styles";
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";
import SidebarItem from '../sidebarItem/SidebarItem';
import { addNote, deleteNote } from '../../firebase.config';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		height: "calc(100% - 35px)",
		position: "absolute",
		left: "0",
		width: "300px",
		boxShadow: "0px 0px 2px black",
	},
	newChatBtn: {
		borderRadius: "0px",
	},
	unreadMessage: {
		color: "red",
		position: "absolute",
		top: "0",
		right: "5px",
	},
	newNoteBtn: {
		width: "100%",
		height: "35px",
		borderBottom: "1px solid black",
		borderRadius: "0px",
		backgroundColor: "#29487d",
		color: "white",
		"&:hover": {
			backgroundColor: "#88a2ce",
		},
	},
	sidebarContainer: {
		marginTop: "0px",
		width: "300px",
		height: "100%",
		boxSizing: "border-box",
		float: "left",
		overflowY: "scroll",
		overflowX: "hidden",
	},
	newNoteInput: {
		width: "100%",
		margin: "0px",
		height: "35px",
		outline: "none",
		border: "none",
		paddingLeft: "5px",
		"&:focus": {
			outline: "2px solid rgba(81, 203, 238, 1)",
		},
	},
	newNoteSubmitBtn: {
		width: "100%",
		backgroundColor: "#28787c",
		borderRadius: "0px",
		color: "white",
	},
}));

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