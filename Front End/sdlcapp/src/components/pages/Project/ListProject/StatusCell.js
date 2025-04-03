import React from "react";
import classes from './StatusCell.module.css';

const StatusCell = (props) => {

    return (
        <button onClick={props.onClick} disabled={props.onDisabled} className={classes.button}>
            {(props.status === 1 && <span>Initialize Phases (Step 1)</span> ) || (props.status === 2 && props.role === "Manager" && <span> Add Employees (Final Step)</span>) || (props.status === 2 && props.role === "Admin" && <span>Wait for Manager... (Step 2)</span>)}               
        </button>  
        
    );
}

export default StatusCell;

