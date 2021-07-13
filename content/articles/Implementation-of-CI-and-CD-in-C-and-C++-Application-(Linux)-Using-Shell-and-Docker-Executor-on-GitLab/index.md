### Introduction
With the GitLab Runner, you can implement continuous integration and continuous delivery (CI/CD) using a variety of executors. However, Shell and Docker are more widely used, and we can easily set up a repository using these programs. These runners can be selected according to the requirements and resources available. This article focuses mainly on the C/C++ Linux application's Shell and Docker executors and code is written to the Bash script. A Bash script can be used to construct and test the application.

Table of content:

- [What are docker and shell executors](#what-are-docker-and-shell-executors)
- [Implementation of C and C++ on Shell Executor](#implementation-of-c-and-c++-on-shell-executor)
- [Linux GitLab Runner Commands](#linux-gitlab-runner-commands)
- [C/C++ implementation on Docker Executor](#C/C++-implementation-on-docker-executor)

### What are docker and shell executors
**Shell Executor**: A very basic executor that enables you to create the solution locally on the computer which installs GitLab Runner.  Installed on the Linux Machine is the GitLab Runner, therefore you have to install the needed software on the same machine.

**Docker Executor**: A strong, image-accessible tool with a lot of applications. As we do not need to install the software manually, we take care of everything using a docker and download the required image from the docker hub. The negative is that, for security reasons, this communication is restricted in some organizations. If this is the case, Shell Executor is the best option.

### Implementation of C and C++ on Shell Executor 
#### Requirements
These are the fundamental software that must be installed on Linux. However, the compilation script can be modified and other software needs to be downloaded if necessary.

1. **GCC**: It is a compiler that requires c/c++ compilation.
2. **g++**: The compiler is also required to compile the program C/C++. It can be selected based on the script written.
3. **Git**: The first requirement is that the changes be committed to GitLab. It is software for version control that tracks the changing file set.
4. **cmake**: Cmake must be installed on the Linux machine to build automation, testing, and packaging C/C++ application.
5. **grep**: Set it up if you are looking for plain text on the program.

####  Path configuration
Once the above installation is successful, the path must be determined in the machine for this software if it is not set up. 

On the machine, execute the command below.

1. **CC**:  export CC=/usr/bin/gcc
2. **G++**: export GCC=/usr/bin/g++
3. **GREP**: export GREP=/usr/bin/grep

#### GitLab Runner Set Up
Follow the following steps to download and configure the GitLab Runner.
1. To install GitLab Runner on a Linux machine, run the following command.

```
sudo curl -L --output /usr/local/bin/gitlab-runner https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-linux-amd64
```

2. To run it, give it the following command.

```
sudo chmod +x /usr/local/bin/gitlab-runner
```

3. To create a GitLab CI, run the following command.

```
sudo useradd --comment 'GitLab Runner' --create-home gitlab-runner --shell /bin/bash
```

4. Install and run as a service with this command.

```
sudo gitlab-runner install --user=gitlab-runner --working-directory=/home/gitlab-runner
``` 

5. To start GitLab, use the command below.

```
sudo GitLab-runner start
```

6. Stop GitLab Runner before registering your repository.

```
sudo GitLab-runner stop
```

7. Once the GitLab Runner is deleted in the repository registration device, enter the following command.

```
sudo GitLab-runner register
```

8. The following questions must be answered when you register a repository with GitLab Runner.
- `Enter your GitLab URL`: Each company is different, but the format is something like http://gitlab.example.com. 
- `Path`: 'Path' is a term that refers to a Login to your GitLab account. Expand Runner and choose the repository you wish to register with the runner in Settings CI/CD.
- `Enter this runner's GitLab-ci token`: It will be a special token of every project, and you can find it when you register. Path: Log in to your GitLab account → Choose the repository you'd want to register with runner → Settings → CI/CD → Expand Runner
- `Enter the description of the GitLab-ci for this rider`: Put the name of the runner, which will help you remember the runner.
- `Set the tags for this rider with GitLab-ci`: It is optional if a particular tag is available in the YML file to launch the runner of GitLab.
- `Enter the runner`: You will be given a list of executors and shell types to choose from (as GitLab Runner will run our system)

9. Start the GitLab Runner with the following command after a successful registration.

```
sudo GitLab-runner start
```

10. To verify the registration of the repository of GitLab Runner and start the runner. In GitLab Account / Alternative settings / "CI/CD" / Expand Runner, select a repository to register with Runner. A green color circle will be there, and the message will be shown by the project's runners. Note that if the circle is grievous, the runner has not yet begun.

### Linux GitLab Runner Commands
To familiarize yourself, follow some other GitLab Runner commands.
1. `Sudo GitLab-runner register`: Using GitLab Runner, create a project.
2. `Sudo GitLab-runner start`: Begin the runner.
3. `Sudo GitLab-runner restart`: The GitLab Runner service is stopped and then restarted using this command.
4. `Sudo GitLab-runner uninstall`: This command deactivates and uninstalls GitLab Runner as a service.
5. `Sudo GitLab-runner exec`: Run this command to obtain a list of executors available.
6. `Sudo GitLab-runner stop` will stop the runner. Stop the runner with Sudo GitLab-runner stop.
7. `Sudo GitLab-runner unregisters` -Url `http://gitlab.example.com/` –token t0k3n: A URL and a token can be used to uninstall Runner.
8. `Sudo GitLab-runner unregister –all runners`: All runners must be unaccompanied to do so.
9. `Sudo GitLab-runner –help`: By running the command, you can see a recent list of commands.
10. `Sudo GitLab-runner runs –help`: The environment variable's name is displayed.
11. `Sudo GitLab-runner status`: To find out how GitLab-runner is doing.
12. Unregister a project's Runner with `sudo GitLab-runner unregister –name test-runner`, where test-runner is the name of your runner from the config.toml file (where your GitLab-runner is located).
13. `Sudo GitLab-runner –debug`: Follow these steps to execute a command in debug mode.
14. `Sudo GitLab-runner exec shell`: Type a list of all the options for the shell executor.

#### .gitlab-ci.yml_ shell Executor:
On shell executor mode, the contents of.gitlab-ci.yml are shown below. Change it, though, if necessary.

```bash
stages:
 - build
 - test

build_job:
 stage: build
 only:
   - master
 script:  
    - cd sourcecode
    - export G++=/usr/bin/g++  
    - export GCC=/usr/bin/gcc 
    - chmod -R 777 *
    - ./BuildPackage.sh
    - pwd  
     
 artifacts:
   expire_in: 365 days   
   paths:
      - sourcecode/binaryfolder_name  
       
     
test_job:
 stage: test
 only:
   - master
 script:
    - pwd  
    - cd testdir       
    - chmod -R 777 *
    - ./tests.sh
   
 dependencies:
   - build_job
   - build_job
```

### C/C++ implementation on Docker Executor
Because everything would be pulled from the docker container, there will be no need to manually install any software. You can, however, install the essential software by entering the name in a yml file and exporting the path. Go to GitLab Runner Set-Up (upper) and select the docker instead of the shell to start the GitLab runner.

#### .gitlab-ci.yml_ Docker Executor:
On docker executor mode, the contents of.gitlab-ci.yml are shown below. Change it, though, if necessary.

```bash
image: ubuntu:latest
 
stages:
 - build
 - test
 
before_script:
 - echo "Before script install this on ubuntu image "
 - apt-get update && apt-get -y install cmake && apt-get -y install gcc &&  apt-get -y install g++
 

build_job:
 stage: build
 only:
   - master
 script:  
    - cd sourcecode
    - export G++=/usr/bin/g++  
    - export GCC=/usr/bin/gcc 
    - chmod -R 777 *
    - ./BuildPackage.sh
    - pwd  
     
 artifacts:
   expire_in: 365 days   
   paths:
      - sourcecode/binaryfolder_name    
       
     
test_job:
 stage: test
 only:
   - master
 script:
    - pwd  
    - cd testdir      
    - chmod -R 777 *
    - ./tests.sh
   
 dependencies:
   - build_job
```
### Conclusion
From the article above, we have learned about the implementation of Continous Delivery and Continuous Integration in the C/C++ application using shell and docker executor. I would urge the reader to try using all the GitLab runner commands listed in the article to understand more.
