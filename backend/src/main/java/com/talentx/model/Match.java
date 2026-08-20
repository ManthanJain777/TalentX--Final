package com.talentx.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "matches")
public class Match {

    @Id
    private String id;
    private String opportunityId;
    private String candidateId;
    private String employerId;
    private double totalScore;
    private SkillBreakdown skillBreakdown;
    private String explanation;
    private String status; // PENDING, ACCEPTED, REJECTED

    @CreatedDate
    private Instant createdAt;

    public Match() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getOpportunityId() { return opportunityId; }
    public void setOpportunityId(String opportunityId) { this.opportunityId = opportunityId; }

    public String getCandidateId() { return candidateId; }
    public void setCandidateId(String candidateId) { this.candidateId = candidateId; }

    public String getEmployerId() { return employerId; }
    public void setEmployerId(String employerId) { this.employerId = employerId; }

    public double getTotalScore() { return totalScore; }
    public void setTotalScore(double totalScore) { this.totalScore = totalScore; }

    public SkillBreakdown getSkillBreakdown() { return skillBreakdown; }
    public void setSkillBreakdown(SkillBreakdown skillBreakdown) { this.skillBreakdown = skillBreakdown; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public static MatchBuilder builder() {
        return new MatchBuilder();
    }

    public static class MatchBuilder {
        private String id;
        private String opportunityId;
        private String candidateId;
        private String employerId;
        private double totalScore;
        private SkillBreakdown skillBreakdown;
        private String explanation;
        private String status;
        private Instant createdAt;

        public MatchBuilder id(String id) { this.id = id; return this; }
        public MatchBuilder opportunityId(String opportunityId) { this.opportunityId = opportunityId; return this; }
        public MatchBuilder candidateId(String candidateId) { this.candidateId = candidateId; return this; }
        public MatchBuilder employerId(String employerId) { this.employerId = employerId; return this; }
        public MatchBuilder totalScore(double totalScore) { this.totalScore = totalScore; return this; }
        public MatchBuilder skillBreakdown(SkillBreakdown skillBreakdown) { this.skillBreakdown = skillBreakdown; return this; }
        public MatchBuilder explanation(String explanation) { this.explanation = explanation; return this; }
        public MatchBuilder status(String status) { this.status = status; return this; }
        public MatchBuilder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }

        public Match build() {
            Match match = new Match();
            match.setId(id);
            match.setOpportunityId(opportunityId);
            match.setCandidateId(candidateId);
            match.setEmployerId(employerId);
            match.setTotalScore(totalScore);
            match.setSkillBreakdown(skillBreakdown);
            match.setExplanation(explanation);
            match.setStatus(status);
            match.setCreatedAt(createdAt);
            return match;
        }
    }

    public static class SkillBreakdown {
        private double skills;
        private double projects;
        private double assessments;
        private double certifications;
        private double profile;

        public SkillBreakdown() {}

        public double getSkills() { return skills; }
        public void setSkills(double skills) { this.skills = skills; }

        public double getProjects() { return projects; }
        public void setProjects(double projects) { this.projects = projects; }

        public double getAssessments() { return assessments; }
        public void setAssessments(double assessments) { this.assessments = assessments; }

        public double getCertifications() { return certifications; }
        public void setCertifications(double certifications) { this.certifications = certifications; }

        public double getProfile() { return profile; }
        public void setProfile(double profile) { this.profile = profile; }

        public static SkillBreakdownBuilder builder() {
            return new SkillBreakdownBuilder();
        }

        public static class SkillBreakdownBuilder {
            private double skills;
            private double projects;
            private double assessments;
            private double certifications;
            private double profile;

            public SkillBreakdownBuilder skills(double skills) { this.skills = skills; return this; }
            public SkillBreakdownBuilder projects(double projects) { this.projects = projects; return this; }
            public SkillBreakdownBuilder assessments(double assessments) { this.assessments = assessments; return this; }
            public SkillBreakdownBuilder certifications(double certifications) { this.certifications = certifications; return this; }
            public SkillBreakdownBuilder profile(double profile) { this.profile = profile; return this; }

            public SkillBreakdown build() {
                SkillBreakdown sb = new SkillBreakdown();
                sb.setSkills(skills);
                sb.setProjects(projects);
                sb.setAssessments(assessments);
                sb.setCertifications(certifications);
                sb.setProfile(profile);
                return sb;
            }
        }
    }
}
