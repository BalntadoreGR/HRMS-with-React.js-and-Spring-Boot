import { useEffect, useState } from 'react';
import { ProjectContext } from '../../../../../store/ProjectContext';
import React, { useContext } from 'react';
import './PhasesInitialize.css';
import { Box, Paper, Grid, Stack, List, Button, ListItem, ListItemIcon, ListItemText, Checkbox, Radio, Typography } from '@mui/material';
import { format } from 'date-fns';
import axios from 'axios';
import SimpleButton from '../../../../UI/SimpleButton/SimpleButton';


const PhasesInitialize = (props) => {
    const [phases, setPhases] = useState(props.items.map(phase => {
        return {
          ...phase,
          start: null,
          duration: 0,
          end: null,
          budget: 0,
          tasks:0,
          curTasks:0,
        };
      }));
    const {project, setProject} = useContext(ProjectContext);
    const [fullBudget, setFullBudget] = useState(project.budget);
    const [fullDuration, setFullDuration] = useState(project.duration)
    const [firstError,setFirstError] = useState("hidden");
    const [secondError,setSecondError] = useState("hidden");
    const [checked, setChecked] = useState(false);
    const [list, setList] = useState("");
    const [totalBudget, setTotalBudget] = useState(phases.reduce((acc, phase) => acc + phase.budget, 0));
    const [totalDuration, setTotalDuration] = useState(phases.reduce((acc, phase) => acc + phase.duration, 0));
    const [phaseInitForm, setPhaseInitForm] = useState(true);
    const [editReady, setEditReady] = useState("Ready");
    const [disableChBox, setDisableChBox] = useState(false);
    const [employeeSalary, setEmployeeSalary] = useState("");

    useEffect(() => {
        if (totalBudget === 0){
            setSecondError("hidden");
        } else if (fullBudget - totalBudget !== 0 ){
            setSecondError("shown");
        } else {
            setSecondError("ok");            
        }
        if(totalDuration ===0){
            setFirstError("hidden");
        } else if (fullDuration - totalDuration !==0 ){
            setFirstError("shown");
        } else {
            setFirstError("ok");
        }
    }, [totalBudget, totalDuration]);

    const calculateEndDate = (start, duration) => {
        if (start) {       
            const [year, month] = start.split('-');
            const endDate = new Date(year, parseInt(month, 10) - 2, 1);
            let end; 
            if (duration !== 0){
                end = new Date(endDate.getFullYear(), endDate.getMonth() + duration, endDate.getDate());  
                end = new Date(end.getFullYear(), end.getMonth() + 1, 0);
            } else {
                end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());  
                end = new Date(end.getFullYear(), end.getMonth() + 1, 0);
            }
            return format(end, 'yyyy-MM-dd'); // Format the end date as "YYYY-MM-DD"          
        } else {
          return null;
        }
      };      

      const handleDateChange = (event, index) => {
        const newPhases = [...phases];
        const phase = newPhases[index];        
        let startDate;
        if (event.target.value === null || event.target.value === ''){
            startDate = null;
            phase.start = startDate;
        } else{
            const [year, month] = event.target.value.split('-');
            startDate = new Date(year, parseInt(month, 10) - 1, 1);
            phase.start = format(startDate, 'yyyy-MM-dd');
        }        
        if (phase.duration > 0) {
            phase.end = calculateEndDate(phase.start, phase.duration);
        } else {
            phase.end = calculateEndDate(phase.start, 0);
        }        
        setPhases(newPhases);
      };
          

      const handleDurationChange = (event, index) => {
        const newPhases = [...phases];
        const phase = newPhases[index];
        const prevDuration = phase.duration;
        let newDuration;
        if (event.target.value === null || event.target.value === ''){
            newDuration = 0;
        } else{
            newDuration = Number(event.target.value);
        }         
        const diff = newDuration - prevDuration;
        phase.duration = newDuration;
        if (phase.start !== null) {
            phase.end = calculateEndDate(phase.start, phase.duration);
        }
        //phase.end = calculateEndDate(phase.start, newDuration)
        setPhases(newPhases); // update the phases state with the updated phases array
        setTotalDuration(prevTotalDuration => prevTotalDuration + diff);
      };    

      const handleBudgetChange = (event, index) => {
        const newPhases = [...phases];
        const phase = newPhases[index];
        const prevBudget = phase.budget;
        const newBudget = Number(event.target.value);
        const diff = newBudget - prevBudget;

        phase.budget = newBudget;
        setPhases(newPhases); // update the phases state with the updated phases array
        setTotalBudget(prevTotalBudget => prevTotalBudget + diff);
      };

      const handleTasksChange = (event, index) => {
        const newPhases = [...phases];
        const phase = newPhases[index];        
        const tasks = Number(event.target.value);
        phase.tasks = tasks;
        setPhases(newPhases); // update the phases state with the updated phases array
        console.log(newPhases);
      };

      const handleToggle = (employee) => () => {
        if(checked !== employee){

            setDisableChBox(true);
            setChecked(employee);
            setEmployeeSalary(employee.salary*fullDuration)
            props.onEnableNext(phases, true, employee, employee.salary*fullDuration);
        } else {
            setDisableChBox(false);
            setChecked(false);
            setEmployeeSalary("");
            props.onEnableNext(phases, false, [], 0);
        }
      }
      const getEmployees = async () => {

        if(editReady==="Ready"){
            try {
                const response = await axios.get(`http://localhost:8090/employee/findAll`)
                const data = await response.data.filter((item) => item.hired !== 3).filter((item) => item.contract !== "4");
                setPhaseInitForm(false);
                setEditReady("Undo");
                setList(data);
            } catch (error) {
            }
        }else{
            setPhaseInitForm(true);
            setEditReady("Ready");
            setList("");
            setEmployeeSalary("");
            props.onEnableNext(phases, false, []);
        }
    };

      const ManagerList = (employees) => (
        <Paper sx={{borderRadius: '14px', height: 740, width: 280, backgroundColor:'gray', overflow: 'auto' }}>
            <List dense component="div" role="list">
            {employees.map((employee) => {
            const labelId = `transfer-list-item-${employee.id}-label`;
            return (
            <ListItem
                sx={{height: 75, borderBottom: 1}}
                key={employee.id}
                role="listitem"
                button
            >
                <ListItemIcon>
                <Radio
                    onClick={handleToggle(employee)}
                    color="primary"
                    checked={checked === employee}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                        'aria-labelledby': labelId,
                    }}
                    sx={{
                        '&.Mui-checked': {
                            color: '#48601d', // Change the checked color to green
                        },
                    }}
                />
                </ListItemIcon>
                <ListItemText id={labelId}>
                <div>
                    <div style={{fontSize:'18px', fontWeight:'bold'}}>{employee.name}</div>
                    <div style={{fontSize:'14px'}}>
                    Contract: {employee.contract} Salary: {employee.salary}
                    </div>
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
        <Grid>
            <Grid container spacing={3} justifyContent="center" alignItems="center">   
                <Grid item>
                    <Grid item sx={{maxHeight:620, overflow: 'auto'}}>
                        {phases.map((phase, index) => (
                            <Stack className='full-group' spacing={0.5} key={index} >
                        <h2>{phase.name}</h2>
                        <div>
                            <label htmlFor={`phase-${index}-start`}>Start Month:</label>
                            <input
                            required
                            type="month"
                            id={`phase-${index}-start`}
                            name={`phase-${index}-start`}
                            onChange={(event) => handleDateChange(event, index)}
                            disabled={editReady!=="Ready"}
                            className='text-input'
                            />
                            <label htmlFor={`phase-${index}-duration`}>Duration:</label>
                            <input
                            required
                            type="number"
                            id={`phase-${index}-duration`}
                            name={`phase-${index}-duration`}
                            defaultValue={phase.duration}
                            disabled={editReady!=="Ready"}
                            onChange={(event) => handleDurationChange(event, index)}
                            className='duration-input'
                            />
                            <label htmlFor={`phase-${index}-budget`}>Budget:</label>
                            <input
                            required
                            type="number"
                            id={`phase-${index}-budget`}
                            name={`phase-${index}-budget`}
                            defaultValue={phase.budget}
                            disabled={editReady!=="Ready"}
                            onChange={(event) => handleBudgetChange(event, index)}
                            className='budget-input'
                            />
                            <label htmlFor={`phase-${index}-budget`}>No. of Tasks:</label>
                            <input
                            required
                            type="number"
                            id={`phase-${index}-tasks`}
                            name={`phase-${index}-tasks`}
                            defaultValue={phase.tasks}
                            disabled={editReady!=="Ready"}
                            onChange={(event) => handleTasksChange(event, index)}
                            className='tasks-input'
                            />
                        </div>
                            </Stack>
                        ))}
                    </Grid>  
                    <Grid item className='attention'>
                        <Box justifyItems='right' sx={{ flexDirection: 'row', display: 'flex'}}>
                            <Typography elevation={0} sx={{fontSize:18, fontWeight:'bold'}}>
                                <div> Total Duration Of Project (in months): {fullDuration} /
                                    {firstError === "shown" && <span style={{color:'#ff4112'}}> {totalDuration}</span>}
                                    {firstError === "ok" && <span style={{color:'#619d06'}}> {totalDuration}</span>}
                                </div>
                                <div> Total Budget of Project : {fullBudget} /
                                    {secondError === "shown" && <span style={{color:'#ff4112'}}> {totalBudget}</span>}
                                    {secondError === "ok" && <span style={{color:'#619d06'}}> {totalBudget} {employeeSalary!=="" && <span style={{color:'#ff4112'}}> -{employeeSalary}</span>}</span>}
                                </div>
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 1 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <SimpleButton onClick={getEmployees} disabled={firstError !== "ok" || secondError !== "ok"} label={editReady}/>
                        </Box>                            
                    </Grid>    
                </Grid>               
                <Grid item >
                    {list!=="" && ManagerList(list)}
                </Grid>          
            </Grid>            
        </Grid>
    );}


export default PhasesInitialize;

