package com.talentx.controller;

import com.talentx.dto.request.CreateProjectRequest;
import com.talentx.model.Deliverable;
import com.talentx.model.EscrowTransaction;
import com.talentx.model.Project;
import com.talentx.repository.DeliverableRepository;
import com.talentx.repository.EscrowRepository;
import com.talentx.repository.MilestoneRepository;
import com.talentx.repository.ProjectRepository;
import com.talentx.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    private static final Set<String> VALID_STATUSES = Set.of("DRAFT", "ACTIVE", "PAUSED", "COMPLETED", "DISPUTED");

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
        var user = (com.talentx.security.UserPrincipal) authentication.getPrincipal();
        return ResponseEntity.ok(projectRepository.findByEmployerIdOrFreelancerId(user.getUserId(), user.getUserId()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProject(@PathVariable String id, Authentication authentication) {
        var user = (com.talentx.security.UserPrincipal) authentication.getPrincipal();
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Project not found"));
        String role = user.getAuthorities().iterator().next().getAuthority();
        if (!project.getEmployerId().equals(user.getUserId()) && !project.getFreelancerId().equals(user.getUserId())
                && !"ROLE_ADMIN".equals(role) && !"ADMIN".equals(role)) {
            throw new AccessDeniedException("You are not authorized to view this project");
        }
        return ResponseEntity.ok(project);
    }

    @PostMapping
    public ResponseEntity<Project> createProject(@Valid @RequestBody CreateProjectRequest request, Authentication authentication) {
        var user = (com.talentx.security.UserPrincipal) authentication.getPrincipal();
        return ResponseEntity.status(HttpStatus.CREATED).body(projectService.createProject(user.getUserId(), request));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Project> updateStatus(@PathVariable String id, @RequestParam String status, Authentication authentication) {
        if (status == null) throw new IllegalArgumentException("Status is required");
        status = status.trim().toUpperCase();
        if (!VALID_STATUSES.contains(status)) throw new IllegalArgumentException("Invalid project status: " + status);

        var user = (com.talentx.security.UserPrincipal) authentication.getPrincipal();
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Project not found"));
        String role = user.getAuthorities().iterator().next().getAuthority();
        boolean admin = "ROLE_ADMIN".equals(role) || "ADMIN".equals(role);
        boolean employer = user.getUserId().equals(project.getEmployerId());
        boolean freelancer = user.getUserId().equals(project.getFreelancerId());
        if (!employer && !freelancer && !admin) throw new AccessDeniedException("Not a project member");

        String current = project.getStatus() == null ? "DRAFT" : project.getStatus().toUpperCase();
        if (current.equals(status)) return ResponseEntity.ok(project);

        boolean allowed;
        if (admin) {
            allowed = true;
        } else if ("DRAFT".equals(current)) {
            allowed = employer && "ACTIVE".equals(status);
        } else if ("ACTIVE".equals(current)) {
            allowed = (employer && Set.of("PAUSED", "COMPLETED").contains(status))
                    || ((employer || freelancer) && "DISPUTED".equals(status));
        } else if ("PAUSED".equals(current)) {
            allowed = employer && Set.of("ACTIVE", "COMPLETED").contains(status);
        } else if ("DISPUTED".equals(current)) {
            allowed = admin || (employer && "COMPLETED".equals(status));
        } else {
            allowed = false;
        }
        if (!allowed) throw new AccessDeniedException("Invalid project status transition: " + current + " -> " + status);

        project.setStatus(status);
        return ResponseEntity.ok(projectRepository.save(project));
    }

    @GetMapping("/{id}/escrow")
    @PreAuthorize("@securityService.isProjectMember(authentication, #id)")
    public ResponseEntity<List<EscrowTransaction>> getProjectEscrow(@PathVariable String id) {
        return ResponseEntity.ok(escrowRepository.findByProjectId(id));
    }

    @GetMapping("/{id}/deliverables")
    @PreAuthorize("@securityService.isProjectMember(authentication, #id)")
    public ResponseEntity<List<Deliverable>> getProjectDeliverables(@PathVariable String id) {
        return ResponseEntity.ok(deliverableRepository.findByProjectId(id));
    }
}
