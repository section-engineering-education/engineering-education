# DDoS Attacks: Using Botnets as a Tool

A DDoS attack or [Distributed Denial of Service attack](https://en.wikipedia.org/wiki/Denial-of-service_attack#Distributed_DoS_attack) is a type of [Denial of Service (DoS)](https://en.wikipedia.org/wiki/Denial-of-service_attack) attack where the incoming traffic flooding the victim originates from many different sources. This effectively makes it impossible to stop the attack simply by blocking a single source.
Since DDoS attack uses thousands, or hundreds of thousands, of sources to flood its target its power is greater than a DoS attack by quite a few orders of magnitude. 

There’s more than one way of carrying out a denial-of-service attack. Some methods are easier to execute than others, but not as powerful. Other times, the attacker might want to go the extra mile, to really be sure the victim gets the message, so he can hire a dedicated botnet to carry out the attack.

## Types of DDoS Attacks 

### [Application layer](https://en.wikipedia.org/wiki/Denial-of-service_attack#Application-layer_attacks)
DDoS attack types include HTTP floods, slow attacks (Slowloris, RUDY), zero-day assaults, and those targeting vulnerabilities in operating systems, web applications and communication protocols. Comprising seemingly legitimate and innocent requests, their magnitude usually being measured in requests per second (RPS), the goal of the attacks is to overwhelm a target application with requests. This causes high CPU and memory usage that eventually hangs or crashes the application.
### [Network layer](https://en.wikipedia.org/wiki/Denial-of-service_attack#HTTP_slow_POST_DoS_attack)
DDoS attack types include UDP floods, SYN floods, NTP amplification, DNS amplification, SSDP amplification, IP fragmentation and more.
These are high-capacity barrages, measured in gigabits per second (Gbps) or packets per second (PPS). They’re almost always executed by botnets, with a goal of consuming the target’s upstream bandwidth, resulting in network saturation.

![botnet](https://github.com/gagan3012/engineering-education/blob/article-3/DDoSBotnets/what-is-a-botnet-and-how-to-protect-yourself-in-2019-1.png.png)
## Botnets

A botnet is a collection of computers or other Internet-connected devices that have been infected with malware, and now respond to the orders and commands of a central computer, called the Command and Control center. Botnets can be used to perform Distributed Denial-of-Service (DDoS) attacks, steal data, send spam, and allow the attacker to access the device and its connection. The big botnets have a web of millions of devices, and most of the owners have no clue their devices are compromised. Some, however, are available to rent for the highest bidder, who can use them in whatever way seems fit. Oftentimes, this means a DDoS attack.

To communicate with a C&C server, the botmaster uses various hidden channels, including seemingly innocuous protocols like IRC and HTTP websites, as well as popular services like Twitter, Facebook and even Reddit. Botnet servers are able to communicate and cooperate with other botnet servers, effectively creating a P2P network controlled by a single or multiple botmasters. This means that any given botnet DDoS attack may have multiple origins, or be controlled by multiple individuals—sometimes working in a coordinated manner, other times operating independently.
DDoS attacks have become a viable (if criminal) and cost-effective option for anyone looking to take out a website or disturb communication of home and office networks. This results in a number of attack scenarios, ranging from shady businesses using DDoS to gain a competitive advantage to assaults in which DDoS becomes a tool of vandalism, revenge or simply a way to get some attention.

Full-service DDoS attacks are available for as little as $5 per hour, and the interested party can easily stretch their hour with a monthly plan that averages $38. Within the cybercrime ecosystem, botnet DDoS attacks are a mainstream commodity; prices continually drop, while efficacy and sophistication is constantly on the rise.

## Botnet Structures 

Botnet structures usually take one of two forms, and each structure is designed to give the botmaster as much control as possible.

![botnet](https://github.com/gagan3012/engineering-education/blob/article-3/DDoSBotnets/structuresBotNets.jpg)

### Client-server model

The client-server botnet structure is set up like a basic network with one main server controlling the transmission of information from each client. The botmaster uses special software to establish command and control (C&C) servers to relay instructions to each client device.
While the client-server model works well for taking and maintaining control over the botnet, it has several downsides: it’s relatively easy for law enforcement officials to locate the C&C server, and it has only one control point. Destroy the server, and the botnet is dead.
### Peer-to-peer
Rather than relying on one centralized C&C server, newer botnets have evolved to use the more interconnected peer-to-peer (P2P) structure. In a P2P botnet, each infected device functions as a client and a server. Individual bots have a list of other infected devices and will seek them out to update and to transmit information between them.
P2P botnet structures make it harder for law enforcement to locate any centralized source. The lack of a single C&C server also makes P2P botnets harder to disrupt. Like the mythological Hydra, cutting off the head won’t kill the beast. It has many others to keep it alive.

## Botnet Protection

By now it should be evident that a global strategy is required to counter botnets, one that includes good practices on the Internet as well as antivirus protection. As you now know how botnets operate, here is some advice about how to deal with them.

- Keep your operating system up-to-date
- Don't open files from unknown or suspicious sources
- Scan all downloads before running the downloaded files, or find different ways of transferring files.
- Don't click suspicious links
- Install an antivirus program

If you have IoT devices, you should make sure your devices are formatted for the maximum protection. Secure passwords should be used for all devices. Internet of Things devices have been vulnerable to weak passwords, with many devices operating with easily discovered default passwords. A strong firewall is also important. Protecting your devices is an essential part of Cyber Safety.

