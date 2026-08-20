package com.talentx.dao;

import com.talentx.model.Dispute;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class DisputeDao extends BaseMongoDao<Dispute> {

    public DisputeDao(MongoTemplate mongoTemplate) {
        super(mongoTemplate, Dispute.class);
    }
}
