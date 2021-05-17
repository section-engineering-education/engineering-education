# Building a Java Application with Jenkins in Docker
Over the past three years, the way we build software has undergone significant change. Developers create new technologies in the range of months and launch new ways of building and deploying applications. Thus also, new ways of improving teamwork performance, code coverage and deployment.

We can run Jenkins in a container technology like Docker to automate the building, testing, and deploying software, facilitating continuous integration and continuous delivery. In addition, Jenkins in Docker provides a way out of Jenkins configuration files clashes, issues running Jenkins on multiple platforms, etc. Docker does this by reducing the task of running Jenkins to as little as two commands; `docker pull` Jenkins base image, and `docker run` a docker container instance.

In this step by step tutorial, we will set up Jenkins in a Docker container. Also, we will build, dockerize and automate the testing and deployment of a Java application on Github to Docker Hub with Jenkins in a Docker container.


## Table of contents


- Create a demo Java application
    - On to the code
- Host the demo application code on GitHub
- Set up Jenkins in Docker
    - Docker-in-Docker
    - Jenkins global configurations
    - JDK config
    - Maven config
- Putting it all together - build, test and deploy our Java application with Jenkins 
    - Building and deploying our Docker image to Docker Hub
- Conclusion


## Prerequisites


- Basic knowledge of Java, Maven, Git, and the command line.
- Understanding of Docker and basic Docker commands
- A Java IDE - In this tutorial, we will use IntelliJ Idea, but you can use any IDE of your choice



## Create a demo Java application

We will create a simple Java console application and unit test it. This demo application can only check if an input is `even` or `odd`.

To start, let’s create a new Maven project with IntelliJ IDEA. Then, we can use these IntelliJ settings:

![intelliJ Settings](/building-a-java-application-with-jenkins-in-docker/intellij-settings.png)


