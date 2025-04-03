package com.diplomatiki.projectmanagement.model;

import javax.persistence.*;
import java.util.Optional;

@Entity
@Table(name = "payment")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(name = "pay")
    private int pay;
    @Column(name = "contract")
    private int contract;

    @ManyToOne
    @JoinColumn(name = "phase_id")
    private Phase phase;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    public int getId() {return id;}
    public void setId(int id) {this.id = id;}
    public int getPay() {return pay;}
    public void setPay(int pay) {this.pay = pay;}
    public int getContract() {return contract;}
    public void setContract(int contract) {this.contract = contract;}
    public Phase getPhase() {return phase;}
    public void setPhase(Phase phase) {this.phase = phase;}
    public Employee getEmployee() {return employee;}
    public void setEmployee(Employee employee) {this.employee = employee;}
}
