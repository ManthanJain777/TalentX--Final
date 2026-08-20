package com.talentx.controller;

import com.talentx.dto.request.LoginRequest;
import com.talentx.dto.request.RegisterCandidateRequest;
import com.talentx.dto.request.RegisterEmployerRequest;
import com.talentx.dto.response.ApiResponse;
import com.talentx.dto.response.JwtAuthenticationResponse;
import com.talentx.security.JwtUtil;
import com.talentx.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<JwtAuthenticationResponse>> login(@Valid @RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        com.talentx.security.UserPrincipal userPrincipal = (com.talentx.security.UserPrincipal) authentication.getPrincipal();
        String role = userPrincipal.getAuthorities().iterator().next().getAuthority();
        String jwt = jwtUtil.generateToken(userPrincipal.getUsername(), userPrincipal.getUserId(), role);

        // Call your existing AuthService to capture login
        authService.captureLoginDetails(request.getEmail());
        
        Object userObj = authService.getMe(userPrincipal.getUsername()).get("user");

        JwtAuthenticationResponse response = new JwtAuthenticationResponse(
                jwt,
                userPrincipal.getUserId(), 
                role,
                userObj
        );

        return ResponseEntity.ok(ApiResponse.success("Login successful", response));
    }

    @PostMapping("/register/candidate")
    public ResponseEntity<ApiResponse<String>> registerCandidate(@Valid @RequestBody RegisterCandidateRequest request) {
        // Call your existing AuthService logic
        authService.registerCandidate(
                request.getEmail(),
                request.getPassword(),
                request.getFirstName(),
                request.getLastName()
        );
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Candidate registered successfully. Welcome email sent.", null));
    }

    @PostMapping("/register/employer")
    public ResponseEntity<ApiResponse<String>> registerEmployer(@Valid @RequestBody RegisterEmployerRequest request) {
        // Call your existing AuthService logic
        authService.registerEmployer(
                request.getEmail(),
                request.getPassword(),
                request.getCompanyName()
        );
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Employer registered successfully. Welcome email sent.", null));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<java.util.Map<String, Object>>> getMe(Authentication authentication) {
        com.talentx.security.UserPrincipal userPrincipal = (com.talentx.security.UserPrincipal) authentication.getPrincipal();
        return ResponseEntity.ok(ApiResponse.success("User fetched successfully", authService.getMe(userPrincipal.getUsername())));
    }
}
