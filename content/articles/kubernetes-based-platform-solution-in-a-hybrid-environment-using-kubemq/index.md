---
layout: engineering-education
status: publish
published: true
url: /kubernetes-based-platform-solution-in-a-hybrid-environment-using-kubemq/
title: Building a Kubernetes-based Solution in a Hybrid Environment using KubeMQ
description: This article takes the reader through building a Kubernetes-based solution in a hybrid environment using KubeMQ. KubeMQ is a messaging platform that is also Kubernetes native and built for integrating clusters and nodes across different locations.
author: lewel-murithi
date: 2021-07-30T00:00:00-16:00
topics: [Edge Computing, Containers]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/kubernetes-based-platform-solution-in-a-hybrid-environment-using-kubemq/hero.jpg
    alt: Kubernetes-based solution Hybrid Environment using KubeMQ Hero Image
---
[Kubernetes](https://kubernetes.io/) offers a new way to deploy, manage, and scale container-based workloads. It offers additional features that allow the building of [clusters](https://www.capitalone.com/tech/cloud/what-is-a-cluster/) in multiple clouds, span clouds, on-premises environments, and edge computing deployments.
<!--more-->
Lately, it has been easier to work across clouds and edges through the Kubernetes native confederation or even third-party control planes. It assists in the management of discrete clusters from the same dashboard.

### Introduction
However, the primary purpose of Kubernetes is to deploy applications. This means that Kubernetes does not know the location, topologies, or even architectural distribution of clusters. It also offers scalability and assists in integrating clouds to the edge. However, it is restricted to the application that it is built-in and deployed at.

The developer needs to know the details mentioned above, introducing way too much complexity and overhead into the development lifecycle. To solve the issue, developers use a messaging platform abstraction layer. [KubeMQ](https://kubemq.io/) is one of the solutions to the issues. As explained further in this article.

### KubeMQ
KubeMQ is a messaging platform that is also Kubernetes native and built for integrating clusters and nodes across different locations. KubeMQ utilizes operators to make the deployment more straight-forward. It also uses trusted technologies. 

KubeMQ uses [Bridges](https://kubemq.io/kubemq-bridges/) to integrate different Kubernetes environments. These environments include federations, span clouds, edges, and discrete clusters.

### Cross/hybrid cloud bridges
There are two common ways to deploy Kubernetes in hybrid environments. These are cloud to cloud and cloud to on-premise deployments.

The deployments may come from using a single node control plane such as [Rancher](https://rancher.com/why-rancher/___hybrid-multi-cloud/), [Platform9](https://platform9.com/managed-kubernetes/), or [Gardener](https://gardener.cloud/) to create several clusters managed from a single location, or using [Kubernetes federation](https://github.com/kubernetes-sigs/kubefed) to create a cluster covering several regions. The Kubernetes federation model has mainly been adopted lately.

However, creating hybrid deployments adds more complexity. This is usually experienced when managing applications deployed on multiple clusters that need to communicate to each other.

For instance, an organization might have hosted most of its transactional systems in [AWS](https://aws.amazon.com/). Most were initially developed to run on [Lambdas](https://aws.amazon.com/lambda) and [Fargate](https://aws.amazon.com/fargate/), and the organization does not want to move them any time soon.

However, the organization has also developed the most analytical capabilities to operate on the [Google Cloud](https://cloud.google.com/) Platform. The reason being their team was conversant with [BigQuery](https://cloud.google.com/bigquery/) and [Data Studio](https://datastudio.google.com/). The new data platform uses [GKE](https://cloud.google.com/kubernetes-engine/), which is Google’s managed Kubernetes and a native combination of Google Analytics information.

Making changes to the existing systems to be aware of the partition adds more complexity and overhead. Instead, it may be better to build a platform on top that will distribute the messages and data between multiple clouds without changing the system itself. KubeMQ bridges clouds without the systems being aware.

KubeMQ bridges come with many ways of exchanging information from one cluster to another through topologies. KubeMQ is not limited to only message delivery but can also transform messages during cross-cluster communication.

KubeMQ bridges allow the binding of multiple clusters together. This enables the building of architectures where information is retrieved from caches, databases, and services in one cluster then transferred to other clusters for more processing and storage. It only needs the simple configuration of the YAML file for the KubeMQ Bridge.

KubeMQ's value is not restricted to integrating massive clusters and architectures. However, it is also useful in environments where data has to be collected from different devices and it requires the computation to be done as close as possible, like in edge computing.
 
### Edge computing
Kubernetes has progressed in integrating cloud platforms with edge infrastructure, especially deployments where computing needs to be closer to the user.

Edge computing nodes may have resource constraints, resulting in different [resource usage patterns](https://www.section.io/adaptive-edge-engine/) where a part of the workload needs to happen closer to the end-user. Heavy and less constrained processing can be performed upstream in the cloud.

For instance, modern security cameras may benefit from better-connected topologies. AI-driven functionality is integrated into the camera hardware and assists in classifying different types of activities under surveillance, such as if a pet or human is near the camera frame.

However, the actual video storage and transcoding into different formats can not happen on the same device (currently) since it needs computing resources. A solution is to build a stream-based architecture where the edge node is moved closer to the client. This improves the user experience.

[KubeEdge](https://kubeedge.io/en/) is a Cloud Native Computing Foundation ([CNCF](https://www.cncf.io/)) project whose purpose is to deploy containerized systems in the cloud and at the edge. It also involves integrating IoT devices to support the [MQTT](https://mqtt.org/) protocol.

KubeMQ was built to operate in an edge environment. Both on the KubeEdge deployment within the cloud and the edge nodes. It requires fewer resources; hence it can execute [Edge-specific Kubernetes distributions](https://docs.kubemq.io/#kubernetes-ready), such as [K3s](https://k3s.io/) and [MicroK8s](https://microk8s.io/). 

This enables KubeMQ to form a bridge between edge nodes and other powerful computer nodes executing in a cloud. Hence messages can be pushed upstream as required. KubeMQ also enables a [source to process MQTT messages](https://docs.kubemq.io/configuration/connectors/kubemq-sources/messaging/mqtt) directly from the broker. 

This gives IoT devices the ability to engage in a more extensive micro-services-based architecture with little effort. It enables users to develop systems that can collect and sort information from many hardware devices and develop real-time capabilities at the edge.

KubeMQ can assist in creating and managing systems operating at the edge environments. It also ensures that projects cannot stop when addressing deployments that are resource-constrained.

### Conclusion
Since Kubernetes provides a better container deployment system, a shift to hybrid cloud computing has been experienced. Most organizations opt for hybrid cloud computing since it can be implemented as a single control plane that manages multiple clusters, or can create a federated cluster that functions across regions.

Other organizations embrace deployments that can span cloud and on-premise infrastructure to build on capacity, deal with privacy or security concerns, or handle cases where a core system has to stay on-premise. However, the rest of the services can be deployed elsewhere.

Additionally, some organizations are releasing devices where computing resources are co-located with the devices' users. This has enabled them to bridge their cloud deployments with their edge computing needs.

A messaging platform designed to utilize the underlying Kubernetes platform is key to the successful deployment and operational model in hybrid environments. 

KubeMQ bridges enables the creation of micro-service-based architecture that spans on-premise, clouds, and edge devices to create message-driven systems which are highly scalable and can be relied on, hence guaranteeing success.

Happy learning!

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
