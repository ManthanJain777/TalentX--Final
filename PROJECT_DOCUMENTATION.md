# TALENTX Complete Project Documentation

> **TALENTX** is a revolutionary AI-powered freelance marketplace explicitly designed to fix the broken talent acquisition model. Through verifiable skills, escrow-backed milestone governance, and multi-dimensional matchmaking, TalentX ensures that both candidates and employers thrive in a high-trust, decentralized-style ecosystem.

---

## 1. Problem Statement

* **Application black holes:** candidates can submit many applications without useful feedback.
* **Screening overload:** employers must sort large applicant pools.
* **Keyword filtering** can miss capable candidates.
* **Self-reported skills** lack strong evidence.
* **Candidates** have limited control over how and when employers discover them.

## 2. System Architecture

The TalentX platform is constructed as a modern, decoupled monolithic stack prioritizing performance, type safety, and real-time responsiveness.

### Tech Stack
* **Frontend:** React 18, Tailwind CSS, Framer Motion, Lucide Icons, Axios.
* **Backend:** Java 26.0.2, Spring Boot 3.x, Spring Security (Stateless JWT), Spring Data MongoDB.
* **Database:** MongoDB (NoSQL) for highly flexible, document-based data structures.
* **Authentication:** Stateless JWT stored securely on the client, passed via Authorization headers.

### File Dependency Flow
```
React Page
   ↓
React Component
   ↓
Service file (HTTP request)
   ↓
Spring Boot Controller
   ↓
DTO validation
   ↓
Service layer
   ↓
Repository
   ↓
MongoDB
```

---

## 3. Data Flow Diagram (DFD)

The following Mermaid diagram maps out the high-level Data Flow within the TALENTX system.

```mermaid
flowchart TD
    subgraph Candidate Flow
        C1[Candidate Registers] --> C2[Build Talent Passport]
        C2 --> C3[Verify Skills & GitHub]
        C3 --> C4[Set Visibility]
        C4 --> C5[Receive Match & Invite]
        C5 --> C6[Accept / Negotiate]
    end

    subgraph Employer Flow
        E1[Employer Registers] --> E2[Create Opportunity]
        E2 --> E3[Run Discovery Engine]
        E3 --> E4[View Match Explanations]
        E4 --> E5[Send Invitation]
        E5 --> E6[Create Project Contract]
    end

    subgraph Post-Match Governance
        P1[Define Milestones] --> P2[Fund Escrow]
        P2 --> P3[Deliverable Submission]
        P3 --> P4[Review & Approve]
        P4 --> P5[Release Payment]
        P4 -.->|Dispute| P6[Admin Resolution]
    end
    
    C6 --> P1
    E6 --> P1
```

---

## 4. Entity-Relationship (ER) Diagram

The following Mermaid diagram maps out the NoSQL document collections and their logical relationships within the system.

```mermaid
erDiagram
    USER ||--o{ PROJECT : "freelancer/employer"
    USER ||--o{ CHALLENGE : "employer"
    USER ||--o{ MATCH : "candidate"
    USER ||--o{ DISPUTE : "raises/defends"
    USER ||--o{ MESSAGE : "sends/receives"
    USER ||--o{ AUDIT_LOG : "triggers"

    PROJECT ||--o{ MILESTONE : "has"
    PROJECT ||--o{ DELIVERABLE : "has"
    PROJECT ||--|| ESCROW : "governs"
    PROJECT ||--o{ MESSAGE : "contains_chat"

    CHALLENGE ||--o{ SUBMISSION : "receives"

    USER {
        String id PK
        String email
        String password
        String role "CANDIDATE, EMPLOYER, ADMIN"
        Boolean isVerified
        String name
        String title
        List skills
    }

    PROJECT {
        String id PK
        String employerId FK
        String freelancerId FK
        String title
        String status "OPEN, ACTIVE, COMPLETED"
        Double totalBudget
        Integer healthScore
    }

    MILESTONE {
        String id PK
        String projectId FK
        String title
        Double weight
        Boolean completed
    }

    CHALLENGE {
        String id PK
        String employerId FK
        String title
        Double prizeAmount
        String status
        List skills
    }

    SUBMISSION {
        String id PK
        String challengeId FK
        String candidateId FK
        String status
    }

    MATCH {
        String id PK
        String candidateId FK
        String employerId FK
        Integer score
        String explanation
    }

    DISPUTE {
        String id PK
        String projectId FK
        String raisedBy FK
        String status "OPEN, UNDER_REVIEW, RESOLVED"
        String resolution
    }

    ESCROW {
        String id PK
        String projectId FK
        Double total
        Double released
        Double pending
    }
```

