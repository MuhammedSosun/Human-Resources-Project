# JDK 17 ile başla
FROM eclipse-temurin:17-jdk-alpine

# Jar dosyasını container içine kopyala
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar

# Uygulamayı çalıştır
ENTRYPOINT ["java", "-jar", "/app.jar"]
