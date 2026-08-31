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
        // Validate if user exists
        userDao.findByEmail(request.getEmail()).ifPresent(u -> {
            throw new IllegalArgumentException("An account with this email already exists.");
        });

        // Construct new user entity
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setFullName(request.getFullName());
        user.setRole(request.getRole().toUpperCase());
        user.setStatus("ACTIVE");
        user.setVerified(false);
        user.setDiscoverable(true);
        user.setCreatedAt(java.time.Instant.now());

        if ("EMPLOYER".equalsIgnoreCase(request.getRole())) {
            user.setCompanyName(request.getCompanyName());
        }

        User savedUser = userDao.save(user);

        // Initialize Candidate Passport
        if ("CANDIDATE".equalsIgnoreCase(request.getRole())) {
            Passport passport = new Passport();
            passport.setUserId(savedUser.getId());
            passport.setHeadline("");
            passport.setLocation("");
            passport.setAvailability(true);
            passport.setVisibility(true);
            passport.setProfileCompleteness(0);
            
            passportRepository.save(passport);

            // Dispatch welcome email asynchronously
            emailService.sendWelcomeEmailCandidate(savedUser, passport, request.getPassword());
        } else {
            // Dispatch employer welcome email
            emailService.sendWelcomeEmailEmployer(savedUser, request.getPassword());
        }

        return Map.of(
            "token", "TOKEN_GENERATED_BY_CONTROLLER",
            "user", sanitizeUser(savedUser)
        );
    }

    public Map<String, Object> login(LoginRequest request, HttpServletRequest httpReq) {
        User user = userDao.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid email or password.");
        }

        // Gather security context data
        String ipAddress = httpReq != null ? httpReq.getRemoteAddr() : "Unknown";
        String userAgent = httpReq != null ? httpReq.getHeader("User-Agent") : "Unknown";
        
        String location = getLocationFromIP(ipAddress);
        String parsedBrowser = parseUserAgent(userAgent);

        // 🚀 SEND LOGIN ALERT EMAIL
        emailService.sendLoginAlert(user, ipAddress, parsedBrowser, location);

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

    public void captureLoginDetails(String email, String ipAddress, String userAgent) {
        User user = userDao.findByEmail(email).orElse(null);
        if (user != null) {
            String location = getLocationFromIP(ipAddress);
            String parsedBrowser = parseUserAgent(userAgent);
            emailService.sendLoginAlert(user, ipAddress, parsedBrowser, location);
        }
    }

    private String getLocationFromIP(String ip) {
        if (ip == null || ip.equals("127.0.0.1") || ip.equals("0:0:0:0:0:0:0:1") || ip.equals("localhost")) {
            return "Local System";
        }
        try {
            org.springframework.web.client.RestTemplate restTemplate = new org.springframework.web.client.RestTemplate();
            java.util.Map<String, Object> response = restTemplate.getForObject("http://ip-api.com/json/" + ip, java.util.Map.class);
            if (response != null && "success".equals(response.get("status"))) {
                String city = (String) response.get("city");
                String country = (String) response.get("country");
                return (city != null ? city + ", " : "") + (country != null ? country : "Unknown");
            }
        } catch (Exception e) {
            // Silently fall back
        }
        return "Unknown Location";
    }

    private String parseUserAgent(String ua) {
        if (ua == null) return "Unknown Browser";
        
        String browser = "Unknown";
        if (ua.contains("Edg")) browser = "Microsoft Edge";
        else if (ua.contains("OPR") || ua.contains("Opera")) browser = "Opera";
        else if (ua.contains("Chrome")) browser = "Google Chrome";
        else if (ua.contains("Firefox")) browser = "Mozilla Firefox";
        else if (ua.contains("Safari")) browser = "Apple Safari";
        
        String os = "Unknown OS";
        if (ua.contains("Windows")) os = "Windows";
        else if (ua.contains("Mac OS X")) os = "macOS";
        else if (ua.contains("Linux")) os = "Linux";
        else if (ua.contains("Android")) os = "Android";
        else if (ua.contains("iPhone") || ua.contains("iPad")) os = "iOS";
        
        return browser + " on " + os;
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
