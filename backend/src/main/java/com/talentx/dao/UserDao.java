package com.talentx.dao;

import com.talentx.model.User;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import java.util.Optional;

@Repository
public class UserDao extends BaseMongoDao<User> {

    public UserDao(MongoTemplate mongoTemplate) {
        super(mongoTemplate, User.class);
    }

    public Optional<User> findByEmail(String email) {
        Query query = new Query(Criteria.where("email").is(email));
        User user = mongoTemplate.findOne(query, User.class, getCollectionName());
        return Optional.ofNullable(user);
    }
}
