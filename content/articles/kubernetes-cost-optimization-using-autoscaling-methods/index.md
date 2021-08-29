---
layout: engineering-education
status: publish
published: true 
url: /kubernetes-cost-optimization-using-autoscaling-methods/
title: Kubernetes Cost Optimization using Autoscaling Methods
description: Running more workloads on the same server instance might seem more cost-effective. But tracking which projects or teams generate Kubernetes costs is challenging.
author: grace-mumbi
date: 2021-08-08T00:00:00-05:27
topics: [Containers]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/kubernetes-cost-optimization-using-autoscaling-methods/hero.jpg
    alt: Kubernetes cost optimization using autoscaling methods cover image 
---
Kubernetes is a popular container orchestrator. Its major strengths include its capacity to manage and respond to dynamic environments. Kubernetes deploys, manages, and automatically scales container resources in multiple ways.

The modern cloud is developed in a way that you pay only for the resources you consume. Thus, Kubernetes' ability to perform proper autoscaling of resources is key to optimizing Kubernetes' costs.

Kubernetes supports multiple autoscaling approaches. This article will dig deeper into different methods for controlling the scaling of clusters and pods in Kubernetes. Also, discuss how to use Kubernetes autoscaling mechanisms to drive Kubernetes cloud costs down.

### Kubernetes autoscaling methods
Autoscaling is very critical to Kubernetes resource management. Kubernetes scales up and down to help you request additional resources and hand them back when they are not on demand.

We can understand this more by introducing the concept of dynamic resource management. This concept promotes optimal resource utilization by ensuring that virtual resources consume physical resources on demand. This way, the host accommodates more virtual resources than it could otherwise.

The concept of dynamic resource management enables the automation, scaling, and management of the state of pods, applications, clusters, and entire deployments.

There are several solutions for controlling scaling in Kubernetes. In this post, we will discuss two broad Kubernetes scaling aspects. These are:
- Scaling clusters
- Scaling pods

### Scaling clusters
Managing scale in Kubernetes involves the use of Cluster Autoscaler (CA). Pod autoscaling only operates within the limits of the cluster's infrastructure resources, which is a significant disadvantage. Pod autoscaling only operates within the limits of infrastructure resources provided by the cluster. This is a significant disadvantage. Cluster autoscaler solves this issue in two ways:
- It requests additional nodes from cloud providers to add to the cluster.
- It deallocates nodes from the cluster on an as-needed basis.

Cluster Autoscaler works by altering the number of nodes in a cluster. Because the autoscaler controller functions at the infrastructure level, it must be permitted to delete or add infrastructures. 

Thus, you need to employ best practices such as the [principle of least privilege](https://digitalguardian.com/blog/what-principle-least-privilege-polp-best-practice-information-security-and-compliance#) when working with this cluster scaling methodology. Also known as the principle of least authority or minimum privilege.

This concept states that any process, user, or program should have minor access rights required to perform its functions.

#### How CA optimizes Kubernetes costs
If the available resources fall short of computing demand, the pods get stuck into a pending state. Pods in this state require more resources before they continue operating. Requiring these resources triggers Kubernetes to request additional nodes and add the pending pods to any new nodes. CA monitors those pods in a pending state. It also detects nodes that are no longer in use and scales down those resources.

Cluster autoscaler has expanders functionality that selects the node group you want new nodes to be added. PodDisruptionBudgets ([PDB](https://kubernetes.io/docs/tasks/run-application/configure-pdb/)) enable you to define your cluster operating budget and configure how pods are removed or added to manage resource utilization.

Managing the costs of running Kubernetes clusters on cloud platforms generally involves a dynamical scaling of nodes to balance the present cluster utilization. When designing any workload, ensure that it scales to meet the current demand.

### Scaling pods
Scaling pods is a straightforward way of scaling deployments. Often, you may what to create additional resources for a specific pod instance. Also, may you want to spread a workload to a single application across multiple container instances by creating further instances to a pod. Scaling pods comes in to help in such situations.

Pods are scaled within the limits of currently available resources. Assuming that you have a node with 16GM of spare RAM that is not in use now, you can schedule another pod onto that node. The loading or pressure on a cluster running a collection of pods may exceed limits. When this happens, you scale up the entire cluster as we have described in the first section.

There are two approaches to scaling pods: vertical pod autoscaling and horizontal pod autoscaling.

Let us discuss each of the two methods in detail.

#### Scaling pods horizontally
Horizontal scaling allows you to scale up and down the number of pods depending on set metrics. Kubernetes offers Horizontal Pod Autoscaler (HPA) service to enable you to scale pods horizontally. 

Scaling is based on the target value. You can, for example, create metrics on CPU utilization and work to develop more pods to distribute load if CPU usage is busy.

#### Scaling pods vertically
Vertical pod autoscaling works by increasing or reducing pod container memory and CPU resource requests to ensure that the allocated cluster resources match actual usage. Vertical pod autoscaling is performed using the vertical pod autoscaler (VPA) mechanism. VPA also replaces pods managed by the replication controller. It thus needs access to the Kubernetes metrics server.

#### Horizontal vs. vertical autoscaling in Kubernetes
Horizontal autoscaling is based on rules that start or stop instances assigned to a resource when they reach the upper or lower limits. Vertical autoscaling allows you to set laws affecting the RAM and CPU resources allocated to an existing instance.

##### Limitations of horizontal autoscaling
- Instances take minutes to load, and this may affect scaling in case of unexpected demand peaks.
- It would help build your applications with a scale-out in mind to ensure workload distribution across multiple servers.

##### Limitations of vertical autoscaling
- You keep on paying for resources even when they are not in use at some moments.
- Network-related limitations bring about connectivity ceilings for underlying physical hosts.
- You are limited by upper memory and CPU boundaries for a single host.

### How HPA and VPA optimize Kubernetes costs
Horizontal Pod Autoscaler (HPA) is a core functionality of Kubernetes, and it is very significant to resource optimization. HPA scales add or remove pod container collections, thus changing the number of pod replicas as needed. Autoscaler workflows, like HPA, work by checking various metrics and assessing whether the set thresholds have been met, and reacting accordingly.

HPA ensures pod scaling and distribution over an entire available Kubernetes cluster. HPA ensures that the resources in pods residing on particular nodes are readily available and just enough. With VPA, you have control over resources (memory and CPU) available to a pod. This process is automatic. It scales the pod automatically when the pod is faced with out-of-memory instances. VPA allows you to set maximum and minimum limits for resource allocation. This means that you have control over costs budgets.

Estimates guide you in setting the limits for resource usage by a pod. [VPA recommender](https://github.com/kubernetes/autoscaler/blob/master/vertical-pod-autoscaler/pkg/recommender/README.md) gives an estimate of resource requests by a pod-based on historical and current resource-usage data. This recommendation factors in out-of-memory events but does not recommend resource limits. So carefully set the limits and avoid monopolizing resources.

### Conclusion
With the correct configuration of Kubernetes scaling mechanisms, you are sure to reduce wastage of resources and lower the cost of running your application. Using one or more of the above autoscaling options reduces your overhead in managing Kubernetes resources and promotes efficient use of infrastructure resources.

Happy learning!

---
Peer Review Contributions by: [Briana Nzivu](/engineering-education/authors/briana-nzivu/)