---
layout: engineering-education
status: publish
published: true
url: /kubernetes-best-technology-running-cloud-native-database/
title: Why Kubernetes is the Best Technology for Running Cloud Native Database
description: This article will cover the basics of cloud native databases and explain why kubernetes is the best technology for running them. It will provide an overview of principles that make Kubernetes a superb technology.
author: ephraim-gathoni
date: 2021-07-14T00:00:00-10:30
topics: [Containers , API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/kubernetes-best-technology-running-cloud-native-database/hero.jpg
    alt: kubernetes example image
---
For a long time, every organization’s dream is to migrate its workload to the cloud. However, the statistics from most IT organizations show that there is still much work to be done.
<!--more-->
Although databases in the cloud have been around for a long time, the challenges with persisting and moving the cloud data have led to a slower cloud adoption. For this reason, the demand for data infrastructure that encompasses the full advantage of cloud computing has been on the rise.

This article takes you through an overview of cloud native databases and explains why [Kubernetes](/engineering-education/search/?q=Kubernetes) is the best technology for running them. 

### An overview of cloud native databases
A [cloud-native database](https://www.networkcomputing.com/cloud-infrastructure/what-are-cloud-native-databases-and-why-should-you-use-them) is a service built, deployed and delivered to the client through a cloud platform. This cloud nativity makes the database unique compared to other databases types. It is implemented by installing the database software on top of a cloud infrastructure.

It has to be scalable, flexible, resilient, observable, and supports automation. A good example will be the [K8ssandra project](https://k8ssandra.io/get-started/), which bundles [Apache Cassandra](https://cassandra.apache.org/) and its supporting tools into production-ready Kubernetes deployment.

A simple confusion arises if it is a must that any database running on Kubernetes be considered cloud-native. [Kubernetes](https://kubernetes.io/) was initially developed for [stateless workloads](https://dzone.com/articles/kubernetes-and-running-stateful-workloads), but with recent developments such as persistent volumes and stateful sets, it is now possible to run [stateful workloads](https://dzone.com/articles/kubernetes-and-running-stateful-workloads).

The longtime DevOps practitioners who were at first skeptical about running databases on Kubernetes have now started adopting it, and best practices are emerging.

For the databases to be more cloud-native as they should be, there is a great need to embrace what Kubernetes brings to the table.

A truly cloud-native approach has to be followed, meaning adopting vital elements of the Kubernetes design paradigm. For example, a database that can work effectively on Kubernetes can be considered cloud-native.

Lets look at the design principles of Kubernetes to understand why it is the best technology for running cloud native databases.

### Kubernetes design principles
#### Principle 1: Leverage computing, networking, and storage
One of the anticipated successes in cloud computing is the commoditization of computing, networking, and storage as resources provisioned via [APIs](https://apifriends.com/api-management/what-is-an-api/).

Kubernetes comes with its APIs to provide the above services for the world of containerized applications. In addition, Kubernetes resources promote applications’ portability across all its distributions and service providers.

In databases, the applications leverage compute, networking, and storage to allow for data persistence and retrieval, as further explained below:

- **Compute**: a database would need enough execution power to analyze incoming data and queries. Therefore, each database node will be regarded as a [pod](https://kubernetes.io/docs/concepts/workloads/pods/) and grouped in stateful sets to enable Kubernetes to manage and scale accordingly.
- **Network**: here, the database has to display an interface for data and control. The [Kubernetes services](https://kubernetes.io/docs/concepts/services-networking/service/) and [ingress controllers](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/) can be used to display these interfaces.
- **Storage:** a database will use [persistent volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) of specified storage classes for data storage and retrieval.

Viewing the database in the above-explained terms takes away much of Kubernetes' deployment complexity.

#### Principle 2: Separating control and data planes
Kubernetes supports the splitting of control and data planes. The [Kubernetes API server](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/) acts as the primary [data plane](https://spot.io/what-is-kubernetes-data-plane/) interface, and its purpose is to request computing resources. 

The [control plane](https://kubernetes.io/docs/concepts/overview/components/) assists in managing the details of mapping those requests onto the underlying [IaaS](https://azure.microsoft.com/en-us/overview/what-is-iaas/) platform.

The above can also be applied to databases. For instance, Cassandra's data plane contains two ports. Each node will expose one of the ports for the clients to access [Cassandra Query Language](https://cassandra.apache.org/doc/latest/cql/) (CQL), and the other port will be used for internode interactions.

The control plane has the [Java Management Extensions](https://www.baeldung.com/java-management-extensions) (JMX) interface, which comes from every Cassandra node. JMX has some security vulnerabilities, but it is a standard and relatively simple task to take a cloud-native approach. 

In K8ssandra, Cassandra is built in a customized container image that includes a [RESTful Management API](https://docs.microsoft.com/en-us/rest/api/apimanagement/apimanagementrest/api-management-rest), hence no need for the JMX interface.

The remaining part of the control plane contains the logic that supports the Management API to control Cassandra nodes. The Kubernetes operator pattern does it. 

Operators determine custom resources and use control loops that monitor the state of those resources then take actions to move them to their desired state. It helps Kubernetes in extending the domain-specific logic.

The K8ssandra project utilizes a [cass-operator](https://docs.datastax.com/en/cass-operator/doc/cass-operator/cassOperatorAbout.html) to automate most of Cassandra's operations. The cass-operator describes a [CassandraDataCenter](https://www.datastax.com/blog/distributed-database-things-know-cassandra-datacenter-racks) custom resource to represent every higher-level failure domain of a [Cassandra cluster](https://data-flair.training/blogs/cassandra-cluster). In addition, it creates a top-level abstraction based on stateful sets and persistent volumes.

#### Principle 3: Making observability easy
The three main characteristics of observable systems include metrics, logging, and tracing. For example, Kubernetes exposes the logs of every container to third-party log aggregation software. Metrics and tracing are more technical to implement, but multiple solutions are available.

The K8ssandra project provides metrics collection by using [Kube-Prometheus-Stack](https://docs.syseleven.de/metakube/de/metakube-accelerator/building-blocks/observability-monitoring/kube-prometheus-stack). The [Metrics Collector for Apache Cassandra](https://www.datastax.com/blog/monitoring-apache-cassandratm-made-simple) (MCAC) is deployed as an agent on every node. It provides a customized metrics endpoint. 

A [Service Monitor](https://sysdig.com/blog/kubernetes-monitoring-prometheus-operator-part3/) from `Kube-Prometheus-Stack` gets metrics from individual agents and stores them in [Prometheus](https://prometheus.io/) to be used by [Grafana](https://grafana.com/) or any other visualization analysis tools.

#### Principle 4: Making the configuration secure
Networking in Kubernetes should be secure at all times; ports have to be precisely exposed to be accessed externally to a pod. It sets an important criterion when deploying the database on how every control plane and data plane interface is exposed, also the interfaces that should be exposed through the Kubernetes service.

In K8ssandra, for every `CassandraDataCenter` resource, the `CQL` access should be exposed as a service. The APIs for metrics and management are accessed by the `cass-operator` and the [Prometheus Service Monitor](https://medium.com/kubernetes-tutorials/simple-management-of-prometheus-monitoring-pipeline-with-the-prometheus-operator-b445da0e0d1a) in every Cassandra node.

Kubernetes comes with features that allow for the sharing of encryption keys and the configuration of administrative accounts. For example, most K8ssandra deployments prefer changing Cassandra's default admin account details with a new admin username and password.

#### Principle 5: Preferring declarative configuration
With the declarative approach in Kubernetes, the desired state of resources and controllers are specified. It assists in the manipulation of the underlying infrastructure to achieve the specified state.

The `cass-operator` specifies the required number of nodes in a given cluster. It also helps to manage the details of adding new nodes for scaling up and choosing which nodes to remove to scale down.

The next phase of operators ought to set the rules for stored data size, the number of transactions per second, or even both.

It may be possible to [specify the cluster sizes and move less frequently needed data](https://www.section.io/global-edge-network/) to object storage.

### Conclusion
It is clear enough that Kubernetes provides the best practices for cloud-native database implementations, and innovation is still ongoing.

Solutions for integrating Kubernetes clusters are still in the development phase, but in the future, it will be easy to manage multi-datacenter Cassandra clusters in Kubernetes.

Cassandra community is constantly working to make more extensions for management and metrics to be part of the core Apache project. This will make Cassandra more cloud-native to everyone and become an out-of-the-box solution.

Happy learning!

---
Peer Review Contributions by: [Onesmus Mbaabu](/engineering-education/authors/onesmus-mbaabu/)
