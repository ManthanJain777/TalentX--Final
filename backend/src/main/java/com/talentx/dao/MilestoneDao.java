package com.talentx.dao;

import com.talentx.model.Milestone;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class MilestoneDao extends BaseMongoDao<Milestone> {

    public MilestoneDao(MongoTemplate mongoTemplate) {
        super(mongoTemplate, Milestone.class);
    }
}
