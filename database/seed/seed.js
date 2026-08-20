// ============================================
// TalentX MongoDB Seed Script
// Run: mongosh < seed.js
// ============================================

// Switch to talentx database
use('talentx');

// ─── Clean existing data ───
db.users.drop();
db.passports.drop();
db.opportunities.drop();
db.matches.drop();
db.projects.drop();
db.milestones.drop();
db.escrow_transactions.drop();
db.deliverables.drop();
db.challenges.drop();
db.submissions.drop();
db.disputes.drop();
db.messages.drop();
db.audit_logs.drop();

print('🗑️  Cleared all collections');

// ─── 1. Users ───
// BCrypt hash of "admin123" (pre-computed)
const adminHash = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';
// BCrypt hash of "password123"
const userHash = '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Fz4MBqlX.VTLj2HRYL3Gy';

const adminId = ObjectId();
const anikaId = ObjectId();
const jamesId = ObjectId();
const sarahId = ObjectId();
const techCorpId = ObjectId();
const cloudNovaId = ObjectId();
const dataFlowId = ObjectId();

db.users.insertMany([
    {
        _id: adminId,
        email: "admin@talentx.com",
        passwordHash: adminHash,
        fullName: "Admin User",
        role: "ADMIN",
        status: "ACTIVE",
        verified: true,
        discoverable: false,
        permissions: ["ALL"],
        createdAt: new Date()
    },
    {
        _id: anikaId,
        email: "anika@email.com",
        passwordHash: userHash,
        fullName: "Anika R.",
        role: "CANDIDATE",
        status: "ACTIVE",
        verified: true,
        headline: "Backend Engineer",
        location: "Bengaluru, IN",
        discoverable: true,
        createdAt: new Date()
    },
    {
        _id: jamesId,
        email: "james@email.com",
        passwordHash: userHash,
        fullName: "James K.",
        role: "CANDIDATE",
        status: "ACTIVE",
        verified: true,
        headline: "Full-Stack Developer",
        location: "Mumbai, IN",
        discoverable: true,
        createdAt: new Date()
    },
    {
        _id: sarahId,
        email: "sarah@email.com",
        passwordHash: userHash,
        fullName: "Sarah M.",
        role: "CANDIDATE",
        status: "ACTIVE",
        verified: false,
        headline: "DevOps Engineer",
        location: "Delhi, IN",
        discoverable: true,
        createdAt: new Date()
    },
    {
        _id: techCorpId,
        email: "tech@corp.com",
        passwordHash: userHash,
        fullName: "TechCorp",
        role: "EMPLOYER",
        status: "ACTIVE",
        verified: true,
        companyName: "TechCorp Inc.",
        industry: "Technology",
        createdAt: new Date()
    },
    {
        _id: cloudNovaId,
        email: "cloud@nova.com",
        passwordHash: userHash,
        fullName: "CloudNova",
        role: "EMPLOYER",
        status: "ACTIVE",
        verified: true,
        companyName: "CloudNova Solutions",
        industry: "Cloud Computing",
        createdAt: new Date()
    },
    {
        _id: dataFlowId,
        email: "data@flow.com",
        passwordHash: userHash,
        fullName: "DataFlow Labs",
        role: "EMPLOYER",
        status: "ACTIVE",
        verified: true,
        companyName: "DataFlow Labs Pvt Ltd",
        industry: "Data Engineering",
        createdAt: new Date()
    }
]);

print('✅ Inserted 7 users (1 admin, 3 candidates, 3 employers)');

