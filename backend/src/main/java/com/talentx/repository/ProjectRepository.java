package com.talentx.repository;

import com.talentx.model.Project;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends MongoRepository<Project, String> {

    List<Project> findByEmployerId(String employerId);

    List<Project> findByFreelancerId(String freelancerId);

    List<Project> findByStatus(String status);

    List<Project> findByEmployerIdOrFreelancerId(String employerId, String freelancerId);
}
