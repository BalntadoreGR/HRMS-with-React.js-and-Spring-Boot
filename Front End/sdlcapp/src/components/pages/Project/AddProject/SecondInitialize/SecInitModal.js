import * as React from 'react';
import {Box, Stepper, Step, StepLabel, InputLabel, Button, Typography} from '@mui/material';
import AddPhasesModal from '../../../../UI/AddPhasesModal/AddPhasesModal';
import PhasesSelection from './PhasesSelection';
import { useContext, useState } from 'react';
import { ProjectContext } from '../../../../../store/ProjectContext';
import PhasesInitialize from './PhasesInitialize';
import SecInitFinish from './SecInitFinish';
import axios from 'axios';
import SimpleButton from '../../../../UI/SimpleButton/SimpleButton';

const steps = ['Initialize Number Of Phases', 'Initialize Details Of Each Phase', 'You`re Done!'];

const SecInitModal = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const {project, setProject} = useContext(ProjectContext);
  const [rightPhases, setRightPhases] = useState('');
  const [nextToStep2,setNextToStep2] = useState(false); // for the next button on the phases selection
  const [nextToStep3,setNextToStep3] = useState(false); // for the next button on the phases initialization
  const [prepareRight, setPrepareRight] = useState('');
  const [finishVisible, setFinishVisible] = useState(true); //
  const [manager, setManager] = useState([]);
  const [managerBudget, setManagerBudget] = useState(0);

  const handleNext = () => {
    
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const phasesHandler = (right, action) => {// checks if next1 must be visible
    if (action === "Ready") {
        setNextToStep2(false);
    } else {
        setNextToStep2(true);
    }
    setRightPhases(right);    
  }

  const PhaseInitHandler = (right, action, employee, managerBudget) => { // checks if next2 must be visible
    if (action === true) {
        setNextToStep3(action);
        setPrepareRight(right);
        setManager(employee);
        setManagerBudget(managerBudget);
        console.log(employee);
    } else {
        setNextToStep3(action);
    }        
  }

  const secondStepDone = async () => { // next2 clicked, applying changes to phases and move to next step
    setRightPhases(prepareRight);
    let totalProjectTasks=0;
    for (const phase of prepareRight) {
      totalProjectTasks = totalProjectTasks + phase.tasks;
      const phaseData = {
        type: phase.name,
        start: phase.start,
        end: phase.end,
        duration: phase.duration,
        budget: (phase.budget*(project.budget - managerBudget))/project.budget,
        tasks: phase.tasks,
        curTasks: 0,
      };
  
      await fetch(`http://localhost:8090/project/${project.id}/phases`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(phaseData)
      });      
    }
    const response = await axios.post(`http://localhost:8090/project/projectSetTasks/${project.id}/${totalProjectTasks}`, {
          headers: {'Content-Type': 'application/json'}, });
    handleNext();
  }

  const handleFinish = () => {
    setFinishVisible(false);
  }

  return (
    
        <AddPhasesModal onClose={props.onClose}>
            <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep} sx={{
              '& .MuiStepLabel-root .Mui-disabled': {
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
                    <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                );
                })}
            </Stepper> 
            {activeStep === 0 && 
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>

                        <PhasesSelection onPhases={phasesHandler}/>
                        
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <SimpleButton onClick={props.onClose} label="Cancel"/>
                        
                        <Box sx={{ flex: '1 1 auto' }} />
                        <SimpleButton onClick={handleNext} disabled={!nextToStep2} label={activeStep === steps.length - 1 ? 'Finish' : 'Next'}/>
                    </Box>
                </React.Fragment>
            }
            {activeStep === 1 && 
                <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}> 

                    <PhasesInitialize items={rightPhases} onEnableNext={PhaseInitHandler}/>                    

                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <SimpleButton onClick={props.onClose} label="Cancel" />
                    <Box sx={{ flex: '1 1 1', marginLeft:2 }} />
                    <SimpleButton disabled={activeStep === 0} onClick={handleBack} label="Back"/>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <SimpleButton onClick={secondStepDone} disabled={!nextToStep3} label={activeStep === steps.length - 1 ? 'Finish' : 'Next'}/>
                </Box>
                </React.Fragment>
            }
            {activeStep === 2 && 
                <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                    <SecInitFinish manager={manager} onSend={handleFinish} project={project}/>
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <SimpleButton disabled={finishVisible} onClick={props.onClose} label="Close"/>
                </Box>
                </React.Fragment>
            }
            </Box>
        </AddPhasesModal>
  );
}

export default SecInitModal;