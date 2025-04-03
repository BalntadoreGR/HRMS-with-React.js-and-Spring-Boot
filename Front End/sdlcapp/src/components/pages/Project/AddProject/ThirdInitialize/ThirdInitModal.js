import * as React from 'react';
import {Box, Stepper, Step, StepLabel, InputLabel, Button, Typography} from '@mui/material';
import { useContext, useState, useEffect } from 'react';
import { ProjectContext } from '../../../../../store/ProjectContext';
import EmployeesTransferList from './EmployeesTransferList';
import axios from 'axios';
import ThirdInitFinish from './ThirdInitFinish';
import AddEmployeesToPhasesModal from '../../../../UI/AddEmployeesToPhasesModal/AddEmployeesToPhasesModal';



const ThirdInitModal = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const {project, setProject} = useContext(ProjectContext);
  const [phases, setPhases] = useState([]);  
  const [finishEnabled, setFinishEnabled] = useState(false);

  const [steps, setSteps] = useState([]);

  const fetchData = async () => {
    try {
      const projectId = project.id; // Replace with the actual project ID
      const response = await axios.get(`http://localhost:8090/project/${projectId}/phases`);
      const filteredPhases = response.data.filter(phase => phase.employees.length <= 1);
      const sortedPhases = filteredPhases.sort((a, b) => a.id - b.id);
      setPhases(sortedPhases);
      console.log(response.data);
    } catch (error) {
      console.error('Error retrieving phases:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const updatedSteps = phases.map((phase) => ({
      name: phase.type,
      phaseObject: phase,
    }));
    updatedSteps.push({ name: 'Finish' }); // Add the 'Finish' step
    setSteps(updatedSteps);
  }, [phases]);

  const handleNext = (employeesWithBudget, phase_id, selectedOptions) => {
    const updatedSteps = [...steps]; // Create a copy of the steps array
    const selectedPhaseIndex = activeStep; // Get the index of the current active step
    const selectedPhase = updatedSteps[selectedPhaseIndex];
    const updatedPhase = {
      ...selectedPhase,
      employees: employeesWithBudget, // Add the selected employees to the phase object
      phaseId: phase_id, // Store the phase ID
    };
    updatedSteps[selectedPhaseIndex] = updatedPhase; // Update the step with the updated phase object
    setSteps(updatedSteps); // Update the steps state
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = async () => {
    try {
      const response = await axios.post(`http://localhost:8090/project/projectSetStatus/${project.id}`);
      console.log(response.data);
      props.onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
        <AddEmployeesToPhasesModal onClose={props.onClose}>
            <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep} sx={{'& .MuiStepLabel-root .Mui-disabled': {
                color: '#48601d', // circle color (COMPLETED)
              },
          '& .MuiStepLabel-root .Mui-completed': {
            color: '#48601d', // circle color (COMPLETED)
          },
          '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
            {
              color: 'common.white', // Just text label (COMPLETED)
            },
          '& .MuiStepLabel-root .Mui-active': {
            color: '#48601d', // circle color (ACTIVE)
          },
          '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
            {
              color: '#48601d', // Just text label (ACTIVE)
            },
          '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
            fill: 'black', // circle's number (ACTIVE)
            fontWeight: "bold"
          },
        }}>
                {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                return (
                  <Step key={label.name} {...stepProps}>
                    <StepLabel {...labelProps}>{label.name}</StepLabel>
                  </Step>
                );
                })}
            </Stepper> 
            {activeStep < phases.length && ( 
                <React.Fragment>
                    <EmployeesTransferList onCancel={props.onClose} activeStep={activeStep} onNext={handleNext} onBack={handleBack} items={activeStep < phases.length ? (steps[activeStep]?.phaseObject || '') : ''} />
                </React.Fragment>
            )}
            
            {activeStep === phases.length && ( 
                <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  <ThirdInitFinish actStep={activeStep} sumSteps={phases.length} steps={steps} project={project}></ThirdInitFinish>
                    
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button 
                    onClick={() => handleFinish()}
                    sx={{ color:'black', border: '1px solid black', backgroundColor:'#48601d', '&:hover': {color: 'black', border: '1px solid black', backgroundColor:'#3a4c17'} }}
                            >
                    Finish
                    </Button>
                </Box>
                </React.Fragment>
            )}
            </Box>
        </AddEmployeesToPhasesModal>
  );
}

export default ThirdInitModal;