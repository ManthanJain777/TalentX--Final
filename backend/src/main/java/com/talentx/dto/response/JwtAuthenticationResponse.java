package com.talentx.dto.response;

public class JwtAuthenticationResponse {
    private String token;
    private String userId;
    private String userRole;
    private Object user;

    public JwtAuthenticationResponse() {}
    public JwtAuthenticationResponse(String token, String userId, String userRole, Object user) {
        this.token = token; this.userId = userId; this.userRole = userRole; this.user = user;
    }
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getUserRole() { return userRole; }
    public void setUserRole(String userRole) { this.userRole = userRole; }
    public Object getUser() { return user; }
    public void setUser(Object user) { this.user = user; }
}
