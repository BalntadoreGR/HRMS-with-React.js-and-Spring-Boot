import React, { Fragment, useState, useEffect } from 'react'
import MUIDataTable from 'mui-datatables';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { IconButton, Table, TableCell, TableHead, TableRow, TableBody, TableContainer, Paper, TextField } from '@mui/material';
import EditEmployee from './ListActions/EditEmployee/EditEmployee';
import axios from "axios";
import ViewEmployee from './ListActions/ViewEmployee/ViewEmployee';
import DeleteEmployee from './DeleteEmployee';
import './ListEmployee.css';
import { Grid } from '@mui/material';


const ListEmployee = (props) => {
    const [editFormIsShown,setEditFormIsShown] = useState('');
    const [viewFormIsShown,setViewFormIsShown] = useState('');
    const [deleteFormIsShown,setDeleteFormIsShown] = useState('');
    const [employees, setEmployees] = useState(props.employees);
    const [newList, setNewList] = useState(props.employees);
    const [searchValue, setSearchValue] = useState('');

    const deleteHandler = (employee) => {
        if(employee){
            setDeleteFormIsShown(employee);
        } else {
            setDeleteFormIsShown(employee);
            props.onRefreshList();
        }
        
    }
    
    const viewHandler = (employee) => {
        if (employee){
            setViewFormIsShown(employee);
        } else {
            setViewFormIsShown(employee);
            props.onRefreshList();
        }
         
    }
    const editHandler = (employee) => {
        if(employee){
            setEditFormIsShown(employee);
        }else{
            setEditFormIsShown(employee);
            props.onRefreshList();
        }
    }

      
    const handleSearch = (value) => {
        setSearchValue(value); // Αποθηκεύστε τη νέα τιμή του "search textfield"
      
        if (value === '') {
          setNewList(employees); // Εμφανίστε την πλήρη λίστα όταν το "search textfield" είναι άδειο
        } else {
          // Φιλτράρετε τη λίστα υπαλλήλων με βάση το όνομα
          const filteredList = employees.filter((employee) =>
            employee.name.toLowerCase().includes(value.toLowerCase()) || employee.pid.toLowerCase().includes(value.toLowerCase())
          );
          setNewList(filteredList); // Ανανεώστε τη λίστα με τα αποτελέσματα της αναζήτησης
        }
    }     

    return (        
        <Fragment>
            {editFormIsShown !=='' && <EditEmployee onCancel={ () => editHandler('')} emp_info={editFormIsShown}/>}
            {viewFormIsShown !=='' && <ViewEmployee onCancel={ () => viewHandler('')} emp_info={viewFormIsShown}/>}
            {deleteFormIsShown !=='' && <DeleteEmployee onCancel={ () => deleteHandler('')} emp_info={deleteFormIsShown}/>}
                          
            <TableContainer sx={{maxHeight:680, width:'auto', overflow: 'auto'}}>
                <Table stickyHeader aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="left" sx={{ borderBottom: '2px solid #48601d', backgroundColor: 'rgba(0, 0, 0)', color: '#48601d', fontSize:"16px" }}>Id</TableCell>
                        <TableCell align="left" sx={{ borderBottom: '2px solid #48601d', backgroundColor: 'rgba(0, 0, 0)', color: '#48601d', fontSize:"16px" }}>Name
                            <TextField placeholder="Search By Name..." sx={{ml:"5px",mt:"2px", '& label.Mui-focused':{border:'3px solid black'}, '& .MuiInput-underline:after':{border:'2px solid black'}, 
                                        '& .MuiOutlinedInput-root':{'& fieldset':{border:'1px solid #48601d'}, '&:hover fieldset': {border: '2px solid #48601d'},
                                        '&.Mui-focused fieldset':{border: '2px solid #48601d'}}}} id="outlined-basic" size="small" type="text" onChange={(event) => handleSearch(event.target.value)} 
                                        inputProps={{
                                            style: {
                                              height: "10px",
                                              width:"100px",
                                              fontSize: "11px",
                                              padding: "5px",
                                              color: "#48601d",
                                              fontWeight: "bolder"
                                            },
                                          }}
                            />
                        </TableCell>
                        <TableCell align="left" sx={{ borderBottom: '2px solid #48601d', backgroundColor: 'rgba(0, 0, 0)', color: '#48601d', fontSize:"16px" }}>Email</TableCell>
                        <TableCell align="left" sx={{ borderBottom: '2px solid #48601d', backgroundColor: 'rgba(0, 0, 0)', color: '#48601d', fontSize:"16px" }}>Contract</TableCell>
                        <TableCell align="left" sx={{ borderBottom: '2px solid #48601d', backgroundColor: 'rgba(0, 0, 0)', color: '#48601d', fontSize:"16px" }}>Salary</TableCell>
                        <TableCell align="left" sx={{ borderBottom: '2px solid #48601d', backgroundColor: 'rgba(0, 0, 0)', color: '#48601d', fontSize:"16px" }}>Active</TableCell>
                        <TableCell align="left" sx={{ borderBottom: '2px solid #48601d', backgroundColor: 'rgba(0, 0, 0)', color: '#48601d', fontSize:"16px" }}>Actions</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>                    
                    {newList.sort((a, b) => b.contract - a.contract).map((employee) => {
                        return(
                            <TableRow key={employee.id}>
                                <TableCell component="th" scope="row" sx={{ borderBottom: '2px solid #48601d', backgroundColor: 'gray', color: 'black' }}> {employee.id} </TableCell>
                                <TableCell align="left" sx={{ borderBottom: '2px solid #48601d', backgroundColor: 'gray', color: 'black' }}>{employee.name}</TableCell>                                
                                <TableCell align="left" sx={{ borderBottom: '2px solid #48601d', backgroundColor: 'gray', color: 'black' }}>{employee.email}</TableCell>
                                <TableCell align="left" sx={{ borderBottom: '2px solid #48601d', backgroundColor: 'gray', color: 'black' }}>{employee.contract}</TableCell>
                                <TableCell align="left" sx={{ borderBottom: '2px solid #48601d', backgroundColor: 'gray', color: 'black' }}>{employee.salary}</TableCell>
                                <TableCell align="left" sx={{ borderBottom: '2px solid #48601d', backgroundColor: 'gray', color: 'black' }}>{employee.hired === 1 && "Yes" || "No"}</TableCell>
                                <TableCell align="left" sx={{ borderBottom: '2px solid #48601d', backgroundColor: 'gray', color: 'black' }}>
                                    <IconButton onClick={() => viewHandler(employee)} sx={{ marginLeft: "10px", color:'black', border: '1px solid black', backgroundColor:'#48601d', '&:hover': {color: 'black', border: '1px solid black', backgroundColor:'#3a4c17'}}}><AccountCircleIcon /> </IconButton>
                                    {employee.hired === 1 && <IconButton onClick={() => editHandler(employee)} sx={{ marginLeft: "10px", color:'black', border: '1px solid black', backgroundColor:'#48601d', '&:hover': {color: 'black', border: '1px solid black', backgroundColor:'#3a4c17'}}} ><ManageAccountsIcon /></IconButton>}
                                    {employee.hired === 1 && <IconButton onClick={() => deleteHandler(employee)} sx={{ marginLeft: "10px", color:'black', border: '1px solid black', backgroundColor:'#48601d', '&:hover': {color: 'black', border: '1px solid black', backgroundColor:'#3a4c17'}}}> <NoAccountsIcon/></IconButton>}
                                    </TableCell>
                            </TableRow>
                        );})}
                    </TableBody>
                </Table>
            </TableContainer>
            
            
        </Fragment>
    );
}
export default ListEmployee;
