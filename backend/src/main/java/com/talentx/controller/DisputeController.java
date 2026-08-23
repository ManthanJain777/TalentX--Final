package com.talentx.controller;

import com.talentx.model.Dispute;
import com.talentx.repository.DisputeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/disputes")
public class DisputeController {

    private final DisputeRepository disputeRepository;

    public DisputeController(DisputeRepository disputeRepository) {
        this.disputeRepository = disputeRepository;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN') or hasRole('ADMIN')")
    public ResponseEntity<List<Dispute>> getAllDisputes(@RequestParam(required = false) String status) {
        if (status != null) {
            return ResponseEntity.ok(disputeRepository.findByStatus(status.toUpperCase()));
        }
        return ResponseEntity.ok(disputeRepository.findAll());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or hasRole('ADMIN') or @securityService.isDisputeMember(authentication, #id)")
    public ResponseEntity<Dispute> getDispute(@PathVariable String id) {
        return ResponseEntity.ok(disputeRepository.findById(id)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Dispute not found")));
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Dispute> createDispute(@RequestBody Dispute dispute, Authentication authentication) {
        com.talentx.security.UserPrincipal principal = (com.talentx.security.UserPrincipal) authentication.getPrincipal();
        dispute.setRaisedBy(principal.getUserId());
        dispute.setStatus("OPEN");
        dispute.setResolution(null);
        dispute.setResolvedBy(null);
        dispute.setResolvedAt(null);
        return ResponseEntity.ok(disputeRepository.save(dispute));
    }

    @PatchMapping("/{id}/resolve")
    @PreAuthorize("hasAuthority('ADMIN') or hasRole('ADMIN')")
    public ResponseEntity<Dispute> resolveDispute(
            @PathVariable String id,
            @RequestParam String resolution,
            @RequestParam(required = false) String notes,
            Authentication authentication
    ) {
        Dispute dispute = disputeRepository.findById(id)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Dispute not found"));
        
        com.talentx.security.UserPrincipal principal = (com.talentx.security.UserPrincipal) authentication.getPrincipal();

        dispute.setStatus("RESOLVED");
        dispute.setResolution(resolution); // REFUND, SPLIT, RELEASE
        dispute.setResolvedBy(principal.getUserId());
        dispute.setResolutionNotes(notes);
        dispute.setResolvedAt(Instant.now());
        return ResponseEntity.ok(disputeRepository.save(dispute));
    }
}
