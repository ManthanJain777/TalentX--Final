package com.talentx.dao;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;
import java.util.Optional;

public abstract class BaseMongoDao<T> implements BaseDao<T> {

    protected final MongoTemplate mongoTemplate;
    protected final Class<T> entityClass;

    public BaseMongoDao(MongoTemplate mongoTemplate, Class<T> entityClass) {
        this.mongoTemplate = mongoTemplate;
        this.entityClass = entityClass;
    }

    @Override
    public T save(T entity) {
        return mongoTemplate.save(entity, getCollectionName());
    }

    @Override
    public Optional<T> findById(String id) {
        T entity = mongoTemplate.findById(id, entityClass, getCollectionName());
        return Optional.ofNullable(entity);
    }

    @Override
    public List<T> findAll() {
        return mongoTemplate.findAll(entityClass, getCollectionName());
    }

    @Override
    public void deleteById(String id) {
        Query query = new Query(Criteria.where("id").is(id));
        mongoTemplate.remove(query, entityClass, getCollectionName());
    }

    @Override
    public boolean existsById(String id) {
        Query query = new Query(Criteria.where("id").is(id));
        return mongoTemplate.exists(query, entityClass, getCollectionName());
    }

    protected String getCollectionName() {
        return mongoTemplate.getCollectionName(entityClass);
    }
}
