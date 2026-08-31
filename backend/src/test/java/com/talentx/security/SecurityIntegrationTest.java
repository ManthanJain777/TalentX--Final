package com.talentx.security;

import com.talentx.model.Project;
import com.talentx.repository.ProjectRepository;
import com.talentx.service.ProjectService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.access.AccessDeniedException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class SecurityIntegrationTest {

    @InjectMocks
    private ProjectService projectService;

    @Mock
    private ProjectRepository projectRepository;

    @BeforeEach
    void setUp() {
    }

    @Test
    void testProjectStateMachine_ValidTransitions() {
        Project project = new Project();
        project.setId("p1");
        project.setEmployerId("emp1");
        project.setFreelancerId("free1");
        project.setStatus("DRAFT");
        
        when(projectRepository.findById("p1")).thenReturn(Optional.of(project));
        when(projectRepository.save(any())).thenAnswer(i -> i.getArguments()[0]);

        // Draft -> Active by Employer
        Project active = projectService.transitionProjectState("p1", "ACTIVE", "emp1", false);
        assertEquals("ACTIVE", active.getStatus());

        // Active -> Paused by Employer
        Project paused = projectService.transitionProjectState("p1", "PAUSED", "emp1", false);
        assertEquals("PAUSED", paused.getStatus());
    }

    @Test
    void testProjectStateMachine_InvalidTransitions() {
        Project project = new Project();
        project.setId("p1");
        project.setEmployerId("emp1");
        project.setFreelancerId("free1");
        project.setStatus("DRAFT");

        when(projectRepository.findById("p1")).thenReturn(Optional.of(project));

        // Draft -> Completed (Should Fail)
        assertThrows(IllegalArgumentException.class, () -> 
            projectService.transitionProjectState("p1", "COMPLETED", "emp1", false)
        );

        // Change mock state to test revert
        project.setStatus("ACTIVE");
        
        // Revert to Draft (Should Fail)
        assertThrows(IllegalArgumentException.class, () -> 
            projectService.transitionProjectState("p1", "DRAFT", "emp1", false)
        );
    }

    @Test
    void testProjectStateMachine_IDOR() {
        Project project = new Project();
        project.setId("p1");
        project.setEmployerId("emp1");
        project.setFreelancerId("free1");
        project.setStatus("DRAFT");

        when(projectRepository.findById("p1")).thenReturn(Optional.of(project));

        // Malicious user tries to activate
        assertThrows(AccessDeniedException.class, () -> 
            projectService.transitionProjectState("p1", "ACTIVE", "malicious_user", false)
        );
    }
}
