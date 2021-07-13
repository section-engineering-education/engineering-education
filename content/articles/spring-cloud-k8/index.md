### Tutorial overview

In this tutorial, I'll show you how to use Kubernetes and Spring cloud to build your microservice application. It'll be an interesting project that will walk you through the whole process of integrating Kubernetes with Spring Boot applications.

### Table of contents

- [Tutorial overview](#tutorial-overview)
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Getting started](#getting-started)
- [Project setup](#project-setup)
- [Kubernetes service discovery interface](#kubernetes-service-discovery-interface)
- [Creating MongoDB service](#creating-mongodb-service)
- [Setting up MongoDB on the Agency Service](#setting-up-mongodb-on-the-agency-service)
- [Deployment](#deployment)
- [Conclusion](#conclusion)

### Prerequisites

- You should have [minikube](https://minikube.sigs.k8s.io/docs/start/) locally installed on your machine.
- Understanding RESTful APIs.
- You should be familiar with setting application cluster nodes.

### Objectives

This tutorial will teach you everything you need to know about Spring Boot microservices, how to integrate them with Kubernetes, and deploy it on Minikube.  

### Getting started

 In this tutorial, we'll be building a simple agency application to provide services to clients. These clients are provided with a way to query the agency services from time to time. This project will help us understand a few basic concepts such as:

- Discovering services using the Spring Cloud K8
- How to use Spring Cloud K8 Ribbon for load balancing
- Concepts of `config maps using Spring cloud K8 Config

### Project setup

In this section, we install the [minikube](https://minikube.sigs.k8s.io/docs/start/) locally on our development machine, in this tutorial, we'll be using the `Virtualbox VM driver`. [section.io](https://www.section.io/engineering-education/introduction-to-kubernetes/) has a pool of content on Kubernetes that will get you started. Feel free to browse or search for K8 related topics on the link above.

Now, let's start by running a single-node Kubernetes cluster as follows:  

```bash
minikube start --vm-driver=virtualbox
```

What this command does is quite simple, it creates for us a virtual machine, in this case, VirtualBox running a minikube cluster.  

Now that we've Minikube running, let's connect it to the dashboard.  

```bash
minikube dashboard
```

![Dashboard-Screenshot](/engineerng-education/spring-cloud/dashboard.png)

### Kubernetes service discovery interface

As we had discussed earlier, this project will cover the K8 `ServiceDiscovery` interface implementation. We need to note that microservices have multiple pods running a single service.

Now if we have a Spring Boot application running in a pod within the same Kubernetes cluster, we could easily fetch the endpoints exposed by Kubernetes (service as a collection).

Now that we've got a basic understanding of how important this service, let's proceed and set it up in our application.  

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-kubernetes</artifactId>
</dependency>
```

In the above XML file, we've defined the dependencies for the [spring-cloud-starter-kubernetes](https://search.maven.org/search?q=g:org.springframework.cloud%20a:spring-cloud-starter-kubernetes) on the client app to enable service discovery.

Now let's add the `@EnableDiscoveryClient` and inject the `ClientController` in our controller using the `@Autowired` as shown below:

```java
@SpringBootApplication
//here is our service discovery
@EnableDiscoveryClient
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
//we then se it in our client controller class
@RestController
public class ClientController {
    @Autowired
    private DiscoveryClient discoveryClient;
}
```

### Creating MongoDB service

In this section, we define our MongoDB service and a configuration file for deployment. But first, we need to define both the Secret username and password to use for deployments.

```yml
# application version 1
apiVersion: v1.0.0
# we're creating a secret for our database
kind: Secret
metadata:
  name: db-secret
data:
# specifiy the password and username
  username: test==
  password: test=

```

Upon defining the configuration above, ensure you run the following command to add it to the Kubernetes cluster.

```bash
kubectl apply -f secret.yaml
```

Output:  

```bash
secret/db-secret created
```

Now proceed and add the following configurations in our deployment `YAML` file.  

```yml
# api version definition
apiVersion: extensions/v1beta1
# we're deploying this application
kind: Deployment
metadata:
# creating mongodb service
  name: mongo
spec:
# with a single replica
  replicas: 1
  template:
    metadata:
      labels:
        service: mongo
      name: mongodb-service
    spec:
      containers:
      - args:
        - mongod
        - --smallfiles
        image: mongo:latest
        name: mongo
        env:
          - name: MONGO_INITDB_ROOT_USERNAME
            valueFrom:
            # these are secret values(username) we defined in the previous section
              secretKeyRef:
                name: db-secret
                key: username
          - name: MONGO_INITDB_ROOT_PASSWORD
            valueFrom:
              secretKeyRef:
              # this password is retrieved from the previous section
                name: db-secret
                key: password
```

This deployment configuration file creates a `mongo: latest image. It then sets both of its username and password we created previously with a default`admin` database.

### Setting up MongoDB on the Agency Service

Let's start by updating the properties to add the database credentials as shown below:

```properties
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

Now that we have got a complete setup of how this application works, clone the complete code on <https://replit.com/@odiwuoramos/spring-cloud> and test the application on your local machine or as well play with the code on the hosting platform.

### Deployment

To deploy our application, we setup the bash script as shown below with comments for each command:  

```bash

### first step involves building the repository
mvn clean install

### Set the docker environment for the application
eval $(minikube docker-env)

### these commands build the docker images on minikube
cd travel-agency-service
docker build -t travel-agency-service .
cd ../client-service
docker build -t client-service .
cd ..

### sets up the secret and mongodb services
kubectl delete -f travel-agency-service/secret.yaml
kubectl delete -f travel-agency-service/mongo-deployment.yaml

kubectl create -f travel-agency-service/secret.yaml
kubectl create -f travel-agency-service/mongo-deployment.yaml

### setting up the travel-agency-service
kubectl delete -f travel-agency-service/travel-agency-deployment.yaml
kubectl create -f travel-agency-service/travel-agency-deployment.yaml

### setting up the client-service
kubectl delete configmap client-service
kubectl delete -f client-service/client-service-deployment.yaml

kubectl create -f client-service/client-config.yaml
kubectl create -f client-service/client-service-deployment.yaml

# run checks on pods to check if they are indeed running
kubectl get pods

```

### Conclusion

In this tutorial, we've seen how we can set up a Spring Cloud Kubernetes project.
We've seen how we can use both tools to set up a microservice platform application with each providing its best `power`.

The full source code is available [here](https://replit.com/@odiwuoramos/spring-cloud#kubernetes-guide/client-service/client-config.yaml)
