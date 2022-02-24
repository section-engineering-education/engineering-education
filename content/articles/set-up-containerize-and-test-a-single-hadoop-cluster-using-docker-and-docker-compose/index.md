---
layout: engineering-education
status: publish
published: true
url: /set-up-containerize-and-test-a-single-hadoop-cluster-using-docker-and-docker-compose/
title: Set Up Containerize and Test a Single Hadoop Cluster using Docker and Docker compose
description: This tutorial will show you how to use Docker to set up a single Hadoop cluster. But first, it goes over the basics of the Docker and Hadoop cluster.
author: antony-gitau
date: 2021-07-10T00:00:00-08:12
topics: [Containers]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/set-up-containerize-and-test-a-single-hadoop-cluster-using-docker-and-docker-compose/hero.png
    alt: Docker hero image
---
The Hadoop framework helps process and analyze [big data](/engineering-education/roles-data-science/). Hadoop framework stores and processes vast amounts of any data efficiently using a cluster of computer hardware.
<!--more-->
### Table of contents
- [Prerequisites](#prerequisites)
- [What is a Hadoop cluster?](#what-is-a-hadoop-cluster)
- [What are Docker and Docker containers?](#what-are-docker-and-docker-containers)
- [Set up Docker and docker-compose](#set-up-docker-and-docker-compose)
- [How to set up a single Hadoop cluster using docker-compose](#how-to-set-up-a-single-hadoop-cluster-using-docker-compose)
- [Check the running Hadoop containerized environment](#check-the-running-hadoop-containerized-environment)
- [Testing the dockerize Hadoop application using the MapReduce Job](#testing-the-dockerize-hadoop-application-using-the-mapreduce-job)
- [Set up the Hadoop cluster using Docker](#set-up-the-hadoop-cluster-using-docker)
- [Testing the Hadoop cluster](#testing-the-hadoop-cluster)

### Prerequisites
This article assumes that you have some basic and background knowledge of using [containerization technologies](/engineering-education/history-of-container-technology/) such as using [Docker](/engineering-education/docker-concepts/) to [run and manage containers](/engineering-education/running-and-managing-docker/).  It is also essential to understand the role of [big data](/engineering-education/roles-data-science/) as that is what Hadoop seeks to achieve.

### What is a Hadoop cluster?
We can classify Hadoop clusters as a subset of computer clusters. It's made to hold and analyze large amounts of unstructured and structured data. Parallel processing, load balancing, and fault tolerance are all common uses for clustering.

A Hadoop cluster functions similarly to a computer cluster. A computer cluster is a collection of linked computers that operate as a single system. More power can be added to the cluster relatively easily this way. You simply add a new computer to the network.

The Hadoop ecosystem comprises three main components that are designed to specifically work on big data.

![hadoop-ecosystem](/engineering-education/set-up-containerize-and-test-a-single-hadoop-cluster-using-docker-and-docker-compose/hadoop-ecosystem.jpg)

[Image Source: Data Flair](https://data-flair.training/blogs/hadoop-ecosystem-components/)

These components are:

#### 1. Hadoop distributed file system (HDFS)
HDFS is a storage unit that helps to distribute data amongst many computers and is stored in blocks.

![hdfs-architecture](/engineering-education/set-up-containerize-and-test-a-single-hadoop-cluster-using-docker-and-docker-compose/hdfsarchitecture.gif)

[Image Source: Hadoop Apache](https://hadoop.apache.org/docs/r1.2.1/hdfs_design.html)

The Hadoop framework subdivides data into multiple smaller chunks and stores each segment on its own node within the cluster.

![hdfs-datanodes](/engineering-education/set-up-containerize-and-test-a-single-hadoop-cluster-using-docker-and-docker-compose/hdfsdatanodes.gif)

[Image Source: Hadoop Apache](https://hadoop.apache.org/docs/r1.2.1/hdfs_design.html)

Assume you have approximately 4 terabytes of data. HDFS will split the data into multiple data blocks and then store the data in several data nodes in the Hadoop cluster. 

With each block (node) assigned 128 megabytes as the default size. The amount of time it takes to store this data on the disk is significantly reduced. This way, the total time spent storing this data on a disk will be the same as the time spent storing data in a single block. 

HDFS will then use the replication method and make copies of each data node to other machines present within the cluster. This makes HDFS fault-tolerant by ensuring that no data is lost even if one of the data nodes fails.

#### 2. MapReduce
MapReduce divides data into chunks and processes each one separately on separate data nodes. After that, the individual results are combined to produce the final output.

The diagrams below show a Hadoop MapReduce architecture and the flow of a MapReduce job in an HDFS.

![map-reduce-architecture](/engineering-education/set-up-containerize-and-test-a-single-hadoop-cluster-using-docker-and-docker-compose/map-reduce-architecture.png)

[Image Source: A4Academics](http://a4academics.com/images/hadoop/Hadoop-Mapreduce-Architecture.png)

![mapreduce-flow-diagram](/engineering-education/set-up-containerize-and-test-a-single-hadoop-cluster-using-docker-and-docker-compose/mapreduce-flow-diagram.jpg)

[Image Source: Data Flair](https://data-flair.training/blogs/wp-content/uploads/sites/2/2017/09/hadoop-mapreduce-flow.jpg)

Check out this blog to learn more about [Hadoop MapReduce](/engineering-education/understanding-map-reduce-in-hadoop/).

#### 3. Yet Another Resource Negotiator (YARN)
YARN manages resources within a cluster. A resource manager, a node manager, an application master, and containers make up the system. The Hadoop cluster's resources are assigned by the resource manager. 

Node managers are in charge of the nodes and keep track of their resource usage. A collection of physical resources is kept in the containers. The application uses YARN to request the container from the node manager. The resources are sent to the resource manager by the node manager once it has received them. This way, YARN manages Hadoop cluster resources and processes job requests.

![yarn-architecture](/engineering-education/set-up-containerize-and-test-a-single-hadoop-cluster-using-docker-and-docker-compose/yarn-architecture.gif)

[Image Source: Hadoop Apache](https://hadoop.apache.org/docs/current/hadoop-yarn/hadoop-yarn-site/YARN.html)

>Note: Apart from the components listed above, the Hadoop ecosystem includes a slew of other components. Check them [here](https://data-flair.training/blogs/hadoop-ecosystem-components/).

### What are Docker and Docker containers?
A container is a way to package applications with everything they need inside that package, including the dependencies and configuration necessary to run it. In addition, the package is portable like any other artifact and can be easily shared and moved around between the relevant teams.

Docker is an open-source container solution that allows you to containerize and package an application and its dependencies in Docker containers for development and deployment purposes.

A Docker container is a pre-configured environment that includes all of the necessary installations for the application running inside it. Each container has a running application, and each container runs on the Docker Engine, which in turn runs on top of the host operating system.

![docker-container](/engineering-education/set-up-containerize-and-test-a-single-hadoop-cluster-using-docker-and-docker-compose/docker-container.png)

[Image Source: Docker docs](https://www.docker.com/resources/what-container)

Docker containers use Docker container images to containerize an application. For every application, there is an official Docker container image that you can use to containerize your application dependencies and executables.

![docker-architecture](/engineering-education/set-up-containerize-and-test-a-single-hadoop-cluster-using-docker-and-docker-compose/docker-architecture.png)

[Image Source: Docker docs](https://docs.docker.com/get-started/overview/)

### Set up Docker and docker-compose
To set up this single Hadoop cluster using Docker, ensure that [Docker](https://www.docker.com/products/docker-desktop) is installed on your computer. Run the following commands to make sure Docker is already set up to run docker-compose.

- To check Docker, run;

```bash
docker --version
```

If Docker is well set, the output should be similar to;

![docker-version-reponse](/engineering-education/set-up-containerize-and-test-a-single-hadoop-cluster-using-docker-and-docker-compose/docker-version-response.png)

- To check docker-compose run;

```bash
docker-compose --version
```

If Docker has docker-compose well set, the output should be similar to;

![docker-compose-version-response](/engineering-education/set-up-containerize-and-test-a-single-hadoop-cluster-using-docker-and-docker-compose/docker-compose-version-response.png)

> Note: the version number may differ depending on the Docker version you have installed on your computer.

Check whether Docker is working correctly on your system by checking on present running containers if you have any. Run the following command to do so:

```bash
docker ps
```

If you have a running container, it will be logged and listed in the command output. Since I don't have any Docker containers currently on my system, the output will be as follows;

![docker-ps-response](/engineering-education/set-up-containerize-and-test-a-single-hadoop-cluster-using-docker-and-docker-compose/docker-ps-response.png)

Additionally, ensure that you have [git](https://git-scm.com/downloads) installed on your computer.

### How to set up a single Hadoop cluster using docker-compose
Start by cloning this docker-Hadoop repository from Github as follows;

```bash
git clone https://github.com/big-data-europe/docker-hadoop.git
```

The sample repository above has a Hadoop `docker-compose.yml` set and ready to be deployed to Docker containers. Navigate to the cloned folder, and then run the following command to start the container using `docker-compose`:

```bash
docker-compose up -d
```

The `docker-compose up` will check the containers set in the `docker-compose.yml`, download them and run them within the Docker engine. 

The `-d` flag will set the container to run in a detachable model, i.e., in the background. After everything is done, you can check the running Hadoop containers using the following command;

```bash
docker ps
```

![hadoop-running-containers-response](/engineering-education/set-up-containerize-and-test-a-single-hadoop-cluster-using-docker-and-docker-compose/hadoop-running-containers-response.png)

### Check the running Hadoop containerized environment
To get a visual of a running Hadoop application, you need to get the container IP address. Then test the Hadoop on the browser using the mapped container port. Run this command to get your IP address:

```bash
ifconfig
```

In the response, your IP is the `inet` in the second line as follows;

![check-ip-address](/engineering-education/set-up-containerize-and-test-a-single-hadoop-cluster-using-docker-and-docker-compose/check-ip-address.png)

From above, the IP address is set as `172.19.0.1`.

From the list of the running containers, get a port for the container you want to check. These port numbers are already set in the repository you earlier cloned inside the docker-compose.yml file. For example;
- For `datanode`, use PORT `9864`.
- For `nodemanager`, use PORT `8042`.
- For `namenode`, use PORT `9870`.
- For `historyserver`, use PORT `8188`.
- For `resourcemanager`, use PORT `8088`.

In your browser tab, type in `<your_ip_address>`:`<container_port>`.

### Testing the dockerize Hadoop application using the MapReduce Job
The aim of containerizing Hadoop using Docker is to be able to run and test your jobs using Hadoop distributed file system (HDFS). We will use a small sample of data to demonstrate how you can achieve this. To test the MapReduce Job, follow the following steps;

- Download a sample `jar` file from [here](https://repo1.maven.org/maven2/org/apache/hadoop/hadoop-mapreduce-examples/2.7.1/hadoop-mapreduce-examples-2.7.1-sources.jar).

- Copy the `jar` file to the container. For this instance, we will use the `namenode` container to run a test job; feel free to use any you want.

```bash
docker cp hadoop-mapreduce-examples-2.7.1-sources.jar namenode:/tmp/
```

- Create a simple file, i.e., a `.txt` file.

```bash
nano simple-text.txt
```

- Write any two to three lines in the file and then save it using ***ctrl+X*** and then copy the `.txt` file to the namenode container.

```bash
docker cp simple-text.txt namenode:/tmp/
```

This will make the file accessible by the container to use and upload it to HDFS and run a Hadoop MapReduce Job.

- Navigate to the container and execute it in an interactive way using the following command;

```bash
docker exec -it namenode /bin/bash
```

The `/bin/bash` will raise an interactive bash terminal.

- In the resulting bash terminal, we need to create an `input` folder to host our `sample-text.txt` file. To do so, we will use `hdfs` command as follows;

```bash
hdfs dfs -mkdir -p /user/root/input
```

We added `-p` because we are creating a parent folder with its subsequent children.

- Copy the `sample-text.txt` file to the created folder using `hdfs` as follows;

```bash
hdfs dfs put sample-text.txt /user/root/input
```

- Run the MapReduce job on our `jar` file using `Hadoop jar` to test the cluster. If the output is yielded, then everything is ok. To do that, we will run the following command;

```bash
hadoop jar hadoop-mapreduce-examples-2.7.1-sources.jar org.apache.hadoop.examples.WordCount input output
```

From above:
- `org.apache.hadoop.examples` is the class.
- `WordCount` is the function.
- `input` is the directory where we have our file.
- `output` where the files will be generated.

It will take time to run the process, and then it will be done.

- To test if the process was successful, list out the files in the created `output` folder by;

```bash
hdfs dfs -ls /user/root/output
```

Your command response should be similar to;

![output-response](/engineering-education/set-up-containerize-and-test-a-single-hadoop-cluster-using-docker-and-docker-compose/output-response.png)

At this time, you have successfully set up and tested a Hadoop cluster. Since your containers are still running, you can stop them by running;

```bash
docker-compose down
```

### Set up the Hadoop cluster using Docker
From the above example, we have executed the Hadoop cluster using the docker-compose. Alternatively, you can use Docker, run the Hadoop images directly on your Docker engine, and set up a Hadoop cluster.

To begin, run the following command to get a Hadoop Docker image from the Docker hub libraries;

```bash
sudo docker pull sequenceiq/hadoop-docker:2.7.1
```

This will download the Hadoop image with its YARN properties such as the node manager, resource manager, and history server and install it in your computer's Docker engine. Run the below command to see if the Hadoop Docker image was successfully downloaded.

```bash
docker images
```

If the image was installed successfully, it should be listed in the output as follows;

![docker-images-response](/engineering-education/set-up-containerize-and-test-a-single-hadoop-cluster-using-docker-and-docker-compose/docker-images-response.png)

Let's now build a Hadoop-running Docker container. You can use the following command to create a Hadoop container inside your Docker engine. This creates and runs a single cluster's containers.

```bash
docker run -it sequenceiq/hadoop-docker:2.7.1 /etc/bootstrap.sh -bash
```

![docker-container-response](/engineering-education/set-up-containerize-and-test-a-single-hadoop-cluster-using-docker-and-docker-compose/docker-container-response.png)

If the command is executed without any error (probably due to poor network connections), go ahead and check if Hadoop services are up and running. You can do this by running the `jps` command.

```bash
jps
```

![jps-response](/engineering-education/set-up-containerize-and-test-a-single-hadoop-cluster-using-docker-and-docker-compose/jps-response.png)

You can see that containers are set for NodeManager, DataNode, Resource manager and NameNode.

You can now verify if everything is up and running. On your command terminal, check the currently running containers by the following command;

```bash
docker ps
```

If your setup is well and running, you will obtain a response similar to;

![running-containers-response](/engineering-education/set-up-containerize-and-test-a-single-hadoop-cluster-using-docker-and-docker-compose/running-containers-response.png)

### Testing the Hadoop cluster
Go over to your terminal tab and run the following command to get the IP address of the running Hadoop Docker container. The IP address will help us to access the Hadoop cluster on the browser. In addition, the local IP address will map to the Hadoop Docker container port number.

```bash
ifconfig
```

![ip-address-response](/engineering-education/set-up-containerize-and-test-a-single-hadoop-cluster-using-docker-and-docker-compose/ip-address-response.png)

Your IP address will be the `inet addr` value in the third line in the above figure.

From your browser, go to: `your_ip_address:50070`. Make sure you replace your IP address appropriately.

If everything worked correctly, you should receive a Hadoop UI on your browser.

![hadoop-ui](/engineering-education/set-up-containerize-and-test-a-single-hadoop-cluster-using-docker-and-docker-compose/hadoop-ui.png)

You will get this page where you can see all the DataNode and NameNode information.

### Wrapping up
At this point, we have managed to run a Hadoop cluster using Docker by just following some simple steps. Since your containers are currently running now, you can either `stop` or `pause` it if you are done with interacting with it.

- Stopping will release all the resources that it was using while running.
- Pausing will not release the resources but will just block scheduling.

To exit from the current `bash` environment, you just have to type in `exit` and press enter.

To stop or pause a running container, we have the following commands;

```bash
sudo docker pause <container_id>
sudo docker stop <container_id>
```

The container ID is accessed by running;

```bash
sudo docker ps -a
```

Happy Hacking!!

---

Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)