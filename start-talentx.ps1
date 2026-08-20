# Start TalentX Backend and Frontend Automatically

Write-Host "Starting TalentX Application Environment..." -ForegroundColor Cyan

# 1. Start Spring Boot Backend on Port 8080
Write-Host "Booting Spring Boot Backend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; mvn spring-boot:run" -WindowStyle Normal

# Give the backend a few seconds to initialize
Start-Sleep -Seconds 5

# 2. Start React Frontend on Port 3000
Write-Host "Booting React Frontend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm start" -WindowStyle Normal

Write-Host "All services started! The backend is on port 8080 and the frontend is starting on port 3000." -ForegroundColor Green
