---
layout: engineering-education
status: publish
published: true
url: /ssh-tunneling/
title: SSH Tunneling
description: This article will discuss the concept of SSH tunneling. SSH tunneling is a technique that allows us to access remote resources that we do not have access to because they are internal to that network.
author: joseph-ongoma
date: 2022-03-02T00:00:00-12:50
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/ssh-tunneling/hero.jpg
    alt: SSH Tunneling Hero Image
---
Secure Shell (SSH) tunneling, also known as SSH port forwarding, is a technique for sending arbitrary data over an encoded SSH connection. SSH tunnels enable connections to a local port (i.e., a port on your desktop) to be transferred to a remote computer across a secure channel. 
<!--more-->
SSH tunneling allows us to access remote resources that we do not have access to because they are internal to that network. SSH tunneling is also used to allow others outside our network to have access to it. It is done through TCP tunneling.

To perform SSH tunneling, we will need to perform port forwarding to allow port 22. Port 22 is the SSH port on our router to be routed to our public SSH server.

To ensure the security of our network services, not all ports are directly accessible from outside the Enterprise Network Compute System (ENCS) network. If you are offsite and need to access a protected resource, you can use SSH to tunnel through an accessible resource to reach the protected resource.

In this article, we will look at two main subtopics in SSH tunneling, which are:
- Remote port forwarding
- Local port forwarding

### Table of contents
- [Prerequisites](#prerequisites)
- [Local port forwarding](#local-port-forwarding)
- [Remote port forwarding](#remote-port-forwarding)
- [Conclusion](#conclusion)

### Prerequisites
To perform SSH tunneling, you'll need the following:
- A publicly accessible SSH server.
- A basic understanding of networking. You can read it from this [Cisco site](https://www.cisco.com/c/en/us/solutions/small-business/resource-center/networking/networking-basics.html).
- The resources to be accessed.
- A local device.
- A remote device for remote port forwarding.

### Local port forwarding
Local port forwarding allows us access to remote content or resources to which we don't have access. For example, let's say we have a remote Remote Desktop Protocol (RDP) server or a remote database has a firewall that blocks some ports but allows access to some of the ports.

To access the internal network to tunnel through the access ports and smuggle content that we want. Local port forwarding creates a local server and listens on our local machines for a local port and accesses that port that acts as a proxy. 

The image below is a demonstration of local port forwarding:

![Local port forwarding](/engineering-education/ssh-tunneling/local.jpg)

*[Image source](https://sites.google.com/view/ssh-tunneling/home)*

Using the image above, let us go through an explanation of SSH tunneling from it. Suppose we have the following devices with IP addresses as shown respectively:
- An internal resource that we need access to on port 8080 and IP address `192.168.1.3`.
- A public SSH server of IP address `192.168.1.2` and a public IP address of `44.11.22.33` on port 22.
- A local device of IP address `10.0.0.4`.
- Local port 8888.

> Our SSH server and the internal resources are on the same network. This implies that our public SSH server has access to our internal resources.

Our local machine on IP address `10.0.0.4` is on a completely different network and cannot access resources on the IP address `192.168.1.3`. What we need to do is create an SSH tunnel between our local machine and our public SSH server. This is because the IP Address `44.11.22.33` is a public IP address and port 22 is a public open SSH port.

Local port forwarding syntax:

```bash
ssh -L <local port>:<remote ip address>:<remote port> <public ssh server ip address>
```

Let us explain the syntax above:
- `-L` - This shows that we are performing local port forwarding. 
- `local port` - This is the port of our local device.
- `remote ip address` - This is the IP address of our remote resource that we need to access.
- `remote port` - This is the port of our remote device.
- `public ssh server ip address` - This is the IP address of our public SSH server.

The command below will be used to perform local port forwarding:

```bash
ssh -L 8888:192.168.1.3:8080 44.11.22.33
```

We are going to access our public SSH server using SSH. To do this, since our local machine can not access the remote resources, we will create a local port, that is, port 8888. 

What happens is that the SSH server will listen on port 8888 from our local machine. Any traffic that goes to port 8888 from our local machine is forwarded to the IP address `192.168.1.3` on port 8080 through the public SSH server. As a result, a TCP connection is established with our SSH server to our machine because it is open

If we visit our local machine on IP address `10.0.0.4` on port 8888, our local machine will make a request on port 8888 that acts as a mini server. This port will smuggle data into a TCP packet through the publicly created tunnel, `44.11.22.33:22`. 

When our public SSH server receives this, it acknowledges that our local machine wants to access resources at IP address `192.168.1.3` that it has access to. So it will forward the request internally because they are on the same network. The server will receive the request, get the response, and then forward it back to our local machine. With that, we have accessed our remote resources.

In some instances, let's say our remote IP address is forbidden from our local network. It could be that our ISP is blocking access to specific domains, we can tunnel it through our secure SSH and then make our public SSH server request on our behalf.

### Remote port forwarding
Remote port forwarding is significant when we want other people to access our local resources. For instance, when we have a web server on our machines and there is a need to send a URL for testing our application to other collaborators.

Remote port forwarding allows us to use our public SSH server as a centralized location and request the public server to listen to its ports. Through this, any traffic that goes through its ports is forwarded to our server.

Let us have a look at the image below:

![Remote port forwarding](/engineering-education/ssh-tunneling/remote.jpg)

*[Image source](https://sites.google.com/view/ssh-tunneling/home)*

From the image above, we have our:
- Internal resources on IP address `10.0.0.3` on port 8080 that we want people to have access to.
- Machine of IP address `10.0.0.4` on the same network as our internal resources as an SSH client.
- Public SSH server and a remote machine on the same network.

Let us have a look at the command below:

Remote port forwarding syntax:

```bash
ssh -R <remote port>:<local ip address>:<local port> <remote ip address>
```

Let us have an explanation of the syntax above:
- `-R` - This shows that we are performing remote port forwarding.
- `remote port` - This is the input port of our device's remote port.
- `local ip address` - This is where the IP address of our local device is entered.
- `local port` - The local port of the local device is put here.
- `remote ip address` - This is the IP address of our public SSH server.

The command below will be used to perform remote port forwarding:

```bash
ssh -R 8888:10.0.0.3:8080 44.11.22.33
```

The command above is executed on our local machine, that is, `10.0.0.4`. 8888 is our remote port so the public server that we are accessing will listen on this port. Gateway configurations need to be enabled on our local machine to enable remote port forwarding.

The main idea here is that we need anything that goes through port 8888 to be forwarded to the local machine that we have on `10.0.0.3` on port 8080. What we will do is establish a TCP connection with the public SSH server and our local machine. 

The SSH server will listen to port 8888 for a TCP request on `44.11.22.33` on the same port. The SSH server will take that packet and encapsulate it as a legitimate SSH request. It will then send it through port 22 since it is encrypted and is inaccessible on the network.
  
We will receive the request on our local device as the SSH client at `10.0.0.4` will have the ability to know that it is a tunnel. It will request the internal resource on `10.0.0.3` on behalf of our public SSH server and access the internal resource. Afterward, it will send it back to our public SSH server.

With that, we can access our local resources remotely.

### Conclusion
In this article, we sawn how local port and remote port forwarding works. This implies that we can access any resources on our devices either remotely or locally provided we do it correctly.

Happy coding!

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)