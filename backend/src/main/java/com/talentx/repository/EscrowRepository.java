package com.talentx.repository;

import com.talentx.model.EscrowTransaction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EscrowRepository extends MongoRepository<EscrowTransaction, String> {

    List<EscrowTransaction> findByProjectId(String projectId);

    Optional<EscrowTransaction> findByMilestoneId(String milestoneId);

    List<EscrowTransaction> findByPayerId(String payerId);

    List<EscrowTransaction> findByPayeeId(String payeeId);

    List<EscrowTransaction> findByStatus(String status);
}
