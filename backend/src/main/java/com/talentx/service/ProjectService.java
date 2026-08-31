package com.talentx.service;

import com.talentx.dto.request.CreateProjectRequest;
import com.talentx.dao.ProjectDao;
import com.talentx.model.Match;
import com.talentx.model.Project;
import com.talentx.model.User;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import com.talentx.repository.MilestoneRepository;
import com.talentx.model.Milestone;

@Service
public class ProjectService {

    private final ProjectDao projectDao;
    private final MilestoneRepository milestoneRepository;
    private final com.talentx.repository.ProjectRepository projectRepository;

    public ProjectService(ProjectDao projectDao, MilestoneRepository milestoneRepository, com.talentx.repository.ProjectRepository projectRepository) {
        this.projectDao = projectDao;
        this.milestoneRepository = milestoneRepository;
        this.projectRepository = projectRepository;
    }

    public Project createProject(String employerId, CreateProjectRequest request) {
        Project project = Project.builder()
                .employerId(employerId)
                .title(request.getTitle())
                .description(request.getDescription())
                .totalBudget(request.getBudget())
                .currency("INR")
                .status("ACTIVE")
                .healthScore(100)
                .createdAt(Instant.now())
                .build();
        Project savedProject = projectDao.save(project);
        
        if (request.getMilestones() != null && !request.getMilestones().isEmpty()) {
            int order = 1;
            for (CreateProjectRequest.MilestoneRequest mr : request.getMilestones()) {
                Milestone m = new Milestone();
                m.setProjectId(savedProject.getId());
                m.setTitle(mr.getTitle());
                m.setOrder(order++);
                m.setStatus("PENDING");
                
                // Parse amount properly if needed, fallback to basic conversion
                double amount = 0;
                try {
                    String clean = mr.getAmount().replaceAll("[^0-9.]", "");
                    amount = Double.parseDouble(clean);
                    if (mr.getAmount().contains("L") || mr.getAmount().contains("Cr")) {
                        amount *= 100000;
                    }
                } catch (Exception e) {}
                
                m.setMonetaryWeight(amount > 0 ? (amount / savedProject.getTotalBudget()) : 0);
                milestoneRepository.save(m);
            }
        }
        
        return savedProject;
    }

    public Project createProjectFromMatch(Match match) {
        Project project = Project.builder()
                .matchId(match.getId())
                .employerId(match.getEmployerId())
                .freelancerId(match.getCandidateId())
                .title("Project for Match " + match.getId())
                .description("Governed workspace auto-generated from accepted match.")
                .totalBudget(0) // Should be updated in escrow phase
                .currency("INR")
                .status("ACTIVE")
                .healthScore(100)
                .createdAt(Instant.now())
                .build();
        return projectDao.save(project);
    }

    public Project transitionProjectState(String projectId, String targetState, String userId, boolean isAdmin) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found"));
                
        boolean isEmployer = project.getEmployerId() != null && project.getEmployerId().equals(userId);
        boolean isFreelancer = project.getFreelancerId() != null && project.getFreelancerId().equals(userId);

        if (!isEmployer && !isFreelancer && !isAdmin) {
            throw new org.springframework.security.access.AccessDeniedException("Not authorized to modify this project");
        }

        String currentState = project.getStatus();
        if (currentState == null) currentState = "DRAFT";

        // DAG Rules
        if ("DRAFT".equals(targetState)) {
            throw new IllegalArgumentException("Cannot revert project to DRAFT status");
        }

        switch (targetState) {
            case "ACTIVE":
                if (!isAdmin && !isEmployer) throw new org.springframework.security.access.AccessDeniedException("Only employer can activate");
                if (!"DRAFT".equals(currentState) && !"PAUSED".equals(currentState)) {
                    throw new IllegalArgumentException("Can only transition to ACTIVE from DRAFT or PAUSED");
                }
                break;
            case "PAUSED":
                if (!isAdmin && !isEmployer) throw new org.springframework.security.access.AccessDeniedException("Only employer can pause");
                if (!"ACTIVE".equals(currentState)) {
                    throw new IllegalArgumentException("Can only transition to PAUSED from ACTIVE");
                }
                break;
            case "COMPLETED":
                if (!isAdmin && !isEmployer) throw new org.springframework.security.access.AccessDeniedException("Only employer can complete");
                if (!"ACTIVE".equals(currentState)) {
                    throw new IllegalArgumentException("Can only transition to COMPLETED from ACTIVE");
                }
                break;
            case "DISPUTED":
                // Anyone involved can dispute an active or paused project
                if (!"ACTIVE".equals(currentState) && !"PAUSED".equals(currentState)) {
                    throw new IllegalArgumentException("Can only transition to DISPUTED from ACTIVE or PAUSED");
                }
                break;
            default:
                throw new IllegalArgumentException("Unknown state: " + targetState);
        }

        project.setStatus(targetState);
        return projectRepository.save(project);
    }
}
