package com.talentx.controller;

import com.talentx.model.Opportunity;
import com.talentx.repository.OpportunityRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/opportunities")
public class OpportunityController {

    private final OpportunityRepository opportunityRepository;

    public OpportunityController(OpportunityRepository opportunityRepository) {
        this.opportunityRepository = opportunityRepository;
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> deleteOpportunity(@PathVariable String id, Authentication authentication) {
        Opportunity opportunity = opportunityRepository.findById(id)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Opportunity not found"));
        
        com.talentx.security.UserPrincipal currentUser = (com.talentx.security.UserPrincipal) authentication.getPrincipal();
        String role = currentUser.getAuthorities().iterator().next().getAuthority();
        
        // FIX: Check if the current user is the owner
        if (!opportunity.getEmployerId().equals(currentUser.getUserId()) && 
            !"ROLE_ADMIN".equals(role) && !"ADMIN".equals(role)) {
            throw new AccessDeniedException("You are not authorized to delete this opportunity");
        }
        
        opportunityRepository.delete(opportunity);
        return ResponseEntity.ok().build();
    }
}
