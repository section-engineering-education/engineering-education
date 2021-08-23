### Introduction

In the spirit of collaboration and agile methodology, several developers build codes and combine these different codes into one codebase. This process would involve a version control system (VCS) where different developers can get code from other developers using pull requests, send their changes to other developers using push requests, and combine different code bases from different contributors using merge requests. This process can be automated using continuous integration.

Various tools can be used for continuous integration. Jenkins is one such tool. This article will focus on Jenkins as a tool for continuous integration. It is a popular open-source tool that can be used to automate the different build processes. These processes are predefined and can be triggered by different processes such as on predefined time intervals or predefined user actions.

### Understanding Jenkins and its role in the integration

Jenkins is open-source automation software that is used in continuous integration. It's written in Java with plugins built for continuous integration and delivery. Jenkins builds and tests software projects allowing developers to integrate changes to the project enabling users to obtain a fresh build. Jenkins allows continuous delivery by integrating with a large number of testing and deployment technologies. It facilitates continuous integration in a continuous delivery environment in a combination of languages, source code repositories using pipelines, and automation of other routine tasks. Software development is therefore speeded up by the use of Jenkins through automation.

Jenkins continuously tests projects during software development, detects and reports any errors during the early stages of development. This is done by performing a software build, execution of a shell script, archiving a built result, and running the software test. Jenkins, therefore, facilitates integration by conducting repository checks, preparing builds, deployment of build-in test servers, generating of feedback, and finally verification of source code repository changes for the changes made in the source code. This makes the process continuous since it's repeated in a cycle.

### Basic set up of Jenkins

Before downloading and setting up Jenkins, users should check for certain prerequisites, namely enough memory in the hard drive, usually at least 1GB and 256 RAM, the latest version of Java usually Java Development Kit or Java Runtime Environment ([JRE](https://www.ibm.com/cloud/learn/jre)), system to be installed like Windows or Ubuntu and the release types which are weekly release and Long Time Support Release ([LTSR](https://www.jgspiers.com/what-is-long-term-service-release/)).

This is followed by downloading the latest version of Jenkins into your computer and following the installation prompts in the setup wizard. After successful installation, a configuration is done to unblock Jenkins by entering the administrator password. Jenkins is then customized to the user's environment by installing all the essential [plugins](https://etc.usf.edu/techease/win/internet/what-is-a-plugin-how-do-i-install-it/) that create Jenkins jobs.

### What are pipelines, and how are they used with Jenkins?

In Jenkins, a [pipeline](https://www.jenkins.io/doc/book/pipeline/) is a collection of events and jobs interlinked with each other in a sequence. They are a combination of plugins that support the integration and implementation of continuous delivery in Jenkins. The pipeline has extensible automation servers that create codes via Domain-Specific Languages ([DSL](https://en.wikipedia.org/wiki/Domain-specific_language#:~:text=A%20domain-specific%20language%20%28DSL%29%20is%20a%20computer%20language,language%20%28GPL%29%2C%20which%20is%20broadly%20applicable%20across%20domains)). Jenkin pipelines are implemented as a code allowing many users to access it. Pipelines are normally robust and automatically resume when an unpredictable restart occurs.

Pipelines are developed in two ways, namely, Scripted and [Declarative pipelines](https://www.jenkins.io/doc/book/pipeline/syntax/). A [scripted pipeline](https://www.jenkins.io/doc/book/pipeline/#scripted-pipeline-fundamentals) is based on a [Groovy Script](https://www.jenkins.io/doc/book/managing/script-console/#:~:text=Jenkins%20features%20a%20Groovy%20script%20console%20which%20allows,of%20your%20Jenkins%20installation.%20The%20Jenkins%20Script%20Console%3A) as they are Domain Specific languages, while Declarative Pipeline provides a simple syntax to define a pipeline without a groovy script. Pipelines are written into a Jenkins file, making them durable, extensible, able to pause, and easier to code. Using Jenkins pipelines involves the use of nodes which are machines capable of executing a pipeline, a stage block that defines distinct tasks to be performed in the entire pipeline, and a Step which is a single task that commands Jenkins what to do at a particular point and time.

### Benefits of Jenkins over other continuous integration tools

Jenkins is open-source and free to use. Users can download Jenkins with the source code online for free, and they can easily get the newest releases for their use. This ensures that better and more updated versions are available to developers, and this comes with a community where they can share improvements.

By allowing a wide range of plugins such as [Jenkins Maven](https://plugins.jenkins.io/maven-plugin/), [Global Build Stats](https://plugins.jenkins.io/global-build-stats/), [Job Generator](https://plugins.jenkins.io/jobgenerator/), and Multiple SCMs, Jenkins grants developers added features and control over the inbuilt Jenkins feature. These plugins help developers to integrate Jenkins into their custom tool for IT projects.

As a continuous integration tool, Jenkins is easy to use with updated documentation and support for all major operating systems. Users with basic IT skills can easily harness the software. In addition, Jenkins is distributed with a quality Application Programming Interface ([API](https://www.club-oracle.com/threads/apis-what-is-api.16190/)) suite that enables the user to tailor-make the amount of accessible data and coding with any other software.

The flexibility of Jenkins due to its open architecture and wide range of plugins enables the use of software in projects of various sizes and complexities. Jenkins doesn't limit on the number of servers connected; hence many teams can work towards continuous delivery without challenges.

The wide presence of developer community support on Jenkins software across the globe allows easy usage, access to the latest releases, and sharing of ideas on important improvements. Jenkins also allows Source Code Management ([SCM](https://www.atlassian.com/git/tutorials/source-code-management#:~:text=Source%20code%20management%20%28SCM%29%20is%20used%20to%20track,contributors.%20SCM%20is%20also%20synonymous%20with%20Version%20control)) which supports different source code repositories enabling developers to set different triggers after changes in codes which can be done in different platforms like Java and Python.

### Shortcomings of using Jenkins as a continuous integration tool

One of the commonest disadvantages of the use of Jenkins is the presence of too many plugins. Plugins available in Jenkins software do not provide optimal functionality extending beyond the core features required to use the platform. In fact, Jenkins requires users to use plugins to achieve tasks that are too basic. Another shortcoming with the use of Jenkins is the way it's designed, that is, not fully updated to recent developments, especially in the current Docker age. Jenkins lacks collaboration features whereby it doesn't allow a developer to see the commits done by another team member. This makes tracking the overall progress of projects more difficult. Jenkins does not provide enough analytics on the end-to-end deployment cycle, which in turn hinders the overall tracking of the process. It needs additional personnel to manage the server and to address any challenges. This, in turn, increases operational costs and may take time.

### References

Agile,  S. (2020). [What is Jenkins pipeline? Top 5 benefits of Jenkins pipeline](https://staragile.com/blog/what-is-jenkins-pipeline)

Ezeelive Technologies. (2021). [Jenkins:Pros and Cons.](https://ezeelive.com/jenkins-pros-cons/)

Perez, S. (2019). [Advantages of Jenkins](https://apiumhub.com/tech-blog-barcelona/advantages-of-jenkins/)

Sinha, A. (2020). [What is Jenkins? Jenkins for Continuous Integration](https://www.dotnettricks.com/learn/devops/what-is-jenkins-jenkins-for-continuous-integration)

Sypolt, G. (2016). [A Getting Started Guide to Set Up of Jenkins.](https://saucelabs.com/blog/a-getting-started-guide-to-setting-up-jenkins#:~:text=%20The%20basics%20of%20setting%20up%20a%20Jenkins,port%20for%20JNLP%20slave%20agents%20to...%20More%20)
