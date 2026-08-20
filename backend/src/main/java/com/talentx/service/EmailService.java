package com.talentx.service;

import com.talentx.model.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import jakarta.mail.internet.MimeMessage;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public EmailService(JavaMailSender mailSender, TemplateEngine templateEngine) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
    }

    // ============================================================
    // 1. REGISTRATION EMAILS
    // ============================================================

    /**
     * Welcome email for CANDIDATE
     */
    public void sendWelcomeEmailCandidate(User user, Passport passport) {
        try {
            Context context = new Context(Locale.ENGLISH);
            context.setVariable("userName", user.getFullName());
            context.setVariable("userEmail", user.getEmail());
            context.setVariable("role", "Candidate");
            context.setVariable("passportCompletion", passport != null ? passport.getProfileCompleteness() : 0);
            context.setVariable("currentYear", LocalDateTime.now().getYear());
            context.setVariable("loginLink", "http://localhost:3000/auth/login");
            context.setVariable("passportLink", "http://localhost:3000/candidate/passport");

            String htmlContent = templateEngine.process("email/welcome-candidate", context);
            sendEmail(user.getEmail(), "🎉 Welcome to TALENTX, " + user.getFullName() + "!", htmlContent);
        } catch (Exception e) {
            System.err.println("Failed to send welcome email: " + e.getMessage());
        }
    }

    /**
     * Welcome email for EMPLOYER
     */
    public void sendWelcomeEmailEmployer(User user) {
        try {
            Context context = new Context(Locale.ENGLISH);
            context.setVariable("userName", user.getFullName());
            context.setVariable("companyName", user.getCompanyName() != null ? user.getCompanyName() : "your company");
            context.setVariable("userEmail", user.getEmail());
            context.setVariable("role", "Employer");
            context.setVariable("currentYear", LocalDateTime.now().getYear());
            context.setVariable("loginLink", "http://localhost:3000/auth/login");
            context.setVariable("discoveryLink", "http://localhost:3000/employer/discovery");

            String htmlContent = templateEngine.process("email/welcome-employer", context);
            sendEmail(user.getEmail(), "🏢 Welcome to TALENTX, " + user.getCompanyName() + "!", htmlContent);
        } catch (Exception e) {
            System.err.println("Failed to send welcome email: " + e.getMessage());
        }
    }

    // ============================================================
    // 2. LOGIN ALERT EMAIL (Custom for each login)
    // ============================================================

    public void sendLoginAlert(User user, String ipAddress, String userAgent, String location) {
        try {
            Context context = new Context(Locale.ENGLISH);
            context.setVariable("userName", user.getFullName());
            context.setVariable("userEmail", user.getEmail());
            context.setVariable("loginTime", LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a")));
            context.setVariable("ipAddress", ipAddress != null ? ipAddress : "Unknown");
            context.setVariable("location", location != null ? location : "Unknown Location");
            context.setVariable("userAgent", userAgent != null ? userAgent : "Unknown Browser");
            context.setVariable("role", user.getRole());
            context.setVariable("currentYear", LocalDateTime.now().getYear());
            context.setVariable("securityLink", "http://localhost:3000/settings/security");

            String htmlContent = templateEngine.process("email/login-alert", context);
            sendEmail(user.getEmail(), "🔐 New Login to Your TALENTX Account", htmlContent);
        } catch (Exception e) {
            System.err.println("Failed to send login alert: " + e.getMessage());
        }
    }

    // ============================================================
    // 3. PASSWORD RESET EMAIL
    // ============================================================

    public void sendPasswordResetOtp(User user, String otp, String resetLink) {
        try {
            Context context = new Context(Locale.ENGLISH);
            context.setVariable("userName", user.getFullName());
            context.setVariable("userEmail", user.getEmail());
            context.setVariable("otpCode", otp);
            context.setVariable("resetLink", resetLink != null ? resetLink : "http://localhost:3000/auth/reset-password?otp=" + otp);
            context.setVariable("expiryMinutes", 10);
            context.setVariable("currentYear", LocalDateTime.now().getYear());

            String htmlContent = templateEngine.process("email/reset-password", context);
            sendEmail(user.getEmail(), "🔑 Reset Your TALENTX Password", htmlContent);
        } catch (Exception e) {
            System.err.println("Failed to send reset OTP: " + e.getMessage());
        }
    }

    // ============================================================
    // 4. PROJECT & MILESTONE EMAILS
    // ============================================================

    public void sendMilestoneApproval(User freelancer, Project project, Milestone milestone, double releasedAmount) {
        try {
            Context context = new Context(Locale.ENGLISH);
            context.setVariable("freelancerName", freelancer.getFullName());
            context.setVariable("projectTitle", project.getTitle());
            context.setVariable("milestoneTitle", milestone.getTitle());
            context.setVariable("amount", String.format("$%.2f", releasedAmount));
            context.setVariable("totalBudget", String.format("$%.2f", project.getTotalBudget()));
            context.setVariable("projectStatus", project.getStatus());
            context.setVariable("currentYear", LocalDateTime.now().getYear());
            context.setVariable("projectLink", "http://localhost:3000/candidate/projects/" + project.getId());

            String htmlContent = templateEngine.process("email/milestone-approved", context);
            sendEmail(freelancer.getEmail(), "✅ Milestone Approved – $" + String.format("%.2f", releasedAmount) + " Released!", htmlContent);
        } catch (Exception e) {
            System.err.println("Failed to send milestone approval: " + e.getMessage());
        }
    }

    public void sendMilestoneCreated(User freelancer, Project project, Milestone milestone) {
        try {
            Context context = new Context(Locale.ENGLISH);
            context.setVariable("freelancerName", freelancer.getFullName());
            context.setVariable("projectTitle", project.getTitle());
            context.setVariable("milestoneTitle", milestone.getTitle());
            if (milestone.getDeadline() != null) {
                context.setVariable("deadline", milestone.getDeadline().toString()); // Simple format
            } else {
                context.setVariable("deadline", "TBD");
            }
            context.setVariable("weight", String.format("%.0f%%", milestone.getMonetaryWeight() * 100));
            context.setVariable("currentYear", LocalDateTime.now().getYear());

            String htmlContent = templateEngine.process("email/milestone-created", context);
            sendEmail(freelancer.getEmail(), "📋 New Milestone: " + milestone.getTitle(), htmlContent);
        } catch (Exception e) {
            System.err.println("Failed to send milestone created: " + e.getMessage());
        }
    }

    public void sendEscrowRelease(User employer, User freelancer, Project project, double amount) {
        try {
            Context context = new Context(Locale.ENGLISH);
            context.setVariable("employerName", employer.getFullName());
            context.setVariable("freelancerName", freelancer.getFullName());
            context.setVariable("projectTitle", project.getTitle());
            context.setVariable("amount", String.format("$%.2f", amount));
            context.setVariable("currentYear", LocalDateTime.now().getYear());

            String htmlContent = templateEngine.process("email/escrow-release", context);
            sendEmail(employer.getEmail(), "💰 Escrow Released: " + String.format("$%.2f", amount), htmlContent);
        } catch (Exception e) {
            System.err.println("Failed to send escrow release: " + e.getMessage());
        }
    }

    // ============================================================
    // 5. CHALLENGE EMAILS
    // ============================================================

    public void sendChallengePosted(User employer, Challenge challenge) {
        try {
            Context context = new Context(Locale.ENGLISH);
            context.setVariable("employerName", employer.getFullName());
            context.setVariable("challengeTitle", challenge.getTitle());
            context.setVariable("challengeDescription", challenge.getDescription());
            context.setVariable("prizeAmount", String.format("$%.2f", challenge.getPrizeAmount()));
            if (challenge.getDeadline() != null) {
                context.setVariable("deadline", challenge.getDeadline().toString()); // Simple format
            } else {
                context.setVariable("deadline", "TBD");
            }
            context.setVariable("currentYear", LocalDateTime.now().getYear());

            String htmlContent = templateEngine.process("email/challenge-posted", context);
            sendEmail(employer.getEmail(), "📢 Challenge Posted: " + challenge.getTitle(), htmlContent);
        } catch (Exception e) {
            System.err.println("Failed to send challenge posted: " + e.getMessage());
        }
    }

    public void sendChallengeWinner(User candidate, Challenge challenge, double prizeAmount) {
        try {
            Context context = new Context(Locale.ENGLISH);
            context.setVariable("candidateName", candidate.getFullName());
            context.setVariable("challengeTitle", challenge.getTitle());
            context.setVariable("challengeDescription", challenge.getDescription());
            context.setVariable("prizeAmount", String.format("$%.2f", prizeAmount));
            context.setVariable("employerName", challenge.getEmployerId()); // Replace with actual employer name
            context.setVariable("currentYear", LocalDateTime.now().getYear());
            context.setVariable("challengeLink", "http://localhost:3000/candidate/challenges");

            String htmlContent = templateEngine.process("email/challenge-winner", context);
            sendEmail(candidate.getEmail(), "🏆 You Won the " + challenge.getTitle() + " Challenge!", htmlContent);
        } catch (Exception e) {
            System.err.println("Failed to send challenge winner: " + e.getMessage());
        }
    }

    public void sendChallengeSubmissionReceived(User candidate, Challenge challenge) {
        try {
            Context context = new Context(Locale.ENGLISH);
            context.setVariable("candidateName", candidate.getFullName());
            context.setVariable("challengeTitle", challenge.getTitle());
            context.setVariable("currentYear", LocalDateTime.now().getYear());

            String htmlContent = templateEngine.process("email/submission-received", context);
            sendEmail(candidate.getEmail(), "📥 Submission Received: " + challenge.getTitle(), htmlContent);
        } catch (Exception e) {
            System.err.println("Failed to send submission received: " + e.getMessage());
        }
    }

    // ============================================================
    // 6. INVITATION EMAILS
    // ============================================================

    public void sendInvitationEmail(User employer, User candidate, Opportunity opportunity, double matchScore) {
        try {
            Context context = new Context(Locale.ENGLISH);
            context.setVariable("employerName", employer.getFullName());
            context.setVariable("companyName", employer.getCompanyName() != null ? employer.getCompanyName() : employer.getFullName());
            context.setVariable("candidateName", candidate.getFullName());
            context.setVariable("opportunityTitle", opportunity.getTitle());
            context.setVariable("matchScore", String.format("%.0f%%", matchScore));
            context.setVariable("budget", String.format("$%.2f", opportunity.getBudget()));
            context.setVariable("currentYear", LocalDateTime.now().getYear());
            context.setVariable("inviteLink", "http://localhost:3000/candidate/matches");

            String htmlContent = templateEngine.process("email/invitation", context);
            sendEmail(candidate.getEmail(), "📨 " + employer.getFullName() + " wants to work with you!", htmlContent);
        } catch (Exception e) {
            System.err.println("Failed to send invitation: " + e.getMessage());
        }
    }

    // ============================================================
    // 7. DISPUTE EMAILS
    // ============================================================

    public void sendDisputeRaised(User raiser, Dispute dispute, Project project) {
        try {
            Context context = new Context(Locale.ENGLISH);
            context.setVariable("raiserName", raiser.getFullName());
            context.setVariable("projectTitle", project.getTitle());
            context.setVariable("disputeReason", dispute.getType()); // Using type for reason based on model
            context.setVariable("disputeDescription", dispute.getDescription());
            context.setVariable("currentYear", LocalDateTime.now().getYear());

            String htmlContent = templateEngine.process("email/dispute-raised", context);
            sendEmail(raiser.getEmail(), "⚖️ Dispute Raised for " + project.getTitle(), htmlContent);
        } catch (Exception e) {
            System.err.println("Failed to send dispute raised: " + e.getMessage());
        }
    }

    public void sendDisputeResolved(User raiser, User opponent, Dispute dispute, Project project, String resolution) {
        try {
            Context context = new Context(Locale.ENGLISH);
            context.setVariable("projectTitle", project.getTitle());
            context.setVariable("disputeReason", dispute.getType());
            context.setVariable("resolution", resolution);
            context.setVariable("currentYear", LocalDateTime.now().getYear());

            String htmlContent = templateEngine.process("email/dispute-resolved", context);
            sendEmail(raiser.getEmail(), "✅ Dispute Resolved: " + project.getTitle(), htmlContent);
            sendEmail(opponent.getEmail(), "✅ Dispute Resolved: " + project.getTitle(), htmlContent);
        } catch (Exception e) {
            System.err.println("Failed to send dispute resolved: " + e.getMessage());
        }
    }

    // ============================================================
    // 8. ADMIN NOTIFICATION EMAILS
    // ============================================================

    public void sendVerificationRequested(User admin, User user, String verificationType, String evidence) {
        try {
            Context context = new Context(Locale.ENGLISH);
            context.setVariable("adminName", admin.getFullName());
            context.setVariable("userName", user.getFullName());
            context.setVariable("userEmail", user.getEmail());
            context.setVariable("verificationType", verificationType);
            context.setVariable("evidence", evidence);
            context.setVariable("currentYear", LocalDateTime.now().getYear());
            context.setVariable("verifyLink", "http://localhost:3000/admin/verifications");

            String htmlContent = templateEngine.process("email/verification-requested", context);
            sendEmail(admin.getEmail(), "🛂 Verification Request from " + user.getFullName(), htmlContent);
        } catch (Exception e) {
            System.err.println("Failed to send verification request: " + e.getMessage());
        }
    }

    public void sendVerificationApproved(User user, String verificationType) {
        try {
            Context context = new Context(Locale.ENGLISH);
            context.setVariable("userName", user.getFullName());
            context.setVariable("verificationType", verificationType);
            context.setVariable("currentYear", LocalDateTime.now().getYear());

            String htmlContent = templateEngine.process("email/verification-approved", context);
            sendEmail(user.getEmail(), "✅ Verification Approved: " + verificationType, htmlContent);
        } catch (Exception e) {
            System.err.println("Failed to send verification approved: " + e.getMessage());
        }
    }

    // ============================================================
    // 9. GENERIC EMAIL SENDER
    // ============================================================

    private void sendEmail(String to, String subject, String htmlContent) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);
            mailSender.send(message);
            System.out.println("✅ Email sent to: " + to + " | Subject: " + subject);
        } catch (Exception e) {
            System.err.println("❌ Failed to send email to: " + to + " - " + e.getMessage());
        }
    }
}
