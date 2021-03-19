## Internet Inconsistencies with R-Programming  
An Internet Protocol (IP) address is one of several Domain Name System (DNS) attributes. Typically, IP sequences can be displayed in two formats: IPv4 and IPv6. There are directories containing further information about an IP such as approximate geological location, longitudinal and latitudinal coordinates, Internet Service Provider (ISP), Media Access Control (MAC), Virtual Private Network (VPN) and Autonomous System Numbers (ASN). Further information can be obtained from various resources receiving continuous disclosures. If not redacted, these pieces of information can merge into one collective research platform. The sole purpose is to detect the likelihood of inconsistencies.  

In this tutorial, R-Programming is used to identify various IP addresses mostly in IPv4 format and other DNS components. The purpose is to gain understanding about accuracies and inaccuracies of instances that may occur coincidently during internet activities. The tutorial can be used on any compatible Windows, Ubuntu, Macintosh, and Google computer operating system. For this tutorial, a Windows laptop with a featured Linux emulator were both chosen based on convenience. To complement, any programming language can be chosen accordingly. R-Programming was selected because of its built-in libraries dedicated to Domain Name Systems. Extended coding can establish statistical insights. Deriving insights from research can provide the probability of accuracies and inaccuracies. For this tutorial, "45.88.197.212" will be the IP address and various pointing to this IP will be used.
#### Table of Contents
- Prerequisites
- Goals
- Introduction to Applications and Devices
- Linux Basics
- R-Programming
- Basic Statistics
- Linux Reverse IP Lookup
- Closing Comments  

#### Prerequisites
- Device with unlimited functional capabilities  
- Functional version of Linux emulator
- Fundamental R-Programming knowledge
- Library installations
- Some arithmetic experience  

#### Goals
One goal is to acknowledge internet gaps and discrepancies that may impact unaware individuals and groups. An additional goal is to provide probable insights to internet complexities.  
> It is also important for readers to understand terms and content within scope.  

#### Introduction to Applications and Devices
For this tutorial, a Windows laptop with at least 100GB in storage is used because this featured Windows Subsystem for Linux emulator will take up a considerable amounts of memory capacity.  

#### Linux Basics  
Open R-Programming with Linux emulator.  

>For those who prefer using Linux without ROOT:  
```Shell
sudo apt update
```  

As a reminder, users with permission can be in `ROOT` mode by entering the following line:
```Shell
sudo -i
```

>For those who prefer using Linux with `ROOT`:  
```Shell
apt update
```

Graphical User Interface (GUI) version of Linux seemed to handle images.

> Kali Linux was chosen to display graphics.  

Open a new Shell window and enter in the following:

``` Shell
kex
```

Another window should appear if successfully installed:  
![kex](/engineering-education/internet-inconsistencies-with-r-programming/kex.jpg)    


#### R-Programming  
Enter in the following code to install a Linux version of the R-Programming application.  

![kexr](/engineering-education/internet-inconsistencies-with-r-programming/kexr.jpg)   

```Shell
sudo apt-get install r-base r-base-dev
```  

The following screen may appear:  

![kexry](/engineering-education/internet-inconsistencies-with-r-programming/kexry.jpg)  

Alternatively, using an R-programming application can be equally as effective. The image below is RStudio.  
![r](/engineering-education/internet-inconsistencies-with-r-programming/r.jpg)  

If not installed already, the list below are libraries included in this tutorial.  

`install.packages(c("Rwhois", dependencies = TRUE))`  
`install.packagec(c("iptools", dependencies = TRUE)`  
`install.packages(c("httr", dependencies = TRUE))`  
`install.packages(c("rIP", dependencies = TRUE))`  
`install.packages(c("rattle"), dependencies = TRUE)`  

Reminder: "Options" can be benefial within the code to include more specifications. For example, `dependencies = TRUE`.  

Shown below are sample codes with possible results.  

`library(Rwhois)`  
Partial Output:
```Shell
key                                                                val
1        NetRange                            45.80.0.0 - 45.95.255.255
2            CIDR                                         45.80.0.0/12
3         NetName                                                 RIPE
4       NetHandle                                      NET-45-80-0-0-1
5          Parent                               NET45 (NET-45-0-0-0-0)
6         NetType         Early Registrations, Transferred to RIPE NCC
```  

Specifying server name according to domain extension (example, ".us") can produce additional results:  
`("asianausa.us", server = "whois.nic.us")`  

Partial Output:  
```Shell
52                 ns1.dns-parking.com
53                 ns2.dns-parking.com
54                            unsigned
55         https://www.icann.org/wicf/
```
`library(iptools)`  
Type in: `iptools::is_valid("45.88.197.212")`. to determine whether this IP is valid.

The following will appear:  
```Shell
[1] TRUE
```

`library(rIP)`  
To check if the IP is using a DNS proxy for privacy reasons, enter: `proxycheck("45.88.197.212", api_key = proxycheck_api_key())`.  

The above code can generate this result:  
```Shell
$status
[1] "ok"

$`45.88.197.212`
$`45.88.197.212`$proxy
[1] "no"
```  


An IP address can be categorized under multiple registered geological regions of various directories. The next few codes will showcase basic statistics that can be derived from an IP address.  


#### Basic Statistics  

