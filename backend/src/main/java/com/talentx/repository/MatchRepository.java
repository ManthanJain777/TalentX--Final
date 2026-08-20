package com.talentx.repository;

import com.talentx.model.Match;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchRepository extends MongoRepository<Match, String> {

    List<Match> findByOpportunityId(String opportunityId);

    List<Match> findByCandidateId(String candidateId);

    List<Match> findByEmployerId(String employerId);

    List<Match> findByOpportunityIdOrderByTotalScoreDesc(String opportunityId);

    List<Match> findByCandidateIdAndStatus(String candidateId, String status);
}
