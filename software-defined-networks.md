---
layout: engineering-education
status: publish
published: true
title: Transitioning from Traditional Networks to Software Defined Networks (SDN)
description: For an organization to effectively migrate to a software-defined network, the IT administrators should be taught about SDN and its advantages over a traditional network. Basic information about OpenFlow protocol, SDN controllers, and how to configure devices to communicate with the controller will help ease the transition.
author: Aakash Rawal
date: 2020-03-18T00:00:00-07:00
topics: [networking]
excerpt_separator: <!--more-->
images:

  - url: /assets/images/education/software-defined-networks.jpg
    alt: software defined networks
---
A few industry-recognized practices are described below. Although these practices are not written in stone and many organizations may have different approaches, this article gives us a general idea for transitioning to a Software-Defined Network. Transitioning to a software-defined network can be a challenge.
<!--more-->

### What is a Software-Defined Network ?
A [Software Defined Network](https://www.opennetworking.org) or __SDN__ refers to a network that is controlled by a central entity or software that is used by all the network hardware. An SDN separates the data plane from the control plane and puts the control in the application layer rather than the network layer. It offers the benefits of costing less, more security, more flexibility, easier configuration, prevents vendor lock-in and many other advantages over a traditional network.

Some industry-recognized practices are described below. Although these practices are not written in stone and many organizations may have different approaches, this article gives us a general idea for transitioning to a Software-Defined Network. Transitioning to a software-defined network can be a challenge, here is a general approach towards converting a traditional network to an SDN.

#### Preparation
For an organization to effectively migrate to a software-defined network, the IT administrators should be taught about SDN and its advantages over a traditional network.  [Teaching](https://www.networkworld.com/article/2175164/11-tips-to-prepare-for-sdn.html) them about the OpenFlow protocol, SDN controllers, and how to configure devices to communicate with the controller will help ease the transition process.


#### Pre Migration
Studying the migration use cases of big companies like [Google](https://www.sdxcentral.com/articles/news/google-brings-sdn-public-internet/2017/04/) who have already shifted to SDN can help gauge the challenges coming when switching to SDN. Some [potential challenges](https://www.cyient.com/blog/communications/software-defined-networking-best-practices-why-you-need-it-and-how-to-deploy-it) may be network outages, disruption of critical network equipment, etc. Along with this, considering the security aspects of shifting to SDN is also a key step. Having a physically decentralized but logically centralized (also know as a single point of control) controller is the ideal way to have security and redundancy.


#### Migration
We need to consider the different vendors which offer the software and support needed to shift from a traditional network. There are several open-source vendors as well as enterprise software. Choosing the right vendor will depend on what type of requirements we have for our network, along with the cost that is allocated to this transition process. The transition process should start small, which can then be scaled up to the level of our organization’s network. If we shift the whole network there are more chances of things going wrong, which will take more time and resources.


#### Post Migration
Once we have successfully transitioned, even a small part of our network to SDN, comparing the parameters like performance, the operation cost of the new SDN, and the old legacy network will give us an idea of how successful the transition was. Having a rollback plan is also mandatory in the unlikely event that SDN is not suitable for our organization.


In conclusion, SDN is the way forward to survive in this technologically controlled world. An early shift will be beneficial as the organization will have more streamlined services. SDN is an inexpensive option compared to maintaining the existing data-centers.

---

#### About the Author
<img style="float: left; padding-right: 5%; margin-bottom: 10px; width:30%;" src="/assets/images/education/authors/aakash-rawal.jpeg">Aakash Rawal is  a first-year graduate student pursuing a Masters in Technology, Cybersecurity and Policy at the University of Colorado Boulder. He is interested in Network Automation, DevOps and Network Security.
