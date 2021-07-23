### Tutorial overview
In this tutorial, we will learn how to use Kubernetes and Spring Cloud to build a micro-service application and integrate it with Spring Boot.

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
In this tutorial, we'll build a simple agency application that provide services to clients. These clients are provided with a way to query the agency services from time to time. This project will help us understand a few basic concepts such as:

- Discovering services using the Spring Cloud K8.
- How to use Spring Cloud K8 Ribbon for load balancing.
- Concepts of ConfigMaps using Spring Cloud K8-Config.

### Setting up the project
In this section, we'll install [Minikube](https://minikube.sigs.k8s.io/docs/start/) locally on our development machine using the `VirtualBox VM driver`. [Section.io](https://www.section.io/engineering-education/introduction-to-kubernetes/) has a pool of content on Kubernetes that will get you started. Feel free to browse or search for K8 related topics on the given link.
Let's start by running a single-node Kubernetes cluster as follows: 

```bash
minikube start --vm-driver=virtualbox
```

What this command does is quite simple, it creates for us a virtual machine, in this case, VirtualBox running a minikube cluster.  

Now that we've Minikube running, let's connect it to the dashboard.  

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

In the `XML` file above, we've defined the dependencies for the [Spring Cloud starter Kubernetes](https://search.maven.org/search?q=g:org.springframework.cloud%20a:spring-cloud-starter-kubernetes) on the client app so as to enable service discovery.

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

### Creating MongoDB service
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
  username: test==
  password: test=

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

This deployment configuration file creates a `mongo: latest image`. It also sets the username and password that we created earlier with a default admin database.

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

Now that we have understood how this application works, clone the [complete code](https://replit.com/@odiwuoramos/spring-cloud) and test it locally on your machine or play around with the code on the hosting platform.

### Deployment
To deploy our application, we setup a `bash script` as explained below:  

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
In this tutorial, we've seen how we can set up a Spring Cloud project and use Spring Boot and Kubernetes to integrate a micro-service platform application with each providing great performance.

The full source code can be found [here](https://replit.com/@odiwuoramos/spring-cloud#kubernetes-guide/client-service/client-config.yaml).
