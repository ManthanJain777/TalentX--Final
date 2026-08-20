package com.talentx.matching;

import com.talentx.model.Opportunity;
import com.talentx.model.Passport;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Builds human-readable explanations for match scores.
 */
@Component
public class ExplanationBuilder {

    public String build(
            Opportunity opportunity,
            Passport passport,
            double skillScore,
            double projectScore,
            double assessmentScore,
            double certificationScore,
            double profileScore
    ) {
        StringBuilder sb = new StringBuilder();

        // Skill explanation
        List<String> matchedSkills = opportunity.getRequiredSkills().stream()
                .filter(req -> passport.getSkills().stream()
                        .anyMatch(s -> s.getName().equalsIgnoreCase(req)))
                .collect(Collectors.toList());

        if (!matchedSkills.isEmpty()) {
            sb.append("Strong match on ").append(String.join(", ", matchedSkills)).append(". ");
        }

        // Verified skills
        long verifiedCount = passport.getSkills().stream()
                .filter(s -> s.isVerified() && matchedSkills.stream()
                        .anyMatch(ms -> ms.equalsIgnoreCase(s.getName())))
                .count();

        if (verifiedCount > 0) {
            sb.append(verifiedCount).append(" skill(s) are platform-verified. ");
        }

        // Project evidence
        if (projectScore >= 80) {
            sb.append("Extensive project portfolio with relevant technologies. ");
        } else if (projectScore >= 50) {
            sb.append("Some project evidence in required areas. ");
        }

        // Assessment
        if (assessmentScore >= 80) {
            sb.append("Outstanding assessment performance (avg ").append(String.format("%.0f", assessmentScore)).append("%). ");
        } else if (assessmentScore >= 60) {
            sb.append("Good assessment scores. ");
        }

        // Certifications
        if (certificationScore >= 70) {
            sb.append("Relevant verified certifications. ");
        }

        // Profile
        if (profileScore >= 90) {
            sb.append("Complete profile with high availability.");
        }

        return sb.toString().trim();
    }
}
