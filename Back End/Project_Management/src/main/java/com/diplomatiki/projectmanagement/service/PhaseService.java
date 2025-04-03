package com.diplomatiki.projectmanagement.service;
import com.diplomatiki.projectmanagement.model.Employee;
import com.diplomatiki.projectmanagement.model.Phase;
import org.springframework.data.crossstore.ChangeSetPersister;

import java.util.List;
import java.util.Optional;

public interface PhaseService {
    public Phase savePhase(Phase phase);
    public List<Phase> findAll();
    public Optional<Phase> findById(int id);
    void addEmployeeToPhase(int phaseId, int employeeId) ;
    void changeTask(int phaseId) throws ChangeSetPersister.NotFoundException;
}
