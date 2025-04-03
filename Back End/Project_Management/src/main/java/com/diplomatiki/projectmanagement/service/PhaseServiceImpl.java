package com.diplomatiki.projectmanagement.service;

import com.diplomatiki.projectmanagement.model.Employee;
import com.diplomatiki.projectmanagement.model.Phase;
import com.diplomatiki.projectmanagement.model.Project;
import com.diplomatiki.projectmanagement.repository.EmployeeRepository;
import com.diplomatiki.projectmanagement.repository.PhaseRepository;
import com.diplomatiki.projectmanagement.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PhaseServiceImpl implements PhaseService{

    @Autowired
    private PhaseRepository phaseRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private ProjectRepository projectRepository;
    @Override
    public Phase savePhase(Phase phase){
        return phaseRepository.save(phase);
    };
    @Override
    public List<Phase> findAll(){
        return phaseRepository.findAll();
    };
    @Override
    public Optional<Phase> findById(int id){
        return phaseRepository.findById(id);
    };

    @Override
    public void addEmployeeToPhase(int phaseId, int employeeId) {
        Optional<Phase> phaseOptional = phaseRepository.findById(phaseId);
        Optional<Employee> employeeOptional = employeeRepository.findById(employeeId);

        if (phaseOptional.isPresent() && employeeOptional.isPresent()) {
            Phase phase = phaseOptional.get();
            Employee employees = employeeOptional.get();

            phase.getEmployees().add(employees);
            phaseRepository.save(phase);

            Project project = phase.getProject();
            projectRepository.save(project);
        } else {
            throw new IllegalArgumentException("Invalid phase id or employee id.");
        }
    }

    @Override
    public void changeTask( int phaseId) throws ChangeSetPersister.NotFoundException {
        Phase phase = phaseRepository.findById(phaseId).orElseThrow(() -> new ChangeSetPersister.NotFoundException());
        int task = phase.getCurTasks()+1;
        phase.setCurTasks(task);
        phaseRepository.save(phase);
    }
}
