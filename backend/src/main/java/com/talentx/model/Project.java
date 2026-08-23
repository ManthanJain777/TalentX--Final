package com.talentx.model;

import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "projects")
public class Project {

    @Id
    private String id;
    @Indexed
    private String matchId;
    @Indexed
    private String employerId;
    @Indexed
    private String freelancerId;
    private String title;
    private String description;
    private double totalBudget;
    private String currency; // INR
    private String status; // DRAFT, ACTIVE, PAUSED, COMPLETED, DISPUTED
    private int healthScore; // 0-100

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    public Project() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getMatchId() { return matchId; }
    public void setMatchId(String matchId) { this.matchId = matchId; }

    public String getEmployerId() { return employerId; }
    public void setEmployerId(String employerId) { this.employerId = employerId; }

    public String getFreelancerId() { return freelancerId; }
    public void setFreelancerId(String freelancerId) { this.freelancerId = freelancerId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getTotalBudget() { return totalBudget; }
    public void setTotalBudget(double totalBudget) { this.totalBudget = totalBudget; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public int getHealthScore() { return healthScore; }
    public void setHealthScore(int healthScore) { this.healthScore = healthScore; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }

    public static ProjectBuilder builder() {
        return new ProjectBuilder();
    }

    public static class ProjectBuilder {
        private String id;
        @Indexed
        private String matchId;
        @Indexed
        private String employerId;
        @Indexed
        private String freelancerId;
        private String title;
        private String description;
        private double totalBudget;
        private String currency;
        private String status;
        private int healthScore;
        private Instant createdAt;
        private Instant updatedAt;

        public ProjectBuilder id(String id) { this.id = id; return this; }
        public ProjectBuilder matchId(String matchId) { this.matchId = matchId; return this; }
        public ProjectBuilder employerId(String employerId) { this.employerId = employerId; return this; }
        public ProjectBuilder freelancerId(String freelancerId) { this.freelancerId = freelancerId; return this; }
        public ProjectBuilder title(String title) { this.title = title; return this; }
        public ProjectBuilder description(String description) { this.description = description; return this; }
        public ProjectBuilder totalBudget(double totalBudget) { this.totalBudget = totalBudget; return this; }
        public ProjectBuilder currency(String currency) { this.currency = currency; return this; }
        public ProjectBuilder status(String status) { this.status = status; return this; }
        public ProjectBuilder healthScore(int healthScore) { this.healthScore = healthScore; return this; }
        public ProjectBuilder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }
        public ProjectBuilder updatedAt(Instant updatedAt) { this.updatedAt = updatedAt; return this; }

        public Project build() {
            Project project = new Project();
            project.setId(this.id);
            project.setMatchId(this.matchId);
            project.setEmployerId(this.employerId);
            project.setFreelancerId(this.freelancerId);
            project.setTitle(this.title);
            project.setDescription(this.description);
            project.setTotalBudget(this.totalBudget);
            project.setCurrency(this.currency);
            project.setStatus(this.status);
            project.setHealthScore(this.healthScore);
            project.setCreatedAt(this.createdAt);
            project.setUpdatedAt(this.updatedAt);
            return project;
        }
    }
}
