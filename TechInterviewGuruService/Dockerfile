FROM openjdk:21-jdk-oracle
RUN mkdir /app
COPY $CODEBUILD_SRC_DIR/asset*/target/TechInterviewGuruService-1.0.0.jar /app/app.jar
WORKDIR /app
RUN echo $(ls -ltr $CODEBUILD_SRC_DIR)
EXPOSE 8080
ENTRYPOINT java -jar app.jar