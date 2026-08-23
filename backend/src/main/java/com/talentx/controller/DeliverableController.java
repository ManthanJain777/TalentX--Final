package com.talentx.controller;

import com.talentx.model.Deliverable;
import com.talentx.model.Milestone;
import com.talentx.repository.DeliverableRepository;
import com.talentx.repository.MilestoneRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/milestones")
public class DeliverableController {

    private final DeliverableRepository deliverableRepository;
    private final MilestoneRepository milestoneRepository;

    public DeliverableController(DeliverableRepository deliverableRepository,
                                 MilestoneRepository milestoneRepository) {
        this.deliverableRepository = deliverableRepository;
        this.milestoneRepository = milestoneRepository;
    }

    @GetMapping("/{milestoneId}/deliverables")
    @PreAuthorize("@securityService.isMilestoneMember(authentication, #milestoneId)")
    public ResponseEntity<List<Deliverable>> getDeliverables(@PathVariable String milestoneId) {
        return ResponseEntity.ok(deliverableRepository.findByMilestoneIdOrderByVersionDesc(milestoneId));
    }

    @PostMapping("/{milestoneId}/deliverables")
    @PreAuthorize("@securityService.isMilestoneFreelancer(authentication, #milestoneId)")
    public ResponseEntity<Deliverable> uploadDeliverable(@PathVariable String milestoneId,
                                                         @RequestBody Deliverable deliverable,
                                                         Authentication authentication) {
        Milestone milestone = milestoneRepository.findById(milestoneId)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Milestone not found"));

        List<Deliverable> existing = deliverableRepository.findByMilestoneIdOrderByVersionDesc(milestoneId);
        int nextVersion = existing.isEmpty() ? 1 : existing.get(0).getVersion() + 1;

        // Derive relationship/security fields from the server-side resource graph.
        // The client cannot move a deliverable into another project by changing projectId.
        deliverable.setId(null);
        deliverable.setMilestoneId(milestoneId);
        deliverable.setProjectId(milestone.getProjectId());
        deliverable.setVersion(nextVersion);
        deliverable.setStatus("SUBMITTED");
        deliverable.setFeedback(null);

        com.talentx.security.UserPrincipal principal =
                (com.talentx.security.UserPrincipal) authentication.getPrincipal();
        deliverable.setUploadedBy(principal.getUserId());
        deliverable.setUploadedAt(Instant.now());

        return ResponseEntity.ok(deliverableRepository.save(deliverable));
    }

    @PatchMapping("/{milestoneId}/deliverables/{deliverableId}/approve")
    @PreAuthorize("@securityService.isDeliverableEmployer(authentication, #deliverableId)")
    public ResponseEntity<Deliverable> approve(@PathVariable String milestoneId,
                                                @PathVariable String deliverableId) {
        Deliverable d = getDeliverableForMilestone(milestoneId, deliverableId);
        if (!"SUBMITTED".equals(d.getStatus()) && !"REVISION_REQUESTED".equals(d.getStatus())) {
            throw new IllegalStateException("Only submitted deliverables can be approved");
        }
        d.setStatus("APPROVED");
        return ResponseEntity.ok(deliverableRepository.save(d));
    }

    @PatchMapping("/{milestoneId}/deliverables/{deliverableId}/revision")
    @PreAuthorize("@securityService.isDeliverableEmployer(authentication, #deliverableId)")
    public ResponseEntity<Deliverable> requestRevision(
            @PathVariable String milestoneId,
            @PathVariable String deliverableId,
            @RequestBody String feedback) {
        Deliverable d = getDeliverableForMilestone(milestoneId, deliverableId);
        if (!"SUBMITTED".equals(d.getStatus())) {
            throw new IllegalStateException("Only submitted deliverables can be sent for revision");
        }
        d.setStatus("REVISION_REQUESTED");
        d.setFeedback(feedback);
        return ResponseEntity.ok(deliverableRepository.save(d));
    }

    private Deliverable getDeliverableForMilestone(String milestoneId, String deliverableId) {
        Deliverable deliverable = deliverableRepository.findById(deliverableId)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Deliverable not found"));
        if (!milestoneId.equals(deliverable.getMilestoneId())) {
            throw new org.springframework.security.access.AccessDeniedException("Deliverable does not belong to this milestone");
        }
        return deliverable;
    }
}
