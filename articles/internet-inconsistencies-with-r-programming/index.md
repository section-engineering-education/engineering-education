## Internet Inconsistencies with R-Programming  
An Internet Protocol (IP) address is one of several Domain Name System (DNS) components. Frequently, IP sequences can be displayed in two formats: IPv4 and IPv6. There are directories containing further information about an IP such as approximate geological location, Internet Service Provider (ISP), Virtual Private Network (VPN), and Autonomous System Numbers (ASN). If not redacted, these pieces of information can merge into one collective research platform.  

This tutorial can help detect internet inconsistencies.  


### Table of Contents  
- [Prerequisites](https://www.section.io/engineering-education/internet-inconsistencies-with-r-programming/#Prerequisites)  
- [Goals](https://www.section.io/engineering-education/internet-inconsistencies-with-r-programming/#Goals)    
- [Introduction](https://www.section.io/engineering-education/internet-inconsistencies-with-r-programming/#Introduction)    
- [Linux Fundamentals](https://www.section.io/engineering-education/internet-inconsistencies-with-r-programming/#Linux-Fundamentals)  
- [R-Programming](https://www.section.io/engineering-education/internet-inconsistencies-with-r-programming/#R-Programming)  
- [Basic Statistics](https://www.section.io/engineering-education/internet-inconsistencies-with-r-programming/#Basic-Statistics)  
- [Linux Reverse IP Lookup](https://www.section.io/engineering-education/internet-inconsistencies-with-r-programming/#Linux-Reverse-IP-Lookup)  
- [Closing Comments](https://www.section.io/engineering-education/internet-inconsistencies-with-r-programming/#Closing-Comments)    

### <a href="Prerequisites"></a> Prerequisites 
- Device with unlimited functional capabilities
- Functional version of Linux emulator _(Kali Linux was used)_
- Fundamental R-Programming knowledge
- Library installations
- Some arithmetic experience  

### <a href="Goals"></a>Goals  
One goal is to acknowledge internet gaps and discrepancies that may impact unaware individuals and groups. An additional goal is to provide probable insights to internet complexities.  

_It is also important for readers to understand terms and content within scope._  

### <a href="Introduction"></a>Introduction  
In this tutorial, R-Programming is used to statistically analyze data from an IPv4 address. The purpose is to gain understanding about accuracies and inaccuracies from internet activities. As a starting point, 45.88.197.212 is the defined IP address used throughout this tutorial.  

Let's start.  

### <a href="Linux-Fundamentals"></a>Linux Fundamentals  
Open any Linux Shell.  

_For those who prefer using Linux without `ROOT`:_  
```Sh
sudo apt update
```   

_As a reminder, users with permission can be in `ROOT` mode by entering the following line:_
```Sh
sudo -i
```

_For those who prefer using Linux with `ROOT`:_  
```Sh
apt update
```   

Open a new Shell window and enter in the following:  

``` Sh
kex
```  

A window should appear similar to the image below if successfully installed.    
![kex](/engineering-education/internet-inconsistencies-with-r-programming/kex.jpg)  
*Screencapture*  

### <a href="R-Programming"></a>R-Programming  
Enter in the following code to install a Linux version of the R-Programming application.  

```Sh
sudo apt-get install r-base r-base-dev
```  

The following screens may appear:  
![kexry](/engineering-education/internet-inconsistencies-with-r-programming/kexry.jpg)  
*Screencapture*  

![kexr](/engineering-education/internet-inconsistencies-with-r-programming/kexr.jpg)  
*Screencapture*  

Alternatively, using an R-programming application can be equally as effective. The image below is RStudio.  
![r](/engineering-education/internet-inconsistencies-with-r-programming/r.jpg)  
*Screencapture*  

If not installed, the list below are libraries included in this tutorial.  
```Sh
install.packages(c("Rwhois", dependencies = TRUE))  
install.packagec(c("iptools", dependencies = TRUE)  
install.packages(c("httr", dependencies = TRUE))  
install.packages(c("rIP", dependencies = TRUE))  
install.packages(c("rattle"), dependencies = TRUE)  
```

_Just as a reminder: Options can be benefial within a code to include more specifications. For example, `dependencies = TRUE`._  

Sample libraries with possible results are shown below.  


```Sh
library(Rwhois)
```  
The results below shows information of the IP registrar responsible.
Partial Output:  

index | key | val
--- | --- | ---
1 | NetRange | 45.80.0.0 - 45.95.255.255
2 | CIDR | 45.80.0.0/12
3 | NetName | RIPE
4 | NetHandle | NET-45-80-0-0-1
5 | Parent | NET45 (NET-45-0-0-0-0)
6 | NetType | Early Registrations, Transferred to RIPE NCC  


Specifying server name according to domain extension (example, ".us") can produce additional results.  
If a server name is included, name servers can be found.  
```Sh
("asianausa.us", server = "whois.nic.us")
```    
Partial Output:  
key | val
--- | ---
Name server | ns1.dns-parking.com
Name server | ns2.dns-parking.com  


`library(iptools)`  
The code shown below can confirm if this IP is valid or not.  
```Sh
iptools::is_valid("45.88.197.212")
```  
Output:  
```Sh
[1] TRUE
```  

```Sh
library(rIP)
```  
To check if the IP is using a DNS proxy, enter: 
```Sh 
proxycheck("45.88.197.212", api_key = proxycheck_api_key())
```  
The result below indicates whether or not a proxy was used.
Output:  
```Sh
[1] "no"
```  

An IP address can be categorized under multiple registered geological regions in various directories. The next step will showcase basic statistics that can be derived from an IP address.  


### <a href="Basic-Statistics"></a>Basic Statistics  

Determining geological location of an IP address can resemble many statistical data models. The probability of finding the correct geological location can be tough when it comes to meshing various DNS factors together. For example, 45.88.197.212 overlaps with Lithuania, Germany, Cyprus, Netherlands, and Amsterdam.  

Factors can include:  
- DNS variables
- Hosting
- Whois Registrars (few sample registrars)  

 Directory Name | Information
 --- | ---
 RIPE | Réseaux IP Européens (translation: "European IP Networks") serves Europe.
 NIC | A domain name lookup directory for 'extensions' of a domain name. Could become helpful when specifying servers during whois lookups.
 ARIN | American Registry for Internet Numbers serves North America and portions of the Caribbean.
 IANA |Internet Assigned Numbers Authority reiterates measures set in place for each IP address range designated for each region of the world.
 CIRA | Canadian Internet Registration Authority serves Canada.  
- Privacy redactions  


Predicting which country best matches this IP address can be complex, however, it is possible. Hostinger International Limited (AS47583) is the ASN hosting website responsible for IP addresses between 45.88.197.0 to 45.88.197.255. Reverse IP engineering websites with data on 45.88.197.212 has found five associated geological locations.  
List of countries:
 - Lithuania (Li)
 - Cyprus (Cyp)
 - Germany (De)
 - Netherlands (Nl)
 - Amsterdam (Am)  

`Rattle` can generate data models. A decision tree model can visually provide a logical breakdown. Shown below, is a manually made IP address data frame. Data can be sourced by IP registrars.  
![dataframe](/engineering-education/internet-inconsistencies-with-r-programming/mainlocationsforasn47583.jpg)  

Using `library(rattle)` and `rattle()`, a GUI type application can produce necessary visuals and numerical values.  

Typically, a decision tree selects the highest possible number as the optimal choice. In this scenario, the countries categorized as less optimal are analyzed. Amsterdam, Netherlands, and Cyprus were shown as the top three choices. Lithuania and Germany seemed to be less optimal according to `rattle`.   
![decisiontree](/engineering-education/internet-inconsistencies-with-r-programming/rplot.jpeg)  
*Screencapture*  

The random forest statistical data model can also offer benefits. It is possible to evaluate variable importance.  
![variableimportance](/engineering-education/internet-inconsistencies-with-r-programming/variableimportance.jpg)  
*Screencapture*  

With the highest score of the five countries, Lithuania seemed to have the most variable importance. Germany also showed some correlation. This statistical analysis using Gini found high variable importance in Lithuania with a value of 3087.48.   


### <a href="Linux-Reverse-IP-Lookup"></a>Linux Reverse IP Lookup  
To verify validity, here is a quick code to assess.  

```Shell
sudo curl http://ipinfo.io/45.88.197.212
```  

Output:  
```Shell
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
*Screencapture*

A `curl` function can list the possible domains on an IP address. The code below can be a potential solution to reverse IP engineering:  

```Sh
sudo curl https://host.io/
```  

Partial Output:  
 - grh-interviews.online
 - recruits-agility.com
 - careers-mfc.work
 - careers-massiveinsights.work
 - grandrivershospital.com
 - mindfieldconsulting.work
 - careers-mconsulting.work
 - grandrivershosp.ca
 - interviews-sobeys.com
 - www.mindfield-interviews.online
 - interviews-massiveinsights.digital
 - morgeesmodcon.com  

Did you notice the domain names listed above are companies registered with ARIN and CIRA without any connection to RIPE?    

### <a href="Closing-Comments"></a>Closing Comments  

 - Statistics can reveal internet inconsistencies.
 - Advanced data modells can provide further DNS relationships.
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
