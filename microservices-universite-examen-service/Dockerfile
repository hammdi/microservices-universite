FROM openjdk:17
#LABEL authors="user"
COPY target/*.jar app.jar
EXPOSE 8069
ENTRYPOINT ["java", "-jar" , "app.jar"]