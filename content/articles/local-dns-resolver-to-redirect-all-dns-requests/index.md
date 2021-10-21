---
layout: engineering-education
status: publish
published: true
url: /local-dns-resolver-to-redirect-all-dns-requests/
title: How to use a Local DNS Resolver to Redirect all DNS Requests
description: In this article we will go over reasons that would require you to redirect DNS requests and how to redirect DNS requests.
author: daniel-muriithi
date: 2021-10-21T00:00:00-15:13
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/local-dns-resolver-to-redirect-all-dns-requests/hero.png
    alt: DNS Resolver Requests example image
---
A **DNS query**, also known as a **DNS request**, is a request for information from a users computer to a DNS server (DNS client). These requests are made to acquire the IP address associated with a domain name. A DNS client requests DNS servers to retrieve the domains IP address when visiting an environment.
<!--more-->
When configuring a home network, one can choose to enable just the Unbound DNS service on OPNsense to be accessible while banning access to all other DNS servers. 

This simple solution works well enough because any unauthorized access to external DNS servers is simply denied. Only the local network's DNS resolver is permitted (unless the DNS requests are encrypted).

However, one can take a different approach. The local DNS server can be used to route all DNS requests to alternate `external servers`. That way, you can make sure that everything is working properly and limit or filter DNS requests. 

You can also easily monitor DNS requests that would otherwise go undetected if a firewall rule had blocked them with the DNS redirection feature enabled on your computer.

