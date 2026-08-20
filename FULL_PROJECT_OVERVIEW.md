# TalentX Complete Project Overview & File Structure

This document is the definitive guide to the **TalentX** project. It outlines everything that has been implemented, the complete directory architecture, and the explicit purpose of every single file in the repository.

---

## 1. What Has Been Implemented So Far

The project has undergone a complete end-to-end integration and QA phase. The platform is robust, strictly typed, and operates directly against the local MongoDB database without relying on hardcoded mock data.

*   **Compiler-Driven Backend Refactor:**
    *   Strict Java 26.0.2 compiler flags were enforced to eliminate all `unchecked` warnings, rawtypes in the `MongoTemplate` usage, unused imports, and deprecated API calls.
    *   `Lombok` is strictly prohibited in this project. All getters, setters, and constructors are manually authored to maintain total compiler transparency.
    *   All DTOs, DAOs, Services, and Controllers are wired together cleanly with Spring Security.
*   **Frontend Mock Data Eradication:**
    *   Every single React component across the Candidate, Employer, and Admin portals was stripped of dummy hardcoded arrays (`mockAnalytics`, `mockProjects`, etc.).
    *   Components now use `useEffect` hooks and Axios to fetch live data from the backend APIs (e.g., `/api/admin/stats`, `/api/challenges`, `/api/projects`).
*   **Network Bridging & Interceptors:**
    *   An Axios instance (`src/api/api.js`) is globally configured with request/response interceptors to automatically retrieve and attach the JWT `authToken` from `localStorage`.
    *   Authentication is stateless. The backend validates the JWT and establishes a Security Context per request.
*   **Documentation & Scaffolding Cleanup:**
    *   All legacy `.bat` files and unused mock data scripts have been eradicated from the workspace.
    *   Comprehensive Data Flow Diagrams (DFD) and Entity-Relationship (ER) Diagrams were generated using Mermaid code based on the official project specifications.

---

## 2. Complete Folder Structure & File Purpose

Below is a detailed breakdown of the complete project folder, categorizing every file and its explicit purpose within the architecture.

### Root Level
The root directory holds the master documentation, scripts, and static assets.
*   **`PROJECT_DOCUMENTATION.md`**: Master business requirements, ER diagrams, and system flow.
*   **`PROJECT_STRUCTURE.md`**: High-level structural guide.
*   **`MASTER_PROMPT.md`**: Context-setting prompt for AI onboarding and state preservation.
*   **`start-talentx.ps1`**: PowerShell script to simultaneously boot the Vite React server and Maven Spring Boot server.
*   **`TALENTX_Project_Documentation_Final.docx` & `TalentX_Final.pdf`**: Official stakeholder project specification documents.
*   **`talentx_final_homepage.html`, `styles.css`, `main.js`**: Static HTML/JS landing page assets (separate from the main React application).

---

### Backend System (`e:\TalentX\backend\`)
The Spring Boot server running on port `8080`.

*   **`pom.xml`**: Maven dependency definitions (Spring Web, Spring Data MongoDB, Spring Security, JWT).

#### Core Application (`src/main/java/com/talentx/`)
*   **`TalentXApplication.java`**: The primary `main` method entry point that bootstraps the Spring Boot application.

#### Controllers (`controller/`)
Handles incoming HTTP REST requests and maps them to the correct service logic.
*   **`AdminController.java`**: Platform-wide metrics, system health, and audit logs.
*   **`AuthController.java`**: Handles registration and login, issuing stateless JWTs.
*   **`ChallengeController.java`**: Employer bounty task creation and listing endpoints.
*   **`DeliverableController.java`**: Handles uploads and versioning of project work.
*   **`DiscoveryController.java`**: Search API for employers querying the talent pool.
*   **`DisputeController.java`**: Conflict arbitration endpoints.
*   **`EscrowController.java`**: Handles locking and releasing funds tied to milestones.
*   **`MatchingController.java`**: Fetches algorithmically generated AI candidate matches.
*   **`MessageController.java`**: Handles in-platform chat and messaging.
*   **`MilestoneController.java`**: CRUD operations for project milestones.
*   **`PassportController.java`**: Management of a candidate's verifiable talent resume.
*   **`ProjectController.java`**: Manages governed work contracts between employers and candidates.

#### Services (`service/`)
Contains business logic, data validation, and orchestration between DAOs.
*   **`AuthService.java`**: Validates credentials, hashes passwords, and triggers JWT creation.
*   **`EmailService.java`**: Utility for dispatching transactional emails/notifications.
*   **`PassportService.java`**: Validates and updates talent evidence/skills.
*   **`ProjectService.java`**: Controls project state transitions and milestone tracking.

