package com.diplomatiki.projectmanagement.model;

import java.util.Date;

public class PaymentWithPhaseInfo {
    private int paymentId;
    private int contract;
    private int pay;
    private String phaseType;
    private Date phaseStart;
    private Date phaseEnd;

    public PaymentWithPhaseInfo(int paymentId, int contract, int pay, String phaseType, Date phaseStart, Date phaseEnd) {
        this.paymentId = paymentId;
        this.contract = contract;
        this.pay = pay;
        this.phaseType = phaseType;
        this.phaseStart = phaseStart;
        this.phaseEnd = phaseEnd;
    }

    public int getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(int paymentId) {
        this.paymentId = paymentId;
    }

    public int getContract() {
        return contract;
    }

    public void setContract(int contract) {
        this.contract = contract;
    }

    public int getPay() {
        return pay;
    }

    public void setPay(int pay) {
        this.pay = pay;
    }

    public String getPhaseType() {
        return phaseType;
    }

    public void setPhaseType(String phaseType) {
        this.phaseType = phaseType;
    }

    public Date getPhaseStart() {
        return phaseStart;
    }

    public void setPhaseStart(Date phaseStart) {
        this.phaseStart = phaseStart;
    }

    public Date getPhaseEnd() {
        return phaseEnd;
    }

    public void setPhaseEnd(Date phaseEnd) {
        this.phaseEnd = phaseEnd;
    }
}
