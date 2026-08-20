package com.talentx.auth.filter;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

/**
 * Authentication filter that protects specified URL patterns.
 * Currently not applied to any paths (login/register are public).
 * Can be extended to protect admin routes if JSP admin pages are added later.
 */
public class AuthFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        String path = httpRequest.getRequestURI();

        // Allow public paths
        if (path.contains("/auth/login") || path.contains("/auth/register")
                || path.contains("/css/") || path.contains("/js/")) {
            chain.doFilter(request, response);
            return;
        }

        // For protected paths, check for session or token
        String token = (String) httpRequest.getSession().getAttribute("jwt_token");
        if (token == null || token.isEmpty()) {
            httpResponse.sendRedirect(httpRequest.getContextPath() + "/auth/login");
            return;
        }

        chain.doFilter(request, response);
    }
}
