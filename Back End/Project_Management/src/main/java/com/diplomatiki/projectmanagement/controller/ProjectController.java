package com.diplomatiki.projectmanagement.controller;

import com.diplomatiki.projectmanagement.model.Phase;
import com.diplomatiki.projectmanagement.model.Project;
import com.diplomatiki.projectmanagement.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @GetMapping("/findAll")
    public List<Project> findAll(){
        return projectService.findAll();
    }

    @GetMapping("/phasesEmployeesForProject/{projectId}")
    public List<Project> projectPhasesEm(@PathVariable("projectId") Integer projectId) {
        return projectService.findAllByProjectId(projectId);
    }
    @GetMapping("/findById/{id}")
    public Optional<Project> findById(@PathVariable int id){
        Optional<Project> project = projectService.findById(id);
        return projectService.findById(id);
    }
    @GetMapping("/{projectId}/phases")
    public List<Phase> getAllPhasesByProjectId(@PathVariable int projectId) {
        return projectService.getAllPhasesByProjectId(projectId);
    }
    @PostMapping("/add")
    public String add(@RequestBody Project project){
        projectService.saveProject(project);
        return "New Project is added";
    }
    @PostMapping("/{projectId}/phases")
    public ResponseEntity<String> addPhaseToProject(@PathVariable int projectId, @RequestBody Phase phase) throws ChangeSetPersister.NotFoundException {
        projectService.addPhaseToProject(projectId, phase);
        return ResponseEntity.ok("Phase added to the project successfully.");
    }
    @PostMapping("/projectNotActive/{projectId}")
    public ResponseEntity<String> projectNotActive(@PathVariable int projectId) throws ChangeSetPersister.NotFoundException {
        projectService.projectNotActive(projectId);
        return ResponseEntity.ok("Project Not active");
    }

    @PostMapping("/projectSetStatus/{projectId}")
    public ResponseEntity<String> projectSetStatus(@PathVariable int projectId) throws ChangeSetPersister.NotFoundException {
        projectService.projectSetStatus(projectId);
        return ResponseEntity.ok("Project Set 3");
    }
    @PostMapping("/projectSetTasks/{projectId}/{totalTasks}")
    public ResponseEntity<String> projectSetTasks(@PathVariable int projectId, @PathVariable int totalTasks) throws ChangeSetPersister.NotFoundException {
        projectService.projectSetTasks(projectId, totalTasks);
        return ResponseEntity.ok("Project Tasks ready");
    }
    @PostMapping("/changeTask/{projectId}")
    public ResponseEntity<String> projectSetTasks(@PathVariable int projectId) throws ChangeSetPersister.NotFoundException {
        projectService.projectChangeTask(projectId);
        return ResponseEntity.ok("Project Tasks changed");
    }
    @DeleteMapping("/delete/{projectId}")
    public ResponseEntity<String> deleteProject(@PathVariable int projectId) throws ChangeSetPersister.NotFoundException {
        projectService.deleteProject(projectId);
        return ResponseEntity.ok("Project deleted successfully.");
    }
}
