import React, { useState } from 'react';
import { useContext} from 'react';
import axios from 'axios';
import DeleteProjectModal from '../../../UI/DeleteProjectModal/DeleteProjectModal';
import SimpleButton from '../../../UI/SimpleButton/SimpleButton';
import { Grid } from '@mui/material';



const DeleteEmployee = (props) => {
  //const {employee, setEmployee} = useState(props.emp_info);


  const handleFinish = async () => {
    try {
      //const employeeId = employee.id; // Replace with the actual project ID
      const response = await axios.post(`http://localhost:8090/employee/employeeNotActive/${props.emp_info.id}`);
      console.log(response.data);
      
    }catch (error) {
        console.error('Error cancelling project:', error);
    }
        props.onCancel();
}  

  return (
        <DeleteProjectModal onClose={props.onCancel}>
          <div style={{ paddingBottom: 10, paddingLeft:150, fontSize: 26, color: "gray" }}>Warning! </div>
          <div style={{ padding: 10, paddingTop: 10, fontSize: 24, fontWeight:500, color: "#48601d" }}>Are you sure you want to discharge Employee with ID : {props.emp_info.id} ?</div>
          <div style={{ padding: 10, paddingBottom: 50, fontSize: 20, color: "#48601d" }}>Employee Name : {props.emp_info.name} </div>
            <Grid container direction="row" justifyContent="space-evenly" alignItems="flex-end">            
              <Grid>
                <SimpleButton label="Cancel" onClick={props.onCancel}/>
              </Grid>
              <Grid>
                <SimpleButton label="I'm Sure!" onClick={handleFinish}/>
              </Grid>
            </Grid>
        </DeleteProjectModal>
  );
}

export default DeleteEmployee;