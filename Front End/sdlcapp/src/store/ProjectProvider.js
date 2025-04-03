import { useReducer } from 'react';

import ProjectContext from './ProjectContext';

const defaultProjectState = {
  project_info: [],
  phases : [],
  phases_info: []
};

const ProjectReducer = (state, action) => {
  if (action.type === 'PHASE') {
    return {
      phases: action.item.phases
    }
  }

  return defaultProjectState;
};

const ProjectProvider = (props) => {
  const [projectState, dispatchProjectAction] = useReducer(ProjectReducer, defaultProjectState);

  const addPhasetoContext = (phases) => {
    dispatchProjectAction({type: 'PHASE', phases: phases});
  };

  const backSteptoContext = (id) => {
    dispatchProjectAction({type: 'BACK', id: id});
  };

  const projectContext = {
    project_info: projectState.project_info,
    phases : projectState.phases,
    phases_info: [],
    addPhases: addPhasetoContext,
    backHandle: backSteptoContext
  };

  return (
    <ProjectContext.Provider value={projectContext}>
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectProvider;