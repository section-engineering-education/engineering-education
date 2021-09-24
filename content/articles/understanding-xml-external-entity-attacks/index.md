For the last four years, security researchers have reported a tremendous increase of breaches.About 20-30,000 websites are hacked everyday.There are several ways websites get hacked,XXE being one of them.According to the OWASP Top 10 report of 2017 XXE attacks were ranked number four , this year (2021), XXE has been merged in Security misconfiguration which has been placed in the fifth position.The OWASP Top 10 is a report maintained by the Open Web Application Security Project , it contains a list of high ranking web application security concerns.
In this article we will be looking at XXE attacks in depth.We will focus on what XML is, What are XML external entities , Impact of this attack and how to mitigate it.
> **Disclaimer: ** - This article is meant to be used  for educational purposes only. 
### What is XML ?
Extensible Markup Language is a markup language ,just like HTML, that is human and machine-readble.XML was developed by the World Wide Web Consortium (W3C). Unlike HTML, Users can define their own tags.The most common use of this language is transporting and storing data.Apart from that , XML can also be used to offload and reload databases, merge with sytle sheets to create a desired output among other uses.

Here is a sample  XML code:
```xml
<?xml version="1.0" encoding="UTF-8">
<Greeting>
    <From>Felix</From>
    <To>Section readers</To>
    <message>How are you today?</message>
</Greeting>

```
Let's go through the code to understand its syntax :
**Line 1:**
```xml
<?xml version="1.0" encoding="UTF-8">
```
This line declares the version of xml being used , it also states the encoding to be used . `UTF-8`is the default encoding for languages such as CSS ,Javascript,PHP and others.This line is commonly known as the prolong and is not mandatory in the xml code.If you decide to include the prolog it should be the first line of the document.
**Line 2:**
```xml
<Greeting>
     <!--Supporting content-->
</Greeting>
``` 
`<Greeting>` acts as the parent/root element for this piece of code.Each XML document must have a root element .XMl tags are case-sensitive , each tag must have a similar closing tag.All other tags in this document will be anchored to this tag.
