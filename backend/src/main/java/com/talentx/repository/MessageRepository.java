package com.talentx.repository;

import com.talentx.model.Message;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends MongoRepository<Message, String> {

    List<Message> findByProjectIdOrderBySentAtAsc(String projectId);

    List<Message> findByReceiverIdAndReadFalse(String receiverId);

    List<Message> findBySenderIdOrReceiverId(String senderId, String receiverId);
}
