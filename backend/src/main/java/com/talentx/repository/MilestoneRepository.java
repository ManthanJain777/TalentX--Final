package com.talentx.repository;

import com.talentx.model.Milestone;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MilestoneRepository extends MongoRepository<Milestone, String> {

    List<Milestone> findByProjectIdOrderByOrderAsc(String projectId);

    List<Milestone> findByProjectIdAndCompleted(String projectId, boolean completed);
}
