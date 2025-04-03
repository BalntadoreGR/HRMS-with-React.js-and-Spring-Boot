import React, { useState, useEffect, useMemo } from "react";
import {Typography, Popover, Button} from "@mui/material";
import "./HierarchyGraph.css"
import "gantt-task-react/dist/index.css";
import styled from 'styled-components';
import { Tree, TreeNode } from 'react-organizational-chart';
import axios from "axios";
import UserProfile from "../../../../users/UserProfile";

const StyledNode = styled.div`
  padding: 5px;
  border-radius: 3px;
  display: inline-block;
  border: 2px solid #48601d;
  background-color: #48601d;
  font-size: 13px;
  font-weight: bold;
  color: black;
  cursor: pointer;
`;

const HierarchyGraph = (props) => {
    const [data, setData] = useState("");
    const [showPopup, setShowPopup] = useState("");
    const [phases, setPhases] = useState(props.items);
    const projectId = `project_info-${props.project.id}-label`;

    useEffect(() => {
      if(props.items){
        console.log(props.items);
        const nodes = props.items?.sort((a, b) => a.id - b.id).map((phase) => { 
          const phaseId = `phase_info-${phase.id}-label`;
          const tasks = phase.tasks;
          let curTasks = phase.curTasks;
          return (
            <TreeNode key={phase.id} label={
            <div>
              <StyledNode id={phaseId} onClick={() => setShowPopup(phase)}>
                {phase.type}
              </StyledNode>
              <Popover
                open={showPopup === phase}
                anchorEl={document.querySelector(`#phase_info-${phase.id}-label`)}
                onClose={() => setShowPopup(null)}
                anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              >
                <Typography sx={{ p: 1, background: "linear-gradient(90deg, rgb(26, 23, 23, .95) 0%, rgb(28, 27, 27, .95) 100%)", fontSize: '15px', fontWeight: 'bold', color: 'gray'}}>
                  <div>Phase Id: {phase.id}</div>
                  <div>Duration: {phase.duration}</div>
                  <div>From {phase.start} to {phase.end}</div>
                  <div>Budget: {phase.budget}</div>
                  <div>Tasks Completed: {curTasks}/{tasks}   {tasks !== curTasks && UserProfile.getRole() === "Manager" && <Button disabled ={props.project.status === 4} sx={{ my: 0.5, color:'black', border: '1px solid black', backgroundColor:'#48601d','&:hover': {color: 'black', backgroundColor:'#3a4c17', border: '1px solid black'} }} size="small" onClick={() => clickTaskIncrease(phase)}>Next</Button>}</div>
                  {/* Άλλες πληροφορίες που θέλετε να εμφανίσετε */}
                </Typography>
              </Popover>
            </div>}>
              {phase.employees.map((employee) => {
                const employeeId = `employee_info-${employee.id}-label`;            
                  return (
                    <TreeNode key={employee.id} label={
                    <div>
                      <StyledNode id={employeeId} onClick={() => setShowPopup(employee)}>
                        {employee.name}
                      </StyledNode>
                      <Popover
                        open={showPopup === employee}
                        anchorEl={document.querySelector(`#employee_info-${employee.id}-label`)}
                        onClose={() => setShowPopup(null)}
                        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                      >
                        <Typography sx={{ p: 1, background: "linear-gradient(90deg, rgb(26, 23, 23, .95) 0%, rgb(28, 27, 27, .95) 100%)", fontSize: '15px', fontWeight: 'bold', color: 'gray'}}>
                          <div>Employee Id: {employee.id}</div>
                          <div>Total Payment: {employee.pay}</div>
                          <div>Works as: {employee.newContract === 8 && <span> Full Time</span> || employee.newContract === 6 && <span> Half Time</span> || employee.newContract === 4 && <span> 4hr/month</span>}</div>
                          <div>Contact: {employee.email}</div>
                          {/* Άλλες πληροφορίες που θέλετε να εμφανίσετε */}
                        </Typography>
                      </Popover>
                    </div>}></TreeNode>
                  );
              })}

            </TreeNode>
          );
        });
        setData(nodes);
      }
    }, [props.items, showPopup]);

    const clickTaskIncrease = async (phase) => {
      try {
        const response = await axios.post(`http://localhost:8090/phase/changeTask/${phase.id}`);
        props.onTaskIncrease();
      } catch (error) {
        console.log(error);
      }
      try {
        const secResponse = await axios.post(`http://localhost:8090/project/changeTask/${props.project.id}`);
      } catch (error) {
        console.log(error);
      }
      
    };

    return (
        <div className='tree'>
          
        <Tree sx nodePadding={'4px'} lineWidth={'3px'} lineColor={'gray'} lineBorderRadius={'10px'} label={<div><StyledNode id={projectId} onClick={() => setShowPopup(props.project)}>{props.project.name}</StyledNode>
              <Popover
                open={showPopup === props.project}
                anchorEl={document.querySelector(`#project_info-${props.project.id}-label`)}
                onClose={() => setShowPopup(null)}
                anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              >
                <Typography sx={{ p: 1, background: "linear-gradient(90deg, rgb(26, 23, 23, .95) 0%, rgb(28, 27, 27, .95) 100%)", fontSize: '15px', fontWeight: 'bold', color: 'gray'}}>
                  <div>Manager : {props.manager.name}</div>
                  <div>Manager Project Payment: {props.manager.salary*props.project.duration}</div>
                  <div>Contact: {props.manager.email}</div>
                  <div>Project Id: {props.project.id}</div>
                  <div>Project Budget: {props.project.budget}</div>
                  <div>Project Duration: {props.project.duration}</div>
                  <div>Tasks Completed: {props.project.curTasks}/{props.project.tasks} </div>
                  {/* Άλλες πληροφορίες που θέλετε να εμφανίσετε */}
                </Typography>
              </Popover></div>}>{data}</Tree>  
        </div>    
    );
};
export default HierarchyGraph;