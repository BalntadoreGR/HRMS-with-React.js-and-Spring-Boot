import React , { useState } from "react";
import { styled } from '@mui/material/styles';
import axios from "axios";
import { TextField, InputBase, Select, MenuItem, FormControl, InputLabel, Grid, Box } from '@mui/material';
import AddEmployeesModal from "../../../../../UI/AddEmployeesModal/AddEmployeesModal";
import SimpleButton from "../../../../../UI/SimpleButton/SimpleButton";
import UserProfile from '../../../../../users/UserProfile';


const isNotEmpty = (value) => value.trim() !=='';
const isEmail = (value) => value.includes('@');

const CustomTextField = styled(TextField)({
  width: 300,
    "& .MuiOutlinedInput-input": {
      color: "#48601d"
    },
    "& .MuiInputLabel-root": {
      color: "#48601d"
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: "2px solid black"
    },
    "&:hover .MuiOutlinedInput-input": {
      border: "2px solid black"
    },
    "&:hover .MuiInputLabel-root": {
      color: "#48601d"
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: "2px solid black"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "#6F7E8C"
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#48601d"
    },
    "& .MuiInputLabel-root.Mui-disabled": {
      color: "#48601d"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#6F7E8C"
    },
    "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline": {
      border: "1px solid black"
    }
  });

const SelectInputStyle = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: 4,
    color: '#48601d',
    position: 'relative',
    border: '1px solid black',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    '&:focus': {
      borderRadius: 4,
      border: '2px solid #6F7E8C',
      color: '#48601d',
      '&.label': {
        color: '#48601d',
        fontWeight: 500,
      }
    },
    '&:hover': {
      borderRadius: 4,
      border: '2px solid black',
      color: '#48601d'
    },    
  },
}));

const EditEmployee = (props) => {

  const [employeeData, setEmployeeData] = useState({
    id: props.emp_info.id,
    name: props.emp_info.name ,
    pid: props.emp_info.pid,
    email: props.emp_info.email,
    birth: props.emp_info.birth,
    contract: props.emp_info.contract,
    salary: props.emp_info.salary,
    password: props.emp_info.password,
  });

  const handleInputChange = (field, value) => {
    setEmployeeData({ ...employeeData, [field]: value });
  };
    
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post(`http://localhost:8090/employee/edit/${props.emp_info.id}`, employeeData);
    props.onCancel();
  };

    return (
        <AddEmployeesModal onClose={props.onCancel}>
                <h2 style={{ fontWeight: "bold", fontSize : 22, lineHeight : 2, color: "#48601d", marginBottom:"20px"}}>Edit Employee with Id : {employeeData.id}</h2>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <CustomTextField
                      label="Name"
                      fullWidth
                      disabled={UserProfile.getRole() === "Admin"}
                      value={employeeData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField
                      label="Personal ID"
                      fullWidth
                      disabled={UserProfile.getRole() === "Admin"}
                      value={employeeData.pid}
                      onChange={(e) => handleInputChange('pid', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField
                      label="Email"
                      fullWidth
                      disabled={UserProfile.getRole() === "Admin"}
                      type="email"
                      value={employeeData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField
                      label="Year of Birth"
                      fullWidth
                      disabled={UserProfile.getRole() === "Admin"}
                      type="number"
                      value={employeeData.birth}
                      onChange={(e) => handleInputChange('birth', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                      <CustomTextField label="Contract" disabled={UserProfile.getRole() === "Employee"} value={employeeData.contract} select onChange={(e) => handleInputChange('contract', e.target.value)}>
                        <MenuItem key={1} value="4">4 Hours</MenuItem>
                        <MenuItem key={2} value="8">8 Hours</MenuItem>
                      </CustomTextField>
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField
                      label="Salary"
                      fullWidth
                      disabled={UserProfile.getRole() === "Employee"}
                      type="number"
                      value={employeeData.salary}
                      onChange={(e) => handleInputChange('salary', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField
                      label="Password"
                      fullWidth
                      disabled={UserProfile.getRole() === "Admin"}
                      type="password"
                      value={employeeData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                  <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ flex: 'auto 1 1' }} >
                          <SimpleButton label="Cancel" onClick={props.onCancel}></SimpleButton>
                        </Box>
                        <Box sx={{ flex: '1 1 1' }} >
                          <SimpleButton label="Edit" onClick={handleSubmit}></SimpleButton>
                        </Box>
                      </Box>
                  </Grid>
                </Grid>
                          
          
        </AddEmployeesModal>
      );
}

export default EditEmployee;