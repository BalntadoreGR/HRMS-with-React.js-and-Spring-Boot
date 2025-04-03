import { Button, Grid, IconButton, Paper, Typography } from "@mui/material";
import React, { useState, useCallback, useEffect } from "react";
import { Fragment } from "react";
import './Dashboard.css';
import Card from "../../UI/Card";
import SimpleButton from "../../UI/SimpleButton/SimpleButton";
import { useNavigate } from "react-router-dom";
import UserProfile from "../../users/UserProfile";
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LogoutIcon from '@mui/icons-material/Logout';

const Dashboard = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const isLoggedIn = UserProfile.getUser() !== null;

    useEffect(() => {
        if (!isLoggedIn){
            navigate('/home');
        }else {
            if (UserProfile.getRole() !== "Admin"){
                navigate('/home');
            }
        }
    },[]);
    

    const projectBtn = () => {
        navigate('/projects');
    }

    const employeeBtn = () => {
        navigate('/employees');
    }

    const logoutBtn = () => {
        UserProfile.setUser(null);
        UserProfile.setRole(null);
        navigate('/home');
    }
  
    return (
      <div className="dashboard">        
            {isLoggedIn && UserProfile.getRole() === "Admin" && <Grid>
                <Typography sx={{ paddingTop: "20px", paddingBottom: "10px", paddingLeft: "10px", paddingRight: "10px", width: 500, height: "auto", borderRadius: '14px', backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
                    <Grid container justifyContent="center" marginBottom={2}>
                        <Grid item>
                            <span style={{ color:'#48601d', fontWeight: 'bold', fontSize: '30px'}}>Admin</span> 
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center" marginBottom={3}>
                        <Grid item>
                            <Button onClick={() => projectBtn()} sx={{ fontSize: '20px', width:'200px', marginLeft: "10px", color:'black', border: '1px solid black', backgroundColor:'#48601d', '&:hover': {color: 'black', border: '1px solid black', backgroundColor:'#3a4c17'}}}><AssignmentIcon size="large"/> Projects</Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={() => employeeBtn()} sx={{ fontSize: '20px', width:'200px', marginLeft: "10px", color:'black', border: '1px solid black', backgroundColor:'#48601d', '&:hover': {color: 'black', border: '1px solid black', backgroundColor:'#3a4c17'}}}><AssignmentIndIcon /> Employees</Button>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="flex-end">
                        <Grid item >
                        <Button size="small" onClick={() => logoutBtn()} sx={{ border: '1px solid black', backgroundColor: '#48601d',color: 'black', '&:hover': {color: 'black',border: '1px solid black', backgroundColor:'#3a4c17'}, marginLeft:'10px' }}><LogoutIcon /> Logout</Button>
                        </Grid>
                    </Grid>                    
                </Typography>
            </Grid>}
      </div>
    );
};

export default Dashboard;