package com.talentx.dao;

import com.talentx.model.Project;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import java.util.List;

@Repository
public class ProjectDao extends BaseMongoDao<Project> {

    public ProjectDao(MongoTemplate mongoTemplate) {
        super(mongoTemplate, Project.class);
    }

    public List<Project> findActiveProjectsByEmployerId(String employerId) {
        Query query = new Query(Criteria.where("employerId").is(employerId).and("status").is("ACTIVE"));
        return mongoTemplate.find(query, Project.class, getCollectionName());
    }
}
