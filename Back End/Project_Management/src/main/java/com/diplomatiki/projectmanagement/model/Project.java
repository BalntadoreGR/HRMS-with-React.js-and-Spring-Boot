package com.diplomatiki.projectmanagement.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="project")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO )
    private int id;
    @Column(name="name")
    private String name;
    @Column(name="duration")
    private int duration;
    @Column(name="budget")
    private int budget;
    @Column(name = "status")
    private int status;
    @Column(name="tasks")
    private int tasks;
    @Column(name = "curTasks")
    private int curTasks;
    @OneToMany(mappedBy="project", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("project")
    private Set<Phase> phases = new HashSet<>();


    public int getId() {return id;}
    public void setId(int id) {this.id = id;}
    public String getName() {return name;}
    public void setName(String name) {this.name = name;}
    public int getDuration() {return duration;}
    public void setDuration(int duration) {this.duration = duration;}
    public int getBudget() {return budget;}
    public void setBudget(int budget) {this.budget = budget;}
    public int getStatus() {return status;}
    public void setStatus(int status) {this.status = status;}
    public int getTasks() {return tasks;}
    public void setTasks(int tasks) {this.tasks = tasks;}
    public int getCurTasks() {return curTasks;}
    public void setCurTasks(int curTasks) {this.curTasks = curTasks;}
    public Set<Phase> getPhases() {return phases;}
    public void setPhases(Set<Phase> phases) {this.phases = phases;}
}
