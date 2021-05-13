---
layout: engineering-education
status: publish
published: true
url: /is-object-oriented-overrated/
title: Is Object-Oriented Overrated?
description: Most professional programming languages are object-oriented, including Java and the C languages. Their key features such as encapsulation and inheritance have come under attack many times in recent memory. Object-oriented detractors claim these features are overcomplicated and make code writing and maintenance more difficult. 
author: nicholas-kross
date: 2021-01-26T00:00:00-18:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/is-object-oriented-overrated/hero.jpg
    alt: Object-Oriented code programming
---
Most professional programming languages are object-oriented, including Java and the C languages. Their key features (such as encapsulation and inheritance) have come under attack many times in recent memory. Object-oriented detractors claim these features are overcomplicated. They say those features make code writing and maintenance more difficult. We will explore these arguments, and their counters, to understand how useful OOP is in general.
<!--more-->
### Prerequisites
While some critical object-oriented programming concepts are explained, this will make more sense if you read [*A Simple Explanation of OOP*](https://richardeng.medium.com/a-simple-explanation-of-oop-46a156581214) and [*What is Object-Oriented Programming?*](https://www.educative.io/blog/object-oriented-programming).

### Overview
This article will cover:
- [Object-Oriented Paradigm Features](#object-oriented-paradigm-features) (and how they should help)
- [Arguments Against OO Features](#arguments-against-oo-features) (showing why they don't work)
- [OO Defenses](#oo-defenses) (arguing against the above arguments)
- [Conclusion](#conclusion)

### Object-oriented paradigm features
Why is the object-oriented programming paradigm ("OOP" or "the OO paradigm") so popular? It's partly because it contains features other paradigms don't have. If these features make programming easier, OO languages with them should be used more often. If these features don't help, languages built around them should not see wide adoption.

#### Encapsulation
**Encapsulation** is the defining feature of OOP. Data values become **attributes**, functions for that data become **methods**, and both are held together ("encapsulated") in objects. 

The internal data of an object is generally hidden from the outside, except through methods. If you need a reusable way to print the words in a text file, you make a `TextFile` **class**. That becomes the template for `TextFile` **objects**, which are "instances" of the class.

```bash
class TextFile {  // the full class
	attribute filedata;  // The content of the file is a data attribute.
	attribute filelength;  // So are the file's length and name.
	attribute filename;
	method print_file(self){  // reusable method to print this file's contents
		System.print(self.filedata);
	}
}

myTextFile = new TextFile("my_file.txt");  // Create a new TextFile object, an instance of the TextFile class.
myTextFile.print_file();  // Quickly print the file object's contents.
```

This makes programming easier since most IDEs can autocomplete an object with its methods and attributes. Grouping functions and data makes it easy to see all the options available. Plus, the whole system is more modular. All the text-file-related functionality is kept in one part of the code, so conflicts and repetition are less likely.

#### Inheritance
**Inheritance** lets a class reuse and build on the existing functionality of a "parent class". When there are many types of objects, each type needs some unique functionality. By making a parent of these objects, each only needs it's *unique* features implemented to work. The shared functionality is only written once.

```bash
class TextFile {  // TextFile is the parent class.
	attribute filedata;
	attribute filelength;
	attribute filename;
	method print_file(self){
		System.print(self.filedata);
	}
}

// MarkdownFile is a child of TextFile.
class MarkdownFile extends TextFile {  // MarkdownFile uses TextFile's functionality, and "extends" it with custom methods.
	method change_the_markdown_tables_to_be_better(self){  // Custom method, only usable by MarkdownFile.
		for line in self.filedata {
			line.fix_markdown_table();  // fix tables (only in markdown)
		}
	}
}

myMarkdown = new MarkdownFile("markdown.md");  // Create a MarkdownFile object.
myMarkdown.change_the_markdown_tables_to_be_better();  // Use the new feature...
myMarkdown.print_file();  //...but the normal TextFile functionality still works!
```

#### Polymorphism
**Polymorphism** means we can do something with an object, *even if* we don't yet know the object's exact type. This builds off the inheritance idea above. A child class can behave differently from the parent class by defining its *own* version of a parent method. We can then call that method on an object, whether it's the parent or the child.

```bash
class TextFile {  // TextFile is the parent class.
	attribute filedata;
	attribute filelength;
	attribute filename;
	method print_file(self){
		System.print(self.filedata);
	}
}

// MarkdownFile is a child of TextFile.
class MarkdownFile extends TextFile {
	method print_file(self){  // The child does something different with print_file()
		System.print_differently(self.filedata);  // printing child is different from printing parent
	}
}

myTextFile = new TextFile("hello.txt");  // Create a TextFile object.
myTextFile.print_file();  // prints the file normally

myMarkdown = new MarkdownFile("markdown.md");  // Create a MarkdownFile object.
myMarkdown.print_file();  // Same method, but it prints the file differently.
```

### Arguments against OO features
If these features are so convenient, how could they be bad?

#### More objects, more problems
One of the key criticisms of OOP targets encapsulation itself. If you have lots of objects, each one has internal data (or "state"). In that case, programming is about keeping track of and changing all that data. But instead of passing data to a function (input to output), we change an object's internal state. In most large programs, there are lots of objects, and they can all do their jobs! As long as they're allowed to make a *tiny* change to another object's state.

Of course, if many objects can change each other's states, there's a problem. Doing *anything* results in lots of side-effects. Nobody can keep track of all those at once, for more than a few objects. So the program gets less predictable and buggier.

> "What exactly is mutable state? Any state that can change. Think variables or fields in OOP.... Our brains are really bad at working with state since we can only hold about *5 items* at a time in our working memory. It is much easier to reason about a piece of code if you only think about *what* the code does, not what variables it changes around the codebase."
>
> <cite>Ilya Suzdalnitski, [Object-Oriented Programming — The Trillion Dollar Disaster](https://medium.com/better-programming/object-oriented-programming-the-trillion-dollar-disaster-92a4b666c7c7)</cite>

#### Inheritance is unrealistic
The object-oriented paradigm models problems as hierarchies of objects, like our "parent"-"child" example. However, most real-world inheritance does not work like our example.

For instance, you could have a "vehicle" template to build a "car" and a "truck". Yet a car can be gas-powered or electric, and a "truck" can mean a small pickup or an 18-wheeler. So the vehicle template needs to be very general. Now a truck must specify an engine type (even though few are electric), and a car must specify a wheel count (even though most have 4).

If you want to add more vehicles, like "tank" or "submarine", things get trickier. You could start over for new vehicle types yet lose reusable code. You could put more things in the "vehicle" class, which spreads out functionality and ruins the encapsulation point—the key ideas of OOP conflict with each other.

#### Polymorphism is done better (outside OOP)
The biggest alternative to object-oriented programming is **functional** programming. Instead of keeping data and functions together, data are defined in one place and functions in another. 

When something needs to happen, data is passed to a function with a set output and (optimally) no side-effects. Nothing about functional programming prevents polymorphism. Let's say you want the `print_file()` function to work differently for different data. You can define different functions with the same name.

```bash
function print_file(Markdown){
	// do something
}

function print_file()
```

or pass in the data type

```bash
function print_file(myfile){
	if myfile's type is MarkdownFile{
		// do one thing
	}
	if myfile's type is RichTextFile{
		// do another thing
	}
}
```

Or any number of other solutions. Polymorphism is [not unique to OOP](https://youtu.be/QM1iUe6IofM?t=432), and it can be easier when subclass weirdness is kept out of it.

### OO defenses
For arguments against OOP, there exist counterarguments defending it.

For one thing, the problems with the OO paradigm may be the mistakes of poor coding practice. Good object-oriented programmers, in theory, should use [design patterns](https://refactoring.guru/design-patterns/catalog) to solve problems. 

Instead of weaving tangled webs of states, build classes with the ["open-closed principle"](https://en.wikipedia.org/wiki/Open–closed_principle).  Instead of putting all shared functionality in the parent, build a [prototype](https://www.oodesign.com/prototype-pattern.html) template for other classes.

Another key argument for OO concerns situational use. When a real-life problem is complex, it may *need* the complexity of an object-based system. [Real problem domains](http://nomad.uk.net/articles/developers-who-hate-on-oop-don't-know-how-to-use-it.html#oop-handles-complexity-well) tend to have lots of edge cases. 

"How do we send this email *but not that one* to these customers *but not those ones*?" OO is built around sharing information between objects. That paradigm can handle unique objects much better. 

The functional paradigm, by contrast, is built on functions that handle all data in specific ways. *That* system has a harder time with edge cases.

### Conclusion
The object-oriented paradigm has been the subject of long and in-depth debate. After all, the programs of massive companies (and their developers' careers) are at stake. If OOP is harmful, most codebases may need fundamental changes to stay maintainable. If OOP's concerns are overblown, the critics can lure developers to worse paradigms. 

Object-oriented, functional, and other languages are competing for developers' eyes and companies' wallets. Hopefully, this article helped you find where you stand.

### Further resources
- [Key OOP Features](https://www.pcmag.com/encyclopedia/term/object-oriented-programming)
- [Polymorphism](https://medium.com/@shanikae/polymorphism-explained-simply-7294c8deeef7)
- [Arguments Against OOP](https://medium.com/better-programming/object-oriented-programming-the-trillion-dollar-disaster-92a4b666c7c7)
- [Video Arguing Against OOP](https://www.youtube.com/watch?v=QM1iUe6IofM)
- [OOP Defense](http://nomad.uk.net/articles/developers-who-hate-on-oop-don't-know-how-to-use-it.html)
- [OOP Debate Discussion](https://stackoverflow.blog/2020/09/02/if-everyone-hates-it-why-is-oop-still-so-widely-spread/)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
