package com.talentx.repository;

import com.talentx.model.VerificationRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VerificationRequestRepository extends MongoRepository<VerificationRequest, String> {
    List<VerificationRequest> findByStatus(String status);
    List<VerificationRequest> findByUserId(String userId);
}