// ─── 2. Passports ───
db.passports.insertMany([
    {
        userId: anikaId.toString(),
        headline: "Backend Engineer",
        location: "Bengaluru, IN",
        bio: "5+ years building scalable Java systems. Passionate about clean architecture and event-driven design.",
        skills: [
            { name: "Java", proficiency: "Expert", verified: true, verifiedBy: "platform" },
            { name: "Spring Boot", proficiency: "Expert", verified: true, verifiedBy: "platform" },
            { name: "React", proficiency: "Advanced", verified: true, verifiedBy: "platform" },
            { name: "MongoDB", proficiency: "Advanced", verified: true, verifiedBy: "platform" },
            { name: "AWS", proficiency: "Intermediate", verified: false }
        ],
        projects: [
            { title: "E-commerce API", description: "REST API with Spring Boot & JPA", link: "https://github.com/anika/ecommerce-api", technologies: ["Java", "Spring Boot", "MySQL"] },
            { title: "Event Streaming Platform", description: "Kafka-based real-time pipeline", link: "https://github.com/anika/kafka-streams", technologies: ["Java", "Kafka", "Docker"] },
            { title: "React Dashboard", description: "Admin dashboard with charts", link: "https://github.com/anika/react-dashboard", technologies: ["React", "TypeScript", "Recharts"] }
        ],
        certifications: [
            { name: "Oracle Java Certified Professional", issuer: "Oracle", dateObtained: "2024-06", verified: true },
            { name: "AWS Solutions Architect Associate", issuer: "Amazon", dateObtained: "2025-02", verified: true }
        ],
        assessments: [
            { name: "Java Algorithms", score: 92.0, provider: "HackerRank", dateCompleted: "2026-01" },
            { name: "System Design", score: 88.0, provider: "TalentX", dateCompleted: "2026-03" }
        ],
        availability: true,
        visibility: true,
        profileCompleteness: 95,
        createdAt: new Date()
    },
    {
        userId: jamesId.toString(),
        headline: "Full-Stack Developer",
        location: "Mumbai, IN",
        bio: "React + Node.js specialist. Love building beautiful UIs and robust APIs.",
        skills: [
            { name: "React", proficiency: "Expert", verified: true, verifiedBy: "platform" },
            { name: "Node.js", proficiency: "Expert", verified: true, verifiedBy: "platform" },
            { name: "TypeScript", proficiency: "Advanced", verified: false },
            { name: "PostgreSQL", proficiency: "Intermediate", verified: false }
        ],
        projects: [
            { title: "Social Media App", description: "Full-stack social platform", link: "https://github.com/james/social-app", technologies: ["React", "Node.js", "MongoDB"] }
        ],
        certifications: [
            { name: "Meta Front-End Developer", issuer: "Meta", dateObtained: "2025-08", verified: true }
        ],
        assessments: [
            { name: "React Proficiency", score: 95.0, provider: "TalentX", dateCompleted: "2026-05" }
        ],
        availability: true,
        visibility: true,
        profileCompleteness: 75,
        createdAt: new Date()
    }
]);

print('✅ Inserted 2 passports');

// ─── 3. Opportunities ───
const opp1Id = ObjectId();
const opp2Id = ObjectId();

db.opportunities.insertMany([
    {
        _id: opp1Id,
        employerId: techCorpId.toString(),
        title: "Senior Backend Engineer",
        description: "Looking for a Java/Spring Boot expert to build our microservices platform. Must have experience with event-driven architecture.",
        requiredSkills: ["Java", "Spring Boot", "MongoDB"],
        preferredSkills: ["Kafka", "Docker", "AWS"],
        budget: 15000,
        budgetType: "FIXED",
        status: "OPEN",
        experienceLevel: "SENIOR",
        location: "Bengaluru, IN",
        remote: true,
        deadline: new Date("2026-09-30"),
        createdAt: new Date()
    },
    {
        _id: opp2Id,
        employerId: cloudNovaId.toString(),
        title: "Full-Stack Developer",
        description: "Build a modern React dashboard connected to Node.js APIs for our cloud management platform.",
        requiredSkills: ["React", "Node.js", "TypeScript"],
        preferredSkills: ["AWS", "Docker"],
        budget: 10000,
        budgetType: "FIXED",
        status: "OPEN",
        experienceLevel: "MID",
        location: "Remote",
        remote: true,
        deadline: new Date("2026-10-15"),
        createdAt: new Date()
    }
]);

