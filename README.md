<div align="center">
  <div style="width: 80px; height: 80px; border-radius: 50%; border: 3px solid #C7A868; display: inline-flex; align-items: center; justify-content: center; background: #111827; margin-bottom: 20px;">
    <div style="width: 16px; height: 16px; border-radius: 50%; background: #C7A868;"></div>
  </div>
  
  # TALENT<span style="color: #C7A868;">X</span>
  **The Proof-First Talent Ecosystem**

  [![React](https://img.shields.io/badge/React-18-blue.svg?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2-6DB33F.svg?style=for-the-badge&logo=spring)](https://spring.io/projects/spring-boot)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248.svg?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
</div>

<br/>

**TALENTX** is a revolutionary verified talent marketplace built to disrupt traditional hiring. By replacing subjective resumes with cryptographically backed **Talent Passports**, integrating **Milestone Escrow** contracts, and leveraging an **Explainable AI Matching Engine**, TALENTX connects elite engineering talent with premier employers in a zero-trust environment.

---

## 🌟 Core Architecture & Features

### 1. 🛡️ The Talent Passport (Proof-of-Work Identity)
The traditional resume is dead. In its place is the Talent Passport—a dynamic, immutable record of a candidate's actual capabilities.
*   **Verification Tiers:** Skills are not just listed; they are ranked by verification level (`SELF_REPORTED`, `PEER_REVIEWED`, `ASSESSED`, `PROVEN_IN_WORK`).
*   **Live Metrics:** Real-time calculation of verified sources (GitHub, authenticated certifications, on-platform project escrow completion).
*   **Encrypted Privacy:** Candidates have granular control over their discoverability, with sensitive data protected by AES-256 encryption.

### 2. 🧠 Explainable AI Matching Engine
Employers no longer rely on boolean keyword searches. 
*   **Contextual Matching:** The backend algorithm scores candidates based on weighted skill vectors, project success rates, and verification tiers.
*   **Explainability:** Employers see exactly *why* a candidate matched their opportunity (e.g., "94% Match: Strong overlap in Spring Boot & Microservices, proven through 3 escrowed projects").

### 3. 💼 Milestone Escrow System
For freelance or contract opportunities, TALENTX ensures fair play.
*   **Smart Milestones:** Projects are broken into funding milestones.
*   **Zero-Trust Funding:** Employers deposit funds; candidates execute the work. Funds are only released upon cryptographic approval by the employer.
*   **Automated Dispute Resolution:** Built-in mediation workflow for stalled milestones.

### 4. 🎨 "Beast Mode" UX/UI
A visually stunning, ultra-premium interface designed with the **Ivory, Gold, and Ink** palette.
*   **Glassmorphism & Aurora:** High-end aesthetic utilizing frosted glass panels and fluid gradient animations.
*   **Framer Motion:** Snappy, physics-based micro-interactions that make the platform feel alive.
*   **Cinematic Canvas:** Advanced 3D/Canvas hero sections utilizing React Bits and Three.js dependencies.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, Framer Motion, React Router DOM, Axios, Lucide React |
| **Backend** | Java 21, Spring Boot 3.2, Spring Security, Spring Data MongoDB, Thymeleaf (Email), JavaMailSender |
| **Database** | MongoDB Atlas (NoSQL) |
| **Security** | JWT (JSON Web Tokens), AES-256 Encryption, BCrypt Password Hashing |

---

## 🚀 Getting Started

### Prerequisites
Before you begin, ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v18+)
*   [Java 21](https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html)
*   [Maven](https://maven.apache.org/)
*   A [MongoDB Atlas](https://www.mongodb.com/) account (or local MongoDB instance)

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create your environment variables file:
   ```bash
   cp .env.example .env
   ```
3. **Configure `.env`**: Open the `.env` file and insert your MongoDB URI, a secure 32+ character `JWT_SECRET`, an exact 32-character `AES_SECRET`, and your SMTP email credentials.
4. Run the Spring Boot server:
   ```bash
   mvn spring-boot:run
   ```
   *The server will start on `http://localhost:8080`.*

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Create your environment variables file:
   ```bash
   cp .env.example .env
   ```
   *(Ensure `VITE_API_URL` points to your backend).*
3. Install dependencies:
   *Note: Due to advanced Three.js UI components, legacy peer dependencies are required.*
   ```bash
   npm install --legacy-peer-deps
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   *The application will be available at `http://localhost:3000` (or the port specified by Vite).*

---

## 📂 Project Structure

```text
TALENTX/
├── backend/
│   ├── src/main/java/com/talentx/
│   │   ├── config/       # Security & App Configurations (CORS, JWT)
│   │   ├── controller/   # REST API Endpoints
│   │   ├── dao/          # Data Access Objects (MongoDB abstractions)
│   │   ├── model/        # Domain Models (User, Passport, Match, etc.)
│   │   ├── service/      # Business Logic & Algorithms
│   │   └── security/     # JWT Filters & Authentication logic
│   └── src/main/resources/
│       └── templates/email/  # Premium HTML Email Templates
└── frontend/
    ├── src/
    │   ├── api/          # Axios interceptors and API services
    │   ├── components/   # Modular React components (Candidate, Employer, UI)
    │   ├── contexts/     # React Contexts (AuthContext)
    │   ├── pages/        # Main route views
    │   └── routes/       # React Router configurations & Protected Routes
    └── index.css         # Tailwind directives & global styling
```

---

## 🔒 Security Practices
*   **No Hardcoded Secrets:** All credentials, database URIs, and encryption keys are injected via `.env`.
*   **GitIgnored Configurations:** The `.env` files are strictly excluded from version control.
*   **State-less Auth:** Fully stateless JWT authentication prevents session hijacking and enables horizontal scaling.
*   **Encrypted PII:** Sensitive Personally Identifiable Information (PII) is encrypted at rest using AES-256 in the MongoDB database.

---
<div align="center">
  <i>Developed with an obsession for flawless user experience and robust security.</i>
</div>
