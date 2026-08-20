package com.talentx.controller;

import com.talentx.model.Milestone;
import com.talentx.repository.MilestoneRepository;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<Milestone>> getMilestones(@PathVariable String projectId) {
        return ResponseEntity.ok(milestoneRepository.findByProjectIdOrderByOrderAsc(projectId));
    }

    @PostMapping
    public ResponseEntity<Milestone> createMilestone(@PathVariable String projectId, @RequestBody Milestone milestone) {
        milestone.setProjectId(projectId);
        milestone.setCompleted(false);
        milestone.setStatus("PENDING");
        return ResponseEntity.ok(milestoneRepository.save(milestone));
    }

    @PatchMapping("/{milestoneId}/complete")
    public ResponseEntity<Milestone> completeMilestone(@PathVariable String projectId, @PathVariable String milestoneId) {
        Milestone milestone = milestoneRepository.findById(milestoneId)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Milestone not found"));
        milestone.setCompleted(true);
        milestone.setCompletedAt(Instant.now());
        milestone.setStatus("APPROVED");
        return ResponseEntity.ok(milestoneRepository.save(milestone));
    }
}
