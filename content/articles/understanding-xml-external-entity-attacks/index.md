---
layout: engineering-education
status: publish
published: true
url: /understanding-xml-external-entity-attacks/
title: Understanding XML External Entitiy Attacks
description: In this article, we will be looking at the different ways that XML External Entities can be used to attack a web application. We will also look at how to mitigate these attacks.
author: felix-vaati
date: 2021-10-15T00:00:00-13:00
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-xml-external-entity-attacks/hero.png
    alt: XML External Entity Attack XXE Image Hero
---
For the last four years, security researchers have reported a tremendous increase in security breaches. About 20-30,000 websites get hacked every day. There are several ways websites get hacked, XML External Entity Attacks (XXE) being one of them.
<!--more-->

*(Source: [Patchstack, 2021](https://patchstack.com/website-hacking-statistics/))*

According to the OWASP Top 10 report of 2017, they ranked XXE attacks number four. This year (2021), XXE has been merged in security misconfiguration, which is placed in the fifth position.

*(Source: [OWASP Org, 2021](https://owasp.org/Top10/))*

The OWASP Top 10 is a report maintained by the Open Web Application Security Project. It contains a list of high-ranking web application security concerns.

In this article, we will look at XXE attacks in depth. We will focus on what XML is, what are XML external entities, the impact of this attack, and how to mitigate it.

> **Disclaimer:** - This article is for educational purposes only.

### Prerequisites
Basic knowledge of intercepting traffic flow using [Burpsuite](https://portswigger.net/burp/communitydownload), [OWASP zap](https://www.zaproxy.org/download/), or any other tool.

### What is XML?
XML (Extensible Markup Language) is a markup language, just like HTML, that is human and machine-readable. The World Wide Web Consortium (W3C) developed XML. Unlike HTML, users can define their tags. The most common use of this language is transporting and storing data. Apart from that, XML can also offload and reload databases, merge with style sheets to create the desired output among other uses.

Here is a sample XML code:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Greeting>
    <From>Felix</From>
    <To>Section readers</To>
    <message>How are you today? </message>
</Greeting>
```

Let’s go through the code to understand its syntax:

#### Line 1

```xml
<?xml version="1.0" encoding="UTF-8"?>
```

This line declares the version of XML being used, it also states the encoding to be used. `UTF-8`is the default encoding for languages such as CSS, JavaScript, PHP, and others. We commonly know this line as the prolog and is not mandatory in the XML code. If you decide to include the prolog, it should be the first line of the document.

#### Line 2

```xml
<Greeting>
     <!--Supporting content-->
</Greeting>
```

`<Greeting>` acts as the parent/root element for this piece of code. Each XML document must have a root element. XML tags are case-sensitive, each tag must have a similar closing tag. All other tags in this document will be anchored to this tag.

#### Line 3

```xml
<From>Felix</From>
<To>Section readers</To>
<message>How are you today?</message>
<!--this is a comment-->
```

This section contains the child nodes of this XML document. This is where we input the rest of the content we would like in our document.

XML, like any other language, has comments. To write comments in XML, we use `<!--comment-->`, similar to how we write comments in HTML.

#### XML entities
In other programming languages, when we want to store data temporarily, we use variables. In XML, we use entities to hold our data. Whenever we need that data, we call the entities by appending `&` to the entity name such that we have something similar to this: `&Entityname`.Entities can also access data that is not stored locally, in such a case we call them external entities.

#### Document Type Definition (DTD)

The DTD contains a definition of the structure and legal attributes and elements of an XML document.DTD can be both within the document or loaded from an external source. When loading from an external source, we use the keyword `SYSTEM`. The external source can either be a URL or a file.

A sample XML document with both DTD and entities will look like this.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mail [ <!ENTITY sender “felix”> ]>
<Greeting>
      <From>&sender;</From>
      <To>Section reader</To>
      <Message>Hello, How are you today?</Message>
</Greeting>
```

When the above code is parsed, we get this:

```txt
From: Felix

To: Section reader

Message: Hello, How are you today?
```

Now that we have learned how a basic XML document looks like, let’s learn how the attack works.

### How XXE attacks work
XXE attacks arise when external entities are supported and parsed by a weak XML parser. An attacker intercepts the XML data when in transit and adds malicious code. When processed, the application may disclose private information. Mostly these attacks enable the attackers to view the filesystem and, sometimes, they can interact with any back-end services that the application can access.

There are several types of XXE attacks, such as:

- **In-band XXE**: In this type, the attacker can receive an immediate response for the XXE payload they have uploaded.
- **Out-of-band XXE (blind XXE)**: The attacker does not get an immediate response to their payload. To get a response, they reflect the output to another file or their server.

[Portswigger](www.portswigger.net/web-security/xxe) has several labs that can help you practice. For this article, I will use one lab to show how XXE attacks can retrieve files.

Using Burpsuite, we intercept the data and send it to the repeater.

![intercept](/engineering-education/understanding-xml-external-entity-attacks/intercept1.png)

Since the current data does not have any entities, we will introduce our own and add malicious code. Using the entities we introduce, we will try to check whether we can retrieve the password file.

![payload](/engineering-education/understanding-xml-external-entity-attacks/payload.png)

If we are successful, we should be able to see the file as shown below:
![passwords](/engineering-education/understanding-xml-external-entity-attacks/intercept2.png)

Apart from retrieving files, we can use XXE attacks for:

#### 1. Denial of Service (DoS)
The most common being the billion laugh attack.

#### 2. Server-side request forgery attacks
Using the external entities, an attacker can make HTTP requests to URLs, then the server can access them, including those meant to be for internal use only in an organization.

The attacker will replace the content of an entity with the URL that they are targeting. When the target URL is parsed, the contents of the said domain are exposed.

Here is a sample payload for such an attack.

```xml
<!DOCTYPE ssrf [ <!ENTITY xxe SYSTEM "http://target.exploited-website.url/"> ]>
```

### Impacts of XXE
- Unauthorized access to systems where system files, i.e. password files, were exposed.
- Denial of service, which may cause economic loss, especially on high-traffic business websites.
- Remote code execution.

### Testing for XXE attacks
We can do reliable testing for XXE using tools such as Burpsuite [web vulnerability scanner](https://portswigger.net/burp/vulnerability-scanner). We can also use [OWASP Zap](https://www.zaproxy.org/) to perform similar tests.

### How to prevent XXE attacks
- Disable external entities on your websites if using XML.
- Developer training on safe coding practices.
- Using automatic testing security tools to search for XXE vulnerabilities.
- Whitelisting server-side input to prevent hostile data within documents, headers, or nodes.
- Make use of web application firewalls.
- Encrypting data and authenticating all internal connections to prevent SSRF attacks.

### Conclusion
XXE attacks are an enormous threat to web applications. If not detected or prevented, they can lead to huge economic and data loss. The major cause of XXE attacks is the external entities present in our XML documents.

What we have looked at:

- What is XML?
- How XXE attacks take place.
- Impacts of XXE attacks.
- How to prevent XXE attacks.

Let’s keep our web applications secure. Happy learning!

### Further reading
- [Preventing XXE attacks - OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/cheatsheets/XML_External_Entity_Prevention_Cheat_Sheet.html)

---

Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)
