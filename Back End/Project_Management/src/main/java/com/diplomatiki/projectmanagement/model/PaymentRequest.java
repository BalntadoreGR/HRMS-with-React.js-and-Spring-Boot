package com.diplomatiki.projectmanagement.model;
import javax.persistence.*;
public class PaymentRequest {
    private int phaseId;
    private int employeeId;
    private int pay;
    private int contract;
    public int getPhaseId() {return phaseId;}
    public void setPhaseId(int phaseId) {this.phaseId = phaseId;}
    public int getEmployeeId() {return employeeId;}
    public void setEmployeeId(int employeeId) {this.employeeId = employeeId;}
    public int getPay() {return pay;}
    public void setPay(int pay) {this.pay = pay;}
    public int getContract() {return contract;}
    public void setContract(int contract) {this.contract = contract;}
}