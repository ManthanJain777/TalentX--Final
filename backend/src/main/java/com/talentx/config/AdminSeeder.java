package com.talentx.config;

import com.talentx.model.User;
import com.talentx.model.VerificationRequest;
import com.talentx.repository.UserRepository;
import com.talentx.repository.VerificationRequestRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.Instant;
import java.util.HashMap;
import java.util.Arrays;
import java.util.Map;
import com.talentx.repository.ChallengeRepository;
import com.talentx.repository.OpportunityRepository;
import com.talentx.repository.ProjectRepository;
import com.talentx.dao.MatchDao;
import com.talentx.model.Challenge;
import com.talentx.model.Opportunity;
import com.talentx.model.Match;
import com.talentx.model.Project;

@Configuration
public class AdminSeeder {

    @Bean
    public CommandLineRunner seedAdminUser(
            UserRepository userRepository, 
            PasswordEncoder passwordEncoder, 
            VerificationRequestRepository vReqRepo,
            ChallengeRepository challengeRepo,
            OpportunityRepository opportunityRepo,
            MatchDao matchDao,
            ProjectRepository projectRepo,
            com.talentx.repository.MilestoneRepository milestoneRepo,
            com.talentx.repository.DeliverableRepository deliverableRepo,
            com.talentx.repository.EscrowRepository escrowRepo,
            com.talentx.repository.MessageRepository messageRepo,
            com.talentx.repository.PassportRepository passportRepo
    ) {
        return args -> {
            String adminEmail = "admin@talentx.com";
            User admin = userRepository.findByEmail(adminEmail).orElseGet(User::new);
            
            admin.setEmail(adminEmail);
            admin.setPasswordHash(passwordEncoder.encode("admin123"));
            admin.setFullName("System Admin");
            admin.setRole("ADMIN");
            admin.setStatus("ACTIVE");
            admin.setVerified(true);
            admin.setDiscoverable(false);
            if (admin.getCreatedAt() == null) {
                admin.setCreatedAt(Instant.now());
            }
            admin.setUpdatedAt(Instant.now());
            
            userRepository.save(admin);
            System.out.println(">>> Admin user synchronized: email=" + adminEmail + ", password=admin123, role=ADMIN");
            
            // Seed a few demo VerificationRequests if none exist
            if (vReqRepo.count() == 0) {
                VerificationRequest v1 = new VerificationRequest();
                v1.setUserId("dummy-1");
                v1.setUserEmail("developer@example.com");
                v1.setUserFullName("Alice Dev");
                v1.setType("Skill");
                v1.setEvidence("GitHub Repositories provided");
                v1.setStatus("PENDING");
                v1.setCreatedAt(Instant.now().minusSeconds(86400));
                
                Map<String, Object> details1 = new HashMap<>();
                details1.put("githubRepos", Arrays.asList("react-dashboard", "spring-backend", "ml-model"));
                details1.put("prsMerged", 45);
                details1.put("stars", 120);
                v1.setDetails(details1);
                
                vReqRepo.save(v1);

                VerificationRequest v2 = new VerificationRequest();
                v2.setUserId("dummy-2");
                v2.setUserEmail("corp@company.com");
                v2.setUserFullName("TechCorp Inc");
                v2.setType("Identity");
                v2.setEvidence("Business Registration Certificate #990234");
                v2.setStatus("PENDING");
                v2.setCreatedAt(Instant.now().minusSeconds(3600));
                
                Map<String, Object> details2 = new HashMap<>();
                details2.put("documentType", "Certificate of Incorporation");
                v2.setDetails(details2);
                
                System.out.println(">>> Seeded 2 demo Verification Requests");
            }
            
            // Seed a Dummy Employer and Candidate if not exists
            User employer = userRepository.findByEmail("employer@talentx.com").orElse(null);
            if (employer == null) {
                employer = new User();
                employer.setEmail("employer@talentx.com");
                employer.setPasswordHash(passwordEncoder.encode("demo123"));
                employer.setFullName("Acme Corp");
                employer.setRole("EMPLOYER");
                employer.setStatus("ACTIVE");
                employer.setVerified(true);
                userRepository.save(employer);
                System.out.println(">>> Seeded Employer user: employer@talentx.com / demo123");
            }

            User candidate = userRepository.findByEmail("candidate@talentx.com").orElse(null);
            if (candidate == null) {
                candidate = new User();
                candidate.setEmail("candidate@talentx.com");
                candidate.setPasswordHash(passwordEncoder.encode("demo123"));
                candidate.setFullName("John Doe");
                candidate.setRole("CANDIDATE");
                candidate.setStatus("ACTIVE");
                candidate.setVerified(true);
                candidate.setDiscoverable(true);
                userRepository.save(candidate);
                System.out.println(">>> Seeded Candidate user: candidate@talentx.com / demo123");
            }

            // Seed Challenges
            if (challengeRepo.count() == 0) {
                Challenge c1 = new Challenge();
                c1.setEmployerId(employer.getId());
                c1.setTitle("Optimize React Render Pipeline");
                c1.setDescription("Need an expert to reduce render cycles in our data grid.");
                c1.setRequiredSkills(Arrays.asList("React", "Performance", "JavaScript"));
                c1.setPrizeAmount(50000);
                c1.setDeadline(Instant.now().plusSeconds(86400 * 7));
                c1.setStatus("OPEN");
                challengeRepo.save(c1);
                
                Challenge c2 = new Challenge();
                c2.setEmployerId(employer.getId());
                c2.setTitle("Migrate legacy API to Spring Boot 3");
                c2.setDescription("Migrate our endpoints and update security config.");
                c2.setRequiredSkills(Arrays.asList("Java", "Spring Boot", "Security"));
                c2.setPrizeAmount(120000);
                c2.setDeadline(Instant.now().plusSeconds(86400 * 14));
                c2.setStatus("COMPLETED");
                challengeRepo.save(c2);
                System.out.println(">>> Seeded Challenges");
            }

            // Seed Opportunities
            if (opportunityRepo.count() == 0) {
                Opportunity o1 = new Opportunity();
                o1.setEmployerId(employer.getId());
                o1.setTitle("Senior Frontend Engineer");
                o1.setDescription("Build the next generation dashboard.");
                o1.setExperienceLevel("SENIOR");
                o1.setLocation("Remote");
                o1.setRequiredSkills(Arrays.asList("React", "TypeScript", "Tailwind"));
                o1.setBudget(3000000.0);
                o1.setBudgetType("FIXED");
                o1.setStatus("OPEN");
                opportunityRepo.save(o1);

                // Create a Match for Candidate
                if (matchDao.findAll().size() == 0 && candidate != null) {
                    Match m1 = new Match();
                    m1.setOpportunityId(o1.getId());
                    m1.setCandidateId(candidate.getId());
                    m1.setEmployerId(employer.getId());
                    m1.setTotalScore(94.5);
                    m1.setStatus("PENDING");
                    m1.setCreatedAt(Instant.now());
                    
                    Match.SkillBreakdown breakdown = new Match.SkillBreakdown();
                    breakdown.setSkills(85.0);
                    breakdown.setProjects(90.0);
                    breakdown.setAssessments(80.0);
                    breakdown.setCertifications(75.0);
                    breakdown.setProfile(95.0);
                    m1.setSkillBreakdown(breakdown);
                    
                    m1.setExplanation("Candidate has verified React and TypeScript experience from GitHub, but lacks Tailwind CSS evidence.");
                    matchDao.save(m1);
                    System.out.println(">>> Seeded Match for Candidate");

                    if (projectRepo.count() == 0) {
                        Project p1 = new Project();
                        p1.setMatchId(m1.getId());
                        p1.setEmployerId(employer.getId());
                        p1.setFreelancerId(candidate.getId());
                        p1.setTitle("Senior Frontend Engineer Engagement");
                        p1.setDescription("Build the next generation dashboard.");
                        p1.setTotalBudget(3000000.0);
                        p1.setCurrency("INR");
                        p1.setStatus("ACTIVE");
                        p1.setHealthScore(92);
                        projectRepo.save(p1);
                        System.out.println(">>> Seeded Project for Candidate");
                        
                        // Seed Milestone
                        if (milestoneRepo.count() == 0) {
                            com.talentx.model.Milestone ms = new com.talentx.model.Milestone();
                            ms.setProjectId(p1.getId());
                            ms.setTitle("Core Architecture Setup");
                            ms.setDescription("Initialize Next.js frontend and Spring Boot backend repositories.");
                            ms.setMonetaryWeight(0.2); // 20%
                            ms.setDeadline(Instant.now().plusSeconds(86400 * 5));
                            ms.setStatus("IN_PROGRESS");
                            milestoneRepo.save(ms);
                        }

                        // Seed Deliverable
                        if (deliverableRepo.count() == 0) {
                            com.talentx.model.Deliverable d1 = new com.talentx.model.Deliverable();
                            d1.setProjectId(p1.getId());
                            d1.setFileName("schema-design.pdf");
                            d1.setFileUrl("https://github.com/talentx/schema-design");
                            d1.setStatus("SUBMITTED");
                            d1.setUploadedAt(Instant.now().minusSeconds(3600));
                            deliverableRepo.save(d1);
                        }

                        // Seed Escrow
                        if (escrowRepo.count() == 0) {
                            com.talentx.model.EscrowTransaction es = new com.talentx.model.EscrowTransaction();
                            es.setProjectId(p1.getId());
                            es.setPayerId(employer.getId());
                            es.setPayeeId(candidate.getId());
                            es.setAmount(1500000.0);
                            es.setStatus("HELD");
                            es.setCreatedAt(Instant.now().minusSeconds(86400));
                            escrowRepo.save(es);
                        }

                        // Seed Messages
                        if (messageRepo.count() == 0) {
                            com.talentx.model.Message msg1 = new com.talentx.model.Message();
                            msg1.setProjectId(p1.getId());
                            msg1.setSenderId(employer.getId());
                            msg1.setReceiverId(candidate.getId());
                            msg1.setContent("Hi John, looking forward to working with you. Are we on track for the first milestone?");
                            msg1.setRead(true);
                            msg1.setSentAt(Instant.now().minusSeconds(7200));
                            messageRepo.save(msg1);

                            com.talentx.model.Message msg2 = new com.talentx.model.Message();
                            msg2.setProjectId(p1.getId());
                            msg2.setSenderId(candidate.getId());
                            msg2.setReceiverId(employer.getId());
                            msg2.setContent("Absolutely! I have already pushed the initial architecture to the repository.");
                            msg2.setRead(false);
                            msg2.setSentAt(Instant.now().minusSeconds(3600));
                            messageRepo.save(msg2);
                        }
                        
                        // Seed Passport for Candidate if missing
                        if (passportRepo.findByUserId(candidate.getId()).isEmpty()) {
                            com.talentx.model.Passport pass = new com.talentx.model.Passport();
                            pass.setUserId(candidate.getId());
                            pass.setHeadline("Full-Stack React & Spring Boot Developer");
                            pass.setProfileCompleteness(95);
                            
                            com.talentx.model.Passport.Skill s1 = new com.talentx.model.Passport.Skill();
                            s1.setName("React"); s1.setVerified(true);
                            com.talentx.model.Passport.Skill s2 = new com.talentx.model.Passport.Skill();
                            s2.setName("Spring Boot"); s2.setVerified(true);
                            pass.setSkills(Arrays.asList(s1, s2));
                            
                            passportRepo.save(pass);
                            System.out.println(">>> Seeded Passport for Candidate");
                        }
                    }
                }
            }
        };
    }
}
