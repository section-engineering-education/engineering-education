## Verifying Website Domains ##

--

Verifying website domains for originality can be complicated during a time where internet is used constantly for both good and bad. By using a Python Shell and Windows PowerShell within a Windows environment, determining the credibility of a website domain name can be done.


This topic could interest individuals and/or groups who would like to verify domain names for its validity and credibility through coding.



At the end of this tutorial, it is possible to have a good grasp on retrieving DNS information by coding in Python Shell, skills developed or refreshed in website API commands within Windows PowerShell, and a tighter hold on identifying the complexities of domain modifications in an ever-changing technical space.



**Prerequisites**

_Software and Hardware_
* Windows Operating System (Version 10)
* Python Shell (Any version that is compatible with the packages and functions mentioned. _3.8.5 is used_)
* Windows PowerShell
* Internet connection
* Internet browser

_Knowledge_
* Python Programming language
* Package installations
* Working with 'PATH' or directories
* Run PowerShell as Administrator
* Command Prompts and its structures
* Elements of Websites (terms include but not limited to: layers, domains, and hosting)
* Webpage scripting (HTML or JavaScript)

--

#### Let's get started with Python Shell ####

Some Python compatible packages that will be used are 'socket', 'dns', and 'whois'.
Ensuring that packages are installed and functional using the command prompt window and the designated 'PATH' or 'ROOT' from folder-to-folder are accurate will be slightly time efficient.


In socket, the opportunity to find the IP address associated with the domain name can be processed.

The following lines of codes are processed in socket.

Input:
```python
import socket
domainName = 'interviews-massiveinsights.digital'
ip= socket.gethostbyname(domainName)
print ("IP:", ip)
```

Output:
```python
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
socket.gaierror: [Errno 11002] getaddrinfo failed
>>> print ("IP:", ip)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'ip' is not defined
```

_Screenshot_:

![socket-error](/engineering-education/verifying-website-domains/socket1.jpg)


Because the domain name was removed due to unoriginality, error messages are displayed.


Shown below is a functional and valid output of the code since the domain is active and not removed.

Input:

```python
import socket
domainName = 'massiveinsights.com'
ip = socket.gethostbyname(domainName)
print ("IP:", ip)
```

Output:

```python
IP: 69.195.108.249
```


_Screenshot_:

![socket-valid](/engineering-education/verifying-website-domains/socket2.jpg)

--

In DNS, a plentiful array of resource information is displayed given that the website domain is still active.


This is a good opportunity to use basic Python coding skills in for-loops held within a variable to iterate and display all results.

Input:

```python
import dns
import dns.resolver
ip = "69.195.108.249"
myResolver = dns.resolver.Resolver()
req = '.'.join(reversed(ip.split("."))) + ".in-addr.arpa"
myAnswers = myResolver.resolve(req, "PTR")
ans = [item for item in myAnswers]
ans
```

Output:

```python
[<DNS IN PTR rdata: 69-195-108-249.unifiedlayer.com.>]
```

_Screenshot_:

![dns-ptr](/engineering-education/verifying-website-domains/dns-ptr.jpg)

The PTR value determines if the domain can resolve.

Some hosting websites may hold several domain names within its capacity regardless of intentions which may not resolve the domain.

Below, there are further options within the DNS function revealing additional information about the domain such as Nameservers and DNS parking which are a few critical elements in establishing website internet connection.

Instead of using the IP address, use the domain name in the myAnswers variable and replace "PTR" with "NS", "TXT", "MX".

"NS" for Nameserver information Input:

```python
ip = "69.195.108.249"
myResolver = dns.resolver.Resolver()
myAnswers = myResolver.resolve('massiveinsights.com', "NS")
ans = [item for item in myAnswers]
ans
```

Output:

```python
[<DNS IN NS rdata: ns3.bdm.microsoftonline.com.>, <DNS IN NS rdata: ns4.bdm.microsoftonline.com.>, <DNS IN NS rdata: ns1.bdm.microsoftonline.com.>, <DNS IN NS rdata: ns2.bdm.microsoftonline.com.>]
```

"TXT" for additional intenet properties Input:

```python
ip = "69.195.108.249"
myResolver = dns.resolver.Resolver()
myAnswers = myResolver.resolve('massiveinsights.com', "TXT")
ans = [item for item in myAnswers]
ans
```

