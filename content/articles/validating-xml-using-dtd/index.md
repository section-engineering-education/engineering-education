---
layout: engineering-education
status: publish
published: true
url: /validating-xml-using-dtd/
title: Validating XML using DTD
description: A tutorial on introduction to XML, the need for XML validation, and how validation is done using DTD.
author: srishilesh-p-s
date: 2020-11-11T00:00:00-16:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/validating-xml-using-dtd/hero.jpg
    alt: Validating XML using DTD
---
In this article, we will learn about XML and how validation is done using Document Type Definition (DTD). By the end of this article, you will understand different data serialization techniques, the need for XML, and the importance of XML validation. To better understand the concepts, we will also validate a sample XML document.
<!--more-->

### Table of contents
- [Introduction](#introduction)
- [Overview of XML](#overview-of-xml)
- [What is Document Type Definition?](#what-is-document-type-definition)
- [Need for XML Validation](#need-for-xml-validation)
- [Step by Step Guide for Validation](#step-by-step-guide-for-validation)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Introduction
Computer systems vary in terms of hardware architecture, operating system, memory management mechanisms, and addressing architecture. Data inside computers is represented as binary values (0s and 1s).

Depending on the architecture, the representations will vary. Similarly, the storage and communication mechanisms also differ between each system.

With each system having different architectures, communication between two different architectures will require a common medium to transport data. This leads us to the concept of Data serialization.

![Data serialization](/engineering-education/validating-xml-using-dtd/data_serialization.jpg)

[Image source](https://devopedia.org/data-serialization)

> According to [Devopedia](https://devopedia.org/data-serialization), [Data serialization](https://en.wikipedia.org/wiki/Serialization) is the process of converting data objects present in complex data structures into byte streams for storage, transfer, and distribution purposes on physical devices.

Data is stored as data structures similar to an array, tree, or heaps. For communication, we must transform the complex structures into byte sequences. This series of bytes gets transported to the destination machine, to establish communication. The reverse process of Serialization is Deserialization.

Deserialization takes a series of bytes and converts it to an in-memory data structure. For example, in JavaScript, the `JSON` data that is passed to the web browser client as a `string` using `JSON.stringify()`, is Serialization. And the parsing the `string` back to `JSON` using `JSON.parse()`, is deserialization.

There are several types of serialization formats, like:

- [CSV](https://en.wikipedia.org/wiki/Comma-separated_values) (Comma Separated Values - 1972)
- [XML1.0](https://en.wikipedia.org/wiki/XML) (eXtensible Markup Language - 1998)
- [JSON](https://en.wikipedia.org/wiki/JSON) (JavaScript Object Notation - 2001)
- [YAML](https://en.wikipedia.org/wiki/YAML#:~:text=YAML%20a%20recursive%20acronym%20for,is%20being%20stored%20or%20transmitted.) (YAML Ain't Markup Language - 2004)
- [MessagePack](https://en.wikipedia.org/wiki/MessagePack) (2008)
- [Protobuf](https://en.wikipedia.org/wiki/Protocol_Buffers) (Protocol Buffers - 2008)
- [BSON](https://en.wikipedia.org/wiki/BSON) (Binary JSON - 2016)

For example, we use a [CSV](https://en.wikipedia.org/wiki/Comma-separated_values) serialization format to represent the data using comma-separated values. It's more commonly used in [Machine Learning](/differences-between-artificial-intelligence-machine-learning-and-deep-learning/), as datasets for training and testing the model.

Similarly, [JSON](https://en.wikipedia.org/wiki/JSON) is the most commonly used serialization format in web technologies. It represents a key-value pair containing information. For example, we can use it in HTTP requests and responses, where it reads the data from a web server and displays it on the web page.

We cannot say which serialization format suits all our requirements. Since each format has its pros and cons. It depends on the data objects that are being serialized.

In this article, we'll look at an overview of XML and how it's validated when using Document Type Definition (DTD). We'll also implement an example.

### Overview of XML
The invention of the World Wide Web in 1989 by [Sir Timothy Berners Lee](https://en.wikipedia.org/wiki/Tim_Berners-Lee) led to the rise of the Internet and [HTML](https://en.wikipedia.org/wiki/HTML). HTML is a markup language used to interpret text, images, and other types of data as webpages in web browsers.

The [Internet Engineering Task Force](https://en.wikipedia.org/wiki/Internet_Engineering_Task_Force) formally defined the rules of HTML. It has been maintained and improved continuously by the [World Wide Web Consortium](https://en.wikipedia.org/wiki/World_Wide_Web_Consortium). Over the last 30 years, they have launched various versions of HTML, the latest being HTML5.


The root of web development is HTML. However, when converting the data to HTML, there is a high chance of losing information. Information needs to be exchanged without loss, this need led to the rise of XML, which is a markup language.

A markup language is a way of styling a document to be syntactically distinguishable from the text where the document is processed only to render the text, while not displaying the markup language.

[XML (eXtensible Markup Language)](https://en.wikipedia.org/wiki/XML) is a simple and flexible markup language that can enable data serialization by exchanging information between two data serialization formats, to describe the contents better. Initially, XML was used to describe the contents, but it’s also being used to transfer data. It improves on the existing HTML approach and helps in communication among other data serialization types.

[Document Object Model (DOM)](https://en.wikipedia.org/wiki/Document_Object_Model) is used to create a tree-like structure of a well-formed XML document. DOM facilitates the adding of objects to the tree structure to access and manipulate XML documents. We can learn more about DOM in this Section article [‘Understanding Document Object Model (DOM)’](/document-object-model/).

Creating XML documents was much easier, but sometimes it could leads to frequent errors like not matching the required syntax. Since XML codes are neither compiled nor interpreted, the only option left was to parse. Making validation of XML codes necessary.

### What is Document Type Definition?
[Document Type Definition (DTD)](https://en.wikipedia.org/wiki/Document_type_definition) is a markup language rulebook that defines what markup elements can describe a document. The creation of user-defined tags in XML was much simpler, so the user had to specify the required tag in DTD, for validation. It defines and checks the structure of the elements and attributes used for each element in the XML document.

### Need for XML Validation
Browsers like Internet Explorer contain built-in XML parsers, that check if the document is **well-formed**, and if it **validates the parser**. A document is well-formed if it follows the basic syntactic rules of XML.

A document is valid if it checks for the rules mentioned by DTD for the particular XML. For validation, there are various online automated validators like [this](https://codebeautify.org/xmlvalidator). Alternatively, there are extensions in text editors like VSCode with built-in validation.

### Step by Step Guide for Validation
Now, let's see how to build a sample XML document and how validation is done using DTD.

#### Building XML Document
In HTML, we have to use predefined tags like `<html></html>` or `<body></body>` for interpreting our data on the web. But, when using XML, user-defined tags can be created easily, and we use them to transport information between webpages.

For example, let’s take a closer look at how XML documents are built for ‘Contact us’ pages like [this](/contact-us/). Here, we have 5 different input fields:

First Name, Last Name, Company Name, Email address, and Message fields.

We begin an XML document by specifying its version `1.0` along with its encoding type `utf-8` , as shown below.

```xml
<?xml version="1.0" encoding="utf-8"?>
```

Now, every new entry in the contact-us form will be considered as separate entries in the XML file. Here in our example, we have a single entry, containing input fields enclosed within the tags `<customer></customer>`.

Inside the outer tags, we may define our tags for every unique input field. Like, the field `First Name` can be enclosed within tag `<firstname></firstname>`. Similarly, every field in the form can be done as shown below.

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

#### Building DTD Validator
Before we build, let’s go over a few keywords, that would help us understand DTD better.

##### Elements
Elements are the building blocks of DTD. In HTML, you would have noticed elements like “p” and “table” used to hold our data. But, in XML, the elements refer to “firstname” and “email”.

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
Attributes provide extra information about the elements. It's always placed inside the tag of elements and is in the form of a name-value pair.

Example in HTML:

```html
<img src='helloworld.png' />
```

Example in XML:

```xml
<message id='1'>Hello World</message>
```

##### PCDATA and CDATA
PCDATA is the Parsed Character Data. It's a text the DTD parser will parse. It parses the tags inside the document to retrieve the values inside each of the tags, for validation.

Similarly, CDATA is Character Data. It's a text the DTD parser will not parse. The elements will not be parsed either, and it cannot retrieve the values.

#### Validating using DTD
There are two types of DTD validations: Internal validation and External validation.

For internal validations, we will write the whole DTD in the same file as the XML file, which can be used for validation.

Similarly, the external validation will validate the XML based on the DTD written in a separate file with the `.dtd` extension.

To link it with the XML file, we use:

```xml
<!DOCTYPE customer SYSTEM "validation.dtd">
```

Having understood various components of DTD, let’s build a DTD validator.

In DTD, we declare the XML elements as

```xml
<!ELEMENT element-name (element-content)>
```

For our example, the outermost tag `<customer />` holds all the input fields together. So, in DTD, we must specify the tag as `<customer />` containing fields with tags like `<firstname />`, `<lastname />`, `<companyname />`, `<email />` and `<message />`. According to the DTD syntax, we specify that `<customer />` tag as the parent element holding other child tags.

```xml
<!ELEMENT customer (firstname, lastname, companyname, email, message)>
```

After specifying the tags present inside the outermost tag. Now, we can the value that can be parsed for each tag. Here, all the input fields can contain data as text. According to DTD syntax, we specify it as `#PCDATA`, under each element. This is done because these values should be parsed and validated.

```xml
<!ELEMENT firstname (#PCDATA)>
<!ELEMENT lastname (#PCDATA)>
<!ELEMENT companyname (#PCDATA)>
<!ELEMENT email (#PCDATA)>
<!ELEMENT message (#PCDATA)>
```

##### Complete Code
If it’s an Internal DTD validation, it shows the whole XML code with its DTD validation below:

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

If it’s an External DTD validation, it can store the DTD code in a file called `validation.dtd`.

```xml
<!ELEMENT customer (firstname, lastname, companyname, email, message)>
<!ELEMENT firstname (#PCDATA)>
<!ELEMENT lastname (#PCDATA)>
<!ELEMENT companyname (#PCDATA)>
<!ELEMENT email (#PCDATA)>
<!ELEMENT message (#PCDATA)>
```

And now the DTD file can be referenced in XML as shown below:

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

In both types of validations, DTD does the parsing based on the structure that defines the XML file.

It can compile the validations using an online validators like [this](https://codebeautify.org/xmlvalidator), by uploading the XML schema and its respective DTD file.

Alternatively, you can download XML validators locally to your text editors. For example, in VSCode editor, checkout [XML tools](https://marketplace.visualstudio.com/items?itemName=DotJoshJohnson.xml) extension for validating XML.

### Conclusion
We had an overview of what Data serialization is, how XML files are being built, and its validation using DTD. This article serves only as an introduction to the validation of XML using DTD. I highly recommend trying out the code manually and reading further into the referenced articles.

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
- https://web.archive.org/web/20100311063223/
- http://www.isoc.org/isoc/conferences/inet/99/proceedings/1i/1i_1.htm
- https://en.wikipedia.org/wiki/XML_validation
- https://levelup.gitconnected.com/json-vs-yaml-6aa0243aefc6
- https://devopedia.org/data-serialization
- http://ptgmedia.pearsoncmg.com/images/0130960195/samplechapter/0130960195.pdf
- https://quzzister.com/essay/what-is-xml-essay-19589

---
Peer Review Contributions by [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)
