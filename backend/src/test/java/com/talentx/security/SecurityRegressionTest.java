package com.talentx.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.talentx.model.*;
import com.talentx.repository.*;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

@SpringBootTest(properties = "de.flapdoodle.mongodb.embedded.version=6.0.5")
@AutoConfigureMockMvc
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class SecurityRegressionTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private MilestoneRepository milestoneRepository;

    @Autowired
    private PassportRepository passportRepository;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private String projectB_Id;
    private String milestoneB_Id;
    private String passportA_Id;
    private String passportB_Id;

    @BeforeAll
    public void setup() {
        userRepository.deleteAll();
        projectRepository.deleteAll();
        milestoneRepository.deleteAll();
        passportRepository.deleteAll();
        messageRepository.deleteAll();

        // Users
        User candA = new User();
        candA.setEmail("candA@test.com");
        candA.setPasswordHash("password");
        candA.setRole("CANDIDATE");
        candA.setFullName("Candidate A");
        candA = userRepository.save(candA);

        User candB = new User();
        candB.setEmail("candB@test.com");
        candB.setPasswordHash("password");
        candB.setRole("CANDIDATE");
        candB.setFullName("Candidate B");
        candB = userRepository.save(candB);

        User empA = new User();
        empA.setEmail("empA@test.com");
        empA.setPasswordHash("password");
        empA.setRole("EMPLOYER");
        empA.setFullName("Employer A");
        empA = userRepository.save(empA);

        User empB = new User();
        empB.setEmail("empB@test.com");
        empB.setPasswordHash("password");
        empB.setRole("EMPLOYER");
        empB.setFullName("Employer B");
        empB = userRepository.save(empB);

        // Projects
        Project projA = new Project();
        projA.setFreelancerId(candA.getId());
        projA.setEmployerId(empA.getId());
        projectRepository.save(projA);

        Project projB = new Project();
        projB.setFreelancerId(candB.getId());
        projB.setEmployerId(empB.getId());
        projB = projectRepository.save(projB);
        projectB_Id = projB.getId();

        // Milestones
        Milestone mB = new Milestone();
        mB.setProjectId(projectB_Id);
        mB = milestoneRepository.save(mB);
        milestoneB_Id = mB.getId();

        // Passports
        Passport passA = new Passport();
        passA.setUserId(candA.getId());
        Passport.Privacy privA = new Passport.Privacy();
        privA.setPublic(false);
        passA.setPrivacy(privA);
        passA.setVisibility(false);
        passA = passportRepository.save(passA);
        passportA_Id = passA.getId();

        Passport passB = new Passport();
        passB.setUserId(candB.getId());
        Passport.Privacy privB = new Passport.Privacy();
        privB.setPublic(true);
        passB.setPrivacy(privB);
        passB.setVisibility(true);
        passB = passportRepository.save(passB);
        passportB_Id = passB.getId();
    }

    // --- IDOR TESTS ---
    @Test
    @WithUserDetails("candA@test.com")
    public void testCandidateACannotAccessProjectB() throws Exception {
        mockMvc.perform(get("/api/projects/" + projectB_Id))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithUserDetails("candA@test.com")
    public void testCandidateACannotAccessMilestoneB() throws Exception {
        mockMvc.perform(get("/api/projects/" + projectB_Id + "/milestones"))
                .andExpect(status().isForbidden());
        
        mockMvc.perform(patch("/api/projects/" + projectB_Id + "/milestones/" + milestoneB_Id + "/complete").with(csrf()))
                .andExpect(status().isForbidden());
    }

    // --- MASS ASSIGNMENT TESTS ---
    @Test
    @WithUserDetails("candA@test.com")
    public void testMessageSenderIdCannotBeSpoofed() throws Exception {
        Message fakeMsg = new Message();
        fakeMsg.setProjectId(projectB_Id);
        fakeMsg.setSenderId("hacked-id");
        fakeMsg.setContent("Hello");

        mockMvc.perform(post("/api/messages").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(fakeMsg)))
                .andExpect(status().isForbidden());
        
        Project projA = projectRepository.findAll().stream()
                .filter(p -> p.getFreelancerId().equals(userRepository.findByEmail("candA@test.com").get().getId()))
                .findFirst().get();

        Message msg2 = new Message();
        msg2.setProjectId(projA.getId());
        msg2.setSenderId("hacked-id");
        msg2.setContent("Real Message");

        mockMvc.perform(post("/api/messages").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(msg2)))
                .andExpect(status().isOk());

        List<Message> allMessages = messageRepository.findByProjectIdOrderBySentAtAsc(projA.getId());
        assertEquals(1, allMessages.size());
        assertNotEquals("hacked-id", allMessages.get(0).getSenderId());
        assertEquals(userRepository.findByEmail("candA@test.com").get().getId(), allMessages.get(0).getSenderId());
    }

    // --- PASSPORT PRIVACY TESTS ---
    @Test
    public void testUnauthenticatedCanViewPublicPassport() throws Exception {
        mockMvc.perform(get("/api/passports/" + userRepository.findByEmail("candB@test.com").get().getId()))
                .andExpect(status().isOk());
    }

    @Test
    public void testUnauthenticatedCannotViewPrivatePassport() throws Exception {
        mockMvc.perform(get("/api/passports/" + userRepository.findByEmail("candA@test.com").get().getId()))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithUserDetails("empA@test.com")
    public void testEmployerCannotViewPrivatePassport() throws Exception {
        mockMvc.perform(get("/api/passports/" + userRepository.findByEmail("candA@test.com").get().getId()))
                .andExpect(status().isForbidden());
    }
}
