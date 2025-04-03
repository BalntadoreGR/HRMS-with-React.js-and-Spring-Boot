package com.diplomatiki.projectmanagement.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.time.LocalDate;

@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(name = "pid", unique = true)
    private String pid;
    @Column(name = "name")
    private String name;
    @Column(name = "email")
    private String email;
    @Column(name = "contract")
    private String contract;
    @Column(name = "salary")
    private int salary;
    @Column(name = "birth")
    private int birth;

    @Column(name ="hired")
    private int hired;

    @Column(name ="password")
    private String password;

    @ManyToMany(mappedBy = "employees")
    @JsonBackReference
    private Set<Phase> phases = new HashSet<>();

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("employee") // Ignore the 'employee' property during serialization
    private Set<Payment> payments = new HashSet<>();

    public Employee(int id, String pid, String email, String name, String contract, int salary, int birth, int hired, String password) {
        this.id = id;
        this.pid = pid;
        this.email = email;
        this.name = name;
        this.contract = contract;
        this.salary = salary;
        this.birth = birth;
        this.hired = hired;
        this.password = password;
    }

    public Employee() {}
    public int getId() { return id;}
    public void setId(int id) {this.id = id;}
    public String getPid() {return pid;}
    public void setPid(String pid) {this.pid = pid;}
    public String getEmail() {return email;}
    public void setEmail(String email) {this.email = email;}
    public String getName() { return name;}
    public void setName(String name) {this.name = name;}
    public String getContract() { return contract;}
    public void setContract(String contract) {this.contract = contract;}
    public int getSalary() {return salary;}
    public void setSalary(int salary) {this.salary = salary;}
    public int getBirth() {return birth;}
    public void setBirth(int birth) {this.birth = birth; }
    public int getHired() {return hired;}
    public void setHired(int hired) {this.hired = hired;}
    public String getPassword() {return password;}
    public void setPassword(String password) {this.password = password;}
    public Set<Phase> getPhases() {return phases;}
    public void setPhases(Set<Phase> phases) {this.phases = phases;}

}