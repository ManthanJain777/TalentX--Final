const pptxgen = require('pptxgenjs');

async function createPresentation() {
    let pres = new pptxgen();
    pres.layout = 'LAYOUT_WIDE'; // 13.33 x 7.5 inches

    // Colors
    const NAVY = "0A1931";
    const IVORY = "FDFBF7";
    const TEAL = "005C53";
    const GOLD = "C5A059";
    const TEXT_DARK = "1A202C";
    const TEXT_LIGHT = "FDFBF7";
    const GREY = "718096";

    // Setup master slides (optional, but we'll style per slide for maximum control)
    
    // ---------------------------------------------------------
    // SLIDE 1: THE ARRIVAL
    // ---------------------------------------------------------
    let slide1 = pres.addSlide();
    slide1.background = { color: NAVY };
    // Abstract geometric background lines
    slide1.addShape(pres.ShapeType.line, { x: 0, y: 3.75, w: 13.33, h: 0, line: { color: TEAL, width: 1, transparency: 50 } });
    slide1.addShape(pres.ShapeType.line, { x: 6.66, y: 0, w: 0, h: 7.5, line: { color: TEAL, width: 1, transparency: 50 } });
    
    slide1.addText("TALENTX", { x: 0, y: 2.8, w: "100%", h: 1.5, align: "center", fontSize: 80, fontFace: "Arial", bold: true, color: IVORY, charSpacing: 10 });
    slide1.addText("From Talent Discovery to Trusted Delivery", { x: 0, y: 4.5, w: "100%", h: 0.5, align: "center", fontSize: 24, fontFace: "Calibri", color: TEAL, bold: true });
    
    slide1.addNotes("Welcome to the final presentation for TalentX. \n\nWhat you're going to see today is not just a match-making app, but an end-to-end governed workflow from finding talent to delivering verifiable outcomes.\n\n[Transition: Wait a moment for the minimalist title to settle, then advance]");

    // ---------------------------------------------------------
    // SLIDE 2: THE FRICTION
    // ---------------------------------------------------------
    let slide2 = pres.addSlide();
    slide2.background = { color: IVORY };
    slide2.addText("Talent matching is only the beginning.", { x: 1, y: 1, w: 11.33, h: 1, fontSize: 44, fontFace: "Arial", bold: true, color: NAVY });
    
    // Draw the fragmented workflow
    const steps2 = ["DISCOVER", "MATCH", "PROJECT", "CHAT", "MILESTONES", "DELIVERY"];
    let xOffset = 1.5;
    steps2.forEach((step, i) => {
        slide2.addShape(pres.ShapeType.rect, { x: xOffset, y: 3.5, w: 1.4, h: 0.6, fill: { color: (i < 2 ? TEAL : "E2E8F0") }, rectRadius: 0.1 });
        slide2.addText(step, { x: xOffset, y: 3.5, w: 1.4, h: 0.6, align: "center", fontSize: 12, fontFace: "Arial", bold: true, color: (i < 2 ? IVORY : GREY), margin: 0 });
        
        if(i < steps2.length - 1) {
            slide2.addShape(pres.ShapeType.rightArrow, { x: xOffset + 1.45, y: 3.7, w: 0.2, h: 0.2, fill: { color: "CBD5E0" } });
            xOffset += 1.7;
        }
    });

    slide2.addText("Traditional platforms stop at the match. The actual work happens in a fragmented, unverified environment.", { x: 1, y: 5, w: 8, h: 1, fontSize: 18, fontFace: "Calibri", color: GREY });

    slide2.addNotes("The friction in today's gig economy isn't finding someone. It's what happens after the match.\n\nTraditional platforms match you and walk away. Chat happens on Slack, files on Drive, payments on PayPal. The experience is fragmented and disconnected.\n\n[Transition to idea]");

    // ---------------------------------------------------------
    // SLIDE 3: THE TALENTX IDEA
    // ---------------------------------------------------------
    let slide3 = pres.addSlide();
    slide3.background = { color: NAVY };
    slide3.addText("One continuous talent-to-outcome workflow.", { x: 1, y: 1, w: 11.33, h: 1, fontSize: 44, fontFace: "Arial", bold: true, color: IVORY });
    
    // Connected nodes
    const steps3 = ["DISCOVER", "MATCH", "BUILD", "TRACK", "DELIVER"];
    let startX3 = 1.5;
    
    // Connecting line
    slide3.addShape(pres.ShapeType.line, { x: 1.5, y: 4, w: 10, h: 0, line: { color: GOLD, width: 4 } });

    steps3.forEach((step, i) => {
        // Node
        slide3.addShape(pres.ShapeType.oval, { x: startX3 + (i * 2.5) - 0.4, y: 3.6, w: 0.8, h: 0.8, fill: { color: TEAL } });
        // Glowing outer ring
        slide3.addShape(pres.ShapeType.oval, { x: startX3 + (i * 2.5) - 0.6, y: 3.4, w: 1.2, h: 1.2, line: { color: TEAL, width: 2, transparency: 50 } });
        
        slide3.addText(step, { x: startX3 + (i * 2.5) - 1, y: 4.8, w: 2, h: 0.5, align: "center", fontSize: 14, fontFace: "Arial", bold: true, color: IVORY });
    });

    slide3.addNotes("TalentX solves this by pulling the entire lifecycle into one continuous, governed workflow.\n\nFrom the moment a candidate is discovered, through the match, the project workspace, milestone tracking, and final delivery—it all happens within a unified system backed by Spring Boot and MongoDB.");

    // ---------------------------------------------------------
    // SLIDE 4: WHO USES IT?
    // ---------------------------------------------------------
    let slide4 = pres.addSlide();
    slide4.background = { color: IVORY };
    
    // Three columns
    const roles = [
        { title: "CANDIDATE", color: TEAL, points: ["Verifiable Talent Passport", "AI-Scored Job Matches", "Submit Bounty Challenges", "Manage Deliverables"] },
        { title: "EMPLOYER", color: NAVY, points: ["Global Talent Discovery", "Skill-Based Search Engine", "Governance & Approvals", "Escrow Vault Control"] },
        { title: "ADMIN", color: GOLD, points: ["Platform Analytics (Recharts)", "Immutable Audit Logs", "Dispute Arbitration", "Identity Verification Queue"] }
    ];

    roles.forEach((role, i) => {
        let colX = 1 + (i * 3.9);
        // Card Background
        slide4.addShape(pres.ShapeType.rect, { x: colX, y: 1.5, w: 3.5, h: 5, fill: { color: "FFFFFF" }, line: { color: "E2E8F0", width: 1 }, shadow: { type: 'outer', color: '000000', opacity: 0.1, blur: 10, offset: 5, angle: 90 } });
        // Header Accent
        slide4.addShape(pres.ShapeType.rect, { x: colX, y: 1.5, w: 3.5, h: 0.1, fill: { color: role.color } });
        
        slide4.addText(role.title, { x: colX + 0.2, y: 2, w: 3.1, h: 0.5, fontSize: 24, fontFace: "Arial", bold: true, color: role.color });
        
        role.points.forEach((pt, j) => {
            slide4.addShape(pres.ShapeType.oval, { x: colX + 0.3, y: 2.8 + (j * 0.6) + 0.1, w: 0.1, h: 0.1, fill: { color: role.color } });
            slide4.addText(pt, { x: colX + 0.5, y: 2.8 + (j * 0.6), w: 2.8, h: 0.3, fontSize: 14, fontFace: "Calibri", color: TEXT_DARK, margin: 0 });
        });
    });

    slide4.addNotes("The platform serves three distinct roles, each with a tailored React interface and protected backend endpoints.\n\nCandidates prove their skills. Employers govern the work. Admins oversee the ecosystem with deep analytics and arbitration tools.");

    // ---------------------------------------------------------
    // SLIDE 5: THE PRODUCT (UI Mockup)
    // ---------------------------------------------------------
    let slide5 = pres.addSlide();
    slide5.background = { color: TEAL };
    
    // Abstract UI Browser frame
    slide5.addShape(pres.ShapeType.rect, { x: 1, y: 1, w: 11.33, h: 6, fill: { color: "FFFFFF" }, rectRadius: 0.1, shadow: { type: 'outer', color: '000000', opacity: 0.2, blur: 20, offset: 10, angle: 90 } });
    slide5.addShape(pres.ShapeType.rect, { x: 1, y: 1, w: 11.33, h: 0.4, fill: { color: "E2E8F0" }, rectRadius: 0.1 });
    // Browser dots
    slide5.addShape(pres.ShapeType.oval, { x: 1.2, y: 1.15, w: 0.1, h: 0.1, fill: { color: "F56565" } });
    slide5.addShape(pres.ShapeType.oval, { x: 1.4, y: 1.15, w: 0.1, h: 0.1, fill: { color: "ECC94B" } });
    slide5.addShape(pres.ShapeType.oval, { x: 1.6, y: 1.15, w: 0.1, h: 0.1, fill: { color: "48BB78" } });

    // UI Sidebar
    slide5.addShape(pres.ShapeType.rect, { x: 1, y: 1.4, w: 2, h: 5.6, fill: { color: NAVY } });
    slide5.addText("TALENTX", { x: 1.2, y: 1.7, w: 1.6, h: 0.3, fontSize: 14, fontFace: "Arial", bold: true, color: IVORY });
    slide5.addText("Dashboard\nPassport\nProjects\nMatches\nChallenges", { x: 1.2, y: 2.2, w: 1.6, h: 2, fontSize: 12, fontFace: "Calibri", color: "A0AEC0", lineSpacing: 24 });
    
    // UI Content
    slide5.addText("Candidate Passport", { x: 3.5, y: 1.8, w: 5, h: 0.5, fontSize: 24, fontFace: "Arial", bold: true, color: NAVY });
    
    // Profile Card
    slide5.addShape(pres.ShapeType.rect, { x: 3.5, y: 2.5, w: 8.33, h: 1.5, fill: { color: IVORY }, line: { color: "E2E8F0", width: 1 }, rectRadius: 0.1 });
    slide5.addShape(pres.ShapeType.oval, { x: 3.8, y: 2.75, w: 1, h: 1, fill: { color: GOLD } });
    slide5.addText("John Developer", { x: 5, y: 2.7, w: 4, h: 0.4, fontSize: 20, fontFace: "Arial", bold: true, color: NAVY });
    slide5.addText("Full Stack Engineer | React & Spring Boot\nTrust Score: 98%  |  Verified Skills: 12", { x: 5, y: 3.1, w: 5, h: 0.6, fontSize: 12, fontFace: "Calibri", color: GREY });

    // Skills Badges
    const skills = ["React 18", "Spring Boot 3", "MongoDB", "JWT Security"];
    skills.forEach((skill, i) => {
        slide5.addShape(pres.ShapeType.rect, { x: 3.5 + (i * 1.6), y: 4.3, w: 1.4, h: 0.4, fill: { color: "E6FFFA" }, line: { color: TEAL, width: 1 }, rectRadius: 0.2 });
        slide5.addText(skill, { x: 3.5 + (i * 1.6), y: 4.3, w: 1.4, h: 0.4, align: "center", fontSize: 11, fontFace: "Arial", bold: true, color: TEAL });
    });

    slide5.addNotes("This is a structural representation of the Candidate Passport.\n\nAll data is pulled live from the Spring Boot backend. There is zero mock data in the frontend. Notice how skills are verified and tied to a Trust Score—this feeds directly into the AI matching engine.");

    // ---------------------------------------------------------
    // SLIDE 6: THE ENGINE (Architecture)
    // ---------------------------------------------------------
    let slide6 = pres.addSlide();
    slide6.background = { color: NAVY };
    slide6.addText("Under the interface is a real system.", { x: 1, y: 0.5, w: 11.33, h: 1, fontSize: 36, fontFace: "Arial", bold: true, color: IVORY });

    // Architecture Nodes
    const archNodes = [
        { text: "React Frontend\n(Vite + Tailwind)", x: 2, y: 2.5, color: "2B6CB0" },
        { text: "Axios Interceptors\n(JWT Bearer)", x: 5.5, y: 2.5, color: "4A5568" },
        { text: "Spring Security\n(Stateless Auth)", x: 9, y: 2.5, color: TEAL },
        { text: "REST Controllers", x: 9, y: 4.5, color: "38B2AC" },
        { text: "Services & DAOs", x: 5.5, y: 4.5, color: "319795" },
        { text: "MongoDB\n(NoSQL Aggregations)", x: 2, y: 4.5, color: "2C7A7B" }
    ];

    // Connecting lines
    slide6.addShape(pres.ShapeType.rightArrow, { x: 4.2, y: 2.8, w: 1.1, h: 0.3, fill: { color: GOLD } });
    slide6.addShape(pres.ShapeType.rightArrow, { x: 7.7, y: 2.8, w: 1.1, h: 0.3, fill: { color: GOLD } });
    slide6.addShape(pres.ShapeType.downArrow, { x: 10, y: 3.6, w: 0.3, h: 0.7, fill: { color: GOLD } });
    slide6.addShape(pres.ShapeType.leftArrow, { x: 7.7, y: 4.8, w: 1.1, h: 0.3, fill: { color: GOLD } });
    slide6.addShape(pres.ShapeType.leftArrow, { x: 4.2, y: 4.8, w: 1.1, h: 0.3, fill: { color: GOLD } });

    archNodes.forEach(node => {
        slide6.addShape(pres.ShapeType.rect, { x: node.x, y: node.y, w: 2.2, h: 0.9, fill: { color: node.color }, rectRadius: 0.1 });
        slide6.addText(node.text, { x: node.x, y: node.y, w: 2.2, h: 0.9, align: "center", fontSize: 12, fontFace: "Arial", bold: true, color: IVORY, margin: 0 });
    });

    slide6.addNotes("This is the actual implemented architecture.\n\nThe React client uses Axios interceptors to inject JWT tokens into every request. The Spring Boot backend is strictly typed and validates tokens statelessly via Spring Security. Finally, custom DAOs execute complex MongoTemplate aggregations in MongoDB.\n\nLikely Question: Why MongoDB? Answer: The flexible schema is perfect for the highly varied structures of candidate resumes, external evidence, and dynamic matching data.");

    // ---------------------------------------------------------
    // SLIDE 7: SECURITY
    // ---------------------------------------------------------
    let slide7 = pres.addSlide();
    slide7.background = { color: "051024" }; // Deep dark
    slide7.addText("Authentication identifies.\nAuthorization protects.", { x: 1, y: 1, w: 10, h: 1.5, fontSize: 36, fontFace: "Arial", bold: true, color: GOLD });

    // Unauthorized path
    slide7.addShape(pres.ShapeType.rect, { x: 1, y: 3, w: 2, h: 0.6, fill: { color: "2D3748" } });
    slide7.addText("CANDIDATE A", { x: 1, y: 3, w: 2, h: 0.6, align: "center", fontSize: 12, color: IVORY, bold: true });
    
    slide7.addShape(pres.ShapeType.rightArrow, { x: 3.2, y: 3.15, w: 1.5, h: 0.3, fill: { color: "718096" } });
    
    slide7.addShape(pres.ShapeType.rect, { x: 4.9, y: 2.5, w: 2.5, h: 1.6, fill: { color: "E53E3E" }, rectRadius: 0.1, transparency: 80, line: { color: "E53E3E", width: 2 } });
    slide7.addText("FORBIDDEN\n403 IDOR Block", { x: 4.9, y: 2.5, w: 2.5, h: 1.6, align: "center", fontSize: 14, color: "FC8181", bold: true });
    
    slide7.addShape(pres.ShapeType.rect, { x: 7.8, y: 3, w: 3, h: 0.6, fill: { color: "2D3748" } });
    slide7.addText("EMPLOYER B'S PROJECT", { x: 7.8, y: 3, w: 3, h: 0.6, align: "center", fontSize: 12, color: IVORY, bold: true });

    // Authorized path
    slide7.addShape(pres.ShapeType.rect, { x: 1, y: 5.5, w: 2, h: 0.6, fill: { color: TEAL } });
    slide7.addText("PROJECT OWNER", { x: 1, y: 5.5, w: 2, h: 0.6, align: "center", fontSize: 12, color: IVORY, bold: true });
    
    slide7.addShape(pres.ShapeType.rightArrow, { x: 3.2, y: 5.65, w: 1.5, h: 0.3, fill: { color: TEAL } });
    
    slide7.addShape(pres.ShapeType.rect, { x: 4.9, y: 5, w: 2.5, h: 1.6, fill: { color: "38A169" }, rectRadius: 0.1, transparency: 80, line: { color: "38A169", width: 2 } });
    slide7.addText("OWNERSHIP\nVALIDATED", { x: 4.9, y: 5, w: 2.5, h: 1.6, align: "center", fontSize: 14, color: "9AE6B4", bold: true });
    
    slide7.addShape(pres.ShapeType.rect, { x: 7.8, y: 5.5, w: 3, h: 0.6, fill: { color: "2D3748" }, line: { color: TEAL, width: 2 } });
    slide7.addText("ACCESS GRANTED", { x: 7.8, y: 5.5, w: 3, h: 0.6, align: "center", fontSize: 12, color: TEAL, bold: true });

    slide7.addNotes("We designed the security layer to prevent IDOR (Insecure Direct Object Reference).\n\nLogging in is not enough. The backend explicitly checks if the Principal token 'owns' the requested resource before returning any data. This ensures Candidate A can never alter Employer B's project.");

    // ---------------------------------------------------------
    // SLIDE 8: REAL DATA
    // ---------------------------------------------------------
    let slide8 = pres.addSlide();
    slide8.background = { color: IVORY };
    slide8.addText("The interface is only the surface.", { x: 1, y: 0.5, w: 10, h: 1, fontSize: 36, fontFace: "Arial", bold: true, color: NAVY });

    // Grid of JSON-like data representations
    slide8.addShape(pres.ShapeType.rect, { x: 1, y: 2, w: 5, h: 4.5, fill: { color: "2D3748" }, rectRadius: 0.1 });
    slide8.addText("MongoDB Collection: projects", { x: 1.2, y: 2.2, w: 4.6, h: 0.3, fontSize: 12, fontFace: "Courier New", color: "A0AEC0", bold: true });
    slide8.addText("{\n  \"_id\": \"64fa...\",\n  \"title\": \"React Dashboard\",\n  \"employerId\": \"64fb...\",\n  \"status\": \"IN_PROGRESS\",\n  \"milestones\": [\n    {\n      \"title\": \"Phase 1\",\n      \"status\": \"APPROVED\",\n      \"escrowAmount\": 500\n    }\n  ]\n}", { x: 1.2, y: 2.6, w: 4.6, h: 3.5, fontSize: 14, fontFace: "Courier New", color: "68D391" });

    slide8.addText("REAL DATA.", { x: 7, y: 2.5, w: 4, h: 0.5, fontSize: 24, fontFace: "Arial", bold: true, color: TEAL });
    slide8.addText("REAL PERSISTENCE.", { x: 7, y: 3.5, w: 4, h: 0.5, fontSize: 24, fontFace: "Arial", bold: true, color: TEAL });
    slide8.addText("ZERO MOCKS.", { x: 7, y: 4.5, w: 4, h: 0.5, fontSize: 24, fontFace: "Arial", bold: true, color: NAVY });

    slide8.addNotes("Everything you see is powered by an active MongoDB instance.\n\nWe purged all mock data. The structure you see on the left is the exact Document model designed in Java, mapped to MongoDB, and serialized to JSON for the React frontend.");

    // ---------------------------------------------------------
    // SLIDE 9: THE WORKFLOW
    // ---------------------------------------------------------
    let slide9 = pres.addSlide();
    slide9.background = { color: IVORY };
    slide9.addText("From opportunity to outcome.", { x: 1, y: 0.5, w: 10, h: 1, fontSize: 36, fontFace: "Arial", bold: true, color: TEAL });

    const flow9 = ["Opportunity", "Candidate", "Project", "Milestones", "Deliverables", "Completion"];
    flow9.forEach((item, i) => {
        let isTop = i % 2 === 0;
        let yPos = isTop ? 2.5 : 4.5;
        let xPos = 1 + (i * 1.8);
        
        slide9.addShape(pres.ShapeType.rect, { x: xPos, y: yPos, w: 1.5, h: 0.8, fill: { color: NAVY }, rectRadius: 0.1 });
        slide9.addText(item, { x: xPos, y: yPos, w: 1.5, h: 0.8, align: "center", fontSize: 12, fontFace: "Arial", bold: true, color: IVORY });

        if(i < flow9.length - 1) {
            // Draw connector
            let nextY = !isTop ? 2.5 : 4.5;
            let nextX = 1 + ((i+1) * 1.8);
            slide9.addShape(pres.ShapeType.line, { x: xPos + 0.75, y: isTop ? yPos + 0.8 : yPos, w: nextX - xPos, h: nextY - yPos, line: { color: TEAL, width: 2 } });
        }
    });

    slide9.addNotes("This is the explicit state machine running in ProjectService.java.\n\nA Candidate matches an Opportunity, generating a Project. That project spawns Milestones, which receive Deliverables. Only when Deliverables are approved does the state reach Completion.");

    // ---------------------------------------------------------
    // SLIDE 10: THE ENGINEERING
    // ---------------------------------------------------------
    let slide10 = pres.addSlide();
    slide10.background = { color: NAVY };
    slide10.addText("The details matter.", { x: 1, y: 1, w: 10, h: 1, fontSize: 36, fontFace: "Arial", bold: true, color: GOLD });

    const engineeringDecisions = [
        { title: "Stateless JWT Auth", desc: "No session state overhead. Horizontally scalable." },
        { title: "DTO Contracts", desc: "Prevents mass-assignment vulnerabilities. Strictly shapes API traffic." },
        { title: "MongoTemplate Aggregations", desc: "Complex multi-stage queries for the discovery matching engine." },
        { title: "Server-Side State Validation", desc: "Client cannot force invalid state transitions on projects." }
    ];

    engineeringDecisions.forEach((dec, i) => {
        slide10.addText(dec.title, { x: 1, y: 2.5 + (i * 1.2), w: 4, h: 0.4, fontSize: 16, fontFace: "Arial", bold: true, color: TEAL });
        slide10.addText(dec.desc, { x: 5, y: 2.5 + (i * 1.2), w: 7, h: 0.4, fontSize: 14, fontFace: "Calibri", color: IVORY });
        slide10.addShape(pres.ShapeType.line, { x: 1, y: 3.1 + (i * 1.2), w: 11, h: 0, line: { color: "1A365D", width: 1 } });
    });

    slide10.addNotes("We approached this as a mature engineering project.\n\nWe implemented strict DTOs to stop mass assignment. We built stateless auth. We ensured that all state transitions—like approving a milestone—are validated entirely on the server, never trusting the client.");

    // ---------------------------------------------------------
    // SLIDE 11: THE HARD PART
    // ---------------------------------------------------------
    let slide11 = pres.addSlide();
    slide11.background = { color: IVORY };
    slide11.addText("What broke — and what we fixed.", { x: 1, y: 1, w: 11, h: 1, fontSize: 36, fontFace: "Arial", bold: true, color: NAVY });

    // Compare block
    slide11.addShape(pres.ShapeType.rect, { x: 1, y: 2.5, w: 4.5, h: 3, fill: { color: "FED7D7" }, rectRadius: 0.1 });
    slide11.addText("BEFORE", { x: 1, y: 2.6, w: 4.5, h: 0.4, align: "center", fontSize: 14, bold: true, color: "C53030" });
    slide11.addText("Authenticated ≠ Authorized\n\nUsers could potentially access endpoints they didn't own by manipulating route IDs.", { x: 1.2, y: 3.2, w: 4.1, h: 2, fontSize: 14, fontFace: "Calibri", color: "742A2A" });

    slide11.addShape(pres.ShapeType.rightArrow, { x: 6, y: 3.8, w: 1, h: 0.4, fill: { color: NAVY } });

    slide11.addShape(pres.ShapeType.rect, { x: 7.5, y: 2.5, w: 4.5, h: 3, fill: { color: "C6F6D5" }, rectRadius: 0.1 });
    slide11.addText("AFTER", { x: 7.5, y: 2.6, w: 4.5, h: 0.4, align: "center", fontSize: 14, bold: true, color: "276749" });
    slide11.addText("Ownership Validation\n\nCentralized SecurityService injected into every sensitive route to verify resource ownership.", { x: 7.7, y: 3.2, w: 4.1, h: 2, fontSize: 14, fontFace: "Calibri", color: "22543D" });

    slide11.addNotes("This demonstrates our commitment to security.\n\nEarly on, we realized passing a JWT only meant you were logged in, not that you owned the project you were editing. We refactored to implement resource-level ownership validation across the entire API surface.");

    // ---------------------------------------------------------
    // SLIDE 12: RESULTS
    // ---------------------------------------------------------
    let slide12 = pres.addSlide();
    slide12.background = { color: NAVY };
    slide12.addText("What TALENTX achieves.", { x: 1, y: 1, w: 10, h: 1, fontSize: 36, fontFace: "Arial", bold: true, color: IVORY });

    const achieves = [
        "Full-Stack Decoupled Architecture",
        "MongoDB-backed Persistence",
        "Role-aware Interfaces",
        "Security-hardened APIs",
        "Zero-Warning Strict Compilation",
        "Glassmorphic Responsive UI"
    ];

    achieves.forEach((text, i) => {
        let col = i < 3 ? 1 : 6.5;
        let row = i % 3;
        slide12.addShape(pres.ShapeType.rightTriangle, { x: col, y: 3 + (row * 1), w: 0.2, h: 0.2, fill: { color: GOLD }, rotate: 90 });
        slide12.addText(text, { x: col + 0.4, y: 2.9 + (row * 1), w: 5, h: 0.4, fontSize: 18, fontFace: "Arial", bold: true, color: TEAL });
    });

    slide12.addNotes("These are the verified technical results of our implementation phase. A fully decoupled, strict-compiled, security-hardened platform.");

    // ---------------------------------------------------------
    // SLIDE 13: WHY IT STANDS OUT
    // ---------------------------------------------------------
    let slide13 = pres.addSlide();
    slide13.background = { color: TEAL };
    slide13.addText("Built as a college project.\nEngineered like a serious system.", { x: 1, y: 2.5, w: 11.33, h: 2, align: "center", fontSize: 44, fontFace: "Arial", bold: true, color: IVORY });
    
    slide13.addText("Technical Depth • Connected Workflows • Real Security", { x: 1, y: 5, w: 11.33, h: 0.5, align: "center", fontSize: 16, fontFace: "Arial", bold: true, color: NAVY, charSpacing: 2 });

    slide13.addNotes("While this is a college project, we treated it as an exercise in rigorous engineering. We focused on the hard problems: security, persistence, and workflow state.");

    // ---------------------------------------------------------
    // SLIDE 14: CLOSING
    // ---------------------------------------------------------
    let slide14 = pres.addSlide();
    slide14.background = { color: IVORY };
    
    slide14.addText("TALENTX", { x: 1, y: 2, w: 11.33, h: 1, align: "center", fontSize: 60, fontFace: "Arial", bold: true, color: NAVY, charSpacing: 5 });
    slide14.addText("Discover. Build. Deliver.", { x: 1, y: 3.5, w: 11.33, h: 0.5, align: "center", fontSize: 20, fontFace: "Arial", bold: true, color: TEAL });
    
    slide14.addText("Questions?", { x: 1, y: 5.5, w: 11.33, h: 0.5, align: "center", fontSize: 14, fontFace: "Calibri", color: GREY });

    slide14.addNotes("Thank you. We are now open for questions.");

    // Write file
    await pres.writeFile({ fileName: "TALENTX_Cinematic_Faculty_Presentation.pptx" });
    console.log("Presentation generated successfully.");
}

createPresentation().catch(err => {
    console.error("Error generating presentation:", err);
});
