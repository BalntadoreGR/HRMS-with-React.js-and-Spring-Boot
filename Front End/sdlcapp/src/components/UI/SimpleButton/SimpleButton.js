import classes from './SimpleButton.module.css';
import React from 'react';

const SimpleButton = (props) => {
    return (
        <button onClick={props.onClick} disabled={props.disabled} className={classes.button}>
            <span>{props.label}</span>
        </button>
    );
}

export default SimpleButton;