#### Data Access Objects (`dao/`)
Custom implementations extending repository queries for complex operations, specifically using `MongoTemplate` for aggregations.
*   **`BaseDao.java` / `BaseMongoDao.java`**: Generic abstractions for shared database logic.
*   **`ChallengeDao.java`, `DisputeDao.java`, `EscrowDao.java`, `MatchDao.java`, `MilestoneDao.java`, `PassportDao.java`, `ProjectDao.java`, `SubmissionDao.java`, `UserDao.java`**: Specific DAOs executing complex NoSQL aggregations beyond basic CRUD operations.

#### Repositories (`repository/`)
Spring Data MongoDB interfaces mapping directly to collections.
*   **`AuditRepository.java`, `ChallengeRepository.java`, `DeliverableRepository.java`, `DisputeRepository.java`, `EscrowRepository.java`, `MatchRepository.java`, `MessageRepository.java`, `MilestoneRepository.java`, `OpportunityRepository.java`, `PassportRepository.java`, `ProjectRepository.java`, `SubmissionRepository.java`, `UserRepository.java`**: Execute standard MongoDB CRUD commands without manual boilerplate.

#### Models (`model/`)
Plain Old Java Objects (POJOs) defining the schema for MongoDB documents.
*   **`AuditLog.java`**: Immutable record of sensitive actions.
*   **`Challenge.java` / `Submission.java`**: Bounty tasks and their solutions.
*   **`Deliverable.java`**: Versioned file submissions for a project.
*   **`Dispute.java`**: Record of project conflicts.
*   **`EscrowTransaction.java`**: Financial hold linked to a project.
*   **`Match.java`**: Algorithmic score and explanation linking candidate to opportunity.
*   **`Message.java`**: Chat log.
*   **`Milestone.java`**: Phased goal in a project.
*   **`Opportunity.java`**: Employer job posting.
*   **`Passport.java`**: Candidate's verifiable resume data.
*   **`Project.java`**: Governed contract state.
*   **`User.java`**: Global authentication identity (Admin, Employer, Candidate).

#### Data Transfer Objects (`dto/`)
Payload definitions ensuring clients only send/receive expected data formats.
*   **`RegisterRequest.java` / `LoginRequest.java`**: Auth payloads.
*   **`CreateProjectRequest.java`, `RegisterCandidateRequest.java`, `RegisterEmployerRequest.java`**: Specific creation payloads.
*   **`ApiResponse.java` / `JwtAuthenticationResponse.java`**: Standardized JSON response wrappers.

#### Matching Engine (`matching/`)
*   **`ExplanationBuilder.java`**: Generates human-readable text explaining *why* a candidate matched an opportunity.
*   **`MatchEngine.java`**: Orchestrates the matching sequence.
*   **`ScoreCalculator.java`**: Applies weights to verified skills vs self-reported skills to compute an AI score.

#### Security & Configuration (`security/` & `config/`)
*   **`CorsConfig.java`**: Whitelists frontend origins (e.g., localhost:5173).
*   **`MongoConfig.java`**: MongoDB connection mapping setup.
*   **`SecurityConfig.java`**: Disables CSRF (due to statelessness), defines secured endpoints, and registers JWT filters.
*   **`CustomUserDetailsService.java`**: Loads users from Mongo for Spring Security context.
*   **`JwtAuthenticationFilter.java`**: Extracts the Bearer token and verifies it on every request.
*   **`JwtUtil.java`**: Generates and parses JWT payloads.
*   **`UserPrincipal.java`**: Wraps the User model for Spring Security.

#### Exception Handling (`exception/`)
*   **`GlobalExceptionHandler.java`**: Catches exceptions across controllers and returns formatted HTTP error responses.
*   **`ResourceNotFoundException.java`**: Custom exception for missing entities (e.g., 404 Not Found).

#### Encryption (`encryption/`)
*   **`AesEncryptionService.java`**: Utility for encrypting sensitive strings at rest in MongoDB.

---

### Frontend System (`e:\TalentX\frontend\`)
The React 18 application running on Vite.

*   **`package.json`**: NPM dependencies (React, React-Router, Tailwind, Axios, Framer Motion, Recharts).
*   **`tailwind.config.js` / `postcss.config.js`**: Defines the utility-first CSS styling design system.
*   **`vite.config.js`**: Build tool configurations.

#### Core Source (`src/`)
*   **`main.jsx`**: Bootstraps React into the DOM `root`.
*   **`App.jsx`**: Initializes Context providers, routing, and global toast notifications.
*   **`index.css`**: Global stylesheet wrapping Tailwind directives.
*   **`App.css`**: Minor legacy component styling.

#### Contexts & Hooks (`contexts/` & `hooks/`)
*   **`AuthContext.jsx`**: Provides authentication state, user roles, and login/logout functions globally.
*   **`useAuth.js`**: Custom hook to easily consume the `AuthContext`.
*   **`useCounter.js` / `useScrollProgress.js`**: Animation and UI utility hooks used on the landing page.

