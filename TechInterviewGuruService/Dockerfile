FROM openjdk:21-jdk-oracle
RUN mkdir /app
COPY $CODEBUILD_SRC_DIR/asset*/target/TechInterviewGuruService-1.0.0.jar /app/app.jar
RUN echo $(pwd | ls -ltr)
WORKDIR /app
RUN echo $(pwd | ls -ltr)
EXPOSE 8080
ENTRYPOINT java -jar app.jar