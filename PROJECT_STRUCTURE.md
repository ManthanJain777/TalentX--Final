# TalentX Project Structure & File Purpose Documentation

This document provides a comprehensive overview of the directories and files within the TalentX project, explaining their purpose and how they fit into the overall architecture.

## Root Directory (`e:\TalentX\`)

*   **`PROJECT_DOCUMENTATION.md`**: The master project documentation detailing the system architecture, features, API strategy, and ER/DFD diagrams.
*   **`MASTER_PROMPT.md`**: A context-setting prompt designed for AI agents or new developers to quickly understand the project state, structure, and current goals.
*   **`TALENTX_Project_Documentation_Final.docx` / `TalentX_Final.pdf`**: Original project specification documents provided by the stakeholders.
*   **`start-talentx.ps1`**: A PowerShell script to quickly launch both the frontend (Vite/React) and backend (Spring Boot) servers simultaneously for local development.
*   **`styles.css` / `main.js` / `talentx_final_homepage.html`**: Static assets for a standalone landing page mockup (separate from the main React app).

---

## Backend (`e:\TalentX\backend\`)
The backend is a Spring Boot application connecting to MongoDB, providing RESTful APIs for the frontend.

*   **`pom.xml`**: Maven configuration file defining backend dependencies (Spring Web, Spring Data MongoDB, Spring Security, JWT, etc.).

### `src/main/java/com/talentx/`
The core Java source code package.

#### `controller/`
Exposes REST API endpoints.
*   **`AuthController.java`**: Handles `/api/auth/register` and `/login` for user authentication.
*   **`ProjectController.java`**: Manages project creation, fetching, and listing (`/api/projects`).
*   **`ChallengeController.java` / `ChallengeSubmissionController.java`**: Manages employer challenges and candidate submissions (`/api/challenges`).
*   **`DisputeController.java`**: Handles conflict resolution endpoints (`/api/disputes`).
*   **`AdminController.java`**: Exposes platform analytics and audit logs (`/api/admin`).
*   *(Other controllers: `PassportController`, `OpportunityController`, `DiscoveryController`, `MatchingController`, `MessageController`, `MilestoneController`, `EscrowController`, `DeliverableController`)*

#### `service/`
Contains core business logic.
*   **`AuthService.java`**: Password hashing, user validation, and JWT generation.
*   **`ProjectService.java`**: Logic for project lifecycle, milestones, and status updates.
*   **`MatchingService.java`**: The algorithmic engine calculating candidate-opportunity match scores.
*   *(Other services map 1-to-1 with controllers to handle business rules)*

#### `repository/`
Interfaces extending `MongoRepository` for database operations.
*   **`UserRepository.java`**, **`ProjectRepository.java`**, **`ChallengeRepository.java`**, etc.: Handle CRUD operations against MongoDB collections.

#### `model/`
Defines the NoSQL document schemas.
*   **`User.java`**: Represents candidates, employers, and admins.
*   **`Project.java` / `Milestone.java`**: Represents governed work contracts.
*   **`Challenge.java` / `ChallengeSubmission.java`**: Represents bounty tasks.
*   **`Dispute.java` / `AuditLog.java`**: Represents governance and logging data.

#### `security/`
Security configurations.
*   **`JwtService.java`**: Utility for generating and validating JWTs.
*   **`JwtAuthenticationFilter.java`**: Intercepts requests to validate the `Authorization` header.
*   **`SecurityConfig.java`**: Defines public vs. secured endpoints and CORS policy.

#### `dto/`
Data Transfer Objects for request/response payloads to avoid exposing internal models.
*   Contains requests (e.g., `RegisterRequest`) and responses.

---

## Frontend (`e:\TalentX\frontend\`)
The frontend is a React 18 application built with Vite, utilizing Tailwind CSS for styling and Framer Motion for animations.

