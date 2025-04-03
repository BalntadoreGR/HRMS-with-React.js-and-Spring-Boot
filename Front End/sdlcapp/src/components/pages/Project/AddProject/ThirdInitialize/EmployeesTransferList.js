import {Grid, List, ListItem, ListItemIcon, ListItemText, Checkbox, Button, Paper, Select, MenuItem, InputLabel, Box, Typography, FormControl } from '@mui/material';
import React, { useState, useEffect } from 'react';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import KeyboardDoubleArrowLeftSharpIcon from '@mui/icons-material/KeyboardDoubleArrowLeftSharp';
import axios from "axios";
import { format, isValid } from 'date-fns';
import './EmployeesTransferList.css';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

const EmployeesTransferList = (props) => {
  const [editready,setEditReady] = useState("Ready");
  const [onReadyDisable, setOnReadyDisable] = useState(false);
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [error, setError] = useState("hidden");
  const [budgetSum, setBudgetSum] = useState(0);
  const [nextVisible,setNextVisible] = useState(false); // for the next button on the phases selection

  const [reset, setReset] = useState(false);

  const phase_id = props.items.id;
  const phaseBudget = parseInt(props.items.budget / props.items.duration);
  const startDate = props.items.start;
  const endDate = props.items.end;

  useEffect(() => {  
    if (props.items.start && props.items.end) {
      getEmployees();
    }  
  }, [props.items.start, props.items.end, reset]);

  const getEmployees = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/employee/available`, {
          params: {
            start: startDate,
            end: endDate,
          }});
        setLeft(response.data);
        setRight([]);
        setEditReady("Ready");
        setOnReadyDisable(false);
        setError("hidden");
        setNextVisible(false);
      } catch (error) {
        console.log(error);
      }
  };  
  
  useEffect(() => {
    calculateBudgetSum();
  }, [right, selectedOptions]);  

  const calculateBudgetSum = () => {
    let sum = 0;  
    right.forEach((employee) => {
      const choice = selectedOptions[employee.id];  
      if (choice === 6 ) {
        sum += employee.salary* (1/2);
      } else {
        sum += employee.salary;
      }
    });  
    setBudgetSum(sum);
  };  

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    const newSelectedOptions = { ...selectedOptions };
  
    if (currentIndex === -1) {
      newChecked.push(value);
      newSelectedOptions[value.id] = value.contract;
    } else {
      newChecked.splice(currentIndex, 1);
      delete newSelectedOptions[value.id].contract;
    }  
    setChecked(newChecked);
    setSelectedOptions(newSelectedOptions);
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
      setNextVisible(true);     
    } else {
      setOnReadyDisable(false);
      setEditReady("Ready");
      setNextVisible(false); 
    }        
  }

  const handleNext = async () => {
    const employeesWithBudget = right.map(async (employee) => {
      const choice = selectedOptions[employee.id];
      const response = await axios.post(`http://localhost:8090/phase/${phase_id}/addEmployee/${employee.id}`, {
        headers: {'Content-Type': 'application/json'}, });
      let paycheck, newcontract;
      if (choice === "6" || choice === 6 ) {        
        paycheck = employee.salary * (1 / 2) * props.items.duration;
        newcontract = parseInt(choice);
      } else {
        paycheck = employee.salary * props.items.duration;
        newcontract = parseInt(choice);        
      }
      const secResponse = await axios.post(`http://localhost:8090/payment/add/${phase_id}/${employee.id}?pay=${paycheck}&contract=${newcontract}`, {
        headers: {'Content-Type': 'application/json'},});       
      return {
        ...employee,
        paycheck,
        newcontract,
      };
    })
    //const thirdResponse = await axios
    console.log(employeesWithBudget);
    props.onNext(employeesWithBudget, phase_id, selectedOptions);
    setReset(phase_id);  
}

  useEffect(() => {
    if (budgetSum === 0){
        setError("hidden");
    } else if (phaseBudget - budgetSum > phaseBudget * (1/10) || phaseBudget - budgetSum < 0 ){
        setError("shown");
    } else {
        setError("ok"); 
        setEditReady("Ready");          
    }
}, [budgetSum]);

