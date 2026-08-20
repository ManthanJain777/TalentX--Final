package com.talentx.repository;

import com.talentx.model.Submission;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubmissionRepository extends MongoRepository<Submission, String> {

    List<Submission> findByChallengeId(String challengeId);

    List<Submission> findByCandidateId(String candidateId);

    List<Submission> findByChallengeIdAndStatus(String challengeId, String status);
}
