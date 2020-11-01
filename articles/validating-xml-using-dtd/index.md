---
layout: engineering-education
status: publish
published: true
url: /engineering-education/validating-xml-using-dtd/
title: Validating XML using DTD
description: A tutorial on introduction to XML, the need for XML validation and how validation is done using DTD.
author: srishilesh-p-s
date: 2020-10-28T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/validating-xml-using-dtd/hero.jpg
    alt: Validating XML using DTD
---

In this article, we will be learning about XML and how validation is being done using DTD. By the end of this article, you will understand different data serialization techniques, the need for XML, and the importance of XML validation. To understand the concepts better, you will also be validating a sample XML document.

<!--more-->

### Table of contents
- [Introduction](#introduction)
- [Overview of XML](#overview-of-xml)
- [What is DTD?](#what-is-dtd)
- [Need for XML validation](#need-for-xml-validation)
- [Step by step guide for validation](#step-by-step-guide-for-validation)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Introduction
Computer systems vary in terms of hardware architecture, operating system, memory management mechanisms, and addressing architecture. Every data inside a computer is represented as binary values. Depending on the architecture, the representations vary. Similarly, the storage and communication mechanisms vary between each system. With each system having different architectures, communication between two different architectures requires a common medium for transportation of data. This leads us to the introduction to the concept of Data serialization

![Data serialization](/engineering-education/validating-xml-using-dtd/data_serialization.jpg)

[Image source](https://devopedia.org/data-serialization)

> According to [Devopedia](https://devopedia.org/data-serialization), [Data serialization](https://en.wikipedia.org/wiki/Serialization) is the process of converting data objects present in complex data structures into byte streams for storage, transfer, and distribution purposes on physical devices.

Generally, the data is stored as data structures like an array, tree, and heaps. For communication, the complex structures must be transformed into byte sequences. This series of bytes gets transported to the destination machine, to establish communication. The reverse process of Serialization is Deserialization. Deserialization takes a series of bytes and converts it to an in-memory data structure. For example in Javascript, the `JSON` data that is passed to the web browser client as a `string` using `JSON.stringify()`, is Serialization. And, the parsing the `string` back to `JSON` using `JSON.parse()`, is deserialization.

There are several types of serialization formats, like:

- [CSV](https://en.wikipedia.org/wiki/Comma-separated_values) (Comma Separated Values - 1972)
- [XML1.0](https://en.wikipedia.org/wiki/XML) (eXtensible Markup Language - 1998)
- [JSON](https://en.wikipedia.org/wiki/JSON) (JavaScript Object Notation - 2001)
- [YAML](https://en.wikipedia.org/wiki/YAML#:~:text=YAML%20a%20recursive%20acronym%20for,is%20being%20stored%20or%20transmitted.) (YAML Ain't Markup Language - 2004)
- [MessagePack](https://en.wikipedia.org/wiki/MessagePack) (2008)
- [Protobuf](https://en.wikipedia.org/wiki/Protocol_Buffers) (Protocol Buffers - 2008)
- [BSON](https://en.wikipedia.org/wiki/BSON) (Binary JSON - 2016)

We cannot say which serialization format suits all our requirements. Each format has its pros and cons. It depends on the data objects that are being serialized.

In this article, we will be looking at an overview of XML and how the validation is done using DTD. Also, we will be implementing it, with a sample example.

### Overview of XML
The invention of the World Wide Web in 1989 by [Sir Timothy Berners Lee](https://en.wikipedia.org/wiki/Tim_Berners-Lee) led to the rise of the Internet and [HTML](https://en.wikipedia.org/wiki/HTML). HTML is a markup language used to interpret text, images, and other types of data as webpages in web browsers. The rules of HTML were formally defined by the [Internet Engineering Task Force](https://en.wikipedia.org/wiki/Internet_Engineering_Task_Force). Later, it is being maintained and improved continuously by the [World Wide Web Consortium](https://en.wikipedia.org/wiki/World_Wide_Web_Consortium). Over 30 years, various versions of HTML were launched, with the latest being HTML5.

The root of web development is HTML. However, when converting the data to HTML, there are high chances of losing our information. The information needs to be exchanged without loss, which led to the rise of XML.

[XML (eXtensible Markup Language)](https://en.wikipedia.org/wiki/XML) is a simple and flexible markup language that can enable data serialization by exchanging information between two data serialization formats, to describe the contents better. Initially, XML was used to describe the contents, but later it is being used for the exchange of data. It improves on the existing HTML approach and helps in communication among other data serialization types.

[Document Object Model (DOM)](https://en.wikipedia.org/wiki/Document_Object_Model) is used to create a tree-like structure of a well-formed XML document. DOM facilitates the adding of objects to the tree structure to access and manipulate XML documents. More about DOM can be learned in this Section article ['Understanding Document Object Model (DOM)'](https://www.section.io/engineering-education/document-object-model/).

Creating XML documents was much easier, but sometimes it leads to frequent errors for not matching the required syntax. Since XML codes are neither compiled nor interpreted, the only option left was to parse. Thus, validation of XML codes was necessary.

### What is DTD?
[Document Type Definition (DTD)](https://en.wikipedia.org/wiki/Document_type_definition) is a markup language rulebook that defines what markup elements can be used to describe a document. The creation of user-defined tags in XML was much simpler, so the user has to specify the required tag in DTD, for validation. It defines and checks the structure of the elements and attributes used for each element in the XML document.

### Need for XML validation
Browsers like Internet Explorer contain built-in XML parsers, which checks if the document is **well-formed**, and if it **validates the parser**. A document is well-formed if it follows the basic syntactic rules of XML. And, a document is valid if it checks for the rules mentioned by DTD for the particular XML. For validation, there are various online automated validators like [this](https://codebeautify.org/xmlvalidator). Alternatively, there are extensions in text editors like VSCode with built-in validation.

### Step by Step guide for validation
Now, let's see how to build a sample XML document and how validation is done using DTD.

#### Building XML document
In HTML, we have to use predefined tags like `<html></html>` or `<body></body>` for interpreting our data on the web. But, here in XML, user-defined tags can be created easily, and they are used for the transportation of information between webpages.

For example, let's understand how XML documents are built for 'Contact us' pages like [this](https://www.section.io/contact-us/). Here, we have 5 different input fields: First Name, Last Name, Company Name, Email address, and Message fields.

We begin an XML document by specifying its version `1.0` along with its encoding type `utf-8` , as shown below.

```xml
<?xml version="1.0" encoding="utf-8"?>
```

Now, every new entry in the contact-us form will be considered as separate entries in the XML file. Here in our example, we have a single entry, containing input fields enclosed within the tags `<customer></customer>`.

Inside the outer tags, we may define our tags for every unique input field. Like, the field `First Name` can be enclosed within tag `<firstname></firstname>`. Similarly, every field in the form can be done as shown below

```xml
<?xml version="1.0"?>
<customer>
  <firstname>John</firstname>
  <lastname>Doe</lastname>
  <companyname>Section</companyname>
  <email>johndoe@section.io</email>
  <message>Welcome message</message>
</customer>
```

We have built our first XML document. Now, it can be saved locally with a `.xml` file extension.

#### Building DTD validator
Before we start building, let us understand a few keywords, that would help us understand better.

##### Elements
Elements are the building blocks of DTD. In HTML, you would have noticed elements like "p" and "table" for holding our data. But, in XML, the elements refer to "firstname" and "email".

Example in HTML:

```html
<h1>Heading</h1>
<p>Hello world!</p>
```

Example in XML:

```xml
<companyname>Section</companyname>
<email>johndoe@section.io</email>
```

##### Attributes
Attributes provide extra information about the elements. It is always placed inside the tag of elements and is in the form of a name-value pair.

Example in HTML:

```html
<img src='helloworld.png' />
```

Example in XML:

```xml
<message id='1'>Hello World</message>
```

##### PCDATA and CDATA
PCDATA is the Parsed Character Data. It is a text which will be parsed by the DTD parser. The tags inside the document are parsed to retrieve the values inside each of the tags, for validation.

Similarly, CDATA is Character Data. It is a text which will not be parsed by the DTD parser. The elements will not be parsed, and the values cannot be retrieved.

#### Validating using DTD
Generally, there are two types of DTD validations: Internal validation and External validation.

For internal validations, the whole DTD will be written in the same file as that of the XML file, which can be used for validation.

Similarly, the external validation will validate the XML based on the DTD written in a separate file with the `.dtd` extension. For linking it with the XML file, we use

```xml
<!DOCTYPE customer SYSTEM "validation.dtd">
```

Having understood various components of DTD, let's start building a DTD validator.

In DTD, the XML elements are declared as

```xml
<!ELEMENT element-name (element-content)>
```

For our example, the outermost tag `<customer />` holds all the input fields together. So, in DTD, we must specify the tag as `<customer />` containing fields with tags like `<firstname />`, `<lastname />`, `<companyname />`, `<email />` and `<message />`. According to the DTD syntax, we must specify that `<customer />` tag as the parent element holding other child tags.

```xml
<!ELEMENT customer (firstname, lastname, companyname, email, message)>
```

After specifying the tags present inside the outermost tag. Now, we have to define the type of value that can be parsed for each tag. Here, all the input fields can contain data as text. According to DTD syntax, we specify it as `#PCDATA`, under each element. Since it is required to parse for validating if the values are textual data or not.

```xml
<!ELEMENT firstname (#PCDATA)>
<!ELEMENT lastname (#PCDATA)>
<!ELEMENT companyname (#PCDATA)>
<!ELEMENT email (#PCDATA)>
<!ELEMENT message (#PCDATA)>
```

##### Complete code
If it is an Internal DTD validation, the whole XML code with its DTD validation is shown below

```xml
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE customer [
<!ELEMENT customer (firstname, lastname, companyname, email, message)>
<!ELEMENT firstname (#PCDATA)>
<!ELEMENT lastname (#PCDATA)>
<!ELEMENT companyname (#PCDATA)>
<!ELEMENT email (#PCDATA)>
<!ELEMENT message (#PCDATA)>
]>
<customer>
  <firstname>John</firstname>
  <lastname>Doe</lastname>
  <companyname>Section</companyname>
  <email>johndoe@section.io</email>
  <message>Welcome message</message>
</customer>
```

If it is an External DTD validation, the DTD code can be stored in a file called `validation.dtd`

```xml
<!ELEMENT customer (firstname, lastname, companyname, email, message)>
<!ELEMENT firstname (#PCDATA)>
<!ELEMENT lastname (#PCDATA)>
<!ELEMENT companyname (#PCDATA)>
<!ELEMENT email (#PCDATA)>
<!ELEMENT message (#PCDATA)>
```

And, now the DTD file can be referenced in XML as shown below

```xml
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE customer SYSTEM "validation.dtd">
<customer>
  <firstname>John</firstname>
  <lastname>Doe</lastname>
  <companyname>Section</companyname>
  <email>johndoe@section.io</email>
  <message>Welcome message</message>
</customer>
```

In both types of validations, the parsing is done by DTD based on the structure that defines the XML file.

### Conclusion
We had an overview of what Data serialization is, how XML files are being built, and its validation using DTD. This article serves only as an introduction to the validation of XML using DTD. It is highly recommended to try out the code manually by reading further from the referenced articles.

To summarize:
- We learned what Data serialization is.
- We learned the importance of XML.
- We understood the need for XML validation.
- We built an XML document and validated it using DTD.

### Further reading
- https://www.w3.org/XML
- https://www.w3.org/TR/xmlschema-2/
- https://en.wikipedia.org/wiki/Document_type_definition
- https://en.wikipedia.org/wiki/XML
- https://en.wikipedia.org/wiki/HTML
- https://web.archive.org/web/20100311063223/http://www.isoc.org/isoc/conferences/inet/99/proceedings/1i/1i_1.htm
- https://en.wikipedia.org/wiki/XML_validation
- https://levelup.gitconnected.com/json-vs-yaml-6aa0243aefc6
- https://devopedia.org/data-serialization
- http://ptgmedia.pearsoncmg.com/images/0130960195/samplechapter/0130960195.pdf
- https://quzzister.com/essay/what-is-xml-essay-19589

---
Peer Review Contributions by [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)