---
layout: engineering-education
status: publish
published: true
url: /kubernetes-clusters-intro/
title: Getting Started with Kubernetes Clusters
description: A Kubernetes Cluster manages containers that consist of nodes that work together to perform a particular operation. In this article, we explore the various alternatives available to deploy containers and understand the components of Kubernetes.
author: sandra-moringa
date: 2021-06-03T00:00:00-10:00
topics: [Containers]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/kubernetes-clusters-intro/hero.jpg
   alt: kubernetes cluster example image
---
A **Kubernetes Cluster** manages containers that consist of many nodes that are working together to perform a particular operation. Several cloud-based service providers allows us to create Kubernetes clusters using few commands. 
<!--more-->
This option is recommended if one is getting started with Kubernetes because it allows us to get things up and running faster. Furthermore, the **minikube** tool only creates a *single-node cluster*. Single node clusters do not have all features of a Kubernetes cluster making cloud providers a better option.

### Installing in Public Cloud Providers
In this section, we will look at how to install Kubernetes in these Cloud Providers:
- Google Cloud Platform.
- Microsoft Azure

1. Google Cloud Platform

To use it, one needs to sign up for [the Platform account](https://console.cloud.google.com/freetrial?_ga=2.256403528.294839319.1619953021-1551188299.1619953021) and install the [gcloud tool](https://cloud.google.com/sdk/docs/install).

> NOTE: We have to enable Billing for us to use this platform.

Once everything is in place, we set our default zone:

```bash
     $ gcloud config set compute/zone <timezone>
```

And create our cluster:

```bash
     $ gcloud container clusters create <cluster>
```

> It may take a few minutes

We can get the cluster's credentials using this command:

```bash
     $ gcloud auth application-default login
```

For detailed instructions, read the documentation [here](https://cloud.google.com/Kubernetes-engine/docs/how-to/).

2. Microsoft Azure

To get started, we click the shell icon in the toolbar to access the already provided shell:

![Shell icon](/engineering-education/kubernetes-clusters-intro/shell.png)

We can also install the shell in our local machines using the instructions contained [here](https://docs.microsoft.com/cli/azure/install-azure-cli).

Once the shell is up and running, we can create a resource group using this command:

```bash
     $ az group create --name=<group-name> --location=<location>
```

We then create a cluster using:

```bash
       --resource-group=<group-name> --name=<cluster-name>
```

After the cluster is created, we can get credentials for the cluster using this command:

```bash
    $ az acs Kubernetes get-credentials --resource-group=<group-name> --name=<cluster-name>
```

One can find further instructions in the [Azure documentation](https://docs.microsoft.com/en-us/azure/aks/Kubernetes-walkthrough).

3. Installing Kubernetes locally

> To use minikube, we need [hypervisor](https://www.vmware.com/topics/glossary/content/hypervisor) installed on our machines.

The minikube tool can be found [here](https://github.com/Kubernetes/minikube). Links to binaries for one's Operating System of choice are made available at the same link.

After installation, create a cluster and start it using this command:

```bash
     $ minikube start
```

We can pause it using:

```bash
     $ minikube pause
```

When done with it, we halt using:

```bash
     $ minikube stop
```

To remove the cluster, run:

```bash
$ minikube delete
```

More instructions can be found [here](https://minikube.sigs.k8s.io/docs/start/).

### The Kubernetes client
Denoted as `kubectl`, the Kubernetes Client is used for managing, controlling our clusters. It also helps us check the health of our clusters.

We can check a cluster version using:

```bash
$ kubectl version
```

We can check the health of the cluster using:

```bash
$ kubectl get componentstatuses
```

To list all nodes in a cluster, we run this command:

```bash
$ kubectl get nodes
```

We will get all the node names, their health statuses, and age.

Run this to get more information about a certain node:

```bash
$ kubectl describe nodes <node-name>
```

### Common cluster components
We are going to look at a few components that make up a Kubernetes Cluster, namely:
- Kubernetes Proxy
- Kubernetes DNS
- Kubernetes UI

1. Kubernetes Proxy (`kube-proxy`)
This enables services not in a cluster to communicate with those in a cluster through a network and a set of rules. Kubernetes achieves this using an object called the `DaemonSet` which makes the proxy run in every node in the cluster.

To see the proxies, we use this:

```bash
$ kubectl get daemonSets --namespace=kube-system kube-proxy

```

We can implement the `kube-proxy` in three modes:
- **User space** - Here, the proxy process does not run in the kernel network but in a user process level hence its name. It's not recommended because it is a slow method.
- **iptables** - Unlike the User space mode, this mode operates in the kernel, and it operates in a round-robin style of scheduling services in a cluster. It is not used when there are many services because its scheduling style may lead to slow performance.
- **IPVS** - (IP Virtual Server) operates in the same manner as the **iptables**. It uses more efficient scheduling algorithms that reduce the delay time. Used where there are many services.

Read more on Kubernetes Proxy [here](https://Kubernetes.io/docs/concepts/cluster-administration/proxies/).

2. Kubernetes DNS
Kubernetes runs a DNS server that provides easy identification of services in a cluster. It does so by assigning them names allowing us to access their functionality without getting to know their IP addresses.

We can view the DNS servers running by using this command:

```bash
$ kubectl get deployments --namespace=kube-system kube-dns
```
Read more on Kubernetes DNS [here](https://Kubernetes.io/docs/concepts/services-networking/dns-pod-service/)

3. Kubernetes UI
This is a web-based graphical user interface, and to see it, we use this command:

```bash
$ kubectl get deployments --namespace=kube-system Kubernetes-dashboard
```

We can then use the `kubectl proxy` to access the server on http://localhost:8001/api/v1/namespaces/Kubernetes-dashboard/services/https:Kubernetes-dashboard:/proxy/:

```bash
$ kubectl proxy
```

Read more on Kubernetes UI [here](https://Kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/)

### Conclusion
We have gone through an elementary introduction to Kubernetes clusters. View content on the links attached to get more insights.

Happy coding!

---
Peer Review Contributions by: [Lalithnarayan C](authors/lalithnarayan-c/)
