package com.talentx.service;

import com.talentx.model.Passport;
import com.talentx.repository.PassportRepository;
import org.springframework.stereotype.Service;

@Service
public class PassportService {

    private final PassportRepository passportRepository;

    public PassportService(PassportRepository passportRepository) {
        this.passportRepository = passportRepository;
    }

    public Passport getByUserId(String userId) {
        return passportRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Passport not found for user: " + userId));
    }

    public Passport createOrUpdate(String userId, Passport passportData) {
        Passport existing = passportRepository.findByUserId(userId).orElse(null);

        if (existing != null) {
            existing.setHeadline(passportData.getHeadline());
            existing.setLocation(passportData.getLocation());
            existing.setBio(passportData.getBio());
            existing.setSkills(passportData.getSkills());
            existing.setProjects(passportData.getProjects());
            existing.setCertifications(passportData.getCertifications());
            existing.setAssessments(passportData.getAssessments());
            existing.setAvailability(passportData.isAvailability());
            existing.setVisibility(passportData.isVisibility());
            existing.setProfileCompleteness(calculateCompleteness(existing));
            return passportRepository.save(existing);
        }

        passportData.setUserId(userId);
        passportData.setProfileCompleteness(calculateCompleteness(passportData));
        return passportRepository.save(passportData);
    }

    private int calculateCompleteness(Passport passport) {
        int score = 0;
        if (passport.getHeadline() != null && !passport.getHeadline().isEmpty()) score += 15;
        if (passport.getLocation() != null && !passport.getLocation().isEmpty()) score += 10;
        if (passport.getBio() != null && !passport.getBio().isEmpty()) score += 10;
        if (passport.getSkills() != null && !passport.getSkills().isEmpty()) score += 25;
        if (passport.getProjects() != null && !passport.getProjects().isEmpty()) score += 20;
        if (passport.getCertifications() != null && !passport.getCertifications().isEmpty()) score += 10;
        if (passport.getAssessments() != null && !passport.getAssessments().isEmpty()) score += 10;
        return Math.min(100, score);
    }
}
