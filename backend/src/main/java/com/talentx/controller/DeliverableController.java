package com.talentx.controller;

import com.talentx.model.Deliverable;
import com.talentx.model.Milestone;
import com.talentx.model.Project;
import com.talentx.repository.DeliverableRepository;
import com.talentx.repository.MilestoneRepository;
import com.talentx.repository.ProjectRepository;
import com.talentx.security.UserPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/milestones")
public class DeliverableController {
    private final DeliverableRepository deliverableRepository;
    private final MilestoneRepository milestoneRepository;
    private final ProjectRepository projectRepository;

    public DeliverableController(DeliverableRepository deliverableRepository,
                                  MilestoneRepository milestoneRepository,
                                  ProjectRepository projectRepository) {
        this.deliverableRepository = deliverableRepository;
        this.milestoneRepository = milestoneRepository;
        this.projectRepository = projectRepository;
    }

    @GetMapping("/{milestoneId}/deliverables")
    @PreAuthorize("@securityService.isMilestoneMember(authentication, #milestoneId)")
    public ResponseEntity<List<Deliverable>> getDeliverables(@PathVariable String milestoneId) {
        return ResponseEntity.ok(deliverableRepository.findByMilestoneIdOrderByVersionDesc(milestoneId));
    }

    @PostMapping("/{milestoneId}/deliverables")
    @PreAuthorize("@securityService.isMilestoneFreelancer(authentication, #milestoneId)")
    public ResponseEntity<Deliverable> uploadDeliverable(@PathVariable String milestoneId,
                                                          @RequestBody Deliverable incoming,
                                                          Authentication authentication) {
        Milestone milestone = milestoneRepository.findById(milestoneId)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Milestone not found"));
        Project project = projectRepository.findById(milestone.getProjectId())
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Project not found"));

        List<Deliverable> existing = deliverableRepository.findByMilestoneIdOrderByVersionDesc(milestoneId);
        int nextVersion = existing.isEmpty() ? 1 : existing.get(0).getVersion() + 1;
        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();

        Deliverable deliverable = new Deliverable();
        deliverable.setMilestoneId(milestoneId);
        deliverable.setProjectId(project.getId());
        deliverable.setUploadedBy(principal.getUserId());
        deliverable.setFileName(incoming.getFileName());
        deliverable.setFileUrl(incoming.getFileUrl());
        deliverable.setFileSize(incoming.getFileSize());
        deliverable.setContentType(incoming.getContentType());
        deliverable.setVersion(nextVersion);
        deliverable.setStatus("SUBMITTED");

        return ResponseEntity.ok(deliverableRepository.save(deliverable));
    }

    @PatchMapping("/{milestoneId}/deliverables/{deliverableId}/approve")
    @PreAuthorize("@securityService.isDeliverableEmployer(authentication, #deliverableId)")
    public ResponseEntity<Deliverable> approve(@PathVariable String milestoneId, @PathVariable String deliverableId) {
        Deliverable d = findDeliverableForMilestone(milestoneId, deliverableId);
        d.setStatus("APPROVED");
        return ResponseEntity.ok(deliverableRepository.save(d));
    }

    @PatchMapping("/{milestoneId}/deliverables/{deliverableId}/revision")
    @PreAuthorize("@securityService.isDeliverableEmployer(authentication, #deliverableId)")
    public ResponseEntity<Deliverable> requestRevision(@PathVariable String milestoneId,
                                                        @PathVariable String deliverableId,
                                                        @RequestBody String feedback) {
        Deliverable d = findDeliverableForMilestone(milestoneId, deliverableId);
        d.setStatus("REVISION_REQUESTED");
        d.setFeedback(feedback);
        return ResponseEntity.ok(deliverableRepository.save(d));
    }

    private Deliverable findDeliverableForMilestone(String milestoneId, String deliverableId) {
        Deliverable d = deliverableRepository.findById(deliverableId)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Deliverable not found"));
        if (!milestoneId.equals(d.getMilestoneId())) {
            throw new org.springframework.security.access.AccessDeniedException("Deliverable does not belong to this milestone");
        }
        return d;
    }
}
