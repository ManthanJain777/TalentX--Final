package com.talentx.controller;

import com.talentx.dto.request.LoginRequest;
import com.talentx.dto.request.RegisterCandidateRequest;
import com.talentx.dto.request.RegisterEmployerRequest;
import com.talentx.dto.response.ApiResponse;
import com.talentx.dto.response.JwtAuthenticationResponse;
import com.talentx.security.JwtUtil;
import com.talentx.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.web.csrf.CsrfToken;
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

    @Value("${app.security.cookie.secure:false}")
    private boolean secureCookie;

    /**
     * Bootstraps the browser CSRF cookie. This endpoint is intentionally public;
     * the token only authorizes the browser origin and does not authenticate a user.
     */
    @GetMapping("/csrf")
    public ResponseEntity<ApiResponse<String>> csrf(CsrfToken csrfToken) {
        return ResponseEntity.ok(ApiResponse.success("CSRF token issued", csrfToken.getToken()));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<JwtAuthenticationResponse>> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletRequest httpRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        com.talentx.security.UserPrincipal userPrincipal =
                (com.talentx.security.UserPrincipal) authentication.getPrincipal();
        String role = userPrincipal.getAuthorities().iterator().next().getAuthority();
        String jwt = jwtUtil.generateToken(userPrincipal.getUsername(), userPrincipal.getUserId(), role);

        String ipAddress = httpRequest.getHeader("X-Forwarded-For");
        if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = httpRequest.getRemoteAddr();
        }
        String userAgent = httpRequest.getHeader("User-Agent");

        authService.captureLoginDetails(request.getEmail(), ipAddress, userAgent);
        Object userObj = authService.getMe(userPrincipal.getUsername()).get("user");

        JwtAuthenticationResponse response = new JwtAuthenticationResponse(
                null,
                userPrincipal.getUserId(),
                role,
                userObj
        );

        ResponseCookie cookie = ResponseCookie.from("talentx_token", jwt)
                .httpOnly(true)
                .secure(secureCookie)
                .path("/")
                .maxAge(24 * 60 * 60)
                .sameSite("Lax")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(ApiResponse.success("Login successful", response));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout() {
        ResponseCookie cookie = ResponseCookie.from("talentx_token", "")
                .httpOnly(true)
                .secure(secureCookie)
                .path("/")
                .maxAge(0)
                .sameSite("Lax")
                .build();
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(ApiResponse.success("Logout successful", null));
    }

    @PostMapping("/register/candidate")
    public ResponseEntity<ApiResponse<String>> registerCandidate(
            @Valid @RequestBody RegisterCandidateRequest request) {
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
    public ResponseEntity<ApiResponse<String>> registerEmployer(
            @Valid @RequestBody RegisterEmployerRequest request) {
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
        if (authentication == null || !authentication.isAuthenticated()
                || !(authentication.getPrincipal() instanceof com.talentx.security.UserPrincipal)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Unauthorized: No active session"));
        }
        com.talentx.security.UserPrincipal userPrincipal =
                (com.talentx.security.UserPrincipal) authentication.getPrincipal();
        return ResponseEntity.ok(
                ApiResponse.success("User fetched successfully", authService.getMe(userPrincipal.getUsername()))
        );
    }
}
