package com.talentx.controller;

import com.talentx.dto.request.CreateProjectRequest;
import com.talentx.model.Project;
import com.talentx.repository.ProjectRepository;
import com.talentx.repository.MilestoneRepository;
import com.talentx.repository.EscrowRepository;
import com.talentx.repository.DeliverableRepository;
import com.talentx.model.Milestone;
import com.talentx.model.EscrowTransaction;
import com.talentx.model.Deliverable;
import com.talentx.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.access.prepost.PreAuthorize;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectRepository projectRepository;
    private final ProjectService projectService;
    private final MilestoneRepository milestoneRepository;
    private final EscrowRepository escrowRepository;
    private final DeliverableRepository deliverableRepository;

    public ProjectController(ProjectRepository projectRepository, ProjectService projectService,
                             MilestoneRepository milestoneRepository, EscrowRepository escrowRepository,
                             DeliverableRepository deliverableRepository) {
        this.projectRepository = projectRepository;
        this.projectService = projectService;
        this.milestoneRepository = milestoneRepository;
        this.escrowRepository = escrowRepository;
        this.deliverableRepository = deliverableRepository;
    }

    @GetMapping
    public ResponseEntity<List<Project>> getMyProjects(Authentication authentication) {
        com.talentx.security.UserPrincipal user = (com.talentx.security.UserPrincipal) authentication.getPrincipal();
        List<Project> projects = projectRepository.findByEmployerIdOrFreelancerId(user.getUserId(), user.getUserId());
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProject(@PathVariable("id") String id, Authentication authentication) {
        com.talentx.security.UserPrincipal user = (com.talentx.security.UserPrincipal) authentication.getPrincipal();
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Project not found"));
        
        String role = user.getAuthorities().iterator().next().getAuthority();
        if (!project.getEmployerId().equals(user.getUserId()) && 
            !project.getFreelancerId().equals(user.getUserId()) &&
            !"ROLE_ADMIN".equals(role) && !"ADMIN".equals(role)) {
            throw new org.springframework.security.access.AccessDeniedException("You are not authorized to view this project");
        }
        
        return ResponseEntity.ok(project);
    }

    @PostMapping
    public ResponseEntity<Project> createProject(@Valid @RequestBody CreateProjectRequest request, Authentication authentication) {
        com.talentx.security.UserPrincipal user = (com.talentx.security.UserPrincipal) authentication.getPrincipal();
        Project project = projectService.createProject(user.getUserId(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(project);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Project> updateStatus(@PathVariable("id") String id, @RequestParam String status, Authentication authentication) {
        com.talentx.security.UserPrincipal user = (com.talentx.security.UserPrincipal) authentication.getPrincipal();
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Project not found"));
        
        String role = user.getAuthorities().iterator().next().getAuthority();
        boolean isAdmin = "ROLE_ADMIN".equals(role) || "ADMIN".equals(role);
        boolean isEmployer = project.getEmployerId() != null && project.getEmployerId().equals(user.getUserId());
        boolean isFreelancer = project.getFreelancerId() != null && project.getFreelancerId().equals(user.getUserId());

        if (!isEmployer && !isFreelancer && !isAdmin) {
            throw new org.springframework.security.access.AccessDeniedException("You are not authorized to update this project");
        }

        // State Machine Integrity
        if ("COMPLETED".equals(status) || "PAUSED".equals(status) || "ACTIVE".equals(status)) {
            if (!isEmployer && !isAdmin) {
                throw new org.springframework.security.access.AccessDeniedException("Only the employer can transition to " + status);
            }
        } else if ("DISPUTED".equals(status)) {
            if (!isEmployer && !isFreelancer && !isAdmin) {
                throw new org.springframework.security.access.AccessDeniedException("Only project members can open a dispute");
            }
        } else if ("DRAFT".equals(status)) {
             throw new IllegalArgumentException("Cannot revert project to DRAFT status");
        }
        
        project.setStatus(status);
        return ResponseEntity.ok(projectRepository.save(project));
    }



    @GetMapping("/{id}/escrow")
    @PreAuthorize("@securityService.isProjectMember(authentication, #id)")
    public ResponseEntity<List<EscrowTransaction>> getProjectEscrow(@PathVariable("id") String id) {
        return ResponseEntity.ok(escrowRepository.findByProjectId(id));
    }

    @GetMapping("/{id}/deliverables")
    @PreAuthorize("@securityService.isProjectMember(authentication, #id)")
    public ResponseEntity<List<Deliverable>> getProjectDeliverables(@PathVariable("id") String id) {
        return ResponseEntity.ok(deliverableRepository.findByProjectId(id));
    }
}
