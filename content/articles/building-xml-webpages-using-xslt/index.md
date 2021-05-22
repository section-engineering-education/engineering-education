---
layout: engineering-education
status: publish
published: true
url: /building-xml-webpages-using-xslt/
title: Building XML webpages using XSLT
description: This tutorial will serve as an introduction on building XML webpages using XSLT. We will go through what XSLT is, how webpages are rendered, and how to build a sample XML webpage using XSLT.
author: srishilesh-p-s
date: 2020-12-21T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/building-xml-webpages-using-xslt/hero.jpg
    alt: Building XML webpages using XSLT
---
In this article, we will learn about building XML webpages using eXtensible Stylesheet Language Transformations (XSLT). By the end of the article, you will have an overview how HTML webpages are built by transforming XML codes. You will also learn a step-by-step procedure on how to build a simple webpage.
<!--more-->
In my previous articles about the [Validation of XML using DTD](/validating-xml-using-dtd/) and [Validation of XML using XSD](/validating-xml-using-xsd/), we learned about the basics of XML and implemented validations using [DTD](https://en.wikipedia.org/wiki/Document_type_definition) and [XSD](https://en.wikipedia.org/wiki/XML_Schema_(W3C)).

I highly recommend going over the previous articles to better grasp those concepts. As a prerequisite, a little knowledge about [HTML](https://en.wikipedia.org/wiki/HTML) and [CSS](https://en.wikipedia.org/wiki/CSS) would help to follow this article along.

### Table of contents
- [What is eXtensible Stylesheet Language Transformation?](#what-is-extensible-stylesheet-language-transformation)
- [Step by Step Guide for Implementation](#step-by-step-guide-for-implementation)
- [Conclusion](#conclusion)
- [Further Reading](#further-reading)

### What is eXtensible Stylesheet Language Transformation?
> According to Wikipedia, [XSLT](https://en.wikipedia.org/wiki/XSLT) is a language used in transforming XML documents into other XML documents, or into other formats such as HTML for web pages, plain text, or XSL Formatting Objects, which may subsequently be converted to other formats, such as PDF, PostScript, and PNG.

The styling of websites built with [HTML](https://en.wikipedia.org/wiki/HTML) was done using predefined tags with [CSS](https://en.wikipedia.org/wiki/CSS). In [XML](https://en.wikipedia.org/wiki/XML) we use user-defined tags. eXtensible Stylesheet Language (XSL) helps us describe the properties of the user-defined tags. These tags will then be transformed into predefined tags using XSL Transformations (XSLT).

### Step by step guide for implementation
#### XML document
In this article, we'll not cover the basics of building an XML document. To keep it simple, let’s build a webpage using the XML code below. 

Full XML code can be found [here](https://gist.github.com/srishilesh/1e4779285eb75fd4af9315391a05e5e6).

```xml
<?xml version="1.0" encoding="UTF-8"?>
<root xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="validation_xsd.xsd">
    <event>
        <event_id>1</event_id>
        <event_name>ICPC</event_name>
        <event_desc>5 coding questions in 2 hrs</event_desc>
        <event_type_participation>Team</event_type_participation>
        <event_timing>
            <event_start_datetime>2020-04-01T10:00:00</event_start_datetime>
            <event_end_datetime>2020-04-01T12:00:00</event_end_datetime>
        </event_timing>
        <event_organizer_email>abc@gmail.com</event_organizer_email>
        <event_organizer_phone>1234567890</event_organizer_phone>
    </event>
</root>
```

### Understanding XSLT terminologies
#### XSLT template
An XSL consists of one or more sets of rules that are called templates. A template consists of rules applicable only when the specific node in the XML document is matched.

We can understand this as a wrapper function. It wraps the XSLT code based on matching the start node of an XML document. When the start node matches, the template gets rendered accordingly.

#### XPath
> According to Wikipedia, XPath (XML Path Language) is a query language used for selecting nodes from an XML document. XPath may also be used to compute values (such as, strings, numbers, or Boolean values) from an XML document's content. XPath was defined by the World Wide Web Consortium (W3C).

In XSLT, we will use XPath for navigating within XML documents. 

A sample example for demonstration would be:

```xml
<root>
    <name>
        <firstname>Srishilesh</firstname>
        <lastname>P S</lastname>
    </name>
</root>
```

We have to access the value in the `<firstname />` tag for the XML document above. We can do that by specifying the XPath as `/root/name/firstname`.

### Building XSLT webpages
We will build a simple web page containing a table with the table headers as the XML tags. We are also going to explore a few of the interesting features that can be built using XSLT.

#### Declarations
For any XSLT document, the declaration statement, along with namespace details, is mandatory. XML Namespace `xmlns` is a collection of names that can be used as elements or attributes in an XML document. It qualifies element names uniquely on the web to avoid conflicts between elements with the same name.

We have the declaration code below:

```xml
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
```

Here, we set the XSL version to be `1.0` and the `xmlns` to be `xsl="http://www.w3.org/1999/XSL/Transform"`.

#### Cascading Style Sheets
> According to Wikipedia, Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language such as HTML. 

A markup language is a way of styling a document syntactically distinguishable from the text where the document is processed only to render the text while not displaying the markup language.

In the web page that we will build, we'll use [this](https://gist.github.com/srishilesh/2e9d4030619d014585e06c745706ee35) CSS code to style the document. Building CSS is not under the scope of this article. Only essential information regarding it will be emphasized upon.

#### XSLT template
Having done the prerequisite steps, let's start building the webpage using XSLT. 

First, we will create an `xsl:template` by matching with the `"/"`, that signifies the XML document's root node. By specifying `"/"`, we mention that the whole document will be accessed.

The match attribute is used to associate a template with an XML element. The match attribute can also be used to define a template for the entire XML document.

```xml
<xsl:template match="/">
```

#### HTML header
Inside the `xsl:template`, we write normal HTML codes, which later are rendered as webpages. Here, the codes are XSLT, not HTML codes.

First, we begin with the `<head />` tag and link all the necessary CSS and other required files. Here, we link our CSS files and a font style sheet file.

```html
<head>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
    <link rel="stylesheet" href="../css/tablecss.css" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Sofia" />
</head>
```

#### HTML body
Moving on with the HTML `<body />`, we build a table to display all the XML document details. To make the webpage look better, let's align the contents to the `center` using the `<center />` tag.

```html
<body>
  <center>
      <h2>Table Events</h2>
      <!-- ADDITIONAL FEATURE 1 -->
  </center>
</body>
```

#### Building table
We create a `<div />` tag that wraps the `<table />` tag. Here, we use certain CSS properties like `class="scrolling"` to enable horizontal and vertical scrolling of the webpages. `class="table-props"` to set styling for the table contents. And, `id="table-title"` to set styling specific for table heading. 

Refer to [this](https://gist.github.com/srishilesh/2e9d4030619d014585e06c745706ee35) CSS code for more details on styling.

```html
<div class="scrolling">
  <table class="table-props" id="table-title">
  </table>
</div>
```

#### Table headings
Referring to [this](https://gist.github.com/srishilesh/1e4779285eb75fd4af9315391a05e5e6) XML document, the XML tags will be considered as the table headings for the web page. 

We will specify the headings using the `<th>` tag.

```html
<tr id="table-heading">
    <th>Event_ID</th>
    <th>Event Name</th>
    <th>Event Description</th>
    <th>Participation type</th>
    <th>Start date and time</th>
    <th>End date and time</th>
    <th>Organizer email</th>
    <th>Organizer phone</th>
</tr>
```

### Table rows
#### Selecting based on XML field
Having built the web page's skeleton, let's focus on rendering the data from the XML document. Corresponding to the first heading `"Event_ID"`, we must render the XML document's data as separate rows under the heading. So, we use the `xsl:value-of` command to retrieve data for the respective XML tag, which is specified in `select=""`. Here, we retrieve the data in the XML tag `event_id`. The data in each cell of the table is enclosed within `<td />` tags.

```html
<td>
  <xsl:value-of select="event_id" />
</td>
```

#### Choice-based XSL transformations
For the XML tag `event_type_participation`, there are 2 possible values: `Solo` and `Team` type of participations. So, we can specify choice based on the XSLT codes. As a demonstration, we will display the `Solo` and `Team` values in 2 different colors.

To make choice based transformations, we use the `xsl:choose` XSLT tag, which is similar to `if-else-if` conditional statements. The first `if` condition corresponds to `xsl:when test=""`. Similarly, the `else` condition corresponds to `xsl:otherwise`.

Code structure for Choice based XSLT:

```html
<xsl:choose>
    <xsl:when test="CONDITION1">STATEMENTS</xsl:when>
    <xsl:when test="CONDITION2">STATEMENTS</xsl:when>
    <xsl:otherwise>STATEMENTS</xsl:otherwise>
</xsl:choose>
```

For our webpage, the code will be shown as below:

```html
<xsl:choose>
    <xsl:when test="event_type_participation = 'Team'">
        <td bgcolor="#f2f2f242">
            <xsl:value-of select="event_type_participation" />
        </td>
    </xsl:when>
    <xsl:otherwise>
        <td bgcolor="#cccccc">
            <xsl:value-of select="event_type_participation" />
        </td>
    </xsl:otherwise>
</xsl:choose>
```

#### Full Code - Table Rows
Based on the previous explanations, we build the XSLT code for the remaining XML tags by rendering values using the `xsl:value-of` tag.

```html
<xsl:for-each select="root/event">
  <!--ADDITIONAL FEATURE-->
  <tr>
      <td>
          <xsl:value-of select="event_id" />
      </td>
      <td>
          <xsl:value-of select="event_name" />
      </td>
      <td>
          <xsl:value-of select="event_desc" />
      </td>
      <xsl:choose>
          <xsl:when test="event_type_participation = 'Team'">
              <td bgcolor="#f2f2f242">
                  <xsl:value-of select="event_type_participation" />
              </td>
          </xsl:when>
          <xsl:otherwise>
              <td bgcolor="#cccccc">
                  <xsl:value-of select="event_type_participation" />
              </td>
          </xsl:otherwise>
      </xsl:choose>
      <td>
          <xsl:value-of select="event_timing/event_start_datetime" />
      </td>
      <td>
          <xsl:value-of select="event_timing/event_end_datetime" />
      </td>
      <td>
          <xsl:value-of select="event_organizer_email" />
      </td>
      <td>
          <xsl:value-of select="event_organizer_phone" />
      </td>
  </tr>
</xsl:for-each>
```

For XML tags `event_start_datetime` and `event_end_datetime`, we specify XPath as `event_timing/event_start_datetime` and `event_timing/event_end_datetime`, since the XML document contains nested XML tags.

### Additional features
#### Counting
Let's say, we have to count the total number of `event_id` in the XML document. We can do this by using `count()` by specifying the path for accessing the tag. To access the `event_id` XML tag, we will follow the XML structural path below:

```xml
<root>
    <event>
        <event_id> </event_id>
    </event>
</root>
```

For accessing `event_id`, the path would be `root/event/event_id`. And, to access the values, we use `xsl:value-of select=""`. By combining the steps above, we can count the number of events as shown below:

```xml
<p>
    Number of Events - <xsl:value-of select="count(root/event/event_id)" /><br/>
</p>
```

#### Sorting
Now, let's say we have to sort the table rows in ascending order based on `event_id`. We have an exclusive XSLT tag for sorting. In XML, every data is considered as a `string` by default. So, we must convert it to an integer by using `number()`. `xsl:sort` helps us sort the table rows based on `number(event_id)`.

```xml
<xsl:sort select="number(event_id)" data-type="number" />
```

To try out this, replace the code snippet above with `<!--ADDITIONAL FEATURE-->` under [Full Code - Table Rows](#full-code-table-rows).

#### View output
By following the step-by-step procedures above, you would have successfully built a webpage. To view the page, you must open the file with a `.xml` extension.

Due to security concerns in several browsers like Google Chrome, the output can be viewed using the Internet Explorer browser. More details about the security concern in Google Chrome can be found [here](https://stackoverflow.com/questions/4558160/xsl-not-working-in-google-chrome).

![A sample output of XML Webpage](/engineering-education/building-xml-webpages-using-xslt/output.PNG)

### Conclusion
In conclusion, we have gone through what XSLT is, how webpages are rendered, and how to build a sample XML webpage using XSLT. This article serves only as an introduction to building XML webpages using XSLT. It's highly recommended to try out the code manually by reading further from the referenced articles.

The full codes can be accessed here:

- [XML Document](https://gist.github.com/srishilesh/1e4779285eb75fd4af9315391a05e5e6)

- [CSS File](https://gist.github.com/srishilesh/2e9d4030619d014585e06c745706ee35)

- [XSLT Code](https://gist.github.com/srishilesh/bc00bf4a134d37295874758390127929)

To summarize:

- We learned the concept of XSLT.

- We had an overview of various terminologies used in XSLT.

- We built a webpage using XSLT.

### Further Reading
- [CSS in Wikipedia](https://en.wikipedia.org/wiki/CSS)
- [XSLT in Wikipedia](https://en.wikipedia.org/wiki/XSLT)
- [XPath in Wikipedia](https://en.wikipedia.org/wiki/XPath)
- [XML Namespaces - Microsoft Docs](https://docs.microsoft.com/en-us/previous-versions/windows/desktop/ms754539(v=vs.85))
- [XSL Templates](https://www.xspdf.com/resolution/273199.html)
- [More about XPath](https://www.w3schools.com/xml/xpath_intro.asp)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
