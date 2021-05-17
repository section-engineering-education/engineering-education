---
layout: engineering-education
status: publish
published: true
url: /internet-inconsistencies-with-r-programming/
title: Internet Inconsistencies with R-Programming
description: This article will be an introduction to detecting inconsistences in the internet using R-programming. We will be using Kali Linux and R to detect the internet inconsistencies.
author: priya-kalyanakrishnan
date: 2021-03-26T00:00:00-11:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/internet-inconsistencies-with-r-programming/hero.jpg
    alt: Internet Inconsistencies with R-Programming Image
---
An Internet Protocol (IP) address is one of several Domain Name System (DNS) components. Frequently, IP sequences are displayed in IPv4 and IPv6 formats. Internet directories contain further information about IP addresses. Approximate geological location, Internet Service Provider (ISP), Virtual Private Network (VPN), and Autonomous System Numbers (ASN) are a few examples of data that can be found. 
<!--more-->
If not redacted, these pieces of information can merge into one collective research platform. This tutorial can help individuals and groups who are interested in detecting internet inconsistencies.  

### Table of contents
- [Prerequisites](#prerequisites)
- [Goals](#goals)
- [Introduction](#introduction)
- [Linux fundamentals](#linux-fundamentals)  
- [R-Programming](#r-programming)  
- [Basic statistics](#basic-statistics)  
- [Linux reverse IP lookup](#linux-reverse-ip-lookup)  
- [Takeaways](#takeaways)

### Prerequisites
As a prerequisite, the reader must have the following:
- A device with unlimited functional capabilities.
- Installed a functional Linux emulator (Kali Linux was chosen).
- R-Programming software.  
- Internet access.
- DNS mechanics and knowledge.
- R-Programming library installations and documentation.  
- Some arithmetic experience.  

### Goals
One goal of this tutorial is to acknowledge internet gaps that may impact unaware individuals and groups. An additional goal is to provide probable insights to internet complexities.  

It is also important for readers to understand terms and content within scope.  

### Introduction
In this tutorial, R-Programming is used to statistically analyze data from an IPv4 address. The purpose is to gain understanding about accuracies and inaccuracies from internet activities.

As a starting point, `45.88.197.212` will be the defined IP address throughout this tutorial.  

Let's get started.  

### Linux fundamentals
Open any Linux Shell.

For those who prefer using Linux without `ROOT`.

```bash
sudo apt update
```

As a reminder, users with permission can be in `ROOT` mode by entering the following line:

```bash
sudo -i
```

For those who prefer using Linux with `ROOT`.

```bash
apt update
```

Open a new Kali-Linux window and enter in the following:

```bash
kex
```  

A window should pop-up something like this:

![kex](/engineering-education/internet-inconsistencies-with-r-programming/kex.jpg)  

*Screen capture*  

### R-Programming
Enter in the following line to install a Linux version of the R-Programming application:

```bash
sudo apt-get install r-base r-base-dev
```  

The following screens may appear:  

![kexry](/engineering-education/internet-inconsistencies-with-r-programming/kexry.jpg)  

*Screen capture*  

![kexr](/engineering-education/internet-inconsistencies-with-r-programming/kexr.jpg)  

*Screen capture*  

Alternatively, using an R-programming application can be equally effective.  

![r](/engineering-education/internet-inconsistencies-with-r-programming/r.jpg)  

*Screen capture of RStudio*  

If not installed, the libraries used in this tutorial are listed below:

```bash
install.packages(c("Rwhois", dependencies = TRUE))  
install.packagec(c("iptools", dependencies = TRUE))   
install.packages(c("rIP", dependencies = TRUE))  
install.packages(c("rattle", dependencies = TRUE))  
```

Information about the IP registrar responsible can be found using this library below:

```bash
library(Rwhois)
```

**Partial Output:**

index | key | val
--- | --- | ---
1 | NetRange | 45.80.0.0 to 45.95.255.255
2 | CIDR | 45.80.0.0/12
3 | NetName | RIPE
4 | NetHandle | NET-45-80-0-0-1
5 | Parent | NET45 (NET-45-0-0-0-0)
6 | NetType | Early Registrations, Transferred to RIPE NCC

A server coordinates with the domain extension (example, ".us"). If a server name is included, DNS parking name servers can be displayed.

The following code shows the name servers:

```bash
("asianausa.us", server = "whois.nic.us")
```

**Partial Output:**

key | val
--- | ---
Name server | ns1.dns-parking.com
Name server | ns2.dns-parking.com  

The code shown below can confirm if this IP is valid or not:

```bash
library(iptools)
iptools::is_valid("45.88.197.212")
```

**Output:**

```bash
[1] TRUE
```

To check if the IP is using a DNS proxy or not, we will have to use the following command:

```bash
library(rIP)
proxycheck("45.88.197.212", api_key = proxycheck_api_key())
```  

Displaying an IP address without a proxy will appear as shown below:

**Output:**

```bash
[1] "no"
```  

An IP address can be categorized under multiple geological regions. The next step will showcase basic statistics that can be derived from an IPv4 address.  

### Basic statistics
Geological location of an IP address can resemble many statistical data models. The probability of determining the correct geological location can be tough, as various DNS factors are considered.

For example, the IP address `45.88.197.212` overlaps with Lithuania, Germany, Cyprus, Netherlands, and Amsterdam.  

Factors can include:
- DNS variables found previously in this tutorial.
- Directories.

A few helpful directories are listed in the table below:  

  Directory Name | Information
  --- | ---
  RIPE | Réseaux IP Européens (European IP Networks) serves Europe.
  NIC | Server directory for extensions. 
  ARIN | American Registry for Internet Numbers serves North America and portions of the Caribbean.
  IANA | Internet Assigned Numbers Authority provides overall directory and registrar information.
  CIRA | Canadian Internet Registration Authority serves Canada.

- Privacy redactions.

The country classified with this IP address is complex. Hostinger International Limited (AS47583) is the ASN hosting website responsible for IP addresses between `45.88.197.0` to `45.88.197.255`.

With reverse IP engineering being done on `45.88.197.212`, we can find five possible geological locations:
- Lithuania (Li)
- Cyprus (Cyp)
- Germany (De)
- Netherlands (Nl)
- Amsterdam (Am)  

`Rattle` can generate data models. A decision tree model can provide a logical breakdown. Shown below, is a manually made IP address data frame:

![dataframe](/engineering-education/internet-inconsistencies-with-r-programming/mainlocationsforasn47583.jpg)  

Typically, a decision tree selects the highest possible number as the optimal choice.

In this scenario, the countries categorized as less optimal are analyzed. `Amsterdam`, `Netherlands`, and `Cyprus` were shown as the top three choices. `Lithuania` and `Germany` seemed to be less optimal.

![decisiontree](/engineering-education/internet-inconsistencies-with-r-programming/rplot.jpeg)  

*Screen capture*  

It is possible to evaluate variable importance from a random forest model. Variable importance is shown in the image below:

![variableimportance](/engineering-education/internet-inconsistencies-with-r-programming/variableimportance.jpg)  

*Screen capture*  

With the highest score of the five countries, `Lithuania` showed the most links to the IP address. `Germany` also showed some correlation. This statistical analysis using Gini found `Lithuania` generated higher variable importance with a value of `3087.48`.

### Linux reverse IP lookup
To verify validity, here is a quick code to assess:  

```bash
sudo curl http://ipinfo.io/45.88.197.212
```  

**Output:**

```bash
{
  "ip": "45.88.197.212",
  "city": "Kaunas",
  "region": "Kaunas",
  "country": "LT",
  "loc": "54.9027,23.9096",
  "org": "AS47583 Hostinger International Limited",
  "postal": "44001",
  "timezone": "Europe/Vilnius",
  "readme": "https://ipinfo.io/missingauth"
}
```  

![ipinfolinux](/engineering-education/internet-inconsistencies-with-r-programming/ipinfolinux.jpg)  

*Screen capture*

A `curl` function can list the possible domain names on an IP address. The code below uses reverse IP engineering.

```bash
sudo curl https://host.io/asianausa.us
```  

**Partial Output:**

```bash
grh-interviews.online
recruits-agility.com
careers-mfc.work
careers-massiveinsights.work
grandrivershospital.com
mindfieldconsulting.work
careers-mconsulting.work
grandrivershosp.ca
interviews-sobeys.com
interviews-massiveinsights.digital
morgeesmodcon.com
```

Did you notice the domain names listed above are companies registered with `ARIN` and `CIRA` without any connection to `RIPE`?  

Internet inconsistencies exist as European countries usually should not have ownership of an IP address with North American company domain names. 

Codes can help identify internet data as either accurate or inaccurate. A statistical coding approach can display a web of DNS relationships. Online identities can be revealed with internet directories and IP lookups.

### Takeaways
- Statistics can reveal internet inconsistencies.
- Advanced data models can provide further DNS relationships.
- Internet registrars are important to allocate IP data.

Happy coding!  

### References
- [CRAN R-Programming Library Resources](https://cran.r-project.org/)  
- [DNSlytics](https://dnslytics.com/)  
- [Host.io](https://host.io/)  
- [i.whoswho](http://i.whoswho/)  
- [IPinfo](https://ipinfo.io)  
- [RIPE directory](https://www.ripe.net)
- [Spyse](https://spyse.com/)  
- [Detecting Fraud in Online Surveys by Tracing, Scoring, and Visualizing IP Addresses](https://doi.org/10.21105/joss.01285)  
- [Whois directory](https://www.whois.com/whois)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)