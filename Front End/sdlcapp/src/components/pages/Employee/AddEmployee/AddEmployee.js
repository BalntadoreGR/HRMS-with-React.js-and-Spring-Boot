import useInput from '../../../../hooks/use-input'
import './AddEmployee.css';
import AddEmployeesModal from "../../../UI/AddEmployeesModal/AddEmployeesModal";
import SimpleButton from "../../../UI/SimpleButton/SimpleButton";
import { Box } from "@mui/material";

const isNotEmpty = (value) => value.trim() !=='';
const isEmail = (value) => value.includes('@');

const AddEmployee = (props) => {

    const { 
        value: nameValue, 
        isValid: nameIsValid,
        hasError: nameInputHasError, 
        valueChangeHandler: nameChangeHandler, 
        inputBlurHandler: nameBlurHandler ,
        reset: resetNameInput
      } = useInput(isNotEmpty);
    
      const { 
        value: pidValue, 
        isValid: pidIsValid,
        hasError: pidInputHasError, 
        valueChangeHandler: pidChangeHandler, 
        inputBlurHandler: pidBlurHandler ,
        reset: resetPidInput
      } = useInput(isNotEmpty);
    
      const { 
        value: emailValue, 
        isValid: emailIsValid,
        hasError: emailInputHasError, 
        valueChangeHandler: emailChangeHandler, 
        inputBlurHandler: emailBlurHandler ,
        reset: resetEmailInput
      } = useInput(isEmail);
    
      const { 
        value: birthValue, 
        isValid: birthIsValid,
        hasError: birthInputHasError, 
        valueChangeHandler: birthChangeHandler, 
        inputBlurHandler: birthBlurHandler ,
        reset: resetBirthInput
      } = useInput(isNotEmpty);
    
      const { 
        value: contractValue, 
        isValid: contractIsValid,
        hasError: contractInputHasError, 
        valueChangeHandler: contractChangeHandler, 
        inputBlurHandler: contractOpenHandler ,
        reset: resetContractInput
      } = useInput(isNotEmpty);
    
      const { 
        value: salaryValue, 
        isValid: salaryIsValid,
        hasError: salaryInputHasError, 
        valueChangeHandler: salaryChangeHandler, 
        inputBlurHandler: salaryBlurHandler ,
        reset: resetSalaryInput
      } = useInput(isNotEmpty);

      const { 
        value: passwordValue, 
        isValid: passwordIsValid,
        hasError: passwordInputHasError, 
        valueChangeHandler: passwordChangeHandler, 
        inputBlurHandler: passwordBlurHandler ,
        reset: resetPasswordInput,
      } = useInput(isNotEmpty);
    
      const nameInputClasses = nameInputHasError ? 'form-control invalid' : 'form-control';
      const pidInputClasses = pidInputHasError ? 'form-control invalid' : 'form-control';
      const emailInputClasses = emailInputHasError ? 'form-control invalid' : 'form-control';
      const birthInputClasses = birthInputHasError ? 'form-control invalid' : 'form-control';
      const contractInputClasses = contractInputHasError ? 'form-control invalid' : 'form-control';
      const salaryInputClasses = salaryInputHasError ? 'form-control invalid' : 'form-control';
      const passwordInputClasses = passwordInputHasError ? 'form-control invalid' : 'form-control';
      
      let formIsValid = false;
      
      if (nameIsValid && pidIsValid && emailIsValid && birthIsValid && contractIsValid && salaryIsValid && passwordIsValid){
        formIsValid = true;
      } 
    
      const formSubmissionHandler = (event) => {
        event.preventDefault();
    
        if (!formIsValid){
          return;
        }
        const employee = {
            name: nameValue,
            pid: pidValue,
            email: emailValue,
            birth: birthValue,
            contract: contractValue,
            salary: salaryValue,
            hired : 1,
            password : passwordValue,
        }
        props.onAddEmployee(employee);
        resetNameInput();
        resetPidInput();
        resetEmailInput();
        resetBirthInput();
        resetContractInput();
        resetSalaryInput();
      };



    return (
        <AddEmployeesModal onClose={props.onAddFormClose}>
                <div style={{ fontWeight: "bold", fontSize : 22, lineHeight : 2, color: "#48601d"}}>Add New Employee...</div>
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
                            {nameInputHasError && <p className="error-text">Give a valid name.</p>}
                        </div>
                        <div className={pidInputClasses}>
                            <label htmlFor='pid'>Personal ID</label>
                            <input 
                                type='text' 
                                id='pid' 
                                value={pidValue} 
                                onBlur={pidBlurHandler} 
                                onChange={pidChangeHandler}/>
                            {pidInputHasError && <p className="error-text">Give a valid ID .</p>}
                        </div>
                        <div className={emailInputClasses}>
                        <label htmlFor='email'>E-Mail Address</label>
                            <input 
                                type='email' 
                                id='email' 
                                value={emailValue}
                                onBlur={emailBlurHandler}
                                onChange={emailChangeHandler}/>
                        {emailInputHasError && <p className="error-text">Give a valid e-mail.</p>}
                        </div>
                        <div className={birthInputClasses}>
                            <label htmlFor='birth'>Birth</label>
                            <input
                            type="number"
                            id='birth'
                            value={birthValue}
                            onBlur={birthBlurHandler}
                            onChange={birthChangeHandler}/>
                            {birthInputHasError && <p className="error-text">Give a valid date.</p>}
                        </div>
                        <div className={contractInputClasses}>
                            <label htmlFor='contract'>Contract</label>
                            <select 
                            required
                            id='contract'
                            value={contractValue}
                            onChange={contractChangeHandler}
                            onFocus={contractOpenHandler}
                            label="Age"
                            >
                            <option value=""></option>
                            <option value="4">4-hr</option>
                            <option value="8">8-hr</option>
                            </select>
                            {contractInputHasError && <p className="error-text">Give a valid contract.</p>}
                        </div>
                        <div className={salaryInputClasses}>
                            <label htmlFor='salary'>Salary</label>
                            <input
                            type="number"
                            id='salary'
                            value={salaryValue}
                            onBlur={salaryBlurHandler}
                            onChange={salaryChangeHandler}/>
                            {salaryInputHasError && <p className="error-text">Give a valid salary.</p>}
                        </div>
                        <div className={passwordInputClasses}>
                            <label htmlFor='passwordd'>Password</label>
                            <input 
                                type='password' 
                                id='pid' 
                                value={passwordValue} 
                                onBlur={passwordBlurHandler} 
                                onChange={passwordChangeHandler}/>
                            {passwordInputHasError && <p className="error-text">Give a valid password .</p>}
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
            
          
        </AddEmployeesModal>
      );
}

export default AddEmployee;