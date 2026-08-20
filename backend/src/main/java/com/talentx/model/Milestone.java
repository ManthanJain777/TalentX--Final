package com.talentx.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "milestones")
public class Milestone {

    @Id
    private String id;
    private String projectId;
    private String title;
    private String description;
    private Instant deadline;
    private double monetaryWeight; // e.g. 0.2 = 20%
    private boolean completed;
    private Instant completedAt;
    private String status; // PENDING, IN_PROGRESS, SUBMITTED, APPROVED, REJECTED
    private int order; // 1, 2, 3...

    public Milestone() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getProjectId() { return projectId; }
    public void setProjectId(String projectId) { this.projectId = projectId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Instant getDeadline() { return deadline; }
    public void setDeadline(Instant deadline) { this.deadline = deadline; }

    public double getMonetaryWeight() { return monetaryWeight; }
    public void setMonetaryWeight(double monetaryWeight) { this.monetaryWeight = monetaryWeight; }

    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }

    public Instant getCompletedAt() { return completedAt; }
    public void setCompletedAt(Instant completedAt) { this.completedAt = completedAt; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public int getOrder() { return order; }
    public void setOrder(int order) { this.order = order; }
}