There are a few major hosting platforms that retain rights to domains while leasing out DNS space to customers. Although a hosting website is one aspect, nameservers (an example, ns1.dns-parking.com) and other DNS attributes are also vital in the creation of a website. Determining geological location of an IP address can resemble a decision tree or a random forest. The probability of finding the correct geological location can be cumbersome when it comes to meshing various factors together. For example, the IP address "45.88.197.212" was associated with Lithuania, Germany, Cyprus, Netherlands, and Amsterdam from separate sources. The reason for this is other categories influenced the overall decision of where this IP could have originated from regardless of VPN.  
  
Factors can include:
- DNS variables
- Hosting
- Whois Registrars (few sample registrars)  

 Directory Name | Information 
 --- | ---
 RIPE | Réseaux IP Européens (translation: "European IP Networks") serves Europe 
 NIC | A domain name lookup directory for 'extensions' of a domain name. Could become helpful when specifying servers during whois lookups 
 ARIN | American Registry for Internet Numbers serves North America and portions of the Caribbean 
 IANA |Internet Assigned Numbers Authority reiterates measures set in place for each IP address range designated for each region of the world 
 CIRA | Canadian Internet Registration Authority serves Canada 
- Privacy redactions


Predicting which country best matches this IP address can be complex, however, it can be viewed through a preferred IP listings provider of one's own choice. Hostinger International Limited (AS47583) is the ASN hosting website who owns IP addresses between 45.88.197.0 to 45.88.197.255 according to the RIPE registrar. This IP address' ASN hosting website serves Europe. Other registrars such as ARIN, indicates this IP was transferred to RIPE. Now that we know that Hostinger International Limited is the ASN owner of the IP address, the next step is to predict which country within range would be most likely to own the IP address. According to various ASN databases including Spyse and DNSlytics, AS47583 associated with 45.88.197.212 have five associated countries.  

Here is the list of countries:  
 - Lithuania (Li)  
 - Cyprus (Cyp)  
 - Germany (De)  
 - Netherlands (Nl)  
 - Amsterdam (Am)  

By using `rattle`, data modelling can include either a decision tree or random forest. We can see the different possibilities that could lead to an approximate precise prediction. From a decision tree, we can include a confusion matrix to find potential possibilities. Near matches to 45.88.197.212 was found using IPinfo.io, DNSlytics and Spyse, and i.whoswho by testing a domain name within the specified IP. Shown below, is a manually made IP address data frame with data sourced from references listed at the end of this tutorial.  
![dataframe](/engineering-education/internet-inconsistencies-with-r-programming/mainlocationsforasn47583.jpg)   

Using `library(rattle)` and `rattle()`, a GUI type application would allow processing codes and images from the data frame provided efficiently. As you may know, a decision tree selects the highest number possible and treats the selected number as the optimal choice. However, in this scenario, it is the exact opposite. We will take categories with the lowest numbers and analyze them further. From the decision tree drawing generated from `rattle`, Amsterdam, Netherlands, and Cyprus were shown as the top three choices. We will discontinue processing data about them because they have been statistically chosen as the highest numbered categories. The remaining countries: Lithuania and Germany seemed to be the lowest in `rattle`. We will continue to analyze probable accuracy based on IP addresses correlates well with "45.88.197.212" from the data frame.  
![decisiontree](/engineering-education/internet-inconsistencies-with-r-programming/rplot.jpg)  

Switching over to another statistical data model, the random forest data model. We can now evaluate variable importance.  
![variableimportance](/engineering-education/internet-inconsistencies-with-r-programming/variableimportance.jpg)  
With the highest score of the five countries, Lithuania seemed to have the most variable importance. Recognizing that Germany had a close match with the selected IP address, this statistical analysis has proven that there is more proportional variable importance in Lithuania with a value of 3087.48.  

>Side note: Gini was used during the process of generating random forest results.  


#### Linux Reverse IP lookup  
To verify the validity, here is a quick code to assess.  

```Shell
sudo curl http://ipinfo.io/45.88.197.212
```   

The results are shown below.  
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

By using Host.io with any programming language or shell with a `curl` function, a list of possible domains on an IP address can be revealed. If the listed "businesses" were publicly announced as acquired or merged, this might seem legitimate. However, that would be false. Some company domains pointing to "45.88.197.212" included and not limited to Target, Sobeys, Massive Insights, 'Asianausa', Grand River Hospital, and others listed within this reverse lookup are not interrelated. Also, the CIRA who manages registered Canadian company websites should have been included. In turn, the association managing American websites should have been included for American companies. A foreign RIPE entity should not have full ownership of the IP address holding varying company webpages from North American organizations.   

#### Closing Comments  
While there is a wide range of resources to use for a variety of reasons to detect inconsistencies, accuracy and inaccuracies are still seen as interchangeable and should be understood carefully and cautiously.  
Each registrar and provider can hold significant importance in the contribution to internet identities.  

Happy coding!  

#### References
[CRAN R-Programming Library Resources](https://cran.r-project.org/)  
[DNSlytics](https://dnslytics.com/)  
[Host.io](https://host.io/)  
[IPaddress.com](https://ipaddress.com)  
[IPinfo](https://ipinfo.io)  
[i.whoswho](http://i.whoswho/)  
[Spyse](https://spyse.com/target/domain)  
[RIPE directory](https://www.ripe.net)  
[Waggoner, Philip D., Ryan Kennedy, and Scott Clifford, (2019). Detecting Fraud in Online Surveys by Tracing, Scoring, and Visualizing IP Addresses. Journal of Open Source Software, 4(37), 1285, https://doi.org/10.21105/joss.01285](https://doi.org/10.21105/joss.01285)  
[Whois directory](https://www.whois.com/whois)
