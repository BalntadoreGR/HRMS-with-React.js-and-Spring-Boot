package com.diplomatiki.projectmanagement.service;

import com.diplomatiki.projectmanagement.model.Phase;
import com.diplomatiki.projectmanagement.model.Project;
import com.diplomatiki.projectmanagement.repository.PhaseRepository;
import com.diplomatiki.projectmanagement.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class ProjectServiceImpl implements ProjectService{

    @Autowired
    private ProjectRepository projectRepository;
    private PhaseRepository phaseRepository;
    @Override
    public Project saveProject(Project project){
        return projectRepository.save(project);
    };
    @Override
    public List<Project> findAll(){
        return projectRepository.findAll();
    };
    @Override
    public Optional<Project> findById(int id){return projectRepository.findById(id);};

    @Override
    public void addPhaseToProject(int projectId, Phase phase) throws ChangeSetPersister.NotFoundException {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new ChangeSetPersister.NotFoundException());
        phase.setProject(project);
        project.getPhases().add(phase);
        project.setStatus(2);
        projectRepository.save(project);
    }

    public void projectNotActive(int projectId) throws ChangeSetPersister.NotFoundException {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new ChangeSetPersister.NotFoundException());
        project.setStatus(4);
        projectRepository.save(project);
    }

    @Override
    public void projectSetStatus(int projectId) throws ChangeSetPersister.NotFoundException {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new ChangeSetPersister.NotFoundException());
        project.setStatus(3);
        projectRepository.save(project);
    }

    @Override
    public void projectSetTasks(int projectId, int totalTasks) throws ChangeSetPersister.NotFoundException {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new ChangeSetPersister.NotFoundException());
        project.setTasks(totalTasks);
        project.setCurTasks(0);
        projectRepository.save(project);
    }

    @Override
    public void projectChangeTask(int projectId) throws ChangeSetPersister.NotFoundException {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new ChangeSetPersister.NotFoundException());
        int new_task = project.getCurTasks() + 1;
        if ( new_task == project.getTasks() ){
            project.setStatus(4);
        }
        project.setCurTasks(new_task);
        projectRepository.save(project);
    }

    @Override
    public void deleteProject(int projectId) throws ChangeSetPersister.NotFoundException {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new ChangeSetPersister.NotFoundException());
        projectRepository.delete(project);
    }

    public List<Phase> getAllPhasesByProjectId(int projectId) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new NoSuchElementException("Project not found"));
        return new ArrayList<>(project.getPhases());
    }

    @Override
    public List<Project> findAllByProjectId(int projectId) {
        return projectRepository.findAllByProjectId(projectId);
    }
}
