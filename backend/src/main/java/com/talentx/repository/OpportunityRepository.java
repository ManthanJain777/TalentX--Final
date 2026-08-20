package com.talentx.repository;

import com.talentx.model.Opportunity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OpportunityRepository extends MongoRepository<Opportunity, String> {

    List<Opportunity> findByEmployerId(String employerId);

    List<Opportunity> findByStatus(String status);

    List<Opportunity> findByEmployerIdAndStatus(String employerId, String status);
}
