package com.talentx.dao;

import com.talentx.model.Submission;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class SubmissionDao extends BaseMongoDao<Submission> {

    public SubmissionDao(MongoTemplate mongoTemplate) {
        super(mongoTemplate, Submission.class);
    }
}
