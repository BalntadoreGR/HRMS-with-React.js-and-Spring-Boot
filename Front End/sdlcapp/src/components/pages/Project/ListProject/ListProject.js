import React, { useMemo, useState } from 'react'
import { Table, TableCell, TableHead, TableRow, TableBody, TableContainer, IconButton, Grid, TextField} from '@mui/material';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import StatusCell from './StatusCell';
import SecInitModal from '../AddProject/SecondInitialize/SecInitModal';
import { ProjectContext } from '../../../../store/ProjectContext'
import ThirdInitModal from '../AddProject/ThirdInitialize/ThirdInitModal';
import ShowTotalProjectModal from '../AddProject/ShowTotalProject/ShowTotalProjectModal';
import DeleteProject from '../DeleteProject/DeleteProject';
import { Fragment } from 'react';
import UserProfile from '../../../users/UserProfile';




const ListProject = (props) => {
    const [secInitModalShown, setSecInitModalShown] = useState('');
    const [thirdInitModalShown, setThirdInitModalShown] = useState('');
    const [projectModalShown, setProjectModalShown] = useState('');
    const [deleteModalShown, setDeleteModalShown] = useState('');
    const [project, setProject] = useState(null);
    const [projectsList, setProjectsList] = useState(props.projects);
    const [newList, setNewList] = useState(props.projects);
    const value = useMemo(() => ({ project, setProject}), [project, setProject]);
    const [searchValue, setSearchValue] = useState('');

    const clickSecHandler = (project) => {
        setProject(project);
        if(project){
            setSecInitModalShown(project);
        }else{
            setSecInitModalShown(project);
            props.onRefreshList();
        }
    }

    const clickThirdHandler = (project) => {
        setProject(project); 
        if(project){
            setThirdInitModalShown(project);
        }else{
            setThirdInitModalShown(project);
            props.onRefreshList();
        }
    }

    const clickShownHandler = (project) => {
        setProject(project);    
        if(project){
            setProjectModalShown(project);
        }else{
            setProjectModalShown(project);
            props.onRefreshList();
        }        
    }

    const deleteHandler = (project) => {
        setProject(project);
        if(project){
            setDeleteModalShown(project);
        }else{
            setDeleteModalShown(project);
            props.onRefreshList();
        }
                      
    }

    const handleSearch = (value) => {      
        setSearchValue(value);
        if (value === '') {
          setNewList(projectsList); // Εμφανίστε την πλήρη λίστα όταν το "search textfield" είναι άδειο
        } else {
          // Φιλτράρετε τη λίστα υπαλλήλων με βάση το όνομα
          const filteredList = projectsList.filter((project) =>
            project.name.toLowerCase().includes(value.toLowerCase())
          );
          setNewList(filteredList); // Ανανεώστε τη λίστα με τα αποτελέσματα της αναζήτησης
        }
    }  

    return (
        <Fragment>            
            <TableContainer sx={{maxHeight:680, width:'inherit', overflow: 'auto'}}>
                <Table stickyHeader aria-label="simple table"  sx={{width:"full"}}>
                    <TableHead>
                        <TableRow >
                            <TableCell  align="left" sx={{ borderBottom: '2px solid #48601d', backgroundColor: 'rgba(0, 0, 0)', color: '#48601d', fontSize:"16px"}}>Id</TableCell>
                            <TableCell align="left" sx={{borderBottom: '2px solid #48601d', backgroundColor: 'rgba(0, 0, 0)', color: '#48601d', fontSize:"16px"}}>Name
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
                            <TableCell align="left" sx={{ borderBottom: '2px solid #48601d', backgroundColor: 'rgba(0, 0, 0)', color: '#48601d', fontSize:"16px"}}>Budget</TableCell>
                            <TableCell align="left" sx={{ borderBottom: '2px solid #48601d', backgroundColor: 'rgba(0, 0, 0)', color: '#48601d', fontSize:"16px"}}>Duration</TableCell>
                            <TableCell align="left" sx={{ borderBottom: '2px solid #48601d', backgroundColor: 'rgba(0, 0, 0)', color: '#48601d', fontSize:"16px"}}>Tasks</TableCell>
                            <TableCell align="left" sx={{ borderBottom: '2px solid #48601d', backgroundColor: 'rgba(0, 0, 0)', color: '#48601d', fontSize:"16px"}}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {newList.sort((a, b) => b.id - a.id).map((project) => {
                            return(
                                <TableRow key={project.id} >
                                    <TableCell component="th" scope="row"  sx={{ borderBottom: '2px solid #48601d', backgroundColor: 'gray', color: 'black' }}> {project.id} </TableCell>
                                    <TableCell align="left" sx={{ borderBottom: '2px solid #48601d', backgroundColor: 'gray', color: 'black' }}>{project.name}</TableCell>
                                    <TableCell align="left" sx={{ borderBottom: '2px solid #48601d', backgroundColor: 'gray', color: 'black' }}>{project.budget}</TableCell>
                                    <TableCell align="left" sx={{ borderBottom: '2px solid #48601d', backgroundColor: 'gray', color: 'black'}}>{project.duration}</TableCell>
                                    <TableCell align="left" sx={{ borderBottom: '2px solid #48601d', backgroundColor: 'gray', color: 'black'}}>{project.curTasks}/{project.tasks}</TableCell>
                                    <TableCell align="center" sx={{ borderBottom: '2px solid #48601d', backgroundColor: 'gray', color: 'black'}}>
                                        {project.status === 1 && <Grid container justifyContent="left" alignItems="center">
                                                                    { UserProfile.getRole() === "Admin" &&
                                                                        <Grid item>
                                                                            <StatusCell onClick={() => clickSecHandler(project)} status={project.status}/>
                                                                        </Grid>}
                                                                    <Grid item>
                                                                        <IconButton onClick={() => deleteHandler(project)} sx={{ border: '1px solid black', backgroundColor: '#48601d',color: 'black', '&:hover': {color: 'black',border: '1px solid black', backgroundColor:'#3a4c17'}, marginLeft:'10px' }}><DeleteIcon /></IconButton>
                                                                    </Grid>
                                                                </Grid>}
                                        {project.status === 2 && <Grid container justifyContent="left" alignItems="center">
                                                                    { UserProfile.getRole() === "Manager" && <Grid item>
                                                                        <StatusCell onClick={() => clickThirdHandler(project)} role="Manager" status={project.status}/>
                                                                    </Grid> || <Grid item>
                                                                        <StatusCell role="Admin" onDisabled={true} status={project.status}/>
                                                                    </Grid>}
                                                                    {UserProfile.getRole() !== "Employee" && <Grid item>
                                                                        <IconButton onClick={() => deleteHandler(project)} sx={{ border: '1px solid black', backgroundColor: '#48601d',color: 'black', '&:hover': {color: 'black',border: '1px solid black', backgroundColor:'#3a4c17'}, marginLeft:'10px' }}><DeleteIcon /></IconButton>
                                                                    </Grid>}
                                                                </Grid>}
                                        {project.status === 3 && <Grid container justifyContent="left" alignItems="center">
                                                                    <Grid item >
                                                                    <IconButton onClick={() => clickShownHandler(project)} sx={{ border: '1px solid black', backgroundColor: '#48601d',color: 'black', '&:hover': {color: 'black',border: '1px solid black', backgroundColor:'#3a4c17'}, }} >
                                                                        <VisibilityIcon/> 
                                                                    </IconButton>
                                                                    </Grid>
                                                                    <Grid item>
                                                                    { UserProfile.getRole() === "Manager" || UserProfile.getRole() === "Admin" &&
                                                                        <IconButton onClick={() => deleteHandler(project)} sx={{ border: '1px solid black', backgroundColor: '#48601d',color: 'black', '&:hover': {color: 'black',border: '1px solid black', backgroundColor:'#3a4c17'}, marginLeft:'10px' }}><DoDisturbIcon />
                                                                        </IconButton>}
                                                                    </Grid>
                                                                </Grid>}
                                        {project.status === 4 && <Grid container justifyContent="left" alignItems="center"><IconButton onClick={() => clickShownHandler(project)} sx={{ border: '1px solid black', backgroundColor: '#48601d',color: 'black', '&:hover': {color: 'black',border: '1px solid black', backgroundColor:'#3a4c17'}}} >
                                                                        <VisibilityIcon/> 
                                                                    </IconButton></Grid>}
                                    </TableCell>
                                </TableRow>
                            );
                        })}                    
                        
                    </TableBody>
                </Table>
            </TableContainer>
            {secInitModalShown !== '' && 
                <ProjectContext.Provider value={value}>
                    <SecInitModal items={secInitModalShown} onClose={() => clickSecHandler('')}/> 
                </ProjectContext.Provider>
            }
            {thirdInitModalShown !== '' &&
                <ProjectContext.Provider value={value}>
                    <ThirdInitModal items={thirdInitModalShown} onClose={() => clickThirdHandler('')} />
                </ProjectContext.Provider>
            }
            {projectModalShown !== '' &&
                <ProjectContext.Provider value={value}>
                    <ShowTotalProjectModal items={projectModalShown} onClose={() => clickShownHandler('')} />
                </ProjectContext.Provider>
            }
            {deleteModalShown !== '' &&
                <ProjectContext.Provider value={value}>
                    <DeleteProject items={deleteModalShown} onClose={() => deleteHandler('')} />
                </ProjectContext.Provider>
            }
        </Fragment>
    );
}
export default ListProject;