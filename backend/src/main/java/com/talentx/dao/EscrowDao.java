package com.talentx.dao;

import com.talentx.model.EscrowTransaction;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class EscrowDao extends BaseMongoDao<EscrowTransaction> {

    public EscrowDao(MongoTemplate mongoTemplate) {
        super(mongoTemplate, EscrowTransaction.class);
    }
}
