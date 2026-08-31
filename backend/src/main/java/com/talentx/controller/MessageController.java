package com.talentx.controller;

import com.talentx.model.Message;
import com.talentx.model.Project;
import com.talentx.repository.MessageRepository;
import com.talentx.repository.ProjectRepository;
import com.talentx.security.SecurityService;
import com.talentx.security.UserPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    private final MessageRepository messageRepository;
    private final ProjectRepository projectRepository;
    private final SecurityService securityService;

    public MessageController(MessageRepository messageRepository, ProjectRepository projectRepository, SecurityService securityService) {
        this.messageRepository = messageRepository;
        this.projectRepository = projectRepository;
        this.securityService = securityService;
    }

    @GetMapping({"/project/{projectId}", "/{projectId}"})
    @PreAuthorize("@securityService.isProjectMember(authentication, #projectId)")
    public ResponseEntity<List<Message>> getProjectMessages(@PathVariable String projectId) {
        return ResponseEntity.ok(messageRepository.findByProjectIdOrderBySentAtAsc(projectId));
    }

    @PostMapping
    public ResponseEntity<Message> sendMessage(@RequestBody Message message, Authentication authentication) {
        if (message.getProjectId() == null || !securityService.isProjectMember(authentication, message.getProjectId())) {
            throw new AccessDeniedException("Not a member of this project");
        }

        Project project = projectRepository.findById(message.getProjectId())
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Project not found"));
        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
        String senderId = principal.getUserId();
        String receiverId = message.getReceiverId();
        if (receiverId == null || (!receiverId.equals(project.getEmployerId()) && !receiverId.equals(project.getFreelancerId())) || receiverId.equals(senderId)) {
            throw new AccessDeniedException("Receiver must be the other participant in this project");
        }

        Message outgoing = new Message();
        outgoing.setProjectId(project.getId());
        outgoing.setSenderId(senderId);
        outgoing.setSenderName(principal.getUsername());
        outgoing.setReceiverId(receiverId);
        outgoing.setContent(message.getContent());
        outgoing.setSentAt(Instant.now());
        outgoing.setRead(false);
        return ResponseEntity.ok(messageRepository.save(outgoing));
    }

    @GetMapping("/unread/{receiverId}")
    @PreAuthorize("authentication.principal.userId == #receiverId")
    public ResponseEntity<List<Message>> getUnread(@PathVariable String receiverId) {
        return ResponseEntity.ok(messageRepository.findByReceiverIdAndReadFalse(receiverId));
    }

    @PatchMapping("/{id}/read")
    public ResponseEntity<Message> markAsRead(@PathVariable String id, Authentication authentication) {
        Message msg = messageRepository.findById(id)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Message not found"));
        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
        if (!principal.getUserId().equals(msg.getReceiverId())) {
            throw new AccessDeniedException("Cannot mark another user's message as read");
        }
        msg.setRead(true);
        return ResponseEntity.ok(messageRepository.save(msg));
    }
}
