package com.talentx.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

public class ChallengeSubmissionReviewRequest {
    
    @Min(value = 1, message = "Score must be at least 1")
    @Max(value = 100, message = "Score must not exceed 100")
    private int score;
    
    @Size(max = 1000, message = "Feedback cannot exceed 1000 characters")
    private String feedback;
    
    private boolean isWinner;

    public ChallengeSubmissionReviewRequest() {}

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public boolean isWinner() {
        return isWinner;
    }

    public void setWinner(boolean winner) {
        isWinner = winner;
    }
}
