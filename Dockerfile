FROM eclipse-temurin:17-jdk-alpine
LABEL maintainer="University Microservices Team"

# Install curl for healthcheck
RUN apk add --no-cache curl

WORKDIR /app

# Copy the JAR file
COPY target/*.jar app.jar

# Create config directory
RUN mkdir /config

# Copy configuration files
COPY src/main/resources/*.properties /config/

# Expose the port
EXPOSE 8888

# Health check
HEALTHCHECK --interval=10s --timeout=5s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:8888/actuator/health || exit 1

# Run the application with native profile
ENTRYPOINT ["java", "-jar", "app.jar", "--spring.profiles.active=native"]
