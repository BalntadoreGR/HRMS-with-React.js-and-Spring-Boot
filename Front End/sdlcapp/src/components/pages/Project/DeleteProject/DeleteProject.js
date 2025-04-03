import * as React from 'react';
import { useContext} from 'react';
import { ProjectContext } from '../../../../store/ProjectContext';
import axios from 'axios';
import DeleteProjectModal from '../../../UI/DeleteProjectModal/DeleteProjectModal';
import SimpleButton from '../../../UI/SimpleButton/SimpleButton';
import { Grid } from '@mui/material';



const DeleteProject = (props) => {
  const {project, setProject} = useContext(ProjectContext);


  const handleFinish = async () => {
    if (project.status === 1 || project.status === 2) {
      try {
        const projectId = project.id; // Replace with the actual project ID
        const response = await axios.delete(`http://localhost:8090/project/delete/${projectId}`);
        console.log(response.data);
        
      }catch (error) {
          console.error('Error cancelling project:', error);
      }
    } else {
      try {
        const projectId = project.id; // Replace with the actual project ID
        const response = await axios.post(`http://localhost:8090/project/projectNotActive/${projectId}`);
        console.log(response.data);
        
      }catch (error) {
          console.error('Error cancelling project:', error);
      }
    }
    
    props.onClose();
}
  

  return (
        <DeleteProjectModal onClose={props.onClose}>
          <div style={{ paddingBottom: 10, paddingLeft:150, fontSize: 26, color: "gray" }}>Warning! </div>
          {project.status === 1 && <div style={{ padding: 10, paddingTop: 10, fontSize: 24, color: '#48601d', fontWeight: 500 }}>Are you sure you want to delete Project with ID : {project.id} ?</div>}
          {project.status === 2 && <div style={{ padding: 10, paddingTop: 10, fontSize: 24, color: '#48601d', fontWeight: 500 }}>Are you sure you want to delete Project with ID : {project.id} ?</div>}
          {project.status === 3 && <div style={{ padding: 10, paddingTop: 10, fontSize: 24, color: '#48601d', fontWeight: 500 }}>Are you sure you want to terminate Project with ID : {project.id} ?</div>}
          <div style={{ padding: 10, paddingBottom: 50, fontSize: 20, color: '#48601d', }}>Project Name : {project.name} </div>
            <Grid container direction="row" justifyContent="space-evenly" alignItems="flex-end">            
              <Grid>
                <SimpleButton label="Cancel" onClick={props.onClose}/>
              </Grid>
              <Grid>
                <SimpleButton label="I'm Sure!" onClick={handleFinish}/>
              </Grid>
            </Grid>
        </DeleteProjectModal>
  );
}

export default DeleteProject;