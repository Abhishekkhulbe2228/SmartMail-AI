# Stage 1: Build the Spring Boot application using Maven
FROM eclipse-temurin:17-jdk-focal AS builder

# Set working directory
WORKDIR /app

# Copy Maven wrapper and pom.xml
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Give execution permission to Maven wrapper
RUN chmod +x mvnw

# Download dependencies first (better caching)
RUN ./mvnw dependency:go-offline

# Copy source code
COPY src src

# Build the application
RUN ./mvnw clean package -DskipTests

# Stage 2: Create lightweight runtime image
FROM eclipse-temurin:17-jre-focal

# Set working directory
WORKDIR /app

# Copy generated jar from builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose application port
EXPOSE 9090

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
