**WHAT IS A CONTAINER**

Before we look into when to use Kubernetes, let's understand what a container is, since modern applications are increasingly being built using containers, which are a virtualization environment and Kubernates is a software that is used to deploy and manage these containers.  Containers are environments that have been virtualized just like virtual machines. 

# Similarities Between a Virtual Machine and a A container 

One can run multiple containers on a single virtual machine just as in virtual machines where one can run multiple virtual machines on a single physical host. Docker is one of the most popular containers used.  

# Difference Between Virtual Machine and Container.

1) For VM, You will manage the operating system. For Container, No management of operating system
2) For VM, it appears to be an instance of an operating system. For Container, it is lightweight. Meaning they are         designed to be created, scaled out and stopped dynamically
3) For Vm, it is static i.e. as application demand increases, one creates and deploys the virtual machine. For Container, it is more dynamic. They allow one to respond to change in demand. With a container, one can easily and quickly restart it in case of any kind of failure. E.g. Hardware Failure.



# WHY AND WHEN SHOULD WE USE KUBERNETES? 

Containers are really a great development tool since it offers a good way to bundle and run your application. When you want to ensure that you have a quick and easy way of moving to production, then containers are great. In a production environment containers need to be managed to minimize downtimes. An example would be, if one of the containers is down, another one needs to be started. This can easily be achieved using Kubernetes. It will automatically do this process on our behalf.

Below are other reasons as to why one should use Kubernetes.

That said, we should use Kubernetes when we want  to :-
1) Manage container work flows to handle the demand of containerised applications at scale
2) When an application needs to be updated. Kubernetes can stagger the update appointment to minimize downtime. If the update has a problem, kubernetes can roll back to a previous version
3) To manage container storage and networking management. Kubernetes persistent volumes can be used to present data storage to one or more containers. This configuration allows containers to read and write application data and persist this data across many port instances.
4) Kubernates has network plugins that provide capabilities such as exposing pods to the internet, load balancing traffic across multiple replicas of pods and network isolation.
5) When one wants to extend the functionality of Kubernetes outside the built in functions using the kubernetes API.


# When you shouldn’t use it
1) When one is developing a monolithic application. This is when the application being developed is dependent on each other or intertwined from the input/output to the processing and rendering of the data. With containers, your application will be divided into separate independent components. 
2) When you don't have the time it requires to learn how to use kubernetes because it has a steep learning curve.

