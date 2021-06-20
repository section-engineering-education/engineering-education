![WHY AND WHEN SHOULD WE USE KUBERNETES?](/Why-and-when-you-should-use-Kubernetes/image-name/container.jpg)
# WHY AND WHEN SHOULD WE USE KUBERNETES? 

Kubernetes, also known as K8s. Is an open-source system for automating deployment, scaling, and management of containerized applications. Let's dive into the below concepts first. We then look into why and when we should use Kubernetes.

# WHAT IS A CONTAINER

Let us first begin by understanding what containers are. Why so?  Modern applications are being built using containers which are a virtualization environment. Kubernetes is software used to deploy and manage these containers.  Containers are environments that have been virtualized like virtual machines. 

# Similarities Between a Virtual Machine and A container 

One can run many containers on a single virtual machine. This is like a virtual machine. It is possible to set and run many virtual machines on one single machine. This is a physical machine. Docker is an example of a container. It is one of the most popular containers used.  

# Difference Between Virtual Machine and Container.

1) For VM, You will manage the operating system. For Container, there is no management of the operating system. 
2) For VM, it is an instance of an operating system. For Container, it is lightweight. Meaning containers are built to be started, stopped, and scaled out. This is without human intervention. 
3) For VM, it is static i.e. as application demand increases, one creates and deploys the virtual machine. For Container, it is more dynamic. They allow one to respond to change in demand. With a container, one can easily and quickly restart it in case of any kind of failure. E.g. Hardware Failure


 

# WHY AND WHEN SHOULD WE USE KUBERNETES? 

It is important to understand the why. Why should I use Kubernetes in software development? What kind of problem will it solve? With this understanding, development teams, are able to ship quality software. They will also be able to apply best industry practices and use relevant tools.  This will also speed up the process required to ship a product. 

Containers are a great development tool. It offers a good way to put together different components of the application and run. When you want to ensure that you have a quick and easy way of moving to production, then containers are great. Once a container is in production, it needs to be looked into to cut downtime. An example would be, if one of the containers is down, another one needs to be started promptly. This can be achieved using Kubernetes. It will automatically do this process on our behalf. 

When one has services that need to talk to each other in order for your system to work as a whole. Kubernetes starts to make a lot of sense in this case. Best suited for a large-scale distributed system.  For example when one has a service to handle payments, another service to handle orders, and another service to handle products, etc. With such kinds of different services, when Kubernetes is used, deployment becomes easy. You will be able to express what version of the services you want to run, and how they will communicate with each other. 

Below are other reasons why one should use Kubernetes.


1) When one wants to manage containerized applications at scale. This should be a big application that cannot be run by simple development tools.
2) When an application needs to be updated. Kubernetes can stagger the updated appointment to cut downtime. If the update has a problem, Kubernetes can roll back to a previous version. 
3) Useful when a need to manage container storage and network arises. Kubernetes persistent volumes can be used to present data storage to one or more containers. This configuration allows containers to read and write application data and persist this data across many port instances.
4) Kubernetes has network plugins that provide capabilities such as exposing pods to the internet, load balancing traffic across many replicas of the pods, and helps in network isolation. 
5)  Kubernetes has an API that can extend. If one wants to extend functionalities outside the ones provided, this is achievable.


# When you shouldn’t use it.

1) When one is developing a monolithic application. The components of the application developed are dependent on each other. This is from the input/output operation to the processing and rendering of the data. With containers, your application will be divided into separate independent components. 
2) When you don't have the time it requires to learn how to use Kubernetes because it has a steep learning curve. Kubernetes is a massive tool that requires sufficient time to learn.  

I hope this article was of help to you. Continue to learn more about containers and software that are used to manage these containers. 

Happy Learning! 


### References: 
https://kubernetes.io/