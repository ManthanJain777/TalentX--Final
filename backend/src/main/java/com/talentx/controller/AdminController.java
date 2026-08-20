package com.talentx.controller;

import com.talentx.model.AuditLog;
import com.talentx.model.Dispute;
import com.talentx.model.User;
import com.talentx.repository.AuditRepository;
import com.talentx.repository.DisputeRepository;
import com.talentx.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAuthority('ADMIN')")
public class AdminController {

    private final UserRepository userRepository;
    private final DisputeRepository disputeRepository;
    private final AuditRepository auditRepository;

    public AdminController(UserRepository userRepository, DisputeRepository disputeRepository,
                           AuditRepository auditRepository) {
        this.userRepository = userRepository;
        this.disputeRepository = disputeRepository;
        this.auditRepository = auditRepository;
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
    public ResponseEntity<List<User>> getPendingVerifications() {
        return ResponseEntity.ok(userRepository.findByVerifiedFalse());
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
