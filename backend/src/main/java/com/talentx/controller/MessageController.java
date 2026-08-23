package com.talentx.controller;

import com.talentx.model.Message;
import com.talentx.repository.MessageRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageRepository messageRepository;
    private final com.talentx.security.SecurityService securityService;

    public MessageController(MessageRepository messageRepository, com.talentx.security.SecurityService securityService) {
        this.messageRepository = messageRepository;
        this.securityService = securityService;
    }

    @GetMapping({"/project/{projectId}", "/{projectId}"})
    @PreAuthorize("@securityService.isProjectMember(authentication, #projectId)")
    public ResponseEntity<List<Message>> getProjectMessages(@PathVariable("projectId") String projectId) {
        return ResponseEntity.ok(messageRepository.findByProjectIdOrderBySentAtAsc(projectId));
    }

    @PostMapping
    public ResponseEntity<Message> sendMessage(@RequestBody Message message, Authentication authentication) {
        if (!securityService.isProjectMember(authentication, message.getProjectId())) {
            throw new org.springframework.security.access.AccessDeniedException("Not a member of this project");
        }
        com.talentx.security.UserPrincipal principal = (com.talentx.security.UserPrincipal) authentication.getPrincipal();
        message.setSenderId(principal.getUserId());
        message.setSenderName(principal.getUsername());
        message.setSentAt(Instant.now());
        message.setRead(false);
        return ResponseEntity.ok(messageRepository.save(message));
    }

    @GetMapping("/unread/{receiverId}")
    @PreAuthorize("authentication.principal.userId == #receiverId")
    public ResponseEntity<List<Message>> getUnread(@PathVariable("receiverId") String receiverId) {
        return ResponseEntity.ok(messageRepository.findByReceiverIdAndReadFalse(receiverId));
    }

    @PatchMapping("/{id}/read")
    public ResponseEntity<Message> markAsRead(@PathVariable("id") String id, Authentication authentication) {
        Message msg = messageRepository.findById(id)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Message not found"));
        
        com.talentx.security.UserPrincipal principal = (com.talentx.security.UserPrincipal) authentication.getPrincipal();
        if (!principal.getUserId().equals(msg.getReceiverId())) {
            throw new org.springframework.security.access.AccessDeniedException("Cannot mark another user's message as read");
        }
        
        msg.setRead(true);
        return ResponseEntity.ok(messageRepository.save(msg));
    }
}
