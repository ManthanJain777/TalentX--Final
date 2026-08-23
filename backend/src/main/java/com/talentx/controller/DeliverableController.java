package com.talentx.controller;

import com.talentx.model.Deliverable;
import com.talentx.repository.DeliverableRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@RequestMapping("/api/milestones")
public class DeliverableController {

    private final DeliverableRepository deliverableRepository;

    public DeliverableController(DeliverableRepository deliverableRepository) {
        this.deliverableRepository = deliverableRepository;
    }

    @GetMapping("/{milestoneId}/deliverables")
    @PreAuthorize("@securityService.isMilestoneMember(authentication, #milestoneId)")
    public ResponseEntity<List<Deliverable>> getDeliverables(@PathVariable String milestoneId) {
        return ResponseEntity.ok(deliverableRepository.findByMilestoneIdOrderByVersionDesc(milestoneId));
    }

    @PostMapping("/{milestoneId}/deliverables")
    @PreAuthorize("@securityService.isMilestoneFreelancer(authentication, #milestoneId)")
    public ResponseEntity<Deliverable> uploadDeliverable(@PathVariable String milestoneId, @RequestBody Deliverable deliverable, Authentication authentication) {
        List<Deliverable> existing = deliverableRepository.findByMilestoneIdOrderByVersionDesc(milestoneId);
        int nextVersion = existing.isEmpty() ? 1 : existing.get(0).getVersion() + 1;

        deliverable.setMilestoneId(milestoneId);
        deliverable.setVersion(nextVersion);
        deliverable.setStatus("SUBMITTED");
        
        com.talentx.security.UserPrincipal principal = (com.talentx.security.UserPrincipal) authentication.getPrincipal();
        deliverable.setUploadedBy(principal.getUserId());
        
        return ResponseEntity.ok(deliverableRepository.save(deliverable));
    }

    @PatchMapping("/{milestoneId}/deliverables/{deliverableId}/approve")
    @PreAuthorize("@securityService.isDeliverableEmployer(authentication, #deliverableId)")
    public ResponseEntity<Deliverable> approve(@PathVariable String milestoneId, @PathVariable String deliverableId) {
        Deliverable d = deliverableRepository.findById(deliverableId)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Deliverable not found"));
        d.setStatus("APPROVED");
        return ResponseEntity.ok(deliverableRepository.save(d));
    }

    @PatchMapping("/{milestoneId}/deliverables/{deliverableId}/revision")
    @PreAuthorize("@securityService.isDeliverableEmployer(authentication, #deliverableId)")
    public ResponseEntity<Deliverable> requestRevision(
            @PathVariable String milestoneId,
            @PathVariable String deliverableId,
            @RequestBody String feedback
    ) {
        Deliverable d = deliverableRepository.findById(deliverableId)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Deliverable not found"));
        d.setStatus("REVISION_REQUESTED");
        d.setFeedback(feedback);
        return ResponseEntity.ok(deliverableRepository.save(d));
    }
}
