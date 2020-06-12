## What is Denial of Service ?
It is a type of cyber attack which achieve their goal by flooding a stream of packets to the victim that swamps his network or processing capacity denying access to the legitimate user. It can cost both time and money because its resources and services are inaccessible.

## Common types of attacks 

- Smurf Attack - An assault on a network that floods it with excessive messages in order to impede normal traffic. It is accomplished by sending ping requests (ICMP echo requests) to a broadcast address on the target network or an intermediate network. The return address is spoofed to the victim's address. Since a broadcast address is picked up by all nodes on the subnet, it functions like an amplifier, generating hundreds of responses from one request and eventually causing a traffic overload.
- SYN Flood - It is a type of TCP State-Exhaustion Attack  that attempts to consume the connection state tables present in many infrastructure components, such as load balancers, firewalls, Intrusion Prevention Systems (IPS), and the application servers themselves. This type of attack can take down even high-capacity devices capable of maintaining millions of connections.
- UDP Flood Attack - Large number of User Datagram Protocol (UDP) packets are sent to a targeted server with the aim of overwhelming that device’s ability to process and respond. The firewall protecting the targeted server can also become exhausted as a result of UDP flooding, resulting in a denial-of-service to legitimate traffic.
- Plashing - It is done by causing permanent damage to the system hardware by sending fraudulent updates to the hardware thereby making them completely unusable. The only solution is to re-install the hardware.
- Fragmentation attacks - It fights against the reassembling ability of the target. Numerous fragmented packets are sent to the target, making it difficult for the target to reassemble them; thereby, denying access to valid clients.

## How do you avoid being part of the problem?

While there is no way to completely avoid becoming a target of a DoS attack, proactive steps can be taken to reduce the effects of an attack on their network.

- Contact your Internet Service provider - If you find your company is under attack, you should notify your Internet Service Provider as soon as possible to determine if your traffic can be rerouted. Having a backup ISP is a good idea, too. Also, consider services that can disperse the massive DoS traffic among a network of servers. That can help render an attack ineffective.
- Investigate black hole routing - Internet service providers can use “black hole routing.” It directs excessive traffic into a null route, sometimes referred to as a black hole. This can help prevent the targeted website or network from crashing. The drawback is that both legitimate and illegitimate traffic is rerouted in the same way.
- Configure firewalls and routers - Firewalls and routers should be configured to reject bogus traffic. Remember to keep your routers and firewalls updated with the latest security patches.
- Consider front-end hardware - Application front-end hardware that’s integrated into the network before traffic reaches a server can help analyze and screen data packets. The hardware classifies the data as a priority, regular, or dangerous as they enter a system. It can also help block threatening data.

## How do you know if an attack is happening?

- Unusually slow network performance
- Unavailability of a particular website
- An inability to access any website.

## Additional Resources

- [Denial of Service Attacks](https://s2.ist.psu.edu/paper/DDoS-Chap-Gu-June-07.pdf) by Qijun Gu and Peng Liu
- [Smurf Attack](https://usa.kaspersky.com/resource-center/definitions/what-is-a-smurf-attack)
- [SYN Flood Attack](https://www.cloudflare.com/learning/ddos/syn-flood-ddos-attack/)
- [UDP Flood Attack](https://www.cloudflare.com/learning/ddos/udp-flood-ddos-attack/)
- [IPFragmentation Attack](https://www.netscout.com/what-is-ddos/ip-icmp-fragmentation)

## About the Author

Richu Thomas a student of DPG Institute of Technology and Management, India. He is a Github Campus Expert and Leads Developers Student Club and Hack Club in his campus.Always Intrested in learning new things
