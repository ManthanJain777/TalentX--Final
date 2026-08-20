package com.talentx.auth.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Map;

/**
 * Shared JWT utility. Uses the SAME secret as the Spring Boot backend
 * so tokens generated here are valid for Spring Boot API calls.
 */
public class JwtUtil {

    // MUST match app.jwt.secret in backend application.properties
    private static final String SECRET = "TALENTX_SUPER_SECRET_JWT_KEY_CHANGE_ME_IN_PRODUCTION_2026";
    private static final long EXPIRATION = 86400000L; // 24 hours

    public static String generateToken(String email, String role, String userId) {
        SecretKey key = Keys.hmacShaKeyFor(SECRET.getBytes());

        return Jwts.builder()
                .claims(Map.of("role", role, "userId", userId))
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(key, Jwts.SIG.HS256)
                .compact();
    }
}
