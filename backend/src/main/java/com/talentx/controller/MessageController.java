package com.talentx.controller;

import com.talentx.model.Message;
import com.talentx.repository.MessageRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageRepository messageRepository;

    public MessageController(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @GetMapping({"/project/{projectId}", "/{projectId}"})
    public ResponseEntity<List<Message>> getProjectMessages(@PathVariable String projectId) {
        return ResponseEntity.ok(messageRepository.findByProjectIdOrderBySentAtAsc(projectId));
    }

    @PostMapping
    public ResponseEntity<Message> sendMessage(@RequestBody Message message) {
        message.setRead(false);
        return ResponseEntity.ok(messageRepository.save(message));
    }

    @GetMapping("/unread/{receiverId}")
    public ResponseEntity<List<Message>> getUnread(@PathVariable String receiverId) {
        return ResponseEntity.ok(messageRepository.findByReceiverIdAndReadFalse(receiverId));
    }

    @PatchMapping("/{id}/read")
    public ResponseEntity<Message> markAsRead(@PathVariable String id) {
        Message msg = messageRepository.findById(id)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Message not found"));
        msg.setRead(true);
        return ResponseEntity.ok(messageRepository.save(msg));
    }
}
