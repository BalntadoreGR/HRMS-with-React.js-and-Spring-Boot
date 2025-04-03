package com.diplomatiki.projectmanagement.service;

import com.diplomatiki.projectmanagement.model.Payment;
import com.diplomatiki.projectmanagement.model.PaymentRequest;

import java.util.List;

public interface PaymentService {
    Payment getPaymentById(int id);
    List<Payment> getPaymentsByEmployee(int employeeId);
    List<Payment> getPaymentsByEmployeeAndPhase(int employeeId, int phaseId);
    Payment createPayment(int phaseId, int employeeId, int pay, int contract);
    void deletePayment(int id);
}