const LeftList = (items) => (
  <Paper sx={{ width: 400, height: 600, backgroundColor:'rgb(67, 67, 67)', overflow: 'auto' }}>
    <List sx={{ widtoverflow:350 }}dense component="div" role="list">
      {items.sort((a, b) => a.id - b.id).map((value) => {
        const labelId = `transfer-list-item-${value.id}-label`;

        return (
          <ListItem
            sx={{height: 75, width:'auto', borderBottom: 1}}
            key={value.id}
            role="listitem"
            button
          >
            <ListItemIcon>
              <Checkbox
                onClick={handleToggle(value)}
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
            <ListItemText id={labelId} sx={{width:'100%'}}>
              <div>
                <div style={{fontSize:'18px', fontWeight:'bold'}}>{value.name}</div>
                <div style={{fontSize:'14px'}}>
                  Contract: {value.contract} Salary: {value.salary}
                </div>
              </div>
            </ListItemText>
            {+value.contract === 8 && (
              <ListItemText sx={{textAlign: 'right', width:70, paddingRight:10}}>
                <FormControl>
                  <InputLabel id="demo-simple-select-label"></InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedOptions[value.id] || ""}
                      sx={{ width:80, border: '2px solid #48601d', '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#48601d' }, }}
                      onChange={(e) => {
                        const newSelectedOptions = { ...selectedOptions };
                        newSelectedOptions[value.id] = e.target.value;
                        setSelectedOptions(newSelectedOptions);
                      }}
                    >
                      <MenuItem value={8}>8hr</MenuItem>
                      <MenuItem value={6}>4hr</MenuItem>
                    </Select>
                </FormControl>
              </ListItemText>
            )}
          </ListItem>
        );
      })}
      <ListItem />
    </List>
  </Paper>
);

  const RightList = (items, selectedOptions) => (
    <Paper sx={{ width: 300, height: 600, backgroundColor:'rgb(67, 67, 67)', overflow: 'auto' }}>
    <List sx={{ widtoverflow: 'auto' } }dense component="div" role="list">
      {items.sort((a, b) => a.id - b.id).map((value) => {
        const labelId = `transfer-list-item-${value.id}-label`;

        return (
          <ListItem
            sx={{height: 75, borderBottom: 1}}
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
            <ListItemText id={labelId}>
              <div>
                <div style={{fontSize:'15px', fontWeight:'bold'}}> {value.name}</div>
                {selectedOptions[value.id] && (
                  <div>
                    <div style={{fontSize:'14px'}}>Working Hours: {selectedOptions[value.id]}
                    {selectedOptions[value.id] === 6 ? (
                      <div style={{fontSize:'14px'}}> Current Salary: {value.salary / 2}</div>
                    ) : (
                      <div style={{fontSize:'14px'}}>Salary: {value.salary}</div>
                    )}
                    </div>                    
                  </div>
                )}
              </div>
            </ListItemText>            
          </ListItem>
        );
      })}
      <ListItem />
    </List>
  </Paper>
  );

  return (
    <React.Fragment>
      <Typography sx={{ mt: 2, mb: 1 }}>
        <Grid >
          <Grid container spacing={3} paddingTop={3} paddingBottom={2} justifyContent="center" alignItems="center">
            <Grid item>{LeftList(left)}
            </Grid>
            <Grid item>
              <Grid container direction="column" alignItems="center">

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
                  onClick={readyHandler}
                  size="small"
                  disabled={phaseBudget - budgetSum > phaseBudget * (1/10) || phaseBudget - budgetSum < 0  }
                  aria-label="move all left"
                  >
                  {editready}
                </Button>
              </Grid>
            </Grid>
            <Grid item>{RightList(right, selectedOptions)}
            </Grid>          
          </Grid>
          <Grid container justifyContent="space-between" alignItems="end" paddingLeft='60px'>
              <Grid item className='budget_attention' justifyItems='right' sx={{ flexDirection: 'row', display: 'flex'}}>
                <Typography elevation={0} sx={{fontSize:18}}>
                  <div >Phase Budget (per month): {phaseBudget}
                    <div>
                      {error === "shown" && <p style={{color:'red'}}> Current Employees Budget:{budgetSum}</p>}
                      {error === "ok" && <p style={{color:'green'}}> Current Employees Budget:{budgetSum}</p>}
                    </div>
                    <div> Budget dont exceed 10% off at most !</div>
                  </div>
                </Typography>
              </Grid>
              <Grid item>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button 
                    onClick={handleNext}
                    disabled={!nextVisible}
                    sx={{ marginRight: 7, color:'black', border: '1px solid black', backgroundColor:'#48601d', '&:hover': {color: 'black', border: '1px solid black', backgroundColor:'#3a4c17'} }}
                  >
                    Next
                  </Button>
                </Box>
              </Grid>
          </Grid>
        </Grid>
      </Typography>
    </React.Fragment>
  );
}

export default EmployeesTransferList;