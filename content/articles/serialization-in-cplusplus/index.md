---
layout: engineering-education
status: publish
published: true
url: /serialization-in-cplusplus/
title: Serialization in C++
description: This article will discuss Serialization and how it is used in C++. It will also go through the importance of JSON stream, JSON syntax and JSON data value in the serialization process.
author: sarah-wambui
date: 2022-04-22T00:00:00-04:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/serialization-in-cplusplus/hero.png
    alt: Serialization in C++ Hero Image
---
Serialization is the process of converting a data structure to a format that can be stored in a storage place or sent over a computer network and then reconfigured in another computer environment. Serialization saves an item as a byte string in storage.
<!--more-->
After producing the byte stream, the user can send it to a detached receiver through a network. On the other hand, deserialization is the opposite of Serialization. It uses the byte stream data to recreate the original object form.

Serialization allows sending serialized object data to a server, maintaining its permanency. It also guarantees a chance to deserialize it and create a distinct object format.

### Table of contents
- [Table of contents](#table-of-contents)
- [Text stream vs Binary](#text-stream-vs-binary)
- [Relevance of JSON Stream, JSON Syntax and JSON Data Value in Serialization](#relevance-of-json-stream-json-syntax-and-json-data-value-in-serialization)
  - [JSON stream](#json-stream)
  - [JSON syntax](#json-syntax)
  - [The values of JSON data](#the-values-of-json-data)
- [Analysis of the contrast between JSON and C++ object](#analysis-of-the-contrast-between-json-and-c-object)
- [JSON Object vs Javascript Object](#json-object-vs-javascript-object)
- [Pointer serialization](#pointer-serialization)
- [Advantages and disadvantages of Serialization](#advantages-and-disadvantages-of-serialization)
  - [Advantages](#advantages)
  - [Disadvantages](#disadvantages)
- [An example of C++ Serialization](#an-example-of-c-serialization)
- [Conclusion](#conclusion)

### Text stream vs Binary
- **Text stream:** JSON and XML are the text standards that are most often utilized. JSON has been used in this essay because it is simple to interpret and manage compared to XML.
- **Binary:** A binary is a compiled C++ code. It is possible to get a serialized stream in binary form though this article will not consider binary.

### Relevance of JSON Stream, JSON Syntax and JSON Data Value in Serialization
#### JSON stream
JSON is an inner structure for data repository as well as delivery. The stability of JSON makes it a strong choice for serializing and deserializing data in C++. Before transmitting C++ data, transform it into JSON data.

A stream is data contained by the JSON object. When given in its manifestation, a JSON item may be treated as a stream for deserialization.

#### JSON syntax
A dataset is a key/value pair in the JSON format. Consider:

```C++
"title":"sarah"
```

The key is the title, and the value is Sarah. Brackets are used to enclose an object, as in the following:

```C++
{"title" : "Sarah", "weight" : 20.5}
```

All text, whether a key or a value, should be enclosed in double quotes, and commas separate the data. There are no quotations around the numbers.

A collection is specified by the use of square brackets, such as:

```C++
["lion", "leopard", "bear", "elephant"]
```

There is an object within the code below, whose result is an array and is denoted by `arr`:

```C++
{"arr" : ["lion", "leopard", "bear", "elephant"]}
```

A JSON object may be recognizable by embedding it inside the data.

#### The values of JSON data
There are many different sorts of the dataset that JSON utilizes. Examples given include dataObject, array, integer, text, boolean, and null.

Except for objects and exhibitions, all attributes are real numbers. The user should contemplate putting entities that are not allowed in JSON into a JSON thread before you use them as JSON data.

### Analysis of the contrast between JSON and C++ object
The next section will find a simple program code for generating a fundamental entity:

```C++
#include
using namespace std;
class TheCla
{
public:
    int num;
    int mthd (int it)
    {
        return it;
    }
};
int main()
{
    TheCla obj;
    int no = obj.mthd(3);
    cout << no << endl;
    return 0;
}
```

Below is an example of a similar JSON object:

```C++
{"obj": {"num" : null, "mthd" : "int mthd (int it) { return it;}"}}
```

An object that qualifies to be in JSON is automatically serialized. You should keep track of the object's identity and what it does. The C++ software deserializing the data should first generate a C++ type and entity.

Double quotes are removed after the function is recognized as a string and before it is assembled. Sending metadata can significantly improve the efficiency of this process. Metadata refers to a set of data that describes other data.

The C++ map might be included in the metadata and the optimal JSON object. The stream object representing a JSON object is then sent to the C++ `ostream` object for transmission over the network or storage as a file. An `istream` in C++ will receive this sequence and pass it along.

The deserialization program will then convert the object to C++. `Ostream` and `istream` are among the well-known C++ `fstream` classes. `Stringifying` as well as `parsing` are terms used interchangeably in Javascript, the ECMAScript standard, to describe the serialization and deserialization of data.

### JSON Object vs Javascript Object
Even if the properties of JSON and javascript objects are comparable, a function can be accepted in JavaScript objects and denied in JSON. It is possible to make remarks in javascript code but not in JSON.

JSON keys must be surrounded by double quotation, but JavaScript cannot encase them in quotes. Most of the conditions for generating a C++ file are not met by the C++ libraries that use JSON.

### Pointer serialization
As long as the pointer to the serialized object has Serialization enabled, it will be serialized every time it is called upon. Boost serialization guarantees that the pointer's connection is serialized to the relevant entities; thus, serialization of pointed objects is not required.

Consider the following example of pointer serialization:

```C++
#include <span class="code-string">"obj.hpp"
</span>#include <span class="code-keyword"><assert.h>
</span>#include <span class="code-keyword"><fstream>
</span>#include <span class="code-keyword"><boost/archive/text_iarchive.hpp>
</span>#include <span class="code-keyword"><boost/archive/text_oarchive.hpp>
</span>
int main()
{
const char* fileName = "saved.txt";
const Obj o1(-2, false);
const Obj* const p1 = &o1;
{
std::ofstream ofs(fileName);
boost::archive::text_oarchive ar(ofs);
ar & p1;
}
Obj* restored_p1;
{
std::ifstream ifs(fileName);
boost::archive::text_iarchive ar(ifs);
ar & restored_p1;
}
assert(restored_p1 != p1);
assert(*restored_p1 == o1);
return 0;
}
```

In the code above, serializing the pointer `p1` initiates the Serialization of `o1`, which is the entity it points to. A clone of the `obj o1` is automatically generated when restoring the pointer `restored_p1`.

Pointer deserialization directly deserializes the object it refers to if it is not deserialized. If a pointer to an object has been deserialized; you should not deserialize that object.

If such an object is forced to be deserialized by the pointer deserialization, then it is impossible to reassemble the object at a different location.

Consider the following example of pointer deserialization:

```C++
#include <span class="code-string">"obj.hpp"
</span>#include <span class="code-keyword"><fstream>
</span>#include <span class="code-keyword"><boost/archive/text_iarchive.hpp>
</span>#include <span class="code-keyword"><boost/archive/text_oarchive.hpp>
</span>
int main()
{
const char* fileName = "saved.txt";
std::ofstream ofs(fileName);
const Obj o1(-2, false);
const Obj* const p1 = &o1;
{
boost::archive::text_oarchive ar(ofs);
ar & o1 & p1;
}
{
boost::archive::text_oarchive ar(ofs);
ar & p1 & o1;
}
return 0;
}
```

### Advantages and disadvantages of Serialization
#### Advantages
Serialization traverses an object's configuration via a network. It is simple to comprehend and adapt to individual needs. Serialization is utilized to preserve and store the configuration of an item.

Serialization makes it possible to adjust XML documents without using the Document Object Model.

#### Disadvantages
A user may only use Serialization if confident that the identical technique will deserialize the serialized information. This limitation makes it difficult to utilize a different version of the configurable library to deserialize data.

### An example of C++ Serialization

```C++
#pragma once
namespace boost {
namespace serialization {
class access;
}
}
class Obj {
public:
Obj() : d1_(-1), d2_(false) {}
Obj(int d1, bool d2) : d1_(d1), d2_(d2) {}
bool operator==(const Obj& o) const {
return d1_ == o.d1_ && d2_ == o.d2_;
}
private:
int d1_;
bool d2_;
friend class boost::serialization::access;
template<typename Archive>
void serialize(Archive& ar, const unsigned version) {
ar & d1_ & d2_;
}
};
```

In the code above, `serialize` has been regarded as a prototype that defines both the save and load since the function '&' is designed as (respectively >>) for a creation (respectively input) repository.

Save/load templates may retrieve private data members of instances through a buddy designation. Let's not forget that serialization assumes the object has a standard constructor.

### Conclusion
C++ object serialization has been brought up in this article, including its differences from standard object storage. Serialization is harder to achieve than expected.

It is crucial to note how we may do it collectively or the potential method to recognize data length, so that the reconfiguration of an object does not show complications during deserialization.

There is no easy data permanence that can resolve these complex problems. Therefore, Serialization is not as straightforward as it appears. There is, however, a variety of implementations to accompany C++ in its third-party libraries.

Happy coding!

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)
