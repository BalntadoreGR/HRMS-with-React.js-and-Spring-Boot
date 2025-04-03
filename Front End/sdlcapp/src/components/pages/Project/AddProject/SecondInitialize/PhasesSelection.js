import {Grid, List, ListItem, ListItemIcon, ListItemText, Checkbox, Button, Paper, TextField } from '@mui/material';
import React, { useState } from 'react';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import KeyboardDoubleArrowRightSharpIcon from '@mui/icons-material/KeyboardDoubleArrowRightSharp';
import KeyboardDoubleArrowLeftSharpIcon from '@mui/icons-material/KeyboardDoubleArrowLeftSharp';
import CustomPhase from './CustomPhase';


const phases = [
  { id: 0, name: 'Planning'},
  { id: 1, name: 'Analysis'},
  { id: 2, name: 'Design'},
  { id: 3, name: 'Development'},
  { id: 4, name: 'Testing'},
  { id: 5, name: 'Implementation'},
  { id: 6, name: 'Maintenance'}
];

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

const PhasesSelection = (props) => {
  const [editready,setEditReady] = useState("Ready");
  const [onReadyDisable, setOnReadyDisable] = useState(false);
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState(phases)
  const [right, setRight] = useState([]);
  

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  

  const updatePhases = (customPhase) => {
    const newPhase = {
      id: left.length + right.length + 1,
      name: customPhase,
    };
    const new_phases = [...left, newPhase];
    setLeft(new_phases);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left).sort((a, b) => a.id - b.id));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked).sort((a, b) => a.id - b.id));
    setLeft(not(left, leftChecked).sort((a, b) => a.id - b.id));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked).sort((a, b) => a.id - b.id));
    setRight(not(right, rightChecked).sort((a, b) => a.id - b.id));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right).sort((a, b) => a.id - b.id));
    setRight([]);
  };

  const readyHandler = () => {
    if(editready === "Ready"){
      setOnReadyDisable(true);
      setEditReady("Edit");
      props.onPhases(right, "Edit");
    } else {
      setOnReadyDisable(false);
      setEditReady("Ready");   
      props.onPhases(right, "Ready");   
    }
        
  }

  const LeftList = (items) => (
    <Paper sx={{ width: 250, height: 500, backgroundColor: "rgb(67, 67, 67)", overflow: 'auto' }}>
    <List dense component="div" role="list">
      {items.sort((a, b) => a.id - b.id).map((value) => {
        const labelId = `transfer-list-item-${value.id}-label`;
        return (
          <ListItem
            key={value.id}
            role="listitem"
            button
            onClick={handleToggle(value)}
          >
            <ListItemIcon>
              <Checkbox
                color="primary"
                style ={{
                  color: "#48601d",
                }}
                checked={checked.findIndex((el) => el.id === value.id) !== -1}
                tabIndex={-1}
                disabled={onReadyDisable}
                disableRipple
                inputProps={{
                  'aria-labelledby': labelId,
                }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={value.name} />
          </ListItem>
        )
      })}
      <CustomPhase updatePhases={updatePhases}/>
    </List>
  </Paper>
  );

  const RightList = (items) => (
    <Paper sx={{ width: 250, height: 500, backgroundColor: "rgb(67, 67, 67)", overflow: 'auto' }}>
    <List dense component="div" role="list">
      {items.sort((a, b) => a.id - b.id).map((value) => {
        const labelId = `transfer-list-item-${value.id}-label`;
        return (
          <ListItem
            key={value.id}
            role="listitem"
            button
            onClick={handleToggle(value)}
          >
            <ListItemIcon>
              <Checkbox
                color="primary"
                style ={{
                  color: "#48601d",
                }}
                checked={checked.findIndex((el) => el.id === value.id) !== -1}
                tabIndex={-1}
                disabled={onReadyDisable}
                disableRipple
                inputProps={{
                  'aria-labelledby': labelId,
                }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={value.name} />
          </ListItem>
        )
      })}
    </List>
  </Paper>
  );

  

  return (
    <Grid>
      <Grid container spacing={2} justifyContent="center" paddingTop="30px" paddingBottom="10px" alignItems="center">
        <Grid item>{LeftList(left)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              sx={{ my: 0.5, color:'#48601d', border: '1px solid black', backgroundColor:'black','&:hover': {color: 'black', border: '1px solid black', backgroundColor:'#3a4c17'} }}
              size="small"
              onClick={handleAllRight}
              disabled={left.length === 0 || onReadyDisable}
              aria-label="move all right"
            >
              <KeyboardDoubleArrowRightSharpIcon/>
            </Button>
            <Button
              sx={{ my: 0.5, color:'#48601d', border: '1px solid black', backgroundColor:'black','&:hover': {color: 'black', border: '1px solid black', backgroundColor:'#3a4c17'} }}
              size="small"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0 || onReadyDisable}
              aria-label="move selected right"
            >
              <EastIcon/>
            </Button>
            <Button
              sx={{ my: 0.5, color:'#48601d', border: '1px solid black', backgroundColor:'black','&:hover': {color: 'black', border: '1px solid black', backgroundColor:'#3a4c17'} }}
              size="small"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0 || onReadyDisable}
              aria-label="move selected left"
            >
              <WestIcon/>
            </Button>
            <Button
              sx={{ my: 0.5, color:'#48601d', border: '1px solid black', backgroundColor:'black','&:hover': {color: 'black', border: '1px solid black', backgroundColor:'#3a4c17'} }}
              size="small"
              onClick={handleAllLeft}
              disabled={right.length === 0 || onReadyDisable}
              aria-label="move all left"
            >
              <KeyboardDoubleArrowLeftSharpIcon/>
            </Button>
            <Button        
              sx={{ my: 0.5, color:'#48601d', border: '1px solid black', backgroundColor:'black','&:hover': {color: 'black', border: '1px solid black', backgroundColor:'#3a4c17'} }}
              disabled={right.length < 4}
              onClick={readyHandler}
              size="small"
              aria-label="move all left"
              >
              {editready}
            </Button>
          </Grid>
        </Grid>
        <Grid item>{RightList(right)}</Grid>          
      </Grid>
    </Grid>
  );
}

export default PhasesSelection;