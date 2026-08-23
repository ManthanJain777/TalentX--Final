package com.talentx.controller;

import com.talentx.matching.MatchEngine;
import com.talentx.model.Match;
import com.talentx.model.Opportunity;
import com.talentx.model.Passport;
import com.talentx.dao.MatchDao;
import com.talentx.repository.OpportunityRepository;
import com.talentx.repository.PassportRepository;
import com.talentx.service.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/matches")
public class MatchingController {

    private final MatchEngine matchEngine;
    private final MatchDao matchDao;
    private final OpportunityRepository opportunityRepository;
    private final PassportRepository passportRepository;
    private final ProjectService projectService;

    public MatchingController(MatchEngine matchEngine, MatchDao matchDao,
                              OpportunityRepository opportunityRepository, PassportRepository passportRepository,
                              ProjectService projectService) {
        this.matchEngine = matchEngine;
        this.matchDao = matchDao;
        this.opportunityRepository = opportunityRepository;
        this.passportRepository = passportRepository;
        this.projectService = projectService;
    }

    @PostMapping("/{opportunityId}/{candidateId}")
    @PreAuthorize("hasAuthority('ADMIN') or hasRole('ADMIN')")
    public ResponseEntity<Match> calculateMatch(
            @PathVariable String opportunityId,
            @PathVariable String candidateId
    ) {
        Opportunity opportunity = opportunityRepository.findById(opportunityId)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Opportunity not found"));

        Passport passport = passportRepository.findByUserId(candidateId)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Passport not found"));

        Match match = matchEngine.calculateMatch(opportunity, passport, opportunity.getEmployerId());
        match = matchDao.save(match);

        return ResponseEntity.ok(match);
    }

    @GetMapping("/opportunity/{opportunityId}")
    @PreAuthorize("@securityService.isOpportunityEmployer(authentication, #opportunityId)")
    public ResponseEntity<List<Match>> getMatchesByOpportunity(@PathVariable String opportunityId) {
        return ResponseEntity.ok(matchDao.findByOpportunityIdOrderByTotalScoreDesc(opportunityId));
    }

    @GetMapping("/candidate/{candidateId}")
    @PreAuthorize("authentication.principal.userId == #candidateId")
    public ResponseEntity<List<Match>> getMatchesByCandidate(@PathVariable String candidateId) {
        return ResponseEntity.ok(matchDao.findByCandidateId(candidateId));
    }

    @GetMapping("/{matchId}")
    @PreAuthorize("@securityService.isMatchMember(authentication, #matchId) or hasRole('ADMIN')")
    public ResponseEntity<Match> getMatchById(@PathVariable String matchId) {
        return ResponseEntity.ok(matchDao.findById(matchId)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Match not found")));
    }

    @PatchMapping("/{matchId}/accept")
    @PreAuthorize("@securityService.isMatchEmployer(authentication, #matchId)")
    public ResponseEntity<Match> acceptMatch(@PathVariable String matchId) {
        Match match = matchDao.findById(matchId)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Match not found"));
        match.setStatus("ACCEPTED");
        match = matchDao.save(match);
        projectService.createProjectFromMatch(match);
        return ResponseEntity.ok(match);
    }

    @PatchMapping("/{matchId}/reject")
    @PreAuthorize("@securityService.isMatchMember(authentication, #matchId)")
    public ResponseEntity<Match> rejectMatch(@PathVariable String matchId) {
        Match match = matchDao.findById(matchId)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Match not found"));
        match.setStatus("REJECTED");
        return ResponseEntity.ok(matchDao.save(match));
    }
}
