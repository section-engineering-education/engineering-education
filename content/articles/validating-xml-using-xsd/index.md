---
layout: engineering-education
status: publish
published: true
url: /validating-xml-using-xsd/
title: Validating XML using XSD
description: A tutorial on validating XML using XSD, how it is different from DTD and we will validate a sample XML document using XSD.
author: srishilesh-p-s
date: 2020-11-15T00:00:00-14:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/validating-xml-using-xsd/hero.jpg
    alt: validating XML using XSD
---
In this article, we will understand how validation of XML is done using XML Schema Definition (XSD). By the end of this article, you will get an overview of various techniques for validating XML elements and attributes using XML Schema Definition (XSD).
<!--more-->
You will also learn step by step how we validate XML. I highly recommend going through my [previous article](/validating-xml-using-dtd/), to understand the basics of XML and the importance of validation.
### Table of Contents
- [Introduction](#introduction)
- [What is XML Schema Definition?](#what-is-xml-schema-definition)
- [Step by Step Guide for Validation](#step-by-step-guide-for-validation)
- [Conclusion](#conclusion)
- [Further Reading](#further-reading)

### Introduction
In the [previous article](/validating-xml-using-dtd/), we understood various data serialization techniques like XML, the importance of validating XML, and also validated an XML schema using Document Type Definition (DTD).

[Document Type Definition (DTD)](https://en.wikipedia.org/wiki/Document_type_definition) helped us in validating the XML schema by parsing the structure of the XML document. But, we can't rely entirely on validation using DTD, since there are high chances of faulty data or data types mismatch in values.

Usually, in DTD, we validate by parsing the XML structure, but in XML Schema Definition (XSD) we also understand the semantics of the schema, for validating.

For example, in Document Type Definition (DTD), we can validate if a particular data can be only parsed or is not parsable, by specifying `#PCDATA` and `#CDATA` respectively. Like, for `firstname` field containing textual data, we validate, if the data is only parsable. In DTD, the validation code would be:

```xml
<!ELEMENT name (#PCDATA)>
```

Whereas, in XML Schema Definition (XSD), we can validate the same `firstname` field by checking its datatype, maximum length, minimum length, check for patterns within the value, and pose many other restrictions.

Here, is a sample code XSD validation:

```xml
<xs:simpleType name="firstname">
    <xs:restriction base="xs:string">
        <xs:pattern value="[a-z]"/>
        <xs:minLength value="5"/>
        <xs:maxLength value="8"/>
    </xs:restriction>
</xs:simpleType>
```

In the example above, we validated the field `firstname` by
- checking if the datatype is a `xs:string`.
- if the string contained only alphabets.
- if the minimum length is 5.
- if the maximum length is 8.

Many such restrictions can be posed on XSD validation. From the example above, we see that validation performed by XSD, not only parses the value, but also validates based on restrictions.

### What is XML Schema Definition?
> According to Wikipedia, [XML Schema Definition (XSD)](https://en.wikipedia.org/wiki/XML_Schema_(W3C)) can be used to express a set of rules to which an XML document must conform to be considered "valid" according to that schema. However, unlike most other schema languages, XSD was also designed with the intent that the determination of a document's validity would produce a collection of information adhering to specific data types.

You may wonder what is the need for XSD, when we already have DTD. XSD can validate better than DTD, in terms of constraints verification, usage, and relationships between elements and its attributes. According to [W3C](https://www.w3.org/TR/xmlschema11-1/), XSD defines, describes, and catalogs XML vocabularies for classes of XML documents.

### Step by Step Guide for Validation
### XML Document
As you know, we use XSD for complex validation of XML documents. So, let’s take up some complex XML document for validating. Going through the validation process, will increase our understanding of concepts better. In this article, we will not cover the basics of building an XML document. To keep it simple, let’s validate the XML code below. We can find the full XML code [here](https://gist.github.com/srishilesh/5d028a5d9acef3818b014cd4595c9ebe).

```xml
<?xml version="1.0" encoding="UTF-8"?>
<root xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="validation_xsd.xsd">
    <event>
        <event_id>1</event_id>
        <event_name>ICPC</event_name>
        <event_desc>5 coding questions in 2 hrs</event_desc>
        <event_tags>
            <tag id="1" displayName="coding">coding</tag>
        </event_tags>
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

### Understanding XSD Terminologies
### Elements
A simple element in XSD contains the text of various data types like Boolean, string, date, etc. or any custom type. Restrictions can be added to it, to maintain consistency of values. We can define a sample XSD element as:

Syntax:
```xml
<xs:element name="xxx" type="yyy"/>
```
Where `type` can be of:
- `xs:string`
- `xs:integer`
- `xs:decimal`
- `xs:date`
- `xs:time`
- `xs:boolean`

#### Attributes
A complex element with element-specific values is known as an attribute. It's not mandatory to mention attributes in elements. When attributes are specified, an element is known to be a complex element.

Syntax:
```xml
<xs:attribute name="xxx" type="yyy"/>
```

#### Restrictions
When validations are being done only for one element, we can do it under XSD tag `xs:simpleType`. Here, the validations are more specific to the type for the particular element.

Whereas, when validations are to be done for a set/sequence of elements, we can specify it under `xs:complexType`. Here, XSD validates all the sub-child elements under a parent element, in sequence. We explain more about these restrictions in the below implementation.

### Validations
#### XSD Declaration
For any XSD document, the XML declaration statement, along with namespace details, is mandatory. XML Namespace is a collection of names that can be used as element or attribute in XML document. It qualifies element names uniquely on the web in order to avoid conflicts between elements with the same name.

We have the declaration code below:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified" />
```

The first line specifies the version and the encoding type used in the XML document.

The following fragment:

`xmlns:xs="http://www.w3.org/2001/XMLSchema"`

Indicates that the elements and data types used in the schema come from the `http://www.w3.org/2001/XMLSchema` namespace. It also specifies that the elements and data types that come from the `http://www.w3.org/2001/XMLSchema` namespace should be prefixed with `xs`.

The following fragment:

`elementFormDefault="qualified"`

Indicates that any elements used by the XML instance document that were declared in this schema must be namespace-qualified. By namespace-qualified, we mean the target namespace specified, applies to elements in the schema complaint XML document.

#### Validating the Outermost Element
In our XML example, we have an element with `name="root"` as the outermost element holding other child elements. So, in our XSD, we access the tag with `name="root"` and handle the child elements under an `xs:complexType` with `name="rootType"`.

```xml
<xs:element name="root" type="rootType" />
```

The above fragment tells us that, whenever a tag with `name="root"` is encountered, the validation type is handled by `name="rootType"`.

Now, we may have any number of `name="event"` tags inside a `name="root"` element, with minimum occurance of `name="event"` tag being `1`. Since, we have at least 1 `name="event"` element, the definition for `name="event"` tag can be enclosed into a sequence `xs:sequence` as shown below:

```xml
<xs:complexType name="rootType">
    <xs:sequence minOccurs="0" maxOccurs="unbounded">
        <xs:element name="event" type="eventType" />
    </xs:sequence>
</xs:complexType>
```

#### Validating Child Elements
As we understand, on validating the `name="event"` element with a complex type declaration. It contains a sequence of other sub-child elements under the type called `name="eventType"`. In this example, each `name="event"` tag can hold maximum of `1` sub-child , we restrict the limitations of its maximum occurance to `1`.

```xml
<xs:complexType name="eventType">
    <xs:sequence maxOccurs="1">
        <xs:element name="event_id" type="IDType" />
        <xs:element name="event_name" type="stringType" />
        <xs:element name="event_desc" type="stringType" />
        <xs:element name="event_tags" type="tagsType" />
        <xs:element name="event_type_participation" type="participationType" />
        <xs:element name="event_timing" type="timingType" />
        <xs:element name="event_organizer_email" type="emailType" />
        <xs:element name="event_organizer_phone" type="phoneType" />
    </xs:sequence>
</xs:complexType>
```

The above snippet extracts every sub-child element under `name="event"` tag with maximum occurrence of each being one, validates based on the type specified under `type` of `xs:element`.

#### Validating sub-child elements
Having parsed and validated all the child elements, now let's validate the sub-child elements individually.

##### Event ID - IDType
Event ID can be of type `xs:integer` where the minimum value is `0` and the maximum value is `unbounded`. To validate it, we create a `xs:simpleType` validation with restrictions on the data type and the boundary values.

```xml
<xs:simpleType name="IDType">
    <xs:restriction base="xs:integer">
        <xs:minInclusive value="0"></xs:minInclusive>
    </xs:restriction>
</xs:simpleType>
```

##### Textual data - stringType
In this XML schema, certain tags holds only textual data with no restrictions on its length or format, so the data type must of `xs:string`. The restriction can be enclosed within a simple type validation, like it's shown below:

```xml
<xs:simpleType name="stringType">
    <xs:restriction base="xs:string" />
</xs:simpleType>
```

##### Event Tags - tagsType
This input field accepts the tags related to the events as comma separated values in lower case. Here, we set a restriction on the number of occurrences to `5` (This is an arbitrary value). We also validate the attributes present inside the element, using XSD validation for attributes.

```xml
<xs:complexType name="tagsType">
    <xs:sequence maxOccurs="5">
        <xs:element name="tag" />
    </xs:sequence>
</xs:complexType>

<xs:attribute name="id" >
    <xs:simpleType >
        <xs:restriction base="xs:string">
        </xs:restriction>
    </xs:simpleType>
</xs:attribute>
```

The code above validates the `tagsType` as a complex type with a sequence containing 5 other sub-elements of name `tag`. These elements also contains attributes like `id` and `displayName`. So, we also validate the possible values of the attribute `id`, where the expected data type must be `xs:string`.

##### Event type - participationType
In this example, we validate 2 types of event: `value="Solo"`(Solo) and `value="Team"`(Team) events. To validate them, we can specify restrictions based on the data types, and their possible binary choices. We create `xs:enumeration` to specify that only the values can be chosen from the given choice.

```xml
<xs:simpleType name="participationType">
    <xs:restriction base="xs:string">
        <xs:enumeration value="Solo"></xs:enumeration>
        <xs:enumeration value="Team"></xs:enumeration>
    </xs:restriction>
</xs:simpleType>
```

First, the code above checks if the value is of the type `xs:string`. Later, we also check whether the value is either `value="Solo"` or `value="Team"`.

##### Event Timings - timingsType
The XML schema contains values of Start and End datetime of the event. Here, datetime is of the format `YYYY-MM-DDThh:mm:ss`, which is similar to type `xs:datetime`. So, we create a simple type, with only restriction on the data type.

```xml
<xs:simpleType name="timeType">
    <xs:restriction base="xs:dateTime" />
</xs:simpleType>
```

##### Organize email - emailType
We also accept the organizers' email address. So, for its validation, we use simple regular expression, to check if the value matches the format. The pattern can be verified, by specifying its format in `xs:pattern` tag, shown below:

```xml
<xs:simpleType name="emailType">
    <xs:restriction base="xs:string">
        <xs:pattern value="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*"></xs:pattern>
    </xs:restriction>
</xs:simpleType>
```

We check if the value is of the `xs:string` type, before pattern matching. For example in Regular Expressions, pattern matching for a string with alphanumeric values of total length 5 would be `[a-zA-Z0-9]{5}`.

The regex pattern signifies if any value from `a-z` or `A-Z` or `0-9` is found in the string, such that the total length of the string is `5`, then we say that the string matches the regex pattern.

Regex pattern for email validation is not under the scope of this article, the pattern to be validated can be found in any online regex editor or can be made custom, based on requirements.

##### Organizer phone - phoneType
Similar to our email validation, we also validate the phone number of the organizer, by matching its pattern, like shown below.

```xml
<xs:simpleType name="phoneType">
    <xs:restriction base="xs:string">
        <xs:pattern value="\+?\d[\d -]{8,12}\d"></xs:pattern>
    </xs:restriction>
</xs:simpleType>
```

So far, we have validated the XML schema not only on structure parsing, but also by semantically analyzing every value and its data type.

The validations can be compiled using an online validator like [this](https://codebeautify.org/xmlvalidator), by uploading the XML schema and its respective DTD file. Alternatively, you can download XML validators locally to your text editors. For example, in VSCode editor, checkout the [XML tools](https://marketplace.visualstudio.com/items?itemName=DotJoshJohnson.xml) extension used to validate XML.

### Conclusion
We had understood what XSD is, how it is different from DTD and we also validated a sample XML document using XSD. This article serves only as an introduction to the validation of XML using XSD. It is highly recommended to try out the code manually by reading further from the referenced articles. Full XSD code can be found [here](https://gist.github.com/srishilesh/3dc43a0c08430d75e77969086bcd5ee8).

To summarize:
- We learned the concept of XSD.
- We understood how XSD differs from DTD.
- We implemented the validation of XML using XSD.

### Further Reading
- https://www.w3.org/XML/Schema
- https://www.w3.org/TR/xmlschema11-1/
- https://www.w3schools.com/xml/schema_schema.asp

---
Peer Review Contributions by [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)
