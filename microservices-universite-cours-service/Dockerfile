FROM eclipse-temurin:17-jdk-focal
RUN apt-get update && apt-get install -y curl
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8094
ENTRYPOINT ["java", "-jar", "app.jar"]
