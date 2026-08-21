package com.talentx.service;

import com.talentx.dto.request.LoginRequest;
import com.talentx.dto.auth.RegisterRequest;
import com.talentx.model.Passport;
import com.talentx.model.User;
import com.talentx.repository.PassportRepository;
import com.talentx.dao.UserDao;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class AuthService {

    private final UserDao userDao;
    private final PassportRepository passportRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public AuthService(UserDao userDao,
                       PassportRepository passportRepository,
                       PasswordEncoder passwordEncoder,
                       EmailService emailService) {
        this.userDao = userDao;
        this.passportRepository = passportRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    public Map<String, Object> register(RegisterRequest request) {
        // Check if user exists
        if (userDao.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("User already exists");
        }

        // Create user
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setFullName(request.getFullName());
        user.setRole(request.getRole().toUpperCase());
        user.setStatus("ACTIVE");
        user.setVerified(false);
        user.setDiscoverable(true);
        // Instant/LocalDateTime mapping: User uses Instant, but setting LocalDateTime is tricky. Let's use Instant.now()
        user.setCreatedAt(java.time.Instant.now());

        if ("EMPLOYER".equals(request.getRole().toUpperCase())) {
            user.setCompanyName(request.getCompanyName());
        }

        User savedUser = userDao.save(user);

        // Create initial passport if candidate
        if ("CANDIDATE".equals(request.getRole().toUpperCase())) {
            Passport passport = new Passport();
            passport.setUserId(savedUser.getId());
            passport.setHeadline("Software Developer");
            passport.setLocation("Remote");
            passport.setAvailability(true);
            passport.setVisibility(true);
            passport.setProfileCompleteness(10);
            passport.setSkills(new ArrayList<>());
            passport.setProjects(new ArrayList<>());
            passport.setCertifications(new ArrayList<>());
            passport.setAssessments(new ArrayList<>());
            passport.setInternships(new ArrayList<>());
            passportRepository.save(passport);

            // SEND CANDIDATE WELCOME EMAIL
            emailService.sendWelcomeEmailCandidate(savedUser, passport, request.getPassword());
        } else {
            // SEND EMPLOYER WELCOME EMAIL
            emailService.sendWelcomeEmailEmployer(savedUser, request.getPassword());
        }

        Map<String, Object> response = new HashMap<>();
        response.put("token", "TOKEN_GENERATED_BY_CONTROLLER");
        response.put("user", sanitizeUser(savedUser));
        return response;
    }

    // Retaining signature expected by controller but parsing the request
    public Map<String, Object> login(LoginRequest request, HttpServletRequest httpReq) {
        User user = userDao.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid credentials");
        }

        // Get IP, User Agent, and location
        String ipAddress = httpReq != null ? httpReq.getRemoteAddr() : "Unknown";
        String userAgent = httpReq != null ? httpReq.getHeader("User-Agent") : "Unknown";
        String location = "Unknown Location"; // getLocationFromIP(ipAddress);

        // 🚀 SEND LOGIN ALERT EMAIL
        emailService.sendLoginAlert(user, ipAddress, userAgent, location);

        Map<String, Object> response = new HashMap<>();
        response.put("token", "TOKEN_GENERATED_BY_CONTROLLER");
        response.put("user", sanitizeUser(user));
        return response;
    }
    
    // For compatibility with AuthController which doesn't pass HttpServletRequest currently
    public Map<String, Object> login(String email, String password) {
        return login(new LoginRequest(email, password), null);
    }

    public Map<String, Object> register(String fullName, String email, String password, String role) {
        RegisterRequest req = new RegisterRequest();
        req.setFullName(fullName);
        req.setEmail(email);
        req.setPassword(password);
        req.setRole(role);
        return register(req);
    }

    public void forgotPassword(String email) {
        User user = userDao.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        String otp = String.format("%06d", new Random().nextInt(999999));
        String resetLink = "http://localhost:3000/auth/reset-password?otp=" + otp;

        // Store OTP in a temporary collection with expiration (not shown here)

        // 🚀 SEND PASSWORD RESET OTP
        emailService.sendPasswordResetOtp(user, otp, resetLink);
    }

    public Map<String, Object> getMe(String email) {
        User user = userDao.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Map<String, Object> response = new HashMap<>();
        response.put("user", sanitizeUser(user));
        return response;
    }

    public void captureLoginDetails(String email) {
        User user = userDao.findByEmail(email).orElse(null);
        if (user != null) {
            emailService.sendLoginAlert(user, "Unknown IP", "Unknown Device", "Unknown Location");
        }
    }

    public void registerCandidate(String email, String password, String firstName, String lastName) {
        String fullName = firstName + " " + lastName;
        register(fullName, email, password, "CANDIDATE");
    }

    public void registerEmployer(String email, String password, String companyName) {
        RegisterRequest req = new RegisterRequest();
        req.setFullName(companyName);
        req.setEmail(email);
        req.setPassword(password);
        req.setRole("EMPLOYER");
        req.setCompanyName(companyName);
        register(req);
    }

    public String getUserIdByEmail(String email) {
        return userDao.findByEmail(email).map(User::getId).orElse("UNKNOWN");
    }

    private Map<String, Object> sanitizeUser(User user) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", user.getId());
        map.put("fullName", user.getFullName());
        map.put("email", user.getEmail());
        map.put("role", user.getRole());
        map.put("status", user.getStatus());
        map.put("verified", user.isVerified());
        map.put("headline", user.getHeadline());
        map.put("companyName", user.getCompanyName());
        map.put("avatarUrl", user.getAvatarUrl());
        return map;
    }
}