We can also create a Maven project via the command line by creating a directory for our source code using the [Maven standard directory layout](https://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html). 

To create the Maven project directory layout, run:


    $ mkdir -p src/main/java

Add a `pom.xml` file:


    $ touch pom.xml

In our `pom.xml` file we’ll add:


    <?xml version="1.0" encoding="UTF-8"?>
    <project  xmlns="http://maven.apache.org/POM/4.0.0"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
        <modelVersion>4.0.0</modelVersion>
    
        <groupId>org.example</groupId>
        <artifactId>Java-jenkins-in-docker</artifactId>
        <version>1.0-SNAPSHOT</version>
    
        <properties>
            <java.version>1.8</java.version>
        </properties>
    
    </project>

To finish up our application configuration, we need to tell maven to add JUnit 5 dependency for writing tests. Let’s update the `pom.xml` file to make sure that the following the dependency is present:


    <dependencies>
        <!-- junit 5, unit test -->
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-engine</artifactId>
            <version>5.3.1</version>
            <scope>test</scope>
        </dependency>
    </dependencies>


**On to the code**

In `src/main/java` path, let’s create a class called `Main` to write the code for our simple console application. 

In the `Main` class, let’s add the `main`  method to run our code:


    public class Main {
        public static void main(String[] args) {
            //code will go in here
        }
    }


Finally, let’s create a simple `static` method to check if an input is even or odd:


    public static boolean checkIfInputIsAnEvenNumber(int number){
        return number % 2 == 0;
    }


- We are creating a `static` method so we can write unit tests. We want to see how Jenkins will automate testing.
- If the input `int` is even or odd, the method returns true or false, respectively.

`Main` class:


    public class Main {
        public static void main(String[] args) {
            System.out.println(checkIfInputIsAnEvenNumber(122)); // Testing in the main method
        }
    
        public static boolean checkIfInputIsAnEvenNumber(int number){
            return number % 2 == 0;
        }
    }

If you run the above code, the output will be `true`.

Now let’s write a unit test to test our `checkIfInputIsAnEvenNumber` method. First, in the `src/test/java` path, let’s create a test class `TestMain` to test the method.



    import org.junit.jupiter.api.Test;
    
    import static org.junit.jupiter.api.Assertions.assertTrue;
    
    public class TestMain {
    
        @Test
        public void testInputIsEven(){
            assertTrue(Main.checkIfInputIsAnEvenNumber(23)); // Assertion
        }
    }
    

You can run the above test in your IDE. Also, we can use a Maven command to run all our unit tests in the command line. In the project directory:


    $ mvn test

For our current test input data `23`, which is odd, when we run the above command, the test fails:


![maven test fails](/building-a-java-application-with-jenkins-in-docker/maven-test-failure.png)


Now let’s change the test input data to an even number  `22` and run the Maven command:


    assertTrue(Main.checkIfInputIsAnEvenNumber(22)); // Assertion


![maven test passes](/building-a-java-application-with-jenkins-in-docker/maven-test-pass.png)


The test passes. In a few steps, we will see how Jenkins will automate this process.


## Host the demo application code on GitHub 

We are going to push our Java application codes to GitHub. So when we set up Jenkins for any change (commit) made to our application on GitHub, Jenkins will trigger a post-commit build process remotely.  


- To start, [create a new GitHub repository](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-new-repository),
- Then open up the terminal.
- Change to the directory of our demo application and run:


    $ git init -b main // To initialize the local repository


- Then to add all our application files, run:


    $ git add .


- We can now commit our files:


    $ git commit -m "Added java demo application files"


- Copy the created repository clone URL on GitHub.
- Add the remote URL where we will push the local repository (our application codes):


    $ git remote add origin  <REMOTE_URL>


-  Verify the remote URL and push the changes of our local repository to Github:


    $ git remote -v
    $ git push origin main


For more detailed instructions on adding our existing application to GitHub, see Github’s documentation on [adding an existing project to GitHub using the command line](https://docs.github.com/en/github/importing-your-projects-to-github/adding-an-existing-project-to-github-using-the-command-line).


## Set up Jenkins in Docker

**Docker-in-Docker**

As we set up Jenkins in Docker, we need to remember the goal of our setup, which involves dockerizing of an application. For this to happen, we need to execute docker commands and access other containers through our running Jenkins docker container. To achieve this, we need a `Dockerfile` that configures a Jenkins environment capable of running Docker commands and managing docker containers.

Create a `Dockerfile` in any directory, and in the Dockerfile add:


    from jenkins/jenkins:lts
    USER root
    RUN apt-get update -qq \
        && apt-get install -qqy apt-transport-https ca-certificates curl gnupg2 software-properties-common
    RUN curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add -
    RUN add-apt-repository \
       "deb [arch=amd64] https://download.docker.com/linux/debian \
       $(lsb_release -cs) \
       stable"
    RUN apt-get update  -qq \
        && apt-get install docker-ce=17.12.1~ce-0~debian -y
    RUN usermod -aG docker jenkins

Now let’s create a `jenkins-docker` image using the above Dockerfile :


    $ docker image build -t jenkins-docker .

To run our Jenkins-docker container, in the command line:


    $ docker run -it -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock --restart unless-stopped jenkins-docker


- The above command runs our pre-built `jenkins-docker` image, `-p` publishing the container’s ports `8080` and `50000` to the host (our machine) port `8080` and `50000`.


- We want to be able to run Docker commands in our running Jenkins container, but at any time, there is only one Docker daemon running in our machine, which is the one on our host system. So what we need to do is to [bind mount](https://docs.docker.com/storage/bind-mounts/) our container to our host machine daemon while we run the container using this argument: `-v /var/run/docker.sock:/var/run/docker.sock`


- `-v jenkins_home:/var/jenkins_home` argument creates an explicit volume on our host machine. Why? During our initial setup of Jenkins, we will configure Jenkins, download plugins, etc.; if we  stop/restart/delete our container, we need to have our initial setup configuration intact. We wouldn’t want to be doing those set up every time we stop/restart/delete our container.


- `--restart unless-stopped` tells the container always to restart unless stopped manually using the `docker stop <container_name/container_id>` command.


After running the above command to spin up our `jenkins-docker` container, visit localhost `localhost:8080` to set up Jenkins.


![getting started with jenkins](/building-a-java-application-with-jenkins-in-docker/jenkins-getting-started.png)


We can get the admin password from what command returns. See what is looks like:


![initial admin password](/building-a-java-application-with-jenkins-in-docker/initial-admin-password.png)


We can also get the intial admin password from
`/var/jenkins_home/secrets/initialAdminPassword` directory, run:


    $ docker exec -it <container_name/container_id> /bin/bash

And to get the password:


    $ cat /var/jenkins_home/secrets/initialAdminPassword

Next, we select “Install suggested plugins”. Jenkins automatically downloads its essential plugins:


![plugins installation](/building-a-java-application-with-jenkins-in-docker/plugins-installation.png)


**Jenkins global configurations**

Firstly, we will configure the JDK, Maven, and Git on our Jenkins console to enable Jenkins to clone our repository and build our application.

In our Jenkins console, go to ***Manage Jenkins.*** 


![jenkins home](/building-a-java-application-with-jenkins-in-docker/jenkins-home.png)


And after that, under **System Configurations,** click on ***Global Tool Configuration.***


![jenkins configuration](/building-a-java-application-with-jenkins-in-docker/jenkins-configuration.png)


**JDK config**

Our Jenkins container comes with an **OpenJDK**; to find this, we need to enter into to container’s bash shell to get the JAVA_HOME path.

To get the bash shell of the container run:


    $ docker exec -it <container_name/container_id> /bin/bash

Then if we’re using either macOS  or Linux, we run:


    echo $JAVA_HOME


![jdk configuration](/building-a-java-application-with-jenkins-in-docker/jdk-config.png)


For more details/instructions on commands used to get the **JAVA_HOME**, check out this article on [finding](https://www.baeldung.com/find-java-home) [**JAVA_HOME**](https://www.baeldung.com/find-java-home).

**Maven config**

We can tell Jenkins to download Maven from Apache servers instead of pointing to the Maven directory on our system. Therefore, set it like the image below:


![maven configurations](/building-a-java-application-with-jenkins-in-docker/maven-config.png)



Make sure to apply/save the configurations before exiting the page.

While building with **Docker-in-Docker**, we may run into problems. Still, having a fundamental understanding of **Docker-in-Docker**, we can easily debug bugs/issues that may arise, as we’ve seen.

For more details on **Docker-in-Docker**, read this article on [Quickstart CI with Jenkins and Docker-in-Docker](https://medium.com/swlh/quickstart-ci-with-jenkins-and-docker-in-docker-c3f7174ee9ff).



## Putting it all together - build, test and deploy our Java application with Jenkins

So far, we’ve built a simple demo Java console application, hosted our application code on Github, and set up Jenkins in Docker. Now let’s put it all together by using Jenkins to automate the building, testing, dockerizing, and deploying our application Docker image to Docker Hub after every commit made to our application repository hosted on GitHub.

To start, let’s create a new Jenkins item:


![create a new item](/building-a-java-application-with-jenkins-in-docker/create-item.png)


Then select **Freestyle project**:
****

![freestyle project](/building-a-java-application-with-jenkins-in-docker/freestyle-project.png)


To configure our **Freestyle project** to meet our project specification, select GitHub project and add project URL:


![github url settings](/building-a-java-application-with-jenkins-in-docker/github-url.png)


For our **Source Code Management** (or **SCM** for short), ****select Git, add the remote Git repository URL of the project  and leave the branch field empty so any commit made to any branch triggers our entire Jenkins process:


![source code management](/building-a-java-application-with-jenkins-in-docker/source-code-management.png)


For **Build Triggers**, select Poll SCM, which checks whether we made changes (i.e. new commits) and then builds our project if we pushed the new commits since our last build. Poll SCM periodically polls the SCM even if nothing has changed in the repository. 

We will give the **Schedule** five stars with this demo application, which is the [cron expression](https://en.wikipedia.org/wiki/Cron) to poll every minute.


![build trigger](/building-a-java-application-with-jenkins-in-docker/build-trigger.png)


To learn more on polling SCM, check out this article [What is poll SCM in Jenkins?](https://askinglot.com/what-is-poll-scm-in-jenkins)


Next, we skip the **Build Environment** tab, and in the next tab, **Build**, let’s add two **Invoke top-level Maven targets** build steps. Then, finally, click on apply and save our **Freestyle project** configuration.


![build steps](/building-a-java-application-with-jenkins-in-docker/maven-build-step.png)


The above build steps runs Maven `$ mvn test`  and `$ mvn install` commands one after the other. If you recall our previous steps, we manually ran the test command for our unit test.


For testing (our **Freestyle project** configuration) purposes, let’s build our project to see if our current configuration works. Click on **Build Now**.


![build now](/building-a-java-application-with-jenkins-in-docker/build-now.png)


The project starts building, and we can view the console output during the build process. Locate **Build History**:

![see console output](/building-a-java-application-with-jenkins-in-docker/see-console-output.png)


Our console output should look a lot like the image below with our test passing:


![build console output](/building-a-java-application-with-jenkins-in-docker/console-output.png)


If we commit changes, we don’t need to manually click **Build Now** as Jenkins will automatically build our Freestyle project due to the configurations.


**Building and deploying our Docker image to Docker Hub**

We are almost there. What’s left is for us to configure Jenkins to build the Docker image of our Java application and deploy that image to Docker Hub. To achieve this, we need a few Jenkins plugins installed. In **Manage Jenkins**, select **Manage Plugins** under **System Configurations**, search and install the following plugins:


- docker-build-step
- CloudBees Docker Build and Publish


![docker plugins](/building-a-java-application-with-jenkins-in-docker/docker-plugins.png)


To check if the plugins have installed, let’s go back to our Freestyle project configuration and in the **Build** tab, click on “Add build step”, and we will see **Docker Build and Publish** build step:


![check docker build step](/building-a-java-application-with-jenkins-in-docker/check-docker-build-step.png)


Recall that to build a Docker image, we need a Dockerfile to tell docker where which base image to build our image from and other Java-related configurations. To build our Docker image, we also need to generate a JAR (Java ARchive) file.

In the build profile our `pom.xml` file, add a [finalName](https://kb.novaordis.com/index.php/Maven_pom.xml#:~:text=finalName%20modifies%20the%20name%20of,named%20artifacts%20in%20the%20repository.). This `finalname` will be our JAR name:


    <build>
      <finalName>java-jenkins-docker</finalName>
    </build>


Then to generate our JAR run:


    $ mvn install

We can find our JAR in the  `target/`  directory of the project.

Now let’s create our Dockerfile. Open the terminal and in our Java application directory:


    $ touch Dockerfile

And in our Dockerfile:


    FROM openjdk:8
    ADD target/java-jenkins-docker.jar java-jenkins-docker.jar
    ENTRYPOINT ["java", "-jar","java-jenkins-docker.jar"]
    EXPOSE 8080

Add the new files and commit the changes to the GitHub repository, which triggers a Jenkins post-commit build process as we configured.

Now we can add our build step to build and deploy our Java application’s Docker image. For this, we will need a Docker Hub account; create one [here](https://hub.docker.com/signup). Then, in the build step set:


- Repository name: `Docker_id/jar_name` example `kikiodazie/java-jenkins-docker`
- Let’s leave the rest of the fields empty for this demo. Apply and save.


![docker build step](/building-a-java-application-with-jenkins-in-docker/docker-build-step.png)


One last thing, seeing we left the Registry credentials (Docker login credentials) field empty, how do we give Jenkins access to the Docker Hub account to push our image too? Remember Docker-in-Docker; our container doesn’t have access to the login credential on our host system. So even if we added registry credentials in the build step, we still wouldn’t verify the credentials.

To give Jenkins that access, we need to login to our Docker Hub account inside our Jenkins container through the command line. Run:


    $ docker exec -it <container_name/container_id> /bin/bash

Then inside the container, run the Docker login command:


    $ docker login

Input your login credentials, and the login succeeds:

![docker hub login](/building-a-java-application-with-jenkins-in-docker/docker-hub-login.png)


Go back to your project and click **Build Now**, then to console output as we saw before, and the end of the output would be something like the image below, which means our image has been successfully built and pushed to Docker Hub:


![docker image push](/building-a-java-application-with-jenkins-in-docker/docker-image-push.png)



## Conclusion

In this tutorial, we saw how to set up and configure Jenkins in Docker and build and test a GitHub hosted Java application code using the Jenkins Freestyle project post-commit build trigger. Also, we learned about Docker-in-Docker and how to build Docker images in a Docker container.

We can see more resources on building with Jenkins:


- [Building CI/CD pipelines with Jenkins](https://opensource.com/article/19/9/intro-building-cicd-pipelines-jenkins)
- [A simple guide to DevOps - CI/CD with Jenkins Pipelines and Docker](https://www.linkedin.com/pulse/simple-guide-devops-cicd-jenkins-pipelines-docker-ramos-da-silva/)
- [Jenkins Full Course | Jenkins Tutorial For Beginner](https://www.youtube.com/watch?v=FX322RVNGj4)
