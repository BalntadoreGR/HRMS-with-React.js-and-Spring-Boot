package com.diplomatiki.projectmanagement.service;
import com.diplomatiki.projectmanagement.model.Employee;
import com.diplomatiki.projectmanagement.model.Payment;
import org.springframework.data.crossstore.ChangeSetPersister;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface EmployeeService {
    public Employee saveEmployee(Employee employee);
    public List<Employee> findAll();
    public Optional<Employee> findById(int id);
    public void updateUser(Employee employee, int id) throws ChangeSetPersister.NotFoundException;

    //Set<Payment> getPaymentsForEmployee(int employeeId);
    public List<Employee> findAvailableEmployeesForNewPhase(String newPhaseStartDate, String newPhaseEndDate);

    public void employeeNotActive(int employeeId) throws ChangeSetPersister.NotFoundException;

    public Employee validateEmployeeCredentials(String email, String password);
}
