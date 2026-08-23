package com.talentx.model;

import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "submissions")
public class Submission {

    @Id
    private String id;
    @Indexed
    private String challengeId;
    @Indexed
    private String candidateId;
    private String candidateName;
    private String solutionUrl;
    private String comments;
    private String fileUrl;
    private String fileName;
    private String status; // PENDING, WINNER, REJECTED

    @CreatedDate
    private Instant submittedAt;

    public Submission() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getChallengeId() { return challengeId; }
    public void setChallengeId(String challengeId) { this.challengeId = challengeId; }

    public String getCandidateId() { return candidateId; }
    public void setCandidateId(String candidateId) { this.candidateId = candidateId; }

    public String getCandidateName() { return candidateName; }
    public void setCandidateName(String candidateName) { this.candidateName = candidateName; }

    public String getSolutionUrl() { return solutionUrl; }
    public void setSolutionUrl(String solutionUrl) { this.solutionUrl = solutionUrl; }

    public String getComments() { return comments; }
    public void setComments(String comments) { this.comments = comments; }

    public String getFileUrl() { return fileUrl; }
    public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }

    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Instant getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(Instant submittedAt) { this.submittedAt = submittedAt; }
}
