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

All the layers use [**Free and Open-Source Software(FOSS)**](https://en.wikipedia.org/wiki/Free_and_open-source_software). Linux Operating System, Apache Web Server, MySQL Database, and PHP programming language are the primary components of a LAMP Stack. Different software alternatives for each layer can be considered based on various prerequisites.

![LAMP Stack](/engineering-education/lamp-stack/lampstack.png)

##### Layers of LAMP Stack

All the layers of the stack are dependent on each other. They work together to provide a perfect structure for any web application. Let us take a detailed look at all four layers.

- **The Operating System**
**Linux:** The OS(Operating System) makes up the first layer. The stack paradigm base is set by Linux, which serves as the host for web applications. Operating System is the stack's lowest layer, and all other layers operate on top of this layer. Thus, it is the backbone of the LAMP stack. Linux is preferred because of its customizability and easy-to-use technology. However, the OS layer is strictly not restricted to Linux only. Other alternatives such as Windows, Mac OS, Unix-like can also be used. Their names change based on the OS used - **WAMP** ([Microsoft Windows](https://en.wikipedia.org/wiki/Microsoft_Windows)), **MAMP** ([Mac OS](https://en.wikipedia.org/wiki/MacOS)), **SAMP** ([Solaris](https://en.wikipedia.org/wiki/Solaris_(operating_system))), **XAMPP** ([cross-platform](https://en.wikipedia.org/wiki/Cross-platform_software)) to name a few.

- **Web Layer (or HTTP Server)**
**Apache:** The web server is the second layer of the stack. A web server is a server software that fulfills client demands on the **WWW(World Wide Web)**. The correspondence between client and server is then achieved using the [**HTTP(HyperText Transfer Protocol)**](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol). Its key purpose is to accept the users' incoming HTTP requests and provide them the relevant web pages depending on their search query. Apache HTTP server is the preferred software for this layer. It is one of the most popular web-based HTTP clients. [**Internet Information Services(IIS)**](https://en.wikipedia.org/wiki/Internet_Information_Services) by Microsoft is an alternative server software for Apache. This operates on the Windows operating system, resulting in **WIMP Stack** ( **W**indows+ **I**IS+ **M**ySQL+ **P**HP). According to a [survey by Netcraft](https://news.netcraft.com/archives/category/web-server-survey/), as of November 2020, Apache now powers 28.9% of the world's top million websites to overtake its rival counterpart - [**NginX**](https://en.wikipedia.org/wiki/Nginx), which is another server software alternative for Linux hosted web sites. Using NginX results in **LEMP Stack** ( **L**inux+NginX(pronounced as **E**ngineX)+ **M**ySQL+ **P**HP).

- **Database Layer**
**MySQL:** The third layer is the database layer. This layer contains **Database Management System (DBMS)** software. This layer facilitates data storage, and for the LAMP framework, it is provided by MySQL. A query is a search for information or data stored in the database. Here, MySQL acts as a container and stores everything that can be queried by the user. Information such as user accounts, user details, product names with their descriptions, and even website statistics can be collectively included in this layer. Web administrators may need to regularly change their website content, and users may need to modify their content. This can be done with the inclusion of a database layer. For instance, the comments section for any application is solely for user purposes only. The users provide their content as comments, so the database can update itself dynamically. Other alternatives can be considered such as [**PostgreSQL**](https://en.wikipedia.org/wiki/PostgreSQL), which results in **LAPP Stack** ( **L**inux+ **A**pache+ **P**ostgreSQL+ **P**HP) and even NoSQL databases such as [**MongoDB**](https://en.wikipedia.org/wiki/MongoDB).

- **Scripting Layer**
**PHP:** The fourth and final layer is the scripting layer, which uses a programming language for scripting that implements computerized tasks. PHP is one of the default web programming languages used in the LAMP stack. The scripting layer unites all the other components to make a web application work perfectly. The codes written in scripting languages are dynamic and embedded in HTML. It also helps to extract the data from the third layer, i.e., the database layer. The data is then sent back to the user as "search results" through the second layer, i.e., the web server. Web applications are operated within this part of the LAMP stack. The other scripting languages used for web programming are **Perl** and **Python**.

##### Conclusion

Web applications such as Wikipedia and WordPress are built using the LAMP framework. However, Wikipedia uses a personalized structure of LAMP, which includes an add-on - the [**LVS(Linux Virtual Server)**](https://en.wikipedia.org/wiki/Linux_Virtual_Server). LVS handles the network traffic distribution systematically by diverting the incoming HTTP request to the available server. This helps in the smooth transmission of data and reduces network latency. All the four components of the LAMP stack are FOSS(Free and Open Source Software), so money does not need to be spent on proprietary software. Also, the source code of FOSS can be shared and reused for developmental purposes. This helps to make modifications and enhancements to improve the websites. The LAMP framework is so stable that even after personalizing the stack in favor of our needs, it works smoothly. This makes the LAMP stack ideal for web application development.

##### Additional Resources

[LAMP - A Software Bundle | Wikipedia](https://en.wikipedia.org/wiki/LAMP_(software_bundle))
[What is a Lamp Stack?](https://phoenixnap.com/kb/what-is-a-lamp-stack)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
