package com.diplomatiki.projectmanagement.model;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
@Entity
@Table(name="phase")
public class Phase {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(name = "type")
    private String type;
    @Column(name = "duration")
    private int duration;
    @Temporal(TemporalType.DATE) // Use @Temporal annotation with TemporalType.DATE
    @Column(name="start")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date start;
    @Column(name="budget")
    private int budget;
    @Column(name="tasks")
    private int tasks;
    @Column(name="curTasks")
    private int curTasks;
    @Temporal(TemporalType.DATE) // Use @Temporal annotation with TemporalType.DATE
    @Column(name="end")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date end;
    @ManyToOne
    @JoinColumn(name="project_id")
    private Project project;

    @ManyToMany
    @JoinTable(name = "phase_employee",
            joinColumns = @JoinColumn(name = "phase_id"),
            inverseJoinColumns = @JoinColumn(name = "employee_id"))
    private Set<Employee> employees = new HashSet<>();

    @OneToMany(mappedBy = "phase", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("phase")
    private Set<Payment> payments = new HashSet<>();

    public int getId() {return id;}
    public void setId(int id) {this.id = id;}
    public String getType() {return type;}
    public void setType(String type) {this.type = type;}
    public int getDuration() {return duration;}
    public void setDuration(int duration) {this.duration = duration;}
    public Date getStart() {return start;}
    public void setStart(Date start) {this.start = start;}
    public Date getEnd() {return end;}
    public void setEnd(Date end) {this.end = end;}
    public int getTasks() {return tasks;}
    public void setTasks(int tasks) {this.tasks = tasks;}
    public int getCurTasks() {return curTasks;}
    public void setCurTasks(int curTasks) {this.curTasks = curTasks;}
    public int getBudget() {return budget;}
    public void setBudget(int budget) {this.budget = budget;}
    public Project getProject() {return project;}
    public void setProject(Project project) {this.project = project;}
    public Set<Employee> getEmployees() {return employees;}
    public void setEmployees(Set<Employee> employees) {this.employees = employees;}
}