package com.talentx.controller;

import com.talentx.model.Dispute;
import com.talentx.repository.DisputeRepository;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<Dispute>> getAllDisputes(@RequestParam(required = false) String status) {
        if (status != null) {
            return ResponseEntity.ok(disputeRepository.findByStatus(status.toUpperCase()));
        }
        return ResponseEntity.ok(disputeRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Dispute> getDispute(@PathVariable String id) {
        return ResponseEntity.ok(disputeRepository.findById(id)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Dispute not found")));
    }

    @PostMapping
    public ResponseEntity<Dispute> createDispute(@RequestBody Dispute dispute) {
        dispute.setStatus("OPEN");
        return ResponseEntity.ok(disputeRepository.save(dispute));
    }

    @PatchMapping("/{id}/resolve")
    public ResponseEntity<Dispute> resolveDispute(
            @PathVariable String id,
            @RequestParam String resolution,
            @RequestParam String resolvedBy,
            @RequestParam(required = false) String notes
    ) {
        Dispute dispute = disputeRepository.findById(id)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Dispute not found"));
        dispute.setStatus("RESOLVED");
        dispute.setResolution(resolution); // REFUND, SPLIT, RELEASE
        dispute.setResolvedBy(resolvedBy);
        dispute.setResolutionNotes(notes);
        dispute.setResolvedAt(Instant.now());
        return ResponseEntity.ok(disputeRepository.save(dispute));
    }
}
