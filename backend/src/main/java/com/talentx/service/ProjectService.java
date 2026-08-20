package com.talentx.service;

import com.talentx.dto.request.CreateProjectRequest;
import com.talentx.dao.ProjectDao;
import com.talentx.model.Match;
import com.talentx.model.Project;
import com.talentx.model.User;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class ProjectService {

    private final ProjectDao projectDao;

    public ProjectService(ProjectDao projectDao) {
        this.projectDao = projectDao;
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
        return projectDao.save(project);
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
}
