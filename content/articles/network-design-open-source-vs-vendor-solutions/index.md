---
layout: engineering-education
status: publish
published: true
url: /network-design-open-source-vs-vendor-solutions/
title: Networking Decisions - Open Source vs. Vendor Solutions  
description: An overview of open source vs vendor solutions to help engineers to make a more informed choice when selecting network equipment.
author: aakash-rawal
date: 2020-05-12T00:00:00-07:00
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/network-design-open-source-vs-vendor-solutions/hero.jpg
    alt: open source vs vendor networking solutions
---
A critical function of a network design team is to decide on which solutions they are going to select for all the hardware, software, and other resources needed to get a network up and running. Considering budget and other constraints, it is often a dilemma for engineers to choose between open source offerings and vendor-provided solutions. Each has their benefits and shortcomings.

<!--more-->
This article will briefly discuss the factors involved in these decisions to help engineers to make more informed choices when selecting network equipment.

### Open Source vs Vendor Solutions
An **Open-Source technology** is one that is not associated with any particular vendor and doesn’t have any proprietary software or hardware in it. An example of open source technology is the Linux operating system (OS). This OS is freely available to anyone who wants it, and the source code can also be modified to optimize it for a particular use. In networking hardware, bare metal switches are network switches with no OS loaded on them. Anyone can then install any software of choice on it to make it work.

On the other hand, a **Vendor-Specific technology** is one whose design, source code, and blueprints are intellectual property of a specific company and cannot be obtained unless you enter into an agreement with the vendor (typically involving a payment exchange). Microsoft Windows is a popular vendor-based OS for which you have to buy a license to use it on your system. Cisco and Juniper network devices both include hardware that has their software loaded on them, and you need to pay for the physical switch along with the OS that comes installed on the switch.

### Pros and Cons
In terms of networking, vendor-provided devices and software have always dominated, particularly, Cisco which has over 50% of the [network technology](https://www.networkworld.com/article/3038301/ciscos-dominance-continues.html) market. Other companies like Arista and Juniper have also been popular choices.

Open source networking was not a concept until very recently. Instead of running a proprietary OS, a different flavor of Linux can be run on bare metal switches, which can be much cheaper than using vendor-specific networking solutions. The main benefit of using open source is that it dramatically reduces the costs of software and devices you need for your network.

Case in point: To set up a data center, either we could go with vendors like Juniper, Cisco, and Arista or with bare-metal switches with Linux OS loaded on them. One example is Cumulus Networks. A [comparison](https://cumulusnetworks.com/products/total-cost-ownership/) is drawn out to set up a data center with open-source vs vendor products. For a typical data center with 120 racks, the cost could be reduced by over $4 million. This is a huge amount that could be used elsewhere.

Apart from the cost, another major benefit of using open source technology is that the operator does not need to learn vendor-specific CLI (command line interface) commands to program the devices and can easily be done with the help of automation tools. As the network is vendor-neutral, we can select any vendor - one which offers competitive pricing and also has the best hardware for the application. This also boosts the interoperability of devices.

On the flip side, vendor products often offer better support for your hardware and software. Sometimes, open-source technologies may have a high learning curve which makes it harder for the operator to learn the technology.

### Automation Ready
One of the biggest advantages with white-box switches and Linux OS is that it is automation ready. Unlike logging into CLI and manually configuring the devices, these devices can be configured by writing and executing simple python scripts that will do the rest of the work for you. Software like Puppet, Chef, Ansible, ONF tools, OpenDayLight and other [SDN](https://www.networkcomputing.com/networking/10-sdn-platform-options) and [automation](https://www.rogerperkin.co.uk/network-automation/tools/) tools can be used easily with this technology, as the user gets to decide the capabilities of the device rather than the vendor dictating its capabilities.

### Summary
In conclusion, both open source and vendor-provided networking solutions have their advantages and shortcomings, and it is up to the operator to decide which path to follow, or maybe, use a hybrid model instead of a definite path. In my opinion, vendor-specific technology’s days are [numbered](https://techcrunch.com/2019/01/12/how-open-source-software-took-over-the-world/) and open source with interoperability is the way forward in network technology.
