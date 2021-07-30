Docker consists of a linking system that allows multiple containers to be linked together. This linking system allows connection information to be sent from a source container to a recipient container.

This article will take readers through Docker container linking. It will provide an overview of how Docker container linking works and explain how communication works across links.

### Introduction to Docker container linking
In container orchestration, communication between containers is essential. This is where Docker container linking comes in. Docker consists of –link legacy feature that enables two containers to be linked to each other. Once a connection has been established, the connection information can be shared between the two containers. 

Docker container linking allows the recipient container to get connection information relating to the source container. Although Docker introduced a Docker networking that enhances communication between containers, container linking is still in use. As long as it is still in use, it is important to understand it since it is a resourceful alternative to networking. 

Container linking is not limited to only two containers. It can be applied to many containers. The linking system can establish a link of multiple containers to enhance communication between them. 

### When to use Docker container linking
As earlier mentioned, there are two ways in which you can establish communication between containers: Docker networking and Docker container linking. It is important to understand when you can use Docker container linking to avoid facing challenges. 

You should use Docker container linking in the following instances:

#### When you are using default bridge network in Docker
A bridge network is a layer device that links two or more network segments. It forwards traffic from one network segment to another. It can be a hardware or a software that can run within a kernel of a host machine.

Docker bridge networks employ a software bridge that enhance communication between containers that are connected to it. The software bridge prevents containers that are connected to it from getting or establishing communication. This means that containers using different bridges can communicate with each other. 

Docker container linking should not be used when you are using user-defined bridges. These bridges are utilized in Docker networking. 

#### When you want to share environmental variables
Docker default bridge networks are the ideal networks for sharing environmental variables from one container to another. This is because the user-defined networks do not support the sharing of these variables. 

### How Docker container linking works
Docker container linking works through two main process: naming of containers and communication across links.

#### Naming of containers
Docker container linking relies on container names to establish links between the containers. This means that the naming of containers is necessary. When you create a container, a name will be created automatically.

Naming of containers provides a unique identity that enables the user to remember. It also enables Docker to refer to two or more containers. Let’s assume that we have two containers named db and web. You can use the names to specify that you want to link db to web. You can use the --name flag to name a container. 

#### Communication across links
Docker uses two methods to enhance communication between the containers: environmental variables and updating the host file.

##### Environmental variables
Docker can enhance communication between containers through the sharing of environmental variables from the source container to the target container. When a link is created, Docker generates many environmental variables (automatically) in the recipient container depending on the --link parameters that were passed. 

All the environmental variables that originate from the source container are exposed to the target container. This enables the target container to discover information relating to the source container. 

##### Updating the /etc/hosts file
Apart from sharing the environmental variables, Docker provides a host entry to the /etc/hosts file in regards to the source container. Two entries are added in the /etc/hosts file. 

The first one is for the recipient container, which consists of a hostname in the form of container ID. The second entry employs the link identity to provide information of the source container (IP address). 

This information is updated automatically if the source container is restarted. The recipient container will be provided with a reference to the new information of the source container, which enhances the continuity of linked communication. 

### Conclusion
This article has provided the basics of Docker container linking. The following are the main points we have learned:
1. Docker container linking allows multiple containers to be linked to each other. 
2. Docker container linking allows the recipient container to get connection information relating to the source container.
3. You should use Docker container linking when you are using default bridge networks and when you want to share environmental variables
4. Docker container linking works through two main processes: naming of containers and communication across links.
5. Communication across links is achieved through two main ways: sharing environmental variables and updating the /etc/hosts file.

