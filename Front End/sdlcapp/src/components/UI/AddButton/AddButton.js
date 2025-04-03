import classes from './AddButton.module.css';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';

const AddButton = (props) => {
    return (
        <button onClick={props.onClick} className={classes.button}>
            <span className={classes.icon}><AddIcon/></span>
            <span>{props.label}</span>
        </button>
    );
}

export default AddButton;



