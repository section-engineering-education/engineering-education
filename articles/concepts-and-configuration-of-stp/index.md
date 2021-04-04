### Introduction
Loop prevention is one of the most important considerations when developing a switched network. In a switched network, once a loop forms, the amount of traffic that can be exchanged between switches easily consumes all of the bandwidth available within each of the affected switches. One way to avoid loops is to provide only a single path between switches and to [ensure that there is no path continuity in the switched network](https://www.ciscopress.com/articles/article.asp?p=1728837). The Spanning Tree Protocol is capable of averting loops in the switched network. It accomplishes this by temporarily obstructing redundant paths between switches. This article will go through some of the STP concepts as well as the configurations which are used to deploy STP on a switch.

### Prerequisites 
To follow through the article, you will need to:
1. Have [Cisco packet tracer](https://www.netacad.com/courses/packet-tracer) installed.
2. Have a basic knowledge of configuring [Cisco devices](https://www.networkstraining.com/basic-cisco-router-configuration-steps/).
3. Have an understanding of Cisco networking concepts.

### Purpose of the spanning tree protocol (STP)
Redundancy is an important aspect of the hierarchical architecture for avoiding network service failures and removing single points of failure. Physical paths must be added to redundant networks, but logical redundancy must also be considered. Users can access network services despite path interruption by providing alternative physical paths for data to traverse the network. 

In a switched Ethernet network, redundant paths, on the other hand, can trigger logical and physical layer 2 loops. The Spanning Tree Protocol is a loop-prevention network protocol that [creates a loop-free Layer 2 topology thus allowing for redundancy](https://www.ciscopress.com/articles/article.asp?p=1728837). STP's main goal is to create a topology of all participating STP switches to create a loop-free switched network. The best loop-free path through the switched network is then [calculated using this topology information](https://www.ciscopress.com/articles/article.asp?p=1728837).

### The spanning tree protocol's (STP) operations 
A root switch election occurs when all switches behave as if they are the root switch at first and continue to do so until they receive traffic from a superior switch (switch priority determines). This is known as a root switch election. Another thing to bear in mind is that depending on the STP mode used, the network may have multiple root switches. Each VLAN has its STP case on Cisco switching equipment, and a root switch is [automatically elected for each VLAN; this mode is known as Per VLAN Spanning Tree Plus (PVST+)](https://www.cciein8weeks.com/ccie-rs-400-101-v5-1-written-exam-implement-and-troubleshoot-spanning-tree). Rapid PVST+ is used when RSTP is implemented.

![STP ports](/engineering-education/concepts-and-configuration-of-stp/spanning-tree.jpg)

[Image source](https://imsucc.blogspot.com/2019/12/spanning-tree-protocol-example.html)

Following the election of the root switch, each port is assigned [a role based on its location within the STP topology](http://startabizclient3.com/least-number/stp-blocking-cisco.html). The available port roles when using 802.1D spanning tree are listed below:

- Root — The port allocated to this position is [the best route to the root switch](https://www.ciscopress.com/articles/article.asp?p=1728837).
- Designated — The port assigned to this position is chosen based on the best route to a particular switched segment; each switched segment has only one designated port.
- Alternate — This port is designated as a backup to the root port; [if the root port fails, this port will assume control of the root port role](https://www.yumpu.com/en/document/view/35765136/chapter-9-rapid-spanning-tree-protocol-rstp-e-c-spot-on).
- Backup — The port assigned to this position is set as a fallback for the designated port; if the designated port fails, this port assumes the designated port's role.

To avoid loops, all ports with the alternative or backup STP roles will be [blocked until the best route has been determined and each of the ports has been allocated a role](https://www.ciscopress.com/articles/article.asp?p=1728837).

### Spanning tree protocol interface states
Each activated port on a switch participates in STP, and each of these ports must go through an interface state phase before being allowed to forward traffic. Figure 1 depicts the 802.1D interface states in order.

![STP interface states](/engineering-education/concepts-and-configuration-of-stp/interface-states.jpg)

[Image source](https://www.cisco.com/en/US/docs/switches/lan/catalyst3650/software/release/3se/consolidated_guide/configuration_guide/b_consolidated_3850_3se_cg_chapter_01001001.html)

A port can be in one of five states, as shown above, which are listed below:

- - Blocking State - Blocking ports do not forward traffic; instead, they listen to the network to determine if they can continue to block traffic. The port could go into listening mode if the state of the switched network changes. Following switch initialization, all ports are in a blocking mode.
- Listening State - [No traffic is diverted while a port is in the listening state](https://itdaddy.wordpress.com/category/stp-spanning-tree-8021d). The port can only listen to traffic when in this state, just as it did when it was blocking. After the port is set to start frame forwarding, this is the [first state after the blocking state](https://www.ciscopress.com/articles/article.asp?p=1728837). In the listening mode, the default time is 15 seconds.
- Learning State - Ports in the learning state do not forward traffic; instead, [they listen to traffic and continue to learn addresses from the connected devices on a section while in this state](https://www.ciscopress.com/articles/article.asp?p=1728837). The default time is 15 seconds when in this state.
- Forwarding State - Ports in the forwarding state [begin to learn addresses from the section while still forwarding traffic](https://www.ciscopress.com/articles/article.asp?p=1728837).
- Disabled state - The disabled state of a port prevents it from forwarding traffic or listening for network traffic.

The time it takes for a port to convert and the process used to transition have both improved since the [RSTP](https://www.cisco.com/c/en/us/support/docs/lan-switching/spanning-tree-protocol/24062-146.html) was introduced. This allows a switched network to start routing traffic faster and without unnecessary delays, which is a common complaint about the 802.1D version of STP.

### Configuration of the spanning tree protocol
STP is enabled by default on VLAN 1 and all newly created VLANs, so activating STP on a newly initialized switch does not require any commands. 

#### Step 1 – enabling STP
To re-enable STP on a specific VLAN if an older switch has it disabled for some reason. We click on the switch in our cisco packet tracer and enter the commands as follows after we have created our topology:

```
switch>enable
switch#configure terminal
switch(config)#spanning-tree vlan vlan-id
switch(config)#end
```

We can break down the commands as shown below:

- `switch>enable` - It is used to enter privileged mode.
- `switch#configure terminal` - It is used to enter the global configuration mode.
- `switch(config)#spanning-tree vlan vlan-id` - we use this command to enable STP on a VLAN. `vlan-id` is used to identify the vlan to enable stp on.
- `switch(config)#end` - It is used to exit the configuration mode.

When first setting up STP, it's best to find out which of the network's switches will be the root switch. Although the network might be able to decide this on its own, the election would simply be a matter of who has the lowest MAC address.

Each switch starts with a priority of32768; this priority is then combined with the switch's MAC address to form the bridge ID. During a root switch election, [the switch with the lowest bridge ID is chosen as the root switch](https://www.ciscopress.com/articles/article.asp?p=1728837).

#### Step 2 – choosing a root switch
We use the commands below to determine the root switch:

```
switch>enable
switch#configure terminal
switch(config)#spanning-tree vlan vlan-id root primary
switch(config)#spanning-tree vlan vlan-id root secondary
switch(config)#spanning-tree vlan vlan-id priority priority
switch(config)#end
```

We can break down the commands as shown below:

- `switch>enable` - It is used to enter privileged mode.
- `switch#configure terminal` - It is used to enter the global configuration mode.
- `switch(config)#spanning-tree vlan vlan-id root primary` - We use this to set the switch to become the root switch. This command calculates the switch priority needed to make the switch root and sets it to that value.
- `switch(config)#spanning-tree vlan vlan-id root secondary` - We use this to Change the switch's status to secondary root switch. This command sets the switch's priority to 28672.
- `switch(config)#spanning-tree vlan vlan-id priority priority` - Set the switch priority; the default is32768, so any value lower than that will render the switch root. It is recommended that you use the earlier commands instead of this one.
- `switch(config)#end` - It is used to exit the configuration mode.

#### Step 3 – spanning-tree mode
Use the commands below to change the default Spanning Tree mode from PVST+ to something else. To adjust the default Spanning Tree mode from PVST+ to something else, use the commands mentioned below. 

```
switch>enable
switch#configure terminal
switch(config)#spanning-tree mode {pvst | rapid-pvst}
switch(config)#ends
```

We can break down the commands as shown below:

- `switch>enable` - It is used to enter privileged mode
- `switch#configure terminal` - It is used to enter the global configuration mode
- `switch(config)#spanning-tree mode {pvst | rapid-pvst}` - We use this command to configure the Spanning Tree mode to use.
- `switch(config)#end` - It is used to exit the configuration mode.

### Conclusion
STP is one of those protocols that most people don't realize they're using, but modern switched networks wouldn't be able to run without it. In this article, we have learned the basic concepts and configuration of STP and how it functions to eliminate loops in switches, and how it can be built to improve network performance.