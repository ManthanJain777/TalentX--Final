package com.talentx.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public class CreateProjectRequest {

    @NotBlank(message = "Title is required")
    @Size(min = 5, max = 100, message = "Title must be between 5 and 100 characters")
    private String title;

    @NotBlank(message = "Description is required")
    @Size(min = 20, max = 1000, message = "Description must be between 20 and 1000 characters")
    private String description;

    @Positive(message = "Budget must be positive")
    private double budget;

    private java.util.List<String> skills;
    private java.util.List<MilestoneRequest> milestones;

    public CreateProjectRequest() {}

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getBudget() { return budget; }
    public void setBudget(double budget) { this.budget = budget; }

    public java.util.List<String> getSkills() { return skills; }
    public void setSkills(java.util.List<String> skills) { this.skills = skills; }

    public java.util.List<MilestoneRequest> getMilestones() { return milestones; }
    public void setMilestones(java.util.List<MilestoneRequest> milestones) { this.milestones = milestones; }

    public static class MilestoneRequest {
        private String title;
        private String amount;
        private int weeks;
        
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        
        public String getAmount() { return amount; }
        public void setAmount(String amount) { this.amount = amount; }
        
        public int getWeeks() { return weeks; }
        public void setWeeks(int weeks) { this.weeks = weeks; }
    }
}
