---
layout: engineering-education
status: publish
published: true
url: /serialization-in-csharp/
title: Serialization in C#
description: This tutorial will guide the reader through serializing objects in C# using different serialization techniques. Serialization is the process of converting an object into a stream of bytes to store the object or transmit it to memory, a database, or a file.
author: erick-kiragu
date: 2021-11-25T00:00:00-10:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/serialization-in-csharp/hero.png
    alt: Serialization in C# Hero Image
---
Serialization is the process of converting an object into a stream of bytes to store the object or transmit it to memory, a database, or a file. This is beneficial in terms of transmitting the converted data.
<!--more-->
### Prerequisites
- [Visual Studio 2019](https://visualstudio.microsoft.com/vs/) installed on your machine. It is the IDE used to run Csharp programs.
- Have prior knowledge in `.NET` programming and XML files.

### Table of contents
- [Prerequisites](#prerequisites)
- [Table of contents](#table-of-contents)
- [Serialization applications](#serialization-applications)
- [Making a serializable object](#making-a-serializable-object)
- [C# Serialization in action](#c-serialization-in-action)
- [Types of Serialization in C](#types-of-serialization-in-c)
  - [1. Binary Serialization](#1-binary-serialization)
  - [2. XML serialization](#2-xml-serialization)
  - [3. SOAP serialization](#3-soap-serialization)
  - [Key points](#key-points)
- [Custom Serialization](#custom-serialization)
- [Conclusion](#conclusion)

### Serialization applications
Serialization allows developers to save an object's state and restore it later when needed. Serialization allows the following operations:

- Delivering an item to the remote application through HTTP protocol.
- Domain to domain transfer - A JSON or XML data string can be used to transport an item over a firewall.
- Keeping user-specific or security-related data between apps.

### Making a serializable object
You'll need the following to serialize binary or XML data:
- The serializable object.
- A stream that contains the serialized object.
- A `System.Runtime.Serialization.Formatter` instance.

Create instances of the stream and the format to use, then use the Serialize function on the format. This function receives two strings as parameters: the stream and the object to serialize.

### C# Serialization in action
When using applications, we must store data in durable or non-durable media for later retrieval. Serialization may help. Serialization is needed to transmit an object over a network. Serializing in C#, the app needs a serialization namespace. In C#, we utilize the `Serializable` property.

Consider the following example:

```csharp
[Serializable] public class Examine //We added the serializable symbol to make this class serializable.
{
public int item;
public string identity;
}
```

To make any subject non-serializable, use the `NonSerialized` attribute. For example, to show the `NonSerialized` property, consider the following sample class:

```csharp
[Serializable] public class Examine //We added the serializable symbol to make this class serializable.
{
public int item;
public string identity;
[NonSerialized] Public double cost; //We added the non-serialized symbol to make this class non-serializable.
}
```

### Types of Serialization in C#

#### 1. Binary Serialization
The `System.Runtime.Serialization` is a namespace that includes binary serialization classes. In computing, a namespace is a collection of symbols used to identify and refer to various things. A namespace ensures that all objects in a set have unique and easy-to-recognize names. The binary encoding provides a straightforward serialization for storage and socket-based network streams.

With binary serialization, even read-only members are serialized, thus improving performance in terms of speed. This is the method for converting .NET objects into byte streams. During binary serialization, all public, private, and read-only members are processed. Binary serialization is used to convert items to bytes quickly. It utilizes `System.Runtime.Serialization.Formatters.Binary` reference.

Below is a binary serialization example:

```csharp
using System;
using System.Linq;
using System.IO;
using System.Runtime.Serialization;
using System.Threading.Tasks;
using System.Text;
using System.Runtime.Serialization.Formatters.Binary;

namespace Demo
{
    [Serializable] //We added the serializable symbol to make this class serializable.
    class Test
    {
        public int  identification;
        public String denot;
        static void Main(string[] args)
        {
        Test ob = new Test();
        ob. identification = 10;
        ob.denot = "Erick";

        IFormatter format = new BinaryFormatter();
            Stream stream1 = new FileStream(@"D:\demo.txt", FileMode.Create,FileAccess.Write);
            format.Serialize(stream1, ob);
            stream1.Close();
            stream1 = new FileStream(@"D:\demo.txt", FileMode.Open, FileAccess.Read);
            Check ob1 = (Check)format.Deserialize(stream1);
            Console.WriteLine(ob1. identification);
            Console.WriteLine(ob1.denot);
            Console.ReadKey();
        }
    }
}
```

> There can be security issues if the binary serialization is done incorrectly. Detailed information can be found in the `BinaryFormatter` Security Documentation.

#### 2. XML serialization
The public members of a class instance may be serialized to an XML stream. Serializing XML takes longer than serializing binary files. XML Serialization is used to enable cross-platform compatibility. Serializing XML is textual. XML files are easy to read and edit. XmlAttribute provides a serialization attribute that accepts XML.

The XmlSerializer class uses the XML serialization standard to serialize an object. Here is an example of how to use XmlSerializer:

```csharp
XmlSerializer Serializer = new XmlSerializer(typeof(Push));
using (TextWriter Writer = new StreamWriter(@"c:\xmlseeralizer.xml"))
{
xmlSerializer.Serialize(Writer, pushObject);
}
```

#### 3. SOAP serialization
Simple Object Access Protocol (SOAP) is an XML-based protocol for data transmission between computers and offers the transport mechanism for web services. SOAP is a language and is platform agnostic.

SOAP serialization is used to move items made up of incompatible designs from one application to another.

Serializable tells the .NET runtime that this class's instances can be serialized. This property is required for class-level serialization. For example, in the `Main()` function of our `Program.cs` class, we'll utilize the SoapFormatter to serialize an instance of our sample object into a Soap XML stream.

Example program:

```csharp
// For SOAP serialization to occur, one must reference the SOAP serialization using System.Runtime.Serialization.Formatters.Soap;

using system;
using System.Text;
using System.IO;
using System.Runtime.Serialization;
using System.collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Runtime.Serialization.Formatters.Soap;

namespace soapSerializationSample
{
    class demo
    {
        static void Main(string[]args)
        {
            Sample sample = new Sample();
            sample.Name = "erick Kiragu"; // Instance of our sample class
            sample.Value =34;
            FileStream fileStream = new FileStream // This code is used to accept our output
            (@"d:\sem\serialisation.dat", FileMode.Create); // Serialization of the object
            SoapFormatter formatter = new  SoapFormatter();
            formatter.Serialize(fileStream, sample);
        }
    }
}
```

#### Key points
- In the code above, we have created an instance of our sample class named `erick nyaga`. We have then serialized it using the value 34 after which we've created a file stream to accept our output using `FileStream fileStream = new FileStream(@"d:\sem\serialisation.dat", FileMode.Create)`.

- `SoapFormatter formatter = new  SoapFormatter()` is used to serialize the object created.

- `formatter.Serializa(fileStream, sample)` serializes the objects to `.data` file format.

- `using System.Runtime.Serialization` and `using System.Runtime.Serialization.Formatters.Soap` are the references for the code to perform SOAP serialization.

### Custom Serialization
Custom serialization allows event serialization and de-serialization. Using an `ISerializable` interface may help. Custom serialization allows you to control which items are serialized and how. **SerializableAttribute** and **ISerializable** interfaces are required.

Consider the following code, which demonstrates custom serialization using the `ISerializable` interface:

```csharp
[Serializable] public class Push : ISerializable
{
public virtual void GetObjectData(SerializationInfo information, StreamingContext context)
}
```

### Conclusion
In this tutorial, we covered serialization object steps, implemented serialization and various types of serialization. These include binary serialization, XML serialization, SOAP serialization, and custom serialization. Finally, we conclude the article with several examples to represent the same.

Happy coding!

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)
