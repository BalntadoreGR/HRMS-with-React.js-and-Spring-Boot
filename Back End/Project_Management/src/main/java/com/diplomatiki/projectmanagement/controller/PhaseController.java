package com.diplomatiki.projectmanagement.controller;

import com.diplomatiki.projectmanagement.model.Employee;
import com.diplomatiki.projectmanagement.model.Phase;
import com.diplomatiki.projectmanagement.repository.EmployeeRepository;
import com.diplomatiki.projectmanagement.repository.PhaseRepository;
import com.diplomatiki.projectmanagement.service.PhaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/phase")
public class PhaseController {

    @Autowired
    private PhaseService phaseService;
    @Autowired
    private PhaseRepository phaseRepository;
    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping("/findById/{id}")
    public Optional<Phase> findById(@PathVariable int id){
        Optional<Phase> phase = phaseService.findById(id);
        return phaseService.findById(id);
    }

    @GetMapping("/findAll")
    public List<Phase> findAll(){
        return phaseService.findAll();
    }

    @PostMapping("/{phaseId}/addEmployee/{employeeId}")
    public ResponseEntity<String> addEmployeeToPhase(@PathVariable int phaseId, @PathVariable int employeeId) {
        try {
            phaseService.addEmployeeToPhase(phaseId, employeeId);
            return ResponseEntity.ok("Employee added to phase successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
            // You can customize the error response as needed
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            // Handle other exceptions if necessary and return appropriate error response
        }
    }

    @PostMapping("/changeTask/{phaseId}")
    public ResponseEntity<String> changeTask(@PathVariable int phaseId) throws ChangeSetPersister.NotFoundException {
        phaseService.changeTask(phaseId);
        return ResponseEntity.ok("Task Changed");
    }
}
