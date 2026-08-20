package com.talentx.security;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

public class RateLimitFilter implements Filter {
    private static final int MAX_REQUESTS_PER_MINUTE = 10;
    private static final long CLEANUP_INTERVAL = 60000; // 1 minute
    
    private final Map<String, AtomicInteger> requestCounts = new ConcurrentHashMap<>();
    private final Map<String, Long> resetTimestamps = new ConcurrentHashMap<>();
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) 
            throws IOException, ServletException {
        
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String ip = getClientIP(httpRequest);
        
        // Cleanup old entries
        cleanupOldEntries();
        
        // Check if current minute has reset
        long currentTime = System.currentTimeMillis();
        Long lastReset = resetTimestamps.get(ip);
        
        if (lastReset == null || currentTime - lastReset > CLEANUP_INTERVAL) {
            resetTimestamps.put(ip, currentTime);
            requestCounts.put(ip, new AtomicInteger(0));
        }
        
        AtomicInteger count = requestCounts.get(ip);
        if (count.incrementAndGet() > MAX_REQUESTS_PER_MINUTE) {
            HttpServletResponse httpResponse = (HttpServletResponse) response;
            httpResponse.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            httpResponse.setContentType("application/json");
            httpResponse.getWriter().write("{\"success\":false,\"message\":\"Too many requests. Please try again later.\",\"data\":null}");
            return;
        }
        
        chain.doFilter(request, response);
    }
    
    private String getClientIP(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.isEmpty()) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }
    
    private void cleanupOldEntries() {
        if (requestCounts.size() > 1000) {
            // Clear all if too many entries
            requestCounts.clear();
            resetTimestamps.clear();
        }
    }
}
