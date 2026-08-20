// database/indexes/create-indexes.js

// Connect to the specific database
const db = db.getSiblingDB('talentx');

print("Starting to create indexes...");

// Users
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ role: 1 });
print("Created indexes for users collection.");

// Talent Passports
db.talent_passports.createIndex({ userId: 1 }, { unique: true });
db.talent_passports.createIndex({ visibility: 1, availability: 1 });
db.talent_passports.createIndex({ "skills.name": 1, experienceYears: -1 });
print("Created indexes for talent_passports collection.");

// Opportunities
db.opportunities.createIndex({ employerId: 1 });
db.opportunities.createIndex({ "requiredSkills.name": 1, status: 1, createdAt: -1 });
print("Created indexes for opportunities collection.");

// Matches
db.matches.createIndex({ opportunityId: 1, candidateId: 1 }, { unique: true });
db.matches.createIndex({ totalScore: -1 });
print("Created indexes for matches collection.");

// Messages
db.messages.createIndex({ conversationId: 1, timestamp: -1 });
print("Created indexes for messages collection.");

// Projects
db.projects.createIndex({ matchId: 1 }, { unique: true });
print("Created indexes for projects collection.");

// Challenges
db.challenges.createIndex({ status: 1, deadline: 1 });
print("Created indexes for challenges collection.");

print("Index creation completed successfully!");
