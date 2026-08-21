package com.talentx.controller;

import com.talentx.model.Opportunity;
import com.talentx.model.Passport;
import com.talentx.model.User;
import com.talentx.repository.OpportunityRepository;
import com.talentx.repository.PassportRepository;
import com.talentx.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/opportunities")
public class OpportunityController {

    private final OpportunityRepository opportunityRepository;
    private final UserRepository userRepository;
    private final PassportRepository passportRepository;

    public OpportunityController(OpportunityRepository opportunityRepository, UserRepository userRepository, PassportRepository passportRepository) {
        this.opportunityRepository = opportunityRepository;
        this.userRepository = userRepository;
        this.passportRepository = passportRepository;
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Opportunity>> getAllOpportunities(Authentication authentication) {
        com.talentx.security.UserPrincipal currentUser = (com.talentx.security.UserPrincipal) authentication.getPrincipal();
        return ResponseEntity.ok(opportunityRepository.findByEmployerId(currentUser.getUserId()));
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Opportunity> getOpportunity(@PathVariable String id) {
        return ResponseEntity.ok(opportunityRepository.findById(id)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Opportunity not found")));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('EMPLOYER', 'ADMIN')")
    public ResponseEntity<Opportunity> createOpportunity(@RequestBody Opportunity opportunity, Authentication authentication) {
        com.talentx.security.UserPrincipal currentUser = (com.talentx.security.UserPrincipal) authentication.getPrincipal();
        opportunity.setEmployerId(currentUser.getUserId());
        opportunity.setStatus("OPEN");
        opportunity.setCreatedAt(Instant.now());
        return ResponseEntity.ok(opportunityRepository.save(opportunity));
    }

    @GetMapping("/{id}/matches")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Map<String, Object>>> getMatches(@PathVariable String id) {
        Opportunity opportunity = opportunityRepository.findById(id)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Opportunity not found"));
        
        List<User> candidates = userRepository.findByDiscoverableTrue();
        List<Map<String, Object>> results = new ArrayList<>();

        for (User candidate : candidates) {
            if (!"CANDIDATE".equals(candidate.getRole())) continue;

            Passport passport = passportRepository.findByUserId(candidate.getId()).orElse(null);
            if (passport == null) continue;

            List<String> userSkills = passport.getSkills().stream().map(Passport.Skill::getName).collect(Collectors.toList());
            
            // Calculate a match score based on opportunity required skills
            int matchScore = 50; // Base score
            if (opportunity.getRequiredSkills() != null && !opportunity.getRequiredSkills().isEmpty()) {
                long matchedSkills = opportunity.getRequiredSkills().stream()
                        .filter(req -> userSkills.stream().anyMatch(s -> s.equalsIgnoreCase(req)))
                        .count();
                matchScore = (int) Math.min(99, 50 + ((matchedSkills * 100.0) / opportunity.getRequiredSkills().size()) * 0.49);
            }

            Map<String, Object> entry = new HashMap<>();
            entry.put("id", candidate.getId());
            entry.put("name", candidate.getFullName());
            entry.put("matchScore", matchScore);
            entry.put("avatar", candidate.getAvatarUrl());
            entry.put("headline", passport.getHeadline());
            
            results.add(entry);
        }
        
        // Sort by match score descending
        results.sort((a, b) -> Integer.compare((Integer) b.get("matchScore"), (Integer) a.get("matchScore")));

        return ResponseEntity.ok(results);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> deleteOpportunity(@PathVariable String id, Authentication authentication) {
        Opportunity opportunity = opportunityRepository.findById(id)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Opportunity not found"));
        
        com.talentx.security.UserPrincipal currentUser = (com.talentx.security.UserPrincipal) authentication.getPrincipal();
        String role = currentUser.getAuthorities().iterator().next().getAuthority();
        
        if (!opportunity.getEmployerId().equals(currentUser.getUserId()) && 
            !"ROLE_ADMIN".equals(role) && !"ADMIN".equals(role)) {
            throw new AccessDeniedException("You are not authorized to delete this opportunity");
        }
        
        opportunityRepository.delete(opportunity);
        return ResponseEntity.ok().build();
    }
}
