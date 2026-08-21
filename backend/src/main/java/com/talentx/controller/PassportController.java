package com.talentx.controller;

import com.talentx.model.Passport;
import com.talentx.model.User;
import com.talentx.repository.UserRepository;
import com.talentx.service.PassportService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/passports")
public class PassportController {

    private final PassportService passportService;
    private final UserRepository userRepository;

    public PassportController(PassportService passportService, UserRepository userRepository) {
        this.passportService = passportService;
        this.userRepository = userRepository;
    }

    @GetMapping("/me")
    public ResponseEntity<Passport> getMyPassport(Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("User not found"));
        Passport passport = passportService.getByUserId(user.getId());
        return ResponseEntity.ok(passport);
    }

    @PutMapping("/me")
    public ResponseEntity<Passport> updateMyPassport(Authentication authentication, @RequestBody Passport passportData) {
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new com.talentx.exception.ResourceNotFoundException("User not found"));
        Passport updated = passportService.createOrUpdate(user.getId(), passportData);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Passport> getPassport(@PathVariable String userId) {
        Passport passport = passportService.getByUserId(userId);
        if (passport == null) {
            throw new com.talentx.exception.ResourceNotFoundException("Passport not found for user: " + userId);
        }
        return ResponseEntity.ok(passport);
    }
}
