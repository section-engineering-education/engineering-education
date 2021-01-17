## Verifying Website Domains ##

--

Verifying website domains for originality can be complicated during a time where internet is used constantly for both good and bad. By using Python 3.8.5 Shell and Windows PowerShell within a Windows environment, determining the credibility of a website domain name can be done.


This topic could interest individuals and/or groups who would like to verify domain names for its validity and credibility through coding.



At the end of this tutorial, it is possible to have a good grasp on retrieving DNS information by coding in Python Shell, skills developed or refreshed in website API commands within Windows PowerShell, and a tighter hold on identifying the complexities of domain modifications in an ever-changing technical space.



**Prerequisites**

* Windows Operating System (Version 10)
* Python 3.8.5 Shell
* Windows PowerShell
* Internet connection
* Internet browser

--

#### Let's get started with Python Shell ####

Some Python compatible packages that will be used are 'socket', 'dns', and 'whois'.
Ensuring that packages are installed and functional using the command prompt window and the designated 'PATH' or 'ROOT' from folder-to-folder are accurate will be slightly time efficient.


In socket, the opportunity to find the IP address associated with the domain name can be processed.

![socket-error](/engineering-education/verifying-website-domains/socket1.jpg)


Because the domain name is removed due to unoriginality, error messages are displayed.


Shown below is a functional and valid output of the code since the domain is active and not removed.

![socket-valid](/engineering-education/verifying-website-domains/socket2.jpg)


--

In DNS, a plentiful array of resource information is displayed given that the website domain is still active.

![dns-ptr](/engineering-education/verifying-website-domains/dns-ptr.jpg)

The PTR value determines if the domain can resolve.

Some hosting websites may hold several domain names within its capacity regardless of intentions which may not resolve the domain.

Below, there are further options within the DNS function revealing additional information about the domain such as Nameservers and DNS parking which are a few critical elements in establishing website internet connection.

![dns-txt-mx](/engineering-education/verifying-website-domains/dns-ptr.jpg)

![dns-ns](/engineering-education/verifying-website-domains/dns-ptr.jpg)

--

Who is, a continuous recording registry for websites, is one of several databases that compiles and lists website information.

![whois-invalid](/engineering-education/verifying-website-domains/whois-invalid.jpg)

Null values would be an indication that modifications were made during the development of the website.

Most original websites will openly disclose this information as exemplified below.

![whois-valid](/engineering-education/verifying-website-domains/whois-valid.jpg)


--

#### Next up, Windows PowerShell ####

_Make sure to right-click and select the 'Run as Administrator' option before running PowerShell._

Windows PowerShell is structured differently. There are subcategorized features to select specific content in a website language. It is essential to select and include '.Content' at the end of the command.

![power-curl](/engineering-education/verifying-website-domains/power-curl.jpg)

As shown below, brackets are used to call a website with an API to sift through permissible website layers and should be present and must begin with 'curl'.

Scroll down to the 'primary' layer to display all associated domains with the IP address.

![power-curl-domains](/engineering-education/verifying-website-domains/power-curl-domains.jpg)

---

When confronted with a domain that may appear authentic and genuine, it might be best to do some coding research first.

Domains and websites in general have components that identify itself to initiate internet presence.

**Here are a few website components:**
* Nameservers for DNS parking
* Extension purchases are readily available in a wide variety of selections
* Website hosting providers can offer e-mail addresses for any purpose with the website domain

These components can be combined and modified to replicate an already existing website domain or create a completely unique website domain.


#### Special consistency factors to look for:
* Date-time stamp values
* Null or missing values
* Extension creation date and purchase
* IP address
* Associated domains with IP address

---
Try the tutorial out next time a suspicious website domain crosses paths while using the internet, the results can be fascinating.


--


Have any feedback or comments about what was written on website domains and its possible authenticity?


**Feel free to contact me**

GitHub: @pkalynan

Twitter: @pkalynan
