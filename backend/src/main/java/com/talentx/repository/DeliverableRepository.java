package com.talentx.repository;

import com.talentx.model.Deliverable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeliverableRepository extends MongoRepository<Deliverable, String> {

    List<Deliverable> findByMilestoneIdOrderByVersionDesc(String milestoneId);

    List<Deliverable> findByProjectId(String projectId);
}
