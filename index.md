Best practices for scalable, decoupled, managed application systems are microservices architecture. In a traditional environment, an application was developed on a large monolithic repository and deployed on a dedicated on-premise data centre server. 

Industrially, packaging system requirements and runtimes are made easier with the container. It solves issues behind applications not running on the same operating systems.

Table of contents
-[Prerequisites] (# prerequisites)
- [Objectives](#objectives)
- [Overview of Microservices with Kubernetes](#overview-of-microservices-with-kubernetes)
- [Kubernetes Architecture](#kubernetes-architecture)
- [Pod Networking](#pod-networking)

### Prerequisites
To follow along with this article, you are required to have the following:
- A basic understanding of the containers architecture.
- A basic understanding of [Kubernetes Components](https://kubernetes.io/docs/concepts/overview/components//) e.g Pod, Node, Service, Deployment, Cluster.

### Objectives
In this tutorial, you will learn and apply the following to your project.

1. How Kubernetes architecture works
2. What is Pod networking?

### Overview of Microservices with Kubernetes
In a microservice architecture, connecting containers across multiple hosts, scaling them, and deploying applications without downtime can be complex. Kubernetes addresses those challenges as a container orchestrator. It approaches the issue of large server deployment by providing components for small web servers or microservices.

In addition, a cloud-native application separates multiple microservices running on servers by orchestrating them with Kubernetes, ensuring benefits like rollback, scalability, decoupling, load balancing, networking, and more. It is now so easy to deploy applications on virtual servers with services at less price.

However, architecting and scaling distributed systems based on microservices principles is still challenging. You first need to build a solid continuous integration, delivery, and deployment pipeline that allows test suites to run and verify. Then you need a system to launch your containers and watch over them when things break and self-heal.


### Kubernetes Architecture
The architecture of Kubernetes comprises two nodes synchronised together through an API server. The central server that all components communicate  through is the kube-apiserver.  It is the brain box listening to the API call from the command line through the kubectl. 

Kubectl is the Kubernetes local client API command used to interact with the kube-apiserver to provision resources through commands. It communicates through API calls from the client machine to spin up infrastructures with the cluster having a control plane and worker nodes.

#### Control Plane Node Components
All nodes existing in Kubernetes are working together on the same network in a cluster being the container distributing requests. There are different Kubernetes components in a control plane node talking to one another via kube-apiserver. These are also called agents.

As the name suggests, a control plane node is a master machine that houses different agents around the kube-apiserver by ensuring the proper provisioning of resources like Pod, scheduling, controlling, and storing data of the Pod inside worker nodes. Kubernetes agent platforms like AWS, GKE, Minikube, Mesos, and OpenShift provide managed control plane nodes with all agents intact. 


Components of the control plane node are Kube-apiserver, the Kube-controller-manager, Kube-scheduler, Kubelet, Kube-proxy, and the etcd database. Let us explore what each means and how they interact with one another.

#### Kube-API Server
Kube-apiserver is a master process for the cluster exposed to all API calls from Kubectl. It handles internal and external traffic through authentication and authorisation with several admission controllers. It is also the only agent connected to the etcd database responding back and forth with the Kube-controller-manager.

#### Kube-Controller-Manager
An agent as a core control loop daemon interacting with the Kube-apiserver to determine the state of the cluster is the Kube-controller-manager. It ensures the cluster state matches the desired property by making frequent API calls to the necessary controller. Several other controllers in use are endpoints, namespace, and replication.

#### Kube-Scheduler
This agent uses a built-in algorithm to detect the type of node to host a Pod based on the set of container configurations and available resources such as CPU. It responds to Kube-apiserver having scheduled a worker node with the best Pod configuration for the container.

#### Kube-Proxy
Kube-proxy inside the control plane deals with the overall cluster networking with the internet. It faces both the ingress and egress traffic and ensures no malicious or DDoS attacks on the cluster components.

#### Etcd Database
Etcd database communicates back and forth with the Kube-apiserver on the state of the cluster, networking, and persistent information required to be stored. It is a b+tree key-value pairs storage with attributes of appending values to the end without overriding any copies of data. It then marks the duplicated copies of data for future removal through a compaction process.


#### Worker Node Components
As shown in the image above, Kubelet, Kube-proxy, and container runtime engines are in all worker nodes. The Kubelet talks to the underlying container engine when there is a request for Pod creation from Kube-apiserver. 

It accepts API calls with Pod spec YAML  or JSON file describing a Pod. It will ensure all access to storage, secrets, and config maps to the Pod and then returns the status to Kube-apiserver for eventual persistence.

The Kube-proxy in the worker node manages the network of the Pod connectivity. It uses iptables entries to map dynamic IP addresses to the Pod and monitors services and endpoints through a random number of ports to proxy traffic.


### Pod Networking
[Pod Networking](/deep-dive-keubernetes-architecture-and-pod-networking/pod-networking.png)
Every Pod hosts one or more containers like an application container, logger, pause, and persistent data storage actively working with the container. Pods are assigned IP addresses before an application container starts running. All containers co-located in a Pod shared the same single but dynamic IP address. A pod is a virtual machine of physical hosts from a networking perspective.

The service object is to connect Pods within the network using ClusterIP addresses, from outside of the cluster using NodePort addresses, and using a load balancer if configured with a LoadBalanacer service. A ClusterIP is for traffic within the cluster component.

NodePort first creates a ClusterIP, which then associates a port of the node to that new ClusterIP. However, if you create a LoadBalancer service, it will create a ClusterIP first and then a NodePort with an asynchronous request for an external load balancer.

A multi-container Pod consists of an application container, two services with one for internal traffic only, an ingress controller, a logger container for storage, and a pause container only used to retrieve the namespaces and IP addresses. An ingress controller or a service mesh is to connect traffic to a Pod. 

In conclusion, you have learned more about the Kubernetes architecture with succinct explanations of each component and how pod networking works.


### Conclusion
In this article, we discussed kubernetes components architecture with refrence to how control plane and worker nodes work. Also, we looked at Pod networking and its underlining channels.

You learned more about the Kubernetes architecture with succinct explanations of each component and how pod networking works. 

Thanks for reading!!
