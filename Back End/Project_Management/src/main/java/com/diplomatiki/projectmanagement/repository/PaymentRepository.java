package com.diplomatiki.projectmanagement.repository;

import com.diplomatiki.projectmanagement.model.Employee;
import com.diplomatiki.projectmanagement.model.Payment;
import com.diplomatiki.projectmanagement.model.Phase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface PaymentRepository extends JpaRepository<Payment,Integer> {
    @Query("SELECT p FROM Payment p WHERE p.employee = :employee")
    List<Payment> findByEmployeeId(Employee employee);

    @Query("SELECT p FROM Payment p WHERE p.employee = :employee AND p.phase = :phase")
    List<Payment> getPaymentsByEmployeeAndPhase(Employee employee, Phase phase);
}
