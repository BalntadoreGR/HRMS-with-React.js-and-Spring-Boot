package com.diplomatiki.projectmanagement.controller;

import com.diplomatiki.projectmanagement.model.Employee;
import com.diplomatiki.projectmanagement.model.Payment;
import com.diplomatiki.projectmanagement.repository.EmployeeRepository;
import com.diplomatiki.projectmanagement.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@CrossOrigin
@RestController
@RequestMapping("/employee")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private EmployeeRepository employeeRepository;

    @PostMapping("/add")
    public String add(@RequestBody Employee employee){
        employeeService.saveEmployee(employee);
        return "New employee is added";
    }
    @GetMapping("/findById/{id}")
    public Optional<Employee> findById(@PathVariable int id){
        Optional<Employee> employee = employeeService.findById(id);
        return employeeService.findById(id);
    }
    @GetMapping("/findAll")
    public List<Employee> findAll(){
        return employeeService.findAll();
    }

    @PostMapping("/edit/{id}")
    public ResponseEntity<Employee> updateUser(@RequestBody Employee updatedEmployee, @PathVariable int id) throws ChangeSetPersister.NotFoundException {
        employeeService.updateUser(updatedEmployee, id);
        return ResponseEntity.ok(updatedEmployee);
    }

    @PostMapping("/login")
    public Employee login(@RequestBody Employee employee) {
        // Validate employee credentials
        return employeeService.validateEmployeeCredentials(employee.getEmail(), employee.getPassword());
    }

    @PostMapping("/employeeNotActive/{employeeId}")
    public ResponseEntity<String> employeeNotActive(@PathVariable int employeeId) throws ChangeSetPersister.NotFoundException {
        employeeService.employeeNotActive(employeeId);
        return ResponseEntity.ok("Employee Not active");
    }
    @GetMapping("/available")
    public List<Employee> findAvailableEmployeesForNewPhase(@RequestParam String start, @RequestParam String end){
        return employeeService.findAvailableEmployeesForNewPhase(start, end);
    }
}
