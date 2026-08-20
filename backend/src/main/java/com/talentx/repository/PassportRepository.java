package com.talentx.repository;

import com.talentx.model.Passport;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PassportRepository extends MongoRepository<Passport, String> {

    Optional<Passport> findByUserId(String userId);

    boolean existsByUserId(String userId);
}
