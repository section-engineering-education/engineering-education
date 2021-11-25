### Introduction
We ought to at first see what is serialization in c#. Is the most common way of bringing an object into a structure that tends to be composed in memory.
Deserialization is the opposite course of serialization. It is the most common way of getting back the serialized object with the goal that it tends to be stacked into memory. It reestablishes the state of the object by setting properties, fields, and so forth.
### Prerequisites
To follow along you need to:
- Have [visual studio 2019](https://visualstudio.microsoft.com/vs/) IDE installed in your machine.
- Be familiar with C# and .NET programming.

### Table of content
- [The syntax for deserialization.](#the-syntax-for-deserialization)
- [How deserialization works in C#.](#how-deserialization-works-in-C#)
- [Types of deserialization in C#.](#types-of-deserialization-in-C#)
- [Conclusion](#conclusion)

### The syntax for deserialization
below is the syntax for deserializing an object in c# using XmlSerializer,
```
FileInputstream fileInputstream = new FileInputstream(fileInputpath, fileInputMode.open);
XmlSerializer = new XmlSerializer();
ClassName objectName = (ClassName)XmlSerializer.Deserializer(fileInputstream);
```

### How deserialization works in C#
- Import System.IO namespace, opens the file containing data.
- Import System.Xml.Serialization when working with XmlSerialize class. When working with binaryformatter class, import System.Runtime.Serialization.Formatters.Binary. And when working with JsonSerialize class, import NewtonSoft.Json.

An object can be deserialized in three ways according to serialization in C#
- XML deserialization.
- Binary deserialization.
- JSON deserialization.

### Deserialization examples in c#
#### Xml serialization and Deserialization
When we want to perform serialization and deserialization of data using XML. We make use of System.Xml.Serialize namespace. Beneath is code showing how an object is serialized and deserialized. using XmlSerialize class.
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
In the above program, we serialized and deserialized an object using xml serialize class. We created an object `string Name = "Teresia Wambui"` . We then created a file to store the object, `Stream stream1 = new FileStream(@"D:Example.txt", FileMode.Create)`. Then created the xml serializer object, `XmlSerializer xmlSerializer = new XmlSerializer()`. Then we serialized the object by calling,`xmlSerializer.Serialize(stream1, Name)`.
When deserializing, we read the contents of the file using, `Stream stream1 = new FileStream(@"D:Example.txt", FileMode.Read);`. Then we created new object `string content = ""` and initialized to an empty string, this is where data will be deserialized. Then we deserialized data in the file using, `content = (string)xmlSerializer.Deserialize(stream1)`. The deserialized data will be displayed using `Console.WriteLine(content)`.
#### Binary serialization and Deserialization
The method involved in converting an object to binary format. Is called binary serialization. The opposite cycle is called binary deserialization. To perform binary serialization in c#. We use the System.Runtime.Serialization.Formatters.Binary namespace. Below is a code snippet to show how object serialization and deserialization. Is performed in C# using binary formatter class.
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
In the above code, we have serialized and deserialized an object using the binary formatter class. We started by serializing the object. We created an object `string Name = "Teresia Wambui"`. Then we created a file to store the object using, `Stream stream2 = new FileStream(@"C:Example.txt", FileMode.Create)`. We serialized the object by calling,`format.Serialize(stream2, Name)`.
After serializing we performed the reverse process to deserialize the object.
we used `Stream stream2 = new FileStream(@"C:Example.txt", FileMode.Read)`, to read the contents of file. Then deserialized the data by calling, `content = (string)format.Deserialize(stream2)`. We used `Console.WriteLine(content)`, to display the deserialized object.
#### Json serialization and deserialization
The method involved in converting an object into JSON format is called Json serialization. The reverse process, which involves converting the JSON file back to an object. Is called JSON deserialization. To achieve JSON serialization and deserialization, we use the NewtonSoft.Json namespace. Below is a code snippet to show how an object is serialized and deserialized in c#. Using Json serialize class.
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
In the code above, we have serialized and deserialized data using JSON class serializer. We created an object using, `string Name = "Teresia Wambui"`. Then we created a file to store the data by calling, `Stream stream3 = new FileStream(@"C:Example.txt", FileMode.Create)`. After that we created an object for jsonSerializer, `JsonSerializer jsonSerializer = new JsonSerializer();`. We then called, `jsonSerializer.Serialize(stream3, Name)`, to serialize the object.
When deserializing we called, `Stream stream3 = new FileStream(@"C:Example.txt", FileMode.Read)`. To read the contents of the file.
 We then created a new object and initialized it to an empty string, `string content = ""`. This is where we are going to deserialize the json file. Finally we deserialized the object by calling, `content = (string)Json.Deserialize(stream1)`. Then display the deserialized object using,`Console.WriteLine(content)`.
### Conclusion
In this article, you have learned deserialization in c#. And the various techniques of deserializing an object. Deserialization is performed after serialization. Thus in c#, you need to perform serialization first. Then reverse the process to deserialize data. Deserialization in c# is performed in three ways according to serialization. That is Binary deserialization, XML deserialization, and JSON deserialization. Happy coding!.