---

## 5. Core Modules & Features

### 5.1 Talent Module (Candidates)
* **Talent Passport:** A dynamic resume built from verified skills rather than static text.
* **Match Discovery:** Candidates receive AI-scored matches tailored to their specific skill weightings and preferences.
* **Challenge Participation:** Ability to complete micro-tasks posted by employers to earn day-1 revenue and prove technical capability.
* **Project Execution:** Milestone-driven task management ensuring payment is released sequentially as work is verified.

### 5.2 Employer Module
* **Discovery Engine:** Browse the global talent pool via complex MongoDB aggregations filtering by verified skills, availability, and trust scores.
* **Challenge Creation:** Post highly specific tasks (bounties) with escrowed prize pools to crowdsource solutions.
* **Project Governance:** Oversee active projects, review deliverables, and approve milestones to release funds from escrow.
* **Real-time Chat:** Communicate directly with candidates and freelancers inside project rooms.

### 5.3 Admin Module
* **Platform Analytics:** Real-time metrics on user growth, transaction volume, and platform health.
* **Dispute Resolution:** A specialized room to arbitrate conflicts between employers and freelancers regarding milestones or quality.
* **Verification Queue:** Manually review user identities, business registrations, and external skill certificates.
* **Audit Trails:** Immutable, cryptographically hashed logs tracking every sensitive action (escrow release, dispute resolution, user suspension).

---

## 6. API Endpoint Strategy

The backend follows a strict RESTful convention:

| Resource | Endpoints | Description |
|---|---|---|
| **Auth** | `/api/auth/register`, `/login` | Stateless JWT issuance. |
| **Users** | `/api/users/me`, `/api/users/{id}` | Profile and Talent Passport management. |
| **Projects** | `/api/projects`, `/api/projects/{id}` | Creation and tracking of governed projects. |
| **Milestones** | `/api/projects/{id}/milestones` | Milestone sub-resource management. |
| **Escrow** | `/api/projects/{id}/escrow` | Financial hold tracking per project. |
| **Challenges** | `/api/challenges`, `/api/challenges/{id}/submissions` | Micro-task bounty boards. |
| **Matches** | `/api/matches`, `/api/matches/candidate/{id}` | Algorithmic talent-employer matching. |
| **Disputes** | `/api/disputes`, `/api/disputes/{id}/resolve` | Arbitration and conflict resolution. |
| **Admin** | `/api/admin/audit`, `/api/admin/stats` | Global platform governance. |

---

## 7. Setup & Deployment

To run the full stack locally:

1. **Database:** Ensure MongoDB is connected via the provided MongoDB Atlas connection string with a database named `talentx`.
2. **Backend:** Navigate to `backend/` and execute `mvn clean install` followed by `mvn spring-boot:run`. The server will bind to `localhost:8080`.
3. **Frontend:** Navigate to `frontend/` and execute `npm install` followed by `npm run dev`. The React application will bind to the designated Vite/React port.

> [!TIP]
> Use the provided `start-talentx.ps1` script in the root directory to simultaneously launch both the frontend and backend with a single command.

---

*Documentation generated by Antigravity IDE (August 2026).*
