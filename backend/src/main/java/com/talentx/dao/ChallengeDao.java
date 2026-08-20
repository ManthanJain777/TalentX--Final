package com.talentx.dao;

import com.talentx.model.Challenge;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ChallengeDao extends BaseMongoDao<Challenge> {

    public ChallengeDao(MongoTemplate mongoTemplate) {
        super(mongoTemplate, Challenge.class);
    }
}
