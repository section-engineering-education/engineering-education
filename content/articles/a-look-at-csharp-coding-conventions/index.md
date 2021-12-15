---
layout: engineering-education
status: publish
published: true
url: /a-look-at-csharp-coding-conventions/
title: A Look at C# Coding Conventions
description: In this tutorial, we will look at the C# language coding conventions that a programmer needs to consider and apply when programming.
author: amos-njoroge
date: 2021-12-15T00:00:00-09:14
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/a-look-at-csharp-coding-conventions/hero.jpg
    alt: A Look at C# Coding Conventions Hero Image
---
This article outlines a set of coding guidelines, design principles, and naming conventions for the C# programming language and the `.NET` framework.
<!--more-->
It lays out the rules in a format that is simple to read and understand, allowing software engineers to apply them rapidly. The article aims to serve as a primary source of information and efficiency for programmers.

### Benefits of coding conventions
- They make copying, changing, and maintaining code easier.
- They help readers understand the code faster by allowing them to make assumptions based on prior knowledge.
- They give the code a unified design so readers may concentrate on the content rather than the layout.
- They give the most ideal manner to use the C# programming language.

### Coding conventions used in the C# programming language
There are a few naming conventions that should be followed while writing C# code. All information about public elements applies to private and protected internal elements which are all supposed to be visible to external callers.

The coding conventions used in the C# programming language are:
1. Naming conventions
2. Layout conventions
3. Commenting conventions

### Naming conventions
#### Pascal's case
In the Pascal case, the first letter of every word is capitalized as displayed in the example below. One can use the Pascal case for identifiers with three or more characters.

When naming a class, record, or struct, use pascal casing ("PascalCasing") as shown in the code below:

```bash
PublicSchool1
```

```c#
public class PascalCase1
{
}
public record PublicIntitution1(
    string Country,
    string County,
    string Village,
    );
public struct ValueCoordinate1
{
}
```

Besides prefixing the name with an `I`, when naming an interface, use the pascal casing. Customers can tell it's a user interface because of this.

```c#
public interface IPublicInstitution
{
}
```

Besides what is already there, public members of types can be named using the pascal case.

```c#
public class PracticeExample1
{
    // public field
    public bool IsValid;

    // An init-only property is a property that allows you to do something only once.
    public IBuilding Building { get; init; }

    // An example of an event
    public event Action EventProcessing;

    // Implementation of a method
    public void StartEventProcessing()
    {
        // Use of a local function
        static int CountQueueItems() => WorkerQueue.Count;

    }
}
```

Since parameters are public properties of the record, a reader can use pascal casing when putting down positional accounts.

```c#
public record PublicIntitution
(
    string Country,
    string County,
    string Village,
);
```

### Camel case
The `camelCasing` convention, which is used for parameter names, capitalizes the first letter of every word except the first.

```bash
voidMain
```

Another implementation of the camel case is when naming private or internal fields.

```c#
public class DataService
{
    private IWorkerQueue _workerQueue;
}
```

It is also advisable to use the `s_prefix` and the `t_prefix` for the static fields respectively when dealing with thread and internal fields.

```c#
public class DataService
{
    private static IWorkerQueue s_workerQueue;

    [ThreadStatic]
    private static TimeSpan t_timeSpan;
}
```

Camel casing is used when executing most of the method parameters.

```c#
public T SomeMethod<T>(int someNumber, bool isValid)
{
}
```

Apart from the above conventions, there are others that a programmer needs to consider and apply while in their daily routine of programming. They include:

1. The choice of word - Use readable identifier names, underscores, hyphens, and other non-alphanumeric characters should not be used. The choice of the word implies that not any word can be used when programming, instead the proper words should be used.

2. Hungarian notation is neither acceptable nor encouraged - A Hungarian notation is whereby the name of a variable or function denotes its intent or kind, as well as its type in some languages. Thus, it creates a programming language dependency and makes maintenance more difficult.

3. The use of abbreviations and acronyms - Do not use acronyms that are not generally recognized, and even if they are, only use them when essential.

4. Abbreviations and contractions should not be used as identifier names - This simply means that when one is writing an identifier, words should not be contracted but instead, well-known identifiers should be used.

### Layout conventions
For a clear understanding of the code and its structure, formatting is exercised as a coding convention.

Some of the layout coding conventions are:

- Use the code editor's default settings that use smart indenting, four-character indents, and tabs that are saved as spaces.

- Each line should accommodate one statement, i.e `// This is a comment for a single statement`. The disqualified one is, `// This is a comment 1, This is another comment`. Every single comment should be in a single statement.

- Each line should only accommodate one declaration, eg. `varx=13`; and not `var x=13`; `var y =14;`

- If the continuation lines are not indented consequently, they are supposed to be indented at a stop of one tab.

- At least a single blank line is supposed to be added between the property definitions and the method. This is done to make sure that your code is clean and neat so that it is readable. A reader will have an easy time following your code and knowing what each line entails.

Use enclosure or parenthesis to make provisions in an articulation clear, as displayed in the code below:

```c#
if ((valxyz > valxyz) && (valabc > valabc))
{
    // Here is what you will do.
}
```

### Coding conventions for commenting
- It is advisable to write a comment on its separate line for understandability.

- It is also wise to start a comment with an uppercase letter.

- The remark content should be ended with a period.

- It is also advisable to place a single space between the comment delimiter `//` and the comment content, as displayed in the example below.

```c#
// This is a comment used in the C-Sharp programming language.
// This is a single-line comment.
```

- It is not advisable to use formatted blocks of asterisks `*` to surround comments.

- Unearth that all public members are using the appropriate XML comments to describe their actions.

### A look at some language guidelines
#### String data types
To join small strings end to end, string interpolation is used as explained in the example below.

```c#
string displayDetails2 = $"{detailsList2[n].FullName}, {detailsList2[n].JobId}";
```

When working with a huge volume of text, one can use a `StringBuilder` object to attach strings in loops.

```c#
var phrase = "programmmmmmmmmmmmming";
var manyPhrases = new StringBuilder();
for (var j = 0; j < 1000; j++)
{
    manyPhrases.Append(phrase);
}
```

#### Event handlers with relaxed delegates
Event handler arguments (Object and EventArgs) should not be qualified explicitly, use relaxed delegates instead of event arguments if you're not utilizing the event parameters.

Take the following as an example:

`(sender as Object, e As EventArgs)`

#### The unsigned data type
Use `int` instead of unsigned types in general. In C#, `int` is widely used, making communication with other libraries easy.

#### Arrays
When initializing arrays on the declaration line, use the `succinct` syntax. Let us use `string[]` in the following example.

```c#
string[] alphabets1 = { "u", "v", "w", "x", "y", "z" };
// You can use var if you utilize explicit instantiation.
var aplphabets2 = new string[] { "u", "v", "w", "x", "y", "z" };
```

If you specify an array size, then the elements should be initialized one by one.

```c#
var alphabet3 = new string[5];
alphabet3[0] = "a";
alphabet3[1] = "b";
// And the process continues.
```

### Conclusion
In conclusion, a code is not only written but written under strict rules or standards that enable the output to be much more correct and to perform its task.

The following is achieved using the coding conventions:

1. Users will put their focus on the content rather than the layout because your code will have a consistent appearance.

2. Based on earlier experience, readers may understand your code easily.

3. Code becomes easier to copy, update, and maintain.

4. You contribute to ensuring that your code follows Visual Basic's "best practices".

Follow the conventions to become a perfect programmer!

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)