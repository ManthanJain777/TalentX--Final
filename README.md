# TalentX

TalentX is a full-stack verified talent marketplace built with React/Vite, Spring Boot, MongoDB and JWT authentication.

## Environment

Copy the example environment files and provide real values locally. Never commit credentials.

- Frontend: `frontend/.env.example`
- Backend: `backend/.env.example`

## Run

Backend: `cd backend && mvnw spring-boot:run`

Frontend: `cd frontend && npm install && npm run build && npm run start`

The frontend API endpoint is controlled by `VITE_API_URL`.
