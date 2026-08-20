package com.talentx.controller;

import com.talentx.dto.request.CreateProjectRequest;
import com.talentx.model.Project;
import com.talentx.repository.ProjectRepository;
import com.talentx.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectRepository projectRepository;
    private final ProjectService projectService;

    public ProjectController(ProjectRepository projectRepository, ProjectService projectService) {
        this.projectRepository = projectRepository;
        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity<List<Project>> getMyProjects(Authentication authentication) {
        com.talentx.security.UserPrincipal user = (com.talentx.security.UserPrincipal) authentication.getPrincipal();
        List<Project> projects = projectRepository.findByEmployerIdOrFreelancerId(user.getUserId(), user.getUserId());
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProject(@PathVariable String id, Authentication authentication) {
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
    public ResponseEntity<Project> updateStatus(@PathVariable String id, @RequestParam String status, Authentication authentication) {
        com.talentx.security.UserPrincipal user = (com.talentx.security.UserPrincipal) authentication.getPrincipal();
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Project not found"));
        
        String role = user.getAuthorities().iterator().next().getAuthority();
        if (!project.getEmployerId().equals(user.getUserId()) && 
            !project.getFreelancerId().equals(user.getUserId()) &&
            !"ROLE_ADMIN".equals(role) && !"ADMIN".equals(role)) {
            throw new org.springframework.security.access.AccessDeniedException("You are not authorized to update this project");
        }
        
        project.setStatus(status);
        return ResponseEntity.ok(projectRepository.save(project));
    }
}
