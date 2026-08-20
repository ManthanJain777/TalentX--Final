package com.talentx.repository;

import com.talentx.model.Dispute;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DisputeRepository extends MongoRepository<Dispute, String> {

    List<Dispute> findByProjectId(String projectId);

    List<Dispute> findByStatus(String status);

    List<Dispute> findByRaisedBy(String userId);
}
