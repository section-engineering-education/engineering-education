### Understanding the LAMP Stack

![hero-image](/engineering-education/lamp-stack/hero.jpg)
Photo by [NeONBRAND](https://unsplash.com/@neonbrand?utm\_source=unsplash&amp;utm\_medium=referral&amp;utm\_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/stack?utm\_source=unsplash&amp;utm\_medium=referral&amp;utm\_content=creditCopyText)

**Solution Stacks** are a combination of software or application programs used to form a computing platform. They are intended to provide web applications the appropriate framework. Technically, multiple developers develop, maintain, and handle the various components of a stack. But several developers can run all the components of a solution stack. They are referred to as **Full-Stack developers**. The stacks are often named after the components used in them, which result in an acronym. This naming style helps to remember the elements used and to describe the stack components as a whole. In this article, one such stack is discussed - the **LAMP Stack**.

##### Introduction

Michael Kunze invented the term LAMP stack in 1998. It is used as a kernel for websites that are hosted by Linux. It can also create web pages, web applications, static pages, dynamic pages, etc. The LAMP structure consists of 4 main layers:

- The Operating System
- Web Server
- Database Layer
- Scripting Layer

All the layers use [**Free and Open-Source Software(FOSS)**](https://en.wikipedia.org/wiki/Free_and_open-source_software). Linux Operating System, Apache Web Server, MySQL Database, and PHP programming language are the LAMP Stack's primary components. We can consider different software alternatives for each layer based on various prerequisites.

![LAMP Stack](/engineering-education/lamp-stack/lampstack.png)

##### Layers of LAMP Stack

All the layers of the stack are dependent on each other. They work together to provide a perfect structure for any web application. Let us take a detailed look at all four layers.

- **The Operating System**
**Linux:** The OS(Operating System) makes up the first layer. The stack paradigm base is set by Linux, which serves as the host for web applications. Operating System is the stack's lowest layer, and all other layers operate on top of this layer. Thus, it is the backbone of the LAMP stack. Linux is preferred because of its customizability and easy-to-use technology. However, the OS layer is strictly not restricted to Linux only. We may use other alternatives such as Windows, Mac OS, Unix-like. Their names change based on the OS used - **WAMP** ([Microsoft Windows](https://en.wikipedia.org/wiki/Microsoft_Windows)), **MAMP** ([Mac OS](https://en.wikipedia.org/wiki/MacOS)), **SAMP** ([Solaris](https://en.wikipedia.org/wiki/Solaris_(operating_system))), **XAMPP** ([cross-platform](https://en.wikipedia.org/wiki/Cross-platform_software)) to name a few.

- **Web Layer (or HTTP Server)**
**Apache:** The web server is the second layer of the stack. A web server is a server software that fulfills client demands on the **WWW(World Wide Web)**. The correspondence between client and server is then achieved using the [**HTTP(HyperText Transfer Protocol)**](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol). Its key purpose is to accept the users' incoming HTTP requests and provide them the relevant web pages depending on their search query. Apache HTTP server is the preferred software for this layer. It is one of the most popular web-based HTTP clients. [**Internet Information Services(IIS)**](https://en.wikipedia.org/wiki/Internet_Information_Services) by Microsoft is an alternative server software for Apache. This operates on the Windows operating system, resulting in **WIMP Stack** ( **W**indows+ **I**IS+ **M**ySQL+ **P**HP). According to a [survey by Netcraft](https://news.netcraft.com/archives/category/web-server-survey/), as of November 2020, Apache now powers 28.9% of the world's top million websites to overtake its rival counterpart - [**NginX**](https://en.wikipedia.org/wiki/Nginx), which is another server software alternative for Linux hosted web sites. Using NginX results in **LEMP Stack** ( **L**inux+NginX(pronounced as **E**ngineX)+ **M**ySQL+ **P**HP).

- **Database Layer**
**MySQL:** The third layer is the database layer. This layer contains **Database Management System (DBMS)** software. This layer facilitates data storage, and for the LAMP framework, it is provided by MySQL. A query is a search for information or data stored in the database. Here, MySQL acts as a container and stores everything that can be queried by the user. This layer can collectively include user accounts, user details, product names with their descriptions, and even website statistics. Web administrators may need to regularly change their website content, and users may need to modify their content. Database layer's inclusion can do this. For instance, the comments section for any application is solely for user purposes only. The users provide their content as comments, so the database can update itself dynamically. Other alternatives can be considered such as [**PostgreSQL**](https://en.wikipedia.org/wiki/PostgreSQL), which results in **LAPP Stack** ( **L**inux+ **A**pache+ **P**ostgreSQL+ **P**HP) and even NoSQL databases such as [**MongoDB**](https://en.wikipedia.org/wiki/MongoDB).

- **Scripting Layer**
**PHP:** The fourth and final layer is the scripting layer, which uses a programming language for scripting that implements computerized tasks. PHP is one of the default web programming languages used in the LAMP stack. The scripting layer unites all the other components to make a web application work perfectly. The codes written in scripting languages are dynamic and embedded in HTML. It also helps to extract the data from the third layer, i.e., the database layer. The data is then sent back to the user as "search results" through the second layer, i.e., the web server. Web applications are operated within this part of the LAMP stack. The other scripting languages used for web programming are **Perl** and **Python**.

##### Layer-by-Layer stack operation 

A thorough look at the LAMP arrangement tells us how the components work together. 

Let's assume we search ** "Sports news"** in the browser. It all begins when the user requests web pages(about sports news) from their browser(Chrome, Firefox, Safari, to name a few). These requests are received by the webserver (Apache in this case). The request is transferred to PHP by Apache. As discussed above, PHP, which is embedded into the HTML code, manages dynamic pages, tracks user statistics, and analyzes their data. The code written in the PHP file is executed, and the data from the database are sent back together as HTML pages. These HTML pages are shown as search results in web browsers. Let us consider another instance where we need "Yesterday's Sports news." Websites that provide news have an archive system where the old data is stored. In this case, the archive system is stored in the MySQL database. If the user prompts yesterday's news, PHP reruns the file code and interacts with MySQL to retrieve the old data. Then it is sent back to the browser through the webserver. Lastly, all these functions need one main component to work with - the operating system. The operating system acts as the backbone of any stack(Linux in this case). A simple flowchart designed below may help you to understand the working of the lamp stack easily.

![Layer-by-Layer stack operation](/engineering-education/lamp-stack/flowchart.png)

##### Usage of Lamp Stack

1. Stack variants are based on the different types of components used, but the LAMP arrangement is most suitable for building web architecture because of its scalability and flexibility.
2. LAMP Stack provides web frameworks for some popular websites such as Joomla and Drupal. 
3. The Wikimedia Foundation uses customized LAMP Stack to host its services and forimproving its site infrastructure.
4. Because of its vast community and availability of many source codes, it provides a secure framework.
5. Adding other FOSS can upgrade the LAMP Stack. This helps to improve site performance and enhance its security. For example,
    - Varnish Cache, a web accelerator. 
    - OpenSSL to secure communication networks.
    - ModSecurity (or Modsec), a web-based firewall application.
    - OAuth, a protocol used to invoke authorization from the user.

##### Conclusion

Web applications such as Wikipedia and WordPress are built using the LAMP framework. However, Wikipedia uses a personalized structure of LAMP, which includes an add-on - the [**LVS(Linux Virtual Server)**](https://en.wikipedia.org/wiki/Linux_Virtual_Server). LVS handles the network traffic distribution systematically by diverting the incoming HTTP request to the available server. This helps in the smooth transmission of data and reduces network latency. All the four components of the LAMP stack are FOSS(Free and Open Source Software), so money does not need to be spent on proprietary software. Also, the source code of FOSS can be shared and reused for developmental purposes. This helps to make modifications and enhancements to improve the websites. The LAMP framework is so stable that even after personalizing the stack in favor of our needs, it works smoothly. This makes the LAMP stack ideal for web application development.

##### Additional Resources

[LAMP - A Software Bundle | Wikipedia](https://en.wikipedia.org/wiki/LAMP_(software_bundle))
[What is a Lamp Stack?](https://phoenixnap.com/kb/what-is-a-lamp-stack)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
