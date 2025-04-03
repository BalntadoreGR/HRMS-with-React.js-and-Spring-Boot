import * as React from 'react';
import { Grid} from '@mui/material';
import { useContext, useState, useEffect } from 'react';
import { ProjectContext } from '../../../../../store/ProjectContext';
import ShowProjectModal from '../../../../UI/ShowProjectModal/ShowProjectModal';
import axios from 'axios';
import GanntGraph from './GanntGraph';
import HierarchyGraph from './HierarchyGraph';
import SimpleButton from '../../../../UI/SimpleButton/SimpleButton';
import './ShowTotal.css';



const ShowTotalProjectModal = (props) => {
  const {project, setProject} = useContext(ProjectContext);
  const [info, setInfo] = useState([]);  
  const [finishEnabled, setFinishEnabled] = useState(false);
  const [latestSortedNodes, setLatestSortedNodes] = useState([]);
  const [manager, setManager] = useState("");
  const [tasksChanged, setTasksChanged] = useState(false);

  const taskIncreaseHandler = () => {
    fetchData();
  }

  useEffect(() => {
    fetchData();
  }, []);


  useEffect(() => {
    if (info){      
    calculatePayments();
    }  
  
}, [info]); 

  const fetchData = async () => {
    try {
      const projectId = project.id; // Replace with the actual project ID
      const response = await axios.get(`http://localhost:8090/project/phasesEmployeesForProject/${projectId}`);
      setInfo(response.data[0]);      
      console.log(response.data[0]);
    } catch (error) {
      console.error('Error retrieving phases:', error);
    }
    
  };  
  const calculatePayments= async () => {
    if (info && info.phases){
    const updatedNodes = await Promise.all(
      info.phases?.map(async (node) => {
        const { id: phaseId } = node;
        const updatedEmployees = await Promise.all(
          node.employees.map(async (employee) => {
            const { id: employeeId } = employee;

            try {
              const response = await axios.get(`http://localhost:8090/payment/${employeeId}/${phaseId}`);

              if (response.data) {
                if (response.data[0].contract === 2){
                  if (manager ===""){
                    setManager(employee);
                    return null;
                  } else {
                    return null;
                  }
                  
                }
                else{
                  return {
                  ...employee,
                  pay: response.data[0].pay,
                  newContract: response.data[0].contract,
                };
              }
              }
            } catch (error) {
              console.error(`Error fetching payment data for employee ${employeeId} and phase ${phaseId}`, error);
            }

            return employee;
          })
        );

        return {
          ...node,
          employees: updatedEmployees.filter((employee) => employee !== null),
        };
      })
    );
    setLatestSortedNodes(updatedNodes);
  }
  }   

  return (
    <ShowProjectModal onClose={props.onClose}>
      <Grid container display="flex" justifyContent="center">{info && <HierarchyGraph items={latestSortedNodes} project={project} manager={manager} onTaskIncrease={() => taskIncreaseHandler()}/>}</Grid>     
      <Grid container display="flex" justifyContent="center" >{info.phases && <GanntGraph items={info}/>}</Grid>
       
      <div className='button'> 
        <SimpleButton onClick={props.onClose} label='Back'></SimpleButton>   
      </div>     
    </ShowProjectModal>
  );
}

export default ShowTotalProjectModal;