*   **`package.json`**: Defines npm dependencies (React, React Router, Axios, Tailwind, Framer Motion, Recharts) and build scripts.
*   **`tailwind.config.js` / `postcss.config.js`**: Configuration for Tailwind CSS utility classes.
*   **`vite.config.js`**: Vite bundler configuration.

### `src/`
The core React source code.

*   **`App.jsx`**: The root component that sets up the Router, AuthProvider, and Notification Toaster.
*   **`main.jsx`**: The entry point that mounts the React application to the DOM.
*   **`index.css`**: Global CSS imports, including Tailwind directives.

#### `api/`
*   **`api.js`**: The globally configured Axios instance. It includes interceptors to attach the JWT token to outgoing requests and handles global API errors.

#### `contexts/` & `hooks/`
*   **`AuthContext.jsx` / `useAuth.js`**: Manages global authentication state, login/logout functions, and the current user object.

#### `routes/`
*   **`AppRoutes.jsx`**: Defines all public and protected application routes.
*   **`ProtectedRoute.jsx`**: A wrapper component that redirects unauthenticated users to the login page.

#### `pages/`
High-level route views.
*   **`Home.jsx` / `Landing.jsx`**: The public landing page explaining the platform.
*   **`Login.jsx` / `Register.jsx`**: Authentication pages.
*   **`CandidateRoutes.jsx` / `EmployerRoutes.jsx` / `AdminRoutes.jsx`**: Nested route layouts for different user roles.

#### `components/`
Reusable React components, organized by feature module.

##### `components/candidate/`
*   **`Dashboard.jsx`**: Candidate overview.
*   **`TalentPassport.jsx` / `PassportEdit.jsx`**: Views and forms for managing the verifiable resume.
*   **`BrowseChallenges.jsx` / `ChallengeDetail.jsx`**: Interfaces for finding and participating in Employer Challenges.
*   **`Projects.jsx` / `ProjectDetail.jsx`**: Tracking active governed projects.
*   **`Matches.jsx` / `MatchDetail.jsx`**: Viewing AI-driven opportunity matches.

##### `components/employer/`
*   **`Dashboard.jsx`**: Employer overview.
*   **`Discovery.jsx`**: The search engine interface to find candidates.
*   **`ManageChallenges.jsx` / `PostChallenge.jsx`**: Interface for creating bounties.
*   **`Projects.jsx` / `ProjectDetail.jsx`**: Tracking active projects and milestone approvals.
*   **`NewOpportunity.jsx`**: Posting a new job/opportunity.

##### `components/admin/`
*   **`Dashboard.jsx` / `Analytics.jsx` / `AdminStats.jsx`**: Platform-wide metrics and charts.
*   **`Audit.jsx`**: Viewing the immutable audit log of sensitive actions.
*   **`Disputes.jsx` / `DisputeRoom.jsx`**: Interfaces for arbitrating conflicts between users.
*   **`Verifications.jsx`**: Interface for reviewing candidate evidence (e.g., GitHub, ID).

##### `components/project/`
Shared components for post-match governance.
*   **`ContractViewer.jsx`**: Displays the active agreement.
*   **`MilestoneTracker.jsx`**: Lists milestones and their completion status.
*   **`EscrowVault.jsx`**: Displays locked/released funds.
*   **`DeliverableManager.jsx`**: Interface for uploading and reviewing work.

##### `components/ui/` & `components/common/`
Generic, reusable UI elements.
*   **`Button.jsx`, `Input.jsx`, `Badge.jsx`, `Table.jsx`, `Modal.jsx`, `LoadingSpinner.jsx`, `GlassCard.jsx`**: Core design system components styled with Tailwind CSS.

---

## Database (`e:\TalentX\database\`)
Database management scripts.

*   **`seed/seed.js`**: A Node.js script to populate the local MongoDB instance with initial test data (users, projects, challenges, etc.).
*   **`indexes/create-indexes.js`**: MongoDB script to establish performance indexes on frequently queried fields.
