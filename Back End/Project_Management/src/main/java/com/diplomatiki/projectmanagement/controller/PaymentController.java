package com.diplomatiki.projectmanagement.controller;

import com.diplomatiki.projectmanagement.model.Employee;
import com.diplomatiki.projectmanagement.model.Payment;
import com.diplomatiki.projectmanagement.model.Phase;
import com.diplomatiki.projectmanagement.repository.EmployeeRepository;
import com.diplomatiki.projectmanagement.repository.PaymentRepository;
import com.diplomatiki.projectmanagement.repository.PhaseRepository;
import com.diplomatiki.projectmanagement.service.EmployeeService;
import com.diplomatiki.projectmanagement.service.PaymentService;
import com.diplomatiki.projectmanagement.service.PhaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/payment")
public class PaymentController {

    private final PaymentService paymentService;
    private final EmployeeService employeeService;
    private final PhaseService phaseService;

    @Autowired
    public PaymentController(PaymentService paymentService, EmployeeService employeeService, PhaseService phaseService) {
        this.paymentService = paymentService;
        this.employeeService = employeeService;
        this.phaseService = phaseService;
    }
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private PhaseRepository phaseRepository;
    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping("/{id}")
    public Payment getPaymentById(@PathVariable int id) {
        return paymentService.getPaymentById(id);
    }

    @GetMapping("/employee/{employeeId}")
    public List<Payment> getPaymentsByEmployee(@PathVariable int employeeId) {
        // Fetch payments by employee using the service or repository
        return paymentService.getPaymentsByEmployee(employeeId);
    }

    @GetMapping("/{employeeId}/{phaseId}")
    public List<Payment> getPaymentsByEmployeeAndPhase(@PathVariable int employeeId, @PathVariable int phaseId) {
        // Fetch payments by employee using the service or repository
        System.out.println(employeeId);
        System.out.println(phaseId);
        return paymentService.getPaymentsByEmployeeAndPhase(employeeId, phaseId);
    }
    @PostMapping("/add/{phaseId}/{employeeId}")
    public Payment createPayment(@PathVariable int phaseId, @PathVariable int employeeId, @RequestParam int pay, @RequestParam int contract) {
        System.out.println(pay);
        return paymentService.createPayment(phaseId, employeeId, pay, contract);
    }

    @DeleteMapping("/delete/{id}")
    public void deletePayment(@PathVariable int id) {
        paymentService.deletePayment(id);
    }
}
