package com.talentx.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "users")
public class User {

    @Id
    private String id;

    @Indexed(unique = true)
    private String email;

    private String passwordHash;
    private String fullName;
    private String role; // CANDIDATE, EMPLOYER, ADMIN
    private String status; // ACTIVE, SUSPENDED, PENDING
    private boolean verified;

    // Candidate-specific
    private String headline;
    private String location;
    private boolean discoverable;
    private String avatarUrl;

    // Employer-specific
    private String companyName;
    private String companyLogo;
    private String industry;

    private List<String> permissions = new ArrayList<>();

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    public User() {
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public boolean isVerified() { return verified; }
    public void setVerified(boolean verified) { this.verified = verified; }

    public String getHeadline() { return headline; }
    public void setHeadline(String headline) { this.headline = headline; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public boolean isDiscoverable() { return discoverable; }
    public void setDiscoverable(boolean discoverable) { this.discoverable = discoverable; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getCompanyLogo() { return companyLogo; }
    public void setCompanyLogo(String companyLogo) { this.companyLogo = companyLogo; }

    public String getIndustry() { return industry; }
    public void setIndustry(String industry) { this.industry = industry; }

    public List<String> getPermissions() { return permissions; }
    public void setPermissions(List<String> permissions) { this.permissions = permissions; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }

    public static UserBuilder builder() {
        return new UserBuilder();
    }

    public static class UserBuilder {
        private String id;
        private String email;
        private String passwordHash;
        private String fullName;
        private String role;
        private String status;
        private boolean verified;
        private String headline;
        private String location;
        private boolean discoverable;
        private String avatarUrl;
        private String companyName;
        private String companyLogo;
        private String industry;
        private List<String> permissions = new ArrayList<>();
        private Instant createdAt;
        private Instant updatedAt;

        public UserBuilder id(String id) { this.id = id; return this; }
        public UserBuilder email(String email) { this.email = email; return this; }
        public UserBuilder passwordHash(String passwordHash) { this.passwordHash = passwordHash; return this; }
        public UserBuilder fullName(String fullName) { this.fullName = fullName; return this; }
        public UserBuilder role(String role) { this.role = role; return this; }
        public UserBuilder status(String status) { this.status = status; return this; }
        public UserBuilder verified(boolean verified) { this.verified = verified; return this; }
        public UserBuilder headline(String headline) { this.headline = headline; return this; }
        public UserBuilder location(String location) { this.location = location; return this; }
        public UserBuilder discoverable(boolean discoverable) { this.discoverable = discoverable; return this; }
        public UserBuilder avatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; return this; }
        public UserBuilder companyName(String companyName) { this.companyName = companyName; return this; }
        public UserBuilder companyLogo(String companyLogo) { this.companyLogo = companyLogo; return this; }
        public UserBuilder industry(String industry) { this.industry = industry; return this; }
        public UserBuilder permissions(List<String> permissions) { this.permissions = permissions; return this; }
        public UserBuilder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }
        public UserBuilder updatedAt(Instant updatedAt) { this.updatedAt = updatedAt; return this; }

        public User build() {
            User user = new User();
            user.setId(id);
            user.setEmail(email);
            user.setPasswordHash(passwordHash);
            user.setFullName(fullName);
            user.setRole(role);
            user.setStatus(status);
            user.setVerified(verified);
            user.setHeadline(headline);
            user.setLocation(location);
            user.setDiscoverable(discoverable);
            user.setAvatarUrl(avatarUrl);
            user.setCompanyName(companyName);
            user.setCompanyLogo(companyLogo);
            user.setIndustry(industry);
            user.setPermissions(permissions);
            user.setCreatedAt(createdAt);
            user.setUpdatedAt(updatedAt);
            return user;
        }
    }
}
