package com.talentx.controller;

import com.talentx.model.Milestone;
import com.talentx.repository.MilestoneRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/projects/{projectId}/milestones")
public class MilestoneController {

    private final MilestoneRepository milestoneRepository;

    public MilestoneController(MilestoneRepository milestoneRepository) {
        this.milestoneRepository = milestoneRepository;
    }

    @GetMapping
    @PreAuthorize("@securityService.isProjectMember(authentication, #projectId)")
    public ResponseEntity<List<Milestone>> getMilestones(@PathVariable("projectId") String projectId) {
        return ResponseEntity.ok(milestoneRepository.findByProjectIdOrderByOrderAsc(projectId));
    }

    @PostMapping
    @PreAuthorize("@securityService.isProjectEmployer(authentication, #projectId)")
    public ResponseEntity<Milestone> createMilestone(@PathVariable("projectId") String projectId, @RequestBody Milestone milestone) {
        milestone.setProjectId(projectId);
        milestone.setCompleted(false);
        milestone.setStatus("PENDING");
        return ResponseEntity.ok(milestoneRepository.save(milestone));
    }

    @PatchMapping("/{milestoneId}/complete")
    @PreAuthorize("@securityService.isMilestoneEmployer(authentication, #milestoneId)")
    public ResponseEntity<Milestone> completeMilestone(@PathVariable("projectId") String projectId, @PathVariable("milestoneId") String milestoneId) {
        Milestone milestone = milestoneRepository.findById(milestoneId)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Milestone not found"));
        milestone.setCompleted(true);
        milestone.setCompletedAt(Instant.now());
        milestone.setStatus("APPROVED");
        return ResponseEntity.ok(milestoneRepository.save(milestone));
    }
}
