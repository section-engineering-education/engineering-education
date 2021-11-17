---
layout: engineering-education
status: publish
published: true
url: /spring-cloud-k8/
title: Guide to Spring Cloud Kubernetes (K8s)
description: This tutorial will walk the reader through the process of creating a Spring Cloud Kubernetes application. Spring Cloud is a Spring module that offers RAD (Rapid Application Development) functionality to the Spring framework.
author: odiwuor-amos
date: 2021-07-26T00:00:00-11:30
topics: [Containers]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/spring-cloud-k8/hero.png
    alt: Spring Cloud K8 image
---
In this tutorial, we will learn how to use Kubernetes and Spring Cloud to build a micro-service application and integrate it with Spring Boot. Spring Cloud is a Spring module that offers RAD (Rapid Application Development) functionality to the Spring framework.
<!--more-->
With the assistance of the Spring Cloud Framework, we can easily create the cloud-based allocation.

### Table of contents
  - [Prerequisites](#prerequisites)
  - [Objectives](#objectives)
  - [Getting started](#getting-started)
  - [Setting up the project](#setting-up-the-project)
  - [Kubernetes service discovery interface](#kubernetes-service-discovery-interface)
  - [Creating MongoDB service](#creating-mongodb-service)
  - [Setting up MongoDB on the Agency Service](#setting-up-mongodb-on-the-agency-service)
  - [Deployment](#deployment)
  - [Conclusion](#conclusion)

### Prerequisites
- You should have [Minikube](https://minikube.sigs.k8s.io/docs/start/) locally installed on your machine.
- Understanding RESTful APIs.
- You should be familiar with setting up application cluster nodes.

### Objectives
This tutorial will teach you everything you need to know about Spring Boot micro-services, how to integrate them with Kubernetes, and deploy them on Minikube.  

### Getting started
In this tutorial, we'll build a simple agency application that provides services to clients. These clients are provided with a way to query the agency services from time to time. 

This project will help us understand a few basic concepts such as:
- Discovering services using the Spring Cloud K8.
- How to use Spring Cloud K8 Ribbon for load balancing.
- Concepts of ConfigMaps using Spring Cloud K8-Config.

### Setting up the project
In this section, we'll install [Minikube](https://minikube.sigs.k8s.io/docs/start/) locally on our development machine using the `VirtualBox VM driver`. [Section](/engineering-education/introduction-to-kubernetes/) has a pool of content on Kubernetes that will help get you started. Feel free to browse or search for K8 related topics on the given link.

Let's start by running a single-node Kubernetes cluster as follows: 

```bash
minikube start --vm-driver=virtualbox
```

What this command does is it creates a virtual machine, in our case, VirtualBox is running a minikube cluster.  

Now that we have the Minikube running, let's connect it to the dashboard.  

```bash
minikube dashboard
```

![Dashboard screenshot](/engineering-education/spring-cloud-k8/dashboard.png)

### Kubernetes service discovery interface
As discussed earlier, this project will cover the K8 `ServiceDiscovery` interface implementation. It is important to note that micro-services have multiple pods running a single service.

If we have a Spring Boot application running in a pod within the same Kubernetes cluster, we can easily fetch the endpoints exposed by Kubernetes (service as a collection).

Let's proceed and set up this service in our application.

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-kubernetes</artifactId>
</dependency>
```

In the `XML` file above, we've defined the dependencies for the [Spring Cloud starter Kubernetes](https://search.maven.org/search?q=g:org.springframework.cloud%20a:spring-cloud-starter-kubernetes) on the client app to enable service discovery.

Now, let's add the `@EnableDiscoveryClient` annotation and inject the `ClientController` in our controller using `@Autowired` as shown below:

```java
@SpringBootApplication
//here is our service discovery
@EnableDiscoveryClient
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
// we then set it in our client controller class
@RestController
public class ClientController {
    @Autowired
    private DiscoveryClient discoveryClient;
}
```

### Creating the MongoDB service
In this section, we'll define our MongoDB service and a deployment configuration file. First, we need to define the secret username and password for the deployment.

```yml
# application version 1
apiVersion: v1.0.0
# we're creating a secret for our database
kind: Secret
metadata:
  name: db-secret
data:
# specifiy the password and username
  username: johndoe
  password: mypassword

```

Upon defining the configuration above, run the following command to add it to the Kubernetes cluster.

```bash
kubectl apply -f secret.yaml
```

Output:  

```bash
secret/db-secret created
```

Proceed to add the following configurations in our deployment `YAML` file.   

```yml
# api version definition
apiVersion: extensions/v1beta1
# we're deploying this application
kind: Deployment
metadata:
# creating MongoDB service
  name: mongo
spec:
# with a single replica
  replicas: 1
  template:
    metadata:
      labels:
        service: mongo
      name: mongodb-service
      # we're describing the object here in details
    spec:
      containers:
      - args:
        ...
        image: mongo:latest
        name: mongo
        env:
          - name: MONGO_ROOT_USERNAME
            valueFrom:
            # these are secret values(username) we defined in the previous section
              secretKeyRef:
                name: db-secret
                key: username
          - name: MONGO_ROOT_PASSWORD
            valueFrom:
              secretKeyRef:
              # this password is retrieved from the previous section
                name: db-secret
                key: password
```

This deployment configuration file creates a `mongo: latest image`. It also sets the username and password that we created earlier with a default admin database.

### Setting up MongoDB on the agency service
Let's start by updating the properties to add the database credentials as shown below:

```bash
# we're updating this properties file with the db-secret that created previously
spring.cloud.kubernetes.reload.enabled=true
# setting the secret name
spring.cloud.kubernetes.secrets.name=db-secret
# the db host
spring.data.mongodb.host=mongodb-service
# specifying the port to use
spring.data.mongodb.port=27017
# The database name here is defaulted to admin
spring.data.mongodb.database=admin
# for security, we hide the username and password as they are sensitive
spring.data.mongodb.username=${MONGO_USERNAME}
spring.data.mongodb.password=${MONGO_PASSWORD}
```

Now that we better understand how this application works, we can clone the [complete code](https://replit.com/@odiwuoramos/spring-cloud) and test it locally on our machine or play around with the code on the hosting platform.

### Deploying Spring Cloud application
In this section, we will explore the Spring Cloud application deployment. Therefore, we set up our application in the script file as shown below. Each command has a comment that guides you on what it does.   

```bash

..........
# these commands build the docker images on minikube
# cd into the service
cd travel-agency-service
# running the docker build
docker build -t travel-agency-service .
cd ../client-service
docker build -t client-service .
cd ..

# removing the services
kubectl delete -f travel-agency-service/secret.yaml
kubectl delete -f travel-agency-service/mongo-deployment.yaml
# sets up the secret and mongodb services in the .yaml file
kubectl create -f travel-agency-service/secret.yaml
kubectl create -f travel-agency-service/mongo-deployment.yaml

# setting up the travel-agency-service
kubectl delete -f travel-agency-service/travel-agency-deployment.yaml
kubectl create -f travel-agency-service/travel-agency-deployment.yaml

............
# run checks on pods to check if they are indeed running
kubectl get pods

```

### Conclusion
In this tutorial, we've seen how we can set up a Spring Cloud project and use Spring Boot and Kubernetes to integrate a micro-service platform application with each providing great performance.

The full source code can be found [here](https://replit.com/@odiwuoramos/spring-cloud#kubernetes-guide/client-service/client-config.yaml).

Happy coding!

---
Peer Review Contributions by: [Eric gacoki](/engineering-education/authors/eric-gacoki/)
