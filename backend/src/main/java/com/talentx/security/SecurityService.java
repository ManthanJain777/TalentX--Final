package com.talentx.security;

import com.talentx.model.*;
import com.talentx.repository.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("securityService")
public class SecurityService {

    private final ProjectRepository projectRepository;
    private final MilestoneRepository milestoneRepository;
    private final DeliverableRepository deliverableRepository;
    private final DisputeRepository disputeRepository;
    private final EscrowRepository escrowRepository;
    private final com.talentx.dao.MatchDao matchDao;
    private final OpportunityRepository opportunityRepository;
    private final PassportRepository passportRepository;
    private final ChallengeRepository challengeRepository;
    private final SubmissionRepository submissionRepository;

    public SecurityService(ProjectRepository projectRepository,
                           MilestoneRepository milestoneRepository,
                           DeliverableRepository deliverableRepository,
                           DisputeRepository disputeRepository,
                           EscrowRepository escrowRepository,
                           com.talentx.dao.MatchDao matchDao,
                           OpportunityRepository opportunityRepository,
                           PassportRepository passportRepository,
                           ChallengeRepository challengeRepository,
                           SubmissionRepository submissionRepository) {
        this.projectRepository = projectRepository;
        this.milestoneRepository = milestoneRepository;
        this.deliverableRepository = deliverableRepository;
        this.disputeRepository = disputeRepository;
        this.escrowRepository = escrowRepository;
        this.matchDao = matchDao;
        this.opportunityRepository = opportunityRepository;
        this.passportRepository = passportRepository;
        this.challengeRepository = challengeRepository;
        this.submissionRepository = submissionRepository;
    }

    private String getUserId(Authentication auth) {
        if (auth == null || !auth.isAuthenticated() || !(auth.getPrincipal() instanceof UserPrincipal)) {
            return null;
        }
        return ((UserPrincipal) auth.getPrincipal()).getUserId();
    }

    public boolean isProjectMember(Authentication auth, String projectId) {
        String userId = getUserId(auth);
        if (userId == null || projectId == null) return false;

        Optional<Project> opt = projectRepository.findById(projectId);
        if (opt.isEmpty()) return false;
        Project p = opt.get();
        return userId.equals(p.getEmployerId()) || userId.equals(p.getFreelancerId());
    }

    public boolean isProjectEmployer(Authentication auth, String projectId) {
        String userId = getUserId(auth);
        if (userId == null || projectId == null) return false;

        Optional<Project> opt = projectRepository.findById(projectId);
        if (opt.isEmpty()) return false;
        return userId.equals(opt.get().getEmployerId());
    }

    /** Ensures a message recipient is one of the two participants in the project. */
    public boolean canMessageProjectMember(Authentication auth, String projectId, String receiverId) {
        String senderId = getUserId(auth);
        if (senderId == null || projectId == null || receiverId == null) return false;
        Optional<Project> opt = projectRepository.findById(projectId);
        if (opt.isEmpty()) return false;
        Project project = opt.get();
        boolean senderIsMember = senderId.equals(project.getEmployerId()) || senderId.equals(project.getFreelancerId());
        boolean receiverIsMember = receiverId.equals(project.getEmployerId()) || receiverId.equals(project.getFreelancerId());
        return senderIsMember && receiverIsMember && !senderId.equals(receiverId);
    }

    public boolean isMilestoneMember(Authentication auth, String milestoneId) {
        String userId = getUserId(auth);
        if (userId == null || milestoneId == null) return false;

        Optional<Milestone> opt = milestoneRepository.findById(milestoneId);
        if (opt.isEmpty()) return false;
        return isProjectMember(auth, opt.get().getProjectId());
    }

    public boolean isMilestoneEmployer(Authentication auth, String milestoneId) {
        String userId = getUserId(auth);
        if (userId == null || milestoneId == null) return false;

        Optional<Milestone> opt = milestoneRepository.findById(milestoneId);
        if (opt.isEmpty()) return false;
        return isProjectEmployer(auth, opt.get().getProjectId());
    }

