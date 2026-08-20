package com.talentx.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "deliverables")
public class Deliverable {

    @Id
    private String id;
    private String milestoneId;
    private String projectId;
    private String uploadedBy; // userId
    private String fileName;
    private String fileUrl;
    private long fileSize;
    private String contentType;
    private int version; // v1, v2, v3...
    private String status; // SUBMITTED, APPROVED, REVISION_REQUESTED
    private String feedback;
    private List<VersionHistory> versionHistory = new ArrayList<>();

    @CreatedDate
    private Instant uploadedAt;

    public Deliverable() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getMilestoneId() { return milestoneId; }
    public void setMilestoneId(String milestoneId) { this.milestoneId = milestoneId; }

    public String getProjectId() { return projectId; }
    public void setProjectId(String projectId) { this.projectId = projectId; }

    public String getUploadedBy() { return uploadedBy; }
    public void setUploadedBy(String uploadedBy) { this.uploadedBy = uploadedBy; }

    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }

    public String getFileUrl() { return fileUrl; }
    public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }

    public long getFileSize() { return fileSize; }
    public void setFileSize(long fileSize) { this.fileSize = fileSize; }

    public String getContentType() { return contentType; }
    public void setContentType(String contentType) { this.contentType = contentType; }

    public int getVersion() { return version; }
    public void setVersion(int version) { this.version = version; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }

    public List<VersionHistory> getVersionHistory() { return versionHistory; }
    public void setVersionHistory(List<VersionHistory> versionHistory) { this.versionHistory = versionHistory; }

    public Instant getUploadedAt() { return uploadedAt; }
    public void setUploadedAt(Instant uploadedAt) { this.uploadedAt = uploadedAt; }

    public static class VersionHistory {
        private int version;
        private String fileUrl;
        private Instant uploadedAt;
        private String notes;

        public VersionHistory() {}

        public int getVersion() { return version; }
        public void setVersion(int version) { this.version = version; }

        public String getFileUrl() { return fileUrl; }
        public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }

        public Instant getUploadedAt() { return uploadedAt; }
        public void setUploadedAt(Instant uploadedAt) { this.uploadedAt = uploadedAt; }

        public String getNotes() { return notes; }
        public void setNotes(String notes) { this.notes = notes; }
    }
}
