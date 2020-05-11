---
layout: engineering-education
status: publish
published: true
title: Networking Wars Open Source vs Vendor Specific  
description: An Open-Source technology is one that is not associated with any particular vendor and doesn’t have any proprietary software or hardware in it. A Vendor-Specific technology is one whose design, source code, and blueprints are intellectual property if that company and cannot be obtained unless you pay to the vendor.
author: Aakash Rawal
date: 2020-05-11T00:00:00-07:00
topics: [networking]
excerpt_separator: <!--more-->
images:

  - url: /assets/images/education/vendor-specific-image.jpg
    alt: vendor specific operating system
---
A critical part of a Network Design team is to decide on the vendor they are going to select for all the hardware, software, and other resources needed to get a network up and running. Considering budget and other constraints, it is often a dilemma for engineers to choose between open source choices and vendor oriented ones. Both of them have their benefits and shortcomings. This article will briefly discuss these factors to help engineers to make a more informed choice when selecting network equipment.
<!--more-->

### Open Source vs Vendor Specific
An **Open-Source technology** is one that is not associated with any particular vendor and doesn’t have any proprietary software or hardware in it. An example of open source technology is the Linux operating system (OS). This OS is freely available to anyone who wants it and can also modify the source code to optimize it for a particular use. In networking hardware, bare metal switches are network switches with no OS loaded on them. Anyone can then install any software of choice on it to make it work. On the other hand, a **Vendor-Specific technology** is one whose design, source code, and blueprints are intellectual property of a specific company and cannot be obtained unless you pay the vendor. Microsoft Windows is a popular vendor based OS for which you have to buy a license to use it on your system. Cisco, Juniper network devices are the hardware that has their software loaded on them and you need to pay for the physical switch along with the OS that comes installed on the switch.

### Benefits of Open Source
In terms of networking, vendor-specific devices and software have always dominated, particularly, Cisco which has over 50% of the [network technology](https://www.networkworld.com/article/3038301/ciscos-dominance-continues.html) market. Other companies like Arista and Juniper have also been popular choices. Open source networking was not a concept until very recently. Instead of running a proprietary OS, a different flavor of Linux can be run on bare metal switches, which will be much cheaper than using vendor-specific networking solutions. The main benefit of using open source is that it dramatically reduces the costs of software and devices you need for your network. Case in point: To set up a data center, either we could go with vendors like Juniper, Cisco, and Arista or with bare-metal switches with Linux OS loaded on them. One example is Cumulus Networks. A [comparison](https://cumulusnetworks.com/products/total-cost-ownership/) is drawn out to set up a data center with open-source vs vendor products. For a typical data center with 120 racks, the cost could be reduced by over $4 million. This is a huge amount that could be used elsewhere.

### Pros and Cons
Apart from the cost, another major benefit of using open source technology is that the operator does not need to learn vendor-specific CLI (command line interface) commands to program the devices and can easily be done with the help of automation tools. As the network is vendor-neutral, we can select any vendor - one which offers competitive pricing and also has the best hardware for the application. This also boosts the interoperability of devices. On the flip side, vendor products offer the best in class support for your hardware and software. Sometimes, open-source technologies may have a high learning curve which makes it harder for the operator to learn the technology.

### Automation Ready
One of the biggest advantages with white-box switches and Linux OS is that it is automation ready. Unlike logging into CLI and manually configuring the devices, these devices can be configured by writing and executing simple python scripts that will do the rest of the work for you. Softwares like Puppet, Chef, Ansible, ONF tools, OpenDayLight and other [SDN](https://www.networkcomputing.com/networking/10-sdn-platform-options) and [automation](https://www.rogerperkin.co.uk/network-automation/tools/) tools can be used easily with this technology as the user gets to decide the capabilities of the device rather than the vendor limiting its capabilities.

In conclusion, this article presented the pros and cons of open source as well as vendor technologies used by the IT industry today. Both have their advantages and shortcomings and it is up to the operator to decide which one path to follow, or maybe, use a hybrid model instead of a definite path. In my opinion, vendor-specific technology’s days are [numbered](https://techcrunch.com/2019/01/12/how-open-source-software-took-over-the-world/) and open source with interoperability is the way forward in network technology.

---

#### About the Author
<img style="float: left; padding-right: 5%; margin-bottom: 10px; width:30%;" src="/assets/images/education/authors/aakash-rawal.jpeg">Aakash Rawal is  a first-year graduate student pursuing a Masters in Technology, Cybersecurity and Policy at the University of Colorado Boulder. He is interested in Network Automation, DevOps and Network Security.
