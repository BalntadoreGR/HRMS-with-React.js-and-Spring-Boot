package com.diplomatiki.projectmanagement.service;
import com.diplomatiki.projectmanagement.model.Phase;
import com.diplomatiki.projectmanagement.model.Project;
import org.springframework.data.crossstore.ChangeSetPersister;

import java.util.List;
import java.util.Optional;

public interface ProjectService {
    public Project saveProject(Project project);
    public List<Project> findAll();
    public Optional<Project> findById(int id);
    public void addPhaseToProject(int projectId, Phase phase) throws ChangeSetPersister.NotFoundException;
    List<Phase> getAllPhasesByProjectId(int projectId);
    List<Project> findAllByProjectId(int projectId);
    public void projectNotActive(int projectId) throws ChangeSetPersister.NotFoundException;

    void projectSetStatus(int projectId) throws ChangeSetPersister.NotFoundException;

    void projectSetTasks(int projectId, int totalTasks) throws ChangeSetPersister.NotFoundException;

    void projectChangeTask(int projectId) throws ChangeSetPersister.NotFoundException;

    void deleteProject(int projectId) throws ChangeSetPersister.NotFoundException;
}
