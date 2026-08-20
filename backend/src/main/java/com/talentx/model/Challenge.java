package com.talentx.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "challenges")
public class Challenge {

    @Id
    private String id;
    private String employerId;
    private String title;
    private String description;
    private List<String> requiredSkills = new ArrayList<>();
    private double prizeAmount; // INR
    private Instant deadline;
    private String status; // OPEN, CLOSED, COMPLETED
    private int submissionCount;
    private List<Winner> winners = new ArrayList<>();

    @CreatedDate
    private Instant createdAt;

    public Challenge() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getEmployerId() { return employerId; }
    public void setEmployerId(String employerId) { this.employerId = employerId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<String> getRequiredSkills() { return requiredSkills; }
    public void setRequiredSkills(List<String> requiredSkills) { this.requiredSkills = requiredSkills; }

    public double getPrizeAmount() { return prizeAmount; }
    public void setPrizeAmount(double prizeAmount) { this.prizeAmount = prizeAmount; }

    public Instant getDeadline() { return deadline; }
    public void setDeadline(Instant deadline) { this.deadline = deadline; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public int getSubmissionCount() { return submissionCount; }
    public void setSubmissionCount(int submissionCount) { this.submissionCount = submissionCount; }

    public List<Winner> getWinners() { return winners; }
    public void setWinners(List<Winner> winners) { this.winners = winners; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public static class Winner {
        private String candidateId;
        private String candidateName;
        private Instant selectedAt;

        public Winner() {}

        public String getCandidateId() { return candidateId; }
        public void setCandidateId(String candidateId) { this.candidateId = candidateId; }

        public String getCandidateName() { return candidateName; }
        public void setCandidateName(String candidateName) { this.candidateName = candidateName; }

        public Instant getSelectedAt() { return selectedAt; }
        public void setSelectedAt(Instant selectedAt) { this.selectedAt = selectedAt; }
    }
}
