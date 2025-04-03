import AddModal from "../../../../UI/AddModal/AddModal";
import useInput from '../../../../../hooks/use-input'
import './AddProject.css';
import {Button, Box, Grid, Stack} from '@mui/material';
import SimpleButton from "../../../../UI/SimpleButton/SimpleButton";

const isNotEmpty = (value) => value.trim() !=='';
const isEmail = (value) => value.includes('@');

const AddProject = (props) => {

    const { 
        value: nameValue, 
        isValid: nameIsValid,
        hasError: nameInputHasError, 
        valueChangeHandler: nameChangeHandler, 
        inputBlurHandler: nameBlurHandler ,
        reset: resetNameInput
      } = useInput(isNotEmpty);
    
    const { 
        value: durationValue, 
        isValid: durationIsValid,
        hasError: durationInputHasError, 
        valueChangeHandler: durationChangeHandler, 
        inputBlurHandler: durationBlurHandler ,
        reset: resetDurationInput
      } = useInput(isNotEmpty);
    
      const { 
        value: budgetValue, 
        isValid: budgetIsValid,
        hasError: budgetInputHasError, 
        valueChangeHandler: budgetChangeHandler, 
        inputBlurHandler: budgetBlurHandler ,
        reset: resetBudgetInput
      } = useInput(isNotEmpty);
    
      const nameInputClasses = nameInputHasError ? 'form-control invalid' : 'form-control';
      const durationInputClasses = durationInputHasError ? 'form-control invalid' : 'form-control';
      const budgetInputClasses = budgetInputHasError ? 'form-control invalid' : 'form-control';
      
      let formIsValid = false;
      
      if (nameIsValid && durationIsValid && budgetIsValid ){
        formIsValid = true;
      } 
    
      const formSubmissionHandler = (event) => {
        event.preventDefault();
    
        if (!formIsValid){
          return;
        }
        const project = {
            name: nameValue,
            duration: +durationValue,
            budget: +budgetValue,
            status: 1,
            tasks:0,
            curTasks:0,
        }
        props.onAddProject(project);
        resetNameInput();
        resetDurationInput();
        resetBudgetInput();
      };



    return (
        <AddModal onClose={props.onAddFormClose}>
                <div style={{ fontWeight: "bold", fontSize : 22, lineHeight : 2, color: "#48601d"}}>  Add New Project (First Step)...</div>
                <form onSubmit={formSubmissionHandler}>
                    <div className='control-group'>
                        <div className={nameInputClasses}>
                            <label htmlFor='name'>Name</label>
                            <input 
                                type='text' 
                                id='name' 
                                value={nameValue} 
                                onBlur={nameBlurHandler} 
                                onChange={nameChangeHandler}/>
                            {nameInputHasError && <p className="error-text">Give a valid project name.</p>}
                        </div>
                        <div className={durationInputClasses}>
                            <label htmlFor='duration'>Project Duration </label>
                            <input 
                                type='number' 
                                id='duration' 
                                value={durationValue} 
                                onBlur={durationBlurHandler} 
                                onChange={durationChangeHandler}/>
                            {durationInputHasError && <p className="error-text">Give valid duration in months .</p>}
                        </div>
                        <div className={budgetInputClasses}>
                        <label htmlFor='budget'>Budget </label>
                            <input 
                                type='number' 
                                id='budget' 
                                value={budgetValue}
                                onBlur={budgetBlurHandler}
                                onChange={budgetChangeHandler}/>
                        {budgetInputHasError && <p className="error-text">Give a valid budget.</p>}
                        </div>                        
                    </div>
                    <div>
                      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ flex: 'auto 1 1' }} >
                          <SimpleButton label="Cancel" onClick={props.onAddFormClose}></SimpleButton>
                        </Box>
                        <Box sx={{ flex: '1 1 1' }} >
                          <SimpleButton label="Submit" disabled={!formIsValid}></SimpleButton>
                        </Box>
                      </Box>
                    </div>
                </form>          
        </AddModal>
      );
}

export default AddProject;