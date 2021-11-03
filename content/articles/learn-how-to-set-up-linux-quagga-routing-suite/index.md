---
layout: engineering-education
status: publish
published: true
url: /learn-how-to-set-up-linux-quagga-routing-suite/
title: Learn how to set up Linux's Quagga Routing Suite
description: In this tutorial, we will exhibit how to introduce the Quagga steering suite on Ubuntu working framework through an order line interface.
author: bernard-mburu
date: 2021-11-03T00:00:00-12:30
topics: [Linux]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/learn-how-to-set-up-linux-quagga-routing-suite/hero.png
    alt: Learn how to set up Linux's Quagga Routing Suite Hero Image
---

Quagga is a popular open source project for providing routing services on the Linux platform. It is made up of several components for various dynamic protocols.
<!--more-->
Such as, Open Shortest Path First (OSPF), Routing Information Protocol (RIP), Border Gateway Protocol (BGP), Intermediate System to Intermediate System (IS-IS), and Multiprotocol Label Switching (MPLS). It partially uses the same virtual terminal or CLI (vty/vtysh) for protocol configuration as CISCO/JUNIPER. We will install Quagga routing suite on Ubuntu in this article.

### Table of contents
- [Introduction](#introduction)
- [Installation](#installation)
- [Configuration](#configuration)
  - [Zebra daemon](#zebra-daemon)
  - [Ospfd daemon](#ospfd-daemon)
  - [Ripd daemon](#ripd-daemon)
- [Conclusion](#conclusion)
  - [Further reading](#further-reading)

### Installation
Quagga can be installed from source code, but we'll use the `deb/binary` package in this article. To check the Qugaaga package's dependencies, run the command below:

```
#apt-cache depends quagga
```

- Output of the above command is shown below:

![installation](/engineering-education/learn-how-to-set-up-linux-quagga-routing-suite/installation.png "installation")

- Run following command to install Qugaaga routing software:

```
#apt-get install quagga
```

Quagga package installation is shown in following figure:

![installation2](/engineering-education/learn-how-to-set-up-linux-quagga-routing-suite/installation2.png)

### Configuration
Unless a few kernel settings are enabled, linux-based devices do not support packet forwarding by default. Using the commands indicated in the figure below enable packet forwarding for IPv4. Setting will be permanently saved in `/etc/sysctl.conf` file.

```
$echo "net.ipv4.conf.all.forwarding=1" | sudo tee -a /etc/sysctl.conf
$echo "net.ipv4.conf.default.forwarding=1" | sudo tee -a /etc/sysctl.conf
$sudo sysctl -p
```

![configuration](/engineering-education/learn-how-to-set-up-linux-quagga-routing-suite/configuration.png)

We'll now configure Quagga routing software to run on Linux after enabling packet forward. To run the Quagga daemon on Ubuntu, you'll need to do the following:

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

A user can create these configuration files or copy these sample files from `/usr/share/doc/quagga/examples/` path to `/etc/quagga/*.conf` path.

![config2](/engineering-education/learn-how-to-set-up-linux-quagga-routing-suite/config2.png)

Copying sample files under `/etc/quagga/` path is shown in following figure.

![duplicateRecords](/engineering-education/learn-how-to-set-up-linux-quagga-routing-suite/duplicateRecords.png)

Rename samples files after copying in `/etc/quagga` directory.

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

Because the Quagga daemon runs as quagga, it changes the ownership and permissions of configuration files. During package installation, Ubuntu creates the user quagga.

![daemons](/engineering-education/learn-how-to-set-up-linux-quagga-routing-suite/daemons.png)

Run the following command under `/etc/quagga` folder to change owner ship and permission:

```
$sudo chown quagga:quagga *
```

![user-group](/engineering-education/learn-how-to-set-up-linux-quagga-routing-suite/user-group.png)

The permission "640" has already been assigned to the files. Finally, we must enable or disable Quagga's many daemons. Because the Zebra daemon is an essential component of the routing suite, it must be enabled in the /etc/quagga/daemons file. Only OSPF and RIP dynamic protocol daemons are enabled in the file in this post.

The following snapshot depicts the default setting of the daemons file. The default configuration file disables all routing daemons.

![daemonsFile](/engineering-education/learn-how-to-set-up-linux-quagga-routing-suite/daemonsFile.png)

The Configuration file with OSPF and RIP enabled is shown below:

![daemonsFile2](/engineering-education/learn-how-to-set-up-linux-quagga-routing-suite/dF2.png)

Different daemons of Quagga suite will run on TCP protocol and listening ports will be from 2600-2800.

```
@root-debian:/etc/quagga$ cat /etc/services | grep zebra

zebrasrv       2600/tcp      # zebra service
zebra          2601/tcp      # zebra vty
ripd           2602/tcp      # ripd vty (zebra)
ripngd         2603/tcp      # ripngd vty (zebra)
ospfd          2604/tcp      # ospfd vty (zebra)
bgpd           2605/tcp      # bgpd vty (zebra)
ospf6d         2606/tcp      # ospf6d vty (zebra)
isisd          2608/tcp      # ISISd vty (zebra)
```

![services](/engineering-education/learn-how-to-set-up-linux-quagga-routing-suite/services.png)

Start Quagga routing suite using following command:

```
$sudo /etc/init.d/quagga restart
```

![quaggaStarting](/engineering-education/learn-how-to-set-up-linux-quagga-routing-suite/quaggaStarting.png)

Using netstat command, we can confirm successful running of daemons.

```
$sudo netstat -antp | grep 260
```

![netstat](/engineering-education/learn-how-to-set-up-linux-quagga-routing-suite/netstat.png)

Quagga routing can be configured using following ways:

```
vtysh

telnet (telnet 127.0.0.1 ospfd/ripd/bgpd/zebra)
```

vtysh provides a central location for all daemon configuration. To start a virtual shell (vtysh) for Quagga configuration, type the following command in a terminal:

```
$ sudo vtysh
```

![vtysh](/engineering-education/learn-how-to-set-up-linux-quagga-routing-suite/vtysh.png)

Zebra, ospfd and ripd can be configured using vtysh.

![available-Daemons](/engineering-education/learn-how-to-set-up-linux-quagga-routing-suite/available-daemons-in-vtysh.png)

Daemons configuration using telnet command is shown in following figures.

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
The Quagga routing suite is primarily used to execute dynamic routing on the Linux platform. We learnt how to install, configure, and use the Quagga routing suite in this tutorial.

The Quagga routing allows you to configure routing protocols like OSPF and RIP in a variety of ways. Small and medium businesses can benefit from Quagga-based routing devices (SME).

#### Further reading
- [How to set up Squirrelmail on a Linux computer](https://squirrelmail.org/docs/admin/admin-3.html)

Happy Coding!

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)