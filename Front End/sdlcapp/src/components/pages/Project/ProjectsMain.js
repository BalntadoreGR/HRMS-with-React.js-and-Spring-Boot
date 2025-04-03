import Card from "../../UI/Card";
import AddButton from "../../UI/AddButton/AddButton";
import ListProject from "./ListProject/ListProject";
import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import ManageAccounts from "@mui/icons-material/ManageAccounts";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddProject from "./AddProject/FirstInitialize/AddProject";
import { Fragment } from "react";
import './ProjectsMain.css';
import { Grid, Paper, IconButton, Typography } from "@mui/material";
import SimpleButton from "../../UI/SimpleButton/SimpleButton";
import UserProfile from "../../users/UserProfile";
import { useNavigate } from "react-router-dom";
import ViewEmployee from "../Employee/ListEmployee/ListActions/ViewEmployee/ViewEmployee";
import EditEmployee from "../Employee/ListEmployee/ListActions/EditEmployee/EditEmployee";

const ProjectsMain = () => {
    const isLoggedIn = UserProfile.getUser() !== null;
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [addFormIsShown, setAddFormIsShown] = useState(false);
    const [viewFormIsShown,setViewFormIsShown] = useState("");
    const [editFormIsShown,setEditFormIsShown] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      if (!isLoggedIn){
          navigate('/home');
      }
  },[]);

    const showAddForm = () => {
        setAddFormIsShown(true);

    }
    const hideAddForm = () => {
        setAddFormIsShown(false);
    }

    const viewHandler = (employee) => {
      setViewFormIsShown(employee); 
  }

    const editHandler = (employee) => {
      setEditFormIsShown(employee);
    }

    const fetchProjectsHandler = useCallback(async () => {
        
          setIsLoading(true);
          setError(null);
          try {
            let response;
            let data;
            let loadedProjects = [];
            if ( UserProfile.getRole() === "Admin"){
              response = await axios.get('http://localhost:8090/project/findAll');
              data = response.data;
            }
            if (UserProfile.getRole() === "Manager"){
              response = await axios.get(`http://localhost:8090/payment/employee/${UserProfile.getUser().id}`);
              data = response.data.filter(payment => payment.contract === 2).reduce((uniqueProjects, payment) => {
                const projectId = payment.phase.project.id;
              
                // Εάν το project δεν υπάρχει ήδη στο uniqueProjects array, προσθέστε το
                if (!uniqueProjects.some(project => project.id === projectId)) {
                  uniqueProjects.push(payment.phase.project);
                }
              
                return uniqueProjects;
              }, []);
            }
            if (UserProfile.getRole() === "Employee"){
              response = await axios.get(`http://localhost:8090/payment/employee/${UserProfile.getUser().id}`);
              data = response.data.reduce((uniqueProjects, payment) => {
                const projectId = payment.phase.project.id;
              
                // Εάν το project δεν υπάρχει ήδη στο uniqueProjects array, προσθέστε το
                if (!uniqueProjects.some(project => project.id === projectId)) {
                  uniqueProjects.push(payment.phase.project);
                }
              
                return uniqueProjects;
              }, []);
            }

            for (const key in data) {
              loadedProjects.push({
                id: data[key].id,
                name: data[key].name,
                budget: data[key].budget,
                duration: data[key].duration,
                tasks: data[key].tasks,
                curTasks: data[key].curTasks,
                status: data[key].status,
              })
            }
      
            setProjects(loadedProjects);
            console.log(projects);
          } catch (error) {
            setError(error.message);
          }
          setIsLoading(false);
      }, [addFormIsShown]);

      const addProjectHandler = async (project) => {

        await axios.post("http://localhost:8090/project/add", project);
        setProjects([...projects, project]);
        setAddFormIsShown(false);    
      }

      useEffect(() => {
        fetchProjectsHandler();
      }, [fetchProjectsHandler]);
    
      
    let content = <p>Found no Projects.</p>;
    

  if (projects.length > 0) {
    content = <ListProject onEditFormClose={hideAddForm} onRefreshList={fetchProjectsHandler} projects={projects} />;
              
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  const logout = () => {
    UserProfile.setUser(null);
    UserProfile.setRole(null);
    navigate('/home');
  }

  const dashbtn = () => {    
    navigate('/dashboard');
  }

    
    return (
        <div className="projects">
            {isLoggedIn && <Card container>              
              <Grid container direction="column" >
                <Grid container direction="row" justifyContent="space-between" alignItems="center" marginBottom={1} marginTop={1}>
                  <Grid item>
                    <Grid item>
                      {addFormIsShown && <AddProject onAddFormClose={hideAddForm} onAddProject={addProjectHandler}/>}
                      {UserProfile.getRole()==="Admin" && <AddButton label="Add New Project" onClick={showAddForm} />}
                    </Grid>
                  </Grid>  
                  <Grid item>
                    <Grid container spacing={1}>
                      <Grid item>
                        <Typography sx={{paddingLeft:"20px", paddingRight:"20px", borderRadius:"14px", color: "#48601d", backgroundColor: 'black' }}>
                          <Grid container direction="column">
                            <Grid item lineHeight={1.4}>
                             <span style={{fontWeight:"bold"}}>{UserProfile.getUser().name} (Pid:{UserProfile.getUser().pid}) </span>                               
                            </Grid>
                            <Grid item lineHeight={1.4}>
                             <span style={{fontWeight:"bold"}}>Connected As : {UserProfile.getRole()} </span>
                            </Grid>
                          </Grid>
                        </Typography>
                      </Grid>
                      <Grid item>
                        {editFormIsShown !=="" && <EditEmployee onCancel={ () => editHandler('')} emp_info={editFormIsShown}/>}
                        {UserProfile.getRole()==="Employee" && <IconButton onClick={() => editHandler(UserProfile.getUser())} sx={{ marginLeft: "10px", color:'black', border: '1px solid black', backgroundColor:'#48601d', '&:hover': {color: 'black', border: '1px solid black', backgroundColor:'#3a4c17'}}}><ManageAccounts /> </IconButton>}
                      </Grid>
                      <Grid item>
                        {viewFormIsShown !=="" && <ViewEmployee onCancel={ () => viewHandler('')} emp_info={viewFormIsShown}/>}
                        {UserProfile.getRole()==="Employee" && <IconButton onClick={() => viewHandler(UserProfile.getUser())} sx={{  color:'black', border: '1px solid black', backgroundColor:'#48601d', '&:hover': {color: 'black', border: '1px solid black', backgroundColor:'#3a4c17'}}}><AccountCircleIcon /> </IconButton>}
                      </Grid> 
                      <Grid item>
                        <IconButton onClick={() => logout()} sx={{ border: '1px solid black', backgroundColor: '#48601d',color: 'black', '&:hover': {color: 'black',border: '1px solid black', backgroundColor:'#3a4c17'} }}><LogoutIcon /></IconButton>
                      </Grid>                                        
                    </Grid>
                  </Grid>                
                </Grid>
                <Grid container marginTop={2}>
                  <Grid item width="100%">
                    {content}
                  </Grid>
                </Grid>
                <Grid container marginTop={2}>
                  <Grid item>
                    {UserProfile.getRole() === "Admin" && <SimpleButton label="Back to Dashboard" onClick={() => dashbtn()}></SimpleButton>}                    
                  </Grid>
                </Grid>
              </Grid>
            </Card> }   
        </div>
    );
}

export default ProjectsMain;