print('✅ Inserted 2 opportunities');

// ─── 4. Matches ───
const match1Id = ObjectId();

db.matches.insertOne({
    _id: match1Id,
    opportunityId: opp1Id.toString(),
    candidateId: anikaId.toString(),
    employerId: techCorpId.toString(),
    totalScore: 94.0,
    skillBreakdown: {
        skills: 95.0,
        projects: 88.0,
        assessments: 90.0,
        certifications: 85.0,
        profile: 100.0
    },
    explanation: "Strong match on Java, Spring Boot, MongoDB. 2 skill(s) are platform-verified. Extensive project portfolio with relevant technologies. Outstanding assessment performance (avg 90%). Relevant verified certifications. Complete profile with high availability.",
    status: "ACCEPTED",
    createdAt: new Date()
});

print('✅ Inserted 1 match');

// ─── 5. Project ───
const project1Id = ObjectId();

db.projects.insertOne({
    _id: project1Id,
    matchId: match1Id.toString(),
    employerId: techCorpId.toString(),
    freelancerId: anikaId.toString(),
    title: "Kafka Sharded Event Ingestion Engine",
    description: "Build a high-throughput event processing system using Kafka and Spring Boot",
    totalBudget: 14500,
    currency: "INR",
    status: "ACTIVE",
    healthScore: 70,
    createdAt: new Date()
});

print('✅ Inserted 1 project');

// ─── 6. Milestones ───
const m1Id = ObjectId();
const m2Id = ObjectId();
const m3Id = ObjectId();

db.milestones.insertMany([
    {
        _id: m1Id,
        projectId: project1Id.toString(),
        title: "Design Architecture",
        description: "System design document and architecture diagrams",
        deadline: new Date("2026-07-15"),
        monetaryWeight: 0.2,
        completed: true,
        completedAt: new Date("2026-07-14"),
        status: "APPROVED",
        order: 1
    },
    {
        _id: m2Id,
        projectId: project1Id.toString(),
        title: "Build Core Engine",
        description: "Implement Kafka consumers, producers, and shard management",
        deadline: new Date("2026-08-01"),
        monetaryWeight: 0.4,
        completed: true,
        completedAt: new Date("2026-07-30"),
        status: "APPROVED",
        order: 2
    },
    {
        _id: m3Id,
        projectId: project1Id.toString(),
        title: "Deploy & Test",
        description: "Deployment to AWS ECS, load testing, monitoring setup",
        deadline: new Date("2026-08-20"),
        monetaryWeight: 0.4,
        completed: false,
        status: "IN_PROGRESS",
        order: 3
    }
]);

print('✅ Inserted 3 milestones');

// ─── 7. Escrow ───
db.escrow_transactions.insertMany([
    {
        projectId: project1Id.toString(),
        milestoneId: m1Id.toString(),
        amount: 2900,
        currency: "INR",
        payerId: techCorpId.toString(),
        payeeId: anikaId.toString(),
        status: "RELEASED",
        platformFee: 580,
        releaseDate: new Date("2026-07-15"),
        transactionHash: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2",
        createdAt: new Date()
    },
    {
        projectId: project1Id.toString(),
        milestoneId: m2Id.toString(),
        amount: 5800,
        currency: "INR",
        payerId: techCorpId.toString(),
        payeeId: anikaId.toString(),
        status: "RELEASED",
        platformFee: 1160,
        releaseDate: new Date("2026-08-01"),
        transactionHash: "f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5",
        createdAt: new Date()
    },
    {
        projectId: project1Id.toString(),
        milestoneId: m3Id.toString(),
        amount: 5800,
        currency: "INR",
        payerId: techCorpId.toString(),
        payeeId: anikaId.toString(),
        status: "HELD",
        platformFee: 1160,
        transactionHash: "1a2b3c4d5e6f1a2b3c4d5e6f1a2b3c4d5e6f1a2b3c4d5e6f1a2b3c4d5e6f1a2b",
        createdAt: new Date()
    }
]);

