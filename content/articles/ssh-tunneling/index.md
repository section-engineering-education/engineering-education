---
layout: engineering-education
status: publish
published: true
url: /ssh-tunneling/
title: SSH Tunneling
description: In this article, we will be looking at the concept of SSH tunneling.
author: joseph-ongoma
date: 2022-02-11T00:00:00-11:00
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/ssh tunneling/hero.jpg
    alt: SSH Tunneling Hero Image
---

SSH tunneling, also known as SSH port forwarding, is a technique for sending arbitrary data over an encoded SSH connection. SSH tunnels enable connections to a local port (i.e., a port on your own desktop) to be transferred to a remote computer across a secure channel. SSH tunneling is a technique that allows us to access remote resources that we do not have access to because they are internal to that network. SSH tunneling can also be used to allow others outside our network to have access to our network. This is done through TCP tunneling.
<!--more-->
To perform SSH tunneling, we will need to perform some port forwarding to allow port 22 which is the SSH port on our router to be routed to our public SSH server.

To ensure the security of our network services, not all of them are directly accessible from outside the ENCS network. If you are offsite and need to access a protected resource, you can use SSH to tunnel through an accessible resource to reach the protected resource.

In this article, we will look at two main subtopics in SSH tunneling. That is;
- Remote port forwarding
- Local port forwarding

### Table of contents
- [Prerequisites](#prerequisites)
- [Local port forwarding](#local-port-forwarding)
- [Remote port forwarding](#remote-port-forwarding)
- [Conclusion](#conclusion)

### Prerequisites
To perform SSH tunneling, we need the following:
- A publicly accessible SSH server.

### Local port forwarding
Local port forwarding allows us to access remote content or resources that we don't have access to. For example, let's say we have a remote RDP server or a remote database that we do not have access to, and there is a firewall that blocks some ports but then it allows some of the ports.

So, what we need to do is to tunnel through the access ports and smuggle content that we want to access the internal network on the other side. It is called local port forwarding because we create a local server and we listen on our local machines for a local port and access that port that acts as a proxy. For example, let us have a look at the image below. This image is a view of local port forwarding.

![Local port forwarding](/engineering-education/ssh-tunneling/local.jpg)

Now in our image above, let us have an explanation of SSH tunneling from it.
Suppose we have the following devices with IP addresses as shown respectively:
- An internal resource that we need access to on port 8080 and IP address 192.168.1.3
- A public SSH server of IP address 192.168.1.2 and a public IP address of 44.11.22.33 on port 22.
- A local device of IP address 10.0.0.4
- Local port 8888

*NB:* *Our SSH server and the internal resources are on the same network.* This implies that our public SSH server has access to our internal resources.

Now our local machine on IP address 10.0.0.4 is on a completely different network and cannot access resources on IP address 192.168.1.3. So, what do we do? We will create a tunnel between our local machine and our public SSH server because IP Address 44.11.22.33 is a public IP address and 22 is a public open SSH port.

The command below will be used to perform local port forwarding.

```bash
ssh -L 8888:192.168.1.3:8080 44.11.22.33
```

- -L &rarr; local port forwarding
- 8888 &rarr; local port
- 192.168.1.3 &rarr; Remote IP address
- 8080 &rarr; Remote port
- 44.11.22.33 &rarr; Public ssh server ip address

Local port forwarding syntax

```bash
ssh -L <local port>:<remote ip address>:<remote port> <public ssh server ip address>
```

We are going to SSH into our public SSH server. In order to do this, since our local machine is dumb and is not sufficient to access the remote resources, we will create a local port, that is, port 8888. What happens is that the SSH server will start listening on port 8888 on our local machine. Any traffic that goes to port 8888 from our local machine is forwarded to IP address 192.168.1.3 on port 8080 through the public SSH server. So what happens is that a TCP connection is established with our SSH server to our machine because it is open.

If you visit our local machine on IP address 10.0.0.4 on port 8888, our local machine will make a request on port 8888 which acts as a mini server. This port will smuggle data into a TCP packet through the publicly created tunnel, 44.11.22.33:22. When our public SSH server receives this, it acknowledges that our local machine wants to access resources at IP address 192.168.1.3 which it has access to. So it will forward the request internally because they are on the same network. So it will do the request, get the response, and then forward it back to our local machine.

And with that, we have accessed our remote resources.

In some instances let's say our remote IP address is forbidden from our local network, i.e, our ISP is blocking access to certain domains. In this case, we can tunnel it through our secure SSH and then make our public SSH server make a request on our behalf.

### Remote port forwarding
Remote port forwarding is when we want other people to have access to our local resources. For instance, let's say we have a web server on our machines, and we want to send a URL for someone to test our application. What do we do? We still use our public SSH server as a centralized location and ask the public server to listen to a port and any traffic that goes through that port is then directed to us. That is, it will be forwarded to us.

Let us have a look at the image below.

![Remote port forwarding](/engineering-education/ssh-tunneling/remote.jpg)

From the image above, we have our:
- internal resources on IP address 10.0.0.3 on port 8080 that we want people to have access to.
- Another machine of IP address 10.0.0.4 on the same network as our internal resources is an SSH client.
- Our public SSH server and a remote machine on the same network.

Let us have a look at the command below.

```bash
ssh -R 8888:10.0.0.3:8080 44.11.22.33
```

Remote port forwarding syntax

```bash
ssh -R <remote port>:<local ip address>:<local port> <remote ip address>
```

The above command is executed on our local machine, that is, 10.0.0.4. 8888 is our remote port. So, the public server that we are accessing will listen on port 8888. Gateway configurations need to be enabled on our local machine to enable remote port forwarding.

The main idea here is that we need anything that goes to port 8888 to be forwarded to the local machine that we have on 10.0.0.3 on port 8080. What we will do is to establish a TCP connection with the public SSH server and our local machine. Now, the server will listen to port 8888 and if there is a TCP request on  44.11.22.33 on the same port, the SSH server will take that packet, encapsulate it a legitimate SSH request, send it over through port 22 since it is encrypted and no one on the network can access it. 

We will receive the request on our local device, as the ssh client at 10.0.0.4 will have the ability to know that it is a tunnel, make the request to the internal resource on 10.0.0.3 on behalf of our public SSH server, access the internal resource, and send it back to our public ssh server.

And with that, we are able to access our local resources remotely.

### Conclusion
From this article, we have seen how local port and remote port forwarding works. This implies that we can access any resources on our devices either remotely or locally provided we do it correctly.
