package com.talentx.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "passports")
public class Passport {

    @Id
    private String id;

    @Indexed(unique = true)
    private String userId;

    private String headline;
    private String location;
    private String bio;
    private String avatarUrl;

    private List<Skill> skills = new ArrayList<>();
    private List<ProjectEvidence> projects = new ArrayList<>();
    private List<Certification> certifications = new ArrayList<>();
    private List<Assessment> assessments = new ArrayList<>();
    private List<Experience> experience = new ArrayList<>();
    private List<Education> education = new ArrayList<>();
    private SocialLinks socialLinks = new SocialLinks();

    private boolean availability;
    private boolean visibility;
    private int profileCompleteness;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    public Passport() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getHeadline() { return headline; }
    public void setHeadline(String headline) { this.headline = headline; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }

    public List<Skill> getSkills() { return skills; }
    public void setSkills(List<Skill> skills) { this.skills = skills; }

    public List<ProjectEvidence> getProjects() { return projects; }
    public void setProjects(List<ProjectEvidence> projects) { this.projects = projects; }

    public List<Certification> getCertifications() { return certifications; }
    public void setCertifications(List<Certification> certifications) { this.certifications = certifications; }

    public List<Assessment> getAssessments() { return assessments; }
    public void setAssessments(List<Assessment> assessments) { this.assessments = assessments; }
    
    public List<Experience> getExperience() { return experience; }
    public void setExperience(List<Experience> experience) { this.experience = experience; }

    public List<Education> getEducation() { return education; }
    public void setEducation(List<Education> education) { this.education = education; }

    public SocialLinks getSocialLinks() { return socialLinks; }
    public void setSocialLinks(SocialLinks socialLinks) { this.socialLinks = socialLinks; }

    // Some usages might use getInternships instead of assessments in candidate builder. The user's code uses setInternships, let me add it.
    private List<String> internships = new ArrayList<>();
    public List<String> getInternships() { return internships; }
    public void setInternships(List<String> internships) { this.internships = internships; }

    public boolean isAvailability() { return availability; }
    public void setAvailability(boolean availability) { this.availability = availability; }

    public boolean isVisibility() { return visibility; }
    public void setVisibility(boolean visibility) { this.visibility = visibility; }

    public int getProfileCompleteness() { return profileCompleteness; }
    public void setProfileCompleteness(int profileCompleteness) { this.profileCompleteness = profileCompleteness; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }

    public static class Skill {
        private String name;
        private String proficiency; // Beginner, Intermediate, Advanced, Expert
        private VerificationLevel verificationLevel = VerificationLevel.SELF_REPORTED;
        private boolean verified; // Legacy, kept for backwards compatibility
        private String verifiedBy;

        public Skill() {}

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getProficiency() { return proficiency; }
        public void setProficiency(String proficiency) { this.proficiency = proficiency; }

        public VerificationLevel getVerificationLevel() { return verificationLevel; }
        public void setVerificationLevel(VerificationLevel verificationLevel) { this.verificationLevel = verificationLevel; }

        public boolean isVerified() { return verified || verificationLevel != VerificationLevel.SELF_REPORTED; }
        public void setVerified(boolean verified) { this.verified = verified; }

        public String getVerifiedBy() { return verifiedBy; }
        public void setVerifiedBy(String verifiedBy) { this.verifiedBy = verifiedBy; }
    }

    public enum VerificationLevel {
        SELF_REPORTED,
        PEER_REVIEWED,
        ASSESSED,
        PROVEN_IN_WORK
    }

    public static class ProjectEvidence {
        private String title;
        private String description;
        private String link;
        private List<String> technologies;

        public ProjectEvidence() {}

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public String getLink() { return link; }
        public void setLink(String link) { this.link = link; }

        public List<String> getTechnologies() { return technologies; }
        public void setTechnologies(List<String> technologies) { this.technologies = technologies; }
    }

    public static class Certification {
        private String name;
        private String issuer;
        private String dateObtained;
        private boolean verified;

        public Certification() {}

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getIssuer() { return issuer; }
        public void setIssuer(String issuer) { this.issuer = issuer; }

        public String getDateObtained() { return dateObtained; }
        public void setDateObtained(String dateObtained) { this.dateObtained = dateObtained; }

        public boolean isVerified() { return verified; }
        public void setVerified(boolean verified) { this.verified = verified; }
    }

    public static class Assessment {
        private String name;
        private double score;
        private String provider;
        private String dateCompleted;

        public Assessment() {}

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public double getScore() { return score; }
        public void setScore(double score) { this.score = score; }

        public String getProvider() { return provider; }
        public void setProvider(String provider) { this.provider = provider; }

        public String getDateCompleted() { return dateCompleted; }
        public void setDateCompleted(String dateCompleted) { this.dateCompleted = dateCompleted; }
    }

    public static class SocialLinks {
        private String github;
        private String linkedin;
        private String portfolio;

        public SocialLinks() {}

        public String getGithub() { return github; }
        public void setGithub(String github) { this.github = github; }

        public String getLinkedin() { return linkedin; }
        public void setLinkedin(String linkedin) { this.linkedin = linkedin; }

        public String getPortfolio() { return portfolio; }
        public void setPortfolio(String portfolio) { this.portfolio = portfolio; }
    }

    public static class Experience {
        private String company;
        private String role;
        private String startDate;
        private String endDate;
        private String description;

        public Experience() {}

        public String getCompany() { return company; }
        public void setCompany(String company) { this.company = company; }

        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }

        public String getStartDate() { return startDate; }
        public void setStartDate(String startDate) { this.startDate = startDate; }

        public String getEndDate() { return endDate; }
        public void setEndDate(String endDate) { this.endDate = endDate; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
    }

    public static class Education {
        private String institution;
        private String degree;
        private String year;

        public Education() {}

        public String getInstitution() { return institution; }
        public void setInstitution(String institution) { this.institution = institution; }

        public String getDegree() { return degree; }
        public void setDegree(String degree) { this.degree = degree; }

        public String getYear() { return year; }
        public void setYear(String year) { this.year = year; }
    }
}

