---
layout: engineering-education
status: publish
published: true
url: /running-a-multi-container-springboot-postgresql-application-with-docker-compose/
title: Running a Multi-container (Spring Boot and PostgreSQL) Application with Docker Compose
description: In this tutorial, you’ll learn how Docker Compose makes it easier to configure and run multiple Docker containers (Spring Boot and PostgreSQL) in a local environment.
author: divine-odazie
date: 2021-08-03T00:00:00-07:45
topics: [Containers]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/running-a-multi-container-springboot-postgresql-application-with-docker-compose/hero.jpg
    alt: Running a Multi-container Application with Docker Compose example image
---

Container technology has streamlined how we build, test and deploy software from our local environment to on-premise data centers and the cloud. 
<!--more-->
With the benefit of building applications with container technology, manually starting and stopping each container becomes tedious as we build multi-container applications. 

Docker Compose is a tool used in defining and running multi-container Docker applications. We use Docker Compose to replace the `run` commands that are repeatedly run on each container in a multi-container application. 

Using Docker Compose, we can simplify the running of multi-container applications to as little as two commands; `docker-compose up` and `docker-compose down`.

### Goal
In this tutorial, you’ll learn how Docker Compose makes it easier to configure and run multiple Docker containers in a local environment. For demo purposes, this tutorial will use a [Spring Boot](https://spring.io/projects/spring-boot) and [PostgreSQL](https://www.postgresql.org/) container.

### Prerequisites
- Basic knowledge of Spring Boot, Git, and the terminal.
- Basic understanding of Docker and Docker Compose installed - see guide [here](https://docs.docker.com/compose/install/).
- A Java IDE - In this tutorial, we will use [IntelliJ Idea](https://www.jetbrains.com/idea/), but you can use any IDE of your choice.
- Postman - Postman is an API client used by developers to create, test, document, and share APIs. Download it [here](https://www.postman.com/downloads/)

### Setting up a Spring Boot project
To start, clone this [Spring Boot project](https://github.com/Kikiodazie/BlogAPI) from Github. It's a blog REST API you will use to Create and Retrieve blog posts in the PostgreSQL database you’re going to create.

If you are not familiar with how to clone a Github repository, click [here](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository-from-github/cloning-a-repository) for detailed instructions.

The blog API has just the following endpoints:

| **Endpoints** | **Functionality** |
| ------------- | ----------------- |
| POST /posts   | Create a new post |
| GET /posts    | List all todos    |

After cloning, in the project directory, go to the `application.properties` file in the `src/main/resources/` directory to configure the API data source.

![BlogAPI project directory structure showing application.properties file](/engineering-education/running-a-multi-container-springboot-postgresql-application-with-docker-compose/directory-structure.png)


In the `application.properties` file add:

```bash
spring.datasource.driverClassName=org.postgresql.Driver
```

The above configuration tells Spring Boot that the data source will be PostgreSQL using PostgreSQL’s specific driver.

Typically, when setting up a Spring Boot project that connects to a data source, we use configurations similar to the one shown below in the project's `application.properties` file:

```bash
spring.datasource.platform=postgres
spring.datasource.url=jdbc:postgresql://localhost:5432/postgres
spring.datasource.username=<database_username>
spring.datasource.password=<database_password>
```

The above configurations will give Spring Boot access to a PostgreSQL database. In this article, you will set up the above configurations with a `docker-compose.yml` file. 
 
Next, we will dockerize the Spring Boot project.

### Dockerize the Spring Boot project
To dockerize a Spring Boot project, you need to generate a JAR (Java ARchive) file, which packages the entire project into one file.

Navigate to the project dependency declaration  (`pom.xml`) file. In the `build profile` of the file, add a [finalName](https://kb.novaordis.com/index.php/Maven_pom.xml#:~:text=finalName%20modifies%20the%20name%20of,named%20artifacts%20in%20the%20repository.):

```xml
<build>
    <finalName>blog-api-docker</finalName>
</build>
```

To generate the JAR file run:

```bash
$ mvn install -DskipTests
```

The addition of `-DskipTests` tells maven to skip testing the application state because the project is yet to connect to the specified data source. If you run just `$ mvn install`, there will be a build failure caused by the PostgreSQL driver.

You can find the JAR file in the `target/` directory of the project.

Now create a Dockerfile in your project directory to build a Docker image that you will run as a container. 

In the Dockerfile, add:

```bash
FROM openjdk:11
ADD target/blog-api-docker.jar blog-api-docker.jar
ENTRYPOINT ["java", "-jar","blog-api-docker.jar"]
EXPOSE 8080
```

The above Dockerfile tells Docker to build the specified JAR file in the target directory off `openjdk:11` base image and `EXPOSE` port `8080`. You can now build the Docker image. 

In the project directory, run:

```bash
$ docker build -t blog-api-docker.jar .
```

You can run the Spring Boot project Docker image using `docker run`, which will start a Docker container from the image. But remember, we want to use Docker Compose to start up all the project services (containers).

To learn more about dockerizing Spring Boot projects, check this [article](/engineering-education/spring-docker/) out.

Now that you've dockerized the Spring Boot project, you will need to define a Docker Compose `docker-compose.yml` file. This file will have a configuration to create a PostgreSQL database in a Docker container and connect it to the container of the Spring Boot project to run as a multi-container application.

### Define the Docker Compose yml file
In the project directory, create a `docker-compose.yml` file. Setup the `docker-compose.yml` file with the following definitions:

```yml
version: '3.1'
services:
  API:
    image: 'blog-api-docker.jar'
    ports:
      - "8080:8080"
    depends_on:
      PostgreSQL:
        condition: service_healthy
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://PostgreSQL:5432/postgres
      - SPRING_DATASOURCE_USERNAME=postgres
      - SPRING_DATASOURCE_PASSWORD=password
      - SPRING_JPA_HIBERNATE_DDL_AUTO=update

  PostgreSQL:
    image: postgres
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_PASSWORD=password
      - POSTGRES_USER=postgres
      - POSTGRES_DB=postgres
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
```

The above configurations define the version of Docker Compose and the services in the multi-container application. 

`API` service:

- The `image`  key has a value of the Docker image you created from the cloned Spring Boot project.
- `ports` key tells Docker to expose the `API`’s container port `8080` to the host (your machine) port `8080`.
- The complete start-up of the `API` service `depends_on` the `PostgreSQL` service is healthy.
- The list of `environment` configurations that you would see in the Spring Boot project `application.properties` file. These configurations connect and authenticate the `API` service with the `PostgreSQL` service.

`PostgreSQL` service:


- The `image` on which your database container will run of `postgres` Docker image.
- The service exposes port `5432` to your host machine, port `5432`. The `API` service can connect to the database using `SPRING_DATASOURCE_URL` in its `environment` configuration.
- Next is a list of `environment` configurations that authenticates the PostgreSQL database.
- The final configuration `healthcheck` tests the database using the command `"pg_isready -U postgres"` on intervals to make sure the database service has started up fully and `service_healthy` as the API service `depends_on` the database has been up fully to complete its start-up.

Now, you can run your multi-container application with Docker Compose. 

### Run the multi-container application
To test all you have been putting together, open up the terminal, navigate to the Spring Boot project directory where you have the `docker-compose.yml`, and run:

```bash
$ docker-compose up -d
```

The above command starts up the Spring Boot project - API and PostgreSQL containers (services). The additional `-d` tells Docker to run in detached mode.

You can now test the API endpoints. Open up Postman and send a POST request to `http://localhost:8080/posts`  endpoint using similar JSON data below:

```json
{
  "title": "Test Post",
  "post": "This POST request creates a Post"
}
```

The above request creates a blog post with a unique ID:

![POST request Test](/engineering-education/running-a-multi-container-springboot-postgresql-application-with-docker-compose/post-request.png)

To view the post you just created, send a GET request to the same endpoint. View all the blog posts you’ve created:

![GET request Test](/engineering-education/running-a-multi-container-springboot-postgresql-application-with-docker-compose/get-request.png)

To stop all the services in the terminal, run:

```bash
$ docker-compose down
```

You can now start and stop all services using `docker-compose up` and `docker-compose down`, respectively.

### Conclusion

In this tutorial, you’ve learned how to define a Docker Compose yml file, use it to run multi-container (Spring Boot and PostgreSQL) applications and tested the application. 

You can use Docker Compose in all environments: production, testing, staging, development, and CI workflows to better your software development processes.

Happy coding!

### Reference
- [Simplify All the Things with Docker Compose](https://youtu.be/QeQ2MH5f_BE)
- [An open-source docker-compose.yml file used in a Spring Boot project](https://github.com/Kikiodazie/Multi-User-TodoList-Api/blob/master/docker-compose.yml)
- [Deep into Docker Compose](https://youtu.be/HUpIoF_conA)

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
