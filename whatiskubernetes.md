## What is Kubernetes

Kubernetes, or K8s, is an open-source system that is used to automated deployment, scaling and management of containerized applications. It provides framework to run distributed systems, taking care of scaling and failover for your application. 

### What Does Kubernetes Do?

According to [Kubernetes](kubernetes.io/docs/concepts/overview/what-is-kubernetes) the software provide you with: 

<ul>
    <li>Service discovery and load balancing</li>
    <p>
        Kubernetes can expose a container using the DNS name or its own IP address. If traffic to a single container is high, Kubernetes is able to load balance and distribute the network traffic so that the deployment is stable.
    </p>
    <li>Storage orchestration</li>
    <p>
        Kubernetes allows you to automatically mount a storage system of your choice.
    </p>
    <li>Automated rollouts and rollbacks</li>
    <p>
        You can describe the desired state for your deployed containers using Kubernetes and change the states to the desired state.
    </p>
    <li>Automatic bin packing</li>
    <p>
        Provide Kubernetes with a cluster of noes to run containerized tasks, defining how much CPU and RAM each contianer needs.
    </p>
    <li>Self-healing</li>
    <p>
        Containers that fail are automatically restarted. Kubernetes kills containers that do not respond to the user-defined helath check, and does not advertise the containers until they are ready to serve.
    </p>
    <li>Secret and configuration management</li>
    <p>
        Allows you to store and manage sensitive infomration (OAuth tokens, SSH keys, etc.)
    </p>
</ul>

Basically, Kubernetes is an automatic container management system, allowing develops to focus on designing, building, and upgrading  applications.

### Applications of Kubernetes

Kubernetes runs on many platforms including Amazon Web Services, Microsoft Azure, and Google Cloud Platform, along with the ability to host it on-premise. K8s applications are generally enterprise-ready containerized solutions. 

Some notable examples of K8s applications are:

<ul>
    <li>Gitlab</li>
    <li>CloudBees</li>
    <li>Neo4j</li>
    <li>Seldon</li>
    <li>Aerospike</li>
    <li>Couchbase</li>
    <li>WordPress</li>
    <li>Prometheus</li>
</ul>

While these are not the only Kubernetes applications and you could even build your own. These applications have the advantage of being easily scalable and new containers can be automatically spawned to minimize down time. 

To sum Kubernetes up, it is an automatic container management system. While it is not a traditional, all-inclusive Platform as a Service (PaaS) system, as it operates at the container level, it provide some features common to PaaS such as deployment, scaling , load balancing and monitoring. All in all, Kubernetes is a great system to implement if you deploy a server side application and want high reliability, low downtime, and great load balancing. 