print('✅ Inserted 3 escrow transactions');

// ─── 8. Challenge ───
const challenge1Id = ObjectId();

db.challenges.insertMany([
    {
        _id: challenge1Id,
        employerId: techCorpId.toString(),
        title: "Build a REST API with Spring Boot",
        description: "Create a RESTful API with Spring Boot, JPA, and MySQL. Must have CRUD operations and JWT authentication.",
        requiredSkills: ["Java", "Spring Boot", "SQL"],
        prizeAmount: 250,
        deadline: new Date("2026-08-25"),
        status: "OPEN",
        submissionCount: 3,
        winners: [],
        createdAt: new Date()
    },
    {
        employerId: cloudNovaId.toString(),
        title: "Design a React Component Library",
        description: "Build a reusable React component library with Storybook.",
        requiredSkills: ["React", "TypeScript"],
        prizeAmount: 150,
        deadline: new Date("2026-08-28"),
        status: "OPEN",
        submissionCount: 0,
        winners: [],
        createdAt: new Date()
    }
]);

print('✅ Inserted 2 challenges');

// ─── 9. Submissions ───
db.submissions.insertMany([
    {
        challengeId: challenge1Id.toString(),
        candidateId: anikaId.toString(),
        candidateName: "Anika R.",
        solutionUrl: "https://github.com/anika/springboot-rest-api",
        comments: "Implemented all CRUD operations with JWT auth and Swagger docs.",
        status: "PENDING",
        submittedAt: new Date()
    },
    {
        challengeId: challenge1Id.toString(),
        candidateId: jamesId.toString(),
        candidateName: "James K.",
        solutionUrl: "https://github.com/james/rest-api-solution",
        comments: "Added comprehensive test suite and Docker support.",
        status: "PENDING",
        submittedAt: new Date()
    },
    {
        challengeId: challenge1Id.toString(),
        candidateId: sarahId.toString(),
        candidateName: "Sarah M.",
        solutionUrl: "https://github.com/sarah/spring-api",
        comments: "Included Kafka integration for event streaming.",
        status: "PENDING",
        submittedAt: new Date()
    }
]);

print('✅ Inserted 3 submissions');

// ─── 10. Audit Logs ───
db.audit_logs.insertMany([
    {
        userId: adminId.toString(),
        userName: "Admin User",
        action: "USER_VERIFIED",
        entityType: "USER",
        entityId: anikaId.toString(),
        details: "Verified candidate Anika R.",
        hash: "abc123def456",
        timestamp: new Date()
    },
    {
        userId: techCorpId.toString(),
        userName: "TechCorp",
        action: "ESCROW_RELEASED",
        entityType: "ESCROW",
        entityId: "escrow-1",
        details: "Released ₹2,900 for milestone: Design Architecture",
        hash: "def789ghi012",
        timestamp: new Date()
    }
]);

print('✅ Inserted 2 audit logs');

// ─── Create indexes ───
db.users.createIndex({ email: 1 }, { unique: true });
db.passports.createIndex({ userId: 1 }, { unique: true });
db.matches.createIndex({ opportunityId: 1, totalScore: -1 });
db.projects.createIndex({ employerId: 1 });
db.projects.createIndex({ freelancerId: 1 });
db.challenges.createIndex({ status: 1 });
db.audit_logs.createIndex({ timestamp: -1 });

print('✅ Created indexes');
print('');
print('🚀 TalentX database seeded successfully!');
print('');
print('📋 Login Credentials:');
print('   Admin:     admin@talentx.com / admin123');
print('   Candidate: anika@email.com / password123');
print('   Employer:  tech@corp.com / password123');
