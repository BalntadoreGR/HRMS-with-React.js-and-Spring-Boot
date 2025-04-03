import Card from "../../UI/Card";
import AddButton from "../../UI/AddButton/AddButton";
import ListEmployee from './ListEmployee/ListEmployee';
import React, { useState, useCallback, useEffect } from "react";
import AddEmployee from "./AddEmployee/AddEmployee";
import axios from "axios";
import LogoutIcon from '@mui/icons-material/Logout';
import { Grid, Paper, IconButton, Typography } from "@mui/material";
import './EmployeesMain.css';
import UserProfile from "../../users/UserProfile";
import { useNavigate } from "react-router-dom";
import SimpleButton from "../../UI/SimpleButton/SimpleButton";

const EmployeesMain = () => {

    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [addFormIsShown, setAddFormIsShown] = useState(false);
    const currentUser = UserProfile.getUser();
    const currentRole = UserProfile.getRole();
    const navigate = useNavigate();
    const isLoggedIn = UserProfile.getUser() !== null;

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

    const fetchEmployeesHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await axios.get('http://localhost:8090/employee/findAll');    
          const data = response.data.sort((a, b) => a.id - b.id).filter((item) => item.hired !== 3);
    
          const loadedEmployees = [];
          
          for (const key in data) {
            loadedEmployees.push({
              id: data[key].id,
              name: data[key].name,
              email: data[key].email,
              pid: data[key].pid,
              birth: data[key].birth,
              contract: data[key].contract,
              salary: data[key].salary,
              hired: data[key].hired,
              password: data[key].password,
            })
          }
    
          setEmployees(loadedEmployees);
          console.log(employees);
        } catch (error) {
          setError(error.message);
        }
        setIsLoading(false);
      }, [addFormIsShown]);

      const addEmployeeHandler = async (employee) => {

        await axios.post("http://localhost:8090/employee/add", employee);
        setAddFormIsShown(false);    
      }

      useEffect(() => {
        fetchEmployeesHandler();
      }, [fetchEmployeesHandler]);
    
      
    let content = <p>Found no Employees.</p>;

  if (employees.length > 0) {
    content = <ListEmployee onRefreshList={fetchEmployeesHandler} onEditFormClose={hideAddForm} employees={employees} />;
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
      <div className="employees">
      {isLoggedIn && <Card>              
        <Grid container direction="column">
          <Grid container direction="row" justifyContent="space-between" alignItems="center" marginBottom={1} marginTop={1}>
            <Grid item>
              <Grid item>
                {addFormIsShown && <AddEmployee onAddFormClose={hideAddForm} onAddEmployee={addEmployeeHandler}/>}
                <AddButton label="Add New Employee" onClick={showAddForm} />
              </Grid>
            </Grid>  
            <Grid item>
              <Grid container spacing={1}>
                <Grid item>
                  <Typography sx={{paddingLeft:"20px", paddingRight:"20px", borderRadius:"10px", color: "#48601d", backgroundColor: 'black' }}>
                    <Grid container direction="column">
                      <Grid item lineHeight={1.4}>
                        <span style={{fontWeight:"bold"}}>{currentUser.name} ({currentUser.pid}) </span>
                        </Grid>
                      <Grid item lineHeight={1.4}>
                        <span style={{fontWeight:500}}>Connected As : {currentRole} </span>
                      </Grid>
                    </Grid>
                  </Typography>
                </Grid>   
                <Grid item>
                  <IconButton onClick={() => logout()} sx={{ border: '1px solid black', backgroundColor: '#48601d',color: 'black', '&:hover': {color: 'black',border: '1px solid black', backgroundColor:'#3a4c17'}, marginLeft:'10px' }}><LogoutIcon /></IconButton>
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
              <SimpleButton label="Back to Dashboard" onClick={() => dashbtn()}></SimpleButton>  
            </Grid>
          </Grid>
        </Grid>
      </Card> }          
    </div>
  );
}

export default EmployeesMain;