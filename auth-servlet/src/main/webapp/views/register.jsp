<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TalentX – Register</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,600;0,700&family=Manrope:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css">
</head>
<body class="auth-body">
    <div class="auth-container">
        <div class="auth-card">
            <div class="auth-header">
                <h1 class="auth-brand">TALENT<span class="gold">X</span></h1>
                <p class="auth-subtitle">Create Your Verified Identity</p>
            </div>

            <c:if test="${not empty error}">
                <div class="alert alert-danger" role="alert">
                    ${error}
                </div>
            </c:if>

            <form method="POST" action="${pageContext.request.contextPath}/auth/register" class="auth-form">
                <div class="mb-3">
                    <label for="fullName" class="form-label">Full Name</label>
                    <input type="text" class="form-control auth-input" id="fullName" name="fullName" 
                           placeholder="Your full name" required>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email Address</label>
                    <input type="email" class="form-control auth-input" id="email" name="email" 
                           placeholder="you@example.com" required>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control auth-input" id="password" name="password" 
                           placeholder="Min 8 characters" minlength="8" required>
                </div>
                <div class="mb-4">
                    <label class="form-label">I am a...</label>
                    <div class="role-selector">
                        <div class="role-option">
                            <input type="radio" name="role" id="roleCandidate" value="CANDIDATE" checked>
                            <label for="roleCandidate" class="role-label">
                                <span class="role-icon">👤</span>
                                <span class="role-name">Candidate</span>
                                <span class="role-desc">Looking for work</span>
                            </label>
                        </div>
                        <div class="role-option">
                            <input type="radio" name="role" id="roleEmployer" value="EMPLOYER">
                            <label for="roleEmployer" class="role-label">
                                <span class="role-icon">🏢</span>
                                <span class="role-name">Employer</span>
                                <span class="role-desc">Hiring talent</span>
                            </label>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-gold w-100">Create Account</button>
            </form>

            <div class="auth-footer">
                <p>Already have an account? <a href="${pageContext.request.contextPath}/auth/login">Sign in</a></p>
            </div>
        </div>
    </div>
</body>
</html>