    public boolean isMilestoneFreelancer(Authentication auth, String milestoneId) {
        String userId = getUserId(auth);
        if (userId == null || milestoneId == null) return false;

        Optional<Milestone> opt = milestoneRepository.findById(milestoneId);
        if (opt.isEmpty()) return false;
        Project p = projectRepository.findById(opt.get().getProjectId()).orElse(null);
        if (p == null) return false;
        return userId.equals(p.getFreelancerId());
    }

    public boolean isDeliverableEmployer(Authentication auth, String deliverableId) {
        String userId = getUserId(auth);
        if (userId == null || deliverableId == null) return false;

        Optional<Deliverable> opt = deliverableRepository.findById(deliverableId);
        if (opt.isEmpty()) return false;
        return isProjectEmployer(auth, opt.get().getProjectId());
    }

    public boolean isDisputeMember(Authentication auth, String disputeId) {
        String userId = getUserId(auth);
        if (userId == null || disputeId == null) return false;

        Optional<Dispute> opt = disputeRepository.findById(disputeId);
        if (opt.isEmpty()) return false;
        Dispute d = opt.get();
        return userId.equals(d.getRaisedBy()) || userId.equals(d.getRaisedAgainst());
    }

    public boolean isEscrowEmployer(Authentication auth, String escrowId) {
        String userId = getUserId(auth);
        if (userId == null || escrowId == null) return false;

        Optional<EscrowTransaction> opt = escrowRepository.findById(escrowId);
        if (opt.isEmpty()) return false;
        return userId.equals(opt.get().getPayerId());
    }

    public boolean isOpportunityEmployer(Authentication auth, String opportunityId) {
        String userId = getUserId(auth);
        if (userId == null || opportunityId == null) return false;

        Optional<Opportunity> opt = opportunityRepository.findById(opportunityId);
        if (opt.isEmpty()) return false;
        return userId.equals(opt.get().getEmployerId());
    }

    public boolean isMatchEmployer(Authentication auth, String matchId) {
        String userId = getUserId(auth);
        if (userId == null || matchId == null) return false;

        Optional<Match> opt = matchDao.findById(matchId);
        if (opt.isEmpty()) return false;
        return userId.equals(opt.get().getEmployerId());
    }

    public boolean isMatchMember(Authentication auth, String matchId) {
        String userId = getUserId(auth);
        if (userId == null || matchId == null) return false;

        Optional<Match> opt = matchDao.findById(matchId);
        if (opt.isEmpty()) return false;
        Match m = opt.get();
        return userId.equals(m.getEmployerId()) || userId.equals(m.getCandidateId());
    }

    public boolean isChallengeEmployer(Authentication auth, String challengeId) {
        String userId = getUserId(auth);
        if (userId == null || challengeId == null) return false;

        Optional<Challenge> opt = challengeRepository.findById(challengeId);
        if (opt.isEmpty()) return false;
        return userId.equals(opt.get().getEmployerId());
    }

    public boolean isSubmissionEmployer(Authentication auth, String submissionId) {
        String userId = getUserId(auth);
        if (userId == null || submissionId == null) return false;

        Optional<Submission> opt = submissionRepository.findById(submissionId);
        if (opt.isEmpty()) return false;
        return isChallengeEmployer(auth, opt.get().getChallengeId());
    }

    public boolean canViewPassport(Authentication auth, String targetUserId) {
        Optional<Passport> opt = passportRepository.findByUserId(targetUserId);
        if (opt.isEmpty()) return false;
        Passport p = opt.get();

        boolean isPublic = p.getPrivacy() != null ? p.getPrivacy().isPublic() : p.isVisibility();
        if (isPublic) return true;

        if (auth == null || !auth.isAuthenticated() || !(auth.getPrincipal() instanceof UserPrincipal)) {
            return false;
        }
        UserPrincipal principal = (UserPrincipal) auth.getPrincipal();
        String currentUserId = principal.getUserId();
        if (currentUserId.equals(targetUserId)) return true;

        return principal.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ADMIN") || a.getAuthority().equals("ROLE_ADMIN"));
    }
}
