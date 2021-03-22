## Internet Inconsistencies with R-Programming  
An Internet Protocol (IP) address is one of several Domain Name System (DNS) components. Frequently, IP sequences are displayed in IPv4 and IPv6 formats. Internet directories contain further information about IP addresses. Approximate geological location, Internet Service Provider (ISP), Virtual Private Network (VPN), and Autonomous System Numbers (ASN) are a few examples of data that can be found. If not redacted, these pieces of information can merge into one collective research platform.  

This tutorial can help individuals and groups who are interested in detecting internet inconsistencies.  


### Table of Contents  
- [Prerequisites](#prerequisites)  
- [Goals](#goals)    
- [Introduction](#introduction)    
- [Linux Fundamentals](#linux-fundamentals)  
- [R-Programming](#r-programming)  
- [Basic Statistics](#basic-statistics)  
- [Linux Reverse IP Lookup](#linux-reverse-ip-lookup)  
- [Takeaways](#takeaways)    

### Prerequisites 
- Device with unlimited functional capabilities
- Installed a functional Linux emulator (Kali Linux was chosen)
- R-Programming software  
- Internet access
- DNS mechanics
- R-Programming library installations and documentation  
- Some arithmetic experience  

### Goals  
One goal is to acknowledge internet gaps that may impact unaware individuals and groups. An additional goal is to provide probable insights to internet complexities.  

It is also important for readers to understand terms and content within scope.  

### Introduction  
In this tutorial, R-Programming is used to statistically analyze data from an IPv4 address. The purpose is to gain understanding about accuracies and inaccuracies from internet activities. As a starting point, 45.88.197.212 is the defined IP address throughout this tutorial.  

Let's start.  

### Linux Fundamentals  
Open any Linux Shell.  

For those who prefer using Linux without `ROOT`:  
```Sh
sudo apt update
```   

As a reminder, users with permission can be in `ROOT` mode by entering the following line:  
```Sh
sudo -i
```

For those who prefer using Linux with `ROOT`:  
```Sh
apt update
```   

Open a new Kali-Linux window and enter in the following:  
``` Sh
kex
```  

A window should pop-up.    
![kex](/engineering-education/internet-inconsistencies-with-r-programming/kex.jpg)  
*Screen capture*  

### R-Programming  
Enter in the following code to install a Linux version of the R-Programming application.  
```Sh
sudo apt-get install r-base r-base-dev
```  

The following screens may appear.  
![kexry](/engineering-education/internet-inconsistencies-with-r-programming/kexry.jpg)  
*Screen capture*  

![kexr](/engineering-education/internet-inconsistencies-with-r-programming/kexr.jpg)  
*Screen capture*  

Alternatively, using an R-programming application can be equally effective.  
![r](/engineering-education/internet-inconsistencies-with-r-programming/r.jpg)  
*Screen capture of RStudio*  

If not installed, the libraries used in this tutorial are listed below.  
```Sh
install.packages(c("Rwhois", dependencies = TRUE))  
install.packagec(c("iptools", dependencies = TRUE))   
install.packages(c("rIP", dependencies = TRUE))  
install.packages(c("rattle", dependencies = TRUE))  
```  

Sample libraries with possible results are shown below.  


Information about the IP registrar responsible can be found.  
The library below can gather this data. 
```Sh
library(Rwhois)
```
Partial Output:  
index | key | val
--- | --- | ---
1 | NetRange | 45.80.0.0 to 45.95.255.255
2 | CIDR | 45.80.0.0/12
3 | NetName | RIPE
4 | NetHandle | NET-45-80-0-0-1
5 | Parent | NET45 (NET-45-0-0-0-0)
6 | NetType | Early Registrations, Transferred to RIPE NCC


A server coordinates with the domain extension (example, ".us").  
If a server name is included, DNS parking name servers can be displayed.  
The following code can show those name servers.  
```Sh
("asianausa.us", server = "whois.nic.us")
```    
Partial Output:  
key | val
--- | ---
Name server | ns1.dns-parking.com
Name server | ns2.dns-parking.com  


The code shown below can confirm if this IP is valid or not.  
```Sh
library(iptools)
iptools::is_valid("45.88.197.212")
```  
Output:  
```Sh
[1] TRUE
```  

Checking if the IP is using a DNS proxy is possible. Enter in the code shown below to figure that out. 
```Sh 
library(rIP)
proxycheck("45.88.197.212", api_key = proxycheck_api_key())
```  

Displaying an IP address without a proxy will appear in this manner.  
Output:  
```Sh
[1] "no"
```  

An IP address can be categorized under multiple geological regions. The next step will showcase basic statistics that can be derived from an IPv4 address.  


### Basic Statistics  

Geological location of an IP address can resemble many statistical data models. The probability of determining the correct geological location can be tough as various DNS factors are considered. For example, 45.88.197.212 overlaps with Lithuania, Germany, Cyprus, Netherlands, and Amsterdam.  

Factors can include:  
- DNS variables found previously in this tutorial
- Directories   
A few helpful directories are listed in the table below.  

Directory Name | Information
 --- | ---
 RIPE | Réseaux IP Européens (European IP Networks) serves Europe.
 NIC | Server directory for extensions. 
 ARIN | American Registry for Internet Numbers serves North America and portions of the Caribbean.
 IANA | Internet Assigned Numbers Authority.
 CIRA | Canadian Internet Registration Authority serves Canada.  
- Privacy redactions  

The country classified with this IP address is complex. Hostinger International Limited (AS47583) is the ASN hosting website responsible for IP addresses between 45.88.197.0 to 45.88.197.255. Reverse IP engineering websites with data on 45.88.197.212 has found five geological locations.  

Possiblities:
 - Lithuania (Li)
 - Cyprus (Cyp)
 - Germany (De)
 - Netherlands (Nl)
 - Amsterdam (Am)  

`Rattle` can generate data models. A decision tree model can provide a logical breakdown. Shown below, is a manually made IP address data frame.  
![dataframe](/engineering-education/internet-inconsistencies-with-r-programming/mainlocationsforasn47583.jpg)  

Typically, a decision tree selects the highest possible number as the optimal choice. In this scenario, the countries categorized as less optimal are analyzed. Amsterdam, Netherlands, and Cyprus were shown as the top three choices. Lithuania and Germany seemed to be less optimal.   
![decisiontree](/engineering-education/internet-inconsistencies-with-r-programming/rplot.jpeg)  
*Screen capture*  

It is possible to evaluate variable importance from a random forest model.  
![variableimportance](/engineering-education/internet-inconsistencies-with-r-programming/variableimportance.jpg)  
*Screen capture*  

With the highest score of the five countries, Lithuania showed the most links to the IP address. Germany also showed some correlation. This statistical analysis using Gini found Lithuania had higher variable importance with a value of 3087.48.   


### Linux Reverse IP Lookup  
To verify validity, here is a quick code to assess.  

```Sh
sudo curl http://ipinfo.io/45.88.197.212
```  

Output:  
```Sh
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

```Sh
sudo curl https://host.io/asianausa.us
```  

Partial domain name output:  
 - grh-interviews.online
 - recruits-agility.com
 - careers-mfc.work
 - careers-massiveinsights.work
 - grandrivershospital.com
 - mindfieldconsulting.work
 - careers-mconsulting.work
 - grandrivershosp.ca
 - interviews-sobeys.com
 - interviews-massiveinsights.digital
 - morgeesmodcon.com  

Did you notice the domain names listed above are companies registered with ARIN and CIRA without any connection to RIPE?  

Internet inconsistencies exist.

### Takeaways  

 - Statistics can reveal internet inconsistencies.
 - Advanced data models can provide further DNS relationships.
 - Internet registrars are important to allocate IP data.


Happy coding!  

### References  
[CRAN R-Programming Library Resources](https://cran.r-project.org/)  
[DNSlytics](https://dnslytics.com/)  
[Host.io](https://host.io/)  
[i.whoswho](http://i.whoswho/)  
[IPinfo](https://ipinfo.io)  
[RIPE directory](https://www.ripe.net)    
[Spyse](https://spyse.com/)  
Waggoner, Philip D., Ryan Kennedy, and Scott Clifford, (2019). Detecting Fraud in Online Surveys by Tracing, Scoring, and Visualizing IP Addresses. Journal of Open Source Software, 4(37), 1285, [https://doi.org/10.21105/joss.01285](https://doi.org/10.21105/joss.01285)  
[Whois directory](https://www.whois.com/whois)  
