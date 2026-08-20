package com.talentx.matching;

import com.talentx.model.Match;
import com.talentx.model.Opportunity;
import com.talentx.model.Passport;
import org.springframework.stereotype.Component;

/**
 * Core matching engine implementing the 40/25/20/10/5 weighted algorithm.
 *
 * Weights:
 *   Skills      = 40%
 *   Projects    = 25%
 *   Assessments = 20%
 *   Certifications = 10%
 *   Profile     = 5%
 */
@Component
public class MatchEngine {

    private final ScoreCalculator scoreCalculator;
    private final ExplanationBuilder explanationBuilder;

    public MatchEngine(ScoreCalculator scoreCalculator, ExplanationBuilder explanationBuilder) {
        this.scoreCalculator = scoreCalculator;
        this.explanationBuilder = explanationBuilder;
    }

    /**
     * Calculate a full match between an opportunity and a candidate passport.
     */
    public Match calculateMatch(Opportunity opportunity, Passport passport, String employerId) {
        double skillScore = scoreCalculator.calculateSkillScore(opportunity.getRequiredSkills(), passport.getSkills());
        double projectScore = scoreCalculator.calculateProjectScore(opportunity.getRequiredSkills(), passport.getProjects());
        double assessmentScore = scoreCalculator.calculateAssessmentScore(passport.getAssessments());
        double certificationScore = scoreCalculator.calculateCertificationScore(passport.getCertifications());
        double profileScore = scoreCalculator.calculateProfileScore(passport);

        double totalScore = (skillScore * 0.40)
                + (projectScore * 0.25)
                + (assessmentScore * 0.20)
                + (certificationScore * 0.10)
                + (profileScore * 0.05);

        // Round to 1 decimal place
        totalScore = Math.round(totalScore * 10.0) / 10.0;

        String explanation = explanationBuilder.build(
                opportunity, passport, skillScore, projectScore,
                assessmentScore, certificationScore, profileScore
        );

        return Match.builder()
                .opportunityId(opportunity.getId())
                .candidateId(passport.getUserId())
                .employerId(employerId)
                .totalScore(totalScore)
                .skillBreakdown(Match.SkillBreakdown.builder()
                        .skills(Math.round(skillScore * 10.0) / 10.0)
                        .projects(Math.round(projectScore * 10.0) / 10.0)
                        .assessments(Math.round(assessmentScore * 10.0) / 10.0)
                        .certifications(Math.round(certificationScore * 10.0) / 10.0)
                        .profile(Math.round(profileScore * 10.0) / 10.0)
                        .build())
                .explanation(explanation)
                .status("PENDING")
                .build();
    }
}
