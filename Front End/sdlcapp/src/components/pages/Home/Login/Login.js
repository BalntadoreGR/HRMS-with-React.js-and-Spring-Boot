import React, { useState } from "react";
import { Grid, TextField, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { Fragment } from "react";
import Card from "../../../UI/Card";
import SimpleButton from "../../../UI/SimpleButton/SimpleButton";
import axios from "axios";
import LoginCard from "../../../UI/LoginCard";
import { useNavigate } from "react-router-dom";
import UserProfile from "../../../users/UserProfile";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Employee");
    const [error, setError] = useState(" ");
    const navigate = useNavigate();
    const isLoggedIn = UserProfile.getUser() !== null;

    const login = async () => {
        if ( username === "" || password === "" ){
            setError("Fill all fields!");
        }
        if (username !== "" && password !== ""){
            try {
                const logged_user = await axios.post(`http://localhost:8090/employee/login`, {
                    email: username,
                    password: password
                });
                if (logged_user.data === "") {
                    setError("Wrong Credentials!");
                }
                if (logged_user.data !== "") {
                    if (role === "Admin" && logged_user.data.hired === 3){
                        UserProfile.setUser(logged_user.data);
                        UserProfile.setRole(role);
                        navigate('/dashboard');
                    } else {
                        setError("Wrong Credentials for Admin!");
                    }
                    
                    if (role === "Employee"){
                        UserProfile.setUser(logged_user.data);
                        UserProfile.setRole(role);
                        navigate('/projects');
                    }
                    if (role === "Manager") {
                        UserProfile.setUser(logged_user.data);
                        UserProfile.setRole(role);
                        navigate('/projects');
                    }
                }    
            } catch (error) {
                console.error('Error with login process:', error);
            }
        }                
    };

    const logout = () => {
        UserProfile.setUser(null);
        UserProfile.setRole(null);
        navigate('/home');
    }

    const dashbtn = () => {
        navigate('/dashboard');
    }

    const projbtn = () => {
        navigate('/projects');
    }
  
    return (
        <LoginCard>
            {!isLoggedIn ? (
            <Grid>
                <Grid container justifyContent="center" alignItems="center" marginBottom={3}>
                    <Grid item>
                        <h1 style={{textAlign:"center", color: "rgb(73, 97, 28)"}}>Log in</h1>
                    </Grid>
                </Grid>
                <Grid container spacing={5} justifyContent="center" alignItems="center" direction="row" marginBottom={3}>
                    <Grid item>
                        <Grid item>
                            <Grid item><span style={{fontWeight:"bold",color: "rgb(73, 97, 28)"}}>Email Add. : </span></Grid>
                            <Grid item>
                                <TextField sx={{input: { color: 'rgb(73, 97, 28)', fontWeight: 'bold' },'& .MuiOutlinedInput-root':{'& fieldset':{border:'2px solid rgb(73, 97, 28)'}, '&:hover fieldset': {border: '3px solid rgb(73, 97, 28)'},
                                '&.Mui-focused fieldset':{border: '3px solid rgb(73, 97, 28)'}}}} id="outlined-basic" size="small" value={username} type="text" onChange={(e) => {setUsername(e.target.value); setError("");}}/>
                            </Grid>
                        </Grid>
                        <Grid item marginTop={2}>
                            <Grid item><span style={{fontWeight:"bold", color: "rgb(73, 97, 28)"}}>Password : </span></Grid>
                            <Grid item>
                                <TextField sx={{ input: { color: 'rgb(73, 97, 28)', fontWeight: 'bold' }, '& label.Mui-focused':{border:'3px solid rgb(73, 97, 28)'}, '& .MuiInput-underline:after':{border:'2px solid rgb(73, 97, 28)'}, 
                                '& .MuiOutlinedInput-root':{'& fieldset':{border:'2px solid rgb(73, 97, 28)'}, '&:hover fieldset': {border: '3px solid rgb(73, 97, 28)'},
                                '&.Mui-focused fieldset':{border: '3px solid rgb(73, 97, 28)'}}}} id="outlined-basic" size="small" value={password} type="password" onChange={(e) => {setPassword(e.target.value); setError("");}}/>
                            </Grid>
                        </Grid>                        
                    </Grid>
                    <Grid item marginTop={2}>
                        <Grid container spacing={2} direction="column" >
                        <Grid item>
                            <RadioGroup
                            aria-label="Role"
                            name="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            >
                                <FormControlLabel value="Admin" control={<Radio sx={{'&, &.Mui-checked':{color: "rgb(73, 97, 28)"}}}/>} label="Admin" style={{ color: "rgb(73, 97, 28)" }}/>
                                <FormControlLabel value="Manager" control={<Radio sx={{'&, &.Mui-checked':{color: "rgb(73, 97, 28)"}}}/>} label="Manager" style={{ color: "rgb(73, 97, 28)" }}/>
                                <FormControlLabel value="Employee" control={<Radio sx={{'&, &.Mui-checked':{color: "rgb(73, 97, 28)"}}}/>} label="Employee" style={{ color: "rgb(73, 97, 28)" }}/>
                            </RadioGroup>
                        </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container justifyContent="flex-end">
                <SimpleButton label="Login" onClick={() => login()}/>
                </Grid>
                <Grid container>
                    <Grid item marginTop={-7} marginLeft={7.5}>
                        <Grid item style={{color:"red"}}>{error}</Grid>
                    </Grid>
                </Grid>
        </Grid>) : (
            <Grid>
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item marginTop={8}>
                        <span style={{fontSize:24, fontWeight:"bold"}}> You are logged in as : {UserProfile.getRole()}</span>
                    </Grid>
                    <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" marginTop={5} marginBottom={5}>
                        <Grid item>
                            <SimpleButton label="Logout" onClick={() => logout()}/>
                        </Grid>
                        <Grid item>
                            {UserProfile.getRole() === "Admin" && <SimpleButton label="Back to Dashboard" onClick={() => dashbtn()}/> || <SimpleButton label="Back to Projects" onClick={() => projbtn()}/>}
                        </Grid>                    
                    </Grid>
                </Grid>
            </Grid>
        )}  
      </LoginCard>
    );
};

export default Login;

