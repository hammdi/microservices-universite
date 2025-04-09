FROM openjdk:17
LABEL maintainer="University Microservices Team"

WORKDIR /app

# Copy the JAR file
COPY target/*.jar app.jar

# Expose the port
EXPOSE 8099

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
