package com.talentx.matching;

import com.talentx.model.Passport;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Calculates individual component scores for the matching algorithm.
 */
@Component
public class ScoreCalculator {

    /**
     * Skill Score (40% weight): How well do the candidate's skills match the required skills?
     */
    public double calculateSkillScore(List<String> requiredSkills, List<Passport.Skill> candidateSkills) {
        if (requiredSkills == null || requiredSkills.isEmpty()) return 100.0;
        if (candidateSkills == null || candidateSkills.isEmpty()) return 0.0;

        long matchedCount = requiredSkills.stream()
                .filter(req -> candidateSkills.stream()
                        .anyMatch(cs -> cs.getName().equalsIgnoreCase(req)))
                .count();

        double baseScore = ((double) matchedCount / requiredSkills.size()) * 100.0;

        // Bonus for verified skills
        long verifiedMatches = requiredSkills.stream()
                .filter(req -> candidateSkills.stream()
                        .anyMatch(cs -> cs.getName().equalsIgnoreCase(req) && cs.isVerified()))
                .count();

        double verifiedBonus = (verifiedMatches > 0) ? (verifiedMatches * 2.0) : 0;

        // Bonus for expert proficiency
        long expertMatches = requiredSkills.stream()
                .filter(req -> candidateSkills.stream()
                        .anyMatch(cs -> cs.getName().equalsIgnoreCase(req)
                                && "Expert".equalsIgnoreCase(cs.getProficiency())))
                .count();

        double expertBonus = expertMatches * 3.0;

        return Math.min(100.0, baseScore + verifiedBonus + expertBonus);
    }

    /**
     * Project Score (25% weight): Does the candidate have project evidence in required skills?
     */
    public double calculateProjectScore(List<String> requiredSkills, List<Passport.ProjectEvidence> projects) {
        if (projects == null || projects.isEmpty()) return 0.0;
        if (requiredSkills == null || requiredSkills.isEmpty()) return 50.0;

        long relevantProjects = projects.stream()
                .filter(p -> p.getTechnologies() != null && p.getTechnologies().stream()
                        .anyMatch(tech -> requiredSkills.stream()
                                .anyMatch(req -> req.equalsIgnoreCase(tech))))
                .count();

        double score = Math.min(100.0, (relevantProjects / (double) Math.max(1, requiredSkills.size())) * 100.0);
        // Bonus for having more than 3 relevant projects
        if (relevantProjects >= 3) score = Math.min(100.0, score + 10.0);

        return score;
    }

    /**
     * Assessment Score (20% weight): Average assessment performance.
     */
    public double calculateAssessmentScore(List<Passport.Assessment> assessments) {
        if (assessments == null || assessments.isEmpty()) return 0.0;

        return assessments.stream()
                .mapToDouble(Passport.Assessment::getScore)
                .average()
                .orElse(0.0);
    }

    /**
     * Certification Score (10% weight): Verified certifications.
     */
    public double calculateCertificationScore(List<Passport.Certification> certifications) {
        if (certifications == null || certifications.isEmpty()) return 0.0;

        long verified = certifications.stream().filter(Passport.Certification::isVerified).count();
        long total = certifications.size();

        double baseScore = ((double) verified / total) * 80.0;
        double countBonus = Math.min(20.0, total * 5.0);

        return Math.min(100.0, baseScore + countBonus);
    }

    /**
     * Profile Score (5% weight): Profile completeness and availability.
     */
    public double calculateProfileScore(Passport passport) {
        double score = passport.getProfileCompleteness(); // 0-100
        if (passport.isAvailability()) score = Math.min(100.0, score + 10.0);
        if (passport.isVisibility()) score = Math.min(100.0, score + 5.0);
        return score;
    }
}
