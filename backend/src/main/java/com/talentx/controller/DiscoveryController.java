package com.talentx.controller;

import com.talentx.model.Passport;
import com.talentx.model.User;
import com.talentx.repository.PassportRepository;
import com.talentx.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/discovery")
public class DiscoveryController {

    private final UserRepository userRepository;
    private final PassportRepository passportRepository;

    public DiscoveryController(UserRepository userRepository, PassportRepository passportRepository) {
        this.userRepository = userRepository;
        this.passportRepository = passportRepository;
    }

    @GetMapping("/candidates")
    public ResponseEntity<List<Map<String, Object>>> discoverCandidates(
            @RequestParam(required = false) String skills,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) Boolean available,
            @RequestParam(required = false, defaultValue = "0") Double minRating
    ) {
        List<User> candidates = userRepository.findByDiscoverableTrue();

        List<Map<String, Object>> results = new ArrayList<>();

        for (User candidate : candidates) {
            if (!"CANDIDATE".equals(candidate.getRole())) continue;

            Passport passport = passportRepository.findByUserId(candidate.getId()).orElse(null);
            if (passport == null) continue;

            // Filter by availability
            if (available != null && available && !passport.isAvailability()) continue;

            // Filter by location
            if (location != null && !location.isEmpty() && passport.getLocation() != null
                    && !passport.getLocation().toLowerCase().contains(location.toLowerCase())) continue;

            // Filter by skills
            if (skills != null && !skills.isEmpty()) {
                List<String> requestedSkills = Arrays.asList(skills.split(","));
                boolean hasSkill = requestedSkills.stream().anyMatch(req ->
                        passport.getSkills().stream().anyMatch(s -> s.getName().equalsIgnoreCase(req.trim()))
                );
                if (!hasSkill) continue;
            }

            Map<String, Object> entry = new HashMap<>();
            entry.put("id", candidate.getId());
            entry.put("fullName", candidate.getFullName());
            entry.put("headline", passport.getHeadline());
            entry.put("location", passport.getLocation());
            entry.put("available", passport.isAvailability());
            entry.put("skills", passport.getSkills().stream().map(Passport.Skill::getName).collect(Collectors.toList()));
            entry.put("profileCompleteness", passport.getProfileCompleteness());
            entry.put("avatarUrl", candidate.getAvatarUrl());
            results.add(entry);
        }

        return ResponseEntity.ok(results);
    }
}
