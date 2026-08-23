package com.talentx.config;

import com.talentx.model.User;
import com.talentx.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.time.Instant;

@Configuration
public class AdminSeeder {

    @Bean
    public CommandLineRunner seedAdminUser(
            UserRepository userRepository, 
            PasswordEncoder passwordEncoder
    ) {
        return args -> {
            String adminEmail = "admin@talentx.com";
            User admin = userRepository.findByEmail(adminEmail).orElseGet(User::new);
            
            admin.setEmail(adminEmail);
            admin.setPasswordHash(passwordEncoder.encode("admin123"));
            admin.setFullName("System Admin");
            admin.setRole("ADMIN");
            admin.setStatus("ACTIVE");
            admin.setVerified(true);
            admin.setDiscoverable(false);
            if (admin.getCreatedAt() == null) {
                admin.setCreatedAt(Instant.now());
            }
            admin.setUpdatedAt(Instant.now());
            
            userRepository.save(admin);
            System.out.println(">>> Admin user synchronized: email=" + adminEmail + ", password=admin123, role=ADMIN");
        };
    }
}
