package com.talentx.dao;

import com.talentx.model.Passport;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

@Repository
public class PassportDao extends BaseMongoDao<Passport> {

    public PassportDao(MongoTemplate mongoTemplate) {
        super(mongoTemplate, Passport.class);
    }

    public void addSkillToPassport(String passportId, Passport.Skill skill) {
        Query query = new Query(Criteria.where("id").is(passportId));
        Update update = new Update().push("skills", skill);
        mongoTemplate.updateFirst(query, update, Passport.class, getCollectionName());
    }
}
