package com.talentx.controller;

import com.talentx.dto.request.CreateProjectRequest;
import com.talentx.model.Deliverable;
import com.talentx.model.EscrowTransaction;
import com.talentx.model.Project;
import com.talentx.model.ProjectStatus;
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
            throw new AccessDeniedException("You are not authorized to view this project");
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
    public ResponseEntity<Project> updateStatus(@PathVariable("id") String id,
                                                @RequestParam String status,
                                                Authentication authentication) {
        com.talentx.security.UserPrincipal user = (com.talentx.security.UserPrincipal) authentication.getPrincipal();
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Project not found"));

        String role = user.getAuthorities().iterator().next().getAuthority();
        boolean isAdmin = "ROLE_ADMIN".equals(role) || "ADMIN".equals(role);
        boolean isEmployer = user.getUserId().equals(project.getEmployerId());
        boolean isFreelancer = user.getUserId().equals(project.getFreelancerId());

        if (!isEmployer && !isFreelancer && !isAdmin) {
            throw new AccessDeniedException("You are not authorized to update this project");
        }

        ProjectStatus current = ProjectStatus.parse(project.getStatus());
        ProjectStatus target = ProjectStatus.parse(status);

        if (!current.canTransitionTo(target)) {
            throw new IllegalStateException(
                    "Invalid project status transition: " + current + " -> " + target
            );
        }

        // Only the employer/admin can control normal lifecycle transitions.
        // Either project member can open a dispute; this is still constrained by
        // the state machine above so a completed project cannot be reopened by mistake.
        if (target == ProjectStatus.DISPUTED) {
            if (!isEmployer && !isFreelancer && !isAdmin) {
                throw new AccessDeniedException("Only project members can open a dispute");
            }
        } else if (!isEmployer && !isAdmin) {
            throw new AccessDeniedException("Only the employer can perform this project transition");
        }

        project.setStatus(target.name());
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
