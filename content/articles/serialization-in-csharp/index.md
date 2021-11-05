### Introduction
Serialization transforms a data structure or object state into a format that can be saved in a file, memory or sent over a computer network and then reconstructed. This is a benefit of Serialization in terms of transmitting the converted data.

### Preliquisites
- Have [visual studio 2019](https://visualstudio.microsoft.com/vs/) software installed. It is the IDE used to run Csharp programs.
- Have some prior knowledge in .NET programming and xml files.

### Table of contents
- [Serialization applications](#serialization-applications)
- [Making a serializable object](#making-a-serializable-object)
- [C# Serialization in action](#c#-serialization-in-action)
- [Types of serialization in C#](Types-of-serialization-in-#c#)
- [Conclusion](#conclusion)

### Serialization applications
Serialization allows developers to save an object's state and restore it later if needed. Serialization allows the following operations.

- Delivering an item to the remote application through HTTP.
- Domain to domain transfer - A JSON or XML data string can be used to transport an item over a firewall.
- Keeping user-specific or security-related data between apps.

### Making a serializable object
You'll need the following to serialize binary or XML data:
- The serializable object
- A stream to contain the serialized object
- A System.Runtime.Serialization.Formatter instance
- 
Create instances of the stream and the format to use, then use the Serialize function on the format. This call receives two strings as parameters: the stream and the object to serialize.

### C# Serialization in action
With apps, we must store data on durable or non-durable media for later retrieval. Serialization may help. Serialization is needed to transmit an object over a network. Serializing in C# The app needs a serialization namespace. This is called serialization. In C#, utilize the [ Serializable ] property.

Consider the following example:

```c#

[Serializable] public class Examine //We added the serializable symbol to make this class serializable.
{
public int item;
public string identity;
}
```

To make any subject non-serializable, use the [NonSerialized()] attribute. To show the [ NonSerialized() ]property, consider the following sample class:

```c#
[Serializable] public class Examine //We added the serializable symbol to make this class serializable.
{
public int item;
public string identity;
[NonSerialized()] Public double cost; //We added the nonserialized symbol to make this class non-serializable.
}
```
### Types of Serialization in C#

1. **Binary Serialization**
The System.Runtime.Serialization is a namespace that includes binary serialization classes. In computing, a namespace is a collection of symbols used to identify and refer to various things. A namespace ensures that all objects in a set have unique, easy-to-recognize names. Binary encoding provides a concise serialization for storage and socket-based network streams. 

With Binary Serialization, even read-only members are serialized, improving speed. This is the method for converting.NET objects into byte streams. During binary Serialization, all public, private, and read-only members are processed. Binary Serialization is used to quickly convert items to bytes. It utilizes System. Runtime. Serialization.Formatters.Binary reference.

Below is a biliary Serialization example.

```c#
using System;
using System.Linq;
using System.IO;
using System.Runtime.Serialization;
using System.Threading.Tasks;
using System.Text;
using System.Runtime.Serialization.Formatters.Binary;
namespace Demo
{
    [Serializable]// //We added the serializable symbol to make this class serializable.
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

> There can be a problem if the binary Serialization is done incorrectly. Detailed security information can be found in the BinaryFormatter Security Documentation.

2. **XML serialization**

The public members of a class instance may be serialized to an XML stream. Serializing XML takes longer than serializing binary files. XML Serialization is used to enable cross-platform compatibility. Serializing XML is textual. XML files are easy to read and edit. XmlAttribute provides a serialization attribute that accepts XML.


The XmlSerializer class uses the XML Serialization standard to serialize an object. Here's how to use XmlSerializer:

```C#
XmlSerializer Serializer = new XmlSerializer(typeof(Push));
using (TextWriter Writer = new StreamWriter(@"c:\xmlseeralizer.xml"))
{
xmlSerializer.Serialize(Writer, pushObject);
}
```

3. **SOAP serialization**
Simple Object Access Protocol (SOAP) It is an XML-based protocol for data transmission between computers and offers the transport mechanism for web services. SOAP is language and platform agnost.
SOAP serialization is used when we need to move items that are made up of incompatible designs, from one application to another.

Serializable tells the.NET runtime that this class's instances can be serialized. This property is required for class-level serialization. In the Main() function of our Program.cs class, we'll utilize the SoapFormatter to serialize an instance of our Sample object into a Soap XML stream.

Example program

```c#
// For soap serialization to occur, one must reference the soap serialization using ``using System.Runtime.Serialization.Formatters.Soap;``
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
            sample.Name = "erick Kiragu"; //Instance of our sample class
            sample.Value =34;
            FileStream filestream =new Filestream //This code is used to accept our output
            (@"d:\sem\serialisation.dat", FileMode.Create);// Serialization of the created object
            SoapFormatter formatter =new  SoapFormatter();
            formatter.Serializa(fileStream, sample);
        }
    }
}


```

From the above code, we created an instance of our sample class and called it erick nyaga, and then we serialized it using the value 34. After that we create a file stream to accept our output using the code `FileStream filestream =new Filestream(@"d:\sem\serialisation.dat", FileMode.Create);`.  The line `SoapFormatter formatter =new  SoapFormatter();` is used to serialize the object created.   The line `formatter.Serializa(fileStream, sample);` serializes the objects to .data file format. The lines `using System.Runtime.Serialization;` and `using System.Runtime.Serialization.Formatters.Soap;` are the references for the code to do soap serialization.

4. **Custom Serialization**
Custom serialization allows for event serialization and deserialization. Using an ISerializable interface may help. Custom serialization allows you to control which items are serialized and how. SerializableAttribute and ISerializable interface are required.

Consider the following code, which demonstrates custom Serialization using the ISerializable interface:

```C#
[Serializable] public class Push : ISerializable
{
public virtual void GetObjectData(SerializationInfo information, StreamingContext context)
{
```

### Conclusion
In this tutorial, you have learned serialization object steps, Serialization in action, various types of Serialization with which binary Serialization, XML serialization, SOAP serialization, and custom serialization are included with their examples. 

Happy cording!
