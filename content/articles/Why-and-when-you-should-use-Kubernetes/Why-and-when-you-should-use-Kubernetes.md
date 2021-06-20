**WHAT IS A CONTAINER**

Let us first begin by understanding what containers are. Why so?  Modern applications are being built using containers which are a virtualization environment. Kubernates is a software used to deploy and manage these containers.  Containers are environments that have been virtualized like virtual machines. 

# Similarities Between a Virtual Machine and a A container 

One can run many containers on a single virtual machine. This is similar to a  virtual machine. One can run multiple virtual machines on a single physical host. Docker is an example of a contatiner. It is one of the most popular containers used.  

# Difference Between Virtual Machine and Container.

1) For VM, You will manage the operating system. For Container,there is no management of operating system.<br/>
2) For VM, it is an instance of an operating system. For Container, it is lightweight. Meaning it is designed to be created, scaled out and stopped dynamically. <br/>
3) For Vm, it is static i.e. as application demand increases, one creates and deploys the virtual machine. For Container, it is more dynamic. They allow one to respond to change in demand. With a container, one can easily and quickly restart it in case of any kind of failure. E.g. Hardware Failure



# WHY AND WHEN SHOULD WE USE KUBERNETES? 

Containers are a great development tool. It offers a good way to bundle and run your application. When you want to ensure that you have a quick and easy way of moving to production, then containers are great. In a production environment containers need to be managed to minimize downtimes. An example would be, if one of the containers is down, another one needs to be started promptly. This can easily be achieved using Kubernetes. It will automatically do this process on our behalf. <br/>

Below are other reasons as to why one should use Kubernetes.<br>


1) To manage container work flows and handle the demand of containerised applications at scale. <br>
2) When an application needs to be updated. Kubernetes can stagger the update appointment to minimize downtime. If the update has a problem, kubernetes can roll back to a previous version<br>
3) To manage container storage and networking management. Kubernetes persistent volumes can be used to present data storage to one or more containers. This configuration allows containers to read and write application data and persist this data across many port instances.<br>
4) Kubernates has network plugins that provide capabilities such as exposing pods to the internet, load balancing traffic across multiple replicas of pods and network isolation. <br>
5) When one wants to extend the functionality of Kubernetes outside the built in functions using the kubernetes API.


# When you shouldn’t use it
1) When one is developing a monolithic application. This is when the application being developed is dependent on each other or intertwined from the input/output to the processing and rendering of the data. With containers, your application will be divided into separate independent components. 
2) When you don't have the time it requires to learn how to use kubernetes because it has a steep learning curve.

