---
layout: engineering-education
status: publish
published: true
title: How to Install Kubernetes on Ubuntu Server 18.04.4
description: Kubernetes is not limited to being installed only on Ubuntu server. It can be installed on Linux, Windows, and even macOS.
author: Gregory Manley
date: 2020-03-26T00:00:00-07:00
topics: [Edge Computing]
excerpt_separator: <!--more-->
images:

  - url: /assets/images/education/install-k8-ubuntu.jpg
    alt: installing Kubernetes on ubuntu server
---
Kubernetes, or K8s, is an open-source system that is used to automate deployment, scaling and management of containerized applications. It provides a framework to run distributed systems, taking care of scaling and failover for your applications.
<!--more-->

In a recent article, I explained [what Kubernetes is](/engineering-education/what-is-kubernetes/) and what it can be used for. In continuation, I will show how to install Kubernetes on an Ubuntu server, running Ubuntu 18.04.4. For this tutorial, I am assuming you will be installing K8s on a single node. You will need a separate computer with an Internet browser connected to the same network to access and use the dashboard.

To get started you will need to make sure your server is updated. To do so, run the following commands:
~~~
sudo apt-get update -y

sudo apt-get upgrade -y
~~~
Now that your server is up to date, it is time to install MicroK8s. MicroK8s is a snap package and requires `snapd` to be pre-installed in order to install itself. The latest Ubuntu release comes with this already; however, other Linux systems may need to install `snapd` before proceeding. To install the latest version of MicroK8s run the following:
~~~
sudo snap install microk8s --classic
~~~
After installing MicroK8s you need to check the status, run:
~~~
sudo microk8s.status --wait-ready
~~~
By default all add-ons should read disabled, leaving us with a barebones upstream Kubernetes.
It is recommended to run the following in order to enable the basic Kubernetes services dashboard and kube-dns.
~~~
sudo microk8s.enable dashboard dns
~~~
Then, to check on the deployment of these add-ons run:
~~~
sudo microk8s.kubectl get all --all-namespaces
~~~
It should take a few minutes to get all the pods in the "Running" state. Once all the pods are running, we are now ready to access the dashboard. First, we need to find out the internal IP of your server. Run:
~~~
hostname -I
~~~
You will want to save the first IPv4 address somewhere as it will be used later. Before continuing, we need to retrieve our default user information. Run:
~~~
sudo microk8s.config
~~~~
Save the username and password that are outputted at the end. Then to start the dashboard run:
~~~
sudo microk8s.kubectl cluster-info
~~~
Now, on your other computer, open a browser and go to the following address:

*https://yourInternalIP:16443/api/v1/namespaces/kube-system/services/monitoring-grafana/proxy*

You will be asked for that username and password that we saved previously. Now that we have the dashboard up and running, we can create a microbot deployment using two pods. Run:
~~~
sudo microk8s.kubectl create deployment microbot --image=dontrebootme/microbot:v1

sudo microk8s.kubectl scale deployment microbot --replicas=2
~~~
Now, in order to expose our deployment, we must create it as a service:
~~~
sudo microk8s.kubectl expose deployment microbot --type=NodePort --port=80 --name=microbot-service
~~~
Run:
~~~
sudo microk8s.kubectl get all --all-namespaces
~~~
Now check on the deployment, and you should see the `microbot-service` is running at a random port, having the form 80:port. You can view the deployment by going to *http://yourInteralIP:port* on the other computer.

![](https://newsitech.weebly.com/uploads/2/0/5/4/20542424/microbot_orig.png)
*Image source: [Newsitech](https://newsitech.weebly.com/uploads/2/0/5/4/20542424/microbot_orig.png)*

MicroK8s will run until it is stopped. If you wish stop MicroK8s at anytime, run:
~~~
microk8s.stop
~~~
and to start it again, run:
~~~
micro8s.start
~~~
Congratulations! You have now setup Kubernetes on an Ubuntu server and deployed your first application on it. Kubernetes is not limited to being installed only on an Ubuntu server. It can be installed on Linux, Windows, and even macOS. Many applications will be and have been developed and deployed on Kubernetes. What will you create?

---

#### About the Author
<img style="float: left; padding-right: 5%; margin-bottom: 10px; width:30%;" src="/assets/images/education/authors/gregory-manley.jpg">Gregory Manley is a freshman at Colorado School of Mines where he is majoring in Computer Science and Computer Engineering. He is currently the owner of iTech News and a contributor for Section's Engineering Education Content Program. His management of iTech News has led him to work with many brands on writing technology focus articles.
