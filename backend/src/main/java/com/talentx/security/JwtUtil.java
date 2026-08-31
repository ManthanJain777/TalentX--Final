package com.talentx.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {
    @Value("${app.jwt.secret}") private String secret;
    @Value("${app.jwt.expiration-ms}") private long expirationMs;

    private Key getSigningKey() {
        byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);
        if (keyBytes.length < 32) throw new IllegalStateException("JWT_SECRET must be at least 32 UTF-8 bytes");
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractEmail(String token) { return extractClaim(token, Claims::getSubject); }
    public Date extractExpiration(String token) { return extractClaim(token, Claims::getExpiration); }
    public <T> T extractClaim(String token, Function<Claims, T> resolver) { return resolver.apply(extractAllClaims(token)); }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token).getBody();
    }

    private boolean isTokenExpired(String token) { return extractExpiration(token).before(new Date()); }

    public String generateToken(String email, String userId, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);
        claims.put("role", role);
        return Jwts.builder().setClaims(claims).setSubject(email)
                .setIssuedAt(new Date()).setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256).compact();
    }

    public boolean validateToken(String token, String email) {
        return email.equals(extractEmail(token)) && !isTokenExpired(token);
    }
}
