---
layout: engineering-education
status: publish
published: true
url: /deserialization-in-csharp/
title: Deserialization in C#
description: This tutorial will help readers understand how to deserialize different objects in C#. This process helps to convert data to a human-readable format.
author: stanley-kuria
date: 2021-12-17T00:00:00-07:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/deserialization-in-csharp/hero.png
    alt: Deserialization in C# Hero Image
---
Serialization in C# is the process of bringing an object into a structure that is composed in memory. Deserialization is the opposite of serialization. It involves retrieving the serialized object so that it can be stored in memory.
<!--more-->
In other words, it re-establishes the state of the object by setting `properties`, `fields`, and so forth.

### Prerequisites
To follow along, you need to:
- Have [visual studio 2019](https://visualstudio.microsoft.com/vs/) IDE installed in your machine.
- Be familiar with C# and .NET programming.

### Table of content
- [Prerequisites](#prerequisites)
- [Table of content](#table-of-content)
- [Deserialization syntax](#deserialization-syntax)
- [How deserialization works in C](#how-deserialization-works-in-c)
- [Deserialization examples in C](#deserialization-examples-in-c)
  - [Xml serialization and Deserialization](#xml-serialization-and-deserialization)
  - [Binary serialization and deserialization](#binary-serialization-and-deserialization)
  - [JSON serialization and deserialization](#json-serialization-and-deserialization)
- [Conclusion](#conclusion)

### Deserialization syntax
The following code shows the syntax for deserializing an object in c# using XmlSerializer:

```c#
FileInputstream fileInputstream = new FileInputstream(fileInputpath, fileInputMode.open);
XmlSerializer = new XmlSerializer();
ClassName objectName = (ClassName)XmlSerializer.Deserializer(fileInputstream);
```

### How deserialization works in C#
Deserialization in C# depends on several libraries as discussed below:

Firstly, you import `System.IO namespace` which is then used to open the file containing data.

Secondly, import `System.Xml.Serialization` when working with `XmlSerialize class`. When working with `binaryformatter class`, use `System.Runtime.Serialization.Formatters.Binary`.

The JsonSerialize class requires one to import the `NewtonSoft.Json` library.

In C#, an object can be deserialized in three major ways:
- XML deserialization.
- Binary deserialization.
- JSON deserialization.

### Deserialization examples in C#
#### Xml serialization and Deserialization
Serialization and deserialization of data using `XML` require the `System.Xml.Serialize` namespace.

The following code shows how an object is serialized and deserialized using XmlSerialize class:

```c#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text
using System.Threading.Threading;
using System.IO;
using System.Xml.Serialization;//Xml serializer namespace.
namespace ConsoleApp1
{
   //serializable attribute makes this class serializable.
  [Serializable] class Person {
    public static void XmlSerializeData() {
      string Name = "Teresia Wambui";
      Stream stream1 = new FileStream(@"D:Example.txt", FileMode.Create);//creating file to store data.
      XmlSerializer xmlSerializer = new XmlSerializer();//xmlSerializer object.
      xmlSerializer.Serialize(stream1, Name);//serialize stream1 object.
      stream1.Close();//close stream1.
    }
    //xml deserialization.
    public static void XmlDeserializeData(){
     Stream stream1 = new FileStream(@"D:Example.txt", FileMode.Read);//open and read contents of the file
     XmlSerializer xmlSerializer = new XmlSerializer();
     string content = "";//we are going to deserialize the xml file here.
     content = (string)xmlSerializer.Deserialize(stream1);//deserialize data.
     stream1.Close();//close stream1
     Console.WriteLine("Deserialized object: ");//dispay data.
     Console.WriteLine(content)//display deserialized data.
    }
    static void Main(string[] args){
      XmlSerializeData();
      XmlDeserializeData();
      Console.Readline
    }
  }
}
```

In the program above, we serialized and deserialized an object using the XML serialize class.

We first created the `string Name = "Teresia Wambui"` object and specified a file to store it; `Stream stream1 = new FileStream(@"D:Example.txt", FileMode.Create)`.

Next, we created the XML serializer object `XmlSerializer xmlSerializer = new XmlSerializer()`, and then serialized the object by invoking the `xmlSerializer.Serialize(stream1, Name)` function.

During deserialization, we read the contents of the file using `Stream stream1 = new FileStream(@"D:Example.txt", FileMode.Read)`.

Then we created a new object by initializing an empty string `string content = ""`. The `content` variable will store our deserialized data.

Finally, we used `content = (string)xmlSerializer.Deserialize(stream1)` to deserialize data in the file. The deserialized data was displayed using `Console.WriteLine(content)`.

#### Binary serialization and deserialization
The method involved in converting an object to binary format is called binary serialization. Therefore, binary deserialization involves changing a binary object back to a human-readable format.

To perform binary serialization in C#. We use the `System.Runtime.Serialization.Formatters.Binary` namespace.

The following code showcases serialization and deserialization of binary objects. This process is dependent on the `binary formatter` class:

```c#
using System;
using System.Linq;
using System.IO;
using System.Runtime.Serialization;
using System.Threading.Tasks;
using System.Text;
using System.Runtime.Serialization.Formatters.Binary;//binary serialization namespace.
namespace ConsoleApp1
{
  //serializable attribute make the class serializable.
  [Serializable] class Person {
    //serialization.
    public static void BinarySerializeData() {
      string Name = "Teresia Wambui";
      Stream stream2 = new FileStream(@"C:Example.txt", FileMode.Create);//creating file to store data.
      Formatter format = new BinaryFormatter();//format object.
      format.Serialize(stream2, Name);//serialize stream2 object.
      stream2.Close();//close stream2.
    }
    //binary deserialization.
    public static void BinaryDeserializeData(){
     Stream stream2 = new FileStream(@"C:Example.txt", FileMode.Read);//open file and read the contents.
     Formatter format = new BinaryFormatter();
     string content = "";//we are going to deserialize the binary file here.
     content = (string)format.Deserialize(stream2);//deserialize.
     stream2.Close();//close stream2.
     Console.WriteLine("Deserialized object: ");//display.
     Console.WriteLine(content)//display the deserialized data.
    }
    static void Main(string[] args){
      BinarySerializeData();
      BinaryDeserializeData();
      Console.Readline
    }
  }
}
```

In the code above, we have serialized and deserialized an object using the binary formatter class.

During serialization, We first created the `string Name = "Teresia Wambui"` object.

Next, we created a file to store the object using `Stream stream2 = new FileStream(@"C:Example.txt", FileMode.Create)`.

Finally, we serialized the object by invoking the `format.Serialize(stream2, Name)` function and passing in the required parameters.

After serialization, we proceeded to deserialize the object. We used `Stream stream2 = new FileStream(@"C:Example.txt", FileMode.Read)` to read the contents of the file.

Data was then deserialized using the `(string)format.Deserialize(stream2)` method. The results were stored in the `content` variable. The deserialized object was displayed using `Console.WriteLine(content)`.

#### JSON serialization and deserialization
JSON serialization is the process of converting an object into JSON format.

JSON deserialization, on the other hand, involves converting the JSON file back to an object.

To achieve JSON serialization and deserialization, we use the `NewtonSoft.Json namespace`.

The following code shows how an object is serialized and deserialized in C# using `Json serialize` class:

```c#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using NewtonSoft.Json;//Json serializer namespace
using NewtonSoft.Linq.Json;

namespace ConsoleApp1
{
  [Serializable] class Person {
    //serialization
    public static void JsonSerializeData() {
      string Name = "Teresia Wambui";
      Stream stream3 = new FileStream(@"C:Example.txt", FileMode.Create);//creating file to store data.
      JsonSerializer jsonSerializer = new JsonSerializer();//object for jsonSerializer
      jsonSerializer.Serialize(stream3, Name);//serialize stream3 object
      stream3.Close();//close the stream1
    }
    //deserialization
    public static void JsonDeserializeData(){
     Stream stream3 = new FileStream(@"C:Example.txt", FileMode.Read);//open and read the contents in the file
     JsonSerializer jsonSerializer = new JsonSerializer();
     string content = "";//we are going to deserialize the Json file here
     content = (string)Json.Deserialize(stream1);//deserialize
     stream3.Close();//close stream3
     Console.WriteLine("Deserialized object: ");//output
     Console.WriteLine(content);//output name
    }
    static void Main(string[] args){
      JsonSerializeData();
      JsonDeserializeData();
      Console.Readline
    }
  }
}
```

In the code above, we have serialized and deserialized data using a JSON class serializer.

We initialized an object using `string Name = "Teresia Wambui"` and then created a file to store the data by calling `Stream stream3 = new FileStream(@"C:Example.txt", FileMode.Create)`.

Next, we used `JsonSerializer jsonSerializer = new JsonSerializer();` to create an object for `jsonSerializer`. We then invoked `jsonSerializer.Serialize(stream3, Name)` to serialize the object.

During deserialization, we accessed the contents of the file using `Stream stream3 = new FileStream(@"C:Example.txt", FileMode.Read)`.

We then created a new object (`content`) and initialized it to an empty string, `string content = " "`.

Finally, we deserialized the object by invoking `content = (string)Json.Deserialize(stream1)` and then displayed the results using `Console.WriteLine(content)`.

### Conclusion
In this article, you have learned serialization and deserialization in C#. We have also discussed the three major techniques of deserializing an object; XML deserialization, binary deserialization, and JSON deserialization.

Note that deserialization is performed after serialization.

You can therefore use this knowledge to craft other quality C# applications.

Happy coding!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)