Output:

```python
[<DNS IN TXT rdata: "google-site-verification=34Jb2Tx28xLGRll4nwbUOq6dyu-P_VOD3OcO9qqDTKo">, <DNS IN TXT rdata: "mscid=w87OZ8XPKbefuE8BURYoqwPFO1CdSFjEo5RIqw7JWEL/fy7vVSsP/Q6Slgu5MYk2ihGpG6SHuF70r+a7X9J8cw==">, <DNS IN TXT rdata: "v=spf1 ip4:72.139.55.134 include:spf.protection.outlook.com -all">]
```

"MX" for digital mailing information Input:

```python
ip = "69.195.108.249"
myResolver = dns.resolver.Resolver()
myAnswers = myResolver.resolve('massiveinsights.com', "MX")
ans = [item for item in myAnswers]
ans
```

Output:

```python
[<DNS IN MX rdata: 0 massiveinsights-com.mail.protection.outlook.com.>]
```

_Screenshots:_


![dns-txt-mx](/engineering-education/verifying-website-domains/dns-ptr.jpg)

![dns-ns](/engineering-education/verifying-website-domains/dns-ptr.jpg)

--

Who is, a continuous recording registry for websites, is one of several databases that compiles and lists website information.

Input:

```python
import whois
whois_info = whois.whois("interviews-massiveinsights.works")
print("Domain registrar:", whois_info.registrar)
print("WHOIS server:", whois_info.whois_server)
print("Domain creation date:", whois_info.creation_date)
print("Expiration date:", whois_info.expiration_date)
```
Output:

```python
Domain registrar: None
WHOIS server: None
Domain creation date: None
Expiration date: None
```

_Screenshot_:


![whois-invalid](/engineering-education/verifying-website-domains/whois-invalid.jpg)


Null values would be an indication that modifications were made during the development of the website.

Most original websites will openly disclose this information as exemplified below.


Input:

```python
import whois
whois_info = whois.whois("massiveinsights.com")
print("Domain registrar:", whois_info.registrar)
print("WHOIS server:", whois_info.whois_server)
print("Domain creation date:", whois_info.creation_date)
print("Expiration date:", whois_info.expiration_date)
```
Output:

```python
Domain registrar: GoDaddy.com, LLC
WHOIS server: whois.godaddy.com
Domain creation date: 2012-06-04 23:22:58
Expiration date: 2021-06-04 23:22:58
```

_Screenshot_:


![whois-valid](/engineering-education/verifying-website-domains/whois-valid.jpg)


--

#### Next up, Windows PowerShell ####

_Make sure to right-click and select the 'Run as Administrator' option before running PowerShell._

Windows PowerShell is structured differently. There are subcategorized features to select specific content in a website language. It is essential to select and include '.Content' at the end of the command.

As shown below, brackets are used to call a website with an API to sift through permissible website layers and must begin with 'curl'.

Input:

```PowerShell
(curl host.io/careers.massiveinsights.works).Content
```


Partial Output:

```PowerShell
<!DOCTYPE html>
<html  style="scroll-behavior: smooth;">

<head>
    <title>careers-massiveinsights.works (Default page) - host.io</title>
    <meta charset="utf-8">
    <meta name="google" value="notranslate">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no">
    <meta name="description" content="careers-massiveinsights.works (hosted on hostinger.com) details, including IP, backlinks, redirect information, and reverse IP shared hosting data">
```

_Screenshot_:


![power-curl](/engineering-education/verifying-website-domains/power-curl.jpg)



Scroll down to the 'text-primary' class layer to display all associated domains with the IP address.

Partial Output:

