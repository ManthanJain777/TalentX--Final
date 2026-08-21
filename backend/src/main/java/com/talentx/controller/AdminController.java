package com.talentx.controller;

import com.talentx.model.AuditLog;
import com.talentx.model.Dispute;
import com.talentx.model.User;
import com.talentx.repository.AuditRepository;
import com.talentx.repository.DisputeRepository;
import com.talentx.repository.UserRepository;
import com.talentx.model.VerificationRequest;
import com.talentx.repository.VerificationRequestRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.time.Instant;

import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAuthority('ADMIN')")
public class AdminController {

    private final UserRepository userRepository;
    private final DisputeRepository disputeRepository;
    private final AuditRepository auditRepository;
    private final VerificationRequestRepository verificationRequestRepository;

    public AdminController(UserRepository userRepository, DisputeRepository disputeRepository,
                           AuditRepository auditRepository, VerificationRequestRepository verificationRequestRepository) {
        this.userRepository = userRepository;
        this.disputeRepository = disputeRepository;
        this.auditRepository = auditRepository;
        this.verificationRequestRepository = verificationRequestRepository;
    }

    // ─── User Management ───
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers(@RequestParam(required = false) String role) {
        if (role != null) {
            return ResponseEntity.ok(userRepository.findByRole(role.toUpperCase()));
        }
        return ResponseEntity.ok(userRepository.findAll());
    }

    @PatchMapping("/users/{id}/verify")
    public ResponseEntity<User> verifyUser(@PathVariable String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("User not found"));
        user.setVerified(true);
        return ResponseEntity.ok(userRepository.save(user));
    }

    @PatchMapping("/users/{id}/suspend")
    public ResponseEntity<User> suspendUser(@PathVariable String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("User not found"));
        user.setStatus("SUSPENDED");
        return ResponseEntity.ok(userRepository.save(user));
    }

    // ─── Verifications ───
    @GetMapping("/verifications")
    public ResponseEntity<List<VerificationRequest>> getVerifications(@RequestParam(required = false, defaultValue = "PENDING") String status) {
        if ("ALL".equalsIgnoreCase(status)) {
            return ResponseEntity.ok(verificationRequestRepository.findAll());
        }
        return ResponseEntity.ok(verificationRequestRepository.findByStatus(status.toUpperCase()));
    }
    
    @PatchMapping("/verifications/{id}/approve")
    public ResponseEntity<VerificationRequest> approveVerification(@PathVariable String id) {
        VerificationRequest req = verificationRequestRepository.findById(id)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Verification not found"));
        req.setStatus("APPROVED");
        req.setUpdatedAt(Instant.now());
        verificationRequestRepository.save(req);
        
        // Also verify user if it's an Identity verification
        if ("Identity".equalsIgnoreCase(req.getType())) {
            User user = userRepository.findById(req.getUserId()).orElse(null);
            if (user != null) {
                user.setVerified(true);
                userRepository.save(user);
            }
        }
        return ResponseEntity.ok(req);
    }
    
    @PatchMapping("/verifications/{id}/reject")
    public ResponseEntity<VerificationRequest> rejectVerification(@PathVariable String id) {
        VerificationRequest req = verificationRequestRepository.findById(id)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Verification not found"));
        req.setStatus("REJECTED");
        req.setUpdatedAt(Instant.now());
        return ResponseEntity.ok(verificationRequestRepository.save(req));
    }

    // ─── Disputes ───
    @GetMapping("/disputes")
    public ResponseEntity<List<Dispute>> getAllDisputes() {
        return ResponseEntity.ok(disputeRepository.findAll());
    }

    // ─── Audit Logs ───
    @GetMapping("/audit")
    public ResponseEntity<Page<AuditLog>> getAuditLogs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size
    ) {
        return ResponseEntity.ok(auditRepository.findAllByOrderByTimestampDesc(PageRequest.of(page, size)));
    }

    // ─── Platform Stats ───
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getPlatformStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalCandidates", userRepository.findByRole("CANDIDATE").size());
        stats.put("totalEmployers", userRepository.findByRole("EMPLOYER").size());
        stats.put("pendingVerifications", userRepository.findByVerifiedFalse().size());
        stats.put("openDisputes", disputeRepository.findByStatus("OPEN").size());
        return ResponseEntity.ok(stats);
    }
}
