package com.diplomatiki.projectmanagement.service;

import com.diplomatiki.projectmanagement.model.Employee;
import com.diplomatiki.projectmanagement.model.Payment;
import com.diplomatiki.projectmanagement.model.Project;
import com.diplomatiki.projectmanagement.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class EmployeeServiceImpl implements EmployeeService{

    @Autowired
    private EmployeeRepository employeeRepository;
    @Override
    public Employee saveEmployee(Employee employee) { return employeeRepository.save(employee); }
    @Override
    public List<Employee> findAll() {
        return employeeRepository.findAll();
    }
    @Override
    public Optional<Employee> findById(int id) {
        return employeeRepository.findById(id);
    }
    @Override
    public void updateUser(Employee updatedEmployee, int id) throws ChangeSetPersister.NotFoundException {
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new ChangeSetPersister.NotFoundException());
        if ( updatedEmployee.getName() != null|| updatedEmployee.getName() != " " || !updatedEmployee.getName().isEmpty()){
            employee.setName(updatedEmployee.getName());
        }
        if ( updatedEmployee.getPid() != null|| updatedEmployee.getPid() != " " || !updatedEmployee.getPid().isEmpty()){
            employee.setPid(updatedEmployee.getPid());
        }
        if ( updatedEmployee.getEmail() != null|| updatedEmployee.getEmail() != " " || !updatedEmployee.getEmail().isEmpty()){
            employee.setEmail(updatedEmployee.getEmail());
        }
        if ( updatedEmployee.getBirth() != 0 ){
            employee.setBirth(updatedEmployee.getBirth());
        }
        if ( updatedEmployee.getContract() != null|| updatedEmployee.getContract() != ""){
            employee.setContract(updatedEmployee.getContract());
        }
        if ( updatedEmployee.getSalary() != 0){
            employee.setSalary(updatedEmployee.getSalary());
        }
        employeeRepository.save(employee);
    }

    @Override
    public List<Employee> findAvailableEmployeesForNewPhase(String start, String end) {
        return employeeRepository.findAvailableEmployeesForNewPhase(start, end);
    }

    @Override
    public void employeeNotActive(int employeeId) throws ChangeSetPersister.NotFoundException {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(() -> new ChangeSetPersister.NotFoundException());
        employee.setHired(2);
        employeeRepository.save(employee);
    }

    @Override
    public Employee validateEmployeeCredentials(String email, String password) {
        Employee employee = employeeRepository.findByEmail(email);
        if (employee == null) {
            return null;
        } else if (employee.getPassword().equals(password)) {
            return employee;
        } else {
            return null;
        }
    }
}
