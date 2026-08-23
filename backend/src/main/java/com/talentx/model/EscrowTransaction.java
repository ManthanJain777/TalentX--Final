package com.talentx.model;

import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "escrow_transactions")
public class EscrowTransaction {

    @Id
    private String id;
    @Indexed
    private String projectId;
    @Indexed
    private String milestoneId;
    private double amount;
    private String currency; // INR
    @Indexed
    private String payerId;   // Employer
    @Indexed
    private String payeeId;   // Candidate
    private String status; // HELD, RELEASED, REFUNDED, DISPUTED
    private double platformFee; // 20% service fee
    private Instant releaseDate;
    private Instant refundDate;
    private String transactionHash; // Simulated immutable hash

    @CreatedDate
    private Instant createdAt;

    public EscrowTransaction() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getProjectId() { return projectId; }
    public void setProjectId(String projectId) { this.projectId = projectId; }

    public String getMilestoneId() { return milestoneId; }
    public void setMilestoneId(String milestoneId) { this.milestoneId = milestoneId; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public String getPayerId() { return payerId; }
    public void setPayerId(String payerId) { this.payerId = payerId; }

    public String getPayeeId() { return payeeId; }
    public void setPayeeId(String payeeId) { this.payeeId = payeeId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public double getPlatformFee() { return platformFee; }
    public void setPlatformFee(double platformFee) { this.platformFee = platformFee; }

    public Instant getReleaseDate() { return releaseDate; }
    public void setReleaseDate(Instant releaseDate) { this.releaseDate = releaseDate; }

    public Instant getRefundDate() { return refundDate; }
    public void setRefundDate(Instant refundDate) { this.refundDate = refundDate; }

    public String getTransactionHash() { return transactionHash; }
    public void setTransactionHash(String transactionHash) { this.transactionHash = transactionHash; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
