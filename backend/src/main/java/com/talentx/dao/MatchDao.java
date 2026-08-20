package com.talentx.dao;

import com.talentx.model.Match;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import java.util.List;

@Repository
public class MatchDao extends BaseMongoDao<Match> {

    public MatchDao(MongoTemplate mongoTemplate) {
        super(mongoTemplate, Match.class);
    }

    public List<Match> findMatchesByScoringCriteria(String userId, int minScore) {
        MatchOperation matchOperation = Aggregation.match(
                new Criteria("candidateId").is(userId).and("totalScore").gte(minScore)
        );
        Aggregation aggregation = Aggregation.newAggregation(matchOperation);
        return mongoTemplate.aggregate(aggregation, getCollectionName(), Match.class).getMappedResults();
    }

    public List<Match> findByCandidateId(String candidateId) {
        org.springframework.data.mongodb.core.query.Query query = new org.springframework.data.mongodb.core.query.Query(Criteria.where("candidateId").is(candidateId));
        return mongoTemplate.find(query, Match.class, getCollectionName());
    }

    public List<Match> findByOpportunityIdOrderByTotalScoreDesc(String opportunityId) {
        org.springframework.data.mongodb.core.query.Query query = new org.springframework.data.mongodb.core.query.Query(Criteria.where("opportunityId").is(opportunityId))
                .with(org.springframework.data.domain.Sort.by(org.springframework.data.domain.Sort.Direction.DESC, "totalScore"));
        return mongoTemplate.find(query, Match.class, getCollectionName());
    }
}
