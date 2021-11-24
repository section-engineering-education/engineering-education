 ### Introduction
`XML serialization` refers to the process of converting an object's public properties and fields to a serial format (in this case, XML) for storage or transmission..The proces of recreating an item to its original state is known as `deserialization`. Serialization is a method of preserving an object's state to a stream.

### Table of contents
- [StreamWriter class](#streamWriter-class)
- [StreamWriter class xmlserializer](#streamwriter-class-xmlserializer)
- [serialization-and-deserialization](#serialization-and-deserialization)
- [types-of-serialization-in-c#](#types-of-serialization-in-c#)
- [How-to-interact-with-XML-file-using-C#-objects](How-to-interact-with-XML-file-using-C#-objects)
- [Advantage-of-using-xml-serialization](#Advantage-of-using-xml-serialization)
- [Controlling-generated-XML](#Controlling-generated-XML)


### StreamWriter 
In C#, the `StreamWriter class` writes characters to a stream in the encoding given. Writing text to a stream is handled by the StreamWriter.Write() function. The StreamWriter class is derived from the `TextWriter class`, which offers methods for serializing XML, writing an object to a string, and writing strings to a file. In C#, the StreamWriter class writes characters to a stream in the encoding given.

Writing text to a stream is handled by the StreamWriter.Write() function. The StreamWriter class is derived from the `TextWriter class`, which offers methods for serializing XML, writing an object to a string, and writing strings to a file.

### xmlserializer class
The process of converting an object's public properties and fields to a serial format (in this case, XML) for storage or transport is known as `XML serialization`.
Classes, fields, properties, primitive types, arrays, and even embedded XML in the form of 'XmlElement' or 'XmlAttribute' objects are used to describe the data in one's objects.
One can create his or her own classes with attributes or use the XML Schema Definition Tool (Xsd.exe) to generate classes based on an existing XML Schema definition (XSD) document.

Then run Xsd.exe to produce classes firmly typed to the schema and annotated with attributes to comply to the schema when serialized.
A mapping from programming language constructs to XML schema is required to move data between objects and XML. 
The XmlSerializer and related tools like `Xsd.exe` provide the bridge between these two technologies at both design time and runtime.

Use Xsd.exe to create an XML schema document (.xsd) from your custom classes or from a supplied schema.

### serialization and deserialization
Deserialization is the process of retrieving an object from a previously serialized sequence of bytes. It lets you to save an object's state and restore it later.

### Types of serialization in c#
The following are the two type of serializaion in C#.
- binary serialization
- xml serialization

#### Binary serialization
How to convert.NET objects to byte streams During binary serialization, all public, private, and read-only members are processed. This is used to quickly convert objects to bytes.
It is based on. Runtime. Serialization. Formatters. Symbolic link

### XML serialization
Only the public attributes and fields of the objects are transformed into XML during XML serialization. In XML serialization, private members are not held into account.
It uses System.Xml.connection to serialization.

The following code hows how to use XML Attribute:

```C#

[XmlAttribute("word")] public string Name
{
get
{
return word;
}
set
{
Name = var;
}
}
```
To serialize an item using XML Serialization, we apply XmlSerializer.
### Advantage of using xml serialization
XML Serialization has various benefits. XmlSerialzer allows you to fully control the XML serialization process. XmlSerializer, for example, lets you:
- Determine whether a field or property is an element or an attribute.
- Select an XML namespace.
- If a field or property name is inappropriate, use an element or attribute name.

### How to interact with XML file using C# objects
`Serialization` is the process of storing an object's state in some sort of medium, such as a hard disk or a stream.
The XmlSerializer() function serializes the supplied object in C# to the XML format.
Another function, XmlTextWriter(), is used to serialize XML strings and objects in C#.
It enables internet-based object transfer, faster file creation, and efficient service delivery.
### steps to convert Object to XML in C# 
In the below program the steps to follow when converting an object to XML in C# are shown.

To be able to convert an object in C# to XML, you make use of a function called `XmlSerializer()` function which serializes the given object in C# to XML format and another function called `XmlTextWriter()` function to output the serialized XML string.

Performing serialization of object in C# enables the object to be transported over the internet, writing to a file becomes easier andcomplex services can be performed effectively.
example;

```C#

   using System.Xml.Serialization;
 using System.IO;

       public class State
  {
     public string name = "Kenya";
   public string state_capital_city = "Nairobi";}

        static void Main(string[] args)
State c = new State();
    
XmlSerializer inst = new XmlSerializer(typeof(State));
converted XML string to the file
   TextWriter writer = new StreamWriter(@ "D:\Documents\view.xml");
inst.Serialize(writer, c);
writer.Close();
}
```

In the aforementioned program, a Country class is defined with two strings: name and capital. The main method then creates an instance of the XmlSerializer class to serialize the C# object Country to XML. Then a TextWriter instance is created to write the transformed XML string to the specified file.

### Controlling Generated XML
Class and member attributes can be used to control the generated XML.
Use an XmlElementAttribute to a public field or property and set the ElementName property.
The IXmlSerializable interface controls the XML output. With the XmlSerializer, you can work with tightly typed classes while still using XML. These attributes or properties allow him to read sections of an XML document into XML objects.

These properties can be used with extendable XML schemas to serialize and deserialize elements and attributes not found in the original schema. 
To use the objects, apply an XmlAnyElementAttribute to a field that returns an array of XmlElement objects.

The XmlSerializer translates complicated objects (such arrays or class instances) into elements nested within the main XML text. 
example;

```C#

public class  MyClass  
{  
         public Object Objectproperty;  
}  
public class Object  
{  
          public string ObjectName;  
} 
````

The serialized, XML output looks like this:

```bash
<MyClass>  
  <Objectproperty>  
  <ObjectName>String</ObjectName>  
  </Objectproperty>  
</MyClass>  
```

### How to use an interface.
An interface is contract or set of rules to be followed by the inheriting class.
The program below how how to create an interface.

```c#
interface IWorker
{
    string GetFullName();
    string GetPhoneNo();
}
``` 

One can now create a class for worker developer by inheriting the interface Iworker.


```c#
class Developer : IWorker
{
    private string _sirName { get; set; }
    private string _SecondName { get; set; }
    private string _LastName { get; set; }
    private string _phoneNo { get; set; }

    public  Developer(string SirName, string SecondName , string lastName, string phoneNo)
    {
        this._sirName = sirName;
        this._SecondName = SecondName;
        this._lastName = lastName;
        this._phoneNo = phoneNo;
    }

  public string sirName ()
  {
  return this._sirName + this.__SecondName + this._lastName;
  }
  public string phoneNo ()
  {
      return this._phoneNo   }
}
```

### Advantages of using interface in C#
- Extensibility

Extensibility in C# is achieved by using the interface.
Interfaces can be extended to generate new classes that implement contract functionality.
- Using interfaces to access an object.

Using classes derived from an interface eliminates the need to construct class instances. Instead, variables of the instance type store a reference to the type that implements the interface. 
### Conclusion
XML Serialization is the process of serializing a.NET Object to XML or vice versa.
This is the process of transforming an object into a transportable form.
Only an object's public properties and fields are serialized in XML.

The.NET Framework uses XML serialization to convert XML documents and streams to CLR objects.
