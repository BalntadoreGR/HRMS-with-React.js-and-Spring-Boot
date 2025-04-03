import {Button, Box, Grid, Stack} from '@mui/material';
import React, { useState, useEffect } from 'react';
import Card from '../../../../UI/Card';
import axios from 'axios';
import './SecInitFinish.css';

const SecInitFinish = (props) => {
    const [project, setProject] = useState(props.project);
    const [phases, setPhases] = useState([]);
    const [manager, setManager] = useState(props.manager);
    const [sendDisabled, setSendDisabled] = useState(true);   
    
    const fetchData = async () => {
      try {
        const projectId = props.project.id; // Replace with the actual project ID
        const response = await axios.get(`http://localhost:8090/project/${projectId}/phases`);
        const sortedPhases = response.data.sort((a, b) => a.id - b.id);
        setPhases(sortedPhases);
      } catch (error) {
        console.error('Error retrieving phases:', error);
      }
    };

    const setManagerHandler = async () => {
      phases.map(async (phase) => {
        const response = await axios.post(`http://localhost:8090/phase/${phase.id}/addEmployee/${manager.id}`, {
          headers: {'Content-Type': 'application/json'}, });
        const paycheck = manager.salary * phase.duration;
        const newcontract = 2;
        const secResponse = await axios.post(`http://localhost:8090/payment/add/${phase.id}/${manager.id}?pay=${paycheck}&contract=${newcontract}`, {
          headers: {'Content-Type': 'application/json'},});
      }) 
      props.onSend();
  };
  
    useEffect(() => {
      fetchData();
    }, []);

    useEffect(() => {
      setManagerHandler();
    }, [phases]);

    const handleSend = async () => {
        setSendDisabled(false);
        props.onSend();
      };
  
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid container spacing={3} justifyContent="center" alignItems="center" paddingTop={2} paddingBottom={3}>
        <Grid item width='auto'>
          <div className='firstGrid'>
            <div className="firstGrid-content">
              <h2> Project Id : {project.id}</h2>
              <p> Project Name : {project.name}</p>
              <p> Budget : {project.budget} Euros</p>
              <p> Duration : {project.duration} Months</p>
            </div>
          </div>
        </Grid>
        <Grid item width='auto'>
          <div className='firstGrid'>
            <div className="secondGrid-content">
              <h2>Manager :</h2>
              <p> Employee Name : {manager.name}  (Id : {manager.id})</p>
              <p>Email : {manager.email}</p>
              <p style={{fontWeight:'bold'}}>Whole Project Payment: {project.duration*manager.salary} </p>
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid item width='auto' sx={{maxHeight:545, overflow: 'auto'}} >
        {phases.map((phase, index) => {
            return(
                <Stack className='groupaki' spacing={0.5} key={index}>
                  
                  <h3>Phase Type: {phase.type}, Budget: {phase.budget}, Manager Budget : {phase.duration*manager.salary}</h3> 
                  <p>Start: {phase.start}, End: {phase.end}, Duration: {phase.duration} Months, Tasks : {phase.tasks}</p>
                </Stack> 
            );
        })}
      </Grid>
    </Grid>
        
  );
}

export default SecInitFinish;