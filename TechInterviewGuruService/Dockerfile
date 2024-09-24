FROM openjdk:21-jdk-oracle
ARG JAR_FILE=target/*.jar
COPY $CODEBUILD_SRC_DIR/asset*/target/TechInterviewGuruService-1.0.0.jar ./app.jar
ENTRYPOINT java -jar ./app.jar