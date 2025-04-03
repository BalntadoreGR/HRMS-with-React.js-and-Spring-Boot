import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import {Grid, List, ListItem, ListItemIcon, ListItemText, Checkbox, Button, Paper, TextField, IconButton } from '@mui/material';

const CustomPhase = (props) => {
    const [customPhase, setCustomPhase] = useState('');
  
    const handleCustomPhaseChange = (event) => {
      setCustomPhase(event.target.value);
    };
    const handleClick = () => {
      // Καλέστε τη συνάρτηση updatePhases με την customPhase.
      props.updatePhases(customPhase);
      setCustomPhase('');
    };
  
    return (
      <ListItem
        key="custom-phase"
        role="listitem"
        button
        sx={{height:50, width:'auto'}}
      >
        <ListItemIcon>
            <IconButton         
              disabled={customPhase===''}
              onClick={handleClick}
              aria-label="add custom phase"
              sx={{color: '#48601d', '&:hover': {color: '#48601d', backgroundColor:'rgb(119, 109, 109)'}}}
            >
              <AddIcon />
            </IconButton>            
        </ListItemIcon>
        <ListItemText>
          <TextField
              sx={{width:130,height:40, "& label.Mui-focused": { color: 'black'}, '& .MuiInput-underline:after': {
                borderBottomColor: '#48601d',
              },".MuiOutlinedInput-root": {"& fieldset": {borderColor: '#48601d'}}, '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#48601d',
                },
                '&:hover fieldset': {
                  border: '2px solid #48601d',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#48601d',
                },
              },}}
              type='text'
              id="custom-phase-textfield"
              label="Custom Phase"
              value={customPhase}
              onChange={handleCustomPhaseChange}
              size='small'
            />
        </ListItemText>
      </ListItem>
    );
  };

  export default CustomPhase;