#### Routes (`routes/` & `pages/`)
*   **`AppRoutes.jsx`**: Central routing table mapping URLs to page components.
*   **`ProtectedRoute.jsx`**: Higher Order Component enforcing login checks.
*   **`AdminRoutes.jsx`, `CandidateRoutes.jsx`, `EmployerRoutes.jsx`**: Nested route layouts securing role-specific areas.
*   **`Home.jsx`, `Landing.jsx`**: Entry-point landing views for public traffic.
*   **`Login.jsx`, `Register.jsx`, `ForgotPassword.jsx`**: Authentication pages.

#### API Configuration (`api/` or `services/`)
*(Note: If `api.js` exists directly in `src/` or `services/`, its purpose remains constant)*
*   **`api.js`**: Configured Axios instance with request interceptors to automatically append `Authorization: Bearer` headers.

#### Components (`components/`)
Highly modular React elements broken down by domain.

**Public & Landing Page (`components/landing/` & root `components/`)**
*   **`Hero.jsx` / `HeroSection.jsx`**: Main banner and call to action.
*   **`ProblemSection.jsx` / `HowItWorks.jsx` / `WhyTalentX.jsx`**: Explainer components detailing the value proposition.
*   **`MetricsCTA.jsx` / `StatsSection.jsx`**: Animated data counters.
*   **`TrustAndFooter.jsx` / `Footer.jsx` / `Navbar.jsx`**: Global navigation and footer elements.
*   **`ScrollVideo.jsx` / `ScrollScene.jsx`**: Interactive scroll-bound animations.

**Candidate Module (`components/candidate/`)**
*   **`Dashboard.jsx`**: At-a-glance metrics for the candidate.
*   **`TalentPassport.jsx` / `PassportEdit.jsx`**: Complete verifiable resume viewer and editor.
*   **`BrowseChallenges.jsx` / `ChallengeDetail.jsx`**: Hub for finding and submitting micro-task bounties.
*   **`Projects.jsx` / `ProjectDetail.jsx`**: Tracking active governed work contracts.
*   **`Matches.jsx` / `MatchDetail.jsx`**: Inspecting incoming AI employer matches and scores.
*   *(Sub-passport folders: `PassportBuilder.jsx`, `EvidenceTabs.jsx`, `PrivacyControls.jsx` handle granular resume editing)*.

**Employer Module (`components/employer/`)**
*   **`Dashboard.jsx`**: Employer metrics and active listings.
*   **`Discovery.jsx` / `DiscoveryFilters.jsx` / `CandidateCard.jsx`**: The search engine allowing employers to find verified talent.
*   **`PostChallenge.jsx` / `ManageChallenges.jsx`**: Interface for creating and overseeing bounties.
*   **`Projects.jsx` / `ProjectDetail.jsx`**: Oversight of active contracts and milestone approvals.
*   **`NewOpportunity.jsx` / `Opportunities.jsx`**: Standard job listing tools.

**Admin Module (`components/admin/`)**
*   **`Dashboard.jsx` / `Analytics.jsx`**: Platform health charts (built with Recharts).
*   **`Verifications.jsx` / `VerificationQueue.jsx`**: Approval queues for candidate ID and GitHub evidence.
*   **`Disputes.jsx` / `DisputeRoom.jsx` / `RulingMatrix.jsx`**: Arbitration interface for resolving contract conflicts.
*   **`Audit.jsx` / `AuditTable.jsx`**: Immutable logs of platform changes.
*   **`Users.jsx` / `UserDetails.jsx`**: Global user management.

**Project Governance (Shared) (`components/project/`)**
*   **`ContractViewer.jsx`**: Displays the active terms.
*   **`MilestoneTracker.jsx`**: Interactive checklist tracking phased goals.
*   **`EscrowVault.jsx`**: UI representing locked funds and payment releases.
*   **`DeliverableManager.jsx`**: Interface for uploading versioned work for approval.
*   **`ProjectChat.jsx`**: In-project messaging room.
*   **`HealthIndicator.jsx`**: Red/Yellow/Green status of the project timeline.

**Common/UI Base Components (`components/common/` & `components/ui/`)**
*   **`Button.jsx`, `Input.jsx`, `Badge.jsx`, `Table.jsx`, `Modal.jsx`, `Tabs.jsx`**: Primitive elements ensuring a unified UI design system across the app.
*   **`GlassCard.jsx` / `GlassMorphCard.jsx`**: Styled containers featuring the platform's glassmorphism aesthetic.
*   **`MatchScore.jsx` / `SkillBreakdown.jsx`**: Reusable elements displaying the AI matching results.
*   **`LoadingSpinner.jsx` / `ProgressBar.jsx`**: Feedback UI elements during async operations.

---

### Database (`e:\TalentX\database\`)
*   **`seed/seed.js`**: Node.js script used to generate dummy developers, employers, and test projects locally so the frontend has data to interact with.
*   **`indexes/create-indexes.js`**: MongoDB script to apply performance indexes to collections (e.g., `email`, `role`, `status`).
