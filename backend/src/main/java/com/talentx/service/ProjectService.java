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

    public ProjectService(ProjectDao projectDao, MilestoneRepository milestoneRepository) {
        this.projectDao = projectDao;
        this.milestoneRepository = milestoneRepository;
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
}
