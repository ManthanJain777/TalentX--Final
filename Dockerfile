# ==========================================
# Stage 1: Build the React/Vite Frontend
# ==========================================
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend

# Install dependencies first for better caching
COPY frontend/package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the frontend code and build
COPY frontend/ ./
RUN npm run build

# ==========================================
# Stage 2: Build the Spring Boot Backend
# ==========================================
FROM maven:3.9.6-eclipse-temurin-21-alpine AS backend-build
WORKDIR /app/backend

# Copy the pom.xml and download dependencies
COPY backend/pom.xml .
RUN mvn dependency:go-offline -B

# Copy the backend source code
COPY backend/src ./src

# Create the static directory and copy the built frontend from Stage 1
RUN mkdir -p src/main/resources/static
COPY --from=frontend-build /app/frontend/build/ ./src/main/resources/static/

# Package the Spring Boot application (skipping tests for faster deployment)
RUN mvn clean package -DskipTests

# ==========================================
# Stage 3: Run the Application
# ==========================================
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy the built JAR file from Stage 2
COPY --from=backend-build /app/backend/target/*.jar app.jar

# Expose the default Spring Boot port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
