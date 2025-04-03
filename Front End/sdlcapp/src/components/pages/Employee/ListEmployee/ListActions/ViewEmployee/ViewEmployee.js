
import ViewEmployeeModal from "../../../../../UI/ViewEmployeeModal/ViewEmployeeModal";
import React, { useState, useCallback, useEffect, useRef } from "react";
import {ListSubheader, Typography, Popover, Paper, List, Grid, ListItem, ListItemIcon, ListItemText, Collapse, IconButton} from '@mui/material';
import axios from "axios";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Card from "../../../../../UI/Card";
import './ViewEmployee.css';
import SimpleButton from "../../../../../UI/SimpleButton/SimpleButton";

const ViewEmployee = (props) => {
  const [employee, setEmployee] = useState(props.emp_info);
  const [payments, setPayments] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [newList, setNewList] = useState([]);
    const [searchValue, setSearchValue] = useState('');

  useEffect(() => {  
    if (props) {
      getPayments();
    }  
  }, [props]);

  const getPayments = async () => {
    try {
      const response = await axios.get(`http://localhost:8090/payment/employee/${props.emp_info.id}`);
      console.log(response.data);
      const sortedPayment = response.data.sort((a, b) => b.id - a.id);
      setPayments(sortedPayment);
      setNewList(sortedPayment)
    } catch (error) {
      console.log(error);
    }
  };


  const handleToggle = (id) => () => {
    setAnchorEl(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (value) => {
    setSearchValue(value); // Αποθηκεύστε τη νέα τιμή του "search textfield"
  
    if (value === '') {
      setNewList(payments); // Εμφανίστε την πλήρη λίστα όταν το "search textfield" είναι άδειο
    } else {
      // Φιλτράρετε τη λίστα υπαλλήλων με βάση το όνομα
      const filteredList = payments.filter((payment) =>
        payment.phase.project.name.toLowerCase().includes(value.toLowerCase()) || payment.phase.type.toLowerCase().includes(value.toLowerCase())
      );
      setNewList(filteredList); // Ανανεώστε τη λίστα με τα αποτελέσματα της αναζήτησης
    }
}

  return (
    <ViewEmployeeModal onClose={props.onCancel}>
      <Typography sx={{ mt: 2, mb: 1 }}>
        <Grid >
            <Grid container spacing={4} paddingTop={1} paddingBottom={3} justifyContent="center" alignItems="top">
              <Grid item>
                <div className="employee_info">
                  <div className="id">Employee Id : {employee.id}</div>                
                  <div>Name : {employee.name}</div>
                  <div>Email : {employee.email}</div>
                  <div>Pid : {employee.pid}</div>
                  <div>Birth : {employee.birth}</div>
                  <div>Contract : {employee.contract}</div>
                  <div>Salary : {employee.salary}</div>
                  {employee.hired > 1 && <div> Works Now :<span className="hiredNo">  No</span></div> || <div> Works Now : <span style={{marginLeft:'5px'}}> Yes</span></div>}
                </div>
              </Grid> 
              <Grid item>
              <input style={{ width: '130px', marginLeft:140 }} type="text"  placeholder="Search By Name..." onChange={(event) => handleSearch(event.target.value)}/>
                <Paper sx={{ width: 270, height: 350, backgroundColor:'#4c4c4c', overflow: 'auto' }}>
                  <List dense component="div" role="list">
                    {newList.map((payment) => {
                      const labelId = `transfer-list-item-${payment.id}-label`;
                      let comment = "";
                      if (payment.phase.tasks === payment.phase.curTasks){
                        comment = <span style={{color:"green"}}> Completed !</span>
                      } else {
                        comment = <span> Running !</span>
                      }
                      const popoverOpen = anchorEl === payment.id;
                      return (
                        <ListItem
                          sx={{height: 75, borderBottom: 1}}
                          key={payment.id}
                          role="listitem"
                        >
                          <ListItemIcon>
                            <IconButton id={labelId} onClick={handleToggle(payment.id)} sx={{ border: "1px solid black", color: 'black', '&:hover': {border: "1px solid black", color: 'black', backgroundColor:'#3a4c17'}, }} >
                              <VisibilityIcon style={{fontSize: "18px",}}/> 
                            </IconButton>
                            <Popover open={popoverOpen} anchorEl={document.querySelector(`#transfer-list-item-${payment.id}-label`)} onClose={handleClose} anchorOrigin={{vertical: 'center', horizontal: 'right',}}
                              transformOrigin={{vertical: 'top', horizontal: 'right',}}>
                              <Typography sx={{ p: 1, border: 1, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)", backgroundColor: 'rgba(0, 0, 0, 0.8)', fontSize:'14px', fontWeight:'bold' }}>
                                <div> From {payment.phase.start} to {payment.phase.end}</div>
                                <div> Duration: {payment.phase.duration} months</div>
                                <div> Project: {payment.phase.project.name} <div style={{fontSize:'12px'}}>(Project Id : {payment.phase.project.id})</div></div>
                                <div> Type: {payment.phase.type} <div style={{fontSize:'12px'}}>(Id : {payment.phase.id})</div></div>                              
                              </Typography>
                            </Popover>
                          </ListItemIcon>
                          <ListItemText id={labelId}>
                            <div>
                              <div style={{fontSize:'13px', fontWeight:'bold'}}> Payment Id: {payment.id} </div>
                              <div style={{fontSize:'13px', fontWeight:'bold'}}> Employee Payment: {payment.pay}</div>
                              {payment.contract === 2 && <div style={{fontSize:'13px', fontWeight:'bold'}}> Works as: Manager</div>}
                              {payment.contract === 6 && <div style={{fontSize:'13px', fontWeight:'bold'}}> Works as: 4hr/m</div>}
                              {payment.contract === 8 && <div style={{fontSize:'13px', fontWeight:'bold'}}> Contract: 8hr/m</div>}
                              <div style={{fontSize:'12px', fontWeight:'bold'}}> Status: {comment}</div>
                            </div>
                          </ListItemText>
                        </ListItem>
                      )
                    })}
                  </List>
                </Paper>
              </Grid>         
            </Grid>
            <Grid container justifyContent="right">
              <SimpleButton onClick={props.onCancel} label="Close"/>
            </Grid>
        </Grid>
      </Typography>       
    </ViewEmployeeModal>
  );
}

export default ViewEmployee;