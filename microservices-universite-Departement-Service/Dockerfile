FROM openjdk:17

WORKDIR /app

# Copy the JAR file
COPY target/DepartementMs-0.0.1-SNAPSHOT.jar app.jar

# Expose the port
EXPOSE 8086

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