### Prerequisites
- Have the [OPNsense](https://opnsense.org/) software installed. [Click here](https://techexpert.tips/opnsense/opnsense-installation-step-by-step/#:~:text=Access%20the%20OPNsense%20Download%20Portal.%20On%20the%20OPNsense,our%20example%2C%20we%20downloaded%20the%20OPNsense-19.7-OpenSSL-dvd-amd64%20installation%20image.) to learn how to download the OPNsense software.


### Table of contents
- [Reason for redirecting DNS requests to local DNS resolver](#reason-for-redirecting-dns-requests-to-local-dns-resolver)
- [Creating a DNS Redirection NAT Port Forward Rule](#creating-a-dns-redirection-nat-port-forward-rule)
- [Configuration of multiple Interfaces](#configuration-of-multiple-interfaces)
- [Testing the redirection](#testing-the-redirection)
- [Conclusion](#conclusion)

### Reason for redirecting DNS requests to local DNS resolver
Even though some devices (such as Smart TVs) should be automatically configured to use the local DNS server provided by the DHCP service. Some devices will attempt to use Google's DNS servers or other public DNS servers. 

Possibly to circumvent ad blockers and to gather valuable data on DNS requests made by your device. The approach described above will not work for devices that only use alternative/hard-coded DNS servers if the machine refuses to use the preset DNS servers.

### Creating a DNS redirection NAT Port forward rule
Implementing a basic NAT port forward rule to reroute DNS requests from a certain network is possible. Port forwarding rules are often used to allow traffic from an outside network on the Internet to access various services housed on your network, but they can be used on internal network interfaces as well. 

In fact on the `Firewall: NAT: Port Forward` page on our `OPNsense software`, you will see that the default anti-lockout rule is applied to the LAN interface so that you do not lose access to the web interface should you accidentally create a rule which blocks access.

Click the `Add` button on the `Firewall > NAT > Port Forward` page. 

As illustrated in the screenshot below, you'll want to alter the following settings:

![Data](/engineering-education/local-dns-resolver-to-redirect-all-dns-requests/image-01.png)

![Data entry](/engineering-education/local-dns-resolver-to-redirect-all-dns-requests/image-02.png)

Your local network interfaces/VLANs may be the `Interface`. My IoT network was used as an example. For this rule, only one interface can be selected. Use your interface's system-generated network address as your `Destination`. `IOT net` is an example of this. 

If you want to match DNS traffic, use `DNS` as the destination port range. It uses OPNsense's internal Unbound DNS service because the "Redirect target IP" is `127.0.0.1` (localhost). The `Redirect target IP` box will require the IP address of your Pi-hole DNS server if you are operating a Pi-hole DNS server. 

If you're running two Pi-hole servers for redundancy, you can create an alias for each IP. This will allow your DNS requests to be more evenly distributed across the two servers by selecting a random option like `Random` or `Round Robin`. I've never used the pool choices for this reason, although I did consider it while I was aiding someone with two Pi-holes who needed help.

However, I've put it in the list if you forget to set it to `DNS` based on your `Destination port range` decision.

If you select `Destination/Invert`, the rule will match any traffic originating from the IoT network and not use the local IOT gateway IP address to resolve DNS requests. 

Put another way, this rule will be activated on any DNS traffic meant for DNS servers situated on the Internet or even on other areas of your network. OPNsense configures each network's interface address as the gateway/DNS address by default.

`192.168.30.0` - `192.168.30.255` is the network IP address range for an IoT network with a `192.168.30.1` interface IP address, which is the gateway and DNS server addresses for that network. As a result, the DNS traffic to `192.168.30.1` will be allowed, but all other traffic will be redirected to `127.0.0.1`.

So there is no need to turn this address, so the redirect rule is not triggered. All interface addresses, such as 192.168.30.1, will resolve to the local Unbound DNS resolver, the localhost address of `127.0.0.1`, which is why the redirect target IP address is set to the localhost address.

You may want to go to the firewall rules page for the interface where you've put a NAT port forward rule after clicking `Save`. Firewall > Rules > IoT, for example. A rule was automatically inserted at the end of the list, as you can see. Depending on the other rules you have defined, this auto-generated rule may need to be moved to the top of the list. The other rule(s) should not interfere with the correct functioning of the rule.

However, if you have many networks, this rule must be repeated for each network where DNS requests are redirected. Continued repetition could become dull and irritating. Also, if you decide to change the law in the future, it will require extra upkeep. Fortunately, there's a technique to create a single rule for numerous interfaces that's simple.

### Configuration of multiple interfaces
You can construct a firewall group to apply a single rule to numerous interfaces. Using firewall groups, you can arrange several interfaces into a single group and write rules that apply to all of the interfaces in the group at once. 

When it comes to the ruling hierarchy, group rules take precedence over a set of interface rules. DNS redirection rules are likely to be executed before interface rules. Therefore you shouldn't have any problems. It is important to keep in mind the rule processing order while developing group rules for multiple interfaces.

Go to the `Firewall > Groups` page to create a rule group. Then select "Add" from the drop-down menu.

![Add](/engineering-education/local-dns-resolver-to-redirect-all-dns-requests/image-03.png)

Assign the firewall group a `Name` before selecting the interfaces/networks to which you want the DNS requests redirected. `commands` is a descriptive name for the group in my example. For some interfaces, you may not require or want redirection; therefore, you can uncheck the box. 

You may, for example, have a network that is completely disconnected from the Internet. There may be networks where you would rather prohibit external DNS requests than reroute them. For the group to be created, click on `Save`.

![Save](/engineering-education/local-dns-resolver-to-redirect-all-dns-requests/image-04.png)

Just as before, you can create a redirection by selecting the firewall group instead of an interface. Click the `Add` button on the "Firewall > NAT > Port Forward" page. 

Please enter the following values:

![Value entry](/engineering-education/local-dns-resolver-to-redirect-all-dns-requests/image-05.png)

The redirection from the NAT port forward should have been immediately added to the rule list on the `Firewall > Rules > CommonDNS` page.

![Page view](/engineering-education/local-dns-resolver-to-redirect-all-dns-requests/image-06.png)

### Testing the redirection
How do you check to see if the redirection is working properly? After all, if everything is properly configured, you may not notice any difference. One straightforward method is to provide a DNS override. A DNS override can be used to assign a different IP address to a specific domain, including publicly accessible domain names on the Internet. 

In a corporate setting, this can be handy if you wish to have an Intranet gateway that is distinct from the public Internet website. It can be used to test DNS redirection for our needs.

Navigate to the `Services > Unbound DNS > Overrides` section. 

To add a new override:

Click the `+` button.

Enter a well-known domain name that you do not use for anything else on your network (to avoid any potential service disruptions), such as yahoo.com.

Choose a random local IP address from your network, for example, `192.168.20.200`

![IP address entry](/engineering-education/local-dns-resolver-to-redirect-all-dns-requests/image-07.png)

When you save the override, it will appear in the list. To make the changes take effect, click the `Apply` button.

![Applying the changes](/engineering-education/local-dns-resolver-to-redirect-all-dns-requests/image-08.png)

A DNS lookup for an IP address in Linux can be done with the host command. It is not necessary to use your default DNS server when using the host command. I'm making an external DNS request using Google's DNS server. 

Rather than returning the public IP address, the local IP address is returned:

```bash
$ host yahoo.com 8.8.8.8
Using domain server:
Name: 8.8.8.8
Address: 8.8.8.8#53
Aliases: 

yahoo.com has address 192.168.20.200
```

Try visiting yahoo.com using your web browser if you're using Windows or prefer not to utilize a command-line program. Unless the browser caches the IP address, it should fail.

Remember to remove the DNS override once you've finished testing. Then, you won't be able to access that website!

### Conclusion
If you want to redirect rogue DNS requests to one of your configured DNS servers, you only need one simple rule. The default Unbound DNS server or something like Pi-hole are both options. Using an alias, it is possible to randomly, or round-robin redirect DNS requests to several IP addresses.

This is useful if you have many DNS servers (I recommend having two in case one goes down or you are performing updates your network does not go down). Using firewall groups, you can also configure numerous interfaces at the same time.

I hope you found the many approaches to configure DNS requests usefull!

Happy learning!

---
Peer Review Contributions by: [Adrian Murage](/engineering-education/authors/adrian-murage/)
