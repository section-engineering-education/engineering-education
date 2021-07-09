### Introduction
With `GitLab Runner`, you may use a variety of executors to implement continuous integration(CI)/continuous delivery(CD). Shell and Docker, on the other hand, are more widely used, and we may easily configure a repository with these runners. These runners can be selected based on your requirements and available resources. This article's code is written in bash and focuses on Java Linux application Shell and Docker executors. A bash script can be used to build and test the application.

Table of content:

- [Understanding shell and docker executors](#understanding-shell-and-docker-executors)
- [Java implementation on the Shell Executor](#java-implementation-on-the-shell-executor)
- [Java implementation on the Docker Executor](#java-implementation-on-the-docker-executor)

### Understanding shell and docker executors
**Shell Executor** is a basic executor that helps you build a solution locally on a PC that has GitLab Runner installed. Because GitLab Runner is installed on a Linux machine, the essential software must also be installed on the same.
**Docker executor** is a strong tool that comes with a lot of software and may be accessed through an image. The benefit of using this executor is that we won't have to manually install any software because everything will be handled by Docker. Docker does this by obtaining the required image from Docker Hub. The negative side of this is that, for security reasons, this communication is restricted in some organizations. Shell Executor is the most ideal choice if so.

### Java implementation on the Shell Executor
#### Requirements
These are the essential programs that must be installed on a Linux computer. It can, however, be adjusted depending on the compilation script, and you may need to obtain additional software if necessary.

The following are the software requirements:
1. **Git** - The first criterion is to commit the modifications to GitLab. It's a version management system that keeps track of how files change over time.

2. **Apache Ant** - This is a tool that assists in the creation of processes as well as the generation of the project's jar file. It provides additional project information, which should be included in the jar.

3.**JDK** - You'll need to install a certain version of JDK on the machine you've chosen in order to create the jar file. For instance, OpenJDK-8 is a suitable Java development kit.

#### Path Configuration
If the path of the installed software is not configured after successful installation. Do it by running the command below.

```
Variable /  path
File
```

- **Git**: Set the Git path in the Linux machine if it isn't already set. You can check the type of git you are using through.
  `export Git = /usr/bin/git`
- **java**: `export JAVA=/usr/bin/java` Can check the type of java you are using.
- **apache Ant**: `export ANT=/usr/bin/ant` Can check with which ant.
- **permission**: Before running `build.xml`, permit it: chmod -R 777\*
- **Build.xml**: It will create the project and the jar based on the data it contains.
- **.GitLab-ci.yml**: This file, which contains all of the CI/CD setups, including software and script paths, should be located in the project's root directory. You can describe how this repository should work in this section. Check that this file is a valid yml file before putting it in the root directory.

#### Setting up GitLab Runner
Follow the instructions below to download and configure GitLab Runner.

1. Install GitLab Runner on a Linux computer with the command below.

```
sudo chmod +x /usr/local/bin/gitlab-runner
```

2. Use the following command to allow it to execute:

```
sudo chmod +x /usr/local/bin/gitlab-runner
```

3. Use the following command to build a GitLab CI:

```
sudo useradd --comment 'GitLab Runner' --create-home gitlab-runner --shell /bin/bash
```

4. Use the following command to install and run it as a service:

```
sudo gitlab-runner install --user=gitlab-runner --working-directory=/home/gitlab-runner
```

5. Use the following command to launch GitLab Runner:

```
sudo GitLab-runner start
```

6. Before registering the repository, use the following command to stop GitLab Runner:

```
sudo gitlab-runner stop
```

7. To register a repository, run the following command in the terminal after GitLab Runner has been properly stopped.

```
sudo gitlab-runner register
```

8. When using GitLab Runner to register a repository, you must answer the following questions.

- Enter the following URL for your GitLab instance: Each organization's format will be different, but it will be something like `http://gitlab.example.com`.
- path: Go to your GitLab account and sign in. Expand Runner and choose the repository you wish to register with runner Settings CI/CD.
- For this runner, enter the `gitlab-ci token`: It will be a one-of-a-kind token for each project that will be required upon registration and may be found here.
- Enter this runner's GitLab-ci description: Put the name of the runner (any name). This will help you recall who is running.
- For this runner, fill up the following gitlab-ci tags: It's optional to launch GitLab runner when a certain tag in the yml file is available.
- Here comes the executor: You will be given a list of executors to pick from, and then shell type (as GitLab Runner will run our system)

9. After you've successfully registered, run the GitLab Runner using the following command.

```
sudo GitLab-runner start
```

To ensure that GitLab Runner has registered the repository and that the runner is running, go to GitLab Account → Select the repository which you want to register with runner → Settings → CI/CD → Expand Runner. A green colored circle will be available, with active Runners for this project showing a message.

> The runner has not yet started and must restart if the circle is gray.

#### Linux GitLab Runner Commands
1. **Sudo GitLab-runner register** GitLab Runner must be used to register the project.
2. **Sudo GitLab-runner register** Begin the runner.
3. **Sudo GitLab-runner stop** The runner must be stopped.
4. **Sudo GitLab-runner status** To find out how GitLab-runner is doing.
5. **Sudo GitLab-runner unregister –name test-runner** Unregister a project's Runner and replace test-runner with your runner name, which you can find in the `config.toml` file (where your GitLab-runner is located).
6. **Sudo GitLab-runner unregister –Url http://gitlab.example.com/ –token t0k3n** Runner can be removed using a URL and a token.
7. **Sudo GitLab-runner unregister –all-runners** All Runners Should Be Unregistered
8. **Sudo GitLab-runner restart** The GitLab Runner service is stopped and then restarted using this command.
9. **Sudo GitLab-runner uninstall** This command disables the GitLab Runner as a service and uninstalls it.
10. **sudo GitLab-runner exec** Run this command to get a list of available executors.
11. **sudo GitLab-runner –help** By running the command, you can see a recent list of commands.
12. **sudo GitLab-runner run –help** The name of the environment variable is visible.
13. **sudo GitLab-runner –debug** To run a command in debug mode.
14. **Sudo GitLab-runner exec shell** To see a complete list of shell's options.

#### gitlab-ci.yml_shell Executor:
On shell executor mode, the contents of `.gitlab-ci.yml` are shown below. Change it to fit the requirements.

```
stages:
 - build
 - execute

build:
 stage: build
 script:
   - ant -f build.xml

 artifacts:
   paths:
   - abc.jar

execute:
 stage: execute
 script:
  - pwd
  - cd scripts
  - chmod -R 777 *
  - pwd
  - ./run.sh
```

### Java implementation on the Docker Executor
There will be no need to manually install any software because everything will be pulled from the docker container. You can, however, install the essential software by entering the name in a yml file and exporting the path. To start GitLab runner in docker executor mode, go to GitLab Runner Set-Up (above) and pick docker instead of the shell.

#### .gitlab-ci.yml\_ Docker Executor
On docker executor mode, the contents of `.gitlab-ci.yml` are listed below. Change it, if necessary.

```
image: ubuntu:latest

stages:
 - build
 - execute

before_script:
 - echo "Before script section"
 - apt-get update && apt-get -y install openjdk-8-jdk  && apt-get -y install ant


build:
 stage: build
 script:
   - ant -f build.xml

 artifacts:
   paths:
   - abc.jar

execute:
 stage: execute
 script:
  - pwd
  - cd scripts
  - chmod -R 777 *
  - pwd
  - ./runtest.sh
```

### Conclusion
In the tutorial above, we have learned path configuration, GitLab runners, and the commands used. With this knowledge, we can freely implement continuous integration/continuous delivery in java applications using docker and shell executors.

Happy coding!
