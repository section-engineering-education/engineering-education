---
layout: engineering-education
status: publish
published: true
url: /learn-how-to-set-up-linux-quagga-routing-suite/
title: Learn how to set up Linux's Quagga Routing Suite
description: In this tutorial, we will exhibit how to introduce the Quagga steering suite on Ubuntu working framework through an order line interface.
author: bernard-mburu
date: 2021-10-26T00:00:00-12:30
topics: [Linux]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/learn-how-to-set-up-linux-quagga-routing-suite/hero.png
    alt: Learn how to set up Linux's Quagga Routing Suite Hero Image
---
Quagga is a free and open-source project that gives directed assistance to Linux clients. 
It's presently one of the most generally utilized open-source drives. For instance, this specialized gathering has created Open Shortest Path First and Routing Information Protocol just as Border Gateway Protocol, Intermediate System to Intermediate System, and Multiprotocol Label Switching. 
Virtual JUNIPER terminal or solicitation line interface is utilized to mastermind shows in this variant of the program. 
Utilizing a solicitation line interface, we'll tell you the best way to add 'Quagga' to the Ubuntu working system.

### Table of content
- [Introduction](#introduction)
- [Table of content](#table-of-content)
- [Installation](#installation)
- [Configuration](#configuration)
  - [Zebra daemon](#zebra-daemon)
- [Ospfd daemon](#ospfd-daemon)
  - [Ripd daemon](#ripd-daemon)
- [Conclusion](#conclusion)
  - [Further reading](#further-reading)
### Installation 
You might get everything rolling with Quagga by beginning from the source code; notwithstanding, it will be conveyed to you as a `deb/matched` pack here. 
Before we install Quagga in your linux machine we have to check its status first and that is achieved by running the code below.
```
# apt-cache depends quagga
```
- The accompanying picture shows the aftereffects of running the recently referenced command.
  ![installation](/engineering-education/learn-how-to-set-up-linux-quagga-routing-suite/installation.png "installation")
To Istall Quagga run the below code in your terminal. 
```
# apt-get install quagga quagga-doc
```
The accompanying picture shows the Quagga bundle establishment measure.

![installation2](/engineering-education/learn-how-to-set-up-linux-quagga-routing-suite/installation2.png)
### Configuration
Except if a couple of bit choices are empowered, linux-based gadgets won't uphold parcel sending in their default design. 
Utilizing the guidelines showed in the image, empower parcel sending for IPv4. The changed worth will stay in the '/and so forth/sysctl.conf' record for the remainder of time.
![configuration](/engineering-education/learn-how-to-set-up-linux-quagga-routing-suite/configuration.png)
To utilize Quagga directing programming on Linux, we should initially empower parcel sending. Quagga daemon must be arranged as it continues to work on Ubuntu.
```
ripngd.conf
ospfd.conf
bgpd.conf
ripd.conf
zebra.conf
vytsh.conf
isis.conf
babelid.conf
```
This is a rundown of arrangement documents that the client might make or replicate from the model's catalog to the quagga setup records registry on the client's framework.
![config2](/engineering-education/learn-how-to-set-up-linux-quagga-routing-suite/config2.png)
The accompanying picture tells the best way to duplicate records inside the `/etc/quagga/` registry.
![duplicateRecords](/engineering-education/learn-how-to-set-up-linux-quagga-routing-suite/duplicateRecords.png)
After putting the examples in the `/etc/quagga/` index, rename the documents in the envelope.
```
root@debian:/etc/quagga$sudo mv ripngd.conf.sample ripngd
root@debian:/etc/quagga$sudo mv ospfd.conf.sample ospfd.conf
root@debian:/etc/quagga$sudo mv bgpd.conf.sample bgpd.conf
root@debian:/etc/quagga$sudo mv ripd.conf.sample ripd.conf
root@debian:/etc/quagga$sudo mv zebra.conf.sample zebra.conf
root@debian:/etc/quagga$sudo mv vtysh.conf.sample vtysh.conf
root@debian:/etc/quagga$sudo mv isisd.conf.sample isisd.conf
root@debian:/etc/quagga$sudo mv babeld.conf.sample babeld.conf
```
![rename](/engineering-education/learn-how-to-set-up-linux-quagga-routing-suite/rename.png)
Daemons running as quagga approach documents as Quagga, which permits them to adjust record possession and consents. Ubuntu makes the client quagga when putting in new bundles.
![daemons](/engineering-education/learn-how-to-set-up-linux-quagga-routing-suite/daemons.png)
To change the proprietor and authorizations, run the accompanying orders in the/and so on/quagga envelope.
```
sudo chown quagga:quagga/var/log/quagga
```
![user-group](/engineering-education/learn-how-to-set-up-linux-quagga-routing-suite/user-group.png)
The records as of now have the consent "640" set. 
Finally, we should start or stop explicit Quagga daemons. The Zebra daemon is a fundamental piece of the controlling suite, and in light of everything, it ought to be engaged in the, etc/quagga/daemons arrangement record. There could be no other show daemons assigned in the record for this article. 
The going with picture shows the daemons' record's default settings. The default game plan report cripples every coordinating daemon.
![daemonsFile](/engineering-education/learn-how-to-set-up-linux-quagga-routing-suite/daemonsFile.png)
The following is an illustration of an arrangement record that has OSPF and RIP empowered.
![daemonsFile2](/engineering-education/learn-how-to-set-up-linux-quagga-routing-suite/dF2.png)
The Quagga suite's daemons will use the TCP show and tune in on ports 2600 to 2800.
```
root@debian:/etc/quagga $cat /etc/services | grep zebra

ripd              2602/tcp    # ripd vty 
ospfd             2604/tcp    # ospfd vty
bgpd              2605/tcp    # bgpd vty 
isisd             2608/tcp    # isisd vty 
zebra             2601/tcp    # zebra vty
```
![services](/engineering-education/learn-how-to-set-up-linux-quagga-routing-suite/services.png)
Utilize the accompanying order to dispatch the Quagga steering suite.
```
$sudo /etc/init.d/quagga restart
```
![quaggaStarting](/engineering-education/learn-how-to-set-up-linux-quagga-routing-suite/quaggaStarting.png)
We may make sure that daemons are working viably by using the netstat tool.
```
netstat -nlptu | grep 260
```
![netstat](/engineering-education/learn-how-to-set-up-linux-quagga-routing-suite/netstat.png)
The accompanying strategies are accessible for arranging Quagga directing.
```
vtysh

telnet (telnet 127.0.0.1 ospfd/ripd/bgpd/zebra)
```
In order to manage all of your daemons at once, use `vtysh`. The accompanying order will dispatch a virtual shell for arranging Quagga.
```
$ sudo vtysh
```
![vtysh](/engineering-education/learn-how-to-set-up-linux-quagga-routing-suite/vtysh.png)
There are many ways to organise files using vtysh.
![available-Daemons](/engineering-education/learn-how-to-set-up-linux-quagga-routing-suite/available-daemons-in-vtysh.png)
The subsequent illustrations explain where to organize daemons using the telnet protocol.
#### Zebra daemon
```
#telnet localhost 2601
```
![zebra-telnet](/engineering-education/learn-how-to-set-up-linux-quagga-routing-suite/zebra-telnet.png)
### Ospfd daemon
```
# telnet localhost 2604
```
![telnet-ospfd](/engineering-education/learn-how-to-set-up-linux-quagga-routing-suite/telnet-ospfd.png)
#### Ripd daemon
```
# telnet localhost 2602
```
![ripd](/engineering-education/learn-how-to-set-up-linux-quagga-routing-suite/ripd.png)

### Conclusion
Quagga steering suite is generally utilized on the Linux stage to perform dynamic directing. In this article, we learned the establishment, design, and utilization of the Quagga steering suite. It upholds various ways of arranging running conventions like Open Short Path First and Routing Information Protocol. Can utilize Quagga-based steering gadgets for little and medium endeavors.

#### Further reading
[How to set up Squirrelmail on a Linux computer](https://squirrelmail.org/docs/admin/admin-3.html)

Happy Coding!

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)
