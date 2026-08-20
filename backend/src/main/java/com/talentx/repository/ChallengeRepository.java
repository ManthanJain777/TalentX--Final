package com.talentx.repository;

import com.talentx.model.Challenge;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChallengeRepository extends MongoRepository<Challenge, String> {

    List<Challenge> findByStatus(String status);

    List<Challenge> findByEmployerId(String employerId);

    List<Challenge> findByEmployerIdAndStatus(String employerId, String status);
}
