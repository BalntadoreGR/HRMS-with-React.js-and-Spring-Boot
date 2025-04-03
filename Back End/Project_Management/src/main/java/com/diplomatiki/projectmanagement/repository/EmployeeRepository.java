package com.diplomatiki.projectmanagement.repository;
import com.diplomatiki.projectmanagement.model.Payment;
import com.diplomatiki.projectmanagement.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee,Integer> {


    //TODO: Search for available Employees For NewPhase
    @Query(value = "SELECT *  " +
            "FROM employee e " +
            "WHERE e.id NOT IN (" +
            "    SELECT pe.employee_id " +
            "    FROM phase_employee pe " +
            "    JOIN phase p ON pe.phase_id = p.id " +
            "    WHERE (" +
            "        (p.start < :newPhaseEndDate OR p.start IS NULL) " +
            "        AND " +
            "        (p.end > :newPhaseStartDate OR p.end IS NULL)" +
            "    )" +
            ") AND e.hired = 1 ", nativeQuery = true)
    List<Employee> findAvailableEmployeesForNewPhase(String newPhaseStartDate, String newPhaseEndDate);

    @Query(value = "SELECT * " +
            "FROM employee e " +
            "WHERE e.email = :email ", nativeQuery = true)
    Employee findByEmail(String email);
}


