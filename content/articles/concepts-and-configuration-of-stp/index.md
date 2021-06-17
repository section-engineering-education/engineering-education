---
layout: engineering-education
status: publish
published: true
url: /concepts-and-configuration-of-stp/
title: Concepts and Configuration of the Spanning Tree Protocol
description: This article will go through some of the Spanning Tree Protocol concepts in networking as well as the configurations which are used to deploy STP on a switch.
author: dawe-daniel
date: 2021-04-29T00:00:00-10:00
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/concepts-and-configuration-of-stp/hero.jpg
    alt: Spanning Tree Protocol example image
---
Loop prevention is one of the most important considerations when developing a [switched network](https://www.materialbidders.com/mb-news-details.php?id=120). Once a loop forms the amount of traffic exchanged between switches consumes all the bandwidth available. This happens within all the affected switches. A way to avoid having loops is by providing only one path between switches and making sure there is no continuity for the path in a switched network.
<!--more-->
The Spanning Tree Protocol is capable of [averting loops in the switched network](https://www.certificationkits.com/cisco-stp-ccna). It accomplishes this by obstructing redundant paths between switches. This article will go through some of the STP concepts as well as the configurations which are used to deploy STP on a switch.

### Prerequisites 
To follow through the article, you will need to:
1. Have [Cisco packet tracer](https://www.netacad.com/courses/packet-tracer) installed.
2. Have a basic knowledge of configuring [Cisco devices](https://www.networkstraining.com/basic-cisco-router-configuration-steps/).
3. Have an understanding of Cisco networking concepts.

### Purpose of the spanning tree protocol (STP)
Redundancy is an important aspect of hierarchical architecture used to avoid network service failures. This is by [removing single failure points](https://www.ccri.edu/faculty_staff/comp/jmowry/CNVT_1820_Power_point_2018/SRWE_Module_5.pptx). A single point of failure is a defect in the design, configuration, or execution of a device, circuit, or part that poses a risk. 

This because it may result in a situation where a single malfunction or fault causes the entire system to fail. Using many paths between switches to ensure there is no single point of failure when designing a [network is an important aspect](https://www.cram.com/flashcards/ccna-rs-scaling-networks-chapters-1-4-6361518). 

The figure below illustrates a single point of failure:

![Single point of failure](/engineering-education/concepts-and-configuration-of-stp/Single-point-of-failure.jpg)

[Image source](https://www.ictshore.com/free-ccna-course/hsrp-understanding/)


Physical paths must be added to redundant networks, but logical redundancy must also be considered. Users can access network services despite path interruption. By providing other physical paths for data to travel through the network.

In a switched Ethernet network, redundant paths can trigger logical and physical layer 2 loops. The Spanning Tree Protocol is an [xloop-prevention network protocol](http://www.knowcisco.com/topics/switching/index.html). It [creates a loop-free Layer 2 topology thus allowing redundancy](https://www.ccri.edu/faculty_staff/comp/jmowry/CNVT_1820_Power_point_2018/SRWE_Module_5.pptx). 

STP's main goal is to create a topology of all participating STP switches to create a loop-free switched network. Using this topology information, we can determine the most efficient [loop-free path through the switched network](https://www.ciscopress.com/articles/article.asp?p=1728837).

### The spanning tree protocol's (STP) operations 
A root switch election occurs when all switches behave as if they are the root switch at first. They continue to do so until they receive traffic from a superior switch (switch priority determines). This is known as a root switch election. 

We use the `show spanning-tree` command to check a switch's bridge priority. On running the command the network administrator can see the priority of the switch and the value it has been set to. The switch which has the [lowest value becomes the root switch](https://www.ccri.edu/faculty_staff/comp/jmowry/CNVT_1820_Power_point_2018/SRWE_Module_5.pptx). 

It's also worth remembering that the switch is designated as the spanning-tree protocol instance's root bridge. The network administrator can change the switch priority that we will see when we begin the configurations. 

Another thing to bear in mind is that depending on the STP mode used, the network may have multiple root switches. Each VLAN has its STP case on and a root switch is automatically elected for each VLAN; [this mode is known as Per VLAN Spanning Tree Plus (PVST+)](https://www.ciscopress.com/articles/article.asp?p=1728837). Rapid PVST+ is used when RSTP is implemented.

![STP ports](/engineering-education/concepts-and-configuration-of-stp/spanning-tree.jpg)

[Image source](https://imsucc.blogspot.com/2019/12/spanning-tree-protocol-example.html)

Following the election of the root switch, each port is assigned a role based on its location [within the STP topology](http://startabizclient3.com/least-number/stp-blocking-cisco.html). 

When using 802.1D spanning tree protocol, the following port roles are usable:
- Root — The port allocated to this position is [the best route to the root switch](https://www.ciscopress.com/articles/article.asp?p=1728837).
- Designated — The port assigned to this position is chosen based on the best route to a particular switched segment. Only one port is assigned to each switched section.
- Alternate — This port is designated as a backup to the root port; if the root port fails, this port will [assume control of the root port role](https://www.yumpu.com/en/document/view/35765136/chapter-9-rapid-spanning-tree-protocol-rstp-e-c-spot-on).
- Backup — The port assigned to this position is set as a fallback for the designated port. If the designated port fails, this port assumes the role of the designated port.

To avoid loops, all ports with the alternative or backup STP roles are blocked. This is done until the best route has been determined and [every port is allocated a role](https://www.ciscopress.com/articles/article.asp?p=1728837).

### Spanning tree protocol interface states
Each [activated port on a switch participates in STP](https://www.ciscopress.com/articles/article.aspx?p=1728837). And each of these ports must go through an interface state phase before being allowed to forward traffic. Figure 1 depicts the 802.1D interface states in order.

![STP interface states](/engineering-education/concepts-and-configuration-of-stp/interface-states.jpg)

[Image source](https://www.cisco.com/en/US/docs/switches/lan/catalyst3650/software/release/3se/consolidated_guide/configuration_guide/b_consolidated_3850_3se_cg_chapter_01001001.html)

A port can be in one of five states, as shown above, which are also listed below:
- Blocking State - Blocking ports do not forward traffic; instead, they listen to the network to determine if they can continue to block traffic. The port could go into listening mode if the state of the switched network changes. Following switch initialization, all ports are in a blocking mode.
- Listening State - [No traffic is diverted while a port is in this state](http://etutorials.org/Networking/lan+switching/Chapter+7.+Spanning+Tree+Protocol+STP/Chapter+Summary). The port can only listen to traffic when in this state, just as it did when it was blocking. After the port is ready to start the process of frame forwarding, it is the [first state after the blocking state](https://www.ciscopress.com/articles/article.aspx?p=1728837). In the listening mode, the [default time is 15 seconds](https://abhishek563.blogspot.com/2017/03/stp-interview-questions-and-answers-ccnp.html).
- Learning State - Ports in the learning state [do not forward traffic](https://www.ciscopress.com/articles/article.aspx?p=1728837). Instead, [they listen to traffic and continue to learn addresses from the connected devices on a section while in this state](https://www.ciscopress.com/articles/article.aspx?p=17288377).
- Forwarding State - Ports in the forwarding state [begin to grasp addresses from the section while still forwarding traffic](https://www.ciscopress.com/articles/article.asp?p=1728837).
- Disabled State - The disabled state of a port prevents it from forwarding traffic or listening for network traffic.

The time it takes for a port to convert and the process used to transition have both improved since the [RSTP](https://www.cisco.com/c/en/us/support/docs/lan-switching/spanning-tree-protocol/24062-146.html) was introduced. This allows a switched network to start routing traffic faster and without unnecessary delays. This was a complaint about the 802.1D version of STP.

### Configuration of the spanning tree protocol
STP is enabled by default on VLAN 1 and all newly created VLANs, so activating STP on a newly initialized switch does not require any commands. 

#### Step 1 – enabling STP
To re-enable STP on a specific VLAN if an outdated switch has it disabled. We click on the switch in our cisco packet tracer and enter the commands as follows after we have created our topology:

```bash
switch>enable
switch#configure terminal
switch(config)#spanning-tree vlan vlan-id
switch(config)#end
```

We can break down the commands as shown below:
- `switch>enable` - It is used to enter privileged mode.
- `switch#configure terminal` - It is used to enter the switch management interface.
- `switch(config)#spanning-tree vlan vlan-id` - We use this command to enable the spanning tree protocol on our VLAN. `vlan-id` identifies which of the vlans we need to enable stp on.
- `switch(config)#end` - It is used to exit the configuration mode.

When first setting up STP, it's best to find out which of the network's switches will be the root switch. Although the network might be able to decide this on its own, the election would simply be a matter of who has the lowest MAC address.

Each switch starts with a priority of 32768; this priority is then combined with the switch's MAC address to form the bridge ID. The switch with the lowest bridge ID is selected as the root switch in the [process of a root switch election](https://ciscoexam.online/CCNA/200-301/5531).

#### Step 2 – choosing a root switch
We use the commands below to determine the root switch:
```bash
switch>enable
switch#configure terminal
switch(config)#spanning-tree vlan vlan-id root primary
switch(config)#spanning-tree vlan vlan-id root secondary
switch(config)#spanning-tree vlan vlan-id priority priority
switch(config)#end
```

We can break down the commands as shown below:
- `switch>enable` - It is used to enter privileged mode.
- `switch#configure terminal` - It is used to enter the management interface.
- `switch(config)#spanning-tree vlan vlan-id root primary` - We use this to change the switch to the primary root switch. This command calculates the switch priority needed to make the switch root and sets it to that value.
- `switch(config)#spanning-tree vlan vlan-id root secondary` - We use this to Change the switch's status to a secondary root switch. Thus it changes the switch's priority to 28672.
- `switch(config)#spanning-tree vlan vlan-id priority priority` - Sets the switch priority. The default is 32768, so any value lower than that will render the switch root. It is advisable to make use of the earlier commands instead of this one.
- `switch(config)#end` - It is used to exit the configuration mode.

#### Step 3 – spanning-tree mode
Use the commands below to change the default Spanning Tree mode from PVST+ to something else. To adjust the default Spanning Tree mode from PVST+ to something else, use the commands mentioned below. 

```bash
switch>enable
switch#configure terminal
switch(config)#spanning-tree mode {pvst | rapid-pvst}
switch(config)#ends
```

We can break down the commands as shown below:
- `switch>enable` - It is used to enter privileged mode.
- `switch#configure terminal` - It is used to enter the global configuration mode.
- `switch(config)#spanning-tree mode {pvst | rapid-pvst}` - We use this command to configure the Spanning Tree mode to use.
- `switch(config)#end` - It is used to exit the configuration mode.

Using the commands above, we have enabled the spanning tree protocol (STP) on our switches and selected the root switch in our topology. Which will determine the best route to use in the process of data transversing across the network. We have also set the switch priority and changed the switch's status to a secondary root switch to lower the switch's priority value. 

We have configured the spanning tree protocol mode. For each of the spanning-tree instances, we have a root bridge that is elected. This allows you to have unlike root bridges for unlike VLAN groups. For each VLAN, STP runs a separate instance of STP. There is only one spanning-tree instance [if VLAN 1 is used by all ports on all switches](https://www.coursehero.com/file/p15dblh/Forward-Delay-Timer-The-forward-delay-is-the-time-that-is-spent-in-the).

### Conclusion
STP is one of those protocols that most people don't realize they're using, but modern switched networks wouldn't be able to run without it. In this article, we have learned the basic concepts and configuration of STP and how it functions to end loops in switches. And how it can be built to improve network performance.

Happy coding!

---
Peer Review Contributions by: [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)