import React from 'react';
import useStyles from "./SidebarItem.styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import { removeHTMLTags } from "../../helpers";

const SidebarItem = ({ note,selectedNoteIndex,selectNote,deleteNote }) => {
    const classes = useStyles();
    return (
        <ListItem className={classes.listItem} selected={selectedNoteIndex===note.id} alignItems='flex-start'>
            <div className={classes.textSection} onClick={()=>selectNote(note)}>
                <ListItemText primary={note.title} secondary={removeHTMLTags(note.body.substring(0, 30)) + '...'} />
            </div>
            <DeleteIcon className={classes.deleteIcon} onClick={()=>deleteNote(note)} />
        </ListItem>
    );
};

export default SidebarItem;