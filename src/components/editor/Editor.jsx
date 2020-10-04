import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import useDebounce from "../../custom-hooks/useDebounce";
import { noteUpdate } from "../../firebase.config";
import useStyles from "./Editor.styles";

const Editor = ({selectedNote}) => {

    const [editor,setEditor] = useState({title:'',body:'',id:''});
    const {title,body,id} = editor;
    const note=useDebounce(id,title,body);

    useEffect(()=>{
        if(note && note.id!==""){
            noteUpdate(note);
        }
    },[note])

    useEffect(()=>{
        setEditor(e=>({...e,title:selectedNote.title,body: selectedNote.body,id: selectedNote.id}));
    },[selectedNote]);

    const updateBody = (val) => {
		setEditor(e=>({ ...e, body:val }));
    };
    const handleChange= e=>{
        const title= e.target.value;
        setEditor(editor=>({...editor,title}));
    }
    const classes = useStyles();
    return (
        <div className={classes.editorContainer}>
            <BorderColorIcon className={classes.editIcon} />
            <input className={classes.titleInput} type="text" placeholder="Note Title..." value={title} onChange={handleChange} />
            <ReactQuill value={body} onChange={updateBody} />
        </div>
    );

    
};



export default Editor;

