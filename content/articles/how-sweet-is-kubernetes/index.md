---
layout: engineering-education
status: publish
published: true 
url: /how-sweet-is-kubernetes/
title: How Sweet is Kubernetes?
description: This article simplifies concepts of Kubernetes. It starts with demystifying the basic concept of micro-service using Fleetman Tracking Application which is built on a simple micro-service architecture, using it further to explain the concepts of Kubernetes.
author: qoyum-olatunde-yusuf
date: 2021-06-16T00:00:00-11:00
topics: [Containers]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-sweet-is-kubernetes/hero.jpeg
    alt: How sweet is Kubernetes cover image 
---
What is your first impression when you hear Kubernetes? I bet you were already thinking, (Oh no, here comes another tech buzzword. Already sounds like a difficult concept). Well, you are not completely right. However, let us dive in!
<!--more-->
### Introduction
We will be using the Fleetman application to explain the concept of Kubernetes.

**Note: You can clone the GitHub repository used to describe this tutorial [here](https://github.com/wizardcalidad/deploying_fleetman_application_with_kubernetes).**

Let us get started.

### Overview of the Fleetman application
The Fleetman Application is an application that tracks the location of trucks as they move around the city of London. Those trucks are each equipped with the Global Positioning System (GPS) and periodically report their position to the central server. It is a simple microservice architecture with little to no complexity. 

This article is not about the Fleetman application. Instead, we will be using Fleetman to understand our content better.

Microservices obey the **SOLID** principle, which is:
- `Single Responsibility Principle`, a module must do one thing, as well as each part of the microservice architecture should do just one thing.
- `The Position Simulation` only simulates the positions of the truck at any point in time, and that is its only job. As soon as the position is calculated and known, the data is transferred to the `Message Queue`. The essence of a queue in any architecture of a microservice is to avoid loss of data. The queue receives the data, keeping it waiting for the request from the position tracker. 

The queue implemented here is **ActiveM.** It is also utilized as a docker container. The position tracker gets the information from the queue and performs many calculations, like calculating the speed a particular truck has covered. **API Gateway** is a cluster gateway and acts as the gatekeeper for authentication. It provides one access point to the cluster and matches all requests incoming to underlying microservices.

![Fleetman microservice](/engineering-education/how-sweet-is-kubernetes/fleetman.png)

### What Kubernetes is
Going by the standard definition: Kubernetes is an open-source system used for orchestration, deployment automation, auto-scaling, and the management of applications in containers.

### What Kubernetes is not
Kubernetes is not a replacement for Docker. It is something more.

#### Kubernetes vs. Docker**
| s/n | Docker  |  Kubernetes  |
|----|----------------------------|:----------------------------------    |
| 1.|Docker is used for building images and managing them in a container.  | Kubernetes manages containers built by Docker effectively, making it an orchestration tool.  |
| 2. |Docker runs on a single node. | Kubernetes runs across clusters. |
| 3. |Docker is built by three y-connector graduates. | Google engineers developed Kubernetes, but it is now being managed as an open-source project |

However, it is better to see how it works with the aid of the Fleetman application that I deployed on my repo as the instructional material.

### Notable concepts in Kubernetes
#### Deployment
Deployment is a configuration script that provides declarative updates to applications. It gives engineers the freedom to describe the life span of an application, such as which image to use for the application, the total number of pods there should be, and how those pods should be updated. 

It also gives the configurative privilege to determine the number of replica sets to be produced per pod. It as well aids with the maintenance of the cluster in order to avoid the minutest downtime. It can be compared to a blueprint of a house. It defines how every pod feature will behave or look. The configuration we are declaring is in the deployment, while the name is in the position simulator. 

The container we used is on `line 17`, and the position simulator released `one` from the Richard Chesterwood repository. As we can see, 'replicas' is specified as our replica set, and the template declares our pod. For a standard, `YAML` file even though it can be separated, to ensure orderliness and separation of concerns, we write the services of each deployment in the same file, separating them with three dashes (-). Some prefer to arrange theirs as all services in a separate file. That is also acceptable.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: position-simulator
spec:
  selector:
    matchLabels:
      app: position-simulator
  replicas: 1
  template: # template defining our pod
    metadata:
      labels:
        app: position-simulator
    spec:
      containers:
      - name: position-simulator
        image: richardchesterwood/k8s-fleetman-position-simulator:release1
        env:
        - name: SPRING_PROFILES_ACTIVE
          value: production-microservice
```

#### Pod
Kubernetes interacts with a container only through the concept of pods. A pod is an abstraction of a container. Each container is entirely saved in a pod. Therefore, we can say that the pod is the only way a Kubernetes system can interact with a container. 

Pods are represented as a template in our `Yaml` files for deployment. If you follow through with the deployment of the position simulator, you will realize that a fragment of the script is declaring our pod.

```yaml
 template: # template defining our pod
    metadata:
      labels:
        app: position-simulator
    spec:
      containers:
      - name: position-simulator
        image: richardchesterwood/k8s-fleetman-position-simulator:release1
        env:
        - name: SPRING_PROFILES_ACTIVE
          value: production-microservice
```

#### Replica sets
A replica set is an abstraction of a pod, almost the same way as pods being an abstraction of a container. Why are replica sets so important? High availability is one of the advantages it offers, which is why it is used for configuration. It ensures applications run well with zero or minimal downtime. 

If a pod seems to be shutting down, we will guarantee there are many other copies with the help of our replica sets. In our cluster, replica sets are stored in one of our nodes and only the `Scheduler` knows. There can be as many replica sets per pod as possible in a node. It is specified as replicas in the deployment we showed above.

#### How does a Replica set differ from Deployment?
There are few differences between deployment and a replica set, the most important one is that:
- A replica set makes sure that a certain number of replicas are running for a pod every time. However, as mentioned earlier, a deployment helps manage Replica Sets and provides declarative updates to the pods alongside other essential features.
- When updates are made to our application for a replica set, the application shuts down as another one is fired up. This is a negative on its part as there would be downtime for the creation period, unlike a deployment that ensures that the old replica sets continue running till the new one is fired up. As soon as the new pod runs, the old one is totally shut down, making sure there is no downtime at all.

#### Node
A node is similar to our laptops. Our laptops can be considered as a node in a real Kubernetes cluster. It is like a personal computer in a cluster where the pods live. It is possible to have several pods in a node, but the fewest count of nodes that can be present in a cluster is two. 

One node can not make a cluster. Inside a node, there is at least a pod and a container that the pod abstracted. At times, there might be a situation where there is more than one container in a pod, but it is not the proper practice. There can also be several pods in a node, with each one having its service. 

![node](/engineering-education/how-sweet-is-kubernetes/node.png)

#### Secrets
To conceal the information in our database, we need a SECRET configuration. The function of a secret is to house or store confidential data that must not be exposed at production.
```yaml
apiVersion: version1
kind: Secret
metadata:
   name: secret
type: Opaque
data:
   mongo-root-username: d2l6YXJkY2FsaWRhZA==
   mongo-root-password: T2xhdHVuZGU4IQ==
```

However, our database username and password are also kept secret. Therefore, the only thing we are exposing is the key generated after converting them to base 64. To convert your username and password, write this simple statement on your terminal.

```bash
echo -n “the content to convert” | base64
```

#### Service
A service is an endpoint or API point for Kubernetes. A Service always has a permanent IP address, and that is why it must be attached to the pod whose IP address changes from time to time when it is down. 

This means the IP of our Service never changes, whereas a pod's IP changes when updated. For such an important reason, there is a service attached to all pods. Several pods can be attached to one service, which further shows how vital our replica sets are. 

Let us pull out the services in the Fleetman application as examples.
```yaml
apiVersion: version1
kind: service
metadata:
  name: Api-Gateway
spec:
  # Explains which pod will be represented by this service
  # The service serves as a network endpoint for one of other 
  # services or users trying to access through the browser.
  selector:
    app: api-gateway-app
  ports:
    - name: http
      port: 8000
      nodePort: 30010
  type: NodePort
```

```yaml
apiVersion: version1
kind: service
metadata:
  name: Mongo-Express
spec:
  selector:
    app: mongo-express-app
  type: NodePort
  ports:
    - protocol: TCP
      port: 8080
      targetPort: 8080
      nodePort: 30080
```

```yaml
kind: service
apiVersion: version1
metadata:
  name: Mongo-db
spec:
  selector:
    app: mongo-db-app
  ports:
    - name: mongoport
      port: 27017
  type: ClusterIP
```

```yaml
apiVersion: version1
kind: service
metadata:
  name: Position-Tracker
spec:
  # Explains which pod will to be represented by this Service
  # The service serves as a network endpoint for one of other 
  # services or users trying to access through the browser.
  selector:
    app: position-tracker-app
  ports:
    - name: http
      port: 8088
  type: ClusterIP
```

```yaml
apiVersion: version1
kind: service
metadata:
  name: webapp
spec:
  # Explains which pod will to be represented by this Service
  # The service serves as a network endpoint for one of other 
  # services or users trying to access through the browser.
  selector:
    app: web-app
  ports:
    - name: http
      port: 80
      nodePort: 30070
  type: NodePort
```

#### Configmap
Configmap is responsible for storing all external configurations of our application. External configurations include all third-party configurations like database URLs and ports.

```yaml
apiVersion: version1
kind: ConfigMap
metadata:
  name: mongo-configmap-
data:
  database_url: mongo-db-app
```

#### Ingress
Ingress addresses the linkage between the IP address in the browser and the right service in the node responsible for answering the request. As we earlier learned, services are attached to pods and are mere access points consisting of ports that later communicate with the pods. 

The process through which pods are scheduled across nodes as replica sets is called the "Master Process." It is done with the aid of a "Scheduler."

![ingress](/engineering-education/how-sweet-is-kubernetes/ingress.png)

Hope you have found this tutorial useful!

Happy coding!

---
Peer Review Contributions by: [Briana Nzivu](/engineering-education/authors/briana-nzivu/)

