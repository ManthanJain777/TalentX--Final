package com.talentx.controller;

import com.talentx.model.EscrowTransaction;
import com.talentx.repository.EscrowRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.MessageDigest;
import java.time.Instant;
import java.util.HexFormat;
import java.util.List;

@RestController
@RequestMapping("/api/escrow")
public class EscrowController {

    private final EscrowRepository escrowRepository;

    public EscrowController(EscrowRepository escrowRepository) {
        this.escrowRepository = escrowRepository;
    }

    @GetMapping("/project/{projectId}")
    @PreAuthorize("@securityService.isProjectMember(authentication, #projectId)")
    public ResponseEntity<List<EscrowTransaction>> getByProject(@PathVariable String projectId) {
        return ResponseEntity.ok(escrowRepository.findByProjectId(projectId));
    }

    @PostMapping
    @PreAuthorize("@securityService.isProjectEmployer(authentication, #transaction.projectId)")
    public ResponseEntity<EscrowTransaction> createEscrow(@RequestBody EscrowTransaction transaction, Authentication authentication) {
        com.talentx.security.UserPrincipal principal = (com.talentx.security.UserPrincipal) authentication.getPrincipal();
        transaction.setPayerId(principal.getUserId());
        transaction.setStatus("HELD");
        transaction.setCurrency("INR");
        transaction.setPlatformFee(transaction.getAmount() * 0.20);
        transaction.setTransactionHash(generateHash(transaction));
        return ResponseEntity.ok(escrowRepository.save(transaction));
    }

    @PatchMapping("/{id}/release")
    @PreAuthorize("@securityService.isEscrowEmployer(authentication, #id)")
    public ResponseEntity<EscrowTransaction> releaseEscrow(@PathVariable String id) {
        EscrowTransaction txn = escrowRepository.findById(id)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Escrow transaction not found"));
        txn.setStatus("RELEASED");
        txn.setReleaseDate(Instant.now());
        return ResponseEntity.ok(escrowRepository.save(txn));
    }

    @PatchMapping("/{id}/refund")
    @PreAuthorize("hasAuthority('ADMIN') or hasRole('ADMIN')")
    public ResponseEntity<EscrowTransaction> refundEscrow(@PathVariable String id) {
        EscrowTransaction txn = escrowRepository.findById(id)
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("Escrow transaction not found"));
        txn.setStatus("REFUNDED");
        txn.setRefundDate(Instant.now());
        return ResponseEntity.ok(escrowRepository.save(txn));
    }

    private String generateHash(EscrowTransaction txn) {
        try {
            String data = txn.getProjectId() + txn.getAmount() + Instant.now().toString();
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(data.getBytes());
            return HexFormat.of().formatHex(hash);
        } catch (Exception e) {
            return "hash-error";
        }
    }
}
