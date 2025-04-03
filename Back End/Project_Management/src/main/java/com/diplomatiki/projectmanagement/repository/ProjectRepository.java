package com.diplomatiki.projectmanagement.repository;
import com.diplomatiki.projectmanagement.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project,Integer> {

    @Query(value = "SELECT project.*, phase.*, employee.* " +
            "FROM project INNER JOIN phase ON project.id = phase.project_id " +
            "INNER JOIN phase_employee ON phase.id = phase_employee.phase_id " +
            "INNER JOIN employee ON phase_employee.employee_id = employee.id " +
            "WHERE project.id = :projectId " +
            "GROUP BY project.id", nativeQuery = true)
    List<Project> findAllByProjectId(int projectId);
}
