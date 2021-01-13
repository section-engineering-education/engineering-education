Kubernetes is a framework that runs containerized apps across a cluster of machines and coordinates them. It is designed to manage the lifecycle of containers and services providing scalability, predictability, and availability.

### Kubernetes architecture
Kubernetes is built in layers, each higher layer abstracts away the complexity that is associated with the lower layer.

**Master** node acts as the gateway for the Kubernetes cluster. It performs the following tasks.
- Exposes the API that users and client applications can connect to and communicate with the cluster.
- Checking the health of other nodes within the cluster.
- Scheduling and assigning work to other nodes in the cluster.

**Worker** nodes accept and run workloads assigned to them by the master node using the external and local resources.

**etcd** is a distributed key-value store that persists cluster configuration, the status of objects, nodes on the cluster, and the nodes the objects are scheduled to run on.

**kubelet** communicates with the API server to determine which container workload has been assigned to the node. It is also responsible for spinning up pods to run the container workloads.

**kube-proxy** makes it possible for containers to communicate with each other across various nodes within the cluster.

For isolation, flexibility, and management of the cluster, Kubernetes runs applications and services in containers using the container runtime that is available within the node i.e Docker.

### Kubernetes objects
Kubernetes objects are defined using YAML or JSON files which are referred to as the manifests.

**Pod**
The pod is the fundamental building block of Kubernetes. It is comprising of one or more tightly coupled containers with a shared networking layer and file system volume. Pods are managed by higher-level components therefore they are not explicitly defined in the manifest file.

![Pod](/engineering-education/introduction-to-kubernetes/pod.png)

**Deployment**
A deployment comprises a collection of pods defined by a template and a replica count. A specific value for replica count can be set or a separate Kubernetes resource (horizontal pod autoscaller) can be used to control the replica count based on the CPU utilization.

![Deployment](/engineering-education/introduction-to-kubernetes/deployment.png)

In a deployment with 10 replica counts, if 3 pods crash due to machine failure then 3 more pods will be scheduled to run on a different machine within the cluster. Deployments are best for deploying stateless applications where pods can be replaced without causing a problem in the cluster.

Below YAML file shows a simple definition for a deployment.
```yaml
apiVersion: apps/V1
kind: Deployment
metadata: 
  name: rest-api-server
  labels: 
    app: api-server
spec:
  replicas: 10 # Defines the number of replicas in the deployment
  selector:
    matchLabels:
      app: api-server
  template: # Defines how a pod should look like
    metadata:
      labels:
        app: api-server
    spec:
      containers: # Defines the containers that should be running in the pod
      - name: rest-api-server
        image: api-server
        ports:
        - containerPort: 80
```
### Service
A service provides a static endpoint that can be used to direct traffic to the desired pod even if the pods change due to updating or scaling.

The below YAML file shows how we can wrap a service around the deployment we created earlier.
```yaml
apiVersion: v1
kind: service
metadata:
  name: rest-api-service
  labels:
    app: rest-api
spec:
  type: ClusterIP # Defines how we expose our endpoints
  selector:
    app: rest-api # Defines the pods to direct traffic to.
  ports:
  - protocol: TCP # Defines how clients communicate with our service.
    port: 80

```

### Ingress
Ingress makes it possible to expose our application running in a Kubernetes cluster to external traffic.
Ingress makes it possible to define the services that should be public and the services that should remain private. The service for the user interface for our application can be public while the service running our backend application remains private.

Below is an example of an Ingress configuration that exposes the user interface service.
```yaml
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: product-ingress
  annotations:
    kubernetes.io/ingress.class: "nginx"
    nginx.ingress.kubernetes.io/rewrite-target: / # Defines the configuration for the ingress controller.
    spec:
    rules:
    - http: # Defines how external traffic should access the service
        paths:
        - path: /app
          backend: # Defines the service that the traffic is directed to.
            serviceName: user-interface-service
            servicePort: 80

```

### Other Kubernetes objects
**Volumes** used to manage the file system within the pods. 
**Secret** used for storing credentials i.e passwords.
**ConfigMap** is used to specify application configurations that are mounted into a file.
**HorizontalPodAutoscaler** is used to automatically scale pods based on resource utilization and availability.
**StatefulSet** is similar to deployment but used to deploy stateful applications such as databases to the Kubernetes cluster.

### Installing Kubernetes locally
Kubernetes is bundled with [Docker desktop](https://www.docker.com/products/docker-desktop) which is available for both Windows and macOS. Tutorial on how to install docker on Linux can be found [here](https://kubernetes.io/docs/tasks/tools/install-kubectl/).

To verify if your Kubernetes installation is working, run the below command.
```bash
$ kubectl version --client
```

### Conclusion
Now that you have learned various components that are found in Kubernetes, run a Kubernetes cluster locally using [minikube](https://minikube.sigs.k8s.io/docs/start/). In the next article, we will deploy a Django application that we created [here](https://www.section.io/engineering-education/django-crud-api/) to a Kubernetes cluster running locally.