```PowerShell
<a href="/ip/45.88.197.212" class="text-primary">Show All &rarr;</a>

                        </div>
                    </div>
                    <div class="mt-2 sm:mt-0">
                        <a class="btn btn-secondary-hollow" href="/docs#apidomainsfieldvalue">View API &rarr;</a>
                    </div>
                </div>
                <ul class="text-sm flex flex-wrap">

                        <li class="sm:w-1/3 w-1/2 border-b border-r px-6 py-4 truncate">
                            <a href="/careers-target.com" class="border-b border-gray-400" rel="nofollow">careers-target.com</a>
                        </li>

                        <li class="sm:w-1/3 w-1/2 border-b border-r px-6 py-4 truncate">
                            <a href="/careers-villagemd.com" class="border-b border-gray-400" rel="nofollow">careers-villagemd.com</a>
                        </li>

                        <li class="sm:w-1/3 w-1/2 border-b border-r px-6 py-4 truncate">
                            <a href="/interviews-villagemedical.com" class="border-b border-gray-400" rel="nofollow">interviews-villagemedical.com</a>
                        </li>

                        <li class="sm:w-1/3 w-1/2 border-b border-r px-6 py-4 truncate">
                            <a href="/interviews-hd-supply.online" class="border-b border-gray-400" rel="nofollow">interviews-hd-supply.online</a>
                        </li>

                        <li class="sm:w-1/3 w-1/2 border-b border-r px-6 py-4 truncate">
                            <a href="/hdsupply.us" class="border-b border-gray-400" rel="nofollow">hdsupply.us</a>
                        </li>

                        <li class="sm:w-1/3 w-1/2 border-b border-r px-6 py-4 truncate">
                            <a href="/medicalvillage.us" class="border-b border-gray-400" rel="nofollow">medicalvillage.us</a>
                        </li>

                        <li class="sm:w-1/3 w-1/2 border-b border-r px-6 py-4 truncate">
                            <a href="/careers-massiveinsights.works" class="border-b border-gray-400" rel="nofollow">careers-massiveinsights.works</a>
                        </li>

                        <li class="sm:w-1/3 w-1/2 border-b border-r px-6 py-4 truncate">
                            <a href="/morgeesmodcon.com" class="border-b border-gray-400" rel="nofollow">morgeesmodcon.com</a>
                        </li>

                        <li class="sm:w-1/3 w-1/2 border-b border-r px-6 py-4 truncate">
                            <a href="/asianausa.us" class="border-b border-gray-400" rel="nofollow">asianausa.us</a>
                        </li>

                        <li class="sm:w-1/3 w-1/2 border-b border-r px-6 py-4 truncate">
                            <a href="/interviews-massiveinsights.digital" class="border-b border-gray-400" rel="nofollow">interviews-massiveinsights.digital</a>
                        </li>

                        <li class="sm:w-1/3 w-1/2 border-b border-r px-6 py-4 truncate">
                            <a href="/sobeyscareer.com" class="border-b border-gray-400" rel="nofollow">sobeyscareer.com</a>
                        </li>

                        <li class="sm:w-1/3 w-1/2 border-b border-r px-6 py-4 truncate">
                            <a href="/interviews-sobeys.com" class="border-b border-gray-400" rel="nofollow">interviews-sobeys.com</a>
                        </li>

                        <li class="sm:w-1/3 w-1/2 border-b border-r px-6 py-4 truncate">
                            <a href="/interviews-target.com" class="border-b border-gray-400" rel="nofollow">interviews-target.com</a>
                        </li>

                        <li class="sm:w-1/3 w-1/2 border-b border-r px-6 py-4 truncate">
                            <a href="/hdsupply-ca.com" class="border-b border-gray-400" rel="nofollow">hdsupply-ca.com</a>
                        </li>

                </ul>
            </div>
```


_Screenshot_:


![power-curl-domains](/engineering-education/verifying-website-domains/power-curl-domains.jpg)

---

When confronted with a domain that may appear authentic and genuine, it might be best to do some coding research first.

Domains and websites in general have components that identify itself to initiate internet presence.

**Here are a few website components:**
* Overall DNS records
* Extension purchases are readily available in a wide variety of selections
* Website hosting providers and its ability to offer e-mail addresses for any purpose with the website domain

These components can be combined and modified to replicate an already existing website domain or create a completely unique website domain.


#### Special consistency factors to look for:
* Date-time stamp values
* Null or missing values
* Extension creation date and purchase
* IP address
* Associated domains with IP address

---
Try the tutorial out next time a suspicious website domain crosses paths while using the internet, the results can be fascinating.

It can possibly protect individuals and/or groups from the dark web.


--


Have any feedback or comments about what was written on website domains and its possible authenticity?


**Feel free to contact me**

GitHub: @pkalynan

Twitter: @pkalynan
