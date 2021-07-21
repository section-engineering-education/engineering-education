
### Introduction

According to [wikipedia](https://en.wikipedia.org/wiki/Packet_Tracer) Cisco Packet Tracer is a cross-platform visual simulation tool designed by Cisco Systems that allows users to create network topologies and imitate modern computer networks, it also allows users to manipulate & simulate the properties of all kinds of routers and switches.

In this tutorial we will build a network in two different ways dynamic & static, we will also go through the steps of choosing the proper tools of Cisco packet tracer that would help us build the network from scratch. Cisco packet tracer is a very useful tool that allows the manipulation and implementation of various types of networks, it also gives us an authentic touch of how routers, switches, modems, and other useful tools really work in the real world.

### Table of contents

- understand dynamic routing
- understand static routing

### Prerequisites

Basic understanding of the packet tracer tools.

### Installing cisco packet tracer

In order to download the software you need to register & enroll the *"Intro to Packet Tracer"* course from [here](https://www.netacad.com/courses/packet-tracer). After enrolling the course, you will be able to download the software and use it freely.

### Dynamic routing

Dynamic routing, also known as Router Information Protocol (RIP), is one way to connect your devices on a network. Dynamic routing will do its best to keep as many routes free in case anything goes wrong.

We will build the network using the following tools from the cisco packet tracer.
Use the packet tracer tool provider then drag & drop the following to the workspace:

- 2 Routers(ISR4331) from network devices
- 2 Switches(2960IOS15) from network devices
- 4 Pc-PT from end devices

Your work space should look something like ![this](/engineering-education/building-a-network-with-dynamic-and-static-routing-using-cisco-packet-tracer/workspace-for-dyanamic-routing.png).

Now we need to connect the 4 computers to the switches using a copper-straight-through cable, in order to builed the network, go through the following steps.
- Click on the cable >> click on the first computer (PC0) >> click on FastEthernet0 >> click on switch0 >> click on FastEthernet0/1
- Click on the cable >> click on the second computer (PC1) >> click on FastEthernet0 >> click on switch0 >> click on FastEthernet0/2
- Click on the cable >> click on the third computer (PC2) >> click on FastEthernet0 >> click on switch1 >> click on FastEthernet0/1
- Click on the cable >> click on the fourth computer (PC3) >> click on FastEthernet0 >> click on switch1 >> click on FastEthernet0/2

Now we will connect the switches to the routers using the same cable.
- Click on the cable >> click on switch0 >> click on FastEthernet0/3 >> GigabitEthernet0/0/0
- Click on the cable >> click on switch1 >> click on FastEthernet0/3 >> GigabitEthernet0/0/0

Now we need to connect the router0 to the router1 using a copper-cross-over cable.
- Click on the cable >> click on router0 >> click on GigabitEthernet0/0/1 >> click on router1 >> GigabitEthernet0/0/1


Your work space should look something like ![this](/engineering-education/building-a-network-with-dynamic-and-static-routing-using-cisco-packet-tracer/dynamic-workspace-connected.png).

We have finished working on connecting the circuits with the computers, now we need to give each computer & circuit its own unique ip adreass. Follow the steps of giving each pc a unique address.

- Click on pc0 >> click on desktop >> click on ip configuration >> set ipv4 to 192.168.0.2 >> click on subnet mask for a default mask >> set default gataway to 192.168.0.1
- Click on pc1 >> click on desktop >> click on ip configuration >> set ipv4 to 192.168.0.3 >> click on subnet mask for a default mask >> set default gataway to 192.168.0.1
- Click on pc2 >> click on desktop >> click on ip configuration >> set ipv4 to 192.168.1.2 >> click on subnet mask for a default mask >> set default gataway to 192.168.1.1
- Click on pc3 >> click on desktop >> click on ip configuration >> set ipv4 to 192.168.1.3 >> click on subnet mask for a default mask >> set default gataway to 192.168.1.1

Now we need to set the ip for each router.
- Click on router0 >> click on config >> click on GigabitEthernet0/0/0 >> set ipv4 to 192.168.0.1 >> click on subnet mask for a default mask >> turn the port status on
- Click on router1 >> click on config >> click on GigabitEthernet0/0/0 >> set ipv4 to 192.168.1.1 >> click on subnet mask for a default mask >> turn the port status on
- Click on router0 >> click on config >> click on GigabitEthernet0/0/1 >> set ipv4 to 10.0.0.1 >> click on subnet mask for a default mask >> turn the port status on
- Click on router1 >> click on config >> click on GigabitEthernet0/0/1 >> set ipv4 to 10.0.0.2 >> click on subnet mask for a default mask >> turn the port status on

Now for the final step, we need to set the RIP for each router in order to connect the computers of each side togsther.

- Click on router0 >> click on config >> click on RIP >> add the default gataway of each router & the ip that the routers connect with each other with (192.168.0.0 - 192.168.1.0 - 10.0.0.0)
- Click on router1 >> click on config >> click on RIP >> add the default gataway of each router & the ip that the routers connect with each other with (192.168.0.0 - 192.168.1.0 - 10.0.0.0)

The RIP of each router should look like ![this](/engineering-education/building-a-network-with-dynamic-and-static-routing-using-cisco-packet-tracer/rip-ip.png).


Green arrows will indicate that the network is fully connected and it should look like ![this](/engineering-education/building-a-network-with-dynamic-and-static-routing-using-cisco-packet-tracer/green-arrows.png).

### Static routing

Static routing is used when we manually configure a router, and we are not supposed to use static routing if there is a need for change or reconfiguration of the network.

Static routing is very similar to dynamic routing in cisco packet tracer, but instead of using the RIP option, this time we will work on the static option. The steps of making a static network has the same steps of dynamic so we may repeat the steps untill we reach the RIP option.

The following steps will help you setup the static option.
- Click on router0 >> config >> static >> set the network the ip of router1 (192.168.1.0) >> set the mask to 255.255.255.0 >> set the next hop to the ip of the neighbor's router (10.0.0.2).
- Click on router1 >> config >> static >> set the network the ip of router0 (192.168.0.0) >> set the mask to 255.255.255.0 >> set the next hop to the ip of the neighbor's router (10.0.0.2).

The static option of router0 should look like ![this](/engineering-education/building-a-network-with-dynamic-and-static-routing-using-cisco-packet-tracer/static-ip.png). 

Finally, if you want to test out if the network is fully connected, you can send a packet from the first side of the network to the other side by clicking on the message icon and click on 2 different computers to test out the network.

### Conclusion
In this tutorial, we have built two different networks using two different methods, static & dynamic routing, we have also learned how to use the tools of cisco packet tracer and tested both of the methods by sending packets through the network. Don't forget to test out other circuits & methods to fully understand how it works.

### Further reading
- https://www.section.io/engineering-education/understanding-static-dynamic-routing/
- https://www.ciscopress.com/articles/article.asp?p=2995352
- https://www.ciscopress.com/articles/article.asp?p=2180209&seqNum=4
