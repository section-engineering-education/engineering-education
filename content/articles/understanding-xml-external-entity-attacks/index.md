For the last four years, security researchers have reported a tremendous increase of breaches.About 20-30,000 websites are hacked everyday.There are several ways websites get hacked,XXE being one of them.According to the OWASP Top 10 report of 2017 XXE attacks were ranked number four , this year (2021), XXE has been merged in Security misconfiguration which has been placed in the fifth position.The OWASP Top 10 is a report maintained by the Open Web Application Security Project , it contains a list of high ranking web application security concerns.
In this article we will be looking at XXE attacks in depth.We will focus on what XML is, What are XML external entities , Impact of this attack and how to mitigate it.
> **Disclaimer: ** - This article is meant to be used  for educational purposes only. 
### Prequisites
 - Basic knowledge on incerpting traffic flow using Burpsuite, OWASP zap or any other tool.
### What is XML ?
Extensible Markup Language is a markup language ,just like HTML, that is human and machine-readble.XML was developed by the World Wide Web Consortium (W3C). Unlike HTML, Users can define their own tags.The most common use of this language is transporting and storing data.Apart from that , XML can also be used to offload and reload databases, merge with sytle sheets to create a desired output among other uses.

Here is a sample  XML code:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<Greeting>
    <From>Felix</From>
    <To>Section readers</To>
    <message>How are you today?</message>
</Greeting>

```
Let's go through the code to understand its syntax :
**Line 1:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
```
This line declares the version of xml being used , it also states the encoding to be used . `UTF-8`is the default encoding for languages such as CSS ,Javascript,PHP and others.This line is commonly known as the prolong and is not mandatory in the xml code.If you decide to include the prolog it should be the first line of the document.
**Line 2:**
```xml
<Greeting>
     <!--Supporting content-->
</Greeting>
``` 
`<Greeting>` acts as the parent/root element for this piece of code.Each XML document must have a root element .XMl tags are case-sensitive , each tag must have a similar closing tag.All other tags in this document will be anchored to this tag.
**Line 3:**
```xml
    <From>Felix</From>
    <To>Section readers</To>
    <message>How are you today?</message>
    <!--this is a comment-->
```
This section contains the child nodes of this XML document.This is where we input the rest of the content we would like in our  document.XML like any othe language has comments. To write comments in XML we use `<!--comment-->`,similar to how we write comments in HTML.

**XML Entities**
In other programming languages when we want to temporarily store data we use variables,In XML we use entites to hold our data.Whenever we need that data , we call the entities by appending `&`to the enitiy name such that we have something similar to this : `&Entityname`.Entities can also be used to access data that is not stored locally, in such a case they are reffered to as external entities.
**Document Type Definition (DTD)**
The DTD contains a defination of the structure and legal attributes and elements of an XMl document.DTD can be both within the document or loaded from an external source .When loading from an external source we use the keyword `SYSTEM`.The external source can either be a URL or a file.A sample XML document with both DTD and entities will look like this.
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mail [ <!ENTITY sender "felix"> ]>
<Greeting>
      <From>&sender;</From>
      <To>Section reader</To>
      <Message>Hello, How are you today?</Message>
</Greeting>
```
When the above code is parsed , we get this :
```
From	:	felix
To	:	Section reader
Message	:	Hello, How are you today?
```

Now that we have learnt how a basic XML document looks like , lets learn how the attack works.

### How XXE attacks work
XXE attacks arise when external entities are supported and parsed by a weak XML parser. An attacker intercepts the XML data when in transit and adds malicious code.When processed, the application may disclose infomattion that is meant to be private.Mostly these attacks enable the attackers to view the filesystem and in some cases they are able to interact with any back-end services that the application can access.
There are several types of XXE attacks namely:
- In-band XXE : In this type , the attacker is able to receive an immediate response for the XXE payload they have uploaded.
- Out-of-band XXE (blind XXE):The attacker does not get an immediate reponse of their payload. To get a response they reflect the output to another file or their server.

[Portswigger](www.portswigger.net/web-security/xxe) has several labs that can help you practice.For this article, i will use one of the labs to demonstrate how  XXE attacks can be used to retrieve files.
