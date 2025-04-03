package com.diplomatiki.projectmanagement.service;

import com.diplomatiki.projectmanagement.model.Employee;
import com.diplomatiki.projectmanagement.model.Payment;
import com.diplomatiki.projectmanagement.model.Phase;
import com.diplomatiki.projectmanagement.repository.EmployeeRepository;
import com.diplomatiki.projectmanagement.repository.PaymentRepository;
import com.diplomatiki.projectmanagement.repository.PhaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class PaymentServiceImpl implements PaymentService{

    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private PhaseRepository phaseRepository;
    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public Payment getPaymentById(int id) {
        Optional<Payment> optionalPayment = paymentRepository.findById(id);
        return optionalPayment.orElse(null);
    }
    @Override
    public List<Payment> getPaymentsByEmployee(int employeeId) {
        Employee employee = employeeRepository.findById(employeeId).orElse(null);
        return paymentRepository.findByEmployeeId(employee);
    }
    @Override
    public List<Payment> getPaymentsByEmployeeAndPhase(int employeeId, int phaseId) {
        Phase phase = phaseRepository.findById(phaseId).orElse(null);
        Employee employee = employeeRepository.findById(employeeId).orElse(null);
        return paymentRepository.getPaymentsByEmployeeAndPhase(employee, phase);
    }
    @Override
    public Payment createPayment(int phaseId, int employeeId, int pay, int contract) {
        Phase phase = phaseRepository.findById(phaseId).orElse(null);
        Employee employee = employeeRepository.findById(employeeId).orElse(null);
        Payment payment = new Payment();
        if (phase != null && employee != null) {
            payment.setPhase(phase);
            payment.setEmployee(employee);
            payment.setPay(pay);
            payment.setContract(contract);
            return paymentRepository.save(payment);
        } else {
            throw new EntityNotFoundException("Phase not found with ID: " + phaseId);
        }
    }
    @Override
    public void deletePayment(int id) {
        paymentRepository.deleteById(id);
    }
}
