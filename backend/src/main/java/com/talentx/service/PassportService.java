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
        return passportRepository.findByUserId(userId)
                .map(existing -> {
                    existing.setHeadline(passportData.getHeadline());
                    existing.setLocation(passportData.getLocation());
                    existing.setBio(passportData.getBio());
                    existing.setAvatarUrl(passportData.getAvatarUrl());
                    
                    if (passportData.getSkills() != null) existing.setSkills(passportData.getSkills());
                    if (passportData.getProjects() != null) existing.setProjects(passportData.getProjects());
                    if (passportData.getCertifications() != null) existing.setCertifications(passportData.getCertifications());
                    if (passportData.getAssessments() != null) existing.setAssessments(passportData.getAssessments());
                    if (passportData.getExperience() != null) existing.setExperience(passportData.getExperience());
                    if (passportData.getEducation() != null) existing.setEducation(passportData.getEducation());
                    if (passportData.getSocialLinks() != null) existing.setSocialLinks(passportData.getSocialLinks());
                    
                    existing.setAvailability(passportData.isAvailability());
                    existing.setVisibility(passportData.isVisibility());
                    existing.setProfileCompleteness(calculateCompleteness(existing));
                    
                    return passportRepository.save(existing);
                })
                .orElseGet(() -> {
                    passportData.setUserId(userId);
                    passportData.setProfileCompleteness(calculateCompleteness(passportData));
                    return passportRepository.save(passportData);
                });
    }

    private int calculateCompleteness(Passport passport) {
        int score = 0;
        if (passport.getHeadline() != null && !passport.getHeadline().isEmpty()) score += 10;
        if (passport.getLocation() != null && !passport.getLocation().isEmpty()) score += 5;
        if (passport.getBio() != null && !passport.getBio().isEmpty()) score += 10;
        if (passport.getAvatarUrl() != null && !passport.getAvatarUrl().isEmpty()) score += 5;
        if (passport.getSkills() != null && !passport.getSkills().isEmpty()) score += 20;
        if (passport.getExperience() != null && !passport.getExperience().isEmpty()) score += 15;
        if (passport.getEducation() != null && !passport.getEducation().isEmpty()) score += 10;
        if (passport.getProjects() != null && !passport.getProjects().isEmpty()) score += 15;
        if (passport.getSocialLinks() != null && (
            (passport.getSocialLinks().getGithub() != null && !passport.getSocialLinks().getGithub().isEmpty()) ||
            (passport.getSocialLinks().getLinkedin() != null && !passport.getSocialLinks().getLinkedin().isEmpty())
        )) score += 10;
        
        return Math.min(100, score);
    }
}
