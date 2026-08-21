package com.talentx.controller;

import com.talentx.model.Challenge;
import com.talentx.model.Submission;
import com.talentx.repository.ChallengeRepository;
import com.talentx.repository.SubmissionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/challenges")
public class ChallengeController {

    private final ChallengeRepository challengeRepository;
    private final SubmissionRepository submissionRepository;

    public ChallengeController(ChallengeRepository challengeRepository, SubmissionRepository submissionRepository) {
        this.challengeRepository = challengeRepository;
        this.submissionRepository = submissionRepository;
    }

    @GetMapping
    public ResponseEntity<List<Challenge>> getAllChallenges(@RequestParam(required = false) String status) {
        if (status != null) {
            return ResponseEntity.ok(challengeRepository.findByStatus(status.toUpperCase()));
        }
        return ResponseEntity.ok(challengeRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Challenge> getChallenge(@PathVariable String id) {
        return ResponseEntity.ok(challengeRepository.findById(id)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Challenge not found")));
    }


    @PostMapping
    public ResponseEntity<Challenge> createChallenge(@RequestBody Challenge challenge) {
        challenge.setStatus("OPEN");
        challenge.setSubmissionCount(0);
        return ResponseEntity.ok(challengeRepository.save(challenge));
    }

    @PostMapping("/{id}/submit")
    public ResponseEntity<Submission> submitSolution(@PathVariable String id, @RequestBody Submission submission) {
        Challenge challenge = challengeRepository.findById(id)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Challenge not found"));

        submission.setChallengeId(id);
        submission.setStatus("PENDING");
        Submission saved = submissionRepository.save(submission);

        challenge.setSubmissionCount(challenge.getSubmissionCount() + 1);
        challengeRepository.save(challenge);

        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}/submissions")
    public ResponseEntity<List<Submission>> getSubmissions(@PathVariable String id) {
        return ResponseEntity.ok(submissionRepository.findByChallengeId(id));
    }

    @PutMapping("/submissions/{submissionId}/review")
    public ResponseEntity<Challenge> reviewSubmission(
            @PathVariable String submissionId,
            @jakarta.validation.Valid @RequestBody com.talentx.dto.request.ChallengeSubmissionReviewRequest request) {
        
        Submission submission = submissionRepository.findById(submissionId)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Submission not found"));

        Challenge challenge = challengeRepository.findById(submission.getChallengeId())
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Challenge not found"));

        if (request.isWinner()) {
            submission.setStatus("WINNER");
            submissionRepository.save(submission);

            // Mark other submissions as rejected
            submissionRepository.findByChallengeId(challenge.getId()).stream()
                    .filter(s -> !s.getId().equals(submissionId))
                    .forEach(s -> {
                        s.setStatus("REJECTED");
                        submissionRepository.save(s);
                    });

            challenge.setStatus("COMPLETED");
            Challenge.Winner winner = new Challenge.Winner();
            winner.setCandidateId(submission.getCandidateId());
            winner.setCandidateName(submission.getCandidateName());
            winner.setSelectedAt(Instant.now());
            challenge.getWinners().add(winner);
        } else {
            submission.setStatus("REVIEWED");
            submissionRepository.save(submission);
        }

        return ResponseEntity.ok(challengeRepository.save(challenge));
    }

    @GetMapping("/employer/{employerId}")
    public ResponseEntity<List<Challenge>> getByEmployer(@PathVariable String employerId) {
        return ResponseEntity.ok(challengeRepository.findByEmployerId(employerId));
    }
}
