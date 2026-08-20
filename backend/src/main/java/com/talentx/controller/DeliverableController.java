package com.talentx.controller;

import com.talentx.model.Deliverable;
import com.talentx.repository.DeliverableRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/milestones/{milestoneId}/deliverables")
public class DeliverableController {

    private final DeliverableRepository deliverableRepository;

    public DeliverableController(DeliverableRepository deliverableRepository) {
        this.deliverableRepository = deliverableRepository;
    }

    @GetMapping
    public ResponseEntity<List<Deliverable>> getDeliverables(@PathVariable String milestoneId) {
        return ResponseEntity.ok(deliverableRepository.findByMilestoneIdOrderByVersionDesc(milestoneId));
    }

    @PostMapping
    public ResponseEntity<Deliverable> uploadDeliverable(@PathVariable String milestoneId, @RequestBody Deliverable deliverable) {
        List<Deliverable> existing = deliverableRepository.findByMilestoneIdOrderByVersionDesc(milestoneId);
        int nextVersion = existing.isEmpty() ? 1 : existing.get(0).getVersion() + 1;

        deliverable.setMilestoneId(milestoneId);
        deliverable.setVersion(nextVersion);
        deliverable.setStatus("SUBMITTED");
        return ResponseEntity.ok(deliverableRepository.save(deliverable));
    }

    @PatchMapping("/{deliverableId}/approve")
    public ResponseEntity<Deliverable> approve(@PathVariable String milestoneId, @PathVariable String deliverableId) {
        Deliverable d = deliverableRepository.findById(deliverableId)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Deliverable not found"));
        d.setStatus("APPROVED");
        return ResponseEntity.ok(deliverableRepository.save(d));
    }

    @PatchMapping("/{deliverableId}/revision")
    public ResponseEntity<Deliverable> requestRevision(
            @PathVariable String milestoneId,
            @PathVariable String deliverableId,
            @RequestParam String feedback
    ) {
        Deliverable d = deliverableRepository.findById(deliverableId)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Deliverable not found"));
        d.setStatus("REVISION_REQUESTED");
        d.setFeedback(feedback);
        return ResponseEntity.ok(deliverableRepository.save(d));
